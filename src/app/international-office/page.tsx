'use client';

import Header from '@/components/Header';
import InternationalOffice from '@/components/InternationalOffice';
import { Footer } from '@/components/Footer';

export default function InternationalOfficePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f0] m-0 p-0">
      <Header />
      <InternationalOffice />
      <Footer />
    </div>
  );
}
