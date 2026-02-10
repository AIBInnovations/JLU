'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface PhilosophyCardData {
  id: number;
  title: string;
  description: string;
  image: string;
  modalContent: {
    heading: string;
    intro: string;
    points: { title: string; description: string }[];
    conclusion: string;
  };
}

const philosophyCards: PhilosophyCardData[] = [
  {
    id: 1,
    title: 'Values-driven learning',
    description: 'Education rooted in ethics, purpose, and responsible leadership.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    modalContent: {
      heading: 'Values-Driven Learning',
      intro: 'At JLU, education goes beyond academics. We believe in nurturing individuals who lead with integrity, think with purpose, and act responsibly.',
      points: [
        { title: 'Ethical Foundation', description: 'Every program integrates ethical reasoning and moral awareness into the curriculum.' },
        { title: 'Purpose-Led Education', description: 'Students are encouraged to find meaning in their learning journey and connect it to larger societal goals.' },
        { title: 'Responsible Leadership', description: 'Leadership training emphasizes accountability, empathy, and sustainable decision-making.' },
        { title: 'Community Engagement', description: 'Regular outreach programs and social initiatives help students understand their role in society.' },
      ],
      conclusion: 'Our graduates leave not just with degrees, but with a strong moral compass to guide their careers.',
    },
  },
  {
    id: 2,
    title: 'Interdisciplinary structure',
    description: 'Programs designed to connect disciplines, ideas, and real-world application.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    modalContent: {
      heading: 'Interdisciplinary Structure',
      intro: 'Modern challenges require integrated thinking. Our academic structure breaks silos and encourages cross-disciplinary exploration.',
      points: [
        { title: 'Connected Curriculum', description: 'Courses are designed to overlap and complement each other across faculties.' },
        { title: 'Flexible Pathways', description: 'Students can take electives from different schools, creating personalized learning journeys.' },
        { title: 'Collaborative Projects', description: 'Team projects bring together students from diverse backgrounds to solve complex problems.' },
        { title: 'Joint Research Initiatives', description: 'Faculty from different disciplines collaborate on research that addresses multifaceted issues.' },
      ],
      conclusion: 'This structure prepares students for a world where the best solutions come from connecting diverse perspectives.',
    },
  },
  {
    id: 3,
    title: 'Industry & research integration',
    description: 'Learning shaped by industry exposure, live projects, and active research.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    modalContent: {
      heading: 'Industry & Research Integration',
      intro: 'Theory meets practice at JLU. We ensure students are industry-ready through real-world exposure and active research participation.',
      points: [
        { title: 'Industry Partnerships', description: 'Collaborations with leading companies provide internships, mentorship, and placement opportunities.' },
        { title: 'Live Projects', description: 'Students work on actual industry problems, gaining practical experience before graduation.' },
        { title: 'Research Culture', description: 'Undergraduate and postgraduate students are encouraged to participate in ongoing research projects.' },
        { title: 'Innovation Labs', description: 'State-of-the-art labs and incubation centers support entrepreneurial and research endeavors.' },
      ],
      conclusion: 'Our students graduate with portfolios of real work and research experience that set them apart.',
    },
  },
];

