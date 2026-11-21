'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const nextSteps = [
  {
    title: 'Application Review',
    description: 'Our admissions team will review your application within 24–48 hours.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Counsellor Call',
    description: 'A dedicated admissions counsellor will reach out to discuss your program and next steps.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Campus Visit',
    description: 'Schedule a campus visit or take a virtual 360° tour to experience JLU first-hand.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'application_submitted', form: 'apply' });
  }, []);

  return (
    <div className="bg-[#f6f7f0]">
      {/* CONFIRMATION CARD (no hero) */}
      <section className="bg-white">
        <div
          className="mx-auto px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 md:px-[120px] md:pt-36 md:pb-[100px]"
          style={{ maxWidth: '1440px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            className="mx-auto max-w-[820px] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
              className="w-20 h-20 md:w-24 md:h-24 bg-[#027ea1] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <span
              className="text-[#999] uppercase tracking-widest block mb-3 md:mb-4 text-xs md:text-sm font-bold"
              style={{ letterSpacing: '0.2em' }}
            >
              You&apos;re All Set
            </span>

            <h1
              className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-6"
              style={{ fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Thank you for your{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                application
              </span>
            </h1>

            <p className="text-[#555] text-base md:text-lg mb-8 md:mb-10" style={{ lineHeight: 1.75 }}>
              We&apos;ve received your details. A counsellor from our admissions office will get in touch with you within 24–48 hours to guide you through the next steps.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/programs"
                className="px-7 md:px-9 py-3 md:py-4 bg-[#027ea1] hover:bg-[#025f7a] text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Explore Programs <span>→</span>
              </Link>
              <Link
                href="/"
                className="px-7 md:px-9 py-3 md:py-4 bg-transparent border border-[#21313c]/40 text-[#21313c] font-medium rounded-full hover:bg-[#21313c] hover:text-white transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S NEXT */}
      <section className="bg-[#21313c]">
        <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[120px]" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: customEase }}
            className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8 mb-10 md:mb-16"
          >
            <div>
              <span className="text-[#f0c14b] uppercase tracking-widest block mb-4 md:mb-6 text-sm md:text-base font-bold" style={{ letterSpacing: '0.2em' }}>
                What Happens Next
              </span>
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                Here&apos;s your{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#027ea1' }}>
                  journey ahead
                </span>
              </h2>
            </div>
            <p className="text-white/60 text-sm md:text-[17px] max-w-full md:max-w-[420px]" style={{ lineHeight: 1.7 }}>
              From application review to campus visit — three quick steps before you join the JLU community.
            </p>
          </motion.div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {nextSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: customEase }}
                className="bg-[#2d3f4a] rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-4 md:mb-5">
                  <span className="text-[#f0c14b] text-xs md:text-sm font-bold tracking-widest" style={{ letterSpacing: '0.2em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#027ea1]/15 text-[#7dd3f0] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-white text-lg md:text-xl font-semibold mb-2" style={{ lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base" style={{ lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="bg-[#f6f7f0]">
        <div className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[100px]" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: customEase }}
            className="grid gap-3 md:gap-4 md:grid-cols-3"
          >
            <a
              href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/JLU-Brochure-2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-white border border-[#e5e5e0] hover:border-[#027ea1] rounded-2xl p-5 md:p-6 transition-all"
            >
              <div>
                <p className="text-[#999] text-xs uppercase tracking-wider mb-1">Download</p>
                <p className="text-[#21313c] text-base md:text-lg font-semibold">JLU Brochure 2026</p>
              </div>
              <span className="text-[#027ea1] text-xl group-hover:translate-x-1 transition-transform">↓</span>
            </a>
            <a
              href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/Fee-Structure-2026-27.pdf"
              download="JLU-Fee-Structure-2026-27.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-white border border-[#e5e5e0] hover:border-[#027ea1] rounded-2xl p-5 md:p-6 transition-all"
            >
              <div>
                <p className="text-[#999] text-xs uppercase tracking-wider mb-1">Download</p>
                <p className="text-[#21313c] text-base md:text-lg font-semibold">Fee Structure 2026-27</p>
              </div>
              <span className="text-[#027ea1] text-xl group-hover:translate-x-1 transition-transform">↓</span>
            </a>
            <a
              href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-white border border-[#e5e5e0] hover:border-[#027ea1] rounded-2xl p-5 md:p-6 transition-all"
            >
              <div>
                <p className="text-[#999] text-xs uppercase tracking-wider mb-1">Experience</p>
                <p className="text-[#21313c] text-base md:text-lg font-semibold">Virtual 360° Tour</p>
              </div>
              <span className="text-[#027ea1] text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
