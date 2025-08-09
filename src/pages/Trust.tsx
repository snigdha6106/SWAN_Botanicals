import TrustSection from "@/components/landing/Trust";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

const Trust = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-primary mb-6">Trust in Our Standards</h1>
            <p className="text-muted-foreground text-lg">
              We believe you should never have to choose between effective hair care and safety.
              Our products are crafted with the highest standards of quality, safety, and transparency.
            </p>
          </div>
          <TrustSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Trust;