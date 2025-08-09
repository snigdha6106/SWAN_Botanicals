import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext"; 
const products = [
  // Conditioner - Single product with multiple images
  { 
    id: 'gloha-conditioner', 
    name: 'GLOHA Conditioner', 
    price: 999, 
    images: [
      "/lovable-uploads/conditioner1.jpg",
      "/lovable-uploads/conditioner2.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Conditioner", 
    category: 'Conditioner' 
  },
  
  // Shampoo - Single product with multiple images
  { 
    id: 'gloha-shampoo', 
    name: 'GLOHA Shampoo - 60ml', 
    price: 199, 
    images: [
      "/lovable-uploads/shampoo2_60ml.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Shampoo - 60ml", 
    category: 'Shampoo' 
  },

  { 
    id: 'gloha-shampoo', 
    name: 'GLOHA Shampoo - 300ml', 
    price: 1049, 
    images: [
      "/lovable-uploads/shampoo1_300ml.jpg",
      "/lovable-uploads/shampoo1_300ml1.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Shampoo - 300ml", 
    category: 'Shampoo' 
  },
  
  // Hair Oil - Single product with multiple images
  { 
    id: 'gloha-hair-oil', 
    name: 'GLOHA Hair Oil', 
    price: 929, 
    images: [
      "/lovable-uploads/hair_oil1.jpg",
      "/lovable-uploads/hair_oil2.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Hair Oil", 
    category: 'Hair Oil' 
  },
  
  // Sets - Three products with set images plus all images
  { 
    id: 'gloha-set-3', 
    name: 'GLOHA Shampoo & Conditioner Set', 
    price: 2049, 
    images: [
      "/lovable-uploads/set3.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Shampoo & Conditioner Set", 
    category: 'Sets' 
  },
  { 
    id: 'gloha-set-1', 
    name: 'GLOHA Complete Set (Set of Conditioner, Shampoo and Hair Oil)', 
    price: 2999, 
    images: [
      "/lovable-uploads/set1.jpg",
      "/lovable-uploads/set2.jpg",
      "/lovable-uploads/all.jpg",
      "/lovable-uploads/all2.jpg"
    ],
    alt: "Swan Botanicals GLOHA Complete Set (Set of Conditioner, Shampoo and Hair Oil)", 
    category: 'Sets' 
  },
  
];

export const ProductShowcase = () => {
  const { addItem } = useCart();
  
  // Group products by category
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <section className="container py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-display text-3xl md:text-4xl">GLOHA Hair Care Collection</h2>
        <p className="text-muted-foreground mt-3">Our essential hair care collection featuring premium shampoos, conditioners, and hair oils — with no sulphates, parabens, or silicones.</p>
        <p className="text-sm text-muted-foreground mt-2">Explore our complete range of hair care products organized by category.</p>
      </div>

      {/* Special layout for Conditioner and Hair Oil side by side */}
      {(categories['Conditioner'] || categories['Hair Oil']) && (
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories['Conditioner'] && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-center mb-8 text-primary">Conditioner</h3>
                <div className="relative">
                  <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="justify-center">
                      {categories['Conditioner'].map((p) => (
                        <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-full">
                          <figure className="p-4 border rounded-xl bg-card shadow-elev h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <Carousel className="w-full" opts={{ loop: true }}>
                                <CarouselContent>
                                  {p.images.map((imageSrc, index) => (
                                    <CarouselItem key={index}>
                                      <img src={imageSrc} alt={`${p.alt} - Image ${index + 1}`} loading="lazy" className="w-full h-[280px] object-contain rounded-md" />
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                              </Carousel>
                              <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                                {p.category}
                              </div>
                            </div>
                            <figcaption className="mt-4 flex-1 flex flex-col">
                              <div className="flex-1">
                                <p className="font-medium text-lg">{p.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">₹{p.price}</p>
                              </div>
                              <Button 
                                variant="hero" 
                                className="mt-3 w-full"
                                onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.images[0] })}
                              >
                                Add to cart
                              </Button>
                            </figcaption>
                          </figure>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious aria-label="Previous Conditioner products" />
                    <CarouselNext aria-label="Next Conditioner products" />
                  </Carousel>
                </div>
              </div>
            )}

            {categories['Hair Oil'] && (
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-center mb-8 text-primary">Hair Oil</h3>
                <div className="relative">
                  <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
                    <CarouselContent className="justify-center">
                      {categories['Hair Oil'].map((p) => (
                        <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-full">
                          <figure className="p-4 border rounded-xl bg-card shadow-elev h-full flex flex-col hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <Carousel className="w-full" opts={{ loop: true }}>
                                <CarouselContent>
                                  {p.images.map((imageSrc, index) => (
                                    <CarouselItem key={index}>
                                      <img src={imageSrc} alt={`${p.alt} - Image ${index + 1}`} loading="lazy" className="w-full h-[280px] object-contain rounded-md" />
                                    </CarouselItem>
                                  ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                              </Carousel>
                              <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                                {p.category}
                              </div>
                            </div>
                            <figcaption className="mt-4 flex-1 flex flex-col">
                              <div className="flex-1">
                                <p className="font-medium text-lg">{p.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">₹{p.price}</p>
                              </div>
                              <Button 
                                variant="hero" 
                                className="mt-3 w-full"
                                onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.images[0] })}
                              >
                                Add to cart
                              </Button>
                            </figcaption>
                          </figure>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious aria-label="Previous Hair Oil products" />
                    <CarouselNext aria-label="Next Hair Oil products" />
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Render other categories normally */}
      {Object.entries(categories)
        .filter(([category]) => category !== 'Conditioner' && category !== 'Hair Oil')
        .map(([category, categoryProducts]) => (
          <div key={category} className="mb-16">
            <h3 className="font-display text-2xl md:text-3xl text-center mb-8 text-primary">{category}</h3>
            <div className="relative">
              <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
                <CarouselContent className="justify-center">
                  {categoryProducts.map((p) => (
                    <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/2">
                      <figure className="p-4 border rounded-xl bg-card shadow-elev h-full flex flex-col hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <Carousel className="w-full" opts={{ loop: true }}>
                            <CarouselContent>
                              {p.images.map((imageSrc, index) => (
                                <CarouselItem key={index}>
                                  <img src={imageSrc} alt={`${p.alt} - Image ${index + 1}`} loading="lazy" className="w-full h-[280px] object-contain rounded-md" />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </Carousel>
                          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                            {p.category}
                          </div>
                        </div>
                        <figcaption className="mt-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <p className="font-medium text-lg">{p.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">₹{p.price}</p>
                          </div>
                          <Button 
                            variant="hero" 
                            className="mt-3 w-full"
                            onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.images[0] })}
                          >
                            Add to cart
                          </Button>
                        </figcaption>
                      </figure>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious aria-label={`Previous ${category} products`} />
                <CarouselNext aria-label={`Next ${category} products`} />
              </Carousel>
            </div>
          </div>
        ))}
    </section>
  );
};
export default ProductShowcase;
