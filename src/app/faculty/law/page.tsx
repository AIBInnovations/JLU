import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';
import { CtaBanner } from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'Faculty of Law | Jagran Lakecity University',
  description: 'LLB, BA LLB, BBA LLB, and LLM programs with moot courts and international partnerships. Top law college in MP/CG.',
  keywords: ['JLU law', 'LLB Bhopal', 'BA LLB course', 'law college MP', 'moot court'],
};

const lawData = {
  name: 'Faculty of Law',
  tagline: 'Developing legal minds with practice-based education, moot courts, and global partnerships.',
  description: 'The Faculty of Law is committed to exposing students to various perspectives of legal knowledge and equipping them for contemporary challenges in the legal field. Our programs are mapped to European Teaching and Learning standards via the EU\'s Erasmus+ funded Tuning India project. With collaborations with International Association of Law Schools (IALS), European Law Institute, and World Bank\'s Global Forum on Law, we provide a truly global legal education.',
  heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'LLB', duration: '3 Years Full-Time', type: 'undergraduate' as const },
    { name: 'BA LLB (Hons)', duration: '5 Years Full-Time', type: 'undergraduate' as const },
    { name: 'BBA Business & Law', duration: '3 Years Full-Time', type: 'undergraduate' as const },
    { name: 'BBA LLB (Hons)', duration: '5 Years Full-Time', type: 'undergraduate' as const },
    { name: 'LLM', duration: '1 Year Full-Time', type: 'postgraduate' as const },
    { name: 'Ph.D. in Law', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: 'Top', label: 'Law College in MP/CG' },
    { value: '22+', label: 'Expert Faculty' },
    { value: '5', label: 'Integrated Programs' },
    { value: '50+', label: 'Moot Court Wins' },
  ],
  highlights: [
    {
      title: 'Moot Court Excellence',
      description: 'Well-appointed Moot Court for practice-based education with regular national and international moot court competitions.',
    },
    {
      title: 'International Standards',
      description: 'Programs mapped to European Teaching and Learning standards via EU\'s Erasmus+ funded Tuning India project.',
    },
    {
      title: 'Global Network',
      description: 'Partnerships with IALS, European Law Institute, and World Bank\'s Global Forum on Law, Justice and Development.',
    },
  ],
  features: [
    'Practice-based education with moot courts, case studies, and presentations',
    'Mandatory internships at law firms, courts, and legal organizations',
    'Programs aligned with European Teaching and Learning standards',
    'Collaborations with International Association of Law Schools (IALS)',
    'Partnership with European Law Institute and World Bank Legal Forum',
    'Ranked amongst top law colleges in Madhya Pradesh and Chhattisgarh',
  ],
  partnerships: ['IALS', 'European Law Institute', 'World Bank', 'Bar Council of India'],
};

export default function LawFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...lawData} />
      <CtaBanner />
      <Footer />
    </main>
  );
}
