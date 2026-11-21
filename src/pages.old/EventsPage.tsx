import { Header, Events, Footer } from '../components';

const EventsPage = () => {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* Navigation */}
      <Header />

      {/* Events Hero */}
      <Events />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventsPage;
