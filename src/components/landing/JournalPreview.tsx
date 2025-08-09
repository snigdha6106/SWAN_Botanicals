import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { title: "Why gentle care works", excerpt: "The science behind soothing, barrier‑first formulas.", href: "/journal/why-gentle-care-works" },
  { title: "Herbs we love in GLOHA", excerpt: "From bhringraj to amla — meet the botanicals.", href: "/journal/herbs-we-love" },
  { title: "A mom’s guide to routines", excerpt: "Simple steps that fit real life (and little hands).", href: "/journal/moms-guide-to-routines" },
];

export const JournalPreview = () => {
  return (
    <section id="journal" className="container py-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl">Botanical Journal</h2>
        <p className="text-muted-foreground mt-3">Ingredients and routines explained the friendly way.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="rounded-xl border p-6 bg-card shadow-elev hover-scale">
            <h3 className="font-lora text-xl mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
            <Link to={p.href} className="story-link inline-flex items-center gap-2" aria-label={`${p.title} — read more`}>
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
export default JournalPreview;
