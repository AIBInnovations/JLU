import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FacultyMember {
  name: string;
  role: string;
  image: string;
}

const facultyMembers: FacultyMember[] = [
  {
    name: 'Shri. Abhishek Mohan Gupta',
    role: 'Pro-Chancellor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Mr. Pankaj Das',
    role: 'Registrar',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Dr. Anupam Chouksey',
    role: 'Director General',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
  {
    name: 'Dr. Mohan Giri',
    role: 'Vice Chancellor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Dr. Vivek Khare',
    role: 'Dean Academics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Dr. Ruchi Gautam',
    role: 'Dean Research',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

export const FacultyGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {facultyMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              {/* Photo */}
              <div className="relative h-44 lg:h-48 rounded-xl overflow-hidden mb-3">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#21313c]/0 group-hover:bg-[#21313c]/20 transition-colors duration-300"
                />
              </div>
              {/* Info */}
              <h3 className="text-[#21313c] text-sm font-bold leading-tight">
                {member.name}
              </h3>
              <p className="text-gray-500 text-xs mt-1">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
