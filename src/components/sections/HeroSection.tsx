import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroSection as HeroSectionType } from "@/lib/content";
import { useEffect, useRef } from "react";

interface Props { data: HeroSectionType }

const HeroSection = ({ data }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Simple resize handler for static site compatibility
    const handleResize = () => {
      if (imageRef.current && typeof window !== 'undefined') {
        // Ensure smooth transitions on resize
        const img = imageRef.current;
        img.style.transition = 'all 0.3s ease-out';
      }
    };

    // Only add event listener if we're in the browser
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-cream overflow-hidden" role="banner" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={data.image}
          alt={data.imageAlt}
          className="w-full h-full object-cover opacity-60 hero-background-responsive"
          style={{
            minWidth: '100%',
            minHeight: '100%'
          }}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-brand-cream/40" />
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70">
          <div className="w-full h-full" style={{
            background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.65) 25%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.08) 75%, rgba(255,255,255,0) 100%)"
          }} />
        </div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <header className="mb-6">
          <img 
            src="https://doughandbeats.co.uk/images/logo.jpg" 
            alt="Dough & Beats circular logo" 
            className="h-48 w-48 rounded-full border-8 border-white shadow-lg object-cover mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter mb-4">{data.title}</h1>
          <p className="text-xl md:text-2xl text-brand-black font-medium mb-8">{data.tagline}</p>
        </header>
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-lg text-brand-black/80 leading-relaxed">{data.subcopy}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-transform transform hover:scale-105" asChild>
            <Link to={data.primaryCta.to}>{data.primaryCta.label}</Link>
          </Button>
          {data.secondaryCta && (
            <Button variant="ghost" size="lg" className="text-brand-tomato hover:text-brand-tomato/90 hover:bg-brand-tomato/10 font-bold px-8 py-6 text-lg rounded-full transition-colors" asChild>
              <Link to={data.secondaryCta.to}>{data.secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
