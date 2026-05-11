'use client';

import { motion } from 'framer-motion';

export const CtaBanner = () => {
  return (
    <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20 2xl:px-16 2xl:pb-28">
      <div
        className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 2xl:px-28 2xl:py-20 rounded-xl md:rounded-3xl lg:rounded-4xl"
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
            ADMISSIONS OPEN 2026-27
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
            Your Future Starts{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              Here
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            Join 2,500+ students from 27 states and 8 countries at Central India&apos;s only QS Diamond-rated university.
            50+ programs, 45+ global partnerships, and 80%+ placement rate.
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
            className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
            <span>→</span>
          </motion.a>
          <motion.a
            href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/JLU-Brochure-2026.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center"
            whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
            whileTap={{ scale: 0.98 }}
          >
            Download Brochure
          </motion.a>
          <motion.a
            href="/Fee-Structure-2026-27.pdf"
            download="JLU-Fee-Structure-2026-27.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center"
            whileHover={{ scale: 1.05, borderColor: '#ffffff' }}
            whileTap={{ scale: 0.98 }}
          >
            Fee Structure 2026-27
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};
