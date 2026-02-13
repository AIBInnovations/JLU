'use client';

import { Suspense } from 'react';
import { Programs, CtaBanner, Footer } from '@/components';

export default function ProgramsPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Programs />
      </Suspense>
      <CtaBanner />
      <Footer />
    </div>
  );
}
