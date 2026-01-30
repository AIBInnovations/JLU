'use client';

import { motion } from 'framer-motion';
import { ProgramsList } from './ProgramsList';

const Programs = () => {
  return (
    <section className="w-screen bg-[#f6f7f0] m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div className="relative w-screen m-0 p-0">
        {/* Image Placeholder */}
        <div
          className="bg-[#d1d1d1] w-screen"
          style={{
            minHeight: '100vh',
          }}
        />

        {/* Text Overlay at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            paddingLeft: '120px',
            paddingRight: '120px',
            paddingBottom: '32px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1200px' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21313c] mb-4">
              Programs
            </h1>
            <p className="text-base md:text-lg text-[#21313c] max-w-2xl">
              Discover industry-aligned programs designed to build strong foundations, practical skills, and real-world readiness.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 52+ Programs Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto pt-36 pb-16"
          style={{
            maxWidth: '1440px',
            paddingLeft: '120px',
            paddingRight: '120px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
              52+ Programs offered
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#21313c] max-w-3xl">
              At Jagran Lakecity University, we offer a diverse range of 50+ programs, each designed to provide students with a strong foundation of knowledge, practical skills, and hands-on experience in their chosen field of study.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Programs List */}
      <ProgramsList />
    </section>
  );
};

export { Programs };
export default Programs;
