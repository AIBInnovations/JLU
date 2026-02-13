import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';
import { CtaBanner } from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'Faculty of Engineering & Technology | Jagran Lakecity University',
  description: 'B.Tech and M.Tech programs with AI, Machine Learning, and Data Science specializations. Research-focused engineering education at JLU.',
  keywords: ['JLU engineering', 'B.Tech Bhopal', 'computer science', 'AI ML course', 'engineering college'],
};

const engineeringData = {
  name: 'Faculty of Engineering & Technology',
  tagline: 'Research-driven engineering education with focus on AI, Machine Learning, and emerging technologies.',
  description: 'Our engineering programs combine theoretical foundations with practical, research-based learning. Students engage with cutting-edge technologies including Artificial Intelligence, Machine Learning, and Data Science. With international industrial training programs and full semesters dedicated to real-world projects, we prepare engineers who can innovate and lead in the technology-driven world.',
  heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Tech CSE - AI & Machine Learning', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Tech CSE - Data Science', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Tech Civil Engineering', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'M.Tech Computer Science', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'M.Tech Data Science & Analytics', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Engineering', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '1', label: 'Month Intl Training' },
    { value: '6', label: 'Months Industry Project' },
    { value: '50+', label: 'Research Papers' },
    { value: '90%+', label: 'Placement Rate' },
  ],
  highlights: [
    {
      title: 'International Training',
      description: 'One-month international industrial training program at renowned universities and tech companies abroad.',
    },
    {
      title: 'Research Excellence',
      description: 'Primary focus on research-based learning with dedicated labs for AI, IoT, and emerging technologies.',
    },
    {
      title: 'Industry Integration',
      description: 'Full semester dedicated to industrial training with real-world project applications and mentorship.',
    },
  ],
  features: [
    'Specializations in AI, Machine Learning, and Data Visualization',
    'Research-based learning that enables students to thrive on creative ideas',
    'One-month international industrial training at renowned universities',
    'Full semester dedicated to industrial training with real-world projects',
    'Integration of latest digital tools and technologies',
    'Focus on vocational, professional, critical, and ethical capabilities',
  ],
  partnerships: ['Microsoft', 'Google', 'AWS', 'Intel', 'NVIDIA'],
};

export default function EngineeringFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...engineeringData} />
      <CtaBanner />
      <Footer />
    </main>
  );
}
