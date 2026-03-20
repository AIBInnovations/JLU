'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const doctorates = [
  {
    name: 'Padmabhushan Smt. Sudha Murty',
    designation: 'Founder of Infosys Foundation and Chairperson of the Murthy Trust. Educationist, Philanthropist and Author.',
    honour: 'Padma Bhushan',
    convocation: '2023',
    image: '/sudha-murty-jlu.jpg',
    objectPosition: '25% center',
  },
  {
    name: 'Late Shri Piyush Pandey',
    designation: 'Chairman of Global Creative & Executive Chairman, Ogilvy India. An extraordinary leader, passionate man of big ideas and an innovator with a focus on the indigenous in the world of advertising.',
    honour: 'Padma Shri',
    convocation: '2023',
    image: '/8th-convo-jlu.jpg',
    objectPosition: 'center center',
  },
  {
    name: 'Dr. Peter P. Laurel',
    designation: 'President of Lyceum of the Philippines University, Batangas & Laguna campuses. Former President of AUAP and PACU. Author, poet and founder of cultural, educational and peace research institutions.',
    honour: 'International Academic Leader',
    convocation: '2024',
    image: '/7th-convo-jlu.jpeg',
    objectPosition: 'center 30%',
  },
  {
    name: 'Padmabhushan Shri Rajeev Sethi',
    designation: 'An extraordinary designer, noted internationally for his innovative contribution to preserving and celebrating the subcontinent\'s rich cultural heritage. Has designed and curated award-winning exhibitions in Asia, Europe, Canada and America.',
    honour: 'Padma Bhushan',
    convocation: '2024',
    image: '/adille-jlu-full.jpg',
    objectPosition: 'center 20%',
  },
  {
    name: 'Mr. Cyril Shroff',
    designation: 'A legendary figure in the Indian Legal Community, often referred to as the \'M&A King of India\'. Consistently ranked as \'Eminent Practitioner\' in India by Chambers Global.',
    honour: 'Legal Luminary',
    convocation: '2024',
    image: '/jlu-mgt-award.jpg',
    objectPosition: 'center center',
  },
  {
    name: 'Shri Sunil Sethi',
    designation: 'Chairman of the Fashion Design Council of India (FDCI). An eminent industry leader, visionary entrepreneur, and one of India\'s foremost champions of fashion, handloom and the creative industries.',
    honour: 'Industry Leader',
    convocation: '2025',
    image: '/6th-convo-jlu.jpg',
    objectPosition: '80% center',
  },
];

const HonoraryDoctorates = () => {
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
              className="text-[#999] uppercase tracking-widest block text-[12px] sm:text-xs mb-3 md:mb-4"
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
              Honorary{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Doctorate
              </span>
              {' '}
              <span className="text-base sm:text-lg md:text-xl text-[#999]" style={{ fontWeight: 400 }}>
                (Honoris Causa)
              </span>
            </h2>
            <p className="text-[#999] text-xs sm:text-sm mt-2" style={{ letterSpacing: '0.05em' }}>
              Recipients — Last 3 Years
            </p>
          </div>
          <p
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            Jagran Lakecity University has conferred Honorary Doctorates (Honoris Causa) upon distinguished individuals who have made exceptional contributions to their fields and to society.
          </p>
        </motion.div>

        {/* Doctorates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {doctorates.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: customEase }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl"
              style={{ aspectRatio: '3 / 4' }}
            >
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: person.objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 flex flex-col justify-end min-h-[160px] sm:min-h-[170px] md:min-h-[180px]">
                <span
                  className="text-[#f4c950] text-[11px] sm:text-[12px] uppercase tracking-widest block mb-2"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {person.convocation}
                </span>
                <h3
                  className="text-white text-base sm:text-lg md:text-xl mb-1"
                  style={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {person.name}
                </h3>
                <p className="text-white/70 text-[12px] sm:text-xs leading-relaxed mb-1 line-clamp-2">
                  {person.designation}
                </p>
                <p className="text-white/50 text-[12px] sm:text-[13px]">
                  {person.honour}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HonoraryDoctorates };
export default HonoraryDoctorates;
