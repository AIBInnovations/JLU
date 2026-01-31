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
          className="mb-20"
          style={{
            maxWidth: '1200px',
            paddingTop: '80px',
            paddingLeft: '120px',
            paddingRight: '40px',
          }}
        >
          {/* Governance Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ maxWidth: '900px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
              <h2
                className="font-bold text-[#21313c]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '40px',
                  lineHeight: '48px',
                }}
              >
                Governance
              </h2>

              {/* Governing Bodies List - Now below the title */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '60px',
                  flexWrap: 'wrap',
                }}
              >
                {governanceBodies.map((body, index) => (
                  <div
                    key={index}
                    className="text-[#21313c]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '24px',
                      paddingBottom: '12px',
                      borderBottom: '2px solid #21313c',
                    }}
                  >
                    {body}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p
                  className="text-[#21313c]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '28px',
                  }}
                >
                  Strong governance ensures that JLU grows with clarity of purpose and integrity of action. The university's academic and administrative leadership work together to uphold standards, inspire innovation and guide long term institutional development.
                </p>
                <p
                  className="text-[#21313c]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '28px',
                  }}
                >
                  These bodies play a key role in shaping academic direction, institutional policies and strategic growth, ensuring that JLU remains responsive to educational needs and global standards.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* JLU Leadership Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with reveal from top to bottom */}
          <div className="w-full">
            <motion.div
              initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
              whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              style={{
                width: '580px',
                height: '357px',
                maxWidth: '100%',
              }}
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
