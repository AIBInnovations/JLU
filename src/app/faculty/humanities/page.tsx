import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'IICA - Jagran Centre for Creative Skills | Jagran Lakecity University',
  description: 'India\'s first industry-led creative incubator. Animation & Game Production with Oscar-winner mentorship, NSDC partnership, and London Film School collaboration.',
  keywords: ['JLU IICA', 'animation course Bhopal', 'game production', 'creative skills', 'NSDC academy'],
};

export default function IICAFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="iica" bigText="Creative Skills" />
      <Footer />
    </main>
  );
}