const facultiesData = [
  {
    id: 1,
    name: 'Faculty of Management',
    description: 'Focused on developing thoughtful leaders, managers, and entrepreneurs who understand both business and people.',
    schools: [
      { name: 'Jagran Lakecity Business School', description: 'Builds strong foundations in management through case thinking, industry exposure, and leadership development.' },
      { name: 'Jagran School of Sports Management', description: 'Prepares students for the business side of sports, combining management principles with the realities of the sports ecosystem.' },
      { name: 'Jagran School of Hospitality and Aviation Management', description: 'Designed for global service industries, with a focus on professionalism, operational excellence, and customer experience.' },
    ],
  },
  {
    id: 2,
    name: 'Faculty of Journalism and Social Science',
    description: 'Dedicated to understanding society, communication, culture, and responsible storytelling.',
    schools: [
      { name: 'Jagran School of Journalism', description: 'Trains journalists to report with integrity, context, and curiosity across media platforms.' },
      { name: 'Jagran School of Advertising and Public Relations', description: 'Focuses on brand communication, creative strategy, and audience engagement in a rapidly evolving media world.' },
      { name: 'Jagran School of Events and Entertainment', description: 'Prepares students for the dynamic fields of events, media, and entertainment through practical exposure.' },
      { name: 'Jagran School of Languages and Social Science', description: 'Encourages cultural awareness, critical thinking, and communication through language and social inquiry.' },
    ],
  },
  {
    id: 3,
    name: 'Faculty of Fashion, Design and Arts',
    description: 'A creative environment where ideas are shaped through design, form, and thoughtful expression.',
    schools: [
      { name: 'Jagran School of Design', description: 'Nurtures design thinking and creative problem solving across visual and applied disciplines.' },
      { name: 'Jagran School of Architecture', description: 'Balances creativity with structure, preparing students to design spaces that respond to people and context.' },
      { name: 'Jagran School of Fashion', description: 'Explores fashion as culture, creativity, and industry, blending design sensibility with practical insight.' },
    ],
  },
  {
    id: 4,
    name: 'Faculty of Engineering and Technology',
    description: 'Built for problem solvers, innovators, and future focused technologists.',
    schools: [
      { name: 'Jagran School of Artificial Intelligence', description: 'Focused on emerging technologies, data driven thinking, and intelligent systems.' },
      { name: 'Jagran School of Engineering', description: 'Offers strong technical foundations combined with practical learning and industry awareness.' },
      { name: 'Jagran School of Computer Application', description: 'Prepares students for careers in software, computing, and digital solutions through hands on learning.' },
    ],
  },
  {
    id: 5,
    name: 'Faculty of Pharmacy',
    description: 'Combines scientific learning with responsibility, preparing students for healthcare, research, and pharmaceutical sciences.',
    schools: [],
  },
  {
    id: 6,
    name: 'Faculty of Law',
    description: 'Develops legal professionals with clarity of thought, ethical grounding, and practical understanding of the law.',
    schools: [],
  },
  {
    id: 7,
    name: 'IICA, Jagran Centre for Creative Skills',
    description: 'A skill focused centre bridging education and employability through industry connected, practice based learning.',
    schools: [],
  },
];

const learningMethods = [
  'Dialogue-led sessions',
  'Project-based exploration',
  'Case discussions and simulations',
  'Industry and field exposure',
  'Collaborative and cross-disciplinary work',
];

const testimonials = [
  {
    id: 1,
    quote: 'The interdisciplinary approach here allowed me to combine my passion for sustainable design with advanced engineering principles.',
    name: 'Mohit Sharma',
    role: 'Student at Jagran Lakecity Business School',
  },
  {
    id: 2,
    quote: 'Teaching at JLU has been incredibly rewarding. The university encourages innovative pedagogies and provides excellent research support.',
    name: 'Dr. Sarah Chen',
    role: 'Faculty of Management',
  },
  {
    id: 3,
    quote: 'The hands-on learning experience and industry exposure helped me secure my dream job even before graduation.',
    name: 'Priya Patel',
    role: 'Alumni, School of Engineering',
  },
  {
    id: 4,
    quote: 'JLU provided me with opportunities to present my research at international conferences, which shaped my academic career.',
    name: 'Dr. Rajesh Kumar',
    role: 'Faculty of Pharmacy',
  },
  {
    id: 5,
    quote: 'The collaborative environment and mentorship from faculty members made my doctoral journey truly enriching.',
    name: 'Ananya Singh',
    role: 'PhD Scholar, Faculty of Law',
  },
  {
    id: 6,
    quote: 'From cultural events to tech fests, JLU gave me a platform to explore my interests beyond academics.',
    name: 'Vikram Mehta',
    role: 'Student at School of Media',
  },
];

// Philosophy Modal Component
interface PhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PhilosophyCardData | null;
}

