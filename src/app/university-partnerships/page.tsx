import { UniversityPartnershipsPage } from '@/components/UniversityPartnershipsPage';
import { Footer } from '@/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Partnerships | JLU - Jagran Lakecity University',
  description:
    'Explore JLU\'s global network of 42+ university and industry partnerships across 25+ countries — enabling student exchange, dual degrees, joint research, and international certifications.',
};

export default function UniversityPartnershipsRoutePage() {
  return (
    <>
      <UniversityPartnershipsPage />
      <Footer />
    </>
  );
}
