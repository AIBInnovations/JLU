'use client';

import { Footer } from '@/components';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FacultiesPage() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      <section className="relative pt-32 pb-20 px-4 sm:px-10 lg:px-16 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">Academic Excellence</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#21313c] mb-6 break-words">
            Faculties at <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>JLU</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore our diverse range of faculties, each dedicated to academic excellence and innovation in their respective fields.
          </p>
        </div>
      </section>

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
                      className="faculty-title font-bold break-words uppercase tracking-wider select-none"
                      style={{
                        fontFamily: "'Humane', sans-serif",
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        lineHeight: 1.1,
                        letterSpacing: '0.02em',
                        wordSpacing: '0.1em',
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
