'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface Event {
  day: string;
  month: string;
  title: string;
  description: string;
  location: string;
  time: string;
  color: string;
}

const events: Event[] = [
  {
    day: '09',
    month: 'Mar',
    title: 'International Women\'s Day',
    description: 'Celebrating achievements, strength, and contributions of women in society with engaging activities and discussions promoting gender equality and empowerment.',
    location: 'Jagran Lakecity University, Bhopal Campus',
    time: '9th March 2026',
    color: 'bg-[#e85a71]',
  },
  {
    day: '01',
    month: 'Apr',
    title: 'JLU\'s Got Talent',
    description: 'A vibrant platform for students to showcase diverse talents including singing, dancing, acting, and other creative performances celebrating creativity and expression.',
    location: 'JLU Main Auditorium, Bhopal Campus',
    time: '1st & 2nd April 2026',
    color: 'bg-[#3b82f6]',
  },
  {
    day: '24',
    month: 'Apr',
    title: 'Foundation Day of JLU',
    description: 'Commemorating the establishment of the university and celebrating its journey of academic excellence, innovation, and growth.',
    location: 'Jagran Lakecity University, Bhopal Campus',
    time: '24th April 2026',
    color: 'bg-[#d4c84a]',
  },
  {
    day: '12',
    month: 'Jul',
    title: 'Orientation for New Students',
    description: 'Helping newly admitted students transition into university life with introductions to academic structure, campus facilities, values, and opportunities.',
    location: 'Jagran Lakecity University, Bhopal Campus',
    time: '12th July 2026',
    color: 'bg-[#3b82f6]',
  },
];

const galleryImages = [
  '/JLu%20events/photos/Convocation/DSC_0823.JPG',
  '/JLu%20events/photos/Lehar/IMG_8971.JPG',
  '/JLu%20events/photos/Anti%20Ragging%20WEEK/IMG_1879.JPG',
  '/JLu%20events/photos/Mental%20Health%20week/IMG_7813.JPG',
  '/JLu%20events/photos/JAgran%20%20of%20Social%20science/DSC08838.JPG',
];

export const EventsSection = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={`bg-[#f6f7f0] flex items-center py-10 md:py-16 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-32 relative ${isMobile ? '' : 'min-h-screen'}`}>
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-base md:text-lg mb-4"
            style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            CAMPUS LIFE
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-[#21313c] mb-3"
            style={{ fontWeight: 600, lineHeight: 1 }}
          >
            Moments worth{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>stepping into</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#666', lineHeight: 1.7 }}>
            From cultural celebrations to talent showcases, experience the vibrant campus life at Jagran Lakecity University.
          </p>
          <div className="mx-auto mt-4" style={{ width: '274px', height: '0px', border: '4px solid #027ea1' }} />
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start mb-6">
          {/* Left Side - Image + Text */}
          <div
            className="shrink-0 flex flex-col space-y-4 lg:-ml-16 xl:-ml-20 2xl:-ml-32"
            style={{
              width: isMobile ? '100%' : 'clamp(450px, 38vw, 900px)',
              marginLeft: isMobile ? '0' : undefined,
            }}
          >
            {/* Image */}
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                height: isMobile ? '300px' : 'clamp(550px, 42vw, 950px)',
              }}
            >
              <img
                src="/JLu%20events/photos/Lehar/IMG_9067.JPG"
                alt="Campus Events"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Button positioned inside image */}
              <a
                href="/events"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#027ea1] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-semibold hover:bg-[#026a88] transition-colors shadow-lg flex items-center justify-center leading-none"
              >
                View Events
              </a>
            </div>

          </div>

          {/* Right Side - Horizontal Scrolling Cards */}
          <div className="flex-1 overflow-visible">
            <div
              className="flex gap-4 md:gap-6 transition-transform duration-500"
              style={{
                transform: isMobile
                  ? `translateX(calc(-${currentIndex} * (100vw - 2rem + 1rem)))`
                  : `translateX(-${currentIndex * 33.33}%)`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shrink-0 flex flex-col p-4 md:p-6"
                  style={{
                    width: isMobile ? 'calc(100vw - 2rem)' : 'clamp(300px, 22vw, 480px)',
                    height: isMobile ? 'auto' : 'clamp(380px, 26vw, 600px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Card Content */}
                  <div className="flex gap-3 md:gap-4 mb-3">
                    {/* Date Badge */}
                    <div
                      className={`${event.color} text-white text-center shrink-0 rounded-lg`}
                      style={{
                        minWidth: isMobile ? '50px' : '70px',
                        padding: isMobile ? '8px' : '12px',
                      }}
                    >
                      <div className="text-xs font-medium uppercase">{event.month}</div>
                      <div className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold`}>
                        {event.day}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-[#21313c] text-sm md:text-lg leading-snug">
                      {event.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-3 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Arrows - Above gallery */}
        {isMobile && (
          <div className="flex justify-center gap-4 mt-6 mb-8">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous event"
            >
              <svg className="w-5 h-5 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(events.length - 1, prev + 1))}
              disabled={currentIndex >= events.length - 1}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next event"
            >
              <svg className="w-5 h-5 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Infinite Scroll Gallery */}
        <div className={`${isMobile ? 'mt-8' : 'mt-32 md:mt-40'} overflow-hidden -mx-4 md:-mx-12 lg:-mx-16 xl:-mx-20 2xl:-mx-32`}>
          <div className="flex gap-2 md:gap-4 animate-scroll">
            {/* First set of images */}
            {galleryImages.map((image, index) => (
              <div
                key={`first-${index}`}
                className="shrink-0"
                style={{
                  width: isMobile ? '200px' : 'clamp(280px, 20vw, 500px)',
                  height: isMobile ? '240px' : 'clamp(300px, 22vw, 540px)',
                }}
              >
                <img
                  src={image}
                  alt={`Event gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {galleryImages.map((image, index) => (
              <div
                key={`second-${index}`}
                className="shrink-0"
                style={{
                  width: isMobile ? '200px' : 'clamp(280px, 20vw, 500px)',
                  height: isMobile ? '240px' : 'clamp(300px, 22vw, 540px)',
                }}
              >
                <img
                  src={image}
                  alt={`Event gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Content - Positioned Independently - Hidden on Mobile */}
        <div className="absolute text-left hidden lg:block" style={{ top: '48%', right: '41%', maxWidth: '250px' }}>
          <h3
            className="text-2xl md:text-3xl lg:text-4xl text-[#21313c] mb-3 leading-tight"
            style={{ fontWeight: 600 }}
          >
            SEE WHAT'S{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>GOING ON</span>
          </h3>
          <p className="text-sm md:text-base" style={{ color: '#666', lineHeight: 1.7 }}>
            Current and upcoming events at JLU — from celebrations and talent shows to orientations and milestones.
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="absolute hidden lg:flex justify-center gap-4" style={{ top: '50%', left: '72%', transform: 'translateX(-50%)' }}>
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous event"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#21313c]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(events.length - 1, prev + 1))}
            disabled={currentIndex >= events.length - 1}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next event"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#21313c]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 14s linear infinite;
        }
      `}</style>
    </section>
  );
};
