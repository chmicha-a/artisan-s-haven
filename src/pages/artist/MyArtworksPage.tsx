import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, MoreVertical, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { artistArtworks } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export default function MyArtworksPage() {
  const [artworks, setArtworks] = useState(artistArtworks);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Publié', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Refusé', className: 'bg-red-100 text-red-800' },
    };
    const config = configs[status] || configs.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleDelete = (id: string) => {
    setArtworkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (artworkToDelete) {
      setArtworks(artworks.filter((a) => a.id !== artworkToDelete));
      toast({
        title: 'Œuvre supprimée',
        description: 'L\'œuvre a été supprimée de votre catalogue.',
      });
    }
    setDeleteDialogOpen(false);
    setArtworkToDelete(null);
  };

  const handleStockChange = (id: string, newStock: number) => {
    if (newStock < 0) return;
    setArtworks(
      artworks.map((a) => (a.id === id ? { ...a, stock: newStock } : a))
    );
  };

  const handlePriceChange = (id: string, newPrice: number) => {
    if (newPrice < 0) return;
    setArtworks(
      artworks.map((a) => (a.id === id ? { ...a, price: newPrice } : a))
    );
  };

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Mes Œuvres
            </h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue d'œuvres
            </p>
          </div>
          <Link to="/mes-oeuvres/nouvelle">
            <Button variant="gold">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une œuvre
            </Button>
          </Link>
        </div>

        {/* Artworks Grid */}
        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Card key={artwork.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-muted">
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(artwork.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/oeuvre/${artwork.id}`} className="flex items-center cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/mes-oeuvres/${artwork.id}/modifier`} className="flex items-center cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => handleDelete(artwork.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold text-foreground line-clamp-1 mb-2">
                    {artwork.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Prix (€)</label>
                      <Input
                        type="number"
                        value={artwork.price}
                        onChange={(e) => handlePriceChange(artwork.id, Number(e.target.value))}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Stock</label>
                      <Input
                        type="number"
                        value={artwork.stock}
                        onChange={(e) => handleStockChange(artwork.id, Number(e.target.value))}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Aucune œuvre
            </h3>
            <p className="text-muted-foreground mb-6">
              Commencez par ajouter votre première création
            </p>
            <Link to="/mes-oeuvres/nouvelle">
              <Button variant="gold">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une œuvre
              </Button>
            </Link>
          </div>
        )}

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer l'œuvre ?</DialogTitle>
              <DialogDescription>
                Cette action est irréversible. L'œuvre sera définitivement supprimée de votre catalogue.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ClientLayout>
  );
}
