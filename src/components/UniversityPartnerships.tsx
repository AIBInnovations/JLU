'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const UniversityPartnerships = () => {
  return (
    <section className="bg-[#f6f7f0] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* University Partnerships Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#21313c]">
              University Partnerships
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#21313c]">
              Global partnerships form an integral part of JLU's academic ecosystem. Collaborations with universities and institutions across the world bring international learning environments, diverse perspectives and shared academic practices into the classroom.
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div
              className="relative"
              style={{
                width: '580px',
                height: '400px',
                maxWidth: '100%',
              }}
            >
              <Image
                src="https://jlu.edu.in/wp-content/uploads/2023/07/JLU-Partnership.jpg"
                alt="University Partnerships"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Honorary Doctorates and JLU Ignited Mind Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          {/* Honorary Doctorates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-end text-right overflow-hidden p-8 w-full"
            style={{
              maxWidth: '580px',
              height: '400px',
              gap: '80px',
            }}
          >
            <Image
              src="/ex1.jpg"
              alt="Honorary Doctorates"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white">
              Honorary Doctorates
            </h3>
            <p className="relative z-10 text-sm md:text-base leading-relaxed text-white">
              Jagran Lakecity University has conferred honorary doctorates upon distinguished individuals who have made exceptional contributions to their fields and to society. These honours reflect respect for excellence, leadership and social impact.
            </p>
          </motion.div>

          {/* JLU Ignited Mind Awards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-end text-right overflow-hidden p-8 w-full"
            style={{
              maxWidth: '580px',
              height: '400px',
              gap: '80px',
            }}
          >
            <Image
              src="/ex.jpg"
              alt="JLU Ignited Mind Awards"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white">
              JLU Ignited Mind Awards
            </h3>
            <p className="relative z-10 text-sm md:text-base leading-relaxed text-white">
              The Ignited Mind Awards recognise individuals who embody innovation, leadership and positive change. They celebrate voices that inspire, challenge norms and contribute meaningfully to society.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { UniversityPartnerships };
export default UniversityPartnerships;
