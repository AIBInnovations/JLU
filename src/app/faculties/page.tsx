'use client';

import { Footer } from '@/components';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

gsap.registerPlugin(ScrollTrigger);

export default function FacultiesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const faculties = [
    {
      name: 'Faculty of Engineering',
      description: 'The Faculty of Engineering is committed to exposing students to various perspectives of technological innovation and equipping them for contemporary challenges in engineering and applied sciences through cutting-edge research and industry collaboration.',
      image: '/about-us.jpg',
      href: '/faculty/engineering',
      side: 'left'
    },
    {
      name: 'Faculty of Business',
      description: 'The Faculty of Business is committed to exposing students to various perspectives of global commerce and equipping them for contemporary challenges in business leadership, entrepreneurship, and strategic management in the modern marketplace.',
      image: '/admissions.jpg',
      href: '/faculty/business',
      side: 'right'
    },
    {
      name: 'Faculty of Law',
      description: 'The Faculty of Law is committed to exposing students to various perspectives of legal knowledge and equipping them for contemporary challenges in the legal field through rigorous training in jurisprudence, advocacy, and critical legal thinking.',
      image: '/student-clubs.jpg',
      href: '/faculty/law',
      side: 'left'
    },
    {
      name: 'Faculty of Liberal Arts',
      description: 'The Faculty of Liberal Arts is committed to exposing students to various perspectives of human culture and thought and equipping them for contemporary challenges in social sciences, humanities, and interdisciplinary research.',
      image: '/about-us.jpg',
      href: '/faculty/liberal-arts',
      side: 'right'
    },
    {
      name: 'Faculty of Architecture',
      description: 'The Faculty of Architecture is committed to exposing students to various perspectives of design thinking and equipping them for contemporary challenges in sustainable architecture, urban planning, and innovative built environments.',
      image: '/admissions.jpg',
      href: '/faculty/architecture',
      side: 'left'
    },
    {
      name: 'Faculty of Pharmacy',
      description: 'The Faculty of Pharmacy is committed to exposing students to various perspectives of pharmaceutical sciences and equipping them for contemporary challenges in healthcare, drug development, and clinical practice.',
      image: '/student-clubs.jpg',
      href: '/faculty/pharmacy',
      side: 'right'
    },
    {
      name: 'Faculty of Journalism',
      description: 'The Faculty of Journalism is committed to exposing students to various perspectives of media and communication and equipping them for contemporary challenges in digital journalism, mass communication, and ethical storytelling.',
      image: '/about-us.jpg',
      href: '/faculty/journalism',
      side: 'left'
    }
  ];

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const wipeOverlay = section.querySelector('.faculty-wipe-overlay');
      const title = section.querySelector('.faculty-title');
      const description = section.querySelector('.faculty-description');
      const link = section.querySelector('.faculty-link');
      const isLeft = faculties[index].side === 'left';

      // Wipe overlay reveal - slides away to reveal image
      if (wipeOverlay) {
        gsap.set(wipeOverlay, {
          transformOrigin: isLeft ? 'right center' : 'left center',
        });

        gsap.fromTo(
          wipeOverlay,
          {
            scaleX: 1,
          },
          {
            scaleX: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Text elements reveal from bottom
      gsap.fromTo(
        [title, description, link],
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#f6f7f0] min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2024/05/faculty-members.webp"
              alt="JLU Faculties"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay with fade on scroll */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            ACADEMIC{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            Explore our diverse faculties, each dedicated to shaping future leaders through innovation, research and hands-on learning across disciplines.
          </motion.p>
        </motion.div>

        {/* Large "Faculties" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-3 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Faculties
          </motion.h1>
        </div>
      </div>

      {/* Faculty Sections */}
      <div className="bg-white">
        {faculties.map((faculty, index) => (
          <section
            key={faculty.name}
            ref={(el) => { sectionsRef.current[index] = el; }}
            className="relative py-20 px-4 sm:px-10 lg:px-16 overflow-hidden"
          >
            <div className="mx-auto max-w-[1400px]">
              <div className={`relative flex items-center ${faculty.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                {/* Image */}
                <div
                  className={`faculty-image relative w-full md:w-[50%] h-[650px] ${
                    faculty.side === 'left' ? 'md:mr-[-10%] rounded-r-2xl' : 'md:ml-[-10%] rounded-l-2xl'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Wipe overlay that reveals the image */}
                  <div
                    className="faculty-wipe-overlay absolute inset-0 bg-white"
                    style={{
                      transformOrigin: faculty.side === 'left' ? 'right center' : 'left center',
                      zIndex: 1
                    }}
                  />
                </div>

                {/* Text Box - Overlapping */}
                <a
                  href={faculty.href}
                  className={`faculty-text-box absolute ${
                    faculty.side === 'left' ? 'right-0 md:right-[5%]' : 'left-0 md:left-[5%]'
                  } w-[90%] md:w-[50%] bg-white p-8 md:p-10 rounded-2xl transition-all duration-300 group cursor-pointer z-10`}
                >
                  <div className="space-y-6">
                    <h2
                      className="faculty-title font-bold break-words uppercase select-none"
                      style={{
                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                        lineHeight: 1.15,
                        letterSpacing: '0.05em',
                        backgroundImage: 'linear-gradient(to bottom, rgba(33, 49, 60, 1) 0%, rgba(33, 49, 60, 1) 60%, rgba(33, 49, 60, 0.3) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {faculty.name}
                    </h2>
                    <p className="faculty-description text-gray-700 leading-relaxed text-base md:text-lg opacity-90">
                      {faculty.description}
                    </p>
                    <div className="faculty-link flex items-center gap-2 text-[#21313c] font-semibold group-hover:gap-4 transition-all duration-300 opacity-80">
                      <span>Explore Faculty</span>
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Statistics Section */}
      <section className="relative py-20 px-4 sm:px-10 lg:px-16 bg-[#f6f7f0] overflow-hidden">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#21313c] mb-2">50+</div>
              <p className="text-gray-600">Programs Offered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#21313c] mb-2">500+</div>
              <p className="text-gray-600">Expert Faculty</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#21313c] mb-2">15k+</div>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-[#21313c] mb-2">100%</div>
              <p className="text-gray-600">Placement Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 sm:px-10 lg:px-16 bg-[#21313c] overflow-hidden">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-words">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Choose your faculty and take the first step towards a successful career with JLU.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/apply"
              className="bg-[#c3fd7a] text-[#21313c] font-semibold py-3 px-8 rounded-lg hover:bg-[#b0e86a] transition-all shadow-md hover:shadow-lg"
            >
              Apply Now
            </a>
            <a
              href="/admissions"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-[#21313c] transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
