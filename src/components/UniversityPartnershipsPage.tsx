'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const PartnersOrb = dynamic(() => import('./PartnersOrb'), { ssr: false });

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: '42+', label: 'Global Collaborations' },
  { value: '25+', label: 'Countries' },
  { value: '5', label: 'Continents' },
  { value: '15+', label: 'Exchange Programs' },
];

// Partners with logos — shown as logo cards (like Accreditations)
const logoPartners = [
  { name: 'Middlesex University', country: 'United Kingdom', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/mid.png', type: 'University' },
  { name: "King's College London", country: 'United Kingdom', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/king.png', type: 'University' },
  { name: 'National University of Singapore', country: 'Singapore', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/nus.png', type: 'University' },
  { name: 'Grant Thornton', country: 'Global', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/gt.png', type: 'Industry' },
  { name: 'Confederation of Indian Industry', country: 'India', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/c11.png', type: 'Industry' },
  { name: 'FICCI', country: 'India', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/ficci.png', type: 'Industry' },
  { name: 'ERA Foundation', country: 'India', src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/era.png', type: 'Association' },
];

// Text-only academic partners
const academicPartners = [
  { name: 'University of Cambridge', country: 'United Kingdom' },
  { name: 'University College London', country: 'United Kingdom' },
  { name: 'Imperial College London', country: 'United Kingdom' },
  { name: 'University of Lincoln', country: 'United Kingdom' },
  { name: 'University of Arts London', country: 'United Kingdom' },
  { name: 'Kingston University London', country: 'United Kingdom' },
  { name: 'SOAS University of London', country: 'United Kingdom' },
  { name: 'University of Sussex', country: 'United Kingdom' },
  { name: 'Birmingham City University', country: 'United Kingdom' },
  { name: 'Sheffield Hallam University', country: 'United Kingdom' },
  { name: 'RMIT University', country: 'Australia' },
  { name: 'Purdue University', country: 'USA' },
  { name: 'University of West Los Angeles', country: 'USA' },
  { name: 'Vancouver Film School', country: 'Canada' },
  { name: 'Cape Breton University', country: 'Canada' },
  { name: 'HTWG Konstanz', country: 'Germany' },
  { name: 'Universidad Camilo José Cela', country: 'Spain' },
  { name: 'Synergy University', country: 'Russia' },
  { name: 'Woosong University', country: 'South Korea' },
  { name: 'Korean National University of Arts', country: 'South Korea' },
  { name: 'Guizhou University', country: 'China' },
  { name: 'MDIS Singapore', country: 'Singapore' },
];

// Industry & professional partners (text)
const industryPartners = [
  { name: 'Ernst & Young', shortName: 'EY', category: 'Professional Services' },
  { name: 'KPMG', shortName: 'KPMG', category: 'Professional Services' },
  { name: 'Harvard Business Publishing', shortName: 'HBP', category: 'Education' },
  { name: 'CIMA', shortName: 'CIMA', category: 'Professional Body' },
  { name: 'ACCA', shortName: 'ACCA', category: 'Professional Body' },
  { name: 'National Stock Exchange', shortName: 'NSE', category: 'Finance' },
  { name: 'Siemens PLM', shortName: 'Siemens', category: 'Technology' },
  { name: 'Simplilearn', shortName: 'Simplilearn', category: 'Ed-Tech' },
  { name: 'Wadhwani Foundation', shortName: 'Wadhwani', category: 'Entrepreneurship' },
  { name: 'Miles Education', shortName: 'Miles', category: 'Education' },
  { name: 'Wizcraft', shortName: 'Wizcraft', category: 'Events & Entertainment' },
  { name: 'Enhelion', shortName: 'Enhelion', category: 'Legal Ed-Tech' },
  { name: 'Taxmann', shortName: 'Taxmann', category: 'Legal Publishing' },
  { name: 'Data Leads', shortName: 'Data Leads', category: 'Technology' },
  { name: 'DesignTech', shortName: 'DesignTech', category: 'Technology' },
];

const associations = [
  {
    shortName: 'AUAP',
    name: 'Association of Universities of Asia and the Pacific',
    description: '260+ member universities across 40 countries in the Asia-Pacific region.',
  },
  {
    shortName: 'Erasmus+',
    name: 'Erasmus+ Programme',
    description: 'EU-funded student and faculty mobility across European partner universities.',
  },
  {
    shortName: 'WFUNA',
    name: 'World Federation of United Nations Associations',
    description: 'UN partnership enabling Model UN programs and global civic education.',
  },
  {
    shortName: 'ACU',
    name: 'Association of Commonwealth Universities',
    description: '500+ member universities across 50 Commonwealth nations.',
  },
];

const opportunities = [
  {
    number: '01',
    title: 'Student Exchange Programs',
    description:
      'Spend a semester or full academic year at partner universities across 25+ countries, gaining global exposure while earning credits towards your JLU degree.',
  },
  {
    number: '02',
    title: 'Dual Degree Pathways',
    description:
      'Select programs offer dual degree options — graduate with qualifications from both JLU and a top international partner university simultaneously.',
  },
  {
    number: '03',
    title: 'International Faculty',
    description:
      'Visiting faculty from partner institutions regularly teach at JLU, bringing global research, international perspectives and real-world expertise into the classroom.',
  },
  {
    number: '04',
    title: 'Joint Research Projects',
    description:
      'Collaborate on cross-border research with world-leading universities, publishing in international journals and presenting at global academic conferences.',
  },
  {
    number: '05',
    title: 'Professional Certifications',
    description:
      'Earn globally recognised certifications from ACCA, CIMA, EY and KPMG embedded within degree programs — enhancing employability on an international scale.',
  },
  {
    number: '06',
    title: 'Erasmus+ Mobility',
    description:
      'As an Erasmus+ partner, JLU students and faculty benefit from EU-funded grants enabling affordable academic mobility across Europe.',
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

const UniversityPartnershipsPage = () => {
  const [orbOpen, setOrbOpen] = useState(false);

  return (
    <div className="bg-[#f6f7f0] min-h-screen">

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#21313c] relative overflow-hidden">
        {/* Background globe image */}
        <div className="absolute inset-0">
          <Image
            src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/glob.jpg"
            alt="Global Network"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#21313c]/60 to-[#21313c]" />
        </div>

        <div
          className="relative z-10 mx-auto px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:px-[120px] md:pt-40 md:pb-24"
          style={{ maxWidth: '1440px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: customEase }}
          >
            <span
              className="text-[#c3fd7a] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Global Network
            </span>
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              University{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Partnerships
              </span>
            </h1>
            <p
              className="text-white/70 text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-2xl"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              JLU's global network of 42+ universities, industry leaders and international associations brings the world into the classroom — and takes our students across the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Stats Bar ────────────────────────────────────────────────── */}
      <section className="w-full bg-white" style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-16"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: customEase }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <span
                  className="text-[#21313c] block mb-1"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#999] uppercase font-bold"
                  style={{ letterSpacing: '0.15em', fontSize: 'clamp(0.7rem, 1vw, 0.875rem)' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. What Partnerships Offer ──────────────────────────────────── */}
      <section className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              What We Offer
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              International{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Opportunities
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-2xl mt-4"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              Our global partnerships translate into concrete academic and career opportunities for every JLU student.
            </p>
          </motion.div>

          {/* Opportunities Grid — 2 columns of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: '1px solid #e5e5e5' }}>
            {opportunities.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-10"
                style={{
                  borderRight: index % 2 === 0 ? '1px solid #e5e5e5' : 'none',
                  borderBottom: index < opportunities.length - 2 ? '1px solid #e5e5e5' : 'none',
                }}
              >
                <span
                  className="text-[#999] font-bold block mb-3"
                  style={{ letterSpacing: '0.15em', fontSize: '0.75rem' }}
                >
                  {item.number}
                </span>
                <h3
                  className="text-[#21313c] mb-3"
                  style={{ fontWeight: 600, fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', lineHeight: 1.2 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#666]"
                  style={{ lineHeight: 1.7, fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', fontWeight: 400 }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Partner Logos (Logo Partners) ────────────────────────────── */}
      <section className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Our Partners
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              Featured{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Collaborations
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              A selection of JLU's key institutional, academic and industry partners — spanning universities, professional bodies and global organisations.
            </p>
          </motion.div>

          {/* Logo cards — same pattern as Accreditations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {logoPartners.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: customEase }}
                viewport={{ once: true }}
                className="group flex flex-col items-center"
              >
                <div className="relative overflow-hidden aspect-square w-full rounded-xl bg-white border border-[#e5e5e5]">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[#21313c] font-semibold text-sm md:text-base">{item.name}</p>
                  <p className="text-[#999] text-xs md:text-sm leading-snug mt-0.5">{item.country} · {item.type}</p>
                </div>
              </motion.div>
            ))}

            {/* "Explore All" tile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: logoPartners.length * 0.05, ease: customEase }}
              viewport={{ once: true }}
              className="group flex flex-col items-center"
            >
              <button
                onClick={() => setOrbOpen(true)}
                className="relative overflow-hidden aspect-square w-full rounded-xl bg-[#21313c] border border-[#21313c] flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:bg-[#021f2b]"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c3fd7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="text-white text-sm font-semibold px-4 text-center leading-snug">View All 42+ in 3D</span>
              </button>
              <div className="mt-3 text-center">
                <p className="text-[#21313c] font-semibold text-sm md:text-base">All Partners</p>
                <p className="text-[#999] text-xs md:text-sm leading-snug mt-0.5">Interactive 3D Globe</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. Full University Partner List ─────────────────────────────── */}
      <section className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Academic Collaborations
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              University{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Partners
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              JLU collaborates with world-class universities across 5 continents, enabling exchange programs, joint degrees and research partnerships.
            </p>
          </motion.div>

          {/* 4-column grid — same approach as accreditations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {academicPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: customEase }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-[#e5e5e5] px-5 py-5 flex flex-col gap-1 hover:border-[#027ea1]/40 transition-colors"
              >
                <p className="text-[#21313c] font-semibold text-sm md:text-base leading-snug">{partner.name}</p>
                <p className="text-[#999] text-xs md:text-sm">{partner.country}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Industry & Professional Partners ─────────────────────────── */}
      <section className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Industry Alliances
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              Industry &amp;{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Professional Partners
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              Partnerships with global industry leaders embed real-world expertise and professional certifications directly into JLU degree programs.
            </p>
          </motion.div>

          {/* Industry Partner Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {industryPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: customEase }}
                viewport={{ once: true }}
                className="bg-[#f6f7f0] rounded-xl border border-[#e5e5e5] px-5 py-5 flex flex-col gap-2 hover:border-[#027ea1]/40 transition-colors"
              >
                <p className="text-[#21313c] font-bold text-base md:text-lg leading-tight">{partner.shortName}</p>
                {partner.shortName !== partner.name && (
                  <p className="text-[#555] text-xs md:text-sm leading-snug">{partner.name}</p>
                )}
                <span
                  className="inline-block text-[10px] uppercase tracking-widest font-semibold mt-1"
                  style={{ color: '#027ea1', letterSpacing: '0.12em' }}
                >
                  {partner.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Associations & Memberships ───────────────────────────────── */}
      <section className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Memberships
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              International{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Associations
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              JLU holds memberships in prestigious global academic networks, positioning students within a worldwide community of scholars.
            </p>
          </motion.div>

          {/* Associations — 2x2 grid, same card style as accreditations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
            {associations.map((assoc, index) => (
              <motion.div
                key={assoc.shortName}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: customEase }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white rounded-xl border border-[#e5e5e5] overflow-hidden"
              >
                <div
                  className="flex items-center justify-center px-8 py-10"
                  style={{ borderBottom: '1px solid #e5e5e5', background: '#f6f7f0' }}
                >
                  <span
                    className="text-[#21313c]"
                    style={{
                      fontWeight: 700,
                      fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {assoc.shortName}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[#21313c] font-semibold text-sm md:text-base mb-2 leading-snug">{assoc.name}</p>
                  <p className="text-[#666] text-xs md:text-sm leading-relaxed">{assoc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


{/* ── 9. Bottom CTA — matches CtaBanner style ─────────────────────── */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20">
        <div
          className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 rounded-xl md:rounded-3xl lg:rounded-4xl"
          style={{ maxWidth: '1400px' }}
        >
          <motion.div
            className="text-center mb-6 md:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
              style={{ letterSpacing: '0.2em' }}
            >
              Join JLU
            </span>
            <h2
              className="text-white"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Study with a{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Global Edge
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Enrol at JLU and access a world of international learning, exchange programs, global certifications and cross-cultural collaboration.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="https://apply.jlu.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <span>→</span>
            </motion.a>
            <motion.a
              href="/international-office"
              className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center"
              whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.98 }}
            >
              International Office
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* 3D Orb Modal */}
      <PartnersOrb isOpen={orbOpen} onClose={() => setOrbOpen(false)} />
    </div>
  );
};

export { UniversityPartnershipsPage };
export default UniversityPartnershipsPage;
