import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Management | Jagran Lakecity University',
  description: 'Jagran Lakecity Business School (JLBS), Jagran School of Physical Education and Sports Science, and Jagran School of Hospitality & Tourism. Harvard case studies, EY certifications, global exposure.',
  keywords: ['JLU management', 'JLBS Bhopal', 'MBA Bhopal', 'BBA course', 'business school', 'sports management', 'hospitality'],
};

export default function ManagementFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="management" />
      <Footer />
    </main>
  );
}
