'use client';

import InternationalOffice from '@/components/InternationalOffice';
import { Footer } from '@/components/Footer';
import { CtaBanner } from '@/components/CtaBanner';

export default function InternationalOfficePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f0] m-0 p-0">
      <InternationalOffice />
      <CtaBanner />
      <Footer />
    </div>
  );
}
