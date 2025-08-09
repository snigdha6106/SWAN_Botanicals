import ProductShowcase from "@/components/landing/ProductShowcase";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";

const Products = () => {
  return (
    <>
      <Header />
      <main>
        <ProductShowcase />
      </main>
      <Footer />
    </>
  );
};

export default Products;