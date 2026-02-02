'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const JluStaff = () => {
  return (
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
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12"
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Our People
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              JLU{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Staff
              </span>
            </h2>
          </div>
          <p
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            Behind every classroom, event and initiative is a dedicated team that supports the university's everyday functioning.
          </p>
        </motion.div>

        {/* Staff Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="group relative w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-xl overflow-hidden cursor-pointer"
        >
          <Image
            src="/staff.jpg"
            alt="JLU Staff"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
            <p
              className="text-white/90 text-xs sm:text-sm md:text-[15px] max-w-[600px]"
              style={{ lineHeight: 1.7 }}
            >
              JLU's staff form the backbone of the institution, contributing with commitment, care and professionalism.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { JluStaff };
export default JluStaff;
