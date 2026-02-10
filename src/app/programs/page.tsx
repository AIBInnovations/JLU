'use client';

import { Suspense } from 'react';
import { Header, Programs, Footer } from '@/components';

export default function ProgramsPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* Navigation */}
      <Header />

      {/* Programs Hero */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <Programs />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
