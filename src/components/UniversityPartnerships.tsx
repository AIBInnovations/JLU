'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const UniversityPartnerships = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* University Partnerships Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-10 md:mb-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Global Network
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)] mb-4 md:mb-6"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              University{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Partnerships
              </span>
            </h2>
            <p
              className="text-[#666] text-sm md:text-[15px]"
              style={{ lineHeight: 1.7 }}
            >
              Global partnerships form an integral part of JLU's academic ecosystem. Collaborations with universities and institutions across the world bring international learning environments, diverse perspectives and shared academic practices into the classroom.
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden"
          >
            <Image
              src="https://jlu.edu.in/wp-content/uploads/2023/07/JLU-Partnership.jpg"
              alt="University Partnerships"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Honorary Doctorates and JLU Ignited Mind Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Honorary Doctorates */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="group relative overflow-hidden min-h-[320px] sm:min-h-[400px] md:min-h-[450px] rounded-xl"
          >
            <Image
              src="/ex1.jpg"
              alt="Honorary Doctorates"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10">
              <span
                className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-[9px] sm:text-[10px] md:text-[11px]"
                style={{ letterSpacing: '0.2em' }}
              >
                01 — Recognition
              </span>
              <h3
                className="text-white mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-[28px]"
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                Honorary Doctorates
              </h3>
              <p
                className="text-white/80 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
                style={{ lineHeight: 1.7 }}
              >
                Jagran Lakecity University has conferred honorary doctorates upon distinguished individuals who have made exceptional contributions to their fields and to society.
              </p>
            </div>
          </motion.div>

          {/* JLU Ignited Mind Awards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
            className="group relative overflow-hidden min-h-[320px] sm:min-h-[400px] md:min-h-[450px] rounded-xl"
          >
            <Image
              src="/ex.jpg"
              alt="JLU Ignited Mind Awards"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-10">
              <span
                className="text-white/60 uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 text-[9px] sm:text-[10px] md:text-[11px]"
                style={{ letterSpacing: '0.2em' }}
              >
                02 — Awards
              </span>
              <h3
                className="text-white mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-[28px]"
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                JLU Ignited Mind Awards
              </h3>
              <p
                className="text-white/80 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
                style={{ lineHeight: 1.7 }}
              >
                The Ignited Mind Awards recognise individuals who embody innovation, leadership and positive change. They celebrate voices that inspire and contribute meaningfully to society.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { UniversityPartnerships };
export default UniversityPartnerships;
