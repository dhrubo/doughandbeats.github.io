import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getPageContent } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";

interface AboutHeader { title: string; subtitle: string }
interface AboutStory { subheading: string; paras: string[]; image: string; imageAlt: string }
interface AboutCta { heading: string; body: string; cta: { label: string; to: string } }

const About = () => {
  const content = getPageContent('about');
  const header = content?.header as AboutHeader | undefined;
  const story = content?.story as AboutStory | undefined;
  const cta = content?.cta as AboutCta | undefined;
  usePageMeta(content?.meta.title, content?.meta.description);

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
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">{header?.title}</h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">{header?.subtitle}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full relative border border-white/5 frame-blur">
              <img
                src={story?.image}
                alt={story?.imageAlt}
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
              <h2 className="text-3xl font-bold text-brand-tomato mb-6">{story?.subheading}</h2>
              {story?.paras?.map((p: string, i: number) => (
                <p key={i} className={i < (story?.paras.length - 1) ? 'mb-6' : undefined}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{cta?.heading}</h2>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">{cta?.body}</p>
          <Button 
            size="lg"
            className="bg-brand-tomato hover:bg-brand-tomato/90 text-white font-bold text-xl rounded-full px-10 py-7"
            asChild
          >
            <Link to={cta?.cta?.to}>{cta?.cta?.label}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;