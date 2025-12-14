import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import MyArtworksPage from "./pages/artist/MyArtworksPage";
import MySalesPage from "./pages/artist/MySalesPage";
import NewArtworkPage from "./pages/artist/NewArtworkPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/oeuvre/:id" element={<ArtworkDetailPage />} />
              <Route path="/panier" element={<CartPage />} />
              <Route path="/connexion" element={<LoginPage />} />
              <Route path="/inscription" element={<RegisterPage />} />
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/commandes" element={<OrdersPage />} />
              <Route path="/mes-oeuvres" element={<MyArtworksPage />} />
              <Route path="/mes-oeuvres/nouvelle" element={<NewArtworkPage />} />
              <Route path="/mes-ventes" element={<MySalesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
