'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

// Custom easing for smooth animations (same as Events page)
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GovernanceMember {
  name: string;
  designation: string;
  role: string;
}

interface GovernanceBodyData {
  title: string;
  description: string;
  members: GovernanceMember[];
}

const governanceData: Record<string, GovernanceBodyData> = {
  'Governing Body': {
    title: 'Governing Body',
    description: 'The Governing Body is the apex body of the university responsible for overall policy direction, strategic planning, and ensuring the university fulfills its mission and objectives.',
    members: [
      { name: 'Shri Ashok Jain', designation: 'Chancellor', role: 'Chairman' },
      { name: 'Dr. R.K. Sharma', designation: 'Vice Chancellor', role: 'Member Secretary' },
      { name: 'Prof. S.N. Mishra', designation: 'Pro Vice Chancellor', role: 'Member' },
      { name: 'Dr. Amit Kumar', designation: 'Registrar', role: 'Member' },
      { name: 'Shri Rajesh Gupta', designation: 'Industry Representative', role: 'Member' },
      { name: 'Dr. Priya Singh', designation: 'UGC Nominee', role: 'Member' },
      { name: 'Prof. M.L. Verma', designation: 'AICTE Nominee', role: 'Member' },
      { name: 'Shri Vikram Patel', designation: 'State Government Nominee', role: 'Member' },
    ],
  },
  'Board of Management': {
    title: 'Board of Management',
    description: 'The Board of Management is the principal executive body responsible for the general superintendence, direction, and control of the affairs of the university.',
    members: [
      { name: 'Dr. R.K. Sharma', designation: 'Vice Chancellor', role: 'Chairman' },
      { name: 'Prof. S.N. Mishra', designation: 'Pro Vice Chancellor', role: 'Member' },
      { name: 'Dr. Amit Kumar', designation: 'Registrar', role: 'Member Secretary' },
      { name: 'Dr. Sunita Joshi', designation: 'Dean, Faculty of Engineering', role: 'Member' },
      { name: 'Dr. Ramesh Pandey', designation: 'Dean, Faculty of Management', role: 'Member' },
      { name: 'Dr. Kavita Sharma', designation: 'Dean, Faculty of Law', role: 'Member' },
      { name: 'Shri Anil Mehta', designation: 'Finance Officer', role: 'Member' },
      { name: 'Dr. Neha Gupta', designation: 'Controller of Examinations', role: 'Member' },
    ],
  },
  'Academic Council': {
    title: 'Academic Council',
    description: 'The Academic Council is the principal academic body responsible for maintaining standards of instruction, education, and examination within the university.',
    members: [
      { name: 'Dr. R.K. Sharma', designation: 'Vice Chancellor', role: 'Chairman' },
      { name: 'Prof. S.N. Mishra', designation: 'Pro Vice Chancellor', role: 'Member' },
      { name: 'Dr. Sunita Joshi', designation: 'Dean, Faculty of Engineering', role: 'Member' },
      { name: 'Dr. Ramesh Pandey', designation: 'Dean, Faculty of Management', role: 'Member' },
      { name: 'Dr. Kavita Sharma', designation: 'Dean, Faculty of Law', role: 'Member' },
      { name: 'Dr. Alok Tripathi', designation: 'Dean, Faculty of Pharmacy', role: 'Member' },
      { name: 'Dr. Meera Kapoor', designation: 'Dean, Faculty of Journalism', role: 'Member' },
      { name: 'Dr. Sanjay Rao', designation: 'Dean, Faculty of Science', role: 'Member' },
      { name: 'Dr. Neha Gupta', designation: 'Controller of Examinations', role: 'Member Secretary' },
      { name: 'Prof. Vivek Agarwal', designation: 'Head, Computer Science Dept.', role: 'Member' },
    ],
  },
};

const governanceBodies = [
  'Governing Body',
  'Board of Management',
  'Academic Council',
];

interface GovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GovernanceBodyData | null;
}

