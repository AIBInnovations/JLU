'use client';

import { motion } from 'framer-motion';

const Governance = () => {
  return (
    <section className="bg-[#f6f7f0] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Governance Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#21313c] mb-12"
          >
            Governance
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-base md:text-lg leading-relaxed text-[#21313c]">
                Strong governance ensures that JLU grows with clarity of purpose and integrity of action. The university's academic and administrative leadership work together to uphold standards, inspire innovation and guide long term institutional development.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-[#21313c]">
                These bodies play a key role in shaping academic direction, institutional policies and strategic growth, ensuring that JLU remains responsive to educational needs and global standards.
              </p>
            </motion.div>

            {/* Right - Governing Bodies List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 justify-center"
            >
              <div className="text-lg md:text-xl text-[#21313c]">Governing Body</div>
              <div className="text-lg md:text-xl text-[#21313c]">Board of Management</div>
              <div className="text-lg md:text-xl text-[#21313c]">Academic Council</div>
            </motion.div>
          </div>
        </div>

        {/* JLU Leadership Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img
              src="/leader.jpg"
              alt="JLU Leadership"
              className="object-cover object-top"
              style={{
                width: '580px',
                height: '357px',
                maxWidth: '100%',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c]">
              JLU Leadership
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#21313c]">
              Leadership at JLU is inclusive and collaborative. Academic leaders, administrators and faculty work together to create an environment that supports innovation, learning and student growth. The structure reflects a belief in shared responsibility and open dialogue.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Governance };
export default Governance;
