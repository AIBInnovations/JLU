'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Accreditations = () => {
  const images = ['/l1.jpg', '/l2.jpg', '/l3.jpg', '/l4.jpg', '/l5.jpg', '/l6.jpg', '/l7.jpg', '/l8.jpg'];

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
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Recognition
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Accreditations &{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Memberships
              </span>
            </h2>
          </div>
          <p
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            JLU's academic quality and institutional practices are strengthened through accreditations and memberships with recognised national and international bodies.
          </p>
        </motion.div>

        {/* Grid of 8 boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: customEase }}
              viewport={{ once: true }}
              className="group relative overflow-hidden aspect-square w-full rounded-xl cursor-pointer"
            >
              <Image
                src={src}
                alt={`Accreditation ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Accreditations };
export default Accreditations;
