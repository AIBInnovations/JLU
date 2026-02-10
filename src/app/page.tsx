'use client';

import { useState } from 'react';
import {
  Hero,
  HorizontalScroll,
  WhyJlu,
  PassionSection,
  VoiceOfJlu,
  EventsSection,
  OurProgrammes,
  AwardsSection,
  Footer,
  FloatingActionButton,
  EnquiryModal,
  ChatBot,
  LatestNews,
  AlumniSection,
  // PageLoader, // Deactivated for now
} from '@/components';

export default function HomePage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      {/* <PageLoader /> */}
      <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden">
        {/* Hero Section with Navigation */}
        <Hero />

        {/* Horizontal Scrolling Section */}
        <HorizontalScroll />

        {/* Why JLU Section with Colored Cards */}
        <WhyJlu />

        {/* Passion, Study, Success Section */}
        <PassionSection />

        {/* Voices of JLU Section */}
        <VoiceOfJlu />

        {/* Events Section */}
        <EventsSection />

        {/* Our Programmes Section */}
        <OurProgrammes />

        {/* Latest News & Updates */}
        <LatestNews />

        {/* Alumni Section */}
        <AlumniSection />

        {/* Awards and Achievements */}
        <AwardsSection />

        {/* Footer */}
        <Footer />

        {/* Floating Action Button - Right Side */}
        <FloatingActionButton onEnquireClick={() => setIsEnquiryOpen(true)} />

        {/* Enquiry Modal */}
        <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />

        {/* ChatBot - Left Bottom */}
        <ChatBot />
      </div>
    </>
  );
}
