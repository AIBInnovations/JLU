import { useEffect } from 'react';
import Lenis from 'lenis';
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
} from './components';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
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

      {/* Awards and Achievements */}
      <AwardsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
