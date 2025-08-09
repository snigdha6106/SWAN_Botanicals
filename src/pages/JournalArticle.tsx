import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const articles = {
  "why-gentle-care-works": {
    title: "Why Gentle Care Works",
    summary: "The science behind soothing, barrier‑first formulas.",
    author: "Swan Botanicals Team",
    readTime: "3 min read",
    content: `Harsh surfactants and aggressive actives can damage the skin and scalp barrier. Gentle, pH‑balanced formulas preserve lipids and maintain microbiome harmony. GLOHA focuses on botanicals like bhringraj and amla that nurture without stripping.

When we talk about gentle care, we're referring to formulations that respect the natural balance of your scalp and hair. Traditional hair care products often contain harsh chemicals that strip away natural oils, leading to a cycle of over-production and damage.

Our approach is different. We use gentle surfactants derived from coconut and sugar, which clean effectively without disrupting the scalp's natural barrier. This is especially important for families with children, as their delicate scalps need extra care and protection.

The botanicals we choose aren't just marketing claims—they're carefully selected for their proven benefits. Bhringraj, known as the "king of herbs" in Ayurveda, has been used for centuries to promote hair growth and strength. Amla, rich in vitamin C and antioxidants, helps protect hair from environmental damage while adding natural shine.

But gentle care isn't just about what we put in our products—it's about what we leave out. No sulfates, no parabens, no silicones, no artificial fragrances. This commitment to clean ingredients means our products are safe for daily use, even for the most sensitive scalps.

The results speak for themselves: healthier hair that grows stronger, shinier, and more resilient over time. It's not about quick fixes—it's about building a foundation of health that lasts.`,
    tags: ["Science", "Gentle Care", "Botanicals", "Family Safe"]
  },
  "herbs-we-love": {
    title: "Herbs We Love in GLOHA",
    summary: "From bhringraj to amla — meet the botanicals.",
    author: "Swan Botanicals Team",
    readTime: "4 min read",
    content: `Bhringraj supports hair growth, amla brings antioxidant power, aloe soothes, and hibiscus promotes shine. Each herb is included with purpose — simple, effective, and family‑friendly.

Let's dive deeper into the botanical treasures that make GLOHA special. These aren't just ingredients—they're centuries-old wisdom passed down through generations of healers and herbalists.

BHRINGRAJ (Eclipta alba) - 
Known as the "king of herbs" in Ayurvedic tradition, bhringraj has been used for over 3,000 years to promote hair health. Rich in flavonoids and alkaloids, it helps strengthen hair follicles and promote healthy growth. Modern research supports its traditional use, showing it can help reduce hair fall and improve hair density.

AMLA (Emblica officinalis) - 
This small, tart fruit packs a powerful punch of vitamin C and antioxidants. Amla helps protect hair from free radical damage, which can lead to premature aging and hair loss. It also helps maintain the natural pH balance of the scalp, creating an environment where healthy hair can thrive.

ALOE VERA - 
More than just a soothing gel, aloe vera contains enzymes that help remove dead skin cells from the scalp, promoting better absorption of nutrients. It's also rich in vitamins A, C, and E, which are essential for healthy hair growth and maintenance.

HIBISCUS - 
This beautiful flower isn't just pretty—it's packed with amino acids that help strengthen hair and prevent breakage. Hibiscus also contains natural mucilage that helps condition hair, leaving it soft and manageable.

NEEEM - 
A powerful natural antiseptic, neem helps maintain a healthy scalp environment by fighting bacteria and fungi that can cause dandruff and other scalp issues. It's particularly beneficial for those with sensitive or problematic scalps.

FENUGREEK - 
Rich in proteins and nicotinic acid, fenugreek helps strengthen hair follicles and promote growth. It also contains lecithin, which helps condition and moisturize hair naturally.

Each of these herbs is carefully sourced from organic farms and processed using traditional methods that preserve their natural benefits. We don't just add them for their names—we add them because they work, and they've been working for thousands of years.`,
    tags: ["Botanicals", "Ayurveda", "Natural Ingredients", "Hair Health"]
  },
  "moms-guide-to-routines": {
    title: "A Mom's Guide to Hair Care Routines",
    summary: "Simple steps that fit real life (and little hands).",
    author: "Swan Botanicals Team",
    readTime: "5 min read",
    content: `Consistency beats intensity. Choose a calm routine: cleanse, nourish, protect. We designed GLOHA for quick, gentle rituals that work for everyone at home.

As a mom, you know that life doesn't always follow a perfect schedule. Between school runs, work meetings, and bedtime battles, finding time for elaborate hair care routines can feel impossible. That's why we've designed GLOHA to work with your life, not against it.

The 3-Minute Morning Routine - 
Start with a gentle cleanse using our sulfate-free shampoo. It's mild enough for daily use, so you don't have to worry about over-drying. Follow with our nourishing conditioner, which detangles and adds shine in just one minute. For extra protection, add a small amount of our hair oil to the ends.

The Quick Refresh - 
On days when you don't have time for a full wash, our hair mist is your best friend. A few spritzes can refresh hair, add moisture, and even provide UV protection. It's perfect for those rushed mornings when you need to look put-together in minutes.

The Weekend Treatment - 
Once a week, treat your family to our hair mask. It's a 10-minute ritual that can become a special bonding time. Apply the mask, put on some music, and let it work while you catch up on life. The results will last all week.

Involving the Kids - 
Getting children involved in their hair care routine can be fun and educational. Let them choose their own hair accessories, or make a game out of applying products. Our gentle formulas mean you don't have to worry about harsh chemicals if they get a little overzealous.

The Evening Wind-Down - 
End the day with a calming scalp massage using our hair oil. It's a perfect bedtime ritual that helps relax both you and your children while promoting healthy hair growth. Just a few minutes of gentle massage can make a big difference over time.

Tips for Busy Moms - 
- Keep products in the shower for easy access
- Use a shower caddy to organize everything
- Set a timer for treatments so you don't forget
- Make it a family affair—kids love routines too
- Don't stress about perfection—consistency matters more

Remember, the best routine is the one you'll actually do. Start small, be patient with yourself, and celebrate the small wins. Your hair—and your family—will thank you for it.`,
    tags: ["Routines", "Family", "Time-Saving", "Tips"]
  },
} as const;

const JournalArticle = () => {
  const { slug } = useParams();
  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <>
        <Header />
        <main className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Article Not Found</h1>
            <p className="text-muted-foreground text-lg mb-6">The article you're looking for doesn't exist.</p>
            <Button variant="hero" asChild>
              <Link to="/journal" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Journal
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
          </div>

        {/* Article Header */}
        <article className="prose prose-lg max-w-none">
          <header className="text-center mb-12">
            <div className="mb-6">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-card border rounded-xl p-8 md:p-12 shadow-elev">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 text-center">
            <div className="border-t pt-8">
              <p className="text-muted-foreground mb-4">
                Share this article with other moms who might find it helpful
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" size="sm">
                  Share on Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm">
                  Copy Link
                </Button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
    <Footer />
  </>
);
};

export default JournalArticle;
