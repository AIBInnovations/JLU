'use client';

import dynamic from 'next/dynamic';
import { Hero, HorizontalScroll } from '@/components';

// Lazy-load all below-fold sections — they only mount when scrolled near
const WhyJlu         = dynamic(() => import('@/components/WhyJlu').then(m => ({ default: m.WhyJlu })));
const PartnersSection = dynamic(() => import('@/components/PartnersSection').then(m => ({ default: m.PartnersSection })));
const PassionSection  = dynamic(() => import('@/components/PassionSection').then(m => ({ default: m.PassionSection })));
const VoiceOfJlu     = dynamic(() => import('@/components/VoiceOfJlu').then(m => ({ default: m.VoiceOfJlu })));
const EventsSection  = dynamic(() => import('@/components/EventsSection').then(m => ({ default: m.EventsSection })));
const OurProgrammes  = dynamic(() => import('@/components/OurProgrammes').then(m => ({ default: m.OurProgrammes })));
const LatestNews     = dynamic(() => import('@/components/LatestNews').then(m => ({ default: m.LatestNews })));
const AlumniSection  = dynamic(() => import('@/components/AlumniSection').then(m => ({ default: m.AlumniSection })));
const AwardsSection  = dynamic(() => import('@/components/AwardsSection').then(m => ({ default: m.AwardsSection })));
const CtaBanner      = dynamic(() => import('@/components/CtaBanner').then(m => ({ default: m.CtaBanner })));
const Footer         = dynamic(() => import('@/components/Footer').then(m => ({ default: m.Footer })));

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
