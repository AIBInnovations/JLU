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
    day: '15',
    month: 'Feb',
    title: 'Annual Tech Fest - Innovation Summit 2025',
    location: 'JLU Main Auditorium, Bhopal Campus',
    time: '10:00 AM - 6:00 PM',
    color: 'bg-[#3b82f6]',
  },
  {
    day: '20',
    month: 'Feb',
    title: 'Guest Lecture: Industry Leaders Forum',
    location: 'Conference Hall, Faculty of Management',
    time: '2:00 PM - 4:00 PM',
    color: 'bg-[#e85a71]',
  },
  {
    day: '25',
    month: 'Feb',
    title: 'Cultural Night - Celebrating Diversity',
    location: 'Open Air Theatre, JLU Campus',
    time: '6:00 PM - 10:00 PM',
    color: 'bg-[#d4c84a]',
  },
  {
    day: '05',
    month: 'Mar',
    title: 'Sports Week - Inter-Faculty Championship',
    location: 'JLU Sports Complex',
    time: '9:00 AM - 5:00 PM',
    color: 'bg-[#3b82f6]',
  },
  {
    day: '12',
    month: 'Mar',
    title: 'Research Symposium - Emerging Technologies',
    location: 'Faculty of Engineering & Technology',
    time: '10:00 AM - 3:00 PM',
    color: 'bg-[#e85a71]',
  },
];

const galleryImages = ['/e1.jpg', '/e2.jpg', '/e3.jpg', '/e4.jpg', '/e5.jpg'];

export const EventsSection = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-[#f6f7f0] min-h-screen flex items-center py-12 md:py-16 px-4 md:px-12 lg:px-16 xl:px-20 2xl:px-32 relative">
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-3">
            Moments worth stepping into
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From tech fests to cultural nights, experience the vibrant campus life at Jagran Lakecity University.
          </p>
          <div className="mx-auto mt-4" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start mb-6">
          {/* Left Side - Image + Text */}
          <div
            className="shrink-0 flex flex-col space-y-4 -ml-8 md:-ml-16 lg:-ml-16 xl:-ml-20 2xl:-ml-32"
            style={{
              width: isMobile ? '100%' : 'clamp(450px, 38vw, 900px)',
            }}
          >
            {/* Image */}
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                height: isMobile ? '400px' : 'clamp(550px, 42vw, 950px)',
              }}
            >
              <img
                src="/event1.jpg"
                alt="Campus Events"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Button positioned inside image */}
              <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#c3fd7a] text-[#21313c] px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-semibold hover:bg-[#b3ed6a] transition-colors shadow-lg">
                View Full Calendar
              </button>
            </div>

          </div>

          {/* Right Side - Horizontal Scrolling Cards */}
          <div className="flex-1 overflow-visible">
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
                    width: isMobile ? 'calc(100vw - 2rem)' : 'clamp(300px, 22vw, 480px)',
                    height: isMobile ? 'auto' : 'clamp(380px, 26vw, 600px)',
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

        {/* Infinite Scroll Gallery */}
        <div className="mt-32 md:mt-40 overflow-hidden -mx-4 md:-mx-12 lg:-mx-16 xl:-mx-20 2xl:-mx-32">
          <div className="flex gap-2 md:gap-4 animate-scroll">
            {/* First set of images */}
            {galleryImages.map((image, index) => (
              <div
                key={`first-${index}`}
                className="shrink-0"
                style={{
                  width: isMobile ? '100px' : 'clamp(280px, 20vw, 500px)',
                  height: isMobile ? '120px' : 'clamp(300px, 22vw, 540px)',
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
                  width: isMobile ? '100px' : 'clamp(280px, 20vw, 500px)',
                  height: isMobile ? '120px' : 'clamp(300px, 22vw, 540px)',
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

        {/* Text Content - Positioned Independently */}
        <div className="absolute text-left" style={{ top: '48%', right: '41%', maxWidth: '250px' }}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#21313c] mb-3 leading-tight">
            SEE WHAT'S GOING ON
          </h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Stay updated with the latest events, workshops, seminars, and cultural activities happening at JLU Bhopal.
          </p>
        </div>

        {/* Navigation Arrows - Positioned Independently */}
        <div className="absolute flex justify-center gap-4" style={{ top: '50%', left: '72%', transform: 'translateX(-50%)' }}>
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
