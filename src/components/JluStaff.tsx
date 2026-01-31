'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const JluStaff = () => {
  return (
    <section className="bg-[#f6f7f0] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#21313c] mb-8"
        >
          JLU Staff
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg leading-relaxed text-[#21313c] mb-12 max-w-4xl"
        >
          Behind every classroom, event and initiative is a dedicated team that supports the university's everyday functioning. JLU's staff form the backbone of the institution, contributing with commitment, care and professionalism.
        </motion.p>

        {/* Staff Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div
            className="relative mx-auto"
            style={{
              width: '1200px',
              height: '500px',
              maxWidth: '100%',
            }}
          >
            <Image
              src="/staff.jpg"
              alt="JLU Staff"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { JluStaff };
export default JluStaff;
