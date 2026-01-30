'use client';

import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

interface Event {
  day: string;
  month: string;
  title: string;
  location: string;
  time: string;
  color: string;
}

const events: Event[] = [
  {
    day: '14',
    month: 'Oct',
    title: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis.',
    location: 'Perrin Theater, Keiter Center for the Arts',
    time: '12:00 PM 1:00 PM',
    color: 'bg-[#3b82f6]',
  },
  {
    day: '14',
    month: 'Oct',
    title: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis.',
    location: 'Perrin Theater, Keiter Center for the Arts',
    time: '12:00 PM 1:00 PM',
    color: 'bg-[#e85a71]',
  },
  {
    day: '14',
    month: 'Oct',
    title: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis.',
    location: 'Perrin Theater, Keiter Center for the Arts',
    time: '12:00 PM 1:00 PM',
    color: 'bg-[#d4c84a]',
  },
  {
    day: '20',
    month: 'Nov',
    title: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis.',
    location: 'Main Auditorium',
    time: '10:00 AM 12:00 PM',
    color: 'bg-[#3b82f6]',
  },
  {
    day: '25',
    month: 'Nov',
    title: 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis.',
    location: 'Convention Center',
    time: '9:00 AM 5:00 PM',
    color: 'bg-[#e85a71]',
  },
];

const galleryImages = ['/e1.jpg', '/e2.jpg', '/e3.jpg', '/e4.jpg', '/e5.jpg'];

export const EventsSection = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-4">
            Moments worth stepping into
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Conversations that provoke thought, gatherings that celebrate culture, and experiences that bring the community together.
          </p>
          <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start mb-16">
          {/* Left Side - Image + Text */}
          <div
            className="shrink-0 flex flex-col space-y-4"
            style={{
              width: isMobile ? '100%' : 'clamp(350px, 28vw, 550px)',
            }}
          >
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                height: isMobile ? '300px' : 'clamp(450px, 32vw, 650px)',
              }}
            >
              <img
                src="/events-hero.jpg"
                alt="Campus Events"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#21313c] mb-3 leading-tight">
                SEE WHAT's<br />GOING ON
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque
              </p>
              <button className="bg-[#c3fd7a] text-[#21313c] px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-semibold hover:bg-[#b3ed6a] transition-colors">
                View full Calendar
              </button>
            </div>
          </div>

          {/* Right Side - Horizontal Scrolling Cards */}
          <div className="flex-1 overflow-visible py-4">
            <div
              className="flex gap-4 md:gap-6 transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.33)}%)`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shrink-0 flex flex-col p-4 md:p-6"
                  style={{
                    width: isMobile ? 'calc(100vw - 2rem)' : 'clamp(300px, 26vw, 420px)',
                    height: isMobile ? 'auto' : 'clamp(380px, 28vw, 550px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Card Content */}
                  <div className="flex gap-3 md:gap-4 mb-4">
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

                  {/* Event Details */}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>

                    {/* Read More */}
                    <a
                      href="#"
                      className="text-[#8bc34a] font-semibold text-xs md:text-sm inline-flex items-center gap-2 hover:gap-3 transition-all group mt-2"
                    >
                      Read More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mb-8 -mt-4">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous event"
          >
            <svg
              className="w-6 h-6 text-[#21313c]"
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
            onClick={() => setCurrentIndex((prev) => Math.min(events.length - (isMobile ? 1 : 3), prev + 1))}
            disabled={currentIndex >= events.length - (isMobile ? 1 : 3)}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next event"
          >
            <svg
              className="w-6 h-6 text-[#21313c]"
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

        {/* Infinite Scroll Gallery */}
        <div className="mt-24 md:mt-32 overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of images */}
            {galleryImages.map((image, index) => (
              <div
                key={`first-${index}`}
                className="shrink-0 mx-1 md:mx-2"
                style={{
                  width: isMobile ? '120px' : 'clamp(350px, 29vw, 552px)',
                  height: isMobile ? '150px' : 'clamp(380px, 32vw, 606px)',
                }}
              >
                <img
                  src={image}
                  alt={`Event gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {galleryImages.map((image, index) => (
              <div
                key={`second-${index}`}
                className="shrink-0 mx-1 md:mx-2"
                style={{
                  width: isMobile ? '120px' : 'clamp(350px, 29vw, 552px)',
                  height: isMobile ? '150px' : 'clamp(380px, 32vw, 606px)',
                }}
              >
                <img
                  src={image}
                  alt={`Event gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
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
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
