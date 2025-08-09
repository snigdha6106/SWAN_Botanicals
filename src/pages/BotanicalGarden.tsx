import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Leaf, Sparkles, Heart, Zap } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  products: string[];
  category: 'essential' | 'carrier' | 'botanical' | 'protein';
  icon: React.ReactNode;
}

const ingredients: Ingredient[] = [
  // Shampoo Ingredients
  {
    id: 'wheat-protein',
    name: 'Wheat Protein',
    description: 'A natural protein that strengthens and repairs damaged hair while adding volume and shine.',
    benefits: ['Strengthens hair', 'Adds volume', 'Repairs damage', 'Enhances shine'],
    products: ['Shampoo', 'Conditioner'],
    category: 'protein',
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera Extract',
    description: 'Known for its soothing and moisturizing properties, aloe vera calms the scalp and provides deep hydration.',
    benefits: ['Soothes scalp', 'Deep hydration', 'Reduces irritation', 'Natural healing'],
    products: ['Shampoo', 'Hair Oil'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: 'green-tea',
    name: 'Green Tea Extract',
    description: 'Rich in antioxidants, green tea extract protects hair from environmental damage and promotes healthy growth.',
    benefits: ['Antioxidant protection', 'Promotes growth', 'Reduces inflammation', 'Adds shine'],
    products: ['Shampoo'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: 'coconut-oil',
    name: 'Coconut Oil',
    description: 'A deeply moisturizing oil that penetrates the hair shaft to nourish and strengthen from within.',
    benefits: ['Deep moisturizing', 'Strengthens hair', 'Reduces protein loss', 'Adds softness'],
    products: ['Shampoo', 'Hair Oil'],
    category: 'carrier',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 'argan-oil',
    name: 'Argan Oil',
    description: 'Liquid gold for hair, argan oil provides intense moisture and helps tame frizz while adding brilliant shine.',
    benefits: ['Intense moisture', 'Reduces frizz', 'Adds shine', 'Heat protection'],
    products: ['Shampoo', 'Conditioner'],
    category: 'carrier',
    icon: <Sparkles className="h-5 w-5" />
  },

  // Hair Oil Ingredients
  {
    id: 'bhringraj',
    name: 'Bhringraj Raw Juice',
    description: 'An ancient Ayurvedic herb known as the "king of herbs" for hair, promoting growth and preventing premature graying.',
    benefits: ['Promotes hair growth', 'Prevents graying', 'Strengthens roots', 'Reduces hair fall'],
    products: ['Hair Oil'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: 'fenugreek-oil',
    name: 'Fenugreek Oil',
    description: 'Rich in proteins and nicotinic acid, fenugreek oil strengthens hair follicles and promotes healthy growth.',
    benefits: ['Strengthens follicles', 'Promotes growth', 'Adds shine', 'Reduces dandruff'],
    products: ['Hair Oil'],
    category: 'essential',
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 'flaxseed-oil',
    name: 'Flaxseed Oil',
    description: 'High in omega-3 fatty acids, flaxseed oil nourishes the scalp and promotes healthy hair growth.',
    benefits: ['Rich in omega-3', 'Nourishes scalp', 'Promotes growth', 'Adds moisture'],
    products: ['Hair Oil'],
    category: 'carrier',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 'black-seed-oil',
    name: 'Black Seed Oil',
    description: 'Also known as nigella sativa oil, this potent oil stimulates hair growth and has anti-inflammatory properties.',
    benefits: ['Stimulates growth', 'Anti-inflammatory', 'Strengthens hair', 'Reduces scalp issues'],
    products: ['Hair Oil'],
    category: 'essential',
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 'kalonji-oil',
    name: 'Kalonji Oil',
    description: 'Traditional oil known for its hair strengthening properties and ability to restore natural hair color.',
    benefits: ['Strengthens hair', 'Restores color', 'Prevents hair loss', 'Improves texture'],
    products: ['Hair Oil'],
    category: 'essential',
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus Flowers & Leaves',
    description: 'Natural conditioner that adds shine, prevents hair fall, and promotes healthy hair growth.',
    benefits: ['Natural conditioning', 'Prevents hair fall', 'Adds shine', 'Promotes growth'],
    products: ['Hair Oil'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: 'vetiver',
    name: 'Vetiver Roots',
    description: 'Known for its cooling and soothing properties, vetiver helps maintain scalp health.',
    benefits: ['Cooling effect', 'Soothes scalp', 'Improves circulation', 'Natural fragrance'],
    products: ['Hair Oil'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    id: 'lemongrass-oil',
    name: 'Lemongrass Oil',
    description: 'Antimicrobial essential oil that keeps the scalp clean and healthy while providing a refreshing scent.',
    benefits: ['Antimicrobial', 'Cleanses scalp', 'Refreshing scent', 'Balances oil'],
    products: ['Hair Oil'],
    category: 'essential',
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 'wheat-germ-oil',
    name: 'Wheat Germ Protein Oil',
    description: 'Rich in vitamins and proteins, this oil nourishes and strengthens hair while adding natural shine.',
    benefits: ['Rich in vitamins', 'Protein boost', 'Strengthens hair', 'Natural shine'],
    products: ['Hair Oil'],
    category: 'carrier',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 'peppermint-oil',
    name: 'Peppermint Oil',
    description: 'Stimulating essential oil that improves scalp circulation and provides a cooling, refreshing sensation.',
    benefits: ['Improves circulation', 'Cooling sensation', 'Stimulates follicles', 'Refreshing'],
    products: ['Hair Oil'],
    category: 'essential',
    icon: <Zap className="h-5 w-5" />
  },

  // Conditioner Ingredients
  {
    id: 'coconut-milk-oil',
    name: 'Coconut Milk Oil',
    description: 'Creamy and nourishing, coconut milk oil provides deep conditioning and helps detangle hair.',
    benefits: ['Deep conditioning', 'Detangles hair', 'Adds softness', 'Natural moisture'],
    products: ['Conditioner'],
    category: 'carrier',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 'jojoba-oil',
    name: 'Jojoba Oil',
    description: 'Technically a wax, jojoba closely mimics natural sebum and provides lightweight moisture without greasiness.',
    benefits: ['Lightweight moisture', 'Non-greasy', 'Balances oils', 'Softens hair'],
    products: ['Conditioner'],
    category: 'carrier',
    icon: <Heart className="h-5 w-5" />
  },
  {
    id: 'apple-cider-oil',
    name: 'Apple Cider Oil',
    description: 'Helps balance pH levels and adds natural shine while cleansing away buildup.',
    benefits: ['Balances pH', 'Adds shine', 'Removes buildup', 'Clarifies hair'],
    products: ['Conditioner'],
    category: 'botanical',
    icon: <Leaf className="h-5 w-5" />
  }
];

const categoryColors = {
  essential: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  carrier: 'bg-amber-100 text-amber-800 border-amber-200',
  botanical: 'bg-green-100 text-green-800 border-green-200',
  protein: 'bg-purple-100 text-purple-800 border-purple-200'
};

const categoryLabels = {
  essential: 'Essential Oil',
  carrier: 'Carrier Oil',
  botanical: 'Botanical Extract',
  protein: 'Protein'
};

export default function BotanicalGarden() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const filteredIngredients = selectedCategory === 'all' 
    ? ingredients 
    : ingredients.filter(ing => ing.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Botanical Garden
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the natural ingredients that make our hair care products extraordinary. 
            Each botanical and oil is carefully selected for its unique properties and benefits.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="capitalize"
          >
            All Ingredients
          </Button>
          {Object.keys(categoryLabels).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {categoryLabels[category as keyof typeof categoryLabels]}s
            </Button>
          ))}
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIngredients.map((ingredient) => (
            <Dialog key={ingredient.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover-scale hover:shadow-elev transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {ingredient.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                      {ingredient.name}
                    </CardTitle>
                    <Badge 
                      className={`${categoryColors[ingredient.category]} text-xs font-medium`}
                      variant="outline"
                    >
                      {categoryLabels[ingredient.category]}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                      {ingredient.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">Found in:</p>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.products.map((product) => (
                          <Badge key={product} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      {ingredient.icon}
                    </div>
                    {ingredient.name}
                  </DialogTitle>
                  <Badge 
                    className={`${categoryColors[ingredient.category]} w-fit`}
                    variant="outline"
                  >
                    {categoryLabels[ingredient.category]}
                  </Badge>
                </DialogHeader>
                <div className="space-y-6">
                  <DialogDescription className="text-base leading-relaxed">
                    {ingredient.description}
                  </DialogDescription>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Key Benefits:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {ingredient.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Found in these products:</h4>
                    <div className="space-y-2">
                      {ingredient.products.map((product) => (
                        <div key={product} className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="font-medium">{product}</span>
                          <Button size="sm" asChild>
                            <Link to="/products">Shop Now</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-2xl font-display font-bold mb-4">Experience the Power of Nature</h2>
            <p className="text-muted-foreground mb-6">
              All our products are sulfate-free and silicone-free, crafted with the finest botanical ingredients 
              for healthy, beautiful hair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/products">Shop All Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quiz">Take Skin Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
