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
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const visibleCards = 3; // Same for mobile and desktop

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(events.length - visibleCards, prev + 1));
  };

  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-4">
          Moments worth stepping into
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Conversations that provoke thought, gatherings that celebrate culture, and experiences that bring the community together.
        </p>
        <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto mt-3">
          Campus life moves with intention, offering moments to participate, reflect, and engage.
        </p>
        <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </div>

      {/* Content */}
      <div className="px-2 md:px-12 lg:px-24">
        <div className="flex flex-row gap-2 md:gap-6 lg:gap-12 items-start">
          {/* Left side - Title */}
          <div
            className="shrink-0 flex flex-col"
            style={{
              height: isMobile ? '180px' : 'clamp(280px, 20vw, 389px)',
              width: isMobile ? 'calc((100vw - 40px) / 3)' : 'auto',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
              <h3
                className="font-bold text-[#21313c] leading-tight"
                style={{ fontSize: isMobile ? '0.85rem' : 'clamp(1.875rem, 4vw, 3.75rem)', marginBottom: isMobile ? '4px' : '16px' }}
              >
                SEE WHAT's
                <br />
                GOING ON
              </h3>
              <p
                className="text-gray-600"
                style={{
                  fontSize: isMobile ? '0.5rem' : 'clamp(0.875rem, 1vw, 1rem)',
                  maxWidth: isMobile ? '100%' : '20rem',
                  lineHeight: 1.3,
                  marginBottom: isMobile ? '4px' : '0'
                }}
              >
                {isMobile ? 'Lorem ipsum dolor sit amet consectetur.' : 'Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque'}
              </p>
            </div>
            <button
              className="bg-[#c3fd7a] text-[#21313c] rounded-full font-semibold hover:bg-[#b3ed6a] transition-colors w-fit"
              style={{
                padding: isMobile ? '2px 6px' : '12px 24px',
                fontSize: isMobile ? '0.35rem' : '0.875rem',
                marginTop: isMobile ? '2px' : '0'
              }}
            >
              View full Calender
            </button>
          </div>

          {/* Right side - Event Cards Carousel */}
          <div className="flex-1 overflow-hidden py-2 md:py-4">
            <div
              className="flex gap-2 md:gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-[#f6f7f0] overflow-hidden shrink-0 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  style={{
                    width: isMobile ? 'calc((100vw - 40px) / 3)' : 'clamp(320px, 26vw, 501px)',
                    height: isMobile ? '180px' : 'clamp(280px, 20vw, 389px)',
                  }}
                >
                  {/* Card Content */}
                  <div className={`${isMobile ? 'p-2' : 'p-5 md:p-6'} flex flex-col h-full`}>
                    <div className={`flex ${isMobile ? 'flex-col gap-1' : 'gap-4'}`}>
                      {/* Date Badge */}
                      <div
                        className={`${event.color} text-white text-center shrink-0`}
                        style={{
                          minWidth: isMobile ? '35px' : '60px',
                          padding: isMobile ? '4px' : '12px'
                        }}
                      >
                        <div className={`${isMobile ? 'text-[8px]' : 'text-xs'} font-medium`}>{event.month}</div>
                        <div className={`${isMobile ? 'text-sm' : 'text-2xl md:text-3xl'} font-bold`}>{event.day}</div>
                      </div>

                      {/* Title */}
                      <h4 className={`font-semibold text-[#21313c] ${isMobile ? 'text-[8px] leading-tight' : 'text-sm md:text-base leading-snug'}`}>
                        {isMobile ? event.title.substring(0, 40) + '...' : event.title}
                      </h4>
                    </div>

                    {/* Event Details */}
                    <div className={`mt-auto ${isMobile ? 'space-y-0.5' : 'space-y-2'}`}>
                      <div className={`flex items-center gap-1 text-gray-500 ${isMobile ? 'text-[7px]' : 'text-xs md:text-sm'}`}>
                        <svg className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4'} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {isMobile ? event.time.split(' ').slice(0, 2).join(' ') : event.time}
                      </div>
                      <div className={`flex items-center gap-1 text-gray-500 ${isMobile ? 'text-[7px]' : 'text-xs md:text-sm'}`}>
                        <svg className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4'} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {isMobile ? event.location.split(',')[0] : event.location}
                      </div>

                      {/* Read More */}
                      <a
                        href="#"
                        className={`text-[#8bc34a] font-semibold ${isMobile ? 'text-[8px]' : 'text-sm'} mt-1 inline-block hover:underline`}
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8 md:mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= events.length - visibleCards}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Infinite Scroll Gallery */}
      <div className="mt-12 md:mt-24 overflow-hidden">
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
                className="w-full h-full object-cover"
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
                className="w-full h-full object-cover"
              />
            </div>
          ))}
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
