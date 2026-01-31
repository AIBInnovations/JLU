'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const philosophyCards = [
  {
    id: 1,
    title: 'Values-driven learning',
    description: 'Education rooted in ethics, purpose, and responsible leadership.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    id: 2,
    title: 'Interdisciplinary structure',
    description: 'Programs designed to connect disciplines, ideas, and real-world application.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
  },
  {
    id: 3,
    title: 'Industry & research integration',
    description: 'Learning shaped by industry exposure, live projects, and active research.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
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

const Academics = () => {
  const [openFaculty, setOpenFaculty] = useState<number | null>(2);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
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
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
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
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '700px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5 whitespace-nowrap"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            LEARNING SHAPED BY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>curiosity</span>, <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>practice</span>, and <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>people</span>
          </h2>
          <p
            className="text-white font-semibold leading-relaxed whitespace-nowrap"
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
            }}
          >
            Academics at JLU are designed to help students build<br />
            clarity of thought, depth of understanding, and confidence<br />
            in application. Across faculties and schools, learning is guided<br />
            by conversation, experience, and exposure to the real world.
          </p>
        </motion.div>

        {/* Paragraph at Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute"
          style={{
            right: '40px',
            textAlign: 'right',
            bottom: '35%',
          }}
        >
          <p
            className="text-white font-semibold leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            }}
          >
            Students engage with ideas inside classrooms and test them beyond,<br />
            through studios, labs, fieldwork, industry interaction, and collaborative projects.<br />
            Education here is structured, but never rigid, focused, yet open to exploration.
          </p>
        </motion.div>

        {/* Large "Academics" Text - Bottom Left */}
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
              fontSize: 'clamp(8rem, 16vw, 16rem)',
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
              Our Foundation
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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

          {/* Philosophy Cards - Staggered Grid */}
          <div className="grid grid-cols-3 gap-8">
            {philosophyCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                style={{
                  marginTop: index === 1 ? '80px' : index === 2 ? '160px' : '0',
                }}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden mb-8"
                  style={{ height: '420px' }}
                >
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
                    <span className="text-[#21313c] font-semibold" style={{ fontSize: '14px' }}>
                      0{card.id}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div>
                  <h3
                    className="text-[#21313c] mb-4 group-hover:text-[#666] transition-colors"
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[#666]"
                    style={{
                      fontSize: '16px',
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
                Academic Structure
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
                Faculties & Schools
              </h2>
            </div>
            <p
              className="text-[#999]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
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
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-8">
                    <span
                      className="text-[#666] font-medium"
                      style={{ fontSize: '14px', minWidth: '30px' }}
                    >
                      {String(faculty.id).padStart(2, '0')}
                    </span>
                    <div>
                      <span
                        className="text-white font-medium group-hover:text-[#f0c14b] transition-colors block"
                        style={{ fontSize: '24px' }}
                      >
                        {faculty.name}
                      </span>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: openFaculty === faculty.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-3xl font-light"
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
                    className="pb-10 pl-14"
                    style={{ marginLeft: '30px' }}
                  >
                    {/* Faculty Description */}
                    <p
                      className="text-[#999] mb-8"
                      style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}
                    >
                      {faculty.description}
                    </p>

                    {/* Schools List */}
                    {faculty.schools.length > 0 && (
                      <div className="flex flex-col gap-6">
                        {faculty.schools.map((school, schoolIndex) => (
                          <motion.div
                            key={schoolIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: schoolIndex * 0.05 }}
                            className="group/school cursor-pointer"
                          >
                            <div className="flex items-start gap-4">
                              <span className="w-2 h-2 bg-[#f0c14b] rounded-full mt-2 flex-shrink-0" />
                              <div>
                                <span
                                  className="text-white group-hover/school:text-[#f0c14b] transition-colors block mb-1"
                                  style={{ fontSize: '18px', fontWeight: 500 }}
                                >
                                  {school.name}
                                </span>
                                <span
                                  className="text-[#999]"
                                  style={{ fontSize: '14px', lineHeight: 1.6 }}
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
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '140px',
            paddingRight: '120px',
            paddingBottom: '140px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex justify-between" style={{ gap: '80px' }}>
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ maxWidth: '580px' }}
            >
              <h2
                className="text-[#21313c] mb-12"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                How learning takes shape
              </h2>

              <div className="space-y-6">
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px' }}>
                  At JLU, teaching is not a one-way transfer of information.
                </p>
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px' }}>
                  It is a shared process shaped by conversation, exploration, and experience.
                </p>
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px' }}>
                  Classrooms open into studios, labs, field spaces, and real-world contexts. Faculty guide rather than dictate, encouraging students to question, interpret, and arrive at their own understanding.
                </p>
              </div>

              {/* Image below text */}
              <div className="relative w-full overflow-hidden mt-10" style={{ height: '280px' }}>
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
              style={{ maxWidth: '500px', paddingTop: '60px' }}
            >
              <p className="text-[#21313c] mb-8" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                Learning happens through:
              </p>

              <div className="space-y-4 mb-12">
                {learningMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[#f0c14b]" style={{ fontSize: '20px' }}>•</span>
                    <span className="text-[#21313c]" style={{ fontSize: '18px', lineHeight: '24px' }}>
                      {method}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-6 pt-8 border-t border-[#d1d1d1]">
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500 }}>
                  The focus is simple.
                </p>
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px' }}>
                  Help students develop clarity of thought, confidence in expression, and the ability to apply what they know.
                </p>
                <p className="text-[#21313c]" style={{ fontSize: '20px', lineHeight: '28px' }}>
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
                Perspectives
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
                Voices from{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  within
                </span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 2))}
                disabled={currentTestimonial === 0}
                className={`w-14 h-14 rounded-full border border-[#21313c] flex items-center justify-center transition-colors ${
                  currentTestimonial === 0
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#21313c] hover:text-white text-[#21313c]'
                }`}
              >
                <span style={{ fontSize: '20px' }}>←</span>
              </button>
              <button
                onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 2, currentTestimonial + 2))}
                disabled={currentTestimonial >= testimonials.length - 2}
                className={`w-14 h-14 rounded-full bg-[#21313c] flex items-center justify-center transition-colors text-white ${
                  currentTestimonial >= testimonials.length - 2
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#333]'
                }`}
              >
                <span style={{ fontSize: '20px' }}>→</span>
              </button>
            </div>
          </motion.div>

          {/* Testimonials Slider */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentTestimonial * 50}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="group flex-shrink-0"
                  style={{
                    width: 'calc(50% - 16px)',
                    marginTop: index % 2 === 1 ? '60px' : '0',
                  }}
                >
                  <div
                    className="relative p-12 h-full transition-colors duration-500"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f6f7f0' : '#21313c',
                      minHeight: '400px',
                    }}
                  >
                    {/* Large Quote Mark */}
                    <span
                      className={`absolute top-8 right-10 ${index % 2 === 0 ? 'text-[#e0e0d8]' : 'text-[#3a4a55]'}`}
                      style={{
                        fontSize: '160px',
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
                        className={`mb-12 ${index % 2 === 0 ? 'text-[#21313c]' : 'text-white'}`}
                        style={{
                          fontSize: '22px',
                          lineHeight: 1.6,
                          fontWeight: 400,
                          maxWidth: '90%',
                        }}
                      >
                        {testimonial.quote}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-5">
                        {/* Avatar */}
                        <div
                          className="w-16 h-16 rounded-full overflow-hidden"
                          style={{
                            background: index % 2 === 0 ? 'linear-gradient(135deg, #ccc, #999)' : 'linear-gradient(135deg, #f0c14b, #e0b03b)',
                          }}
                        />
                        <div>
                          <p
                            className={`font-semibold mb-1 ${index % 2 === 0 ? 'text-[#21313c]' : 'text-white'}`}
                            style={{ fontSize: '18px' }}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className={`${index % 2 === 0 ? 'text-[#666]' : 'text-[#999]'}`}
                            style={{ fontSize: '14px' }}
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
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx * 2)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentTestimonial / 2) === idx ? 'bg-[#21313c]' : 'bg-[#ccc]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 pt-16 border-t border-[#e5e5e5] flex justify-between"
          >
            {[
              { value: '200+', label: 'Faculty Members' },
              { value: '12:1', label: 'Student Faculty Ratio' },
              { value: '85%', label: 'PhD Qualified' },
              { value: '40+', label: 'Industry Experts' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <span
                  className="text-[#21313c] block mb-2"
                  style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#666] uppercase tracking-wider"
                  style={{ fontSize: '12px', letterSpacing: '0.1em' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Academics };
export default Academics;