const GovernanceModal = ({ isOpen, onClose, data }: GovernanceModalProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
            style={{
              ...(isMobile
                ? { inset: 0, borderRadius: 0 }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '520px',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                  }),
            }}
            onWheel={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#03463B] shrink-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              <div>
                <h2 className="text-xl font-semibold text-white">{data.title}</h2>
                <p className="text-sm text-white/70 mt-1">University Governance</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>

            {/* Content */}
            <motion.div
              className="p-6 overflow-y-auto flex-1 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Description */}
              <p className="text-[#666] text-sm md:text-[15px] mb-6" style={{ lineHeight: 1.7 }}>
                {data.description}
              </p>

              {/* Members List */}
              <div className="space-y-1">
                <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">
                  Members
                </h3>
                {data.members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#03463B]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#03463B] font-semibold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#21313c] font-medium text-[15px]">{member.name}</h4>
                      <p className="text-[#666] text-sm">{member.designation}</p>
                    </div>
                    {/* Role Badge */}
                    <span className="px-3 py-1 bg-[#c3fd7a]/30 text-[#03463B] text-xs font-medium rounded-full whitespace-nowrap">
                      {member.role}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Governance = () => {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);

  const handleOpenModal = (body: string) => {
    setSelectedBody(body);
  };

  const handleCloseModal = () => {
    setSelectedBody(null);
  };

  return (
    <section className="w-full bg-white">
      <div
        className="mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-[120px] md:py-[100px]"
        style={{ maxWidth: '1440px' }}
      >
        {/* Governance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEase }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-20 mb-12 md:mb-20"
        >
          {/* Left Column: Heading and Governance Bodies */}
          <div className="flex-1">
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Structure
            </span>
            <h2
              className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)] mb-6 md:mb-8"
              style={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Governance
              </span>
            </h2>

            {/* Two column: Paragraphs + Bodies List side by side */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Paragraphs */}
              <div className="flex-1 space-y-4 order-2 md:order-1">
                <p
                  className="text-[#666] text-sm md:text-[15px]"
                  style={{ lineHeight: 1.7 }}
                >
                  Strong governance ensures that JLU grows with clarity of purpose and integrity of action. The university's academic and administrative leadership work together to uphold standards, inspire innovation and guide long term institutional development.
                </p>
                <p
                  className="text-[#666] text-sm md:text-[15px]"
                  style={{ lineHeight: 1.7 }}
                >
                  These bodies play a key role in shaping academic direction, institutional policies and strategic growth, ensuring that JLU remains responsive to educational needs and global standards.
                </p>
              </div>

              {/* Governance Bodies List */}
              <div className="w-full md:w-auto md:min-w-[280px] order-1 md:order-2 md:-mt-6">
                {governanceBodies.map((body, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                    viewport={{ once: true }}
                    onClick={() => handleOpenModal(body)}
                    className="group flex items-center justify-between py-4 border-b border-[#e5e5e5] cursor-pointer hover:bg-[#fafafa] transition-colors -mx-4 px-4 md:mx-0 md:px-0"
                  >
                    <span className="text-[#21313c] text-sm md:text-[15px] font-medium">
                      {body}
                    </span>
                    <span className="text-[#21313c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* JLU Leadership Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image with reveal */}
          <motion.div
            initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
            whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] rounded-xl overflow-hidden"
          >
            <img
              src="/leader.jpg"
              alt="JLU Leadership"
              className="object-cover object-top w-full h-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block text-[10px] sm:text-xs mb-3 md:mb-4"
              style={{ letterSpacing: '0.2em' }}
            >
              Team
            </span>
            <h3
              className="text-[#21313c] text-xl sm:text-2xl md:text-[clamp(1.75rem,3vw,2.5rem)] mb-4 md:mb-6"
              style={{
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              JLU{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
                Leadership
              </span>
            </h3>
            <p
              className="text-[#666] text-sm md:text-[15px]"
              style={{ lineHeight: 1.7 }}
            >
              Leadership at JLU is inclusive and collaborative. Academic leaders, administrators and faculty work together to create an environment that supports innovation, learning and student growth. The structure reflects a belief in shared responsibility and open dialogue.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Governance Modal */}
      <GovernanceModal
        isOpen={selectedBody !== null}
        onClose={handleCloseModal}
        data={selectedBody ? governanceData[selectedBody] : null}
      />
    </section>
  );
};

export { Governance };
export default Governance;
