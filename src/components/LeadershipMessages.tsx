'use client';

import { motion } from 'framer-motion';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const leadershipData = [
  {
    id: 'chancellor-message',
    title: "CHANCELLOR'S MESSAGE",
    name: 'Mr. Hari Mohan Gupta',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/chancellor.webp',
    linkedin: 'https://in.linkedin.com/in/hari-mohan-gupta-318960153',
    messages: [
      'At JLU, education begins with people. The purpose of a university is not only to teach knowledge, but also to nurture understanding, empathy and resilience. Every voice here matters, students, teachers and staff, because together they shape the character of this institution.',
      'Our commitment has always been to create an environment where learning is curious and connected to life beyond the classroom. As JLU continues to grow in reach and vision, it remains anchored by the belief that education should empower individuals and communities alike.',
    ],
  },
  {
    id: 'pro-chancellor-message',
    title: "PRO CHANCELLOR'S MESSAGE",
    name: 'Mr. Abhishek Mohan Gupta',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/pro-chancellor.webp',
    linkedin: 'https://in.linkedin.com/in/abhishekmgupta',
    messages: [
      'Education is a dialogue, not a monologue. It thrives on diversity of thought, openness to experience and the courage to challenge conventions. At JLU, students are encouraged to question, reflect and expand their horizons.',
      'Our global partnerships, interdisciplinary programs and focus on meaningful engagement reflect a deeper belief, that learning should prepare students for the world as it is and the world as it will become.',
    ],
  },
  {
    id: 'vice-chancellor-message',
    title: "VICE CHANCELLOR'S MESSAGE",
    name: 'Prof. Dr. Nilanjan Chattopadhyay',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/leadership/vice-chancellor.webp',
    linkedin: 'https://www.linkedin.com/in/nchattopadhyay/',
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
            className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3 md:mb-4"
            style={{ letterSpacing: '0.2em' }}
          >
            Leadership
          </span>
          <h1
            className="text-[#21313c] text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl"
            style={{ fontWeight: 600, lineHeight: 1.1 }}
          >
            Leadership{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 700 }}>
              Messages
            </span>
          </h1>
        </motion.div>

        {/* Leadership Items */}
        <div className="flex flex-col gap-8 md:gap-0">
          {leadershipData.map((leader, index) => (
            <motion.div
              key={leader.title}
              id={leader.id}
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
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8eae2] flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                <div className="mb-3">
                  <span
                    className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-2"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    {leader.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#21313c] font-bold text-base">
                      {leader.name}
                    </h3>
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {leader.messages.map((message, msgIndex) => (
                    <p
                      key={msgIndex}
                      className="text-[#666] text-sm leading-relaxed"
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
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8eae2] flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <span
                      className="text-[#999] uppercase tracking-widest block text-xl md:text-2xl font-bold mb-3"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      {leader.title}
                    </span>
                    <div className="flex items-center gap-3">
                      <h3
                        className="text-[#21313c] text-2xl"
                        style={{ fontWeight: 600, lineHeight: 1.2 }}
                      >
                        {leader.name}
                      </h3>
                      {leader.linkedin && (
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {leader.messages.map((message, msgIndex) => (
                      <p
                        key={msgIndex}
                        className="text-[#666] text-lg"
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
