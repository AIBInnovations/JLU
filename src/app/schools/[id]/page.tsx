import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SchoolPage } from '@/components/SchoolPage';
import { faculties } from '@/data/faculties';

// Build a flat map of school id → { school, faculty }
function findSchool(id: string) {
  for (const faculty of faculties) {
    for (const school of faculty.schools) {
      if (school.id === id) {
        return { school, faculty };
      }
    }
  }
  return null;
}

// Generate all school pages at build time
export function generateStaticParams() {
  const params: { id: string }[] = [];
  for (const faculty of faculties) {
    for (const school of faculty.schools) {
      params.push({ id: school.id });
    }
  }
  return params;
}

// Dynamic metadata per school
export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const result = findSchool(id);
    if (!result) {
      return { title: 'School Not Found | JLU' };
    }
    return {
      title: `${result.school.name} | Jagran Lakecity University`,
      description: result.school.description.substring(0, 160),
      keywords: [
        result.school.name,
        'JLU',
        result.faculty.name,
        ...result.school.programs.map(p => p.name),
      ],
    };
  });
}

export default async function SchoolPageRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = findSchool(id);

  if (!result) {
    notFound();
  }

  return (
    <main className="relative">
      <Header />
      <SchoolPage school={result.school} faculty={result.faculty} />
      <Footer />
    </main>
  );
}
