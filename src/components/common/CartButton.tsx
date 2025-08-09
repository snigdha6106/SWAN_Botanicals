import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

export const CartButton = () => {
  const { count } = useCart();
  return (
    <Link to="/cart" className="relative inline-flex items-center gap-2 hover-scale" aria-label={`Cart with ${count} items`}>
      <ShoppingBag className="h-5 w-5" />
      <span className="hidden md:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-3 text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
};
export default CartButton;
