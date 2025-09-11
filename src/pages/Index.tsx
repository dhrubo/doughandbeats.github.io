import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, MapPin, PartyPopper } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-off-white">
      <Hero />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-tomato mb-6 tracking-tight">
            Rhythm & Soul in Every Bite
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-brand-charcoal/80 leading-relaxed">
            We're an independent mobile food business serving handcrafted, contemporary Neapolitan-style pizza sandwiches (Panuozzo) across London. Our passion is simple: combine authentic Italian street food with good vibes.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-brand-tomato rounded-full p-5 mb-5 inline-block">
                <ChefHat className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-3">Authentic Panuozzo</h3>
              <p className="text-brand-charcoal/80">Made with our signature 24-hour fermented dough, baked to perfection for a crispy crust and a soft, airy inside.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-brand-tomato rounded-full p-5 mb-5 inline-block">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-3">Find Us In London</h3>
              <p className="text-brand-charcoal/80">We pop up at various markets, festivals, and private events. Follow our journey on Instagram to see where we are next!</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-brand-tomato rounded-full p-5 mb-5 inline-block">
                <PartyPopper className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-3">Catering & Events</h3>
              <p className="text-brand-charcoal/80">Want to bring Dough & Beats to your party? We cater for private events, weddings, and corporate functions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Got an Event?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">
            Let us bring the flavour and the beats to you. Get in touch to discuss your event.
          </p>
          <Button 
            size="lg"
            className="bg-brand-tomato hover:bg-brand-tomato-dark text-white font-bold text-xl rounded-full px-10 py-7"
            asChild
          >
            <Link to="/contact">
              Book Us Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
