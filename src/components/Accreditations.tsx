'use client';

import { motion } from 'framer-motion';

const Accreditations = () => {
  // Create array of 8 items for the boxes
  const boxes = Array.from({ length: 8 }, (_, i) => i + 1);

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
          Accreditations & Memberships
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-base md:text-lg leading-relaxed text-[#21313c] mb-12 max-w-4xl"
        >
          JLU's academic quality and institutional practices are strengthened through accreditations and memberships with recognised national and international bodies. These associations reflect the university's commitment to high standards, continuous improvement and global alignment.
        </motion.p>

        {/* Grid of 8 boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {boxes.map((box, index) => (
            <motion.div
              key={box}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#d1d1d1] mx-auto"
              style={{
                width: '270px',
                height: '270px',
                maxWidth: '100%',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Accreditations };
export default Accreditations;
