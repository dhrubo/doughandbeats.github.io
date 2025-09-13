import pages from "@/content/pages.json";

export type HeroSection = {
  type: 'hero';
  title: string; tagline: string; subcopy: string; image: string; imageAlt: string;
  primaryCta: { label: string; to: string }; secondaryCta?: { label: string; to: string };
};
export type IntroSection = { type: 'intro'; heading: string; body: string };
export type FeatureItem = { icon: string; title: string; text: string };
export type FeaturesSection = { type: 'features'; items: FeatureItem[] };
export type CtaSection = { type: 'cta'; heading: string; body: string; cta: { label: string; to: string } };
export type JourneySection = { type: 'journey'; heading: string; body: string; points?: string[] };
export type Section = HeroSection | IntroSection | FeaturesSection | CtaSection | JourneySection;

export interface PageContent {
  meta: { title: string; description: string };
  sections?: Section[];
  // Additional structured fields per page (e.g., header, story, cta, emailCta)
  // Use unknown to avoid unsafe any.
  [key: string]: unknown;
}

export const allPages = pages as Record<string, PageContent>;

export function getPageContent(key: string): PageContent | undefined {
  return allPages[key];
}
