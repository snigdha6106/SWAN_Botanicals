import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const qs = [
  { key: 'scalp', q: 'How does your scalp usually feel?', a: ['Balanced', 'Dry/Itchy', 'Oily', 'Flaky/Dandruff'] },
  { key: 'hair', q: 'Your primary hair concern?', a: ['Hair fall/Thinning', 'Frizz/Flyaways', 'Dullness/Lack of shine', 'Damage/Breakage', 'Slow growth'] },
  { key: 'wash', q: 'How often do you wash your hair?', a: ['Daily', '2-3x/week', 'Weekly', 'Less than weekly'] },
  { key: 'style', q: 'Styling/heat usage?', a: ['Rarely', 'Sometimes', 'Often', 'Daily heat styling'] },
  { key: 'sensitive', q: 'Any sensitivity?', a: ['No', 'Mild', 'Yes, sensitive', 'Very sensitive'] },
  { key: 'age', q: 'Age group?', a: ['Under 25', '25-40', '40-60', '60+'] },
  { key: 'environment', q: 'Environmental factors?', a: ['Normal', 'Humid climate', 'Dry climate', 'Pollution exposure'] },
];

// Products from ProductShowcase
const products = {
  conditioner: {
    id: 'gloha-conditioner',
    name: 'GLOHA Conditioner',
    price: 999,
    image: '/lovable-uploads/conditioner1.jpg',
    benefits: ['Deep nourishment', 'Detangles hair', 'Adds natural shine', 'Sulfate-free formula']
  },
  shampoo60ml: {
    id: 'gloha-shampoo-60ml',
    name: 'GLOHA Shampoo - 60ml',
    price: 199,
    image: '/lovable-uploads/shampoo2_60ml.jpg',
    benefits: ['Gentle cleansing', 'Travel-friendly size', 'pH balanced', 'No harsh chemicals']
  },
  shampoo300ml: {
    id: 'gloha-shampoo-300ml',
    name: 'GLOHA Shampoo - 300ml',
    price: 1049,
    image: '/lovable-uploads/shampoo1_300ml.jpg',
    benefits: ['Gentle cleansing', 'Value size', 'pH balanced', 'Sulfate-free']
  },
  oil: {
    id: 'gloha-hair-oil',
    name: 'GLOHA Hair Oil',
    price: 929,
    image: '/lovable-uploads/hair_oil1.jpg',
    benefits: ['18+ herb blend', 'Scalp nourishment', 'Hair growth support', 'Natural protection']
  },
  shampooconditionerset: {
    id: 'gloha-set-3',
    name: 'GLOHA Shampoo & Conditioner Set',
    price: 2049,
    image: '/lovable-uploads/set3.jpg',
    benefits: ['Complete hair care', 'Perfect duo', 'Better value', 'Coordinated routine']
  },
  completeset: {
    id: 'gloha-set-1',
    name: 'GLOHA Complete Set (Conditioner, Shampoo and Hair Oil)',
    price: 2999,
    image: '/lovable-uploads/set1.jpg',
    benefits: ['Complete hair care system', 'Best value', 'All-in-one solution', 'Comprehensive routine']
  }
};

