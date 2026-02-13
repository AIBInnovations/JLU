'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const doctorates = [
  {
    name: 'Smt. Sudha Murty',
    designation: 'Author, Philanthropist & Chairperson, Murty Trust',
    honour: 'Padma Bhushan & Padma Shri',
    convocation: '8th Convocation, 2023',
    image: '/sudha-murty-jlu.jpg',
    objectPosition: '25% center',
  },
  {
    name: 'Shri Piyush Pandey',
    designation: 'Chairman of Global Creative & Executive Chairman, Ogilvy India',
    honour: 'Padma Shri',
    convocation: '7th & 8th Convocation, 2022–23',
    image: '/8th-convo-jlu.jpg',
    objectPosition: 'center center',
  },
  {
    name: 'Justice Uday Umesh Lalit',
    designation: 'Former Chief Justice of India',
    honour: '49th Chief Justice of India',
    convocation: '7th Convocation, 2022',
    image: '/7th-convo-jlu.jpeg',
    objectPosition: 'center 30%',
  },
  {
    name: 'Shri Adille J. Sumariwalla',
    designation: 'President, Athletics Federation of India',
    honour: 'Arjuna Awardee',
    convocation: '7th Convocation, 2022',
    image: '/adille-jlu-full.jpg',
    objectPosition: 'center 20%',
  },
  {
    name: 'Dr. K. Kasturirangan',
    designation: 'Chairman, NEP Drafting Committee & Eminent Space Scientist',
    honour: 'Padma Vibhushan',
    convocation: '6th Convocation, 2021',
    image: '/jlu-mgt-award.jpg',
    objectPosition: 'center center',
  },
  {
    name: 'Smt. Anju Bobby George',
    designation: 'Iconic Long Jump Champion of India',
    honour: 'Padma Shri, Khel Ratna & Arjuna Awardee',
    convocation: '6th Convocation, 2021',
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
              Honorary{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Doctorates
              </span>
            </h2>
          </div>
          <p
            className="text-[#666] text-sm md:text-base max-w-full md:max-w-[400px]"
            style={{ lineHeight: 1.7 }}
          >
            Jagran Lakecity University has conferred honorary doctorates upon distinguished individuals who have made exceptional contributions to their fields and to society.
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
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <span
                  className="text-[#f4c950] text-[9px] sm:text-[10px] uppercase tracking-widest block mb-2"
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
                <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed mb-1">
                  {person.designation}
                </p>
                <p className="text-white/50 text-[10px] sm:text-[11px]">
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
