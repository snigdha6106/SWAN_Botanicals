import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-display text-lg">Swan Botanicals</p>
          <p className="text-muted-foreground mt-2">Nature’s gentle touch, bottled with care.</p>
        </div>
        <nav className="grid gap-2">
          <Link to="/products" className="story-link">Products</Link>
          <Link to="/journal" className="story-link">Journal</Link>
          <Link to="/sustainability" className="story-link">Sustainability</Link>
        </nav>
        <div className="text-muted-foreground">
          <p>© {new Date().getFullYear()} Swan Botanicals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
