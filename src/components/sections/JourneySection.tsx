import { JourneySection as JourneySectionType } from "@/lib/content";

export default function JourneySection({ data }: { data: JourneySectionType }) {
  return (
    <section className="py-24 bg-white/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-tomato tracking-tight mb-6">
              {data.heading}
            </h2>
            <p className="text-lg leading-relaxed text-brand-charcoal/80 mb-8">
              {data.body}
            </p>
            {data.points && (
              <ul className="space-y-4 text-brand-charcoal/80 text-base list-none">
                {data.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-tomato" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-brand-cream rounded-2xl p-8 shadow-inner border border-brand-tomato/10">
            <h3 className="text-2xl font-bold text-brand-tomato mb-4">What Drives Us</h3>
            <p className="text-brand-charcoal/80 leading-relaxed">
              We’re a brand-new popup built from late-night dough experiments, playlists, and the belief that street food should feel like discovering a great record—unexpected, vibrant, and full of soul. Every event we do helps us refine the craft and bring more people into the vibe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}