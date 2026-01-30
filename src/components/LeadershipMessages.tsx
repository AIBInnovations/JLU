'use client';

import { motion } from 'framer-motion';

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
          Leadership Messages
        </motion.h2>

        {/* Leadership Items */}
        <div className="space-y-16">
          {leadershipData.map((leader, index) => (
            <div key={leader.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-[373px_1fr] gap-8 md:gap-12 items-start"
              >
                {/* Leader Image */}
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="mx-auto md:mx-0 object-cover object-top"
                  style={{
                    width: '373px',
                    height: '373px',
                    maxWidth: '100%',
                  }}
                />

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#21313c] mb-2">
                      {leader.title}
                    </h3>
                    <p className="text-lg md:text-xl text-[#21313c]">{leader.name}</p>
                  </div>

                  <div className="space-y-4">
                    {leader.messages.map((message, msgIndex) => (
                      <p
                        key={msgIndex}
                        className="text-base md:text-lg leading-relaxed text-[#21313c]"
                      >
                        {message}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Divider - don't show after last item */}
              {index < leadershipData.length - 1 && (
                <hr className="border-t border-gray-300 mt-16" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { LeadershipMessages };
export default LeadershipMessages;
