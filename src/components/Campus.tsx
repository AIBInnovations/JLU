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
  { number: '8', suffix: '', label: 'Food Outlets' },
  { number: '6', suffix: '', label: 'Auditoriums' },
  { number: '350', suffix: '+', label: 'Hostel Capacity' },
];

// Infrastructure Items for Accordion
const infrastructureItems = [
  {
    id: 1,
    label: 'University Campus',
    description: 'A thoughtfully planned campus that supports academic focus and student life.',
    image: '/campus/gallery-14.jpg',
    details: {
      overview: 'Spread across 232 acres, the JLU campus is designed to inspire learning and foster community. Every corner reflects a balance between modern infrastructure and natural surroundings, with 9 academic blocks housing world-class facilities.',
      features: [
        'Landscaped gardens and green spaces',
        'Modern architectural design across 14 blocks',
        'Accessible pathways throughout campus',
        'Dedicated zones for academics, sports, and recreation',
      ],
      highlight: '14 academic blocks housing state-of-the-art classrooms and facilities',
    },
  },
  {
    id: 2,
    label: 'Student Accommodation',
    description: 'Modern 3-block hostel with 14 floors offering comfortable residential spaces.',
    image: '/campus/hostel.jpg',
    details: {
      overview: 'Our modern 3-block hostel with 14 floors provides a home away from home, with single, double, and triple occupancy options, 24/7 security, and amenities that support both study and relaxation.',
      features: [
        'Single, double & triple occupancy options',
        'Wi-Fi enabled rooms across all blocks',
        '24/7 security and CCTV surveillance',
        'Common rooms, laundry, and recreation areas',
      ],
      highlight: '3-block hostel with 14 floors and warden supervision',
    },
  },
  {
    id: 3,
    label: 'Dining Facilities',
    description: 'APPETITE food court and mess facilities catering to diverse tastes.',
    image: '/campus/gallery-2.jpg',
    details: {
      overview: 'From a hygienic mess dining hall with 180-person capacity to the APPETITE food court featuring 5 outlets offering global cuisines, students have access to diverse food options throughout the day.',
      features: [
        'APPETITE food court with 5 global cuisine outlets',
        'Mess dining hall — 180 person capacity',
        'Hygienic food preparation standards',
        'Vegetarian and non-vegetarian options daily',
      ],
      highlight: '8 on-campus food outlets serving students and faculty',
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

// Healthcare items
const healthcareItems = [
  {
    title: 'Medical Clinic',
    subtitle: '24/7 Healthcare',
    description: 'A fully equipped medical clinic with qualified staff, sanitized equipment, and ambulance services available round the clock for emergencies.',
    stats: [
      { value: '24/7', label: 'Availability' },
      { value: '2', label: 'Ambulances' },
    ],
    image: '/campus/gallery-8.jpg',
    features: ['Qualified medical staff on campus', 'Sanitized medical equipment', 'Emergency ambulance services', 'First-aid facilities in every block'],
  },
  {
    title: 'Fitness Center',
    subtitle: 'State-of-the-Art Gym',
    description: 'A modern fitness center featuring cardiovascular machines, weight training equipment, and dedicated areas for yoga and functional training.',
    stats: [
      { value: '5,000', label: 'sq. ft. Area' },
      { value: '50+', label: 'Equipment' },
    ],
    image: '/campus/gym.jpg',
    features: ['Cardiovascular training zone', 'Free weights & resistance machines', 'Yoga and meditation space', 'Professional trainers available'],
  },
  {
    title: 'Swimming Pool',
    subtitle: 'Olympic Standard',
    description: 'A 6-lane Olympic standard swimming pool with trained lifeguards, temperature control, and dedicated lanes for competitive practice.',
    stats: [
      { value: '6', label: 'Lanes' },
      { value: 'Olympic', label: 'Standard' },
    ],
    image: '/campus/gallery-18.jpg',
    features: ['Olympic standard dimensions', 'Temperature-controlled water', 'Trained lifeguards on duty', 'Competition-ready timing system'],
  },
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
    title: 'Gurudev Gupta Media Studio',
    category: 'Academic Infrastructure',
    image: '/campus/gallery-3.jpg',
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
    image: '/campus/gallery-7.jpg',
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
    image: '/campus/gallery-11.jpg',
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
    image: '/campus/gallery-15.jpg',
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
    image: '/campus/gallery-14.jpg',
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
    image: '/campus/hostel.jpg',
    description: 'Our modern 3-block hostel with 14 floors provides a home away from home, with single, double, and triple occupancy options, 24/7 security, and amenities that support both study and relaxation.',
    features: [
      'Single, double & triple occupancy options',
      'Wi-Fi enabled rooms across all blocks',
      '24/7 security and CCTV surveillance',
      'Common rooms, laundry, and recreation areas',
      'In-house mess and dining facilities',
    ],
    stats: [
      { label: 'Hostel Blocks', value: '3' },
      { label: 'Floors', value: '14' },
      { label: 'Capacity', value: '350+' },
    ],
  },
  {
    id: 'dining-facilities',
    title: 'Dining Facilities',
    category: 'Campus Infrastructure',
    image: '/campus/gallery-2.jpg',
    description: 'From a hygienic mess dining hall with 180-person capacity to the APPETITE food court featuring 5 outlets offering global cuisines, students have access to diverse food options throughout the day.',
    features: [
      'APPETITE food court with 5 global cuisine outlets',
      'Mess dining hall with 180 person capacity',
      'Hygienic food preparation standards',
      'Vegetarian and non-vegetarian options daily',
      'Cafeterias in every academic block',
    ],
    stats: [
      { label: 'Food Outlets', value: '8' },
      { label: 'Mess Capacity', value: '180' },
      { label: 'Cuisines', value: '5+' },
    ],
  },
];

// Healthcare modal data
const healthcareModalData: FacilityData[] = [
  {
    id: 'medical-clinic',
    title: 'Medical Clinic',
    category: 'Healthcare & Wellness',
    image: '/campus/gallery-8.jpg',
    description: 'A fully equipped medical clinic with qualified staff, sanitized equipment, and ambulance services available round the clock for emergencies.',
    features: [
      'Qualified medical staff on campus',
      'Sanitized medical equipment',
      'Emergency ambulance services',
      'First-aid facilities in every block',
      'Regular health check-up camps',
    ],
    stats: [
      { label: 'Availability', value: '24/7' },
      { label: 'Ambulances', value: '2' },
      { label: 'First Aid Points', value: '14' },
    ],
  },
  {
    id: 'fitness-center',
    title: 'Fitness Center',
    category: 'Healthcare & Wellness',
    image: '/campus/gym.jpg',
    description: 'A modern fitness center featuring cardiovascular machines, weight training equipment, and dedicated areas for yoga and functional training.',
    features: [
      'Cardiovascular training zone',
      'Free weights & resistance machines',
      'Yoga and meditation space',
      'Professional trainers available',
      'Functional training area',
    ],
    stats: [
      { label: 'Area', value: '5,000 sq.ft.' },
      { label: 'Equipment', value: '50+' },
      { label: 'Trainers', value: '4' },
    ],
  },
  {
    id: 'swimming-pool',
    title: 'Swimming Pool',
    category: 'Healthcare & Wellness',
    image: '/campus/gallery-18.jpg',
    description: 'A 6-lane Olympic standard swimming pool with trained lifeguards, temperature control, and dedicated lanes for competitive practice.',
    features: [
      'Olympic standard dimensions',
      'Temperature-controlled water',
      'Trained lifeguards on duty',
      'Competition-ready timing system',
      'Separate training sessions available',
    ],
    stats: [
      { label: 'Lanes', value: '6' },
      { label: 'Standard', value: 'Olympic' },
      { label: 'Length', value: '25m' },
    ],
  },
];

// Sports modal data
const sportsModalData: FacilityData[] = [
  {
    id: 'swimming-pool-sports',
    title: '6-Lane Olympic Swimming Pool',
    category: 'Sports Facilities',
    image: '/campus/gallery-18.jpg',
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
    image: '/campus/gallery-16.jpg',
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
    image: '/campus/sports.jpg',
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
                      <svg className="w-5 h-5 bg-[#03463B] text-white rounded-full p-1 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [activeInfrastructure, setActiveInfrastructure] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState<FacilityData | null>(null);
  const [activeHealthcare, setActiveHealthcare] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
              src="/campus/hero-campus.jpg"
              alt="JLU Campus"
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
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              learning
            </span>{' '}
            LIVES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white font-semibold leading-tight text-base sm:text-lg md:text-[clamp(1.25rem,2.5vw,2rem)]"
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
        <div className="mx-auto px-5 sm:px-8 md:px-[120px]" style={{ maxWidth: '1440px' }}>
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
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.1 }}
            >
              World-class{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                infrastructure
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

      {/* ===== TECHNOLOGY-BASED CLASSROOMS SECTION ===== */}
      <div id="laboratories" className="w-full bg-white">
        <div className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]" style={{ maxWidth: '1440px' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left - Large Image with floating overlay */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: customEase }}
              viewport={{ once: true }}
              className="md:col-span-7 relative"
            >
              <div className="relative h-[300px] sm:h-[450px] md:h-[620px] overflow-hidden">
                <Image
                  src="/campus/smart-classroom.jpg"
                  alt="Technology-Based Classrooms"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating stats strip at bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 md:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[#21313c] text-2xl md:text-4xl font-bold">125+</p>
                      <p className="text-[#666] text-[10px] md:text-xs uppercase tracking-wider">Smart Classrooms</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div>
                      <p className="text-[#21313c] text-2xl md:text-4xl font-bold">9</p>
                      <p className="text-[#666] text-[10px] md:text-xs uppercase tracking-wider">Academic Blocks</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div>
                      <p className="text-[#21313c] text-2xl md:text-4xl font-bold">100%</p>
                      <p className="text-[#666] text-[10px] md:text-xs uppercase tracking-wider">Tech Enabled</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="md:col-span-5 md:pt-8"
            >
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Smart Learning Spaces
              </span>
              <h2
                className="text-[#21313c] text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3rem)] mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Technology-Based{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Classrooms
                </span>
              </h2>
              <p className="text-[#666] text-sm md:text-base mb-8 md:mb-10" style={{ lineHeight: 1.7 }}>
                Our 125+ classrooms across 9 academic blocks are designed with ergonomic precision and acoustic optimization, ensuring every lecture is delivered in an environment that maximizes learning and eliminates distractions.
              </p>

              {/* Feature Items - Staggered vertical list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-5 md:space-y-6"
              >
                {classroomFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 md:w-14 md:h-14 bg-[#f6f7f0] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#21313c] group-hover:text-white text-[#21313c] transition-colors duration-300">
                      <feature.icon />
                    </div>
                    <div>
                      <h4 className="text-[#21313c] font-semibold text-sm md:text-base mb-1">{feature.title}</h4>
                      <p className="text-[#666] text-xs md:text-sm" style={{ lineHeight: 1.6 }}>{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== HEALTHCARE & WELLNESS SECTION ===== */}
      <div id="medical-center" className="w-full bg-[#21313c]">
        <div className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]" style={{ maxWidth: '1440px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="mb-10 md:mb-16"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-[10px] md:text-xs"
              style={{ letterSpacing: '0.2em' }}
            >
              Healthcare & Safety
            </span>
            <h2
              className="text-white text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3.5rem)] mb-4"
              style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Your well-being,{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                our priority
              </span>
            </h2>
            <p className="text-[#999] text-sm md:text-base max-w-[600px]" style={{ lineHeight: 1.7 }}>
              From 24/7 medical care to Olympic-standard fitness facilities, JLU ensures every student has access to world-class healthcare and wellness infrastructure.
            </p>
          </motion.div>

          {/* Healthcare Tabs - Interactive panel switcher */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            {/* Tab buttons - vertical on desktop */}
            <div className="flex md:flex-col gap-2 md:gap-0 md:w-[280px] md:shrink-0 overflow-x-auto md:overflow-visible">
              {healthcareItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveHealthcare(index)}
                  className={`text-left px-4 py-4 md:px-6 md:py-6 border-l-2 md:border-l-[3px] transition-all duration-300 whitespace-nowrap md:whitespace-normal ${
                    activeHealthcare === index
                      ? 'border-[#f0c14b] bg-white/5'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className={`block text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    activeHealthcare === index ? 'text-[#f0c14b]' : 'text-white/50'
                  }`}>
                    {item.subtitle}
                  </span>
                  <span className={`block text-base md:text-lg font-medium transition-colors duration-300 mt-0.5 ${
                    activeHealthcare === index ? 'text-white' : 'text-white/70'
                  }`}>
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Active panel content */}
            <div className="flex-1 md:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHealthcare}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: customEase }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
                >
                  {/* Image */}
                  <div
                    className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-xl cursor-pointer group/health"
                    onClick={() => setSelectedFacility(healthcareModalData[activeHealthcare] || null)}
                  >
                    <Image
                      src={healthcareItems[activeHealthcare].image}
                      alt={healthcareItems[activeHealthcare].title}
                      fill
                      className="object-cover group-hover/health:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                      {healthcareItems[activeHealthcare].stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg"
                        >
                          <p className="text-[#21313c] text-lg md:text-2xl font-bold">{stat.value}</p>
                          <p className="text-[#666] text-[10px] md:text-xs">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <p className="text-[#999] text-sm md:text-base mb-6" style={{ lineHeight: 1.8 }}>
                      {healthcareItems[activeHealthcare].description}
                    </p>
                    <div className="space-y-3 mb-6">
                      {healthcareItems[activeHealthcare].features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.08 }}
                          className="flex items-center gap-3"
                        >
                          <span className="w-2 h-2 bg-[#f0c14b] rounded-full shrink-0" />
                          <span className="text-white/80 text-sm md:text-base">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => setSelectedFacility(healthcareModalData[activeHealthcare] || null)}
                      className="self-start inline-flex items-center gap-2 text-[#f0c14b] text-sm font-medium hover:gap-3 transition-all cursor-pointer"
                    >
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CAMPUS INFRASTRUCTURE (Hostel & Dining) SECTION ===== */}
      <div id="student-accommodation" />
      <div id="dining-services" />
      <div id="facilities" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{ maxWidth: '1440px' }}
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
              className="text-[#666] text-sm md:text-base md:max-w-[400px]"
              style={{ lineHeight: 1.7 }}
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
                    <button
                      onClick={() => setActiveInfrastructure(activeInfrastructure === item.id ? 0 : item.id)}
                      className="group w-full flex items-center justify-between py-5 md:py-6 text-left transition-all duration-300"
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
                            <p className="text-[#666] text-sm md:text-[15px] mb-4" style={{ lineHeight: 1.7 }}>
                              {item.details.overview}
                            </p>
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
                                  <span className="text-[#444] text-sm" style={{ lineHeight: 1.5 }}>{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 bg-[#f6f7f0] px-4 py-2 rounded-lg"
                              >
                                <span className="w-2 h-2 bg-[#03463B] rounded-full" />
                                <span className="text-[#21313c] text-xs md:text-sm font-medium">{item.details.highlight}</span>
                              </motion.div>
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedFacility(infrastructureModalData.find(f => f.id === (item.id === 1 ? 'university-campus' : item.id === 2 ? 'student-accommodation' : 'dining-facilities')) || null);
                                }}
                                className="inline-flex items-center gap-1.5 text-[#03463B] text-xs md:text-sm font-medium hover:underline cursor-pointer"
                              >
                                Learn More
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                              </motion.button>
                            </div>
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
              className="relative shrink-0 overflow-hidden w-full h-[300px] sm:h-[400px] md:w-[580px] md:h-[650px] cursor-pointer"
              onClick={() => {
                const id = activeInfrastructure === 1 ? 'university-campus' : activeInfrastructure === 2 ? 'student-accommodation' : 'dining-facilities';
                setSelectedFacility(infrastructureModalData.find(f => f.id === id) || null);
              }}
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

      {/* ===== ACADEMIC INFRASTRUCTURE SECTION ===== */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
          style={{ maxWidth: '1440px' }}
        >
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
                    src="/campus/gallery-3.jpg"
                    alt="Gurudev Gupta Media Studio"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">01</span>
                </motion.div>
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
                    src="/campus/gallery-7.jpg"
                    alt="M S Gill Culinary Studios"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">02</span>
                </motion.div>
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
                    src="/campus/gallery-11.jpg"
                    alt="Technology Labs"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">03</span>
                </motion.div>
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
                    src="/campus/gallery-15.jpg"
                    alt="Shri Cyril Shroff Moot Court"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6 w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 bg-[#f0c14b] flex items-center justify-center"
                  style={{ borderRadius: '50%' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[#21313c] font-semibold text-[10px] sm:text-xs md:text-sm">04</span>
                </motion.div>
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

      {/* ===== SPORTS & LEISURE SECTION ===== */}
      <div id="sports-complex" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-12 sm:px-8 sm:py-16 md:px-[120px] md:py-[140px]"
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
                className="text-[#999] uppercase tracking-widest block mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.2em' }}
              >
                Sports & Leisure
              </span>
              <h2
                className="text-[#21313c] text-3xl sm:text-4xl md:text-5xl"
                style={{ fontWeight: 700, lineHeight: 1.1 }}
              >
                Cultivating balance,
              </h2>
              <h2
                className="text-[#21313c] text-xl sm:text-2xl md:text-[40px] mt-2"
                style={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                Fueling{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  excellence
                </span>
              </h2>
            </div>
            <p className="text-[#666] text-sm md:text-base md:max-w-[360px]" style={{ lineHeight: 1.7 }}>
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
                    src="/campus/gallery-18.jpg"
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
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="/campus/gallery-16.jpg"
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

              {/* Indoor Multipurpose Hall */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedFacility(sportsModalData[2])}
              >
                <div className="relative overflow-hidden h-[118px] sm:h-[190px] md:h-[280px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: customEase }}
                  >
                    <Image
                      src="/campus/sports.jpg"
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
                      A 15,000 sq. ft. climate-controlled venue for sports, events, and gatherings.
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
      <div id="library" className="w-full bg-white">
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
                src="/campus/gallery-9.jpg"
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

      {/* ===== CAMPUS GALLERY SECTION ===== */}
      <div className="w-full bg-white pb-12 md:pb-[120px]">
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
            <Image src="/campus/aerial-view.webp" alt="Students in library" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/accommodation.jpg" alt="Event hall" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-4.jpg" alt="Campus building" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-12.jpg" alt="Lab equipment" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-17.jpg" alt="Campus event" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-6.jpg" alt="Students together" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-10.jpg" alt="Graduation" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-13.jpg" alt="Library" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Image src="/campus/gallery-19.jpg" alt="Sports" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#21313c] mb-2 md:mb-4 text-lg sm:text-2xl md:text-[clamp(2rem,4vw,3rem)]"
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

      {/* ===== 360 VIRTUAL TOUR CTA SECTION ===== */}
      <div className="w-full bg-[#21313c] relative overflow-hidden">
        <div
          className="mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-[120px] md:py-[100px] relative z-10"
          style={{ maxWidth: '1440px' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <span
                className="text-[#f0c14b] uppercase tracking-widest block mb-4 text-[10px] md:text-xs"
                style={{ letterSpacing: '0.25em' }}
              >
                Virtual Experience
              </span>
              <h2
                className="text-white text-2xl sm:text-3xl md:text-[clamp(2.5rem,5vw,4rem)] mb-4 md:mb-6"
                style={{ fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Explore our campus{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  from anywhere
                </span>
              </h2>
              <p className="text-[#999] text-sm md:text-base max-w-[500px] mb-6 md:mb-8" style={{ lineHeight: 1.7 }}>
                Take an immersive 360-degree virtual tour of our 232-acre campus. Walk through academic blocks, explore sports facilities, and experience student life — all from the comfort of your screen.
              </p>
              <motion.a
                href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#f0c14b] text-[#21313c] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(240,193,75,0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Start 360° Campus Tour
                <span>→</span>
              </motion.a>
            </motion.div>

            {/* Right - decorative stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {[
                { value: '232', unit: 'acres', desc: 'Campus Area' },
                { value: '14', unit: 'blocks', desc: 'Academic Blocks' },
                { value: '50+', unit: 'labs', desc: 'Specialized Labs' },
                { value: '6', unit: 'lanes', desc: 'Olympic Pool' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-xl text-center"
                >
                  <p className="text-[#f0c14b] text-2xl md:text-3xl font-bold">{item.value}</p>
                  <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-wider">{item.unit}</p>
                  <p className="text-white/70 text-xs md:text-sm mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none">
          <div className="absolute inset-0 border border-white rounded-full" />
          <div className="absolute inset-[80px] border border-white rounded-full" />
          <div className="absolute inset-[160px] border border-white rounded-full" />
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
