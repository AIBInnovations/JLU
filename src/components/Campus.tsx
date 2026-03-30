'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

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

// Campus Stats Data
const campusStats = [
  { number: '232', suffix: '', label: 'Acre Campus Area' },
  { number: '14', suffix: '', label: 'Academic Blocks' },
  { number: '125', suffix: '+', label: 'Smart Classrooms' },
  { number: '50', suffix: '+', label: 'Specialized Labs' },
  { number: '28,000', suffix: '', label: 'sq. ft. Library' },
  { number: '6', suffix: '', label: 'Food Outlets' },
  { number: '6', suffix: '', label: 'Auditoriums' },
  { number: '400', suffix: '+', label: 'Hostel Capacity' },
];

// Infrastructure Items for Accordion
const infrastructureItems = [
  {
    id: 1,
    label: 'University Campus',
    description: 'A thoughtfully planned campus that supports academic focus and student life.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg',
    details: {
      overview: 'Spread across 232 acres, the JLU campus is designed to inspire learning and foster community. Every corner reflects a balance between modern infrastructure and natural surroundings, with 9 academic blocks housing world-class facilities.',
      features: [
        'Landscaped gardens and green spaces',
        'Modern architectural design across 14 blocks',
        'Accessible pathways throughout campus',
        'Dedicated zones for academics, sports, and recreation',
        '24/7 medical clinic with ambulance services',
      ],
      highlight: '14 academic blocks housing state-of-the-art classrooms and facilities',
    },
  },
  {
    id: 2,
    label: 'Student Accommodation',
    description: 'Modern 4-block hostel (A, B, C & D) offering comfortable and secure living environment.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/hostel.jpg',
    details: {
      overview: 'Our modern 4-block hostel (A, B, C & D) provides students with a comfortable and secure living environment, truly offering a home away from home. The hostels offer single, double, and triple occupancy options, along with facilities that support both academic focus and relaxation.',
      features: [
        'Single, double & triple occupancy options',
        'Wi-Fi enabled rooms across all hostel blocks',
        '24/7 security with CCTV surveillance',
        'Common rooms, laundry, and recreation areas for students',
        'State-of-the-art fitness center with 50+ equipment',
      ],
      highlight: '4-block hostel (A, B, C & D) with warden supervision',
    },
  },
  {
    id: 3,
    label: 'Dining Facilities',
    description: 'APPETITE food court and mess facilities catering to diverse tastes.',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/%20m%20s%20gill%20studio.JPG',
    details: {
      overview: 'From a hygienic mess dining hall with 180-person capacity to the APPETITE food court featuring 5 outlets offering global cuisines, students have access to diverse food options throughout the day.',
      features: [
        'APPETITE food court with 5 global cuisine outlets',
        'Mess dining hall — 180 person capacity',
        'Hygienic food preparation standards',
        'Vegetarian and non-vegetarian options daily',
      ],
      highlight: '6 on-campus food outlets serving students and faculty',
    },
  },
];

// SVG icon components for classroom features
const ErgonomicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
  </svg>
);
const AcousticIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const SmartTechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const LightingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /><circle cx="12" cy="12" r="5" />
  </svg>
);

// Classroom features
const classroomFeatures = [
  { icon: ErgonomicIcon, title: 'Ergonomic Design', desc: 'Furniture and layouts crafted for extended study sessions' },
  { icon: AcousticIcon, title: 'Acoustic Optimization', desc: 'Soundproofing that eliminates external noise completely' },
  { icon: SmartTechIcon, title: 'Smart Technology', desc: 'Interactive boards, projectors, and high-speed Wi-Fi' },
  { icon: LightingIcon, title: 'Optimal Lighting', desc: 'Natural and LED lighting designed for focus and clarity' },
];

// Sports facilities
const sportsFacilities = [
  'Cricket Ground with Practice Nets',
  '2 Football Fields',
  'Basketball Courts',
  'Volleyball Courts',
  'Tennis Courts',
  'Athletic Track',
  'Table Tennis',
  'Badminton Courts',
  '6-Lane Olympic Swimming Pool',
  'Fitness Center (5,000 sq. ft.)',
];

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
    title: 'Shri Gurudev Gupta Media Studio',
    category: 'Academic Infrastructure',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-activity.jpg',
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
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/%20m%20s%20gill%20studio.JPG',
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
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/tech-labs.jpg',
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
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/moot-court.jpg',
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
];

