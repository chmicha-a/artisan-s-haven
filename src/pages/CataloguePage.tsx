import { useState, useMemo } from 'react';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { ArtworkFilters } from '@/components/artwork/ArtworkFilters';
import { artworks } from '@/data/mockData';
import { FilterOptions } from '@/types';

export default function CataloguePage() {
  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          artwork.title.toLowerCase().includes(searchLower) ||
          artwork.artist.name.toLowerCase().includes(searchLower) ||
          artwork.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && artwork.category.slug !== filters.category) {
        return false;
      }

      // Art type filter
      if (filters.artType && artwork.artType !== filters.artType) {
        return false;
      }

      // Price filters
      if (filters.minPrice && artwork.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && artwork.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Catalogue
          </h1>
          <p className="text-muted-foreground">
            Découvrez notre collection de {artworks.length} œuvres d'art uniques
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ArtworkFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} trouvée{filteredArtworks.length > 1 ? 's' : ''}
        </div>

        {/* Artwork Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🎨</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Aucune œuvre trouvée
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
