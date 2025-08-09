import { ShieldCheck, FlaskConical, HeartHandshake } from "lucide-react";

export const Trust = () => {
  return (
    <section className="container py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl">Tested by Moms, Backed by Science</h2>
        <p className="text-muted-foreground mt-3">AYUSH licensed manufacturing, dermatologically tested, and crafted with families in mind.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4 bg-card shadow-elev">
            <ShieldCheck className="mx-auto text-primary" />
            <p className="mt-2 text-sm">AYUSH Licensed</p>
          </div>
          <div className="rounded-xl border p-4 bg-card shadow-elev">
            <FlaskConical className="mx-auto text-primary" />
            <p className="mt-2 text-sm">Dermatologically Tested</p>
          </div>
          <div className="rounded-xl border p-4 bg-card shadow-elev">
            <HeartHandshake className="mx-auto text-primary" />
            <p className="mt-2 text-sm">Family‑Safe Standards</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Trust;
