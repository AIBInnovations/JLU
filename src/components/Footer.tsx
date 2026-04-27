'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '../hooks/useIsMobile';

export const Footer = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const jluY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 0.9],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className={`relative bg-[#027ea1] text-white ${isMobile ? 'overflow-visible' : 'overflow-hidden'} min-h-screen`}
      style={{ zIndex: 30 }}
    >
      {isMobile ? (
        /* Mobile Layout */
        <div className="flex flex-col min-h-full">
          {/* University Image - Full width at top */}
          <motion.div
            className="relative w-full h-52 shrink-0 overflow-hidden"
            style={{
              clipPath: imageClipPath,
            }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/about1.jpg"
              alt="Jagran Lakecity University Campus"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="px-6 pt-3 pb-0 flex flex-col flex-1">

          {/* Header Section */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-normal leading-tight text-[#d4e4a0]">
              Central India's
              <br />
              <span className="italic font-serif">Global University</span>
            </h2>
            <a
              href="https://apply.jlu.edu.in/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#d4e4a0] text-[#d4e4a0] px-4 py-2 text-xs hover:bg-[#d4e4a0] hover:text-[#027ea1] transition-colors rounded-full shrink-0"
            >
              SEND INQUIRY
              <span className="text-base">↗</span>
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-4" />

          {/* Contact Info */}
          <div className="mb-3">
            <div className="flex-1" style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>
              <a href="tel:+917471110101" className="font-light text-[#d4e4a0] hover:text-white transition-colors">+91 7471110101</a><br/>
              <a href="tel:+917471110103" className="font-light text-[#d4e4a0] hover:text-white transition-colors">+91 7471110103</a><br/>
              <a href="mailto:admission@jlu.edu.in" className="font-light text-[#d4e4a0] hover:text-white transition-colors">admission@jlu.edu.in</a>
            </div>
            <address className="not-italic text-gray-300 text-xs leading-relaxed mt-2">
              Jagran Lakecity University, Mugaliyachap, Near Ratibad, Bhopal – 462044
            </address>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-xs mb-2 text-white">Explore</h3>
              <ul className="space-y-1">
                <li><a href="/about" className="text-gray-300 text-xs hover:text-white transition-colors">About JLU</a></li>
                <li><a href="/academics" className="text-gray-300 text-xs hover:text-white transition-colors">Academics</a></li>
                <li><a href="/admissions" className="text-gray-300 text-xs hover:text-white transition-colors">Admissions</a></li>
                <li><a href="/campus-life" className="text-gray-300 text-xs hover:text-white transition-colors">Campus Life</a></li>
                <li><a href="/research" className="text-gray-300 text-xs hover:text-white transition-colors">Research</a></li>
                <li><a href="/placement" className="text-gray-300 text-xs hover:text-white transition-colors">Placements</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xs mb-2 text-white">Quick Links</h3>
              <ul className="space-y-1">
                <li><a href="/programs" className="text-gray-300 text-xs hover:text-white transition-colors">Programs</a></li>
                <li><a href="/scholarship" className="text-gray-300 text-xs hover:text-white transition-colors">Scholarships</a></li>
                <li><a href="/international-office" className="text-gray-300 text-xs hover:text-white transition-colors">International Office</a></li>
                <li><a href="/alumni" className="text-gray-300 text-xs hover:text-white transition-colors">Alumni</a></li>
                <li><a href="/news-events" className="text-gray-300 text-xs hover:text-white transition-colors">News & Events</a></li>
                <li><a href="https://apply.jlu.edu.in/" className="text-gray-300 text-xs hover:text-white transition-colors">Apply Now</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-4">
            <h3 className="font-semibold text-xs mb-2 text-white">Social</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs hover:text-white transition-colors">Facebook</a>
              <a href="https://www.instagram.com/jlubhopal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs hover:text-white transition-colors">Instagram</a>
              <a href="https://twitter.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs hover:text-white transition-colors">Twitter/X</a>
              <a href="https://www.linkedin.com/school/jagran-lakecity-university/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-xs hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-gray-400 text-xs mb-1">Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved</p>
              <button
                onClick={scrollToTop}
                className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
              >
                Scroll to the top ↑
              </button>
            </div>
          </div>

          {/* Large Jagran Lakecity Text */}
          <motion.div
            className="-mx-6 mb-4 overflow-visible mt-4"
            style={{ y: jluY }}
          >
            <h2
              className="select-none"
              style={{
                fontFamily: "'Haettenschweiler', 'Arial Narrow Bold', Impact, sans-serif",
                fontSize: 'clamp(5rem, 26vw, 10rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.02em',
                marginBottom: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  color: '#ffffff',
                }}
              >
                Jagran
              </span>
              <span
                style={{
                  display: 'block',
                  color: '#ffffff',
                }}
              >
                Lakecity
              </span>
            </h2>
          </motion.div>
          </div>
        </div>
      ) : isTablet && !isMobile ? (
        /* Tablet Layout (768-1024px) */
        <div className="flex flex-col min-h-screen">
          {/* University Image - Full width at top */}
          <motion.div
            className="relative w-full h-64 shrink-0 overflow-hidden"
            style={{
              clipPath: imageClipPath,
            }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/about1.jpg"
              alt="Jagran Lakecity University Campus"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="px-10 pt-6 pb-4 flex flex-col flex-1">
            {/* Header Section */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-normal leading-tight text-[#d4e4a0]">
                Central India's
                <br />
                <span className="italic font-serif">Global University</span>
              </h2>
              <a
                href="https://apply.jlu.edu.in/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#d4e4a0] text-[#d4e4a0] px-6 py-3 text-sm hover:bg-[#d4e4a0] hover:text-[#027ea1] transition-colors rounded-full shrink-0"
              >
                SEND INQUIRY
                <span className="text-lg">↗</span>
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-5" />

            {/* Contact Info */}
            <div className="mb-5">
              <div className="flex-1" style={{ fontSize: '1.25rem', lineHeight: 1.4 }}>
                <a href="tel:+917471110101" className="font-light text-[#d4e4a0] hover:text-white transition-colors">+91 7471110101</a><br/>
                <a href="tel:+917471110103" className="font-light text-[#d4e4a0] hover:text-white transition-colors">+91 7471110103</a><br/>
                <a href="mailto:admission@jlu.edu.in" className="font-light text-[#d4e4a0] hover:text-white transition-colors">admission@jlu.edu.in</a>
              </div>
              <address className="not-italic text-gray-300 text-sm leading-relaxed mt-3">
                Jagran Lakecity University, Mugaliyachap, Near Ratibad, Bhopal – 462044
              </address>
            </div>

            {/* Links Grid - 3 columns for tablet */}
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="font-semibold text-sm mb-3 text-white">Explore</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-300 text-sm hover:text-white transition-colors">About JLU</a></li>
                  <li><a href="/academics" className="text-gray-300 text-sm hover:text-white transition-colors">Academics</a></li>
                  <li><a href="/admissions" className="text-gray-300 text-sm hover:text-white transition-colors">Admissions</a></li>
                  <li><a href="/campus-life" className="text-gray-300 text-sm hover:text-white transition-colors">Campus Life</a></li>
                  <li><a href="/research" className="text-gray-300 text-sm hover:text-white transition-colors">Research</a></li>
                  <li><a href="/placement" className="text-gray-300 text-sm hover:text-white transition-colors">Placements</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/programs" className="text-gray-300 text-sm hover:text-white transition-colors">Programs</a></li>
                  <li><a href="/scholarship" className="text-gray-300 text-sm hover:text-white transition-colors">Scholarships</a></li>
                  <li><a href="/international-office" className="text-gray-300 text-sm hover:text-white transition-colors">International Office</a></li>
                  <li><a href="/alumni" className="text-gray-300 text-sm hover:text-white transition-colors">Alumni</a></li>
                  <li><a href="/news-events" className="text-gray-300 text-sm hover:text-white transition-colors">News & Events</a></li>
                  <li><a href="https://apply.jlu.edu.in/" className="text-gray-300 text-sm hover:text-white transition-colors">Apply Now</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3 text-white">Social</h3>
                <ul className="space-y-2">
                  <li><a href="https://www.facebook.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="https://www.instagram.com/jlubhopal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="https://twitter.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-white transition-colors">Twitter/X</a></li>
                  <li><a href="https://www.linkedin.com/school/jagran-lakecity-university/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:text-white transition-colors">LinkedIn</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end mt-auto">
              <div>
                <p className="text-gray-400 text-xs mb-1">Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved</p>
                <button
                  onClick={scrollToTop}
                  className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
                >
                  Scroll to the top ↑
                </button>
              </div>
            </div>

            {/* Large Jagran Lakecity Text */}
            <motion.div
              className="-mx-10 mb-4 overflow-hidden mt-4"
              style={{ y: jluY }}
            >
              <h2
                className="select-none"
                style={{
                  fontFamily: "'Haettenschweiler', 'Arial Narrow Bold', Impact, sans-serif",
                  fontSize: 'clamp(6rem, 14vw, 12rem)',
                  lineHeight: 0.8,
                  letterSpacing: '-0.02em',
                  marginBottom: 0,
                }}
              >
                <span
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 90%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Jagran{' '}
                </span>
                <span
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 90%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Lakecity
                </span>
              </h2>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex min-h-screen">
          {/* Left - University Image with reveal animation */}
          <motion.div
            className="relative w-[40%] overflow-hidden"
            style={{
              clipPath: imageClipPath,
            }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/about1.jpg"
              alt="Jagran Lakecity University Campus"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right - Content */}
          <div className="flex-1 pl-6 xl:pl-8 2xl:pl-12 pr-12 xl:pr-16 2xl:pr-24 pt-8 pb-4 flex flex-col">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl lg:text-4xl font-normal leading-tight text-[#d4e4a0]">
                Central India's
                <br />
                <span className="italic font-serif">Global University</span>
              </h2>
              <a
                href="https://apply.jlu.edu.in/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-4 border border-[#d4e4a0] text-[#d4e4a0] px-8 py-4 text-sm hover:bg-[#d4e4a0] hover:text-[#027ea1] transition-colors shrink-0 rounded-full mt-4"
              >
                SEND INQUIRY
                <span className="text-xl">↗</span>
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 mb-8" />

            {/* Main Content */}
            <div className="flex justify-between mb-8 flex-1">
              {/* Left - Contact Info */}
              <div>
                <a href="mailto:admission@jlu.edu.in" className="text-3xl lg:text-4xl font-light mb-2 text-[#d4e4a0] block hover:text-white transition-colors">admission@jlu.edu.in</a>
                <a href="tel:+917471110101" className="text-3xl lg:text-4xl font-light mb-2 text-[#d4e4a0] block hover:text-white transition-colors">+91 7471110101</a>
                <a href="tel:+917471110103" className="text-3xl lg:text-4xl font-light mb-6 text-[#d4e4a0] block hover:text-white transition-colors">+91 7471110103</a>
                <address className="not-italic text-gray-300 text-base leading-relaxed mb-4">
                  Jagran Lakecity University,
                  <br />
                  Mugaliyachap, Near Ratibad
                  <br />
                  Bhopal – 462044
                </address>
              </div>

              {/* Right - Navigation Links */}
              <div className="flex gap-12">
                <div>
                  <h3 className="font-semibold text-base mb-4 text-white">Explore</h3>
                  <ul className="space-y-3">
                    <li><a href="/about" className="text-gray-300 text-base hover:text-white transition-colors">About JLU</a></li>
                    <li><a href="/academics" className="text-gray-300 text-base hover:text-white transition-colors">Academics</a></li>
                    <li><a href="/admissions" className="text-gray-300 text-base hover:text-white transition-colors">Admissions</a></li>
                    <li><a href="/campus-life" className="text-gray-300 text-base hover:text-white transition-colors">Campus Life</a></li>
                    <li><a href="/research" className="text-gray-300 text-base hover:text-white transition-colors">Research</a></li>
                    <li><a href="/placement" className="text-gray-300 text-base hover:text-white transition-colors">Placements</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4 text-white">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><a href="/programs" className="text-gray-300 text-base hover:text-white transition-colors">Programs</a></li>
                    <li><a href="/scholarship" className="text-gray-300 text-base hover:text-white transition-colors">Scholarships</a></li>
                    <li><a href="/international-office" className="text-gray-300 text-base hover:text-white transition-colors">International Office</a></li>
                    <li><a href="/alumni" className="text-gray-300 text-base hover:text-white transition-colors">Alumni</a></li>
                    <li><a href="/news-events" className="text-gray-300 text-base hover:text-white transition-colors">News & Events</a></li>
                    <li><a href="https://apply.jlu.edu.in/" className="text-gray-300 text-base hover:text-white transition-colors">Apply Now</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-4 text-white">Social</h3>
                  <ul className="space-y-3">
                    <li><a href="https://www.facebook.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-base hover:text-white transition-colors">Facebook</a></li>
                    <li><a href="https://www.instagram.com/jlubhopal/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-base hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="https://twitter.com/JLUBhopal" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-base hover:text-white transition-colors">Twitter/X</a></li>
                    <li><a href="https://www.linkedin.com/school/jagran-lakecity-university/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-base hover:text-white transition-colors">LinkedIn</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved</p>
            </div>

            {/* Large Jagran Lakecity Text with Scroll to top */}
            <motion.div
              className="-ml-6 -mr-12 mt-auto relative"
              style={{ y: jluY }}
            >
              <div className="absolute right-12 bottom-32 z-10 flex flex-col items-end gap-4">
                <button
                  onClick={scrollToTop}
                  className="text-gray-300 text-lg font-semibold hover:text-white transition-colors flex items-center gap-2"
                >
                  Scroll to the top <span className="text-2xl">↑</span>
                </button>
              </div>
              <h2
                className="select-none"
                style={{
                  fontFamily: "'Haettenschweiler', 'Arial Narrow Bold', Impact, sans-serif",
                  fontSize: 'clamp(8rem, 12vw, 20rem)',
                  lineHeight: 0.75,
                  letterSpacing: '-0.02em',
                }}
              >
                <span
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 90%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Jagran{' '}
                </span>
                <span
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 90%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Lakecity
                </span>
              </h2>
            </motion.div>
          </div>
        </div>
      )}
    </footer>
  );
};
