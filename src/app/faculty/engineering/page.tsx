import { Metadata } from 'next';
import { FacultyPage } from '@/components/FacultyPage';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Faculty of Science & Technology | Jagran Lakecity University',
  description: 'Jagran School of Artificial Intelligence, Jagran School of Engineering, and Jagran School of Computer Application. B.Tech, M.Tech, BCA programs with AI, ML, Data Science, Robotics, and Cloud specializations.',
  keywords: ['JLU engineering', 'B.Tech Bhopal', 'computer science', 'AI ML course', 'BCA Bhopal', 'data science'],
};

export default function ScienceTechnologyFacultyPage() {
  return (
    <main className="relative">
      <FacultyPage facultyId="engineering" />
      <Footer />
    </main>
  );
}
