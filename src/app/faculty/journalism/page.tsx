import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Media & Social Science | Jagran Lakecity University',
  description: 'Jagran School of Journalism, Advertising & PR, Events & Entertainment, and Languages & Social Science. Part of Google News Lab University Network with 20,000 sq ft media studio.',
  keywords: ['JLU journalism', 'mass communication Bhopal', 'media studies', 'BBA advertising', 'public relations', 'BA psychology'],
};

export default function MediaSocialScienceFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="journalism" />
      <Footer />
    </main>
  );
}
