'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const InstitutionalOverview = () => {
  const isMobile = useIsMobile();
  const promotingRef = useRef<HTMLDivElement>(null);
  const glanceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: promotingScroll } = useScroll({
    target: promotingRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: glanceScroll } = useScroll({
    target: glanceRef,
    offset: ['start end', 'end start'],
  });

  const promotingY = useTransform(promotingScroll, [0, 1], ['-8%', '8%']);
  const glanceY = useTransform(glanceScroll, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const slug = (e as CustomEvent).detail?.slug;
      if (!slug) return;
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };
    window.addEventListener('navigate-section', handleNavigate);
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        handleNavigate(new CustomEvent('navigate-section', { detail: { slug: hash } }));
      }, 500);
    }
    return () => window.removeEventListener('navigate-section', handleNavigate);
  }, []);

  return (
    <>
      {/* ===== PROMOTING BODY SECTION ===== */}
      <section id="promoting-body" className="w-full bg-white">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              ref={promotingRef}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl"
            >
              <motion.img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu-mgt-award.jpg"
                alt="Promoting Body"
                className="absolute inset-0 w-full object-cover"
                style={{
                  y: isMobile ? 0 : promotingY,
                  height: '120%',
                  top: '-10%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                01 — Promoting Body
              </span>
              <p
                className="text-[#666] text-sm md:text-[clamp(1.15rem,1.8vw,1.5rem)]"
                style={{ lineHeight: 1.8, fontWeight: 400 }}
              >
                JLU is promoted by a group with deep roots in media, communication and public engagement. Their vision has always been to build institutions that are meaningful, dynamic and connected to society&apos;s evolving needs. This ethos continues to guide the university&apos;s purpose, priorities and partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JLU AT A GLANCE SECTION ===== */}
      <section id="jlu-at-a-glance" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                02 — JLU at a Glance
              </span>
              <p
                className="text-[#666] text-sm md:text-[clamp(1.15rem,1.8vw,1.5rem)]"
                style={{ lineHeight: 1.8, fontWeight: 400 }}
              >
                Jagran Lakecity University is a multidisciplinary private university offering undergraduate, postgraduate, doctoral and skill based programs across diverse fields. With students from across India and abroad, JLU brings together academic rigour, global exposure and a vibrant campus life to create a learning experience that is engaging, relevant and forward looking.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              ref={glanceRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl"
            >
              <motion.img
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg"
                alt="JLU at a Glance"
                className="absolute inset-0 w-full object-cover"
                style={{
                  y: isMobile ? 0 : glanceY,
                  height: '120%',
                  top: '-10%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export { InstitutionalOverview };
export default InstitutionalOverview;
