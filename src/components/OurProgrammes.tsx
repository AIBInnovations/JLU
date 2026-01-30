'use client';

import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export const OurProgrammes = () => {
  const isMobile = useIsMobile();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const programmes = [
    { image: '/p1.jpg', title: 'Undergraduate', subtitle: 'Programmes', width: 461, height: 520 },
    { image: '/p2.jpg', title: 'Postgraduate', subtitle: 'Programmes', width: 461, height: 520 },
    { image: '/p3.jpg', title: 'Ph.D.', subtitle: 'Programmes', width: 461, height: 520 },
    { image: '/p4.jpg', title: 'Diplomas &', subtitle: 'Certifications', width: 461, height: 520 },
  ];



  return (
    <section className="bg-[#f6f7f0] py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c] mb-4">
          Learning, Unbounded
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Education here resists confinement.<br />
          It takes shape in studios and libraries, in late conversations and early ideas, through collaboration as much as quiet contemplation.
        </p>
        <div className="mx-auto mt-6" style={{ width: '274px', height: '0px', border: '4px solid #B2FF53' }} />
      </div>

      {/* Programme Cards */}
      <div
        className="flex justify-center"
        style={{
          padding: isMobile ? '0 4px' : '0 23px',
          gap: isMobile ? '2px' : '10px'
        }}
      >
        {programmes.map((programme, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer group rounded-2xl"
            style={{
              width: isMobile ? 'calc((100vw - 14px) / 4)' : `${programme.width}px`,
              height: isMobile ? '180px' : `${programme.height}px`,
            }}
            onClick={() => isMobile && setActiveCard(activeCard === index ? null : index)}
          >
            <img
              src={programme.image}
              alt={programme.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                transform: isMobile && activeCard === index ? 'scale(1.08)' : 'scale(1)',
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div
              className="absolute text-white"
              style={{
                top: isMobile ? '8px' : '24px',
                left: isMobile ? '6px' : '24px'
              }}
            >
              <h3
                className="font-bold leading-tight"
                style={{ fontSize: isMobile ? '0.55rem' : 'clamp(1.5rem, 2vw, 1.875rem)' }}
              >
                {programme.title}
              </h3>
              <p
                className="font-bold"
                style={{ fontSize: isMobile ? '0.55rem' : 'clamp(1.25rem, 1.5vw, 1.5rem)' }}
              >
                {programme.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-4 md:mt-8">
        <button
          className="flex items-center bg-[#c3fd7a] text-[#21313c] rounded-full font-semibold hover:bg-[#b3ed6a] transition-colors"
          style={{
            gap: isMobile ? '4px' : '8px',
            padding: isMobile ? '4px 10px' : '12px 24px',
            fontSize: isMobile ? '0.5rem' : '0.875rem'
          }}
        >
          View All Courses
          <svg
            className="fill-none stroke-current"
            style={{ width: isMobile ? '10px' : '16px', height: isMobile ? '10px' : '16px' }}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Text Section - Hero style layout */}
      <div className="mt-16 md:mt-24 px-6 md:px-12 lg:px-24">
        {/* Big Text - Left aligned */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#21313c] leading-tight lg:w-1/2">
            Learning at JLU is not limited to schedules or spaces. It evolves through experience, interaction, and reflection, shaped by people, moments, and curiosity.
          </h3>
        </div>

        {/* Small Text - Right aligned */}
        <div className="flex justify-end">
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed lg:w-1/2">
            It remains relevant because it stays connected to the world beyond campus, and personal because it grows with each individual who experiences it.
          </p>
        </div>
      </div>

      {/* Partners Section */}
      {isMobile ? (
        /* Mobile: Same layout as desktop */
        <div className="mt-8 px-1">
          {/* First Row - 2 boxes */}
          <div>
            <p style={{ fontSize: '0.4rem' }} className="text-gray-500 mb-1">Lorem ipsum</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 4px)', height: '70px' }}
              >
                <img src="/mid.png" alt="Middlesex University" style={{ maxHeight: '35px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(50vw - 4px)', height: '70px' }}
              >
                <img src="/king.png" alt="King's College London" style={{ maxHeight: '35px' }} className="object-contain" />
              </div>
            </div>
          </div>

          {/* Second Row - 3 boxes */}
          <div className="mt-2">
            <p style={{ fontSize: '0.4rem' }} className="text-gray-500 mb-1">Lorem ipsum</p>
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/nus.png" alt="NUS" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/c11.png" alt="CII" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/ficci.png" alt="FICCI" style={{ maxHeight: '30px' }} className="object-contain" />
              </div>
            </div>

            {/* Third Row - 3 boxes (1 with content, 2 empty) */}
            <div className="flex">
              <div
                className="border border-t-0 border-gray-300 flex items-center justify-center"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                <img src="/gt.png" alt="Grant Thornton" style={{ maxHeight: '22px' }} className="object-contain" />
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                {/* Empty box */}
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300"
                style={{ width: 'calc(33.33vw - 2.67px)', height: '60px' }}
              >
                {/* Empty box */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop: Original layout */
        <div className="mt-16 md:mt-24" style={{ padding: '0 23px' }}>
          {/* First Row - 2 boxes left aligned */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Lorem ipsum</p>
            <div className="flex">
              {/* Middlesex */}
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: '472px', height: '284px' }}
              >
                <img
                  src="/mid.png"
                  alt="Middlesex University"
                  className="max-h-28 object-contain"
                />
              </div>
              {/* King's College */}
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: '472px', height: '284px' }}
              >
                <img
                  src="/king.png"
                  alt="King's College London"
                  className="max-h-28 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bottom boxes - 6 boxes (625x240) */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-2">Lorem ipsum</p>

            {/* Second Row - 3 boxes (NUS, CII, FICCI) */}
            <div className="flex">
              <div
                className="border border-gray-300 flex items-center justify-center"
                style={{ width: '625px', height: '240px' }}
              >
                <img
                  src="/nus.png"
                  alt="NUS"
                  className="max-h-24 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: '625px', height: '240px' }}
              >
                <img
                  src="/c11.png"
                  alt="CII"
                  className="max-h-24 object-contain"
                />
              </div>
              <div
                className="border border-l-0 border-gray-300 flex items-center justify-center"
                style={{ width: '625px', height: '240px' }}
              >
                <img
                  src="/ficci.png"
                  alt="FICCI"
                  className="max-h-24 object-contain"
                />
              </div>
            </div>

            {/* Third Row - Grant Thornton + empty boxes */}
            <div className="flex">
              <div
                className="border border-t-0 border-gray-300 flex items-center justify-center"
                style={{ width: '625px', height: '240px' }}
              >
                <img
                  src="/gt.png"
                  alt="Grant Thornton"
                  className="max-h-16 object-contain"
                />
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300"
                style={{ width: '625px', height: '240px' }}
              >
                {/* Empty box */}
              </div>
              <div
                className="border border-t-0 border-l-0 border-gray-300"
                style={{ width: '625px', height: '240px' }}
              >
                {/* Empty box */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Three Image Cards Section */}
      <div className="mt-8 md:mt-24" style={{ padding: isMobile ? '0 16px' : '0 10px' }}>
        <div className="flex" style={{ gap: isMobile ? '16px' : '10px' }}>
          {/* First card - l */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '180px' : 'auto',
              maxHeight: isMobile ? '180px' : '739px',
              marginTop: isMobile ? '8px' : 'clamp(0px, 1.4vw, 27px)',
            }}
          >
            <img
              src="/l.jpg"
              alt="Image 1"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Second card - ll */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '160px' : 'auto',
              maxHeight: isMobile ? '160px' : '661px',
              marginTop: isMobile ? '28px' : 'clamp(0px, 5.5vw, 105px)',
            }}
          >
            <img
              src="/ll.jpg"
              alt="Image 2"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Third card - lll */}
          <div
            className="overflow-hidden flex-1 rounded-t-2xl group cursor-pointer"
            style={{
              height: isMobile ? '188px' : 'auto',
              maxHeight: isMobile ? '188px' : '766px',
            }}
          >
            <img
              src="/lll.jpg"
              alt="Image 3"
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