const PhilosophyModal = ({ isOpen, onClose, data }: PhilosophyModalProps) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Panel */}
            <motion.div
              className="relative bg-white w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Image */}
              <div className="relative h-[180px] md:h-[240px] overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#21313c] font-semibold text-sm">0{data.id}</span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-white text-2xl md:text-3xl font-semibold">
                    {data.modalContent.heading}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
                {/* Intro */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#666] text-base md:text-lg mb-8"
                  style={{ lineHeight: 1.7 }}
                >
                  {data.modalContent.intro}
                </motion.p>

                {/* Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {data.modalContent.points.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-[#f6f7f0] p-5 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-[#03463B] text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-[#21313c] font-semibold text-base mb-2">{point.title}</h4>
                          <p className="text-[#666] text-sm" style={{ lineHeight: 1.6 }}>{point.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Conclusion */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <p className="text-[#21313c] text-base md:text-lg font-medium" style={{ lineHeight: 1.7 }}>
                    {data.modalContent.conclusion}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Academics = () => {
  const [openFaculty, setOpenFaculty] = useState<number | null>(2);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedPhilosophy, setSelectedPhilosophy] = useState<PhilosophyCardData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const toggleFaculty = (id: number) => {
    setOpenFaculty(openFaculty === id ? null : id);
  };

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80"
              alt="Academics at JLU"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[700px] md:pr-0"
        >
          <h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-lg sm:text-xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            LEARNING SHAPED BY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>curiosity</span>, <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>practice</span>, and <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>people</span>
          </h2>
          <p
            className="text-white font-semibold leading-relaxed text-sm sm:text-base md:text-[clamp(1rem,1.8vw,1.4rem)]"
          >
            <span className="hidden md:inline">Academics at JLU are designed to help students build<br />
            clarity of thought, depth of understanding, and confidence<br />
            in application. Across faculties and schools, learning is guided<br />
            by conversation, experience, and exposure to the real world.</span>
            <span className="md:hidden">Academics at JLU are designed to help students build clarity of thought, depth of understanding, and confidence in application.</span>
          </p>
        </motion.div>

        {/* Paragraph at Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute right-0 bottom-[30%] sm:bottom-[32%] md:bottom-[35%] px-4 sm:px-6 md:px-0"
          style={{
            textAlign: 'right',
          }}
        >
          <p
            className="text-white font-semibold leading-relaxed text-xs sm:text-sm md:text-[clamp(1rem,1.6vw,1.3rem)]"
          >
            <span className="hidden md:inline">Students engage with ideas inside classrooms and test them beyond,<br />
            through studios, labs, fieldwork, industry interaction, and collaborative projects.<br />
            Education here is structured, but never rigid, focused, yet open to exploration.</span>
            <span className="md:hidden">Students engage with ideas inside classrooms<br />and test them beyond, through studios, labs,<br />fieldwork, and collaborative projects.</span>
          </p>
        </motion.div>

        {/* Large "Academics" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-0 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Academics
          </motion.h1>
        </div>
      </div>

      {/* Philosophy Section - Awwwards Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-20"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
              style={{ letterSpacing: '0.2em' }}
            >
              Our Foundation
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                maxWidth: '700px',
              }}
            >
              Philosophy that guides{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                every step
              </span>
            </h2>
          </motion.div>

          {/* Philosophy Cards - Desktop: 3 columns staggered, Mobile: 2+1 layout */}
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Row 1: Cards 1 & 2 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {philosophyCards.slice(0, 2).map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedPhilosophy(card)}
                  className="group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden mb-3 h-[180px] sm:h-[220px] rounded-lg">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    {/* Number Badge */}
                    <div
                      className="absolute top-3 left-3 w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center"
                      style={{ borderRadius: '50%' }}
                    >
                      <span className="text-[#21313c] font-semibold text-[9px] sm:text-[10px]">
                        0{card.id}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div>
                    <h3
                      className="text-[#21313c] mb-1 text-xs sm:text-sm"
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Row 2: Card 3 centered */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPhilosophy(philosophyCards[2])}
                className="group cursor-pointer w-[calc(50%-8px)]"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden mb-3 h-[180px] sm:h-[220px] rounded-lg">
                  <Image
                    src={philosophyCards[2].image}
                    alt={philosophyCards[2].title}
                    fill
                    className="object-cover"
                  />
                  {/* Number Badge */}
                  <div
                    className="absolute top-3 left-3 w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center"
                    style={{ borderRadius: '50%' }}
                  >
                    <span className="text-[#21313c] font-semibold text-[9px] sm:text-[10px]">
                      0{philosophyCards[2].id}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div>
                  <h3
                    className="text-[#21313c] mb-1 text-xs sm:text-sm"
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}
                  >
                    {philosophyCards[2].title}
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - 3 columns staggered */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {philosophyCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPhilosophy(card)}
                className={`group cursor-pointer ${index === 1 ? 'mt-[80px]' : index === 2 ? 'mt-[160px]' : ''}`}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden mb-8 h-[420px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  {/* Number Badge */}
                  <div
                    className="absolute top-6 left-6 w-12 h-12 bg-white flex items-center justify-center"
                    style={{ borderRadius: '50%' }}
                  >
                    <span className="text-[#21313c] font-semibold text-sm">
                      0{card.id}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div>
                  <h3
                    className="text-[#21313c] mb-4 group-hover:text-[#666] transition-colors text-2xl"
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#666] text-base"
                    style={{
                      lineHeight: 1.7,
                    }}
                  >
                    {card.description}
                  </p>
                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#21313c] text-sm font-medium">Explore</span>
                    <span className="text-[#21313c]">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculties Overview Section - Awwwards Style */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8 mb-10 md:mb-20"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Academic Structure
              </span>
              <h2
                className="text-white text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Faculties & Schools
              </h2>
            </div>
            <p
              className="text-[#999] text-sm md:text-base max-w-full md:max-w-[400px]"
              style={{
                lineHeight: 1.7,
              }}
            >
              Seven faculties, each housing specialized schools that shape focused paths of learning.
            </p>
          </motion.div>

          {/* Faculty Accordion */}
          <div>
            {facultiesData.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border-t border-[#3a4a55]"
                style={{
                  borderBottom: index === facultiesData.length - 1 ? '1px solid #3a4a55' : 'none',
                }}
              >
                <button
                  onClick={() => toggleFaculty(faculty.id)}
                  className="w-full py-5 md:py-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3 md:gap-8">
                    <span
                      className="text-[#666] font-medium text-xs md:text-sm min-w-[24px] md:min-w-[30px]"
                    >
                      {String(faculty.id).padStart(2, '0')}
                    </span>
                    <div>
                      <span
                        className="text-white font-medium group-hover:text-[#f0c14b] transition-colors block text-base sm:text-lg md:text-2xl"
                      >
                        {faculty.name}
                      </span>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: openFaculty === faculty.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-2xl md:text-3xl font-light ml-2"
                  >
                    +
                  </motion.span>
                </button>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaculty === faculty.id ? 'auto' : 0,
                    opacity: openFaculty === faculty.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="pb-6 md:pb-10 pl-7 md:pl-14 ml-0 md:ml-[30px]"
                  >
                    {/* Faculty Description */}
                    <p
                      className="text-[#999] mb-5 md:mb-8 text-sm md:text-base max-w-full md:max-w-[600px]"
                      style={{ lineHeight: 1.7 }}
                    >
                      {faculty.description}
                    </p>

                    {/* Schools List */}
                    {faculty.schools.length > 0 && (
                      <div className="flex flex-col gap-4 md:gap-6">
                        {faculty.schools.map((school, schoolIndex) => (
                          <motion.div
                            key={schoolIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: schoolIndex * 0.05 }}
                            className="group/school cursor-pointer"
                          >
                            <div className="flex items-start gap-3 md:gap-4">
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#f0c14b] rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
                              <div>
                                <span
                                  className="text-white group-hover/school:text-[#f0c14b] transition-colors block mb-1 text-sm md:text-lg font-medium"
                                >
                                  {school.name}
                                </span>
                                <span
                                  className="text-[#999] text-xs md:text-sm"
                                  style={{ lineHeight: 1.6 }}
                                >
                                  {school.description}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Teaching Methodology Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-20">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-full md:max-w-[580px]"
            >
              <h2
                className="text-[#21313c] mb-6 md:mb-12 text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                How learning takes shape
              </h2>

              <div className="space-y-4 md:space-y-6">
                <p className="text-[#21313c] text-base md:text-xl" style={{ lineHeight: 1.5 }}>
                  At JLU, teaching is not a one-way transfer of information.
                </p>
                <p className="text-[#21313c] text-base md:text-xl" style={{ lineHeight: 1.5 }}>
                  It is a shared process shaped by conversation, exploration, and experience.
                </p>
                <p className="text-[#21313c] text-base md:text-xl" style={{ lineHeight: 1.5 }}>
                  Classrooms open into studios, labs, field spaces, and real-world contexts. Faculty guide rather than dictate, encouraging students to question, interpret, and arrive at their own understanding.
                </p>
              </div>

              {/* Image below text */}
              <div className="relative w-full overflow-hidden mt-6 md:mt-10 h-[200px] sm:h-[240px] md:h-[280px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  alt="Students learning and collaborating at JLU"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Right Side - Learning Methods */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-full md:max-w-[500px] pt-0 md:pt-[60px]"
            >
              <p className="text-[#21313c] mb-5 md:mb-8 text-base md:text-xl font-medium" style={{ lineHeight: 1.5 }}>
                Learning happens through:
              </p>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                {learningMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 md:gap-4"
                  >
                    <span className="text-[#f0c14b] text-base md:text-xl">•</span>
                    <span className="text-[#21313c] text-sm md:text-lg" style={{ lineHeight: 1.4 }}>
                      {method}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-[#d1d1d1]">
                <p className="text-[#21313c] text-base md:text-xl font-medium" style={{ lineHeight: 1.5 }}>
                  The focus is simple.
                </p>
                <p className="text-[#21313c] text-base md:text-xl" style={{ lineHeight: 1.5 }}>
                  Help students develop clarity of thought, confidence in expression, and the ability to apply what they know.
                </p>
                <p className="text-[#21313c] text-base md:text-xl" style={{ lineHeight: 1.5 }}>
                  Education here adapts to the learner, not the other way around.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Student & Faculty Voices Section - Awwwards Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-6 mb-10 md:mb-20"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Perspectives
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Voices from{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  within
                </span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - (isMobile ? 1 : 2)))}
                disabled={currentTestimonial === 0}
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#21313c] flex items-center justify-center transition-colors ${
                  currentTestimonial === 0
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#21313c] hover:text-white text-[#21313c]'
                }`}
              >
                <span className="text-base md:text-xl">←</span>
              </button>
              <button
                onClick={() => setCurrentTestimonial(Math.min(testimonials.length - (isMobile ? 1 : 2), currentTestimonial + (isMobile ? 1 : 2)))}
                disabled={currentTestimonial >= testimonials.length - (isMobile ? 1 : 2)}
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#21313c] flex items-center justify-center transition-colors text-white ${
                  currentTestimonial >= testimonials.length - (isMobile ? 1 : 2)
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#333]'
                }`}
              >
                <span className="text-base md:text-xl">→</span>
              </button>
            </div>
          </motion.div>

          {/* Testimonials Slider */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-8"
              animate={{ x: isMobile ? `-${currentTestimonial * 100}%` : `-${currentTestimonial * 50}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="group shrink-0 w-full md:w-[calc(50%-16px)]"
                  style={{
                    marginTop: index % 2 === 1 && !isMobile ? '60px' : '0',
                  }}
                >
                  <div
                    className="relative p-6 sm:p-8 md:p-12 h-full transition-colors duration-500 min-h-[320px] md:min-h-[400px]"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f6f7f0' : '#21313c',
                    }}
                  >
                    {/* Large Quote Mark */}
                    <span
                      className={`absolute top-4 right-4 md:top-8 md:right-10 ${index % 2 === 0 ? 'text-[#e0e0d8]' : 'text-[#3a4a55]'}`}
                      style={{
                        fontSize: 'clamp(80px, 15vw, 160px)',
                        fontFamily: 'Georgia, serif',
                        lineHeight: 1,
                      }}
                    >
                      "
                    </span>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Quote */}
                      <p
                        className={`mb-6 md:mb-12 text-base md:text-[22px] ${index % 2 === 0 ? 'text-[#21313c]' : 'text-white'}`}
                        style={{
                          lineHeight: 1.6,
                          fontWeight: 400,
                          maxWidth: '90%',
                        }}
                      >
                        {testimonial.quote}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 md:gap-5">
                        {/* Avatar */}
                        <div
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0"
                          style={{
                            background: index % 2 === 0 ? 'linear-gradient(135deg, #ccc, #999)' : 'linear-gradient(135deg, #f0c14b, #e0b03b)',
                          }}
                        />
                        <div>
                          <p
                            className={`font-semibold mb-0.5 md:mb-1 text-sm md:text-lg ${index % 2 === 0 ? 'text-[#21313c]' : 'text-white'}`}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className={`text-xs md:text-sm ${index % 2 === 0 ? 'text-[#666]' : 'text-[#999]'}`}
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-8 md:mt-12">
              {isMobile ? (
                testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentTestimonial === idx ? 'bg-[#21313c]' : 'bg-[#ccc]'
                    }`}
                  />
                ))
              ) : (
                Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx * 2)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(currentTestimonial / 2) === idx ? 'bg-[#21313c]' : 'bg-[#ccc]'
                    }`}
                  />
                ))
              )}
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-[#e5e5e5] grid grid-cols-4 gap-2 md:gap-4"
          >
            {[
              { value: '200+', label: 'Faculty' },
              { value: '12:1', label: 'Student Ratio' },
              { value: '85%', label: 'PhD Qualified' },
              { value: '40+', label: 'Experts' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <span
                  className="text-[#21313c] block mb-1 md:mb-2 text-xl sm:text-2xl md:text-5xl"
                  style={{
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#666] uppercase tracking-wider text-[7px] sm:text-[9px] md:text-xs"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Philosophy Modal */}
      <PhilosophyModal
        isOpen={selectedPhilosophy !== null}
        onClose={() => setSelectedPhilosophy(null)}
        data={selectedPhilosophy}
      />
    </section>
  );
};

export { Academics };
export default Academics;
