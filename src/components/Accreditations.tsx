'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Accreditations = () => {
  const images = ['/l1.jpg', '/l2.jpg', '/l3.jpg', '/l4.jpg', '/l5.jpg', '/l6.jpg', '/l7.jpg', '/l8.jpg'];

  return (
    <section className="bg-[#f6f7f0] py-20" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
      <div className="max-w-360 mx-auto">
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
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-square w-full"
            >
              <Image
                src={src}
                alt={`Accreditation ${index + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
              {/* 10% Black Overlay */}
              <div className="absolute inset-0 bg-black/10 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Accreditations };
export default Accreditations;
