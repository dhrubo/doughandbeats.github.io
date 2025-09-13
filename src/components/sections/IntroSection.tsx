import { IntroSection as IntroSectionType } from "@/lib/content";

export default function IntroSection({ data }: { data: IntroSectionType }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-tomato mb-6 tracking-tight">{data.heading}</h2>
        <p className="max-w-3xl mx-auto text-lg text-brand-charcoal/80 leading-relaxed">{data.body}</p>
      </div>
    </section>
  );
}
