import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { title: "Why gentle care works", excerpt: "The science behind soothing, barrier‑first formulas.", href: "/journal/why-gentle-care-works" },
  { title: "Herbs we love in GLOHA", excerpt: "From bhringraj to amla — meet the botanicals.", href: "/journal/herbs-we-love" },
  { title: "A mom's guide to routines", excerpt: "Simple steps that fit real life (and little hands).", href: "/journal/moms-guide-to-routines" },
];

const Journal = () => {
  return (
    <>
      <Header />
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">Botanical Journal</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ingredients and routines explained the friendly way. Discover the science and stories behind our botanical formulations.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="rounded-xl border p-6 bg-card shadow-elev hover-scale">
                <h2 className="font-lora text-xl mb-3">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{post.excerpt}</p>
                <Link to={post.href} className="story-link inline-flex items-center gap-2" aria-label={`${post.title} — read more`}>
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Journal;
