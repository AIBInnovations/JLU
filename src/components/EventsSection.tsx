import { useState } from 'react';

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
  const visibleCards = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(events.length - visibleCards, prev + 1));
  };

  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-4">
          UPCOMING EVENTS
        </h2>
        <div className="mx-auto" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">
          {/* Left side - Title */}
          <div
            className="lg:shrink-0 flex flex-col justify-between"
            style={{ height: 'clamp(280px, 20vw, 389px)' }}
          >
            <div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21313c] leading-tight mb-4">
                SEE WHAT's
                <br />
                GOING ON
              </h3>
              <p className="text-gray-600 text-sm md:text-base max-w-xs">
                Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque
              </p>
            </div>
            <button className="bg-[#c3fd7a] text-[#21313c] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#b3ed6a] transition-colors w-fit">
              View full Calender
            </button>
          </div>

          {/* Right side - Event Cards Carousel */}
          <div className="lg:flex-1 overflow-hidden py-4 pl-4">
            <div
              className="flex gap-4 md:gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-[#f6f7f0] overflow-hidden shrink-0 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  style={{
                    width: 'clamp(320px, 26vw, 501px)',
                    height: 'clamp(280px, 20vw, 389px)',
                  }}
                >
                  {/* Card Content */}
                  <div className="p-5 md:p-6 flex flex-col h-full">
                    <div className="flex gap-4">
                      {/* Date Badge */}
                      <div className={`${event.color} text-white p-3 text-center shrink-0`} style={{ minWidth: '60px' }}>
                        <div className="text-xs font-medium">{event.month}</div>
                        <div className="text-2xl md:text-3xl font-bold">{event.day}</div>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-[#21313c] text-sm md:text-base leading-snug">
                        {event.title}
                      </h4>
                    </div>

                    {/* Event Details */}
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>

                      {/* Read More */}
                      <a
                        href="#"
                        className="text-[#8bc34a] font-semibold text-sm mt-2 inline-block hover:underline"
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
      <div className="mt-16 md:mt-24 overflow-hidden">
        <div className="flex animate-scroll">
          {/* First set of images */}
          {galleryImages.map((image, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0 mx-2"
              style={{
                width: 'clamp(350px, 29vw, 552px)',
                height: 'clamp(380px, 32vw, 606px)',
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
              className="shrink-0 mx-2"
              style={{
                width: 'clamp(350px, 29vw, 552px)',
                height: 'clamp(380px, 32vw, 606px)',
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
