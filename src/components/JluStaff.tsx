'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const facultyMembers = [
  {
    name: 'Prof. (Dr.) Manika Walia',
    title: 'Dean, Faculty of Fashion, Design & Arts',
    image: '/manika-walia.png',
  },
  {
    name: 'Prof. (Dr.) Sachin Rastogi',
    title: 'Dean, Faculty of Law',
    image: '/sachin-rastogi.jpg',
  },
  {
    name: 'Prof. (Dr.) Kishore Kumar Morya',
    title: 'Dean, Faculty of Management',
    image: '/kishore-kumar-morya.png',
  },
  {
    name: 'Dr. Prasheel Suryawanshi',
    title: 'Pro Vice Chancellor — Science & Technology',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/pvc-science-tech-new.JPG',
  },
  {
    name: 'Prof. (Dr.) Vivek Khare',
    title: 'Pro Vice Chancellor — Student Welfare',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/pvc-student-welfare-new.JPG',
  },
  {
    name: 'Mr. Pankaj Kumar Das',
    title: 'Registrar',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/registrar-new.JPG',
  },
  {
    name: 'Dr. Rushit Dubal',
    title: 'Assistant Dean, Faculty of Media & Social Science',
    image: '/dr-rushit-dubal.jpg',
  },
  {
    name: 'Ms. Ladli Goyal',
    title: 'Chief Financial Officer',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/ladli-goyal.jpeg',
  },
];

const JluStaff = () => {
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
          className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 md:mb-12"
        >
          <div className="mb-6 md:mb-0">
            <span
              className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Our People
            </span>
            <h1
              className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.1 }}
            >
              JLU{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Staff
              </span>
            </h1>
          </div>
          <p
            className="text-[#666] text-sm sm:text-base md:text-[clamp(1.15rem,1.8vw,1.5rem)] md:text-right mt-4 md:mt-10 md:ml-auto md:max-w-[520px]"
            style={{ lineHeight: 1.7, fontWeight: 400 }}
          >
            Behind every classroom, event and initiative is a dedicated team of academic and administrative leaders that supports the university&apos;s everyday functioning.
          </p>
        </motion.div>

        {/* Faculty/Staff Portrait Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {facultyMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: customEase }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-[#21313c]"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                <p className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight">
                  {member.name}
                </p>
                <p className="text-white/70 text-[10px] sm:text-xs md:text-sm mt-1 leading-snug">
                  {member.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <Link
            href="/faculties"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#21313c] hover:bg-[#2d3f4a] text-white font-semibold rounded-full text-sm md:text-base transition-colors"
          >
            View All Faculties
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export { JluStaff };
export default JluStaff;
