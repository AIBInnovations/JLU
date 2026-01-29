import { Header, Programs, Footer } from '../components';

const ProgramsPage = () => {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* Navigation */}
      <Header />

      {/* Programs Hero */}
      <Programs />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProgramsPage;
