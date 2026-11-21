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
} from '../components';

const HomePage = () => {
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
};

export default HomePage;