// Infrastructure modal data (for accordion items)
const infrastructureModalData: FacilityData[] = [
  {
    id: 'university-campus',
    title: 'University Campus',
    category: 'Campus Infrastructure',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg',
    description: 'Spread across 232 acres, the JLU campus is designed to inspire learning and foster community. Every corner reflects a balance between modern infrastructure and natural surroundings, with 9 academic blocks housing world-class facilities.',
    features: [
      'Landscaped gardens and green spaces',
      'Modern architectural design across 14 blocks',
      'Accessible pathways throughout campus',
      'Dedicated zones for academics, sports, and recreation',
      'Wi-Fi enabled campus with complete connectivity',
    ],
    stats: [
      { label: 'Campus Area', value: '232 Acres' },
      { label: 'Academic Blocks', value: '14' },
      { label: 'Green Cover', value: '60%' },
    ],
  },
  {
    id: 'student-accommodation',
    title: 'Student Accommodation',
    category: 'Campus Infrastructure',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/hostel.jpg',
    description: 'Our modern 4-block hostel (A, B, C & D) provides students with a comfortable and secure living environment, truly offering a home away from home. The hostels offer single, double, and triple occupancy options, along with facilities that support both academic focus and relaxation.',
    features: [
      'Single, double & triple occupancy options',
      'Wi-Fi enabled rooms across all hostel blocks',
      '24/7 security with CCTV surveillance',
      'Common rooms, laundry, and recreation areas for students',
      'In-house mess and dining facilities',
    ],
    stats: [
      { label: 'Hostel Blocks', value: '4' },
      { label: 'Floors', value: '14' },
      { label: 'Capacity', value: '400+' },
    ],
  },
  {
    id: 'dining-facilities',
    title: 'Dining Facilities',
    category: 'Campus Infrastructure',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/%20m%20s%20gill%20studio.JPG',
    description: 'From a hygienic mess dining hall with 180-person capacity to the APPETITE food court featuring 5 outlets offering global cuisines, students have access to diverse food options throughout the day.',
    features: [
      'APPETITE food court with 5 global cuisine outlets',
      'Mess dining hall with 180 person capacity',
      'Hygienic food preparation standards',
      'Vegetarian and non-vegetarian options daily',
      'Cafeterias in every academic block',
    ],
    stats: [
      { label: 'Food Outlets', value: '6' },
      { label: 'Mess Capacity', value: '180' },
      { label: 'Cuisines', value: '5+' },
    ],
  },
];

