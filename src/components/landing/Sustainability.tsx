import { Leaf, Recycle, Droplets } from "lucide-react";

export const Sustainability = () => {
  return (
    <section className="container py-16">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6 bg-card shadow-elev">
          <Leaf className="text-primary mb-3" />
          <h3 className="font-display text-xl">Thoughtful sourcing</h3>
          <p className="text-muted-foreground mt-2">Botanicals from trusted partners — always cruelty‑free.</p>
        </div>
        <div className="rounded-xl border p-6 bg-card shadow-elev">
          <Recycle className="text-primary mb-3" />
          <h3 className="font-display text-xl">Responsible packaging</h3>
          <p className="text-muted-foreground mt-2">Recyclable materials and minimal inks where possible.</p>
        </div>
        <div className="rounded-xl border p-6 bg-card shadow-elev">
          <Droplets className="text-primary mb-3" />
          <h3 className="font-display text-xl">Clean formulas</h3>
          <p className="text-muted-foreground mt-2">No sulphates, parabens, or silicones. Gentle for families.</p>
        </div>
      </div>
    </section>
  );
};
export default Sustainability;
