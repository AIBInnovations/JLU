'use client';

export const CtaBanner = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: '#f4c950' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left - Text */}
          <div className="max-w-xl">
            <p
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: '#21313c', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6 }}
            >
              ADMISSIONS OPEN 2026-27
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              Your Future Starts{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Here
              </span>
            </h1>
            <p className="text-[#21313c]/70 text-base md:text-lg leading-relaxed">
              Join 2,500+ students from 27 states and 8 countries at Central India&apos;s only QS Diamond-rated university.
              50+ programs, 42+ global partnerships, and 80%+ placement rate.
            </p>
          </div>

          {/* Right - Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/apply"
              className="bg-[#027ea1] text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#026a88] transition-all text-center"
            >
              Apply Now
            </a>
            <a
              href="/broucher/JLU-Brochure-2026.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#027ea1] text-[#027ea1] px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#027ea1] hover:text-white transition-all text-center"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10"
        style={{ background: '#21313c' }}
      />
      <div
        className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-10"
        style={{ background: '#21313c' }}
      />
    </section>
  );
};
