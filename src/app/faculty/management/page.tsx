import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';
import { CtaBanner } from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'Faculty of Management | Jagran Lakecity University',
  description: 'Jagran Lakecity Business School (JLBS) and School of Economics and Commerce. BBA, BMS, MBA with Harvard case studies, international partnerships with EY, KPMG.',
  keywords: ['JLU management', 'JLBS Bhopal', 'MBA Bhopal', 'BBA course', 'business school'],
};

const managementData = {
  name: 'Faculty of Management & Commerce',
  tagline: 'Nurturing business leaders with global exposure, Harvard case studies, and industry-aligned curriculum.',
  description: 'The Faculty houses two distinguished schools: Jagran Lakecity Business School (JLBS) and the School of Economics and Commerce. Our programs are designed to create industry-ready professionals with a strong foundation in business principles, analytical thinking, and leadership skills. With access to Harvard Business School resources, international partnerships, and hands-on learning experiences, we prepare students for success in the global business landscape.',
  heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'BMS (Bachelor of Management Studies)', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BBA (Bachelor of Business Administration)', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BBA [Honors]', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Com', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'B.Com [Honors]', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BA Economics [Honors]', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'MBA - Internet Marketing', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Business Analytics', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Entrepreneurship', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Management', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '6+', label: 'Harvard Online Courses' },
    { value: '100%', label: 'Placement Assistance' },
    { value: '50+', label: 'Industry Partners' },
    { value: '15+', label: 'Years of Excellence' },
  ],
  highlights: [
    {
      title: 'Harvard Business School Access',
      description: 'Full access to Harvard case studies and up to 6 online courses with digital certificates from Harvard Business School.',
    },
    {
      title: 'Global Summer Programs',
      description: 'Summer courses available in UK/US partner universities. Pursue MBA abroad without GRE or GMAT.',
    },
    {
      title: 'Industry Certifications',
      description: 'Six Sigma certification by Ernst and Young, NSE training laboratory, and entrepreneurship courses via WF and NEN network.',
    },
  ],
  features: [
    'Access to HSTalks video lectures from global experts including Harvard Nobel Laureates',
    'Choice-based credit system for flexible course selection',
    'AI-backed eBooks and business simulations',
    'NSE Training Laboratory for practical stock market experience',
    'Active placement cell for internships and career development',
    'International partnerships with Harvard, EY, and KPMG',
  ],
  partnerships: ['Harvard Business School', 'Ernst & Young', 'KPMG', 'NSE', 'WF Network'],
};

export default function ManagementFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...managementData} />
      <CtaBanner />
      <Footer />
    </main>
  );
}
