'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const infrastructureItems = [
  {
    id: 1,
    label: 'University Campus',
    description: 'A thoughtfully planned campus that supports academic focus and student life.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
    details: {
      overview: 'Spread across 231 acres, the JLU campus is designed to inspire learning and foster community. Every corner reflects a balance between modern infrastructure and natural surroundings.',
      features: [
        'Landscaped gardens and green spaces',
        'Modern architectural design',
        'Accessible pathways throughout',
        'Dedicated zones for academics, sports, and recreation',
      ],
      highlight: '14 academic blocks housing state-of-the-art classrooms and facilities',
    },
  },
  {
    id: 2,
    label: 'Student Accommodation',
    description: 'Comfortable residential spaces designed for safety, community, and everyday living.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80',
    details: {
      overview: 'Our hostels provide a home away from home, with comfortable rooms, 24/7 security, and amenities that support both study and relaxation.',
      features: [
        'Separate hostels for boys and girls',
        'Wi-Fi enabled rooms',
        '24/7 security and CCTV surveillance',
        'Common rooms and recreation areas',
      ],
      highlight: 'Capacity for 350+ students with warden supervision',
    },
  },
  {
    id: 3,
    label: 'Dining Facilities',
    description: 'Multiple dining options that cater to diverse tastes and daily needs.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80',
    details: {
      overview: 'From hygienic mess facilities to cafes and food courts, students have access to nutritious and diverse food options throughout the day.',
      features: [
        'Central mess with vegetarian and non-vegetarian options',
        'Multiple cafeterias across campus',
        'Hygienic food preparation standards',
        'Special dietary accommodations available',
      ],
      highlight: '5 food outlets serving students and faculty daily',
    },
  },
];

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

// Facility Cards Data
interface FacilityData {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  stats?: { label: string; value: string }[];
  highlights?: string[];
}

const facilityCards: FacilityData[] = [
  {
    id: 'media-studio',
    title: 'Gurudev Gupta Media Studio',
    category: 'Academic Infrastructure',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80',
    description: 'A professional studio environment for media production and hands-on learning. The studio is equipped with industry-standard equipment to prepare students for careers in broadcasting, film, and digital media.',
    features: [
      'Professional broadcast-quality cameras and equipment',
      'Sound-proof recording rooms',
      'Green screen studio for visual effects',
      'Post-production editing suites',
      'Live streaming capabilities',
    ],
    stats: [
      { label: 'Studio Area', value: '5,000 sq.ft.' },
      { label: 'Editing Suites', value: '12' },
      { label: 'Recording Rooms', value: '4' },
    ],
  },
  {
    id: 'culinary-studio',
    title: 'M S Gill Culinary Studios',
    category: 'Academic Infrastructure',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
    description: 'Industry-standard kitchens designed for hospitality and culinary training. Students learn from professional chefs in a real-world kitchen environment that mirrors top restaurants and hotels.',
    features: [
      'Commercial-grade cooking stations',
      'Bakery and pastry section',
      'Demonstration kitchen with seating',
      'Cold storage and pantry facilities',
      'International cuisine training areas',
    ],
    stats: [
      { label: 'Kitchen Stations', value: '24' },
      { label: 'Training Capacity', value: '50+' },
      { label: 'Cuisine Types', value: '8' },
    ],
  },
  {
    id: 'tech-labs',
    title: 'Technology Labs',
    category: 'Academic Infrastructure',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80',
    description: 'Well-equipped labs supporting engineering, computing, and applied sciences. Our technology labs provide students with hands-on experience using the latest tools and software in their fields.',
    features: [
      'High-performance computing clusters',
      'IoT and embedded systems lab',
      'AI and Machine Learning workstations',
      'Networking and cybersecurity lab',
      'Robotics and automation center',
    ],
    stats: [
      { label: 'Computer Labs', value: '15+' },
      { label: 'Workstations', value: '500+' },
      { label: 'Specialized Labs', value: '8' },
    ],
  },
  {
    id: 'moot-court',
    title: 'Shri Cyril Shroff Moot Court',
    category: 'Academic Infrastructure',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    description: 'A dedicated space for legal practice, debates, and mock trials. The moot court replicates an actual courtroom setting, providing law students with invaluable practical experience.',
    features: [
      'Authentic courtroom design and layout',
      'Judge\'s bench and jury seating',
      'Counsel tables and witness stand',
      'Audio-visual recording for review',
      'Legal research library access',
    ],
    stats: [
      { label: 'Seating Capacity', value: '150' },
      { label: 'Mock Trials/Year', value: '50+' },
      { label: 'Competition Wins', value: '25+' },
    ],
  },
  {
    id: 'sports-facilities',
    title: 'Sports Facilities',
    category: 'Sports & Wellness',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    description: 'Comprehensive sports facilities that encourage physical fitness, teamwork, and competitive spirit. Our campus offers a wide range of outdoor and indoor sports options for students.',
    features: [
      'Olympic-size swimming pool',
      'Cricket ground with practice nets',
      'Football and hockey fields',
      'Tennis and basketball courts',
      'Athletic track and field',
      'Gymnasium with modern equipment',
    ],
    stats: [
      { label: 'Sports Offered', value: '15+' },
      { label: 'Playing Fields', value: '8' },
      { label: 'Fitness Centers', value: '2' },
    ],
    highlights: [
      'Annual inter-university sports meet',
      'Professional coaching staff',
      'Sports scholarships available',
    ],
  },
];

