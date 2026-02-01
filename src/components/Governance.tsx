'use client';

import { motion } from 'framer-motion';

const governanceBodies = [
  'Governing Body',
  'Board of Management',
  'Academic Council',
];

const Governance = () => {
  return (
    <section className="bg-[#f6f7f0]">
      <div className="max-w-7xl mx-auto">
        {/* Governance Section */}
        <div
          className="mb-20 px-4 lg:px-16 xl:px-20 2xl:px-32"
          style={{
            paddingTop: '80px',
          }}
        >
          {/* Two Column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start"
          >
            {/* Left Column: Heading and Paragraphs */}
            <div className="flex-1 flex flex-col gap-6 lg:gap-11">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#21313c]">
                Governance
              </h2>

              <div className="flex flex-col gap-4 lg:gap-6">
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#21313c]">
                  Strong governance ensures that JLU grows with clarity of purpose and integrity of action. The university's academic and administrative leadership work together to uphold standards, inspire innovation and guide long term institutional development.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-[#21313c]">
                  These bodies play a key role in shaping academic direction, institutional policies and strategic growth, ensuring that JLU remains responsive to educational needs and global standards.
                </p>
              </div>
            </div>

            {/* Right Column: Governance Bodies List */}
            <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-auto lg:min-w-[300px]">
              {governanceBodies.map((body, index) => (
                <div
                  key={index}
                  className="text-[#21313c] text-base md:text-lg font-medium pb-3 border-b border-[#21313c]"
                >
                  {body}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* JLU Leadership Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4 lg:px-16 xl:px-20 2xl:px-32">
          {/* Image with reveal from top to bottom */}
          <div className="w-full">
            <motion.div
              initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
              whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="w-full max-w-[580px] h-[250px] md:h-[320px] lg:h-[357px] rounded-xl overflow-hidden"
            >
              <img
                src="/leader.jpg"
                alt="JLU Leadership"
                className="object-cover object-top w-full h-full"
              />
            </motion.div>
          </div>

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
