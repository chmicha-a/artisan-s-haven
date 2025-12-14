import { Package, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { artistOrders } from '@/data/mockData';

export default function MySalesPage() {
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

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'Payée', className: 'bg-green-100 text-green-800' },
      shipped: { label: 'Expédiée', className: 'bg-blue-100 text-blue-800' },
      delivered: { label: 'Livrée', className: 'bg-purple-100 text-purple-800' },
    };
    const config = configs[status] || configs.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // Calculate stats
  const totalSales = artistOrders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = artistOrders.length;
  const paidOrders = artistOrders.filter((o) => o.status !== 'pending').length;

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Mes Ventes
          </h1>
          <p className="text-muted-foreground">
            Suivez les commandes de vos œuvres
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenus totaux</p>
                  <p className="font-display text-2xl font-bold">{formatPrice(totalSales)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commandes totales</p>
                  <p className="font-display text-2xl font-bold">{totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Commandes payées</p>
                  <p className="font-display text-2xl font-bold">{paidOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {artistOrders.length > 0 ? (
              <div className="space-y-4">
                {artistOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                  >
                    <div className="flex gap-4">
                      {order.items[0] && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={order.items[0].artwork.images[0]}
                            alt={order.items[0].artwork.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm">
                          {order.items.map((i) => i.artwork.title).join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-display font-bold text-primary">
                          {formatPrice(order.total)}
                        </p>
                        {getStatusBadge(order.status)}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune vente pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
