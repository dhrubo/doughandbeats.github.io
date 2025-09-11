import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroPanuozzo from "@/assets/hero-panuozzo.jpg";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-cream overflow-hidden" role="banner">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract pattern of green and white" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <header className="mb-6">
          <img 
            src="https://doughandbeats.co.uk/images/logo.jpg" 
            alt="Dough & Beats circular logo" 
            className="h-48 w-48 rounded-full border-8 border-white shadow-lg object-cover mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter mb-4">
            DOUGH & BEATS
          </h1>
          <p className="text-xl md:text-2xl text-brand-black font-medium mb-8">
            Streetside Panuozzo. Rhythm & Soul.
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-lg text-brand-black/80 leading-relaxed">
            Handcrafted Neapolitan-style pizza sandwiches, baked fresh in our portable ovens. Find us across London.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-brand-charcoal hover:bg-brand-charcoal/90 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-transform transform hover:scale-105"
            asChild
          >
            <Link to="/contact">
              Book An Event
            </Link>
          </Button>
          <Button 
            variant="ghost"
            size="lg"
            className="text-brand-tomato hover:text-brand-tomato/90 hover:bg-brand-tomato/10 font-bold px-8 py-6 text-lg rounded-full transition-colors"
            asChild
          >
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;