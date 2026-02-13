'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IgnitedMindAwards = () => {
  return (
    <section className="w-full bg-white">
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
              Awards
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              JLU Ignited Mind{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Awards
              </span>
            </h2>
          </div>
          <p
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            The Ignited Mind Awards recognise individuals who embody innovation, leadership and positive change. They celebrate voices that inspire and contribute meaningfully to society.
          </p>
        </motion.div>

        {/* Awards Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left - Large Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-xl"
            style={{ aspectRatio: '4 / 5' }}
          >
            <Image
              src="/ev5.jpg"
              alt="JLU Ignited Mind Awards Ceremony"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
              <span
                className="text-[#f4c950] text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest block mb-3"
                style={{ letterSpacing: '0.2em' }}
              >
                Annual Ceremony
              </span>
              <h3
                className="text-white text-lg sm:text-xl md:text-[28px] mb-3"
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                Celebrating Extraordinary Minds
              </h3>
              <p
                className="text-white/80 text-xs sm:text-sm md:text-[15px] max-w-[95%] md:max-w-[90%]"
                style={{ lineHeight: 1.7 }}
              >
                Inspired by Dr. APJ Abdul Kalam&apos;s vision, the Ignited Mind Awards honour changemakers across fields — from education and social impact to arts, sports and entrepreneurship — who light the way for future generations.
              </p>
            </div>
          </motion.div>

          {/* Right - Content & Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: customEase }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p
                className="text-[#666] text-sm md:text-[15px] mb-6"
                style={{ lineHeight: 1.7 }}
              >
                Held annually at the JLU campus, the Ignited Mind Awards bring together luminaries, thought leaders and emerging voices to celebrate achievement that goes beyond personal success — honouring those who uplift communities and push boundaries.
              </p>
            </motion.div>

            {/* Award Categories */}
            <div className="space-y-4">
              {[
                {
                  category: 'Innovation & Entrepreneurship',
                  description: 'Recognising pioneers who create transformative solutions and inspire new ventures.',
                },
                {
                  category: 'Social Impact & Leadership',
                  description: 'Honouring individuals driving meaningful change in communities and institutions.',
                },
                {
                  category: 'Arts, Culture & Media',
                  description: 'Celebrating creative minds shaping narratives and cultural dialogue.',
                },
                {
                  category: 'Sports & Excellence',
                  description: 'Acknowledging athletes and coaches who demonstrate dedication and inspire youth.',
                },
                {
                  category: 'Education & Academia',
                  description: 'Recognising educators and researchers advancing knowledge and learning.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: customEase }}
                  viewport={{ once: true }}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-[#f6f7f0] transition-colors"
                  style={{ borderBottom: '1px solid #f0f0f0' }}
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ background: '#f4c950', color: '#21313c' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="text-[#21313c] text-sm md:text-[15px] font-semibold mb-1">
                      {item.category}
                    </h4>
                    <p className="text-[#999] text-xs md:text-[13px]" style={{ lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { IgnitedMindAwards };
export default IgnitedMindAwards;
