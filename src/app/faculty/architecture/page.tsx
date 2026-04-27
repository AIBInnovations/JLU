import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Fashion, Design & Arts | Jagran Lakecity University',
  description: 'School of Design, School of Architecture, and School of Fashion. B.Des UI/UX, B.Arch, B.Des Fashion Communication powered by ImaginXP and partnered with NVIDIA.',
  keywords: ['JLU design', 'B.Arch Bhopal', 'B.Des UI/UX', 'fashion design', 'School of Architecture', 'ImaginXP'],
};

export default function FashionDesignArtsFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="design" />
      <Footer />
    </main>
  );
}
