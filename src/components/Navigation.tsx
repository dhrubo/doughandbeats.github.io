import { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans",
        // Use brand cream everywhere for consistency
        isScrolled
          ? "bg-brand-cream/95 backdrop-blur-sm border-b border-gray-200"
          : "bg-brand-cream border-b border-gray-200"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tomato rounded-lg">
            <img 
              src="https://doughandbeats.co.uk/images/logo.jpg" 
              alt="Dough & Beats Logo" 
              className="h-12 w-12 rounded-full object-cover border-2 border-brand-tomato"
            />
            <span className="text-2xl font-extrabold text-brand-tomato tracking-tighter">
              DOUGH & BEATS
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-lg font-medium transition-colors",
                    isActive 
                      ? "text-brand-tomato bg-brand-tomato/10" 
                      : "text-brand-charcoal hover:bg-gray-100"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button 
              className="rounded-full bg-brand-charcoal hover:bg-gray-700 text-white font-bold text-lg px-6 py-3"
              asChild
            >
              <a 
                href="https://www.instagram.com/dough_beats/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Follow Us
              </a>
            </Button>
            <Button 
              variant="primary"
              className="rounded-full bg-brand-tomato hover:bg-brand-tomato-dark text-white font-bold text-lg px-6 py-3"
              asChild
            >
              <Link to="/contact">
                Book Us
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-brand-charcoal"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="pt-4 pb-3 space-y-2 bg-brand-cream rounded-lg mt-2 shadow-xl border border-gray-200">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-3 text-lg font-medium",
                      isActive 
                        ? "text-brand-tomato bg-brand-tomato/10" 
                        : "text-brand-charcoal hover:bg-gray-100"
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-3 px-4">
                <Button 
                  className="w-full rounded-full bg-brand-tomato hover:bg-brand-tomato-dark text-white font-bold text-lg py-3"
                  asChild
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Book Us
                  </Link>
                </Button>
                <Button 
                  className="w-full rounded-full bg-brand-charcoal hover:bg-gray-700 text-white font-bold text-lg py-3"
                  asChild
                >
                  <a 
                    href="https://www.instagram.com/dough_beats/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    Follow Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;