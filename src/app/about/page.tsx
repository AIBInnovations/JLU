'use client';

import { About, LeadershipMessages, InstitutionalOverview, Governance, Accreditations, UniversityPartnerships, HonoraryDoctorates, IgnitedMindAwards, JluStaff, RankingAndAwards, CtaBanner, Footer } from '@/components';

export default function AboutPage() {
  return (
    <div className="bg-[#f6f7f0] min-h-screen m-0 p-0">
      {/* About Content */}
      <div id="introduction">
        <About />
      </div>

      {/* Leadership Messages */}
      <div id="leadership">
        <LeadershipMessages />
      </div>

      {/* Institutional Overview */}
      <div id="history">
        <InstitutionalOverview />
      </div>

      {/* Governance */}
      <div id="governance">
        <Governance />
      </div>

      {/* Accreditations & Memberships */}
      <div id="accreditations">
        <Accreditations />
      </div>

      {/* University Partnerships */}
      <div id="partnerships">
        <UniversityPartnerships />
      </div>

      {/* Honorary Doctorates */}
      <div id="honorary-doctorates">
        <HonoraryDoctorates />
      </div>

      {/* JLU Ignited Mind Awards */}
      <div id="awards">
        <IgnitedMindAwards />
      </div>

      {/* JLU Staff */}
      <div id="staff">
        <JluStaff />
      </div>

      {/* Ranking and Awards */}
      <div id="rankings">
        <RankingAndAwards />
      </div>

      {/* CTA Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
