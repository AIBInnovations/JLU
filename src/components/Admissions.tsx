'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const academicPaths = [
  {
    id: 1,
    title: 'Undergraduate Programs',
    description: 'Build strong foundations for your future with industry-aligned curriculum.',
  },
  {
    id: 2,
    title: 'Postgraduate Programs',
    description: 'Advance your expertise and take the lead in your chosen field.',
  },
  {
    id: 3,
    title: 'Research Degrees',
    description: 'Create knowledge that shapes tomorrow through cutting-edge research.',
  },
];

const beyondDegrees = [
  {
    id: 1,
    title: 'Centre for Professional Skills',
    description: 'Industry-ready learning beyond classrooms.',
  },
  {
    id: 2,
    title: 'JLUx – Young Leadership Program',
    description: 'Early leadership exposure for future changemakers.',
  },
];

const financialOptions = [
  {
    id: 1,
    title: 'Scholarships',
    description: 'Merit and need-based financial aid.',
  },
  {
    id: 2,
    title: 'Chancellor Freeships',
    description: 'Special support for deserving students.',
  },
  {
    id: 3,
    title: 'Education Loans',
    description: 'Partnered banks and easy documentation.',
  },
  {
    id: 4,
    title: 'Refund Policy',
    description: 'Transparent and student-friendly.',
  },
];

const faqData = [
  {
    id: 1,
    question: 'Who can apply?',
    answer: 'Eligibility varies by program. Generally, undergraduate applicants need high school completion, while postgraduate applicants need a relevant bachelor\'s degree.',
  },
  {
    id: 2,
    question: 'What is the application deadline?',
    answer: 'Application deadlines vary by program and intake. Please check the specific program page for exact dates or contact our admissions office.',
  },
  {
    id: 3,
    question: 'Are scholarships available?',
    answer: 'Yes, JLU offers various scholarships based on merit, need, and special categories. Visit our scholarships page for detailed information.',
  },
  {
    id: 4,
    question: 'Is hostel accommodation guaranteed?',
    answer: 'Hostel accommodation is available on a first-come, first-served basis. We recommend applying early to secure your spot.',
  },
];

