'use client';

import { useParams } from 'next/navigation';
import { CtaBanner, Footer } from '@/components';
import { ProgramDetail } from '@/components/ProgramDetail';
import { getProgramBySlug } from '@/data/programs';
import { notFound } from 'next/navigation';

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      <ProgramDetail program={program} />
      <CtaBanner />
      <Footer />
    </div>
  );
}