// Facility Modal Component
interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FacilityData | null;
}

const FacilityModal = ({ isOpen, onClose, data }: FacilityModalProps) => {
  const isMobile = useIsMobile();

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
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white overflow-hidden shadow-2xl"
            style={{
              ...(isMobile
                ? { inset: 0, borderRadius: 0 }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '540px',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                  }),
            }}
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {/* Header Image */}
            <motion.div
              className="relative h-[200px] md:h-[260px] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#f0c14b] rounded-full">
                <span className="text-[#21313c] text-xs font-semibold">{data.category}</span>
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-white text-xl md:text-2xl font-semibold leading-tight">
                  {data.title}
                </h2>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="p-6 overflow-y-auto"
              style={{ height: 'calc(100% - 260px)' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Description */}
              <p className="text-[#666] text-sm md:text-[15px] mb-6" style={{ lineHeight: 1.7 }}>
                {data.description}
              </p>

              {/* Stats */}
              {data.stats && (
                <div className="flex flex-wrap gap-4 mb-6">
                  {data.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="bg-[#f6f7f0] px-4 py-3 rounded-lg flex-1 min-w-[100px]"
                    >
                      <p className="text-[#21313c] text-lg md:text-xl font-bold">{stat.value}</p>
                      <p className="text-[#666] text-xs">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">
                  Features & Facilities
                </h3>
                <div className="space-y-3">
                  {data.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-5 h-5 bg-[#03463B] text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-[#444] text-sm" style={{ lineHeight: 1.5 }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {data.highlights && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">
                    Highlights
                  </h3>
                  <div className="space-y-2">
                    {data.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#f0c14b] rounded-full" />
                        <span className="text-[#444] text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Campus = () => {
  const [activeInfrastructure, setActiveInfrastructure] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState<FacilityData | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
              alt="Campus"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2
            className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]"
          >
            WHERE <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>learning</span> LIVES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
          >
            Life at our campus goes beyond classrooms and lectures. It is a vibrant ecosystem where academic excellence, creativity, collaboration, and community life come together.
          </motion.p>
        </motion.div>

        {/* Large "Campus" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0 pl-0 sm:pl-6 md:pl-10 pb-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
            className="font-normal select-none text-[5.5rem] sm:text-[7rem] md:text-[clamp(8rem,16vw,16rem)]"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Campus
          </motion.h1>
        </div>
      </div>

      {/* Campus Stats Section - After Hero */}
      <div className="w-full bg-[#f6f7f0] py-16 md:py-24">
        <div
          className="mx-auto px-5 sm:px-8 md:px-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4"
              style={{ fontSize: '11px', letterSpacing: '0.25em' }}
            >
              CAMPUS AT A GLANCE
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              World-class{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                infrastructure
              </span>
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '14', label: 'Academic Blocks' },
              { number: '231', label: 'Acre Campus Area' },
              { number: '125+', label: 'Classrooms' },
              { number: '50+', label: 'Labs' },
              { number: '28,000', label: 'sq. ft. Library' },
              { number: '5', label: 'Food Outlets' },
              { number: '4', label: 'Auditoriums' },
              { number: '350', label: 'Accommodation Capacity' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: customEase }}
                viewport={{ once: true }}
                className="relative bg-white p-6 md:p-8 group hover:bg-[#21313c] transition-colors duration-500"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f0c14b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <p
                  className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors duration-500 mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-[#666] group-hover:text-white/70 transition-colors duration-500 text-sm md:text-base"
                  style={{ fontWeight: 500 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Infrastructure Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-20 gap-4 md:gap-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Facilities
              </motion.span>
              <h2
                className="text-[#21313c] text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,4rem)]"
                style={{
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Built for{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  excellence
                </span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#666] text-sm md:text-base md:max-w-[400px]"
              style={{
                lineHeight: 1.7,
              }}
            >
              Our campus is a masterwork of modern design, featuring state-of-the-art facilities that foster innovation and collaboration.
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-20">
            {/* Left Side - Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="w-full md:max-w-[520px] pt-0 md:pt-10"
            >

              {/* Infrastructure Accordion */}
              <motion.div
                className="flex flex-col"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {infrastructureItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerItem}
                    className="border-b border-[#e5e5e5]"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => setActiveInfrastructure(activeInfrastructure === item.id ? 0 : item.id)}
                      className={`group w-full flex items-center justify-between py-5 md:py-6 text-left transition-all duration-300`}
                    >
                      <span className="flex items-center gap-3 md:gap-5">
                        <span
                          className={`font-medium transition-colors duration-300 text-xs md:text-sm ${
                            activeInfrastructure === item.id ? 'text-[#f0c14b]' : 'text-[#ccc]'
                          }`}
                          style={{ minWidth: '24px' }}
                        >
                          {String(item.id).padStart(2, '0')}
                        </span>
                        <span
                          className={`transition-all duration-300 text-base md:text-xl ${
                            activeInfrastructure === item.id ? 'text-[#21313c]' : 'text-[#666] group-hover:text-[#21313c]'
                          }`}
                          style={{ fontWeight: activeInfrastructure === item.id ? 600 : 400 }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <motion.span
                        animate={{ rotate: activeInfrastructure === item.id ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`text-xl md:text-2xl font-light transition-colors ${
                          activeInfrastructure === item.id ? 'text-[#21313c]' : 'text-[#999]'
                        }`}
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {activeInfrastructure === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: customEase }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-9 md:pl-14 pr-4">
                            {/* Description */}
                            <p className="text-[#666] text-sm md:text-[15px] mb-4" style={{ lineHeight: 1.7 }}>
                              {item.details.overview}
                            </p>

                            {/* Features List */}
                            <div className="space-y-2 mb-4">
                              {item.details.features.map((feature, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-[#f0c14b] mt-1">•</span>
                                  <span className="text-[#444] text-sm" style={{ lineHeight: 1.5 }}>
                                    {feature}
                                  </span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Highlight Badge */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="inline-flex items-center gap-2 bg-[#f6f7f0] px-4 py-2 rounded-lg"
                            >
                              <span className="w-2 h-2 bg-[#03463B] rounded-full" />
                              <span className="text-[#21313c] text-xs md:text-sm font-medium">
                                {item.details.highlight}
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden w-full h-[300px] sm:h-[400px] md:w-[580px] md:h-[650px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInfrastructure}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="absolute inset-0"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={infrastructureItems.find(i => i.id === activeInfrastructure)?.image || infrastructureItems[0].image}
                    alt={infrastructureItems.find(i => i.id === activeInfrastructure)?.label || 'Campus Infrastructure'}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white px-4 py-3 md:px-6 md:py-4 max-w-[200px] md:max-w-[280px]"
              >
                <span className="text-[#999] uppercase tracking-wider block mb-1 md:mb-2 text-[9px] md:text-[11px]">
                  Featured
                </span>
                <span className="text-[#21313c] font-semibold text-sm md:text-base">
                  {infrastructureItems.find(i => i.id === activeInfrastructure)?.label}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Academic Infrastructure Section */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true }}
            className="mb-8 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
              style={{ letterSpacing: '0.2em' }}
            >
              Academic Infrastructure
            </motion.span>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-8">
            {/* Gurudev Gupta Media Studio Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'media-studio') || null)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80"
                    alt="Gurudev Gupta Media Studio"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">01</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Gurudev Gupta Media Studio
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                A professional studio environment for media production and hands on learning.
              </motion.p>
            </motion.div>

            {/* M S Gill Culinary Studios Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'culinary-studio') || null)}
              className="group cursor-pointer mt-8 sm:mt-12 md:mt-20"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80"
                    alt="M S Gill Culinary Studios"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">02</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    M S Gill Culinary Studios
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                Industry standard kitchens designed for hospitality and culinary training.
              </motion.p>
            </motion.div>

            {/* Technology Labs Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'tech-labs') || null)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80"
                    alt="Technology Labs"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">03</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Technology Labs
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                Well equipped labs supporting engineering, computing, and applied sciences.
              </motion.p>
            </motion.div>

            {/* Shri Cyril Shroff Moot Court Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'moot-court') || null)}
              className="group cursor-pointer mt-8 sm:mt-12 md:mt-20"
            >
              <div className="relative overflow-hidden mb-2 md:mb-8 h-[300px] sm:h-[400px] md:h-[480px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
                    alt="Shri Cyril Shroff Moot Court"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Number Badge */}
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">04</span>
                </motion.div>
                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                  <h4 className="text-white font-semibold mb-0 md:mb-2 text-[11px] sm:text-base md:text-2xl leading-tight">
                    Shri Cyril Shroff Moot Court
                  </h4>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#ccc] mb-2 md:mb-6 text-[10px] sm:text-xs md:text-base hidden sm:block"
                style={{ lineHeight: 1.7 }}
              >
                A dedicated space for legal practice, debates, and mock trials.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sports & Wellness Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[100px]"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <h2
              className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                lineHeight: '100%',
              }}
            >
              Sports & Wellness
            </h2>
            <p
              className="text-[#21313c] text-xl sm:text-2xl md:text-[40px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                lineHeight: '120%',
              }}
            >
              Cultivating balance, Fueling excellence
            </p>
          </motion.div>

          {/* Sports Cards - Bento Grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            {/* Left Card - Sports Facilities (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'sports-facilities') || null)}
              className="col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden h-[250px] sm:h-[400px] md:h-[580px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80"
                    alt="Sports Facilities"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 md:p-10">
                  <div />
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-white mb-1 sm:mb-2 md:mb-4 text-sm sm:text-xl md:text-[32px]"
                      style={{ fontWeight: 600, lineHeight: 1.2 }}
                    >
                      Sports Facilities
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-white/80 mb-2 sm:mb-4 md:mb-6 text-[10px] sm:text-sm md:text-[15px] max-w-[400px] hidden sm:block"
                      style={{ lineHeight: 1.7 }}
                    >
                      Facilities that encourage physical fitness, teamwork, and competitive spirit.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="col-span-5 flex flex-col gap-3 md:gap-6">
              {/* The Pyramid, University Library Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80"
                      alt="The Pyramid, University Library"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-base md:text-[22px]">
                      The Pyramid, University Library
                    </h4>
                    <p className="text-white/80 text-[8px] sm:text-xs md:text-sm hidden sm:block" style={{ lineHeight: 1.6 }}>
                      A central space for study, research, and reflection.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Indoor Multipurpose Hall Card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1200&q=80"
                      alt="Indoor Multipurpose Hall"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-base md:text-[22px]">
                      Indoor Multipurpose Hall
                    </h4>
                    <p className="text-white/80 text-[8px] sm:text-xs md:text-sm hidden sm:block" style={{ lineHeight: 1.6 }}>
                      A flexible venue for sports, events, and campus activities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* The Pyramid - University Library Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80"
                alt="The Pyramid - University Library"
                fill
                className="object-cover"
              />
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white p-4 md:p-6 rounded-xl shadow-lg"
              >
                <p className="text-[#21313c] text-2xl md:text-4xl font-bold mb-1">28,000</p>
                <p className="text-[#666] text-xs md:text-sm">sq. ft. of Knowledge Space</p>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Knowledge Hub
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)] mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                The Pyramid{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  University Library
                </span>
              </h2>
              <p
                className="text-[#666] text-sm md:text-base mb-6 md:mb-8"
                style={{ lineHeight: 1.7 }}
              >
                An iconic architectural landmark on campus, The Pyramid serves as the intellectual heart of JLU.
                This state-of-the-art library provides students with access to an extensive collection of books,
                journals, and digital resources in an environment designed to inspire learning and research.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {[
                  { icon: '📚', title: '50,000+', desc: 'Books & Journals' },
                  { icon: '💻', title: '100+', desc: 'Digital Workstations' },
                  { icon: '📖', title: '24/7', desc: 'Reading Room Access' },
                  { icon: '🔬', title: '10+', desc: 'Research Databases' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-lg"
                  >
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-[#21313c] font-semibold text-lg md:text-xl">{item.title}</p>
                    <p className="text-[#666] text-xs md:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {[
                  'Quiet study zones and group discussion rooms',
                  'Rare books and archival collections section',
                  'E-library with remote access for students',
                  'Regular workshops on research methodology',
                ].map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f0c14b] rounded-full" />
                    <span className="text-[#444] text-sm md:text-base">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indoor Multipurpose Hall Section */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Multi-Purpose Venue
              </span>
              <h2
                className="text-white text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)] mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Indoor{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  Multipurpose Hall
                </span>
              </h2>
              <p
                className="text-[#999] text-sm md:text-base mb-6 md:mb-8"
                style={{ lineHeight: 1.7 }}
              >
                A versatile indoor facility designed to host a wide range of activities from sports tournaments
                and fitness sessions to cultural events and large gatherings. The hall represents JLU's commitment
                to providing world-class infrastructure for holistic student development.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 md:gap-10 mb-6 md:mb-8">
                {[
                  { value: '15,000', label: 'sq. ft. Area' },
                  { value: '2,000+', label: 'Seating Capacity' },
                  { value: '4', label: 'Badminton Courts' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-[#f0c14b] text-2xl md:text-4xl font-bold">{stat.value}</p>
                    <p className="text-[#999] text-xs md:text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Activities List */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  'Basketball',
                  'Volleyball',
                  'Badminton',
                  'Table Tennis',
                  'Cultural Events',
                  'Convocations',
                  'Workshops',
                  'Exhibitions',
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-[#f0c14b] rounded-full" />
                    <span className="text-white/80 text-sm md:text-base">{activity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl order-1 md:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=1200&q=80"
                alt="Indoor Multipurpose Hall"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#21313c]/50 via-transparent to-transparent" />

              {/* Feature Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-4 left-4 md:top-8 md:left-8 bg-[#f0c14b] px-4 py-2 md:px-6 md:py-3 rounded-full"
              >
                <span className="text-[#21313c] font-semibold text-xs md:text-sm">Climate Controlled</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Campus Gallery Section */}
      <div className="w-full bg-white pb-12 md:pb-[120px]">
        {/* Scattered Layout - Works on both mobile and desktop */}
        <div
          className="relative mx-auto overflow-hidden h-[500px] sm:h-[700px] md:h-[1000px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Card 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '24%', top: '0%', left: '13%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
              alt="Students in library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 2 - Top Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '21%', height: '32%', top: '0%', left: '52%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
              alt="Event hall"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 3 - Top Right (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '13%', height: '19%', top: '-5%', left: '89%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80"
              alt="Campus building"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 4 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '22%', top: '30%', left: '80%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80"
              alt="Lab equipment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 5 - Middle Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '19%', height: '32%', top: '31%', left: '0%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80"
              alt="Campus event"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 6 - Bottom Right Upper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '20%', height: '34%', top: '60%', left: '80%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
              alt="Students together"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 7 - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '21%', top: '79%', left: '44%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
              alt="Graduation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 8 - Bottom Center Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '32%', top: '68%', left: '22%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80"
              alt="Library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 9 - Bottom Left (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '18%', top: '75%', left: '-4%' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
              alt="Sports"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#21313c] mb-2 md:mb-4 text-lg sm:text-2xl md:text-[clamp(2rem,4vw,3rem)]"
              style={{
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              Campus Gallery:{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#8b4513' }}>
                A Living
              </span>
              <br />
              Learning Environment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#666] mb-4 md:mb-8 text-xs sm:text-sm md:text-lg max-w-[250px] sm:max-w-[300px] md:max-w-[400px]"
              style={{ lineHeight: 1.7 }}
            >
              Experience the vibrant life, learning, and celebrations at JLU campus.
            </motion.p>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
              viewport={{ once: true }}
              className="pointer-events-auto px-5 py-2.5 md:px-8 md:py-4 bg-[#21313c] text-white font-medium flex items-center gap-2 md:gap-3 text-xs md:text-base"
              style={{ borderRadius: '100px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Gallery
              <span>→</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Facility Modal */}
      <FacilityModal
        isOpen={selectedFacility !== null}
        onClose={() => setSelectedFacility(null)}
        data={selectedFacility}
      />
    </section>
  );
};

export { Campus };
export default Campus;
