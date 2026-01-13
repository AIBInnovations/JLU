import { useState } from 'react';

export const VoiceOfJlu = () => {
  const [activeCard, setActiveCard] = useState<number | null>(7);

  const voices = [
    { image: '/a.jpg', name: 'John Doe', title: 'B.Tech I Year' },
    { image: '/b.jpg', name: 'Jane Smith', title: 'MBA II Year' },
    { image: '/c.jpg', name: 'Alex Johnson', title: 'B.Sc III Year' },
    { image: '/d.jpg', name: 'Emily Davis', title: 'B.Com I Year' },
    { image: '/e.jpg', name: 'Michael Brown', title: 'M.Tech II Year' },
    { image: '/f.jpg', name: 'Sarah Wilson', title: 'BBA I Year' },
    { image: '/g.jpg', name: 'David Lee', title: 'B.Tech II Year' },
    { image: '/h.jpg', name: 'Emma Taylor', title: 'MBA I Year' },
    { image: '/i.jpg', name: 'Chris Martin', title: 'B.Sc II Year' },
  ];

  const faculty = [
    { image: '/aa.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
    { image: '/bb.png', name: 'Mr. Pankaj Das', title: 'Registrar' },
    { image: '/cc.png', name: 'Dr. Nilanjan Chattopadhyay', title: 'Vice Chancellor' },
    { image: '/dd.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
    { image: '/ee.png', name: 'Mr. Pankaj Das', title: 'Registrar' },
    { image: '/ff.png', name: 'Shri. Abhishek Mohan Gupta', title: 'Pro - Chancellor' },
  ];

  return (
    <section className="bg-[#f6f7f0] pt-32 md:pt-48 pb-16 md:pb-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21313c] mb-4">
          VOICES OF JLU
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto">
          Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque pharetra facilisi amet.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex justify-between items-center px-6">
        {voices.map((voice, index) => (
          <div
            key={index}
            className="relative cursor-pointer transition-all duration-300 overflow-hidden"
            style={{
              width: index === activeCard ? 'clamp(200px, 31vw, 597px)' : 'clamp(60px, 7.6vw, 146px)',
              height: 'clamp(280px, 36vw, 696px)',
              borderRadius: index === activeCard ? '60px' : '80px',
            }}
            onClick={() => setActiveCard(index === activeCard ? null : index)}
          >
            <img
              src={voice.image}
              alt={voice.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ objectPosition: index === 2 ? '70% 20%' : index === 8 ? '30% 20%' : 'center 20%' }}
            />

            {/* Overlay with text - only show on active card */}
            {index === activeCard && (
              <div className="absolute inset-0">
                {/* Frosted glass card at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 pt-10 lg:pt-12"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    borderBottomLeftRadius: '60px',
                    borderBottomRightRadius: '60px',
                  }}
                >
                  <h3 className="text-white font-bold text-sm lg:text-base">
                    {voice.name} ({voice.title})
                  </h3>
                  <p className="text-white/90 text-xs lg:text-sm mt-1.5 leading-relaxed">
                    "Lorem ipsum dolor sit amet consectetur. Rhoncus erat sagittis sed nisl."
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Our Faculty Section */}
      <div className="mt-16 md:mt-24 lg:mt-32 px-4 md:px-12 lg:px-24">
        {/* Faculty Header */}
        <div className="flex justify-between items-start mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#21313c]">
            OUR FACULTY
          </h2>
          <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#21313c]">
            2025
          </span>
        </div>

        {/* Faculty Grid */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* First Row */}
          <div className="flex justify-end gap-4 lg:gap-6">
            {faculty.slice(0, 3).map((member, index) => (
              <div
                key={index}
                style={{
                  width: 'clamp(150px, 17.6vw, 338px)',
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    width: '100%',
                    height: 'clamp(200px, 20.8vw, 400px)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-start gap-4 lg:gap-6">
            {faculty.slice(3, 6).map((member, index) => (
              <div
                key={index + 3}
                style={{
                  width: 'clamp(150px, 17.6vw, 338px)',
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    width: '100%',
                    height: 'clamp(200px, 20.8vw, 400px)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-[#21313c] font-semibold text-sm md:text-base lg:text-lg">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
