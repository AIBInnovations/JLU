'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

// ─── Student Council Data ───
const councilLeaders = [
  { role: 'Champion', name: 'Arshwinder Singh', program: 'BBA', image: '/campus/gallery-5.jpg' },
  { role: 'Co-Champion', name: 'Samay Arora', program: 'BA Psychology Hons.', image: '/campus/gallery-6.jpg' },
  { role: 'Co-Champion', name: 'Simran Behl', program: 'BAJMC', image: '/campus/gallery-4.jpg' },
];

const councilClubs = [
  { name: 'Lakecity News', secretary: 'Naureen Khan', program: 'BA Psychology V' },
  { name: 'Literary Club', secretary: 'Richa Adwani', program: 'BBA LLB V' },
  { name: 'Sports & Adventure Club', secretary: 'Rahul Dukhande', program: 'BBA 5th Sem' },
  { name: 'MUN & Debating Society', secretary: 'Anushka Sahay', program: 'BMS 5th Sem' },
  { name: 'Dance Club', secretary: 'Shruti Bonde', program: 'BAJMC V' },
  { name: 'Dramatics Club', secretary: 'Nupur Bhatt', program: 'BA.LLB 7th Sem' },
  { name: 'Music Club', secretary: 'Jharna Raina', program: 'BAJMC V' },
  { name: 'Start-up & Entrepreneurship Club', secretary: 'Manas Chaturvedi', program: 'BMS 5th Sem' },
  { name: 'Community Service Club', secretary: 'Aditi Jain', program: 'BAPS V' },
  { name: 'Photography Club', secretary: 'TBD', program: '' },
];

// ─── Student Clubs Data ───
const studentClubs = [
  {
    name: 'Sports & Adventure Club',
    description: 'Competitive sports participation, skill development, and recreational fellowship through various athletic activities and outdoor adventures.',
    icon: 'sports',
    color: '#03463B',
    image: '/campus/gallery-16.jpg',
  },
  {
    name: 'Photography Club',
    description: 'Explore diverse photographic techniques through photo excursions and workshops, open to all skill levels.',
    icon: 'camera',
    color: '#21313c',
    image: '/campus/gallery-8.jpg',
  },
  {
    name: 'Music Club',
    description: 'Jam sessions, concerts, open mics, instrument workshops, and collaborative opportunities for all music enthusiasts.',
    icon: 'music',
    color: '#6B4C9A',
    image: '/campus/gallery-15.jpg',
  },
  {
    name: 'Dance Club',
    description: 'Ballroom, salsa, hip hop, contemporary, and folk dance styles with performances, competitions, and festival opportunities.',
    icon: 'dance',
    color: '#C4532D',
    image: '/campus/gallery-5.jpg',
  },
  {
    name: 'Literary Club',
    description: 'Book discussions, poetry reading & writing, short story creation, and literary competitions to develop writing skills.',
    icon: 'book',
    color: '#1A5276',
    image: '/campus/gallery-9.jpg',
  },
  {
    name: 'Dramatics Club',
    description: 'Monthly performances including stage plays, road plays, mime acts, and role plays — with a vision of "Theatre in Unlikely Spaces."',
    icon: 'theater',
    color: '#8B0000',
    image: '/campus/gallery-15.jpg',
  },
  {
    name: 'MUN & Debating Society',
    description: 'Parliamentary debate training, research skills, and Model UN participation to develop public speaking and awareness of current events.',
    icon: 'debate',
    color: '#2C3E50',
    image: '/campus/gallery-15.jpg',
  },
  {
    name: 'Community Service Club',
    description: 'Social wellbeing, volunteering, and community outreach initiatives focused on creating positive social change.',
    icon: 'community',
    color: '#196F3D',
    image: '/campus/gallery-14.jpg',
  },
  {
    name: 'Start-up & Entrepreneurship Club',
    description: 'Business development mentorship, potential funding through JLU\'s innovation ecosystem, and networking opportunities.',
    icon: 'startup',
    color: '#D4AC0D',
    image: '/campus/smart-classroom.jpg',
  },
  {
    name: 'Placement & Industry Interaction Club',
    description: 'Bridges academia and industry through skill workshops, placement discussions, and professional development training.',
    icon: 'briefcase',
    color: '#34495E',
    image: '/campus/gallery-11.jpg',
  },
];

