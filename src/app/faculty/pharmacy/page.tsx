import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Pharmacy | Jagran Lakecity University',
  description: 'PCI-approved B.Pharm program with state-of-the-art labs, industry internships, and research opportunities.',
  keywords: ['JLU pharmacy', 'B.Pharm Bhopal', 'pharmacy course', 'PCI approved', 'pharmaceutical sciences'],
};

const pharmacyData = {
  name: 'Faculty of Pharmacy',
  tagline: 'PCI-approved pharmacy education with laboratory-focused study and industry-aligned training.',
  description: 'Our B.Pharm program is approved by the Pharmacy Council of India (PCI) and designed to create competent pharmaceutical professionals. The curriculum encompasses pharmaceutical chemistry, pharmacology, pharmaceutics, and clinical pharmacy. With state-of-the-art laboratories, compulsory industrial training, and research-based projects, we prepare students for diverse careers in the pharmaceutical industry.',
  heroImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'B.Pharm (Bachelor of Pharmacy)', duration: '4 Years (8 Semesters) | 60 Seats', type: 'undergraduate' as const },
    { name: 'B.Pharm Lateral Entry', duration: '3 Years (Diploma holders)', type: 'undergraduate' as const },
    { name: 'M.Pharm Pharmaceutics', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'M.Pharm Pharmacology', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Pharmaceutical Sciences', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: 'PCI', label: 'Approved Program' },
    { value: '60', label: 'Student Intake' },
    { value: '6', label: 'Months Industry Training' },
    { value: '10+', label: 'Research Labs' },
  ],
  highlights: [
    {
      title: 'Laboratory Excellence',
      description: 'State-of-the-art laboratories for pharmaceutical chemistry, pharmacology, pharmaceutics, and pharmacognosy.',
    },
    {
      title: 'Industry Training',
      description: 'Compulsory 4-6 months internship in pharmaceutical companies for hands-on industry experience.',
    },
    {
      title: 'Research Focus',
      description: 'Research-based projects on novel drug delivery systems, medicinal plants, and pharmaceutical innovations.',
    },
  ],
  features: [
    'PCI (Pharmacy Council of India) approved program',
    'Comprehensive curriculum covering pharmaceutical chemistry, pharmacology, and clinical pharmacy',
    'Laboratory-focused study with practical experiments',
    'Compulsory 4-6 months industrial training in final year',
    'Research-based projects on drug formulation and novel delivery systems',
    'Small batch sizes ensuring personalized attention and student-centered learning',
  ],
  partnerships: ['Pharmacy Council of India', 'AICTE', 'Leading Pharma Companies'],
};

export default function PharmacyFacultyPage() {
  return (
    <main className="relative">
      <Header />
      <FacultyPage {...pharmacyData} />
      <Footer />
    </main>
  );
}
