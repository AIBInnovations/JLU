'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '../hooks/useIsMobile';

export const Footer = () => {
  const isMobile = useIsMobile();
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
      className="relative bg-[#1a3a3a] text-white overflow-hidden h-screen"
      style={{ zIndex: 30 }}
    >
      {isMobile ? (
        /* Mobile Layout */
        <div className="px-6 pt-8 pb-8">
          {/* University Image */}
          <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
              alt="Jagran Lakecity University Campus"
              fill
              className="object-cover"
            />
          </div>

          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-normal leading-tight mb-6 text-[#d4e4a0]">
              Let's Shape <span className="italic font-serif">Your</span>
              <br />
              <span className="italic font-serif">Future</span> Together
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-[#d4e4a0] text-[#d4e4a0] px-6 py-3 text-sm hover:bg-[#d4e4a0] hover:text-[#1a3a3a] transition-colors"
            >
              SEND INQUIRY
              <span className="text-lg">↗</span>
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-8" />

          {/* Contact Info */}
          <div className="mb-8">
            <p className="text-2xl font-light mb-2 text-[#d4e4a0]">info@jlu.edu.in</p>
            <p className="text-2xl font-light mb-4 text-[#d4e4a0]">+44(0)1273 704 200</p>
            <address className="not-italic text-gray-300 text-sm leading-relaxed">
              Jagran Lakecity University,
              <br />
              Mugaliyachap, Near Ratibad
              <br />
              Bhopal – 462044
            </address>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white">Our Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Alumini</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Work with Us</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Partner with Us</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Family of Schools</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Venue Hire</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Community Hub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-4 text-white">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Term Dates</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Policies</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Safeguarding</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Inspections</a></li>
                <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Governors</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-gray-400 text-xs mb-1">Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved</p>
              <button
                onClick={scrollToTop}
                className="text-gray-400 text-xs hover:text-white transition-colors"
              >
                Scroll to the top
              </button>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-1">
                Instagram <span>↗</span>
              </a>
            </div>
          </div>

          {/* Large Jagran Lakecity Text */}
          <motion.div
            className="-mx-6 mt-8 -mb-16"
            style={{ y: jluY }}
          >
            <h2
              className="select-none"
              style={{
                fontFamily: "'Haettenschweiler', 'Arial Narrow Bold', Impact, sans-serif",
                fontSize: 'clamp(5rem, 22vw, 10rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to bottom, rgba(212,228,160,1) 0%, rgba(212,228,160,0.6) 50%, rgba(212,228,160,0) 90%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Jagran Lakecity
            </h2>
          </motion.div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex h-screen">
          {/* Left - University Image with reveal animation */}
          <motion.div
            className="relative w-[40%] overflow-hidden"
            style={{
              clipPath: imageClipPath,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
              alt="Jagran Lakecity University Campus"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right - Content */}
          <div className="flex-1 px-12 xl:px-16 2xl:px-24 pt-8 pb-4 flex flex-col">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-5xl lg:text-6xl font-normal leading-tight text-[#d4e4a0]">
                Let's Shape <span className="italic font-serif">Your</span>
                <br />
                <span className="italic font-serif">Future</span> Together
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-4 border border-[#d4e4a0] text-[#d4e4a0] px-8 py-4 text-sm hover:bg-[#d4e4a0] hover:text-[#1a3a3a] transition-colors shrink-0 rounded-full mt-4"
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
                <p className="text-3xl lg:text-4xl font-light mb-2 text-[#d4e4a0]">info@jlu.edu.in</p>
                <p className="text-3xl lg:text-4xl font-light mb-6 text-[#d4e4a0]">+44(0)1273 704 200</p>
                <address className="not-italic text-gray-300 text-sm leading-relaxed mb-4">
                  Jagran Lakecity University,
                  <br />
                  Mugaliyachap, Near Ratibad
                  <br />
                  Bhopal – 462044
                </address>
                <a href="#" className="text-[#d4e4a0] text-sm hover:text-white transition-colors">
                  Contact Us
                </a>
              </div>

              {/* Right - Navigation Links */}
              <div className="flex gap-12">
                <div>
                  <h3 className="font-semibold text-sm mb-4 text-white">Our Community</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Alumini</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Work with Us</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Partner with Us</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Family of Schools</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Venue Hire</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Community Hub</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-4 text-white">Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Term Dates</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Policies</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Safeguarding</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Inspections</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Governors</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-4 text-white">Social</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Facebook</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Instagram</a></li>
                    <li><a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">Twitter/X</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Copyright © 2025 | Jagran Lakecity University Bhopal | All Rights Reserved</p>
                <button
                  onClick={scrollToTop}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Scroll to the top
                </button>
              </div>
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-2">
                Instagram <span className="text-lg">↗</span>
              </a>
            </div>

            {/* Large Jagran Lakecity Text */}
            <motion.div
              className="-mx-12 mt-auto"
              style={{ y: jluY }}
            >
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
                    background: 'linear-gradient(to bottom, rgba(212,228,160,1) 0%, rgba(212,228,160,0.6) 50%, rgba(212,228,160,0) 90%)',
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
