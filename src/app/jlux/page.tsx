'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Footer } from '@/components';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tracks = [
  {
    title: 'Public Policy & Governance',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
    items: ['Model United Nations', 'Debate & Public Speaking', 'Policy Drafting Workshops', 'Governance Simulations'],
    color: '#4a90a4',
  },
  {
    title: 'Innovation & Technology',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    items: ['Design Thinking Bootcamps', 'Rapid Prototyping Labs', 'Hackathon Challenges', 'AI & Emerging Tech Exposure'],
    color: '#e67e22',
  },
  {
    title: 'Social Impact',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    items: ['Community Service Projects', 'Sustainability Challenges', 'NGO Collaboration Programs', 'Social Entrepreneurship Labs'],
    color: '#27ae60',
  },
  {
    title: 'Business & Entrepreneurship',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    items: ['Startup Simulations', 'Branding & Marketing Workshops', 'Market Analysis Projects', 'Pitch Competitions'],
    color: '#8e44ad',
  },
];

const programStructure = [
  {
    number: '01',
    title: 'Weekend Immersions',
    description: 'Intensive weekend sessions on JLU campus featuring workshops, simulations, and hands-on learning experiences with university faculty.',
  },
  {
    number: '02',
    title: 'Semester Milestones',
    description: 'Structured semester-long engagement with clear milestones, progress tracking, and personalized feedback from mentors.',
  },
  {
    number: '03',
    title: 'Mentoring Circles',
    description: 'Small-group mentoring sessions with JLU faculty, alumni leaders, and industry professionals for guided development.',
  },
  {
    number: '04',
    title: 'Capstone Project',
    description: 'Present your leadership project to a panel of industry experts, demonstrating the skills and knowledge gained throughout the program.',
  },
];

const benefits = [
  {
    title: 'Admissions Advantage',
    description: 'Certificate of completion recognized during JLU admissions process, giving you a head start in your university journey.',
  },
  {
    title: 'Scholarship Access',
    description: 'Top-performing JLUx graduates receive scholarship consideration for undergraduate programs at JLU.',
  },
  {
    title: 'Priority Access',
    description: 'Get priority access to JLU entrance tests and personal interviews, streamlining your path to admission.',
  },
  {
    title: 'Alumni Network',
    description: 'Lifetime membership in the JLUx Alumni Network — connecting you with peers, mentors, and opportunities.',
  },
];

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Schools Connected' },
  { value: '4', label: 'Leadership Tracks' },
  { value: '100%', label: 'Campus Experience' },
];

