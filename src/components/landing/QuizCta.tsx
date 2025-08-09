import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const QuizCta = () => {
  return (
    <section id="quiz" className="container py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-secondary shadow-elev">
        <div>
          <h2 className="font-display text-3xl">Find your gentle routine</h2>
          <p className="text-muted-foreground mt-3">Answer a few friendly questions and we’ll suggest a soothing routine based on your skin’s needs.</p>
        </div>
        <div className="flex md:justify-end items-center gap-3">
          <Link to="/quiz"><Button variant="hero" size="lg">Take the 2‑min Quiz</Button></Link>
          <Link to="/products"><Button variant="outline" size="lg">Browse products</Button></Link>
        </div>
      </div>
    </section>
  );
};
export default QuizCta;
