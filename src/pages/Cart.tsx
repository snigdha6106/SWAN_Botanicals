import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

const format = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const Cart = () => {
  const { items, updateQty, removeItem, total, clear } = useCart();

  return (
    <>
      <Header />
      <main className="container py-12">
        <h1 className="font-display text-3xl mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty. Explore our products on the home page.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 items-center border rounded-lg p-4 bg-card">
                  <img src={it.image} alt={it.name} className="w-20 h-20 object-contain rounded" />
                  <div className="flex-1">
                    <p className="font-medium">{it.name}</p>
                    <p className="text-sm text-muted-foreground">{format(it.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => updateQty(it.id, it.qty - 1)}>-</Button>
                    <span className="w-8 text-center">{it.qty}</span>
                    <Button variant="secondary" onClick={() => updateQty(it.id, it.qty + 1)}>+</Button>
                  </div>
                  <div className="w-24 text-right font-medium">{format(it.qty * it.price)}</div>
                  <Button variant="ghost" onClick={() => removeItem(it.id)}>Remove</Button>
                </div>
              ))}
            </div>
            <aside className="border rounded-lg p-6 h-fit sticky top-6 bg-card">
              <p className="text-lg font-medium">Order Summary</p>
              <div className="mt-4 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{format(total)}</span>
              </div>
              <div className="mt-6 space-y-2">
                <CheckoutForm />
                <Button variant="outline" className="w-full" onClick={() => clear()}>Clear cart</Button>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
