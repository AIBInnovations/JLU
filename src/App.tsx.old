import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import NewsAndEventsPage from './pages/NewsAndEventsPage';
import AcademicsPage from './pages/AcademicsPage';
import CampusPage from './pages/CampusPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ResearchPage from './pages/ResearchPage';
import InternationalOfficePage from './pages/InternationalOfficePage';
import CampusLifePage from './pages/CampusLifePage';

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news-events" element={<NewsAndEventsPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/campus" element={<CampusPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/international-office" element={<InternationalOfficePage />} />
        <Route path="/campus-life" element={<CampusLifePage />} />
      </Routes>
    </Router>
  );
}

export default App;
