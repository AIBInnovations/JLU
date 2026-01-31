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

const CampusLife = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

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
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80"
              alt="Campus Life"
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
            LIFE, <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Between</span> EVERYTHING
          </h2>
          <p
            className="text-white font-semibold leading-relaxed"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            }}
          >
            Campus life at JLU lives in the in-between.<br />
            Between classes and conversations.<br />
            Between ideas and friendships.<br />
            Between who you were and who you are becoming.
          </p>
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
            minHeight: '1285px',
            paddingTop: '180px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="flex" style={{ gap: '40px' }}>
            {/* Section 01 - Student Life */}
            <div style={{ flex: 1 }}>
              <p
                className="text-[#21313c]"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Section 01
              </p>
              <h2
                className="text-[#21313c]"
                style={{
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: '100%',
                  marginBottom: '64px',
                }}
              >
                Student life
              </h2>

              <div className="flex flex-col" style={{ gap: '56px' }}>
                {studentLifeItems.map((item) => (
                  <div key={item.id}>
                    <h3
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 500,
                        fontSize: '32px',
                        lineHeight: '100%',
                        marginBottom: '24px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '34px',
                        marginBottom: '24px',
                      }}
                    >
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] hover:underline"
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {item.link}
                      <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div
              style={{
                width: '1px',
                backgroundColor: '#d9d9d9',
                alignSelf: 'stretch',
              }}
            />

            {/* Section 02 - Careers, Innovation & Experiences */}
            <div style={{ flex: 1 }}>
              <p
                className="text-[#21313c]"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}
              >
                Section 02
              </p>
              <h2
                className="text-[#21313c]"
                style={{
                  fontWeight: 700,
                  fontSize: '48px',
                  lineHeight: '100%',
                  marginBottom: '64px',
                }}
              >
                Careers, innovation &<br />experiences
              </h2>

              <div className="flex flex-col" style={{ gap: '56px' }}>
                {careersItems.map((item) => (
                  <div key={item.id}>
                    <h3
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 500,
                        fontSize: '32px',
                        lineHeight: '100%',
                        marginBottom: '24px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 400,
                        fontSize: '24px',
                        lineHeight: '34px',
                        marginBottom: '24px',
                      }}
                    >
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#21313c] hover:underline"
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {item.link}
                      <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto flex items-center"
          style={{
            maxWidth: '1440px',
            height: '740px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
            gap: '64px',
          }}
        >
          {/* Image */}
          <div
            className="relative shrink-0 overflow-hidden rounded-lg"
            style={{ width: '580px', height: '580px' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
              alt="Campus Community"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div style={{ maxWidth: '436px' }}>
            <h2
              className="text-[#21313c]"
              style={{
                fontWeight: 700,
                fontSize: '40px',
                lineHeight: '48px',
                marginBottom: '24px',
              }}
            >
              More than a campus — it's a community
            </h2>
            <p
              className="text-[#6b7280]"
              style={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '30px',
                marginBottom: '32px',
              }}
            >
              Every event, club, and initiative is designed to help students grow not just academically, but personally and professionally.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-white border border-[#d9d9d9] rounded-full text-[#21313c] hover:bg-gray-50 transition-colors"
              style={{
                paddingTop: '16px',
                paddingRight: '32px',
                paddingBottom: '16px',
                paddingLeft: '32px',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              Join our community
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CampusLife };
export default CampusLife;
