'use client';

import { Header, NewsAndEvents, Footer } from '@/components';

export default function NewsAndEventsPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* Navigation */}
      <Header />

      {/* News & Events Hero */}
      <NewsAndEvents />

      {/* Footer */}
      <Footer />
    </div>
  );
}
