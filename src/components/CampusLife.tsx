'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const studentLifeItems = [
  {
    id: 1,
    title: 'Find your people',
    description: 'Creative, technical, cultural, and sports clubs that help you build friendships and discover your strengths.',
    link: 'Explore clubs',
  },
  {
    id: 2,
    title: 'Lead. Represent. Inspire.',
    description: 'The student council gives you a voice in shaping campus culture and decision-making.',
    link: 'Meet the council',
  },
  {
    id: 3,
    title: 'Celebrating student success',
    description: 'From national competitions to startup wins — our students create impact beyond campus.',
    link: 'View Achievements',
  },
];

const careersItems = [
  {
    id: 1,
    title: 'Where careers begin',
    description: 'Strong industry connections that translate learning into internships, placements, and real-world exposure.',
    link: 'Explore corporate relations',
  },
  {
    id: 2,
    title: 'Where ideas become startups',
    description: 'IgnitoX supports student entrepreneurs with mentorship, funding access, and incubation support.',
    link: 'Discover IgnitoX',
  },
  {
    id: 3,
    title: 'Conversations that shape thinking',
    description: 'A platform for leaders, innovators, and thinkers to inspire the next generation.',
    link: 'View lecture series',
  },
];

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

const CampusLife = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Community section scroll animations
  const communityRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: communityProgress } = useScroll({
    target: communityRef,
    offset: ['start end', 'start start'],
  });
  const communityScale = useTransform(communityProgress, [0, 0.5, 1], [1.6, 1.15, 1]);
  const communityContentOpacity = useTransform(communityProgress, [0.6, 0.9], [0, 1]);
  const communityContentY = useTransform(communityProgress, [0.6, 0.9], [60, 0]);

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
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80"
              alt="Campus Life"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            Life, <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Between</span> Everything
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white leading-relaxed"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 400,
            }}
          >
            Campus life at JLU lives in the in-between.<br />
            Between classes and conversations.<br />
            Between ideas and friendships.<br />
            Between who you were and who you are becoming.
          </motion.p>
        </motion.div>

        {/* Large "Campus Life" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
            paddingBottom: '0px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
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
            Campus Life
          </motion.h1>
        </div>
      </div>

      {/* Student Life & Careers Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '180px',
            paddingRight: '120px',
            paddingBottom: '180px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex" style={{ gap: '80px' }}>
            {/* Section 01 - Student Life (positioned up) */}
            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[#999] uppercase tracking-widest"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  marginBottom: '16px',
                }}
              >
                Section 01
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                viewport={{ once: true }}
                className="text-[#21313c]"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '64px',
                }}
              >
                Student{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  life
                </span>
              </motion.h2>

              <motion.div
                className="flex flex-col"
                style={{ gap: '56px' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {studentLifeItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="group"
                  >
                    <motion.h3
                      className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors duration-300"
                      style={{
                        fontWeight: 600,
                        fontSize: '28px',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        marginBottom: '20px',
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <p
                      className="text-[#666]"
                      style={{
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: 1.7,
                        marginBottom: '20px',
                      }}
                    >
                      {item.description}
                    </p>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] font-medium"
                      style={{ fontSize: '15px' }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.link}
                      <motion.span
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Image below Section 01 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                viewport={{ once: true }}
                className="relative overflow-hidden group cursor-pointer"
                style={{ width: '100%', height: '320px', marginTop: '56px' }}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80"
                    alt="Student Life"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-white/60 uppercase tracking-wider block mb-2" style={{ fontSize: '11px' }}>
                    Campus Moments
                  </span>
                  <h4 className="text-white font-semibold" style={{ fontSize: '20px' }}>
                    Where memories are made
                  </h4>
                </div>
              </motion.div>
            </motion.div>

            {/* Vertical Divider Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: customEase }}
              viewport={{ once: true }}
              style={{
                width: '1px',
                backgroundColor: '#e5e5e5',
                alignSelf: 'stretch',
                transformOrigin: 'top',
              }}
            />

            {/* Section 02 - Careers, Innovation & Experiences (positioned down) */}
            <motion.div
              style={{ flex: 1, marginTop: '2px' }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              {/* Image on top of Section 02 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: customEase }}
                viewport={{ once: true }}
                className="relative overflow-hidden group cursor-pointer"
                style={{ width: '100%', height: '320px', marginBottom: '56px' }}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                    alt="Careers & Innovation"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-white/60 uppercase tracking-wider block mb-2" style={{ fontSize: '11px' }}>
                    Industry Connect
                  </span>
                  <h4 className="text-white font-semibold" style={{ fontSize: '20px' }}>
                    Building future leaders
                  </h4>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#999] uppercase tracking-widest"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  marginBottom: '16px',
                }}
              >
                Section 02
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                viewport={{ once: true }}
                className="text-[#21313c]"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '64px',
                }}
              >
                Careers, innovation &{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  experiences
                </span>
              </motion.h2>

              <motion.div
                className="flex flex-col"
                style={{ gap: '56px' }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {careersItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="group"
                  >
                    <motion.h3
                      className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors duration-300"
                      style={{
                        fontWeight: 600,
                        fontSize: '28px',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        marginBottom: '20px',
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <p
                      className="text-[#666]"
                      style={{
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: 1.7,
                        marginBottom: '20px',
                      }}
                    >
                      {item.description}
                    </p>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] font-medium"
                      style={{ fontSize: '15px' }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.link}
                      <motion.span
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      >
                        →
                      </motion.span>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Community Section - Full Width with Scroll Zoom */}
      <div className="w-full bg-white" style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div
          ref={communityRef}
          className="relative overflow-hidden mx-auto"
          style={{ height: '90vh', maxWidth: '1400px', borderRadius: '32px' }}
        >
          {/* Full Width Zooming Image */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: communityScale }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
              alt="Campus Community"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Dark Overlay for Text Readability */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            style={{ opacity: communityContentOpacity }}
          />

          {/* Content Overlay - Centered */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: communityContentOpacity,
              y: communityContentY,
            }}
          >
            <div className="text-center" style={{ maxWidth: '800px', padding: '40px' }}>
              <motion.span
                className="text-white/70 uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.3em' }}
              >
                Community
              </motion.span>
              <motion.h2
                className="text-white"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '24px',
                }}
              >
                More than a campus —{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  it's a community
                </span>
              </motion.h2>
              <motion.p
                className="text-white/80"
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                }}
              >
                Every event, club, and initiative is designed to help students grow not just academically, but personally and professionally.
              </motion.p>
              <motion.button
                className="inline-flex items-center gap-3 bg-white text-[#21313c] font-medium"
                style={{
                  paddingTop: '18px',
                  paddingRight: '40px',
                  paddingBottom: '18px',
                  paddingLeft: '40px',
                  fontSize: '16px',
                  borderRadius: '100px',
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#f0c14b' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                Join our community
                <span>→</span>
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
