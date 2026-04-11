import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Architecture | Jagran Lakecity University',
  description: 'COA-approved B.Arch program with design studios, smart classrooms, and industry-oriented curriculum at JLU Bhopal.',
  keywords: ['JLU architecture', 'B.Arch Bhopal', 'architecture college', 'COA approved', 'School of Architecture'],
};

const architectureData = {
  name: 'Faculty of Architecture',
  tagline: 'Shaping future architects through design thinking, sustainable practices, and hands-on studio-based learning.',
  description: 'The School of Architecture, part of JLU\'s Faculty of Humanities, Art & Design, offers a COA (Council of Architecture) approved B.Arch program. Our curriculum integrates architectural design, building construction, structural design, urban planning, and environmental studies. With state-of-the-art design studios, model-making workshops, CAD labs, and on-site project experience, students develop the skills to create innovative and sustainable built environments.',
  heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80',
  accentColor: '#ffffff',
  programs: [
    { name: 'B.Arch (Bachelor of Architecture)', duration: '5 Years', type: 'undergraduate' as const },
    { name: 'B.Des Interior Design', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'B.Des UI/UX Design', duration: '4 Years', type: 'undergraduate' as const },
    { name: 'M.Des Industrial Design', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'M.Des Visual Communication Design', duration: '2 Years', type: 'postgraduate' as const },
    { name: 'Ph.D. in Architecture & Design', duration: '3 Years', type: 'research' as const },
  ],
  stats: [
    { value: 'COA', label: 'Approved Program' },
    { value: '5 Yrs', label: 'B.Arch Duration' },
    { value: 'NATA', label: 'Entrance Exam' },
    { value: '100%', label: 'Studio-Based Learning' },
  ],
  highlights: [
    {
      title: 'COA Approved',
      description: 'B.Arch program approved by the Council of Architecture, ensuring national standards in architectural education and professional practice.',
    },
    {
      title: 'Design Studios & Workshops',
      description: 'State-of-the-art design studios, model-making workshops, and CAD labs providing hands-on experience with industry-standard tools.',
    },
    {
      title: 'On-Site Project Experience',
      description: 'Real-world project exposure through site visits, internships, and a final year thesis project with industry mentorship.',
    },
  ],
  features: [
    'COA (Council of Architecture) approved B.Arch program',
    'State-of-the-art design studios and model-making workshops',
    'CAD labs with industry-standard software (AutoCAD, Revit, SketchUp)',
    'On-site project experience and professional internships',
    'Curriculum covering architectural design, urban planning, and sustainability',
    'Part of a broader design ecosystem alongside School of Design',
  ],
  partnerships: ['Council of Architecture', 'Autodesk', 'Adobe', 'Design Council'],
};

export default function ArchitectureFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage {...architectureData} />
      <Footer />
    </main>
  );
}
