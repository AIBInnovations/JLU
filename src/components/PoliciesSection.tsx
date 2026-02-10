'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface PolicyItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const policies: PolicyItem[] = [
  {
    id: 'anti-ragging',
    title: 'Anti-Ragging Policy',
    description: 'Zero tolerance for ragging. Report incidents anonymously and safely.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: '/policies/anti-ragging',
  },
  {
    id: 'grievance',
    title: 'Grievance Redressal',
    description: 'Submit complaints and track resolution status online with ease.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: '/grievance',
  },
  {
    id: 'rti',
    title: 'RTI Information',
    description: 'Right to Information portal for complete transparency.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" strokeLinecap="round"/>
        <path d="M16 17H8" strokeLinecap="round"/>
      </svg>
    ),
    link: '/rti',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal data.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: '/privacy-policy',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Terms and conditions for using university services and facilities.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: '/terms',
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    description: 'Fee refund guidelines, procedures, and timelines.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: '/refund-policy',
  },
];

// Unique positions for bento-style layout (desktop) - larger cards filling space
const cardStyles = [
  { left: '0%', top: '70px', width: '31%' },             // Anti-Ragging - left column, lower
  { left: '34.5%', top: '0px', width: '31%' },           // Grievance - center column, top
  { left: '69%', top: '90px', width: '31%' },            // RTI - right column, middle
  { left: '0%', top: '310px', width: '31%' },            // Privacy - left column, bottom
  { left: '34.5%', top: '210px', width: '31%' },         // Terms - center column, middle
  { left: '69%', top: '330px', width: '31%' },           // Refund - right column, bottom
];

export const PoliciesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-16 md:py-24 bg-[#f6f7f0]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#21313c]"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          >
            University{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              Policies
            </span>
          </h2>
        </motion.div>

        {isMobile ? (
          // Mobile: 2-column grid
          <div className="grid grid-cols-2 gap-4">
            {policies.map((policy, index) => (
              <motion.a
                key={policy.id}
                href={policy.link}
                className="group bg-white rounded-2xl p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-[#3b82f6]"
                  style={{ backgroundColor: '#e8f0fe' }}
                >
                  {policy.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-sm font-semibold text-[#21313c] mb-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {policy.title}
                </h3>
                {/* Description */}
                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                  {policy.description}
                </p>
              </motion.a>
            ))}
          </div>
        ) : (
          // Desktop: Bento-style scattered layout
          <div className="relative" style={{ height: '540px' }}>
            {policies.map((policy, index) => (
              <motion.a
                key={policy.id}
                href={policy.link}
                className="group absolute bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{
                  left: cardStyles[index].left,
                  top: cardStyles[index].top,
                  width: cardStyles[index].width,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-[#3b82f6] transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: '#e8f0fe' }}
                >
                  {policy.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold text-[#21313c] mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {policy.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {policy.description}
                </p>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
