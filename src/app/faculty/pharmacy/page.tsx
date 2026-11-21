import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Pharmacy | Jagran Lakecity University',
  description: 'B.Pharma program with state-of-the-art pharmaceutical labs, hospital pharmacy training, and industry internships at JLU Bhopal.',
  keywords: ['JLU pharmacy', 'B.Pharma Bhopal', 'pharmacy college', 'PCI approved', 'pharmaceutical sciences'],
};

export default function PharmacyFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="pharmacy" />
      <Footer />
    </main>
  );
}
