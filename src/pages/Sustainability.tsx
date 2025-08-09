import SustainabilitySection from "@/components/landing/Sustainability";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

const Sustainability = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">Our Sustainability Practices</h1>
            <p className="text-muted-foreground text-lg">
              At Swan Botanicals, we're committed to protecting the planet while creating gentle, effective hair care.
              Our approach to sustainability touches every aspect of our business—from sourcing to packaging.
            </p>
          </div>
          <SustainabilitySection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sustainability;