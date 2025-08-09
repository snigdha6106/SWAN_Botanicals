import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import JournalArticle from "./pages/JournalArticle";
import Journal from "./pages/Journal";
import Quiz from "./pages/Quiz";
import Products from "./pages/Products";
import Sustainability from "./pages/Sustainability";
import Trust from "./pages/Trust";
import OrderHistory from "./pages/OrderHistory";
import BotanicalGarden from "./pages/BotanicalGarden";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:slug" element={<JournalArticle />} />
              <Route path="/botanical-garden" element={<BotanicalGarden />} />
              <Route path="/orders" element={<OrderHistory />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;