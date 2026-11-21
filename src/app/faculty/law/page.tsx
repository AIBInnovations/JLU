import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Law | Jagran Lakecity University',
  description: 'BA LLB, BBA LLB, LLB, LLM programs with international moot courts, global legal partnerships (IALS, European Law Institute, World Bank), and 35,000+ volume library.',
  keywords: ['JLU law', 'BA LLB Bhopal', 'BBA LLB', 'LLM corporate law', 'cyber law', 'law college Bhopal'],
};

export default function LawFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="law" />
      <Footer />
    </main>
  );
}