export default function JLUxPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#f6f7f0] min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-screen overflow-hidden">
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <img
              src="/about-us.jpg"
              alt="JLUx Young Leadership Program"
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/40" style={{ opacity }} />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="px-4 pt-28 sm:pt-32 sm:px-6 md:pl-10 md:pt-[120px]"
          >
            <span className="inline-block bg-[#f4c950] text-[#21313c] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              For Classes 11 & 12
            </span>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white font-semibold leading-tight mt-4 text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)] max-w-[700px]"
            >
              JLU&apos;s signature early-leadership initiative designed to give young minds a head start in developing critical thinking, public speaking, and leadership capabilities.
            </motion.h2>
          </motion.div>

          {/* Large Title */}
          <div className="pl-3 sm:pl-6 md:pl-10 pb-0">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
              className="font-bold select-none text-[4rem] sm:text-[6rem] md:text-[clamp(7rem,14vw,14rem)] leading-[0.85] tracking-[-0.02em]"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              JLUx
            </motion.h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <span className="text-[#999] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
                Young Leadership Program
              </span>
              <h2 className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Shape Tomorrow&apos;s{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#4a90a4' }}>
                  Leaders
                </span>{' '}
                Today
              </h2>
              <p className="text-[#666] text-base md:text-lg leading-relaxed mb-6">
                JLUx is Jagran Lakecity University&apos;s signature early-leadership initiative designed for students in classes 11 and 12. It offers young minds a head start in developing critical thinking, public speaking, and leadership capabilities through immersive campus experiences.
              </p>
              <p className="text-[#666] text-base md:text-lg leading-relaxed">
                Through a blend of workshops, simulations, mentoring circles, and real-world projects, JLUx participants develop the confidence and competencies to become changemakers — long before they enter university.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="/student-clubs.jpg"
                  alt="JLUx Students"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-sm font-medium">
                    &ldquo;JLUx transformed the way I think about leadership. It prepared me for challenges I didn&apos;t even know existed.&rdquo;
                  </p>
                  <p className="text-[#f4c950] text-xs mt-2 font-semibold">— JLUx Graduate, Batch 2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#21313c] py-12 md:py-16 px-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-[#f4c950] text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <span className="text-[#999] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
              How It Works
            </span>
            <h2 className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Program{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Structure
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {programStructure.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="group relative bg-[#f6f7f0] rounded-2xl p-8 md:p-10 hover:bg-[#21313c] transition-colors duration-500"
              >
                <span className="text-[#f4c950] text-5xl md:text-6xl font-bold opacity-30 group-hover:opacity-50 transition-opacity absolute top-6 right-8">
                  {step.number}
                </span>
                <h3 className="text-[#21313c] group-hover:text-white text-xl md:text-2xl font-bold mb-3 transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-[#666] group-hover:text-white/70 text-sm md:text-base leading-relaxed transition-colors duration-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Tracks */}
      <section className="bg-[#f6f7f0] py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:justify-between md:items-end pb-8 border-b border-[#e5e5e5]"
          >
            <div className="mb-6 md:mb-0">
              <span className="text-[#999] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
                Choose Your Path
              </span>
              <h2 className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Leadership{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                  Tracks
                </span>
              </h2>
            </div>
            <p className="text-[#666] text-sm md:text-base max-w-[400px] leading-relaxed">
              Select a track that aligns with your passion and career aspirations. Each track offers specialized workshops, projects, and mentorship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 md:p-10 group hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${track.color}15`, color: track.color }}
                >
                  {track.icon}
                </div>
                <h3 className="text-[#21313c] text-lg md:text-xl font-bold mb-4">{track.title}</h3>
                <ul className="space-y-3">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#666] text-sm leading-relaxed">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: track.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship & Exposure - Full Width Image Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/admissions.jpg"
            alt="JLUx Mentorship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#21313c]/85" />
        </div>
        <div className="relative mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-[#f4c950] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
              Learn From The Best
            </span>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-[600px]">
              Mentorship &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f4c950' }}>
                Exposure
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: 'Faculty & Alumni Mentors', desc: 'One-on-one mentorship from JLU faculty and accomplished alumni leaders who guide your growth.' },
              { title: 'Industry Interaction', desc: 'Interact with CEOs, policymakers, and thought leaders through exclusive sessions and fireside chats.' },
              { title: 'Campus Immersion', desc: 'Experience JLU firsthand — labs, libraries, sports facilities, and cultural events on a vibrant campus.' },
              { title: 'National Competitions', desc: 'Participate in national-level inter-school competitions hosted by JLU, building confidence and networks.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
              >
                <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Recognition */}
      <section className="bg-white py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-[#999] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
              Why Join JLUx
            </span>
            <h2 className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Benefits &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Recognition
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="text-center p-6 md:p-8 rounded-2xl bg-[#f6f7f0] hover:bg-[#21313c] group transition-colors duration-500"
              >
                <h3 className="text-[#21313c] group-hover:text-white text-lg font-bold mb-3 transition-colors duration-500">
                  {benefit.title}
                </h3>
                <p className="text-[#666] group-hover:text-white/70 text-sm leading-relaxed transition-colors duration-500">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="bg-[#f6f7f0] py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: customEase }}
              viewport={{ once: true }}
            >
              <span className="text-[#999] uppercase tracking-widest text-[10px] sm:text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
                Who Can Apply
              </span>
              <h2 className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Eligibility{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                  Criteria
                </span>
              </h2>
              <div className="space-y-4">
                {[
                  'Students currently enrolled in Class 11 or Class 12',
                  'From any recognized school board (CBSE, ICSE, State Board, IB)',
                  'Demonstrated interest in leadership, community service, or innovation',
                  'Minimum 60% aggregate in the previous academic year',
                  'Recommendation letter from school principal or teacher (optional)',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: customEase }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#4a90a4] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="text-[#444] text-sm md:text-base leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: customEase }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src="/hero.jpg"
                alt="JLUx Campus Experience"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-16 bg-[#21313c] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#f4c950] blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4a90a4] blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-[800px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-[#f4c950]/20 text-[#f4c950] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
              Applications Open
            </span>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Ready to Lead{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f4c950' }}>
                Before
              </span>{' '}
              University?
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-[600px] mx-auto">
              Join the next cohort of JLUx and discover your leadership potential. Limited seats available for the upcoming session.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/apply"
                className="bg-[#f4c950] text-[#21313c] font-semibold py-4 px-10 rounded-xl hover:bg-[#e5ba41] transition-all shadow-lg hover:shadow-xl text-base"
              >
                Apply Now
              </a>
              <a
                href="/admissions"
                className="border-2 border-white/30 text-white font-semibold py-4 px-10 rounded-xl hover:bg-white/10 transition-all text-base"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