// ─── Student Achievements Data ───
const achievements = [
  {
    title: 'Smart India Hackathon 2020 — 1st Position',
    description: 'Team PINAKULO (B.Tech CSE students) created a solution for the Ministry of Rural Development, winning Rs. 1,00,000 from the Government of India.',
    category: 'Hackathon',
    image: '/campus/gallery-11.jpg',
  },
  {
    title: 'Navonmesh Startup Competition',
    description: 'PINAKULO went on to win the Navonmesh Startup Competition hosted by AIC-RNTU, competing against 300+ applicants and earning Rs. 1 lakh in funding.',
    category: 'Startup',
    image: '/campus/gallery-12.jpg',
  },
  {
    title: 'AUAP-JLU International Moot Court',
    description: 'Annual international competition in collaboration with the Association of Universities of Asia and the Pacific, with 18+ teams from universities across India. Prize pool of Rs. 2,25,000.',
    category: 'Law',
    image: '/campus/gallery-15.jpg',
  },
  {
    title: 'International Karate/Judo Gold Medals',
    description: 'Prithviraj Singh Chouhan won gold medals in international Karate and Judo competitions, representing JLU on the global stage.',
    category: 'Sports',
    image: '/campus/gallery-17.jpg',
  },
  {
    title: 'National Chess Tournament Victories',
    description: 'Vishal Bansiwal secured 1st place in Udaipur, 3rd in Delhi, and 2nd in Ahmedabad chess tournaments.',
    category: 'Sports',
    image: '/campus/gallery-16.jpg',
  },
  {
    title: 'IIC National Innovation Contest',
    description: 'JLU faculty and students qualified for the second stage of the IIC National Innovation Contest, showcasing research excellence.',
    category: 'Innovation',
    image: '/campus/smart-classroom.jpg',
  },
];

const institutionalAwards = [
  { award: 'QS I-GAUGE Diamond Rating', detail: 'Top 25 Universities in India', accent: '#f0c14b', icon: 'diamond' },
  { award: 'University of the Year', detail: 'MP Government (5 consecutive years)', accent: '#03463B', icon: 'trophy' },
  { award: 'Education World', detail: 'No. 1 Private University designation', accent: '#21313c', icon: 'globe' },
  { award: 'Careers360 AAA Rated', detail: 'Top B-School recognition', accent: '#f0c14b', icon: 'star' },
  { award: 'Global League Institution', detail: 'House of Commons, London (2015)', accent: '#03463B', icon: 'award' },
  { award: 'CIMA Recognition', detail: 'Most Innovative University', accent: '#21313c', icon: 'badge' },
];

const AwardIcon = ({ type, color }: { type: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    diamond: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" /><path d="M2 9h20" /><path d="M12 22L6 9l3-6" /><path d="M12 22l6-13-3-6" />
      </svg>
    ),
    trophy: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    globe: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    star: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    award: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    badge: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  };
  return <>{icons[type] || icons.star}</>;
};

// ─── Corporate Relations Data ───
const placementStats = [
  { number: '100+', label: 'MNCs Recruited' },
  { number: '15', suffix: 'LPA', label: 'Highest Package' },
  { number: '4.28', suffix: 'LPA', label: 'Median Package' },
  { number: '40+', label: 'Internship Partners' },
];

const topRecruiters = {
  'IT & Technology': ['Amazon', 'Infosys', 'TCS', 'Tech Mahindra', 'Wipro', 'Capgemini', 'HCL'],
  'Banking & Finance': ['Axis Bank', 'HDFC Bank', 'ICICI Lombard', 'IDBI Bank', 'S&P Global', 'Motilal Oswal'],
  'Consulting': ['Deloitte', 'KPMG', 'Accenture'],
  'Media': ['NDTV', 'TOI', 'Patrika', 'Red FM', 'Ogilvy', 'Nielsen'],
  'Hospitality': ['JW Marriott', 'The Oberoi', 'The Leela', 'Taj Hotels', 'Radisson'],
  'Automotive': ['Mercedes-Benz', 'Eicher', 'Ultra Tech', 'Whirlpool'],
};

// ─── IgnitoX Data ───
const incubationServices = [
  { title: 'Incubation', description: 'Dedicated space and structured program for startups to grow and scale.' },
  { title: 'Mentoring', description: 'Guidance from industry experts, faculty, and successful entrepreneurs.' },
  { title: 'Training', description: 'Skill-building workshops, bootcamps, and hands-on learning programs.' },
  { title: 'Business Networking', description: 'Connections with industry leaders, investors, and potential partners.' },
  { title: 'Co-working', description: 'Shared workspace equipped with modern amenities and wireless internet.' },
  { title: 'Financial Support', description: 'Assistance in securing funding and access to investment networks.' },
];