// Custom easing
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
              alt="Admissions"
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
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            YOUR <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>journey</span> STARTS HERE
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Admissions at Jagran Lakecity University are designed to help you choose the right path — with clarity, confidence, and support at every step.
          </p>
        </motion.div>

        {/* Large "Admissions" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingBottom: '0px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(6rem, 14vw, 14rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admissions
          </motion.h1>
        </div>
      </div>

      {/* Academic Programs - Full Width Scattered Gallery Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto relative"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Academic Programs
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Choose your{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                academic path
              </span>
            </h2>
          </motion.div>

          {/* Three Cards with Floating Images */}
          <div className="grid grid-cols-3 gap-8">
            {academicPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                style={{ marginTop: index === 1 ? '60px' : index === 2 ? '30px' : '0' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden mb-8" style={{ height: '380px' }}>
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={
                        index === 0
                          ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                          : index === 1
                          ? "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80"
                          : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
                      }
                      alt={path.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Number overlay */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: '72px', lineHeight: 1, opacity: 0.3 }}
                    >
                      {String(path.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-[#21313c] font-semibold mb-3 group-hover:text-[#f0c14b] transition-colors"
                  style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
                >
                  {path.title}
                </h3>
                <p className="text-[#666] mb-4" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  {path.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[#21313c] font-medium text-sm">
                  Explore Programs
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Beyond Degrees - Horizontal Split Layout */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Special Programs
            </span>
            <h2
              className="text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Beyond{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                degrees
              </span>
            </h2>
          </motion.div>

          {/* Horizontal Cards - Full Width Alternating */}
          <div className="flex flex-col" style={{ gap: '2px' }}>
            {beyondDegrees.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex group cursor-pointer ${index === 1 ? 'flex-row-reverse' : ''}`}
                style={{ height: '400px' }}
              >
                {/* Image Half */}
                <div className="relative w-1/2 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={index === 0
                        ? "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                        : "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Content Half */}
                <div className="w-1/2 bg-[#2a3f4c] flex flex-col justify-center p-16">
                  <span
                    className="text-[#f0c14b] font-medium mb-4"
                    style={{ fontSize: '14px' }}
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-white font-semibold mb-4"
                    style={{ fontSize: '32px', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#999] mb-8" style={{ fontSize: '16px', lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white font-medium text-sm">
                    Learn More
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Life Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Experience
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Experience the{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Campus
                </span>
              </h2>
            </div>
            <p
              className="text-[#666]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
              }}
            >
              Step inside the campus. Get a sense of what it's like to belong.
            </p>
          </motion.div>

          {/* Main Content - Image Left, Content Right */}
          <div className="flex" style={{ gap: '80px' }}>
            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden group cursor-pointer"
              style={{ width: '580px', height: '580px' }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                  alt="Campus Visit"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-white/60 uppercase tracking-wider block mb-2" style={{ fontSize: '11px' }}>
                  Virtual Tour Available
                </span>
                <h3 className="text-white font-semibold" style={{ fontSize: '24px' }}>
                  Experience JLU Before You Decide
                </h3>
              </div>
            </motion.div>

            {/* Right Side - Content + Two Small Images */}
            <div className="flex flex-col justify-between flex-1">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-[#21313c] mb-6"
                  style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  More than academics,<br />
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    a complete experience
                  </span>
                </h3>
                <p
                  className="text-[#666] mb-8"
                  style={{ fontSize: '16px', lineHeight: 1.8 }}
                >
                  Our advisors are ready to welcome you. Book a campus visit and explore what makes JLU special.
                </p>
                <motion.button
                  className="px-8 py-4 bg-[#21313c] text-white font-medium flex items-center gap-3"
                  style={{ borderRadius: '100px' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Campus Visit
                  <span>→</span>
                </motion.button>
              </motion.div>

              {/* Two Small Images */}
              <div className="flex gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group cursor-pointer flex-1"
                  style={{ height: '200px' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                      alt="Student Life"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-semibold" style={{ fontSize: '16px' }}>
                      Student Clubs
                    </h4>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group cursor-pointer flex-1"
                  style={{ height: '200px' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
                      alt="Hostel"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-semibold" style={{ fontSize: '16px' }}>
                      Accommodation
                    </h4>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Support - Vertical Accordion Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-20"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Financial Support
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Making education{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  accessible
                </span>
              </h2>
            </div>
            <p
              className="text-[#666]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
              }}
            >
              Transparent pathways to funding your future.
            </p>
          </motion.div>

          {/* Four Cards in Row */}
          <div className="grid grid-cols-4 gap-6">
            {financialOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer bg-[#f6f7f0] p-8 hover:bg-[#21313c] transition-colors duration-300"
                style={{ minHeight: '280px' }}
              >
                <span
                  className="text-[#f0c14b] font-bold block mb-6"
                  style={{ fontSize: '48px', lineHeight: 1 }}
                >
                  {String(option.id).padStart(2, '0')}
                </span>
                <h4
                  className="text-[#21313c] group-hover:text-white font-semibold mb-3 transition-colors"
                  style={{ fontSize: '22px', letterSpacing: '-0.02em' }}
                >
                  {option.title}
                </h4>
                <p
                  className="text-[#666] group-hover:text-[#999] transition-colors"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  {option.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission FAQs Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Questions & Answers
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Admission{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                FAQs
              </span>
            </h2>
          </motion.div>

          <div
            className="flex flex-col mx-auto"
            style={{ maxWidth: '1000px', gap: '0' }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="border-b border-[#d1d1d1]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  className="w-full cursor-pointer py-8 text-left group"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-6">
                      <span
                        className={`font-medium transition-colors ${
                          openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#ccc]'
                        }`}
                        style={{ fontSize: '14px', minWidth: '30px' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-semibold transition-colors ${
                          openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#21313c]'
                        }`}
                        style={{
                          fontSize: '22px',
                          lineHeight: '1.3',
                        }}
                      >
                        {faq.question}
                      </span>
                    </span>
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-4 transition-colors ${
                        openFaq === faq.id ? 'bg-[#f0c14b]' : 'bg-[#21313c]'
                      }`}
                      animate={{
                        rotate: openFaq === faq.id ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1V13M1 7H13"
                          stroke={openFaq === faq.id ? '#21313c' : 'white'}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: customEase }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-[#666] pt-6 pl-12 leading-relaxed"
                          style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full" style={{ paddingLeft: '40px', paddingRight: '40px', paddingBottom: '80px' }}>
        <div
          className="mx-auto flex flex-col items-center justify-center bg-[#f0c14b]"
          style={{
            maxWidth: '1400px',
            paddingTop: '120px',
            paddingRight: '120px',
            paddingBottom: '120px',
            paddingLeft: '120px',
            borderRadius: '32px',
          }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#21313c]/60 uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Start Your Journey
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Your future deserves<br />
              <span
                className="text-[#21313c]"
                style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}
              >
                the right start.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="px-10 py-4 bg-[#21313c] text-white font-semibold flex items-center gap-3"
              style={{ borderRadius: '100px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <span>→</span>
            </motion.button>
            <motion.button
              className="px-10 py-4 bg-transparent border border-[#21313c]/50 text-[#21313c] font-medium"
              style={{ borderRadius: '100px' }}
              whileHover={{ scale: 1.05, borderColor: '#21313c' }}
              whileTap={{ scale: 0.98 }}
            >
              Talk to an Admissions Advisor
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Admissions };
export default Admissions;
