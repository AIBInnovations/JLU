'use client';

import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const governanceBodies = [
  'Governing Body',
  'Board of Management',
  'Academic Council',
];

const Governance = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Governance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-20 mb-12 md:mb-20"
        >
          {/* Left Column: Heading and Governance Bodies */}
          <div className="flex-1">
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Structure
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)] mb-6 md:mb-8"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Governance
              </span>
            </h2>

            {/* Two column: Paragraphs + Bodies List side by side */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Paragraphs */}
              <div className="flex-1 space-y-4 order-2 md:order-1">
                <p
                  className="text-[#666] text-sm md:text-[15px]"
                  style={{ lineHeight: 1.7 }}
                >
                  Strong governance ensures that JLU grows with clarity of purpose and integrity of action. The university's academic and administrative leadership work together to uphold standards, inspire innovation and guide long term institutional development.
                </p>
                <p
                  className="text-[#666] text-sm md:text-[15px]"
                  style={{ lineHeight: 1.7 }}
                >
                  These bodies play a key role in shaping academic direction, institutional policies and strategic growth, ensuring that JLU remains responsive to educational needs and global standards.
                </p>
              </div>

              {/* Governance Bodies List */}
              <div className="w-full md:w-auto md:min-w-[280px] order-1 md:order-2 md:-mt-6">
                {governanceBodies.map((body, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                    viewport={{ once: true }}
                    className="group flex items-center justify-between py-4 border-b border-[#e5e5e5] cursor-pointer hover:bg-[#fafafa] transition-colors -mx-4 px-4 md:mx-0 md:px-0"
                  >
                    <span className="text-[#21313c] text-sm md:text-[15px] font-medium">
                      {body}
                    </span>
                    <span className="text-[#21313c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* JLU Leadership Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image with reveal */}
          <motion.div
            initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden"
          >
            <img
              src="/leader.jpg"
              alt="JLU Leadership"
              className="object-cover object-top w-full h-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Team
            </span>
            <h3
              className="text-[#21313c] text-xl sm:text-2xl md:text-[clamp(1.75rem,3vw,2.5rem)] mb-4 md:mb-6"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              JLU{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Leadership
              </span>
            </h3>
            <p
              className="text-[#666] text-sm md:text-[15px]"
              style={{ lineHeight: 1.7 }}
            >
              Leadership at JLU is inclusive and collaborative. Academic leaders, administrators and faculty work together to create an environment that supports innovation, learning and student growth. The structure reflects a belief in shared responsibility and open dialogue.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Governance };
export default Governance;
