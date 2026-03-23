'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Accreditations = () => {
  const accreditations = [
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/1.png', name: 'Bar Council of India', shortName: 'BCI' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/2.png', name: 'University Grants Commission', shortName: 'UGC' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/3.png', name: 'International Centre for Alternative Dispute Resolution', shortName: 'ICADR' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/4.png', name: 'Association of Universities of Asia and the Pacific', shortName: 'AUAP' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/5.png', name: 'Association of Indian Universities', shortName: 'AIU' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/6.png', name: 'AFS Intercultural Programs India', shortName: 'AFS' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/7.png', name: 'Tuning India', shortName: 'Tuning India' },
    { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/Untitled design/8.png', name: 'International Association of Law Schools', shortName: 'IALS' },
  ];

  return (
    <section className="w-full bg-[#f6f7f0]">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <span
            className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            Recognition
          </span>
          <h1
            className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Accreditations &{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              Memberships
            </span>
          </h1>
          <p
            className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full mt-4"
            style={{ lineHeight: 1.7, fontWeight: 400 }}
          >
            JLU's academic quality and institutional practices are strengthened through accreditations and memberships with recognised national and international bodies.
          </p>
        </motion.div>

        {/* Grid of 8 boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {accreditations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: customEase }}
              viewport={{ once: true }}
              className="group flex flex-col items-center"
            >
              <div className="relative overflow-hidden aspect-square w-full rounded-xl bg-white border border-[#e5e5e5]">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-[#21313c] font-semibold text-sm md:text-base">{item.shortName}</p>
                <p className="text-[#999] text-xs md:text-sm leading-snug mt-0.5">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Accreditations };
export default Accreditations;
