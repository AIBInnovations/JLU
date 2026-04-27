import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Management | Jagran Lakecity University',
  description: 'Jagran Lakecity Business School (JLBS) and allied schools. BBA, BMS, MBA with Harvard case studies, EY certifications, and global exposure.',
  keywords: ['JLU business', 'JLBS Bhopal', 'MBA', 'BBA course', 'business school'],
};

export default function BusinessFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="management" />
      <Footer />
    </main>
  );
}
