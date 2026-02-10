import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Journalism & Mass Communication | Jagran Lakecity University',
  description: 'BA and MA in Journalism with multimedia storytelling, AI in journalism, and industry internships. Shape the future of media at JLU.',
  keywords: ['JLU journalism', 'mass communication Bhopal', 'media studies', 'journalism course', 'BA journalism'],
};

const journalismData = {
  name: 'Faculty of Journalism & Mass Communication',
  tagline: 'Crafting storytellers and media professionals with cutting-edge digital skills and ethical journalism practices.',
  description: 'Our journalism programs blend traditional storytelling with modern digital media production. Students gain hands-on experience in working newsrooms, develop multimedia skills, and learn to navigate the evolving media landscape. With a curriculum that includes AI in journalism, data storytelling, and media entrepreneurship, we prepare graduates to lead in broadcast, digital, and print media.',
  heroImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'BA Journalism & Mass Communication', duration: '3 Years | 40 Seats', type: 'undergraduate' as const },
    { name: 'MA Multimedia Journalism', duration: '2 Years | 15 Seats', type: 'postgraduate' as const },
    { name: 'Ph.D. in Mass Communication', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '40+', label: 'Media Partners' },
    { value: '100%', label: 'Industry Internships' },
    { value: '3', label: 'Years Hands-on Training' },
    { value: '15+', label: 'Faculty Experts' },
  ],
  highlights: [
    {
      title: 'Newsroom Experience',
      description: 'Practical training in working newsrooms and media organizations with real-world story assignments and portfolio development.',
    },
    {
      title: 'AI & Digital Media',
      description: 'Learn AI in journalism, data visualization, multimedia storytelling, and emerging media technologies.',
    },
    {
      title: 'Media Entrepreneurship',
      description: 'Develop skills to launch your own media ventures with courses in content strategy and digital publishing.',
    },
  ],
  features: [
    'Year 1 focuses on foundational journalism, media theories, and visual communication',
    'Year 2 emphasizes practical journalism, research methods, and digital media production',
    'Year 3 includes specialization tracks, dissertation work, and industry internships',
    'Hands-on skills in digital media tools and graphic design software',
    'Portfolio development emphasis for professional readiness',
    'Industry apprenticeship programs integrated into curriculum',
  ],
  partnerships: ['Jagran Prakashan', 'Dainik Bhaskar', 'NDTV', 'Press Trust of India'],
};

export default function JournalismFacultyPage() {
  return (
    <main className="relative">
      <Header />
      <FacultyPage {...journalismData} />
      <Footer />
    </main>
  );
}
