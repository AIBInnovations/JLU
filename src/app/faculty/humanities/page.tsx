import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Humanities, Art & Design | Jagran Lakecity University',
  description: 'Explore creative programs in Design, Architecture, Psychology, and Literature. B.Des, B.Arch, and more at JLU Bhopal.',
  keywords: ['JLU design', 'architecture Bhopal', 'B.Des UI/UX', 'psychology course', 'creative arts'],
};

const humanitiesData = {
  name: 'Faculty of Humanities, Art & Design',
  tagline: 'A creative hub fostering interdisciplinary collaboration, artistic expression, and innovative design thinking.',
  description: 'The faculty serves as a creative hub encompassing three schools: Jagran School of Design, Jagran School of Languages & Social Sciences, and Jagran School of Architecture. We emphasize interdisciplinary collaboration and integrate theoretical knowledge with practical application through workshops, studio sessions, and collaborative projects. Our programs develop creative thinkers and problem solvers with cultural awareness and critical inquiry skills.',
  heroImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'BA Psychology', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'BA English Literature', duration: '3 Years', type: 'undergraduate' as const },
    { name: 'B.Des Animation & Film Design', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Des UI/UX Design', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Des Interior Design', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Arch Architecture', duration: '5 Years', type: 'undergraduate' as const },
    { name: 'M.Des Industrial Design', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'M.Des UI/UX Design', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MA English Literature', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'MA Psychology', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. (Full-Time & Working Professional)', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: '3', label: 'Specialized Schools' },
    { value: '11+', label: 'Programs Offered' },
    { value: '100+', label: 'Industry Projects' },
    { value: '5', label: 'Years Architecture' },
  ],
  highlights: [
    {
      title: 'Design Studios',
      description: 'State-of-the-art design studios with cutting-edge software and equipment for animation, UI/UX, and interior design.',
    },
    {
      title: 'Architecture Labs',
      description: 'Model-making workshops, CAD labs, and on-site project experience for aspiring architects.',
    },
    {
      title: 'Creative Mentorship',
      description: 'One-on-one mentorship from experienced faculty and industry professionals in your creative journey.',
    },
  ],
  features: [
    'Hands-on learning through workshops and collaborative projects',
    'Cutting-edge facilities and experienced faculty mentorship',
    'Internship and industry partnership opportunities',
    'Focus on developing creative thinkers and problem solvers',
    'Emphasis on cultural awareness and critical inquiry',
    'Portfolio development and exhibition opportunities',
  ],
  partnerships: ['Adobe', 'Autodesk', 'Council of Architecture', 'Design Council'],
};

export default function HumanitiesFacultyPage() {
  return (
    <main className="relative">
      <Header />
      <FacultyPage {...humanitiesData} />
      <Footer />
    </main>
  );
}
