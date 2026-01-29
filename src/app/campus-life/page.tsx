'use client';

import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampusLife } from '@/components/CampusLife';

export default function CampusLifePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f0] m-0 p-0">
      <Header />
      <CampusLife />
      <Footer />
    </div>
  );
}
