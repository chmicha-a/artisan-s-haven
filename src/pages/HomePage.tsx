import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { artworks, categories } from '@/data/mockData';

export default function HomePage() {
  const featuredArtworks = artworks.slice(0, 4);

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gallery-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiM4YjVjZjYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-up">
              ✨ Découvrez l'art autrement
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Des œuvres d'art <span className="text-primary">uniques</span> par des artistes passionnés
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Explorez notre collection exclusive de peintures, sculptures et créations numériques. 
              Soutenez les artistes et enrichissez votre collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/catalogue">
                <Button variant="hero" size="xl">
                  Explorer le catalogue
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/inscription">
                <Button variant="hero-outline" size="xl">
                  Devenir artiste
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explorez par catégorie
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez l'œuvre parfaite parmi nos différentes catégories artistiques
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/catalogue?category=${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-secondary hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <Palette className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Œuvres à la une
              </h2>
              <p className="text-muted-foreground">
                Notre sélection d'œuvres exceptionnelles
              </p>
            </div>
            <Link to="/catalogue">
              <Button variant="outline" className="hidden sm:flex">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork, index) => (
              <div 
                key={artwork.id} 
                className="animate-fade-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/catalogue">
              <Button variant="outline">
                Voir tout le catalogue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-muted-foreground">
                Transactions cryptées et protégées pour votre tranquillité d'esprit
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
                <Star className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Artistes Vérifiés</h3>
              <p className="text-muted-foreground">
                Tous nos artistes sont validés pour garantir l'authenticité
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Livraison Soignée</h3>
              <p className="text-muted-foreground">
                Emballage professionnel et livraison assurée dans le monde entier
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Vous êtes artiste ?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Rejoignez notre communauté d'artistes et vendez vos créations à des collectionneurs du monde entier.
          </p>
          <Link to="/inscription">
            <Button variant="gold" size="xl">
              Créer votre profil artiste
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </ClientLayout>
  );
}
