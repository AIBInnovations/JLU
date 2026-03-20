'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/components';

export default function PodcastPage() {
  return (
    <>
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#f6f7f0' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #21313c 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto flex items-center justify-center"
              style={{ background: '#027ea1' }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="md:w-16 md:h-16">
                <path
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#999] uppercase tracking-widest block text-xs md:text-sm mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            Podcast
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#21313c] mb-4"
            style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Lakecity{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              Voice
            </span>
          </motion.h1>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <span
              className="inline-block px-6 py-2 rounded-full text-white font-semibold text-sm md:text-base tracking-wide"
              style={{ background: '#027ea1' }}
            >
              Coming Soon
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          >
            Stay tuned for inspiring conversations, thought-provoking discussions, and stories from the JLU community. Lakecity Voice is coming to you soon.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-0.5 mx-auto"
            style={{ background: '#027ea1', transformOrigin: 'center' }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