// Sports modal data
const sportsModalData: FacilityData[] = [
  {
    id: 'swimming-pool-sports',
    title: '6-Lane Olympic Swimming Pool',
    category: 'Sports Facilities',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/pool-olympic.jpg',
    description: 'An Olympic-standard 6-lane pool with trained lifeguards, temperature control, and competition-ready facilities for both recreational and competitive swimming.',
    features: [
      'Olympic standard 25m pool',
      '6 competition-grade lanes',
      'Temperature-controlled water',
      'Trained lifeguards on duty 24/7',
      'Electronic timing system',
    ],
    stats: [
      { label: 'Lanes', value: '6' },
      { label: 'Length', value: '25m' },
      { label: 'Standard', value: 'Olympic' },
    ],
  },
  {
    id: 'outdoor-sports',
    title: 'Outdoor Sports Complex',
    category: 'Sports Facilities',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/gallery-16.jpg',
    description: 'A sprawling outdoor sports complex with 2 football fields, a cricket ground with practice nets, basketball courts, volleyball courts, tennis courts, and an athletic track.',
    features: [
      '2 full-size football fields',
      'Cricket ground with practice nets',
      'Basketball and volleyball courts',
      'Tennis courts',
      '400m athletic track',
    ],
    stats: [
      { label: 'Football Fields', value: '2' },
      { label: 'Sports', value: '10+' },
      { label: 'Courts', value: '8' },
    ],
  },
  {
    id: 'indoor-hall',
    title: 'Indoor Multipurpose Hall',
    category: 'Sports Facilities',
    image: 'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/sports.jpg',
    description: 'A 15,000 sq. ft. climate-controlled venue for indoor sports, cultural events, conferences, and large gatherings. Equipped with professional lighting and sound systems.',
    features: [
      'Climate-controlled 15,000 sq. ft. space',
      'Indoor badminton and table tennis',
      'Professional lighting and sound system',
      'Seating capacity for events',
      'Multi-sport flooring',
    ],
    stats: [
      { label: 'Area', value: '15,000 sq.ft.' },
      { label: 'Events/Year', value: '50+' },
      { label: 'Capacity', value: '500+' },
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
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
          />
          <motion.div
            className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
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
            onWheel={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <motion.div
              className="relative h-[200px] md:h-[260px] overflow-hidden shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Image src={data.image} alt={data.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#f0c14b] rounded-full">
                <span className="text-[#21313c] text-xs font-semibold">{data.category}</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-white text-xl md:text-2xl font-semibold leading-tight">{data.title}</h2>
              </div>
            </motion.div>
            <motion.div
              className="p-6 overflow-y-auto flex-1 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="text-[#666] text-sm md:text-[15px] mb-6" style={{ lineHeight: 1.7 }}>{data.description}</p>
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
              <div className="mb-6">
                <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">Features & Facilities</h3>
                <div className="space-y-3">
                  {data.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <svg className="w-5 h-5 bg-[#027ea1] text-white rounded-full p-1 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[#444] text-sm" style={{ lineHeight: 1.5 }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              {data.highlights && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-gray-200"
                >
                  <h3 className="text-[#21313c] font-semibold text-sm uppercase tracking-wider mb-4">Highlights</h3>
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
  const [selectedFacility, setSelectedFacility] = useState<FacilityData | null>(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Map menu slugs to facility modal data
  const slugToModal: Record<string, () => FacilityData | null> = {
    'gurudev-gupta-media-studio': () => facilityCards.find(f => f.id === 'media-studio') || null,
    'ms-gill-culinary-studios': () => facilityCards.find(f => f.id === 'culinary-studio') || null,
    'technology-labs': () => facilityCards.find(f => f.id === 'tech-labs') || null,
    'shri-cyril-shroff-moot-court': () => facilityCards.find(f => f.id === 'moot-court') || null,
    'sports-facilities': () => sportsModalData[0] || null,
  };

  const navigateToSection = (slug: string) => {
    // Open modal if slug maps to a facility
    const modalGetter = slugToModal[slug];
    if (modalGetter) {
      setTimeout(() => {
        const data = modalGetter();
        if (data) setSelectedFacility(data);
      }, 400);
    }

    // Scroll to the element
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    // Handle navigate-section custom events from Header menu
    const handleNavigate = (e: Event) => {
      const slug = (e as CustomEvent).detail?.slug;
      if (slug) navigateToSection(slug);
    };
    window.addEventListener('navigate-section', handleNavigate);

    // Handle initial hash in URL
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => navigateToSection(hash), 800);
    }

    return () => {
      window.removeEventListener('navigate-section', handleNavigate);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        <motion.div
          className="relative w-screen"
          style={{ minHeight: '100vh' }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg"
              alt="JLU Campus Aerial View"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/30" style={{ opacity }} />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="absolute top-0 left-0 px-4 pt-28 sm:pt-32 max-w-[90%] sm:px-6 sm:max-w-[85%] md:pl-10 md:pt-[120px] md:max-w-[800px] md:pr-0"
        >
          <motion.h2 className="text-white font-semibold leading-tight mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-[clamp(1.5rem,3vw,2.5rem)]">
            WHERE{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              learning
            </span>{' '}
            LIVES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white"
            style={{ fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            A 232-acre ecosystem where academic excellence, creativity, collaboration, and community life come together to shape the leaders of tomorrow.
          </motion.p>
        </motion.div>

        {/* Large "Campus" Text */}
        <div className="absolute bottom-0 left-0 pl-0 sm:pl-6 md:pl-10 pb-0">
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

      {/* ===== CAMPUS STATS SECTION ===== */}
      <div id="infrastructure" className="w-full bg-[#f6f7f0] py-16 md:py-24">
        <div className="mx-auto px-5 sm:px-8 md:px-10 lg:px-[120px]" style={{ maxWidth: '1440px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4 text-xl md:text-2xl font-bold"
              style={{ letterSpacing: '0.25em' }}
            >
              Campus at a Glance
            </span>
            <h2
              className="text-[#21313c]"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              World-class{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                infrastructure
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {campusStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: customEase }}
                viewport={{ once: true }}
                className="relative bg-white p-5 md:p-8 group hover:bg-[#21313c] transition-colors duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#f0c14b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <p
                  className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors duration-500 mb-1"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1 }}
                >
                  {stat.number}<span className="text-[0.7em]">{stat.suffix}</span>
                </p>
                <p className="text-[#666] group-hover:text-white/70 transition-colors duration-500 text-xs md:text-sm" style={{ fontWeight: 500 }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CAMPUS INFRASTRUCTURE — Section Header ===== */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 pt-12 sm:px-8 sm:pt-16 md:px-[120px] md:pt-[140px] md:pb-10"
          style={{ maxWidth: '1440px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Facilities
              </motion.span>
              <h2
                className="text-[#21313c] text-3xl sm:text-4xl md:text-4xl lg:text-5xl"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}
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
              className="text-[#666] md:max-w-[600px]"
              style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', lineHeight: 1.7, fontWeight: 400 }}
            >
              Our campus is a masterwork of modern design, featuring state-of-the-art facilities that foster innovation and collaboration.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ===== 3 Separate Facility Sections ===== */}
      {infrastructureItems.map((item, index) => {
        const modalId = item.id === 1 ? 'university-campus' : item.id === 2 ? 'student-accommodation' : 'dining-facilities';
        const sectionId = item.id === 1 ? 'university-campus' : item.id === 2 ? 'student-accommodation' : 'dining-facilities';
        const isReversed = index % 2 === 1;
        return (
          <div key={item.id} id={sectionId} className={`w-full ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7f0]'}`}>
            <div
              className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[120px]"
              style={{ maxWidth: '1440px' }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isReversed ? 'md:[direction:rtl]' : ''}`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: customEase }}
                  viewport={{ once: true }}
                  className="relative z-20 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl md:[direction:ltr]"
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 bg-[#f0c14b] rounded-full flex items-center justify-center">
                    <span className="text-[#21313c] font-bold text-sm md:text-base">{String(item.id).padStart(2, '0')}</span>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                  viewport={{ once: true }}
                  className="md:[direction:ltr]"
                >
                  <span
                    className="text-[#999] uppercase tracking-widest block mb-3 md:mb-4 text-[10px] md:text-xs"
                    style={{ letterSpacing: '0.2em' }}
                  >
                    Facilities
                  </span>
                  <h2
                    className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)] mb-4 md:mb-6"
                    style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
                  >
                    {item.label}
                  </h2>
                  <p className="text-[#666] text-sm md:text-base mb-6 md:mb-8" style={{ lineHeight: 1.7 }}>
                    {item.details.overview}
                  </p>

                  {/* Feature cards carousel — extends behind image */}
                  <div className="relative z-10 overflow-visible" style={{ marginLeft: isReversed ? '0' : '-60%', marginRight: isReversed ? '-60%' : '0' }}>
                    {/* Blur fade on left */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
                      style={{ background: `linear-gradient(to right, ${index % 2 === 0 ? '#ffffff' : '#f6f7f0'}, transparent)` }}
                    />
                    {/* Blur fade on right */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
                      style={{ background: `linear-gradient(to left, ${index % 2 === 0 ? '#ffffff' : '#f6f7f0'}, transparent)` }}
                    />
                    <style>{`
                      @keyframes scrollCards${item.id} {
                        0% { transform: translateX(${isReversed ? '-50%' : '0'}); }
                        100% { transform: translateX(${isReversed ? '0' : '-50%'}); }
                      }
                    `}</style>
                    <div className="overflow-hidden">
                      <div
                        className="flex gap-3 md:gap-4"
                        style={{
                          animation: `scrollCards${item.id} ${12 + index * 2}s linear infinite`,
                          width: 'max-content',
                        }}
                      >
                        {[...item.details.features, ...item.details.features].map((feature, fi) => (
                          <div
                            key={fi}
                            className="shrink-0 w-[180px] md:w-[220px] bg-white/90 backdrop-blur-sm border border-[#e5e5e5] rounded-xl p-4 md:p-5 shadow-sm"
                          >
                            <span className="w-2 h-2 bg-[#027ea1] rounded-full block mb-3" />
                            <span className="text-[#21313c] text-xs md:text-sm font-medium" style={{ lineHeight: 1.5 }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className="flex items-center gap-3 flex-wrap mt-6">
                    <div className="inline-flex items-center gap-2 bg-[#f6f7f0] px-4 py-2.5 rounded-lg border border-[#e5e5e5]">
                      <span className="w-2 h-2 bg-[#027ea1] rounded-full" />
                      <span className="text-[#21313c] text-xs md:text-sm font-medium">{item.details.highlight}</span>
                    </div>
                    {item.id === 2 && (
                      <>
                        <button
                          onClick={() => setShowFeeModal(true)}
                          className="inline-flex items-center gap-2 bg-[#027ea1] text-white px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium hover:bg-[#026a88] transition-colors cursor-pointer"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          View Fee Structure
                        </button>
                        <a
                          href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/Hostel-Mess-Fee-Structure-2026-27.xlsx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-[#027ea1] text-[#027ea1] px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium hover:bg-[#027ea1] hover:text-white transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Download
                        </a>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ===== ACADEMIC INFRASTRUCTURE SECTION ===== */}
      <div id="academic-infrastructure" />
      <div id="technology-labs" />
      <div id="gurudev-gupta-media-studio" />
      <div id="ms-gill-culinary-studios" />
      <div id="shri-cyril-shroff-moot-court" />
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 gap-4"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Academic Infrastructure
              </span>
              <h2
                className="text-white text-3xl sm:text-4xl md:text-5xl"
                style={{ fontWeight: 600, lineHeight: 1.1 }}
              >
                Spaces that{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  inspire
                </span>
              </h2>
            </div>
            <p className="text-[#999] md:max-w-[600px]" style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', lineHeight: 1.7, fontWeight: 400 }}>
              Purpose-built facilities that bring learning to life through hands-on experience and industry-standard environments.
            </p>
          </motion.div>

          {/* Bento Grid — 1 large hero card + 3 cards below */}
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            {/* Hero Card — Media Studio (spans 7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'media-studio') || null)}
              className="col-span-12 md:col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[380px] md:h-[520px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-activity.jpg"
                    alt="Shri Gurudev Gupta Media Studio"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Number + Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
                  <span className="w-10 h-10 md:w-12 md:h-12 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-sm">01</span>
                  <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full hidden md:block">Media Production</span>
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
                  <h4 className="text-white font-semibold text-lg sm:text-2xl md:text-3xl mb-2 md:mb-3" style={{ lineHeight: 1.2 }}>
                    Shri Gurudev Gupta Media Studio
                  </h4>
                  <p className="text-white/60 text-sm md:text-base max-w-[500px] hidden sm:block" style={{ lineHeight: 1.6 }}>
                    A professional studio environment for media production and hands-on learning.
                  </p>
                  <div className="mt-3 md:mt-5 flex items-center gap-2 text-[#f0c14b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Culinary Studios (spans 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'culinary-studio') || null)}
              className="col-span-12 md:col-span-5 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[380px] md:h-[520px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/%20m%20s%20gill%20studio.JPG"
                    alt="M S Gill Culinary Studios"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
                  <span className="w-10 h-10 md:w-12 md:h-12 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-sm">02</span>
                  <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full hidden md:block">Culinary Arts</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
                  <h4 className="text-white font-semibold text-lg sm:text-xl md:text-2xl mb-2" style={{ lineHeight: 1.2 }}>
                    M S Gill Culinary Studios
                  </h4>
                  <p className="text-white/60 text-sm md:text-base hidden sm:block" style={{ lineHeight: 1.6 }}>
                    Industry standard kitchens designed for hospitality and culinary training.
                  </p>
                  <div className="mt-3 md:mt-5 flex items-center gap-2 text-[#f0c14b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technology Labs (spans 5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'tech-labs') || null)}
              className="col-span-12 md:col-span-5 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[380px] md:h-[420px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/tech-labs.jpg"
                    alt="Technology Labs"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
                  <span className="w-10 h-10 md:w-12 md:h-12 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-sm">03</span>
                  <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full hidden md:block">Engineering & Computing</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h4 className="text-white font-semibold text-lg sm:text-xl md:text-2xl mb-2" style={{ lineHeight: 1.2 }}>
                    Technology Labs
                  </h4>
                  <p className="text-white/60 text-sm md:text-base hidden sm:block" style={{ lineHeight: 1.6 }}>
                    Well equipped labs supporting engineering, computing, and applied sciences.
                  </p>
                  <div className="mt-3 md:mt-4 flex items-center gap-2 text-[#f0c14b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Moot Court (spans 7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
              viewport={{ once: true }}
              onClick={() => setSelectedFacility(facilityCards.find(f => f.id === 'moot-court') || null)}
              className="col-span-12 md:col-span-7 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[380px] md:h-[420px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/moot-court.jpg"
                    alt="Shri Cyril Shroff Moot Court"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
                  <span className="w-10 h-10 md:w-12 md:h-12 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-sm">04</span>
                  <span className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1.5 rounded-full hidden md:block">Legal Practice</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h4 className="text-white font-semibold text-lg sm:text-xl md:text-2xl mb-2" style={{ lineHeight: 1.2 }}>
                    Shri Cyril Shroff Moot Court
                  </h4>
                  <p className="text-white/60 text-sm md:text-base hidden sm:block" style={{ lineHeight: 1.6 }}>
                    A dedicated space for legal practice, debates, and mock trials.
                  </p>
                  <div className="mt-3 md:mt-4 flex items-center gap-2 text-[#f0c14b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== SPORTS & LEISURE SECTION ===== */}
      <div id="sports-facilities" />
      <div id="sports-complex" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-[120px] lg:py-[140px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 gap-4"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Sports Facilities
              </span>
              <h2
                className="text-[#21313c] text-3xl sm:text-4xl md:text-4xl lg:text-5xl"
                style={{ fontWeight: 700, lineHeight: 1.1 }}
              >
                Cultivating balance,
              </h2>
              <h2
                className="text-[#21313c] text-xl sm:text-2xl md:text-4xl lg:text-5xl mt-2"
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                Fueling{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  excellence
                </span>
              </h2>
            </div>
            <p className="text-[#666] md:max-w-[600px]" style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', lineHeight: 1.7, fontWeight: 400 }}>
              World-class sports facilities including an Olympic-standard pool, multiple playing fields, and a modern recreation center.
            </p>
          </motion.div>

          {/* Sports Cards - Bento Grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-6">
            {/* Left Card - Olympic Swimming Pool (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="col-span-7 group cursor-pointer"
              onClick={() => setSelectedFacility(sportsModalData[0])}
            >
              <div className="relative overflow-hidden h-[250px] sm:h-[400px] md:h-[580px]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: customEase }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/pool-olympic.jpg"
                    alt="Olympic Swimming Pool"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 md:p-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="self-start bg-[#f0c14b] px-3 py-1.5 md:px-4 md:py-2 rounded-full"
                  >
                    <span className="text-[#21313c] font-semibold text-[10px] md:text-xs">Olympic Standard</span>
                  </motion.div>
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="text-white mb-1 sm:mb-2 md:mb-4 text-sm sm:text-xl md:text-[32px]"
                      style={{ fontWeight: 600, lineHeight: 1.2 }}
                    >
                      6-Lane Swimming Pool
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-white/80 mb-2 sm:mb-4 text-[10px] sm:text-sm md:text-[15px] max-w-[400px] hidden sm:block"
                      style={{ lineHeight: 1.7 }}
                    >
                      An Olympic-standard 6-lane pool with trained lifeguards, temperature control, and competition-ready facilities.
                    </motion.p>
                    {/* Inline stats */}
                    <div className="hidden md:flex gap-6">
                      <div>
                        <p className="text-[#f0c14b] text-2xl font-bold">6</p>
                        <p className="text-white/60 text-xs">Lanes</p>
                      </div>
                      <div>
                        <p className="text-[#f0c14b] text-2xl font-bold">25m</p>
                        <p className="text-white/60 text-xs">Length</p>
                      </div>
                      <div>
                        <p className="text-[#f0c14b] text-2xl font-bold">24/7</p>
                        <p className="text-white/60 text-xs">Lifeguard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 2 Cards */}
            <div className="col-span-5 flex flex-col gap-3 md:gap-6">
              {/* Football & Outdoor Fields */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedFacility(sportsModalData[1])}
              >
                <div className="relative overflow-hidden h-[250px] sm:h-[400px] md:h-[580px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/gallery-16.jpg"
                      alt="Outdoor Sports Fields"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-8">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 md:mb-2 text-[10px] sm:text-base md:text-[22px]">
                      Outdoor Sports Complex
                    </h4>
                    <p className="text-white/80 text-[8px] sm:text-xs md:text-sm hidden sm:block" style={{ lineHeight: 1.6 }}>
                      2 football fields, cricket ground, athletic track, and multi-sport courts.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Sports Facilities Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
            viewport={{ once: true }}
            className="mt-6 md:mt-10 bg-white p-4 md:p-6"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-10 md:gap-y-4 items-center justify-center">
              {sportsFacilities.map((facility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[#f0c14b] rounded-full" />
                  <span className="text-[#21313c] text-xs md:text-sm font-medium whitespace-nowrap">{facility}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== THE PYRAMID - UNIVERSITY LIBRARY SECTION ===== */}
      <div id="the-pyramid-university-library" />
      <div id="library" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-[120px] lg:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl"
            >
              <Image
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/pyramid.jpeg"
                alt="The Pyramid - University Library"
                fill
                className="object-cover"
              />
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
                className="text-[#999] uppercase tracking-widest block mb-4 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                The Pyramid – University Library
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                The Pyramid{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  University Library
                </span>
              </h2>
              <p className="text-[#666] text-sm md:text-base mb-6 md:mb-8" style={{ lineHeight: 1.7 }}>
                An iconic architectural landmark on campus, The Pyramid serves as the intellectual heart of JLU.
                This state-of-the-art library provides students with access to an extensive collection of books,
                journals, and digital resources in an environment designed to inspire learning and research.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {[
                  { title: '50,000+', desc: 'Books & Journals' },
                  { title: '100+', desc: 'Digital Workstations' },
                  { title: '24/7', desc: 'Reading Room Access' },
                  { title: '10+', desc: 'Research Databases' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#f6f7f0] p-4 rounded-lg"
                  >
                    <p className="text-[#21313c] font-semibold text-lg md:text-xl">{item.title}</p>
                    <p className="text-[#666] text-xs md:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

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

      {/* ===== INDOOR MULTIPURPOSE HALL SECTION ===== */}
      <div id="indoor-multipurpose-hall" />
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-[120px] lg:py-[120px]"
          style={{ maxWidth: '1440px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Indoor Multipurpose Hall
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                A space for{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  every occasion
                </span>
              </h2>
              <p className="text-[#666] text-sm md:text-base mb-6 md:mb-8" style={{ lineHeight: 1.7 }}>
                A 15,000 sq. ft. climate-controlled venue for indoor sports, cultural events, conferences, and large gatherings. Equipped with professional lighting and sound systems, the hall serves as a versatile space for the entire university community.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {[
                  { title: '15,000', desc: 'sq. ft. Area' },
                  { title: '500+', desc: 'Seating Capacity' },
                  { title: '50+', desc: 'Events per Year' },
                  { title: 'Multi-Sport', desc: 'Flooring' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-lg"
                  >
                    <p className="text-[#21313c] font-semibold text-lg md:text-xl">{item.title}</p>
                    <p className="text-[#666] text-xs md:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  'Climate-controlled indoor environment',
                  'Indoor badminton and table tennis',
                  'Professional lighting and sound system',
                  'Multi-sport flooring for various activities',
                  'Seating arrangements for large events',
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

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setSelectedFacility(sportsModalData[2])}
            >
              <Image
                src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/sports.jpg"
                alt="Indoor Multipurpose Hall"
                fill
                className="object-cover"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white p-4 md:p-6 rounded-xl shadow-lg"
              >
                <p className="text-[#21313c] text-2xl md:text-4xl font-bold mb-1">15,000</p>
                <p className="text-[#666] text-xs md:text-sm">sq. ft. Multipurpose Space</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== CAMPUS GALLERY SECTION ===== */}
      <div className="w-full bg-white pb-12 md:pb-16 lg:pb-[120px]">
        <div
          className="relative mx-auto overflow-hidden h-[500px] sm:h-[700px] md:h-[1000px]"
          style={{ maxWidth: '1440px' }}
        >
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '24%', top: '0%', left: '13%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-drone.jpg" alt="JLU Campus Aerial View" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '21%', height: '32%', top: '0%', left: '52%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/pyramid.jpeg" alt="The Pyramid Library" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '13%', height: '19%', top: '-5%', left: '89%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/pool-olympic.jpg" alt="Swimming Pool" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '22%', top: '30%', left: '80%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/tech-labs.jpg" alt="Technology Labs" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '19%', height: '32%', top: '31%', left: '0%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9060.JPG" alt="Cultural Fest" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 6 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '20%', height: '34%', top: '60%', left: '80%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/%20m%20s%20gill%20studio.JPG" alt="Culinary Studios" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 7 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '28%', height: '21%', top: '79%', left: '44%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/interdisciplinary/campus-activity.jpg" alt="Shri Gurudev Gupta Media Studio" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 8 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '32%', top: '68%', left: '22%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/gym-new.jpg" alt="Fitness Center" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Card 9 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg md:rounded-2xl"
            style={{ width: '15%', height: '18%', top: '75%', left: '-4%' }}
          >
            <Image src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/moot-court.jpg" alt="Moot Court" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#21313c] mb-2 md:mb-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em' }}
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
          </div>
        </div>
      </div>

      {/* ===== 360 VIRTUAL TOUR CTA SECTION ===== */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20 pt-8 md:pt-14">
        <div className="mx-auto flex flex-col items-center justify-center bg-[#20323d] px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-14 rounded-xl md:rounded-3xl lg:rounded-4xl relative overflow-hidden" style={{ maxWidth: '1400px' }}>
          <motion.div
            className="text-center mb-6 md:mb-10 lg:mb-12 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <span className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold" style={{ letterSpacing: '0.2em' }}>
              Virtual Experience
            </span>
            <h2 className="text-white" style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Explore our campus{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>from anywhere</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Take an immersive 360-degree virtual tour of our 232-acre campus. Walk through academic blocks, explore sports facilities, and experience student life — all from the comfort of your screen.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto mb-10 relative z-10">
            <motion.a
              href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-10 py-3 md:py-4 bg-[#027ea1] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Start 360° Campus Tour
              <span>→</span>
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full relative z-10"
          >
            {[
              { value: '232', unit: 'acres', desc: 'Campus Area' },
              { value: '14', unit: 'blocks', desc: 'Academic Blocks' },
              { value: '50+', unit: 'labs', desc: 'Specialized Labs' },
              { value: '6', unit: 'lanes', desc: 'Olympic Pool' },
            ].map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl text-center">
                <p className="text-[#027ea1] text-2xl md:text-3xl font-bold">{item.value}</p>
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-wider">{item.unit}</p>
                <p className="text-white/70 text-xs md:text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hostel & Mess Fee Structure Modal */}
      <AnimatePresence>
        {showFeeModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeeModal(false)}
            />
            <motion.div
              className="fixed z-[9999] bg-white flex flex-col shadow-2xl"
              style={{
                top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: '540px',
                borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Header */}
              <div className="bg-[#21313c] p-6 md:p-8 shrink-0" style={{ borderTopLeftRadius: '24px' }}>
                <button
                  onClick={() => setShowFeeModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="text-[#f0c14b] text-xs uppercase tracking-widest block mb-2">Student Accommodation</span>
                <h2 className="text-white text-xl md:text-2xl font-semibold">Fee Structure 2026-27</h2>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1" style={{ overscrollBehavior: 'contain' }}>
                {/* Hostel Fees */}
                <div className="mb-8">
                  <h3 className="text-[#21313c] font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#027ea1] rounded-full" />
                    Hostel Fees
                  </h3>
                  <div className="space-y-3">
                    {[
                      { type: 'AC Single Room', fee: '₹1,20,000', period: '/year' },
                      { type: 'AC Double Sharing', fee: '₹90,000', period: '/year' },
                      { type: 'Non-AC Triple Sharing', fee: '₹70,000', period: '/year' },
                      { type: 'Non-AC Quad Sharing', fee: '₹60,000', period: '/year' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#f6f7f0] px-4 py-3 rounded-lg">
                        <span className="text-[#21313c] text-sm font-medium">{item.type}</span>
                        <span className="text-[#027ea1] text-sm font-bold">{item.fee}<span className="text-[#999] font-normal text-xs">{item.period}</span></span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between bg-[#f0c14b]/10 px-4 py-3 rounded-lg border border-[#f0c14b]/30">
                      <span className="text-[#21313c] text-sm font-medium">Security Deposit (Refundable)</span>
                      <span className="text-[#21313c] text-sm font-bold">₹10,000</span>
                    </div>
                  </div>
                </div>

                {/* Mess Fees */}
                <div className="mb-8">
                  <h3 className="text-[#21313c] font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#f0c14b] rounded-full" />
                    Mess Fees
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-[#f6f7f0] px-4 py-3 rounded-lg">
                      <span className="text-[#21313c] text-sm font-medium">Annual Mess Fee</span>
                      <span className="text-[#027ea1] text-sm font-bold">₹50,000<span className="text-[#999] font-normal text-xs">/year</span></span>
                    </div>
                    <div className="flex items-center justify-between bg-[#f6f7f0] px-4 py-3 rounded-lg">
                      <span className="text-[#21313c] text-sm font-medium">Monthly Equivalent</span>
                      <span className="text-[#027ea1] text-sm font-bold">₹4,500<span className="text-[#999] font-normal text-xs">/month</span></span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-[#21313c]/5 rounded-lg">
                    <p className="text-[#666] text-xs" style={{ lineHeight: 1.6 }}>
                      Includes breakfast, lunch, evening snacks, and dinner. Both vegetarian and non-vegetarian options available. Special meals served during festivals and occasions.
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/broucher/Hostel-Mess-Fee-Structure-2026-27.xlsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#027ea1] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#026a88] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Complete Fee Structure
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
