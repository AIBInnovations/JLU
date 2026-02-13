'use client';

export const CampusSection = () => {
  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <p
            className="text-xs md:text-sm mb-4"
            style={{ color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            LIFE AT JLU
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#21313c] mb-4"
            style={{ fontWeight: 600, lineHeight: 1.1 }}
          >
            A Campus Built for{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>Tomorrow</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Spread across 40 acres in Chandanpur, Bhopal, JLU offers 14 ultra-modern academic blocks,
            4 auditoriums, 45+ laboratories, and the iconic pyramid-shaped library housing 42,000+ books.
          </p>
        </div>

        {/* Image Grid - 3 images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large image - Campus Aerial */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-full">
            <img
              src="/about1.jpg"
              alt="JLU Chandanpur Campus - 40 acre campus with pyramid library"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-white/70 text-xs tracking-widest uppercase">40-Acre Campus</span>
              <h3 className="text-white text-xl md:text-2xl font-semibold mt-1">
                Chandanpur Campus, Bhopal
              </h3>
              <p className="text-white/70 text-sm mt-2 max-w-md">
                14 academic blocks, 122 classrooms, and state-of-the-art facilities nestled in a green, serene environment.
              </p>
            </div>
          </div>

          {/* Right column - 2 stacked images */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/pro1.jpg"
                alt="JLU Pyramid Library - 42,000+ books"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white/70 text-xs tracking-widest uppercase">28,000 Sq Ft</span>
                <h3 className="text-white text-lg font-semibold mt-0.5">Pyramid Library</h3>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/ev3.jpg"
                alt="JLU INICIO Startup Event - Student Innovation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white/70 text-xs tracking-widest uppercase">Innovation Hub</span>
                <h3 className="text-white text-lg font-semibold mt-0.5">Student-Led Initiatives</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 md:mt-14">
          {[
            { number: '14', label: 'Academic Blocks' },
            { number: '45+', label: 'Laboratories' },
            { number: '4', label: 'Auditoriums' },
            { number: '2,500+', label: 'Students' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#03463B]">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
