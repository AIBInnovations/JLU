import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { CampusLife } from '../components/CampusLife';

const CampusLifePage = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f0] m-0 p-0">
      <Header />
      <CampusLife />
      <Footer />
    </div>
  );
};

export default CampusLifePage;
