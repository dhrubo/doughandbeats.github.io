import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import FeaturesSection from "./FeaturesSection";
import CtaSection from "./CtaSection";
import JourneySection from "./JourneySection";
import { Section } from "@/lib/content";
// Simplified renderer without registry typing complexity (handled via switch below)

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case 'hero':
      return <HeroSection data={section} />;
    case 'intro':
      return <IntroSection data={section} />;
    case 'features':
      return <FeaturesSection data={section} />;
    case 'cta':
      return <CtaSection data={section} />;
    case 'journey':
      return <JourneySection data={section} />;
    default:
      return null;
  }
}
