'use client';

import {
  Hero,
  HorizontalScroll,
  WhyJlu,
  PartnersSection,
  PassionSection,
  VoiceOfJlu,
  EventsSection,
  OurProgrammes,
  AwardsSection,
  Footer,
  LatestNews,
  AlumniSection,
  CtaBanner,
} from '@/components';

export default function HomePage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden">
      <Hero />
      <HorizontalScroll />
      <WhyJlu />
      <PartnersSection />
      <PassionSection />
      <VoiceOfJlu />
      <EventsSection />
      <OurProgrammes />
      <LatestNews />
      <AlumniSection />
      <AwardsSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}
