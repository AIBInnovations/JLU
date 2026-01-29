'use client';

import { Header, About, LeadershipMessages, InstitutionalOverview, Governance, Accreditations, UniversityPartnerships, JluStaff, RankingAndAwards, Footer } from '@/components';

export default function AboutPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* Navigation */}
      <Header />

      {/* About Content */}
      <About />

      {/* Leadership Messages */}
      <LeadershipMessages />

      {/* Institutional Overview */}
      <InstitutionalOverview />

      {/* Governance */}
      <Governance />

      {/* Accreditations & Memberships */}
      <Accreditations />

      {/* University Partnerships */}
      <UniversityPartnerships />

      {/* JLU Staff */}
      <JluStaff />

      {/* Ranking and Awards */}
      <RankingAndAwards />

      {/* Footer */}
      <Footer />
    </div>
  );
}
