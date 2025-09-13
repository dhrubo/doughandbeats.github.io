import { CtaSection as CtaSectionType } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CtaSection({ data }: { data: CtaSectionType }) {
  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{data.heading}</h2>
        <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">{data.body}</p>
        <Button size="lg" className="bg-brand-tomato hover:bg-brand-tomato-dark text-white font-bold text-xl rounded-full px-10 py-7" asChild>
          <Link to={data.cta.to}>{data.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