const Quiz = () => {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { addItem } = useCart();

  const select = (choice: string) => {
    const key = qs[i].key;
    setAnswers((s) => ({ ...s, [key]: choice }));
    setI((s) => Math.min(qs.length, s + 1));
  };

  const restart = () => { setI(0); setAnswers({}); };

  const recommend = () => {
    const rec: Array<typeof products[keyof typeof products]> = [];
    const reasons: string[] = [];
    
    // Scalp-based recommendations
    if (answers.scalp === 'Dry/Itchy') {
      rec.push(products.oil);
      reasons.push('Hair oil with 18+ herb blend for scalp nourishment and dryness relief');
    } else if (answers.scalp === 'Oily') {
      rec.push(products.shampoo300ml);
      reasons.push('Gentle shampoo for effective cleansing without over-stripping');
    } else if (answers.scalp === 'Flaky/Dandruff') {
      rec.push(products.shampoo300ml, products.oil);
      reasons.push('Gentle shampoo for cleansing and hair oil for scalp health');
    }
    
    // Hair concern-based recommendations
    if (answers.hair === 'Hair fall/Thinning') {
      rec.push(products.oil, products.completeset);
      reasons.push('Hair oil for scalp nourishment and complete set for comprehensive care');
    } else if (answers.hair === 'Frizz/Flyaways') {
      rec.push(products.conditioner, products.shampooconditionerset);
      reasons.push('Conditioner for moisture control and shampoo-conditioner set for coordinated care');
    } else if (answers.hair === 'Dullness/Lack of shine') {
      rec.push(products.conditioner, products.oil);
      reasons.push('Conditioner for shine and hair oil for natural luster');
    } else if (answers.hair === 'Damage/Breakage') {
      rec.push(products.conditioner, products.oil);
      reasons.push('Deep nourishing conditioner for repair and hair oil for strengthening');
    } else if (answers.hair === 'Slow growth') {
      rec.push(products.oil, products.completeset);
      reasons.push('Hair oil for scalp stimulation and complete set for optimal growth support');
    }
    
    // Wash frequency recommendations
    if (answers.wash === 'Daily') {
      rec.push(products.shampoo60ml);
      reasons.push('Travel-size shampoo perfect for daily gentle cleansing');
    } else if (answers.wash === '2-3x/week') {
      rec.push(products.shampooconditionerset);
      reasons.push('Perfect duo for regular washing routine');
    } else if (answers.wash === 'Weekly' || answers.wash === 'Less than weekly') {
      rec.push(products.oil);
      reasons.push('Hair oil for nourishment between washes');
    }
    
    // Styling-based recommendations
    if (answers.style === 'Daily heat styling' || answers.style === 'Often') {
      rec.push(products.conditioner, products.oil);
      reasons.push('Conditioner for protection and hair oil for heat damage prevention');
    }
    
    // Sensitivity-based recommendations
    if (answers.sensitive === 'Very sensitive' || answers.sensitive === 'Yes, sensitive') {
      rec.push(products.oil);
      reasons.push('Natural herb-blend oil perfect for sensitive scalps');
    }
    
    // Age-based recommendations
    if (answers.age === '40-60' || answers.age === '60+') {
      rec.push(products.completeset);
      reasons.push('Complete hair care system for mature hair needs');
    } else if (answers.age === 'Under 25') {
      rec.push(products.shampoo60ml, products.conditioner);
      reasons.push('Travel-friendly shampoo and conditioner for young, active lifestyles');
    }
    
    // Environmental recommendations
    if (answers.environment === 'Humid climate') {
      rec.push(products.conditioner);
      reasons.push('Conditioner to control humidity-induced frizz');
    } else if (answers.environment === 'Dry climate') {
      rec.push(products.oil, products.conditioner);
      reasons.push('Hair oil and conditioner for extra moisture in dry climates');
    } else if (answers.environment === 'Pollution exposure') {
      rec.push(products.shampoo300ml, products.oil);
      reasons.push('Regular cleansing shampoo and protective hair oil');
    }
    
    // Always include basic care if no specific recommendations
    if (rec.length === 0) {
      rec.push(products.shampooconditionerset);
      reasons.push('Perfect shampoo and conditioner duo for healthy hair care');
    }
    
    // Remove duplicates and limit to 3 products
    const uniqueRecs = Array.from(new Set(rec)).slice(0, 3);
    
    // If we have less than 2 products, add complementary ones
    if (uniqueRecs.length === 1) {
      if (uniqueRecs[0] === products.oil) {
        uniqueRecs.push(products.shampoo300ml);
        reasons.push('Gentle shampoo to complement your hair oil routine');
      } else if (uniqueRecs[0] === products.conditioner) {
        uniqueRecs.push(products.shampoo300ml);
        reasons.push('Matching shampoo for your conditioner routine');
      } else if (uniqueRecs[0].id.includes('shampoo')) {
        uniqueRecs.push(products.conditioner);
        reasons.push('Conditioner to complete your cleansing routine');
      }
    }
    
    return { products: uniqueRecs, reasons };
  };

  if (i >= qs.length) {
    const { products: recs, reasons } = recommend();
    return (
      <>
        <Header />
        <main className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Your Personalized Hair Care Routine</h1>
              <p className="text-muted-foreground text-lg">Based on your answers, here's a gentle combination tailored just for you.</p>
            </div>
            
            {reasons.length > 0 && (
              <div className="mb-8 p-6 bg-secondary/50 rounded-xl border-l-4 border-primary">
                <h2 className="font-display text-xl mb-3">Why These Products?</h2>
                <ul className="space-y-2">
                  {reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span className="text-muted-foreground">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {recs.map((p) => (
                <div key={p.id} className="border rounded-xl p-4 bg-card shadow-elev hover:shadow-lg transition-all">
                  <div className="relative mb-4">
                    <img src={p.image} alt={p.name} className="w-full h-48 object-contain rounded-lg" />
                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Recommended
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{p.name}</h3>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-2">Key Benefits:</p>
                    <ul className="space-y-1">
                      {p.benefits?.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 bg-primary rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-primary">₹{p.price}</span>
                  </div>
                  <Button variant="hero" className="w-full" onClick={() => addItem(p)}>
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex gap-3 justify-center">
                <Button variant="soft" onClick={restart} className="px-8">
                  Retake Quiz
                </Button>
                <Button variant="outline" asChild className="px-8">
                  <Link to="/cart">View Cart ({recs.length} items)</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                All products are dermatologically tested and family-safe
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const step = qs[i];

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">2‑min Hair Care Quiz</h1>
            <p className="text-muted-foreground text-lg">We'll tailor a gentle routine for you.</p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Question {i + 1} of {qs.length}</span>
              <div className="w-32 bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((i + 1) / qs.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-xl p-8 bg-secondary/30 shadow-elev">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">{step.q}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {step.a.map((c) => (
                <Button
                  key={c}
                  variant="hero"
                  className="h-16 text-base font-medium hover:scale-105 transition-transform"
                  onClick={() => select(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Your answers help us create the perfect routine for your hair type
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Quiz;
