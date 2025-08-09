import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const heroImg = "/lovable-uploads/home.jpg";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <header ref={ref} className="relative overflow-hidden">
      <div className="interactive-spotlight absolute inset-0 pointer-events-none" aria-hidden="true" />

      <section className="container relative grid gap-10 md:grid-cols-2 py-16 items-center">
        <div className="space-y-6 animate-enter">
          {user && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="text-primary font-medium text-lg">
                Hi {user.name}! 👋
              </p>
              <p className="text-primary/80 text-sm mt-1">
                Welcome back to your botanical wellness journey
              </p>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Swan Botanicals — Nature's Gentle Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose">
            Thoughtful, botanical care crafted with a mother’s love. Clean formulas, real ingredients, and a soothing ritual you can trust.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/quiz">
              <Button
                variant="hero"
                size="lg"
              >
                Start Skin Quiz
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="soft" size="lg">Shop GLOHA</Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImg}
            alt="Swan Botanicals GLOHA Hair Oil bottle product photo on soft mint background"
            className="w-full max-w-md mx-auto rounded-lg shadow-elev hover-scale"
            loading="lazy"
          />
        </div>
      </section>
    </header>
  );
};
export default Hero;
