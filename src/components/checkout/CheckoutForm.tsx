import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { apiService, type OrderRequest } from "@/services/api";
import { Loader2, CreditCard, Truck, MapPin } from "lucide-react";

interface CheckoutFormProps {
  children?: React.ReactNode;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export function CheckoutForm({ children }: CheckoutFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { items, total, clear } = useCart();
  const { user } = useAuth();

  const format = (n: number) => new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(n);

  const shippingCost = total > 500 ? 0 : 50;
  const finalTotal = total + shippingCost;

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData: OrderRequest = {
      items: items.map(it => ({ ...it, qty: it.qty, id: it.id })),
      shippingAddress: {
        ...shippingInfo,
        email: user?.email || shippingInfo.email,
        firstName: user?.name?.split(' ')[0] || shippingInfo.firstName,
        lastName: user?.name?.split(' ')[1] || shippingInfo.lastName,
      },
      paymentMethod,
      subtotal: total,
      shippingCost,
      total: finalTotal
    };

    try {
      const response = await apiService.createOrder(orderData);

      if (response.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${response.orderId} has been confirmed. Estimated delivery: ${new Date(response.estimatedDelivery).toLocaleDateString()}`,
        });

        clear();
        setOpen(false);
        
        // Reset form
        setShippingInfo({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });

      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : 'Could not place your order. Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill user info if logged in
  const userEmail = user?.email || shippingInfo.email;
  const userName = user?.name?.split(' ');
  const userFirstName = userName?.[0] || shippingInfo.firstName;
  const userLastName = userName?.[1] || shippingInfo.lastName;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="hero" className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Checkout
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your order by providing shipping details and payment information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.qty}</span>
                  <span>{format(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2">
                <span>Subtotal</span>
                <span>{format(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost > 0 ? format(shippingCost) : 'FREE'}</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span>Total</span>
                <span>{format(finalTotal)}</span>
              </div>
              {total <= 500 && (
                <p className="text-xs text-muted-foreground">
                  Add ₹{500 - total} more for free shipping!
                </p>
              )}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={user ? userFirstName : shippingInfo.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={user ? userLastName : shippingInfo.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={user ? userEmail : shippingInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isLoading || !!user}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                disabled={isLoading}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
                disabled={isLoading}
                placeholder="Street address, apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={shippingInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={shippingInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input
                  id="pincode"
                  value={shippingInfo.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  required
                  disabled={isLoading}
                  pattern="[0-9]{6}"
                  placeholder="000000"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h3>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="razorpay" id="razorpay" />
                <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Razorpay (UPI, Cards, Net Banking)</span>
                    <span className="text-sm text-muted-foreground">Recommended</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Cash on Delivery</span>
                    <span className="text-sm text-muted-foreground">+₹25 charges</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Order...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Place Order - {format(paymentMethod === 'cod' ? finalTotal + 25 : finalTotal)}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
