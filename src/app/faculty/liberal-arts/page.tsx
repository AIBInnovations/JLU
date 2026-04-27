import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Media & Social Science | Jagran Lakecity University',
  description: 'Languages, Social Science, Journalism and Media programs at JLU. BA Psychology, BA English, BA Economics, BA Public Policy and more.',
  keywords: ['JLU liberal arts', 'BA psychology', 'BA English', 'BA economics', 'humanities'],
};

export default function LiberalArtsFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="journalism" />
      <Footer />
    </main>
  );
}
