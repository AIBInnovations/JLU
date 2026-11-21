'use client';

import { NewsAndEvents, CtaBanner, Footer } from '@/components';

export default function NewsAndEventsPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      <NewsAndEvents />
      <CtaBanner />
      <Footer />
    </div>
  );
}
