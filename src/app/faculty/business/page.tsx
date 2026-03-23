import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Business | Jagran Lakecity University',
  description: 'Jagran Business School, School of Hotel Management & Tourism, and School of Sports Management. BBA, MBA, BMS, B.Com with global partnerships and industry exposure.',
  keywords: ['JLU business', 'Jagran Business School', 'MBA Bhopal', 'BBA course', 'BMS Bhopal', 'hotel management'],
};

const businessData = {
  name: 'Faculty of Business',
  tagline: 'Developing future business leaders through global exposure, industry partnerships, and experiential learning.',
  description: 'The Faculty of Business houses three distinguished schools: Jagran Business School, Jagran School of Hotel Management & Tourism, and Jagran School of Sports Management. Our programs are designed to create industry-ready professionals with a strong foundation in business principles, strategic thinking, and leadership skills. With access to Harvard Business Publishing courses, international partnerships with EY, KPMG, ACCA (UK), and CMA (IMA USA), and hands-on learning experiences, we prepare students for success in the global business landscape.',
  heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'BBA (Bachelor of Business Administration)', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BBA - Business & Law', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BBA - Global Management', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BMS (Bachelor of Management Studies)', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'B.Com - Banking & Finance', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'B.Com [Honors]', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'B.Sc Hospitality & Hotel Administration', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'MBA - Human Resources', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Finance', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Marketing', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Business Analytics', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MBA - Entrepreneurship', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Management', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '3', label: 'Specialized Schools' },
    { value: '90%+', label: 'Placement Rate' },
    { value: '50+', label: 'Industry Partners' },
    { value: '15 LPA', label: 'Highest Package' },
  ],
  highlights: [
    {
      title: 'Harvard Business Publishing',
      description: 'Access to Harvard case studies and online courses with digital certificates, integrating world-class business education into the curriculum.',
    },
    {
      title: 'Global Summer Programs',
      description: 'International exchange opportunities with universities in UK, USA, and Germany including UCL, Christian Brothers University, and HTWG Konstanz.',
    },
    {
      title: 'Industry Certifications',
      description: 'Six Sigma certification by Ernst & Young, ACCA (UK), CMA (IMA USA), and NSE training laboratory integrated into the curriculum.',
    },
  ],
  features: [
    'Business simulation and live projects with industry partners',
    'Industry immersion programs and corporate internships',
    'Six Sigma certification by Ernst & Young integrated into MBA',
    'NSE Training Laboratory for practical stock market experience',
    'ERASMUS+ program participation — sole Central India representative',
    'Top recruiters include Amazon, Deloitte, KPMG, S&P Global, Wipro, TCS',
  ],
  partnerships: ['Ernst & Young', 'KPMG', 'Harvard Business Publishing', 'ACCA UK', 'CMA IMA USA', 'University College London'],
};

export default function BusinessFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...businessData} />
      <Footer />
    </main>
  );
}
