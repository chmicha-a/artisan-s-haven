import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Artwork } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
}

export function ArtworkCard({ artwork, className }: ArtworkCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <Card className={cn('group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card', className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to={`/oeuvre/${artwork.id}`}>
          <img
            src={artwork.images[0]}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-soft"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs"
        >
          {artwork.category.name}
        </Badge>
      </div>
      <CardContent className="p-4">
        <Link to={`/oeuvre/${artwork.id}`}>
          <h3 className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {artwork.title}
          </h3>
        </Link>
        <Link 
          to={`/artiste/${artwork.artistId}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1 block"
        >
          {artwork.artist.name}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-primary">
            {formatPrice(artwork.price)}
          </p>
          <Button
            variant="gold"
            size="sm"
            onClick={() => addToCart(artwork)}
            disabled={artwork.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </Button>
        </div>
        {artwork.stock === 0 && (
          <p className="mt-2 text-sm text-destructive">Épuisé</p>
        )}
      </CardContent>
    </Card>
  );
}