// ─── Igniting Minds Data ───
const lectureSpeakers = [
  {
    name: 'Dr. Marina Girju',
    title: 'Associate Dean, School of Business, California Baptist University',
    topic: 'Power of Analytics: Response in variation in consumption due to consumers and manufacturers',
  },
  {
    name: 'Kushal Das',
    title: 'General Secretary, All India Football Federation (AIFF)',
    topic: 'Leadership and Sports Administration in India',
  },
  {
    name: 'Bachi Karkaria',
    title: 'Renowned Journalist & Author',
    topic: '7th JLU International Festival of Media',
  },
  {
    name: 'Prof. Adriana Amado',
    title: 'Media Professor, Spain',
    topic: 'Global Media Perspectives',
  },
  {
    name: 'Prof. Sam Coley',
    title: 'Media Academic, United Kingdom',
    topic: 'International Journalism & Ethics',
  },
  {
    name: 'Deep Haldar',
    title: 'Senior Journalist',
    topic: 'Media & Social Impact',
  },
];

// ─── Club Icon SVGs ───
const ClubIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    sports: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    camera: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
      </svg>
    ),
    music: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
    dance: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2" /><path d="M12 6v6l4 4" /><path d="M12 12l-4 4" /><path d="M8 16l-2 4" /><path d="M16 16l2 4" />
      </svg>
    ),
    book: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    theater: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    debate: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    community: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    startup: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    briefcase: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  };
  return icons[type] || icons.sports;
};

