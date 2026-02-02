'use client';

import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const leadershipData = [
  {
    title: "CHANCELLOR'S MESSAGE",
    name: 'Shri Hari Mohan Gupta',
    image: '/vc.jpg',
    messages: [
      'At JLU, education begins with people. The purpose of a university is not only to teach knowledge, but also to nurture understanding, empathy and resilience. Every voice here matters, students, teachers and staff, because together they shape the character of this institution.',
      'Our commitment has always been to create an environment where learning is curious and connected to life beyond the classroom. As JLU continues to grow in reach and vision, it remains anchored by the belief that education should empower individuals and communities alike.',
    ],
  },
  {
    title: "PRO CHANCELLOR'S MESSAGE",
    name: 'Mr. Abhishek Mohan Gupta',
    image: '/pc.jpg',
    messages: [
      'Education is a dialogue, not a monologue. It thrives on diversity of thought, openness to experience and the courage to challenge conventions. At JLU, students are encouraged to question, reflect and expand their horizons.',
      'Our global partnerships, interdisciplinary programs and focus on meaningful engagement reflect a deeper belief, that learning should prepare students for the world as it is and the world as it will become.',
    ],
  },
  {
    title: "VICE CHANCELLOR'S MESSAGE",
    name: 'Prof. (Dr.) Nilanjan Chattopadhyay',
    image: '/ppc.jpg',
    messages: [
      'A university is shaped by its academic spirit, the curiosity of its learners and the guidance of its educators. At JLU, classrooms are spaces of conversation, collaboration and creation.',
      'Our approach to education is rooted in real world relevance, critical thinking and human values. Every student is encouraged to think independently, work collaboratively and emerge not only career ready, but life ready.',
    ],
  },
];

const LeadershipMessages = () => {
  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <span
            className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            Leadership
          </span>
          <h2
            className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)]"
            style={{
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Leadership{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              Messages
            </span>
          </h2>
        </motion.div>

        {/* Leadership Items */}
        <div className="flex flex-col gap-8 md:gap-0">
          {leadershipData.map((leader, index) => (
            <motion.div
              key={leader.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Mobile: Card Layout */}
              <div className="md:hidden bg-[#f9f9f9] rounded-xl p-4">
                {/* Leader Image */}
                <motion.div
                  initial={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)' }}
                  whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="relative w-full h-[280px] rounded-xl overflow-hidden mb-4"
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <div className="mb-3">
                  <span
                    className="text-[#999] uppercase tracking-widest block text-[9px] mb-2"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {leader.title}
                  </span>
                  <h3 className="text-[#21313c] font-semibold text-base">
                    {leader.name}
                  </h3>
                </div>

                <div className="space-y-3">
                  {leader.messages.map((message, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="text-[#666] text-xs leading-relaxed"
                      style={{ lineHeight: 1.7 }}
                    >
                      {message}
                    </p>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid Layout */}
              <div
                className="hidden md:grid items-start py-10 group-hover:bg-[#fafafa] transition-colors"
                style={{
                  gridTemplateColumns: '320px 1fr',
                  gap: '60px',
                  marginLeft: '-24px',
                  marginRight: '-24px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  borderBottom: index < leadershipData.length - 1 ? '1px solid #e5e5e5' : 'none',
                }}
              >
                {/* Leader Image */}
                <motion.div
                  initial={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)' }}
                  whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="relative rounded-xl overflow-hidden"
                  style={{ width: '320px', height: '320px' }}
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <span
                      className="text-[#999] uppercase tracking-widest block text-[11px] mb-3"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      {leader.title}
                    </span>
                    <h3
                      className="text-[#21313c] text-2xl"
                      style={{ fontWeight: 600, lineHeight: 1.2 }}
                    >
                      {leader.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {leader.messages.map((message, msgIndex) => (
                      <p
                        key={msgIndex}
                        className="text-[#666] text-[15px]"
                        style={{ lineHeight: 1.7 }}
                      >
                        {message}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { LeadershipMessages };
export default LeadershipMessages;
