'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FacultyMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

const facultyMembers: FacultyMember[] = [
  {
    name: 'Mr. Hari Mohan Gupta',
    role: 'Chancellor',
    image: '/leadership/chancellor.jpg',
    linkedin: 'https://in.linkedin.com/in/hari-mohan-gupta-318960153',
  },
  {
    name: 'Mr. Abhishek Mohan Gupta',
    role: 'Pro Chancellor',
    image: '/leadership/pro-chancellor.jpg',
    linkedin: 'https://in.linkedin.com/in/abhishekmgupta',
  },
  {
    name: 'Prof. Dr. Nilanjan Chattopadhyay',
    role: 'Vice Chancellor',
    image: '/leadership/vice-chancellor.webp',
    linkedin: 'https://www.linkedin.com/in/nchattopadhyay/',
  },
  {
    name: 'Mr. Pankaj Das',
    role: 'Registrar',
    image: '/leadership/registrar.jpg',
  },
  {
    name: 'CA Archana Jain',
    role: 'Chief Finance and Accounts Officer',
    image: '/leadership/cfo.jpg',
    linkedin: 'https://www.linkedin.com/in/archana-jain-33189397/',
  },
  {
    name: 'Dr. Vivek Khare',
    role: 'Pro Vice Chancellor (Student Welfare)',
    image: '/leadership/pvc-student-welfare.jpg',
    linkedin: 'https://in.linkedin.com/in/dr-vivek-khare-8666a61a',
  },
  {
    name: 'Dr. Prasheel Suryawanshi',
    role: 'Pro Vice Chancellor (Science and Technology)',
    image: '/leadership/pvc-science-tech.png',
    linkedin: 'https://www.linkedin.com/in/prasheel-suryawanshi-8b368b21/',
  },
];

export const FacultyGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Variants for top row (slide from right)
  const topRowVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] as const },
    },
  };

  // Variants for bottom row (slide from left)
  const bottomRowVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] as const },
    },
  };

  return (
    <section ref={ref} className="bg-[#f6f7f0] py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <h2 className="text-[#21313c] text-4xl lg:text-5xl font-bold">
            OUR FACULTY
          </h2>
          <span className="text-[#21313c] text-4xl lg:text-5xl font-bold">
            2025
          </span>
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {facultyMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={index < 3 ? topRowVariants : bottomRowVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Photo */}
              <div className="relative h-44 lg:h-48 rounded-xl overflow-hidden mb-3">
                {member.image ? (
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#e8eae2] flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                <motion.div
                  className="absolute inset-0 bg-[#21313c]/0 group-hover:bg-[#21313c]/20 transition-colors duration-300"
                />
              </div>
              {/* Info */}
              <div className="flex items-center justify-between">
                <h3 className="text-[#21313c] text-sm font-bold leading-tight">
                  {member.name}
                </h3>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#005582] transition-colors ml-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
