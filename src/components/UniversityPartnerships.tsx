'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UniversityPartnerships = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* University Partnerships Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Global Network
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              University{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Partnerships
              </span>
            </h1>
            <p
              className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] mb-8"
              style={{ lineHeight: 1.7, fontWeight: 400 }}
            >
              Global partnerships form an integral part of JLU's academic ecosystem. Collaborations with universities and institutions across the world bring international learning environments, diverse perspectives and shared academic practices into the classroom.
            </p>

            {/* Explore Partnerships Button */}
            <Link
              href="/university-partnerships"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#027ea1] text-white font-semibold text-sm hover:bg-[#025f7a] transition-all duration-300"
            >
              Explore Partnerships
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden"
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/glob.webp"
              alt="University Partnerships - Global Network"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { UniversityPartnerships };
export default UniversityPartnerships;
