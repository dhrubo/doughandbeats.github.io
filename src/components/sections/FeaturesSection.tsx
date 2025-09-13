import { FeaturesSection as FeaturesSectionType } from "@/lib/content";
import { ChefHat, MapPin, PartyPopper } from "lucide-react";
import { ComponentType } from "react";

const icons: Record<string, ComponentType<{ className?: string }>> = { ChefHat, MapPin, PartyPopper };

export default function FeaturesSection({ data }: { data: FeaturesSectionType }) {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {data.items.map((item, idx) => {
            const Icon = icons[item.icon] || ChefHat;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-brand-tomato rounded-full p-5 mb-5 inline-block">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-charcoal mb-3">{item.title}</h3>
                <p className="text-brand-charcoal/80">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
