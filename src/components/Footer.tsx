import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-3xl font-extrabold tracking-tighter text-white hover:text-brand-tomato transition-colors">
              DOUGH & BEATS
            </Link>
            <p className="text-white/80 mt-4 max-w-md leading-relaxed">
              Independent mobile food business serving handcrafted, contemporary Neapolitan-style 
              pizza sandwiches across London. Rhythm & Soul in every bite.
            </p>
            <div className="flex items-center gap-5 mt-6">
              <a 
                href="https://www.instagram.com/dough_beats/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-brand-tomato transition-transform duration-300 ease-in-out hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:hello@doughandbeats.co.uk"
                className="text-white/80 hover:text-brand-tomato transition-transform duration-300 ease-in-out hover:scale-110"
                aria-label="Email us"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide text-brand-tomato">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide text-brand-tomato">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <Mail className="h-5 w-5 mt-1 text-brand-tomato shrink-0" />
                <a href="mailto:hello@doughandbeats.co.uk" className="hover:text-white transition-colors">
                  hello@doughandbeats.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="h-5 w-5 mt-1 text-brand-tomato shrink-0" />
                <span>London, UK</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <Phone className="h-5 w-5 mt-1 text-brand-tomato shrink-0" />
                <span>Available upon request</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Dough & Beats. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-6 md:mt-0 text-sm text-white/60">
            <span>Fully Insured</span>
            <span className="text-white/20">•</span>
            <span>Registered Food Business</span>
            <span className="text-white/20">•</span>
            <span>Based in London</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;