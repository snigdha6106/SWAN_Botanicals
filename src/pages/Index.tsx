import Hero from "@/components/landing/Hero";
import QuizCta from "@/components/landing/QuizCta";
import JournalPreview from "@/components/landing/JournalPreview";
import Footer from "@/components/landing/Footer";
import CartButton from "@/components/common/CartButton";
import Header from "@/components/landing/Header";

const Index = () => {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Swan Botanicals',
    url: '/',
    sameAs: [],
    logo: '/favicon.ico',
  };

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'GLOHA Hair Oil',
    image: [
      '/lovable-uploads/b848b2d1-3040-4bda-b06f-b1e665cfbf0d.png'
    ],
    description: 'A gentle, botanical hair oil with the benefit of 18+ herbs.',
    brand: {
      '@type': 'Brand',
      name: 'Swan Botanicals'
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuizCta />
        <JournalPreview />
      </main>
      <Footer />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
};

export default Index;
