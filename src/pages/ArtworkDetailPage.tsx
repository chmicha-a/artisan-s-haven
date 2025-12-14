import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Share2, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { ArtworkCard } from '@/components/artwork/ArtworkCard';
import { artworks } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';

export default function ArtworkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const artwork = artworks.find((a) => a.id === id);
  const relatedArtworks = artworks
    .filter((a) => a.id !== id && a.category.id === artwork?.category.id)
    .slice(0, 4);

  if (!artwork) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Œuvre non trouvée</h1>
          <Link to="/catalogue">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Button>
          </Link>
        </div>
      </ClientLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            to="/catalogue" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </Link>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted">
              <img
                src={artwork.images[0]}
                alt={artwork.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {artwork.category.name}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {artwork.title}
              </h1>
              <Link 
                to={`/artiste/${artwork.artistId}`}
                className="inline-flex items-center gap-3 group"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={artwork.artist.photo} alt={artwork.artist.name} />
                  <AvatarFallback>{artwork.artist.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {artwork.artist.name}
                </span>
              </Link>
            </div>

            <Separator />

            <div>
              <p className="font-display text-3xl font-bold text-primary mb-1">
                {formatPrice(artwork.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                {artwork.stock > 0 ? (
                  <span className="text-green-600">En stock ({artwork.stock} disponible{artwork.stock > 1 ? 's' : ''})</span>
                ) : (
                  <span className="text-destructive">Épuisé</span>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="gold"
                size="lg"
                className="flex-1"
                onClick={() => addToCart(artwork)}
                disabled={artwork.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-display text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{artwork.artType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dimensions</p>
                <p className="font-medium">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="font-medium">{artwork.medium}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Année</p>
                <p className="font-medium">{artwork.year}</p>
              </div>
            </div>

            <Separator />

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Authenticité garantie</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Livraison sécurisée</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Retour sous 14 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Œuvres similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          </section>
        )}
      </div>
    </ClientLayout>
  );
}
