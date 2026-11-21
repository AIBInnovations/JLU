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
      name: 'Faculty of Management',
      description: 'Houses Jagran Lakecity Business School, Jagran School of Physical Education and Sports Science, and Jagran School of Hospitality & Tourism. Provides comprehensive education in business, hospitality, tourism, and sports management through industry-relevant syllabi and practice-based learning.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
      href: '/faculty/management',
      side: 'left'
    },
    {
      name: 'Faculty of Science & Technology',
      description: 'Houses Jagran School of Artificial Intelligence, Jagran School of Engineering, and Jagran School of Computer Application. Equips students for contemporary challenges in engineering, AI, data science, and applied sciences through cutting-edge research and industry collaboration.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      href: '/faculty/engineering',
      side: 'right'
    },
    {
      name: 'Faculty of Media & Social Science',
      description: 'Spans Jagran School of Journalism, Advertising and Public Relations, Events & Entertainment, and Languages & Social Science. Prepares students for contemporary challenges in digital journalism, mass communication, languages, and ethical storytelling.',
      image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
      href: '/faculty/journalism',
      side: 'left'
    },
    {
      name: 'Faculty of Pharmacy',
      description: 'Committed to exposing students to various perspectives of pharmaceutical sciences and equipping them for contemporary challenges in healthcare, drug development, and clinical practice.',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
      href: '/faculty/pharmacy',
      side: 'right'
    },
    {
      name: 'Faculty of Law',
      description: 'Committed to exposing students to various perspectives of legal knowledge and equipping them for contemporary challenges in the legal field through rigorous training in jurisprudence, advocacy, and critical legal thinking.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      href: '/faculty/law',
      side: 'left'
    },
    {
      name: 'Faculty of Fashion, Design & Arts',
      description: 'Houses School of Design, School of Architecture, and School of Fashion. Equips students for contemporary challenges in design thinking, sustainable architecture, fashion communication, and innovative built environments.',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
      href: '/faculty/architecture',
      side: 'right'
    },
    {
      name: 'IICA - Jagran Centre for Creative Skills',
      description: 'A unique initiative bridging traditional Indian arts with contemporary creative practices. Offers programs in animation, game production, and creative skills, in collaboration with the Indira Gandhi National Centre for the Arts.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      href: '/faculty/humanities',
      side: 'left'
    }
  ];

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const wipeOverlay = section.querySelector('.faculty-wipe-overlay');
      const textWipe = section.querySelector('.faculty-text-wipe');
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

      // Text box wipe reveal - opposite direction to image
      if (textWipe) {
        gsap.set(textWipe, {
          transformOrigin: isLeft ? 'left center' : 'right center',
        });

        gsap.fromTo(
          textWipe,
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
            delay: 0.3,
          }
        );
      }

      // Text elements reveal from bottom (staggered after wipe)
      gsap.fromTo(
        [title, description, link],
        {
          y: 30,
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
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.7,
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
      <div ref={heroRef} className="relative w-screen h-svh md:h-auto m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen min-h-[100svh] md:min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/optimized/acedemics/acedemics%20landing%20page.webp"
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
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Excellence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white" style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            Explore our diverse faculties, each dedicated to shaping future leaders through innovation, research and hands-on learning across disciplines.
          </motion.p>
        </motion.div>

        {/* Large "Faculties" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 right-0 pl-3 sm:pl-6 md:pl-10 pb-0 overflow-hidden"
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[6.5rem] sm:text-[8rem] md:text-[clamp(8rem,16vw,16rem)]"
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
            className="relative py-8 md:py-20 px-3 sm:px-10 lg:px-16 overflow-hidden"
          >
            <div className="mx-auto max-w-[1400px]">
              <a href={faculty.href} className={`relative flex items-center ${faculty.side === 'right' ? 'justify-end' : 'justify-start'} group cursor-pointer`}>
                {/* Image */}
                <div
                  className={`faculty-image relative w-full md:w-[50%] h-[320px] md:h-[650px] ${
                    faculty.side === 'left' ? 'md:mr-[-10%] rounded-r-xl md:rounded-r-2xl' : 'md:ml-[-10%] rounded-l-xl md:rounded-l-2xl'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <img
                    loading="lazy" decoding="async" src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div
                  className={`faculty-text-box absolute ${
                    faculty.side === 'left' ? '-right-2 md:right-[5%]' : '-left-2 md:left-[5%]'
                  } w-[85%] md:w-[50%] bg-white p-4 md:p-10 rounded-xl md:rounded-2xl transition-all duration-300 z-10 shadow-none overflow-hidden`}
                >
                  {/* Wipe overlay for text box - opposite direction to image */}
                  <div
                    className="faculty-text-wipe absolute inset-0 bg-white"
                    style={{
                      transformOrigin: faculty.side === 'left' ? 'left center' : 'right center',
                      zIndex: 2
                    }}
                  />
                  <div className="space-y-2 md:space-y-6">
                    <h2
                      className="faculty-title font-bold break-words uppercase select-none"
                      style={{
                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: 'clamp(1rem, 3.5vw, 3rem)',
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
                    <p className="faculty-description text-gray-700 leading-relaxed text-[0.7rem] md:text-lg opacity-90 line-clamp-3 md:line-clamp-none">
                      {faculty.description}
                    </p>
                    <div className="faculty-link flex items-center gap-2 text-[#21313c] font-semibold group-hover:gap-4 transition-all duration-300 opacity-80 text-xs md:text-base">
                      <span>Explore Faculty</span>
                      <span className="text-sm md:text-xl">→</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </section>
        ))}
      </div>

      {/* Statistics Section */}
      <section className="relative py-10 md:py-20 px-4 sm:px-10 lg:px-16 bg-[#f6f7f0] overflow-hidden">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">50+</div>
              <p className="text-gray-600 text-xs md:text-base">Programs Offered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">500+</div>
              <p className="text-gray-600 text-xs md:text-base">Expert Faculty</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">15k+</div>
              <p className="text-gray-600 text-xs md:text-base">Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-5xl font-bold text-[#21313c] mb-1 md:mb-2">100%</div>
              <p className="text-gray-600 text-xs md:text-base">Placement Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20">
        <div className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 rounded-xl md:rounded-3xl lg:rounded-4xl" style={{ maxWidth: '1400px' }}>
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
              Start Your Journey
            </span>
            <h2 className="text-white" style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Ready to Begin{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>Your Journey?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Choose your faculty and take the first step towards a successful career with JLU.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
            <a href="https://apply.jlu.edu.in/" className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full">
              Apply Now <span>→</span>
            </a>
            <a href="/admissions" className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-white/50 text-white font-medium w-full sm:w-auto rounded-full text-center">
              Learn More
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
