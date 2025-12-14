import { Link } from 'react-router-dom';
import { Package, Eye, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { mockOrders } from '@/data/mockData';

export default function OrdersPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; icon: React.ElementType; className: string }> = {
      pending: { label: 'En attente', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Payée', icon: CheckCircle, className: 'bg-blue-100 text-blue-800' },
      shipped: { label: 'Expédiée', icon: Truck, className: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Livrée', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Annulée', icon: XCircle, className: 'bg-red-100 text-red-800' },
    };
    return configs[status] || configs.pending;
  };

  if (mockOrders.length === 0) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Aucune commande</h1>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore passé de commande
            </p>
            <Link to="/catalogue">
              <Button variant="burgundy">
                Explorer le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Mes Commandes
        </h1>

        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="font-display text-lg">
                        Commande {order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={`${statusConfig.className} gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <Link to={`/oeuvre/${item.artwork.id}`} className="shrink-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.artwork.images[0]}
                              alt={item.artwork.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/oeuvre/${item.artwork.id}`}
                            className="font-medium hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.artwork.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.artist.name}
                          </p>
                          <p className="text-sm font-medium">
                            {formatPrice(item.artwork.price)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-display text-lg font-bold text-primary">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ClientLayout>
  );
}