const CampusLife = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Council parallax image
  const councilImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: councilImgProgress } = useScroll({
    target: councilImgRef,
    offset: ['start end', 'end start'],
  });
  const councilImgY = useTransform(councilImgProgress, [0, 1], ['0%', '20%']);

  // Achievements parallax
  const achieveImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: achieveImgProgress } = useScroll({
    target: achieveImgRef,
    offset: ['start end', 'end start'],
  });
  const achieveImgY = useTransform(achieveImgProgress, [0, 1], ['0%', '15%']);

  // Corporate parallax banner
  const corpBannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: corpBannerProgress } = useScroll({
    target: corpBannerRef,
    offset: ['start end', 'end start'],
  });
  const corpBannerY = useTransform(corpBannerProgress, [0, 1], ['-10%', '10%']);

  // Igniting minds parallax
  const ignitingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ignitingProgress } = useScroll({
    target: ignitingRef,
    offset: ['start end', 'end start'],
  });
  const ignitingY = useTransform(ignitingProgress, [0, 1], ['0%', '20%']);

  // Community section scroll animations
  const communityRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: communityProgress } = useScroll({
    target: communityRef,
    offset: ['start end', 'start start'],
  });
  const communityScale = useTransform(communityProgress, [0, 0.5, 1], [1.6, 1.15, 1]);
  const communityContentOpacity = useTransform(communityProgress, [0.6, 0.9], [0, 1]);
  const communityContentY = useTransform(communityProgress, [0.6, 0.9], [60, 0]);

  // State
  const [activeClubIndex, setActiveClubIndex] = useState(0);
  const [activeRecruiterCategory, setActiveRecruiterCategory] = useState<string>('IT & Technology');
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen"
          style={{ minHeight: '100vh' }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="/campus/gallery-14.jpg"
              alt="Campus Life"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 40px)',
            paddingTop: 'clamp(100px, 15vw, 120px)',
            maxWidth: '800px',
          }}
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Life, <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Between</span> Everything
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 400 }}
          >
            Campus life at JLU lives in the in-between.<br />
            Between classes and conversations.<br />
            Between ideas and friendships.<br />
            Between who you were and who you are becoming.
          </motion.p>
        </motion.div>

        <div
          className="absolute bottom-0 left-0"
          style={{ paddingLeft: 'clamp(8px, 2vw, 40px)', paddingBottom: '0px' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(5rem, 14vw, 14rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Campus Life
          </motion.h1>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 1. STUDENT COUNCIL — Image + Text Split with Parallax */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="w-full bg-white">
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-32" style={{ maxWidth: '1440px' }}>
          {/* Top: Image banner with parallax + heading overlay */}
          <div ref={councilImgRef} className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden mb-16">
            <motion.div className="absolute inset-0" style={{ y: councilImgY }}>
              <Image
                src="/campus/gallery-6.jpg"
                alt="Student Council at JLU"
                fill
                className="object-cover scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/40 to-transparent" />
            <motion.div
              className="absolute bottom-0 left-0 p-6 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <p className="text-[#f0c14b]/80 uppercase tracking-widest text-[11px] md:text-[12px] mb-2" style={{ letterSpacing: '0.2em' }}>
                Student Governance
              </p>
              <h2
                className="text-white"
                style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
              >
                Student{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Council
                </span>
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[#666] text-base md:text-lg max-w-3xl mb-16"
            style={{ lineHeight: 1.8 }}
          >
            The Student Council serves as an elected body facilitating student expression and contribution to university affairs, nurturing leadership opportunities and strengthening student-faculty relations.
          </motion.p>

          {/* Council Leadership Cards — with background image strips */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {councilLeaders.map((leader, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative overflow-hidden group rounded-2xl"
                style={{ minHeight: '220px' }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c] via-[#21313c]/70 to-[#21313c]/20 group-hover:via-[#21313c]/60 transition-all duration-500" />
                <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                  <span className="text-[#f0c14b] uppercase tracking-widest text-[11px] block mb-3" style={{ letterSpacing: '0.15em' }}>
                    {leader.role}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-1">{leader.name}</h3>
                  <p className="text-white/60 text-sm">{leader.program}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Club Secretaries Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#21313c] text-xl md:text-2xl font-semibold mb-8" style={{ letterSpacing: '-0.02em' }}>
              Club Leadership
            </h3>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              }}
            >
              {/* Marquee track */}
              <motion.div
                className="flex gap-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ x: { duration: 30, ease: 'linear', repeat: Infinity } }}
                style={{ width: 'max-content' }}
              >
                {[...councilClubs, ...councilClubs].map((club, i) => (
                  <div
                    key={i}
                    className="shrink-0 border border-[#e5e5e5] rounded-xl px-5 py-4 hover:border-[#f0c14b] hover:shadow-sm transition-all duration-300"
                    style={{ minWidth: '260px' }}
                  >
                    <h4 className="text-[#21313c] font-medium text-sm md:text-base mb-1 whitespace-nowrap">{club.name}</h4>
                    <p className="text-[#999] text-xs md:text-sm whitespace-nowrap">
                      Secretary: {club.secretary}{club.program ? ` (${club.program})` : ''}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 2. STUDENT CLUBS — Image Card + List Selector */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="w-full" style={{ backgroundColor: '#f6f7f0' }}>
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-32" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[#999] uppercase tracking-widest text-[11px] md:text-[12px] mb-3" style={{ letterSpacing: '0.2em' }}>
              Find Your People
            </p>
            <h2
              className="text-[#21313c] mb-6"
              style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Student{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Clubs
              </span>
            </h2>
            <p className="text-[#666] text-base md:text-lg max-w-3xl mb-16" style={{ lineHeight: 1.8 }}>
              10 student clubs designed to develop skills, build connections, and pursue interests beyond academics — from creative arts to competitive sports.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Club List (Left) */}
            <div className="lg:w-[45%]">
              <div className="flex flex-col gap-2">
                {studentClubs.map((club, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveClubIndex(i)}
                    className="flex items-center gap-4 text-left px-5 py-4 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: activeClubIndex === i ? '#21313c' : 'transparent',
                      color: activeClubIndex === i ? 'white' : '#21313c',
                    }}
                    whileHover={{ x: activeClubIndex === i ? 0 : 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: activeClubIndex === i ? '#f0c14b' : '#e8e9e3',
                        color: activeClubIndex === i ? '#21313c' : '#666',
                      }}
                    >
                      <ClubIcon type={club.icon} />
                    </span>
                    <span className="font-medium text-sm md:text-base">{club.name}</span>
                    {activeClubIndex === i && (
                      <motion.span layoutId="club-arrow" className="ml-auto text-[#f0c14b]">
                        &rarr;
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Club Detail (Right) — with Image, full height to match list */}
            <div className="lg:w-[55%] lg:sticky lg:top-32 lg:self-stretch">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClubIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: customEase }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm h-full flex flex-col"
                >
                  {/* Club Image — grows to fill available space */}
                  <div className="relative w-full flex-1 min-h-[220px] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: customEase }}
                    >
                      <Image
                        src={studentClubs[activeClubIndex].image}
                        alt={studentClubs[activeClubIndex].name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div
                      className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: studentClubs[activeClubIndex].color }}
                    >
                      <ClubIcon type={studentClubs[activeClubIndex].icon} />
                    </div>
                  </div>

                  {/* Club Text */}
                  <div className="p-7 md:p-9">
                    <h3
                      className="text-[#21313c] text-2xl md:text-3xl font-semibold mb-4"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {studentClubs[activeClubIndex].name}
                    </h3>
                    <p className="text-[#666] text-base md:text-lg mb-6" style={{ lineHeight: 1.8 }}>
                      {studentClubs[activeClubIndex].description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#999]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      </svg>
                      Open to all students
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 3. STUDENT ACHIEVEMENTS — Image + Accordion Split */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="w-full bg-white">
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-32" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[#999] uppercase tracking-widest text-[11px] md:text-[12px] mb-3" style={{ letterSpacing: '0.2em' }}>
              Celebrating Excellence
            </p>
            <h2
              className="text-[#21313c] mb-6"
              style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Student{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Achievements
              </span>
            </h2>
          </motion.div>

          {/* Two-column: Image left, Accordion right */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20">
            {/* Left — Sticky image that changes with expanded achievement */}
            <div ref={achieveImgRef} className="lg:w-[45%] lg:sticky lg:top-32 lg:self-start">
              <motion.div
                className="relative w-full h-[300px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: customEase }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={expandedAchievement ?? 'default'}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="absolute inset-0" style={{ y: achieveImgY }}>
                      <Image
                        src={expandedAchievement !== null ? achievements[expandedAchievement].image : '/campus/gallery-15.jpg'}
                        alt="Student Achievement"
                        fill
                        className="object-cover scale-110"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <p className="text-white/70 text-sm mb-1">
                    {expandedAchievement !== null ? achievements[expandedAchievement].category : 'JLU Achievements'}
                  </p>
                  <p className="text-white font-semibold text-lg md:text-xl" style={{ letterSpacing: '-0.02em' }}>
                    {expandedAchievement !== null ? achievements[expandedAchievement].title : 'From hackathons to gold medals'}
                  </p>
                </div>
              </motion.div>

              {/* Stats row below image */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[{ n: '6+', l: 'National Wins' }, { n: '3', l: 'International Awards' }, { n: '300+', l: 'Competitions' }].map((s, i) => (
                  <motion.div
                    key={i}
                    className="text-center bg-[#f6f7f0] rounded-xl py-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[#21313c] text-2xl md:text-3xl font-semibold block" style={{ letterSpacing: '-0.03em' }}>{s.n}</span>
                    <span className="text-[#999] text-xs">{s.l}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Accordion */}
            <div className="lg:w-[55%]">
              <p className="text-[#666] text-base md:text-lg mb-10" style={{ lineHeight: 1.8 }}>
                From national hackathons to international sports — JLU students create impact far beyond the campus.
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border-b border-[#e5e5e5]"
                  >
                    <button
                      onClick={() => setExpandedAchievement(expandedAchievement === i ? null : i)}
                      className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                    >
                      <div className="flex items-center gap-3 md:gap-5 flex-1">
                        <span
                          className="shrink-0 px-3 py-1 rounded-full text-[10px] md:text-[11px] uppercase tracking-wider font-medium"
                          style={{ backgroundColor: '#f6f7f0', color: '#03463B', letterSpacing: '0.1em' }}
                        >
                          {achievement.category}
                        </span>
                        <h3
                          className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg group-hover:text-[#f0c14b] transition-colors duration-300"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {achievement.title}
                        </h3>
                      </div>
                      <motion.span
                        animate={{ rotate: expandedAchievement === i ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 ml-4 text-[#21313c] text-xl md:text-2xl"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expandedAchievement === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: customEase }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#666] text-sm md:text-base pb-6 md:pb-8" style={{ lineHeight: 1.8 }}>
                            {achievement.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Institutional Recognition — Bento-style staggered layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#21313c] text-xl md:text-2xl font-semibold mb-10" style={{ letterSpacing: '-0.02em' }}>
              Institutional Recognition
            </h3>

            {/* Bento grid — 2 tall left + 4 small right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
              {/* Featured card — QS Diamond (spans 5 cols, tall) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: customEase }}
                viewport={{ once: true }}
                className="md:col-span-5 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-default"
                style={{ background: 'linear-gradient(135deg, #21313c 0%, #03463B 100%)', minHeight: '320px' }}
              >
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10" style={{ background: '#f0c14b' }} />
                <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10" style={{ background: '#f0c14b' }} />
                <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#f0c14b]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <AwardIcon type="diamond" color="#f0c14b" />
                    </div>
                    <h4 className="text-white text-2xl md:text-3xl font-bold mb-3" style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                      {institutionalAwards[0].award}
                    </h4>
                    <p className="text-white/60 text-sm md:text-base" style={{ lineHeight: 1.6 }}>
                      {institutionalAwards[0].detail}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f0c14b]" />
                    <span className="text-[#f0c14b] text-xs uppercase tracking-widest font-medium">Nationally Ranked</span>
                  </div>
                </div>
              </motion.div>

              {/* 4 smaller cards — right side, 2x2 grid on 7 cols */}
              {institutionalAwards.slice(1, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 * (i + 1), ease: customEase }}
                  viewport={{ once: true }}
                  className="md:col-span-7 rounded-2xl p-6 md:p-7 relative overflow-hidden group cursor-default"
                  style={{ backgroundColor: i === 0 ? '#f0c14b' : '#f6f7f0', border: i === 1 ? '1px solid #e5e5e5' : 'none' }}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundColor: i === 0 ? 'rgba(33,49,60,0.15)' : `${item.accent}15` }}
                    >
                      <AwardIcon type={item.icon} color={i === 0 ? '#21313c' : item.accent} />
                    </div>
                    <div>
                      <h4
                        className="font-bold text-base md:text-lg mb-1"
                        style={{ color: i === 0 ? '#21313c' : '#21313c', letterSpacing: '-0.01em' }}
                      >
                        {item.award}
                      </h4>
                      <p className="text-sm" style={{ color: i === 0 ? 'rgba(33,49,60,0.7)' : '#999' }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bottom row — 3 cards spanning full 12 cols */}
              {institutionalAwards.slice(3).map((item, i) => (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (i + 3), ease: customEase }}
                  viewport={{ once: true }}
                  className="md:col-span-4 rounded-2xl p-6 md:p-7 relative overflow-hidden group cursor-default border border-[#e5e5e5] hover:border-transparent hover:shadow-lg transition-all duration-500"
                  style={{ background: '#fff' }}
                >
                  {/* Hover accent line */}
                  <div
                    className="absolute top-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: item.accent }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: `${item.accent}15` }}
                  >
                    <AwardIcon type={item.icon} color={item.accent} />
                  </div>
                  <h4 className="text-[#21313c] font-bold text-sm md:text-base mb-1.5" style={{ letterSpacing: '-0.01em' }}>
                    {item.award}
                  </h4>
                  <p className="text-[#999] text-xs md:text-sm" style={{ lineHeight: 1.6 }}>
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 4. CORPORATE RELATIONS — Full-width Parallax Banner + Dark Section */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/* Parallax image break */}
      <div ref={corpBannerRef} className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: corpBannerY }}>
          <Image
            src="/campus/gallery-8.jpg"
            alt="Corporate Relations"
            fill
            className="object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#21313c]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <p className="text-[#f0c14b]/80 uppercase tracking-widest text-[11px] md:text-[12px] mb-3" style={{ letterSpacing: '0.2em' }}>
              Industry Connect
            </p>
            <h2
              className="text-white"
              style={{ fontWeight: 600, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Corporate{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                Relations
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="w-full" style={{ backgroundColor: '#21313c' }}>
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-28" style={{ maxWidth: '1440px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white/60 text-base md:text-lg max-w-3xl mb-16"
            style={{ lineHeight: 1.8 }}
          >
            Strong industry connections managed by our Industry Relation Cell translate learning into internships, placements, and real-world exposure — developing students with the right skills, attitude, and ethics.
          </motion.p>

          {/* Placement Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {placementStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="text-center md:text-left"
              >
                <div className="flex items-baseline justify-center md:justify-start gap-1">
                  <span className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold" style={{ letterSpacing: '-0.03em' }}>
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="text-[#f0c14b] text-lg md:text-xl font-medium">{stat.suffix}</span>
                  )}
                </div>
                <p className="text-white/50 text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Image mosaic row */}
          <motion.div
            className="grid grid-cols-3 gap-3 mb-16 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            {['/campus/smart-classroom.jpg', '/campus/gallery-13.jpg', '/campus/gallery-3.jpg'].map((src, i) => (
              <div key={i} className="relative h-[120px] md:h-[180px] overflow-hidden group">
                <Image src={src} alt="Corporate" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-[#21313c]/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </motion.div>

          {/* Top Recruiters with Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl md:text-2xl font-semibold mb-8" style={{ letterSpacing: '-0.02em' }}>
              Top Recruiters
            </h3>

            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(topRecruiters).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveRecruiterCategory(category)}
                  className="px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: activeRecruiterCategory === category ? '#f0c14b' : 'rgba(255,255,255,0.08)',
                    color: activeRecruiterCategory === category ? '#21313c' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeRecruiterCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {topRecruiters[activeRecruiterCategory as keyof typeof topRecruiters].map((company, i) => (
                  <motion.span
                    key={company}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="px-5 py-3 rounded-xl text-sm md:text-base font-medium"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {company}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 5. IgnitoX — INCUBATION HUB with Image */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="w-full bg-white">
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-32" style={{ maxWidth: '1440px' }}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left - Content */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <p className="text-[#999] uppercase tracking-widest text-[11px] md:text-[12px] mb-3" style={{ letterSpacing: '0.2em' }}>
                Innovation Ecosystem
              </p>
              <h2
                className="text-[#21313c] mb-6"
                style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
              >
                IgnitoX —{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Incubation Hub
                </span>
              </h2>
              <p className="text-[#666] text-base md:text-lg mb-10" style={{ lineHeight: 1.8 }}>
                The JLU Foundation for Incubation and Entrepreneurship (JLUFIE) provides essential services to budding entrepreneurs, helping turn ideas into viable businesses through practice-based pedagogy and dedicated support infrastructure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {incubationServices.map((service, i) => (
                  <motion.div
                    key={i}
                    className="border border-[#e5e5e5] rounded-xl p-5 hover:border-[#f0c14b] transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: customEase }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                  >
                    <h4 className="text-[#21313c] font-semibold text-sm md:text-base mb-2">{service.title}</h4>
                    <p className="text-[#999] text-xs md:text-sm" style={{ lineHeight: 1.6 }}>{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Image + Success Story */}
            <motion.div
              className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              {/* Lab/Innovation image */}
              <div className="relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden mb-6 group">
                <Image
                  src="/campus/gallery-12.jpg"
                  alt="IgnitoX Innovation Hub"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03463B]/80 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="bg-[#f0c14b] text-[#21313c] text-xs font-semibold px-3 py-1 rounded-full">Innovation Hub</span>
                </div>
              </div>

              <div className="bg-[#03463B] rounded-2xl p-8 md:p-10 text-white mb-6">
                <span className="text-[#f0c14b] uppercase tracking-widest text-[10px] block mb-4" style={{ letterSpacing: '0.2em' }}>
                  Success Story
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Team PINAKULO
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-6" style={{ lineHeight: 1.8 }}>
                  B.Tech CSE students created a solution for the Ministry of Rural Development, winning 1st position at Smart India Hackathon 2020 (Rs. 1,00,000) and the Navonmesh Startup Competition against 300+ applicants.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">Smart India Hackathon</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">Government of India</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">Rs. 1,00,000</span>
                </div>
              </div>

              <div className="bg-[#f6f7f0] rounded-2xl p-8 md:p-10">
                <h4 className="text-[#21313c] font-semibold text-lg mb-5">Hub Facilities</h4>
                <ul className="space-y-3">
                  {['Wireless internet & modern workstations', 'Make-shift ideation space', 'Meeting zones & recreation corner', 'Startup bootcamps & IPR workshops', 'Design thinking & pitch deck programs'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#666] text-sm md:text-base">
                      <svg className="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#03463B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 6. IGNITING MINDS — Image Banner + Speaker Cards */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/* Full-width parallax image header */}
      <div ref={ignitingRef} className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: ignitingY }}>
          <Image
            src="/campus/gallery-10.jpg"
            alt="Igniting Minds Lecture Series"
            fill
            className="object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(33,49,60,0.85) 0%, rgba(3,70,59,0.7) 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center px-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <p className="text-[#f0c14b]/80 uppercase tracking-widest text-[11px] md:text-[12px] mb-4" style={{ letterSpacing: '0.2em' }}>
              Igniting Minds, Changing Lives
            </p>
            <span
              className="text-white font-semibold block mb-3"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              500+
            </span>
            <p className="text-white/70 text-sm md:text-base uppercase tracking-widest" style={{ letterSpacing: '0.15em' }}>
              CEOs & Top Professionals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full" style={{ backgroundColor: '#f6f7f0' }}>
        <div className="mx-auto px-5 sm:px-8 md:px-[120px] py-20 md:py-28" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2
              className="text-[#21313c] mb-6"
              style={{ fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Igniting Minds{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Lecture Series
              </span>
            </h2>
            <p className="text-[#666] text-base md:text-lg max-w-3xl" style={{ lineHeight: 1.8 }}>
              A flagship initiative where industry leaders, CEOs, and top professionals interact with students — bridging the gap between academia and industry.
            </p>
          </motion.div>

          {/* Speaker Cards — with avatar circles and layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {lectureSpeakers.map((speaker, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                whileHover={{ y: -4 }}
              >
                {/* Colored top bar */}
                <div className="h-2" style={{ backgroundColor: i % 2 === 0 ? '#21313c' : '#03463B' }} />
                <div className="p-7 md:p-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-xl mb-5"
                    style={{ backgroundColor: i % 2 === 0 ? '#21313c' : '#03463B' }}
                  >
                    {speaker.name.charAt(0)}
                  </div>
                  <h3
                    className="text-[#21313c] font-semibold text-lg md:text-xl mb-2 group-hover:text-[#f0c14b] transition-colors duration-300"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {speaker.name}
                  </h3>
                  <p className="text-[#999] text-xs md:text-sm mb-5" style={{ lineHeight: 1.5 }}>
                    {speaker.title}
                  </p>
                  <div className="pt-4 border-t border-[#e5e5e5]">
                    <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>
                      {speaker.topic}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Image strip at bottom */}
          <motion.div
            className="mt-16 grid grid-cols-4 gap-3 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            {['/campus/gallery-9.jpg', '/campus/gallery-4.jpg', '/campus/gallery-7.jpg', '/campus/gallery-19.jpg'].map((src, i) => (
              <div key={i} className="relative h-[100px] md:h-[160px] overflow-hidden group">
                <Image src={src} alt="Campus" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* COMMUNITY CTA — Scroll Zoom */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="w-full bg-white px-4 py-12 md:px-6 md:py-16 lg:px-10 lg:py-20">
        <div
          ref={communityRef}
          className="relative overflow-hidden mx-auto h-[70vh] md:h-[80vh] lg:h-[90vh] rounded-2xl md:rounded-3xl lg:rounded-4xl"
          style={{ maxWidth: '1400px' }}
        >
          <motion.div className="absolute inset-0" style={{ scale: communityScale }}>
            <Image
              src="/campus/hero-campus.jpg"
              alt="Campus Community"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/40" style={{ opacity: communityContentOpacity }} />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: communityContentOpacity, y: communityContentY }}
          >
            <div className="text-center max-w-200 px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
              <motion.span
                className="text-white/70 uppercase tracking-widest block mb-4 md:mb-5 lg:mb-6 text-[10px] md:text-[11px] lg:text-[12px]"
                style={{ letterSpacing: '0.3em' }}
              >
                Community
              </motion.span>
              <motion.h2
                className="text-white mb-4 md:mb-5 lg:mb-6"
                style={{ fontWeight: 600, fontSize: 'clamp(1.5rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
              >
                More than a campus —{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  it&apos;s a community
                </span>
              </motion.h2>
              <motion.p
                className="text-white/80 text-sm md:text-base lg:text-xl mb-6 md:mb-8 lg:mb-10"
                style={{ fontWeight: 400, lineHeight: 1.8 }}
              >
                Every event, club, and initiative is designed to help students grow not just academically, but personally and professionally.
              </motion.p>
              <motion.button
                className="inline-flex items-center gap-2 md:gap-3 bg-white text-[#21313c] font-medium px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4.5 text-sm md:text-base rounded-full"
                whileHover={{ scale: 1.05, backgroundColor: '#f0c14b' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                Join our community
                <span>&rarr;</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { CampusLife };
export default CampusLife;
