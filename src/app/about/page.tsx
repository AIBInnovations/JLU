'use client';

import { About, LeadershipMessages, InstitutionalOverview, Governance, Accreditations, UniversityPartnerships, HonoraryDoctorates, IgnitedMindAwards, JluStaff, RankingAndAwards, CtaBanner, Footer } from '@/components';

export default function AboutPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
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

      {/* Honorary Doctorates */}
      <HonoraryDoctorates />

      {/* JLU Ignited Mind Awards */}
      <IgnitedMindAwards />

      {/* JLU Staff */}
      <JluStaff />

      {/* Ranking and Awards */}
      <RankingAndAwards />

      {/* CTA Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
