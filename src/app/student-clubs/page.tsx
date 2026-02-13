import { Metadata } from 'next';
import { StudentClubs } from '@/components/StudentClubs';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Student Clubs | Jagran Lakecity University',
  description: 'Discover 11 vibrant student clubs at JLU Bhopal. From sports and arts to entrepreneurship and community service - find your passion and make your mark.',
  keywords: ['JLU student clubs', 'university clubs', 'student activities', 'campus life', 'Bhopal university'],
};

export default function StudentClubsPage() {
  return (
    <main className="relative">
      <StudentClubs />
      <Footer />
    </main>
  );
}
