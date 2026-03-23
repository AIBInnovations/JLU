import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Liberal Arts | Jagran Lakecity University',
  description: 'Interdisciplinary liberal arts education with specializations in Psychology, Economics, English Literature, and Public Policy at JLU Bhopal.',
  keywords: ['JLU liberal arts', 'BA Psychology Bhopal', 'BA Economics', 'English Literature', 'public policy'],
};

const liberalArtsData = {
  name: 'Faculty of Liberal Arts',
  tagline: 'Fostering critical thinking, creative expression, and interdisciplinary inquiry across the humanities and social sciences.',
  description: 'The Faculty of Liberal Arts at Jagran Lakecity University offers an interdisciplinary curriculum that encourages students to explore diverse perspectives across the humanities and social sciences. Students take core courses in the first year, then choose major and minor specializations from the second year onward. With international partnerships across the US, UK, and Europe, exchange programs, and a focus on holistic education, we develop well-rounded thinkers equipped for the complexities of the modern world.',
  heroImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'BA (Hons.) Psychology', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BA (Hons.) English Literature', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BA (Hons.) Economics', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BA Public Policy & Administration', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'MA Psychology', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MA English Literature', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MA Economics', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MA Public Policy', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Humanities & Social Sciences', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '9+', label: 'Programs Offered' },
    { value: '4', label: 'Specializations' },
    { value: '10+', label: 'International Partners' },
    { value: '100%', label: 'Placement Assistance' },
  ],
  highlights: [
    {
      title: 'Interdisciplinary Curriculum',
      description: 'Common foundation year followed by major-minor specialization structure, enabling students to build a unique academic profile.',
    },
    {
      title: 'Global Academic Network',
      description: 'Partnerships with University of Lincoln, UCL, University of Cambridge, Birmingham City University, University of Arts London, and Vancouver Film School.',
    },
    {
      title: 'Research & Critical Inquiry',
      description: 'Focus on developing analytical thinking, research methodology, and creative expression through seminars, workshops, and independent projects.',
    },
  ],
  features: [
    'Major-minor specialization structure from second year onward',
    'Cross-cultural learning through international exchange programs',
    'Seminars, workshops, and independent research projects',
    'Focus on analytical thinking and creative expression',
    'Industry exposure through internships and field studies',
    'Portfolio development and presentation opportunities',
  ],
  partnerships: ['University of Lincoln', 'University College London', 'University of Cambridge', 'Birmingham City University', 'University of Arts London'],
};

export default function LiberalArtsFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...liberalArtsData} />
      <Footer />
    </main>
  );
}
