import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-brand-tomato mb-4">404</h1>
        <p className="text-2xl text-brand-charcoal/80 mb-8">Oops! Page not found</p>
        <a href="/" className="text-brand-tomato hover:text-brand-tomato/80 underline font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
