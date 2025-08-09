import { Link } from "react-router-dom";
import CartButton from "@/components/common/CartButton";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { SignupDialog } from "@/components/auth/SignupDialog";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl flex items-center gap-3">
          <img 
            src="/lovable-uploads/icon.png" 
            alt="Swan Botanicals Logo" 
            className="h-8 w-8 object-contain"
          />
          Swan Botanicals
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="story-link">Home</Link>
          <Link to="/products" className="story-link">Products</Link>
          <Link to="/botanical-garden" className="story-link">Botanical Garden</Link>
          <Link to="/quiz" className="story-link">Skin Quiz</Link>
          <Link to="/journal" className="story-link">Journal</Link>
          <Link to="/sustainability" className="story-link">Sustainability</Link>
          <Link to="/trust" className="story-link">Trust</Link>
        </div>
        <div className="flex items-center gap-4">
          <CartButton />
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <LoginDialog />
              <SignupDialog />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;