'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const galleryPhotos = [
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1426.JPG', alt: 'Ignited Mind Awards - Award Presentation' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1441.JPG', alt: 'Ignited Mind Awards - Felicitation' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/Copy%20of%20DSC_4378.JPG', alt: 'Ignited Mind Awards - Ceremony Highlight' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/Copy%20of%20DSC_4398.JPG', alt: 'Ignited Mind Awards - Guest of Honour' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/Copy%20of%20DSC_4644.JPG', alt: 'Ignited Mind Awards - Stage Event' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/Copy%20of%20DSC_4645.JPG', alt: 'Ignited Mind Awards - Audience' },
  { src: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/DSC_4579.JPG', alt: 'Ignited Mind Awards - Award Ceremony' },
];

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
          className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-16 pb-6 md:pb-10"
          style={{ borderBottom: '1px solid #e5e5e5' }}
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Awards
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              JLU Ignited Mind{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Awards
              </span>
            </h1>
          </div>
          <p
            className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] max-w-full md:max-w-[600px] text-right ml-auto"
            style={{ lineHeight: 1.7, fontWeight: 400 }}
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
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1081.JPG"
              alt="JLU Ignited Mind Awards Ceremony"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
              <span
                className="text-[#f4c950] text-xl md:text-2xl font-bold uppercase tracking-widest block mb-3"
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
                className="text-white/80 text-sm sm:text-base md:text-lg max-w-[95%] md:max-w-[90%]"
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
                className="text-[#666] text-base md:text-lg mb-6"
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
                    <h4 className="text-[#21313c] text-xl md:text-2xl font-bold mb-1">
                      {item.category}
                    </h4>
                    <p className="text-[#999] text-sm md:text-base" style={{ lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Gallery - Infinite Loop Carousel */}
        <div className="mt-10 md:mt-16 overflow-hidden">
          <motion.div
            className="flex gap-3 md:gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              },
            }}
            style={{ width: 'max-content' }}
          >
            {[...galleryPhotos, ...galleryPhotos].map((photo, index) => (
              <div
                key={`${photo.src}-${index}`}
                className="relative overflow-hidden rounded-xl flex-shrink-0"
                style={{ width: '280px', height: '200px' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { IgnitedMindAwards };
export default IgnitedMindAwards;
