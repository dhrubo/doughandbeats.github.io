// import image from src/assets failed to resolve; import directly from the project's images folder
// Use the public folder image to avoid bundling/import resolution issues
const newAboutImage = "/images/founders.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-brand-cream pt-20">
      {/* CSS for blurred frame effect around the image (uses public image path) */}
      <style>{`
        /* frame-blur: create a small, square, black blurred inner frame using an inset box-shadow */
        .frame-blur::after{
          content: "";
          position: absolute;
          /* inset a bit to make the frame smaller than the photo */
          left: 2%; right: 2%; top: 2%; bottom: 2%;
          border-radius: 2px;
          pointer-events: none;
          /* inset shadow produces a blurred dark frame inside the image */
          box-shadow: inset 0 0 28px 14px rgba(0,0,0,0.75);
        }
      `}</style>
      {/* Page Header */}
      <header className="py-16 md:py-24 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">
            Our Story
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">
            Where authentic Italian flavours meet London's vibrant street food culture.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full relative border border-white/5 frame-blur">
              <img
                src={newAboutImage}
                alt="The founders of Dough & Beats"
                className="w-full h-full object-cover block"
              />
                {/* CSS-only overlay: small square black blurred frame at the center */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                    {/* subtle outer ring (frame-blur pseudo-element provides the blurred square frame) */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                </div>
            </div>

            {/* Text Content */}
            <div className="text-lg text-brand-black/80 leading-relaxed">
              <h2 className="text-3xl font-bold text-brand-tomato mb-6">
                It started with a passion for flavour.
              </h2>
              <p className="mb-6">
                Dough & Beats is the creation of two friends, Nits and Dhru, passionate about bringing something fresh to the London street food scene. We combine our love for handcrafted Neapolitan-style pizza sandwiches (Panuozzo) with the rhythm and soul of the city.
              </p>
              <p className="mb-6">
                Our secret? It’s all in the dough. Fermented for 24 hours, our dough creates a panuozzo that’s perfectly crisp on the outside and light, airy, and full of flavour on the inside. Each sandwich is filled with premium, authentic Italian ingredients for an unforgettable bite.
              </p>
              <p>
                From intimate weddings to bustling festivals, we deliver restaurant-quality catering in London with our portable wood-fired ovens—bringing incredible food and good vibes to every event.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Want Us At Your Event?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">
            We'd love to be a part of your story. Get in touch to see how we can cater for you.
          </p>
          <Button 
            size="lg"
            className="bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-xl rounded-full px-10 py-7"
            asChild
          >
            <Link to="/contact">
              Enquire Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;