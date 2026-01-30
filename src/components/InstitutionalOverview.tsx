'use client';

import { motion } from 'framer-motion';

const overviewData = [
  {
    title: 'PROMOTING BODY',
    image: '/pro.jpg',
    description:
      'JLU is promoted by a group with deep roots in media, communication and public engagement. Their vision has always been to build institutions that are meaningful, dynamic and connected to society\'s evolving needs. This ethos continues to guide the university\'s purpose, priorities and partnerships.',
  },
  {
    title: 'JLU AT A GLANCE',
    image: '/o.jpg',
    description:
      'Jagran Lakecity University is a multidisciplinary private university offering undergraduate, postgraduate, doctoral and skill based programs across diverse fields. With students from across India and abroad, JLU brings together academic rigour, global exposure and a vibrant campus life to create a learning experience that is engaging, relevant and forward looking.',
  },
];

const InstitutionalOverview = () => {
  return (
    <section className="bg-[#f6f7f0] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#21313c] mb-16"
        >
          Institutional Overview
        </motion.h2>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {overviewData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col overflow-hidden"
              style={{
                width: '580px',
                maxWidth: '100%',
                height: '932px',
              }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Content */}
              <div
                className="relative z-10 flex flex-col justify-between h-full"
                style={{
                  paddingTop: '32px',
                  paddingRight: '32px',
                  paddingBottom: '160px',
                  paddingLeft: '32px',
                }}
              >
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed text-white">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { InstitutionalOverview };
export default InstitutionalOverview;
