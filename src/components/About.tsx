'use client';

import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="w-screen bg-[#f6f7f0] m-0 p-0 overflow-x-hidden">
      <div
        className="w-full flex items-center"
        style={{
          minHeight: '100vh',
          paddingLeft: '120px',
          paddingRight: '120px',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full flex justify-center lg:justify-start"
          >
            <img
              src="/about1.jpg"
              alt="About JLU"
              className="shadow-lg object-cover"
              style={{
                width: '477px',
                height: '606px',
                maxWidth: '100%',
                borderTopLeftRadius: '64px',
                borderTopRightRadius: '64px',
                borderBottomLeftRadius: '64px',
                borderBottomRightRadius: '0px',
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#21313c] leading-tight">
              ABOUT JLU
            </h1>

            {/* Subheading */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#21313c] leading-snug">
              A University Shaped by People<br />
              Built in Central India, Connected to the world.
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-[#21313c]">
              <p className="text-base md:text-lg leading-relaxed">
                Jagran Lakecity University is a place where people come before processes,
                and ideas take shape through lived experience. Here, learning is not just
                academic achievement, it is shaped by the voices of students, faculty,
                leaders and partners who contribute to a shared journey of growth, exploration
                and discovery.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                Rooted in Bhopal, at the heart of Central India, JLU has grown into a truly
                global university, attracting perspectives from across the world while remaining
                deeply grounded in community, culture and purpose.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { About };
export default About;
