'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

// ============================================
// NAVIGATION DATA
// ============================================
const navigationItems = [
  { label: 'About Us', href: '/about', sections: ['Leadership Messages', 'Institutional Overview', 'Governance', 'Accreditations', 'University Partnerships', 'JLU Staff', 'Ranking & Awards'] },
  { label: 'Programs', href: '/programs', sections: ['52+ Programs Offered', 'Programs List', 'Perspective', 'Intent', 'Depth', 'Relevance'] },
  { label: 'Events', href: '/events', sections: ['Upcoming Events', 'Past Events', 'Signature Events & Campus Experiences', 'Leadership & Community Impact', "Don't Miss Our Updates"] },
  { label: 'Academics', href: '/academics', sections: ['Philosophy That Guides Every Step', 'Faculties & Schools', 'How Learning Takes Shape', 'Voices From Within'] },
  { label: 'Campus', href: '/campus', sections: ['Campus At A Glance', 'Built For Excellence', 'Student Accommodation', 'Dining Facilities', 'Media Studio', 'Technology Labs', 'Moot Court', 'Sports & Wellness', 'Campus Gallery'] },
  { label: 'Admissions', href: '/admissions', sections: ['Choose Your Academic Path', 'Undergraduate Programs', 'Postgraduate Programs', 'Research Degrees', 'Beyond Degrees', 'Experience The Campus', 'Scholarships & Freeships', 'Admission FAQs'] },
  { label: 'Research', href: '/research', sections: ['Research Ecosystem', 'Centres of Excellence', 'Faculty Research Areas', 'Interdisciplinary Labs', 'Graduate Research', 'Latest Publication', 'Faculty Spotlight'] },
  { label: 'Campus Life', href: '/campus-life', sections: ['Student Life', 'Find Your People', 'Lead. Represent. Inspire.', 'Celebrating Student Success', 'Careers & Innovation', 'Where Ideas Become Startups', 'More Than A Campus'] },
  { label: 'Alumni', href: '/alumni', sections: ['Alumni Services', 'Notable Alumni', 'Success Stories', 'Voices of Alumni', 'Upcoming Events', 'Global Alumni Network'] },
  { label: 'Podcast', href: '/podcast', sections: ['Featured Episode', 'All Episodes', 'Industry Guests', 'Subscribe to JLU Talks'] },
  { label: 'Placements', href: '/placement', sections: ['Career Excellence', 'Industry Excellence', 'Career Growth', 'Global Reach', 'Our Success Stories', '500+ Recruiting Partners'] },
  { label: 'International Office', href: '/international-office', sections: ['Choose Program', 'Submit Application', 'Receive Offer Letter', 'Apply For Visa', 'Arrive On Campus', 'Global Partnerships', 'Visa Guidance'] },
  { label: 'News & Events', href: '/news-events', sections: ['Past Events', 'Featured News', 'Event Gallery'] },
];

// Bottom menu items - always shown in right section
const bottomMenuItems = [
  { label: 'Student Clubs', href: '/student-clubs' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Faculty of Management', href: '/faculty/management' },
  { label: 'Faculty of Journalism', href: '/faculty/journalism' },
  { label: 'Faculty of Humanities & Design', href: '/faculty/humanities' },
  { label: 'Faculty of Engineering', href: '/faculty/engineering' },
  { label: 'Faculty of Pharmacy', href: '/faculty/pharmacy' },
  { label: 'Faculty of Law', href: '/faculty/law' },
];

// ============================================
// MENU OVERLAY COMPONENT (renders inside hero container)
// ============================================
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  heroRef: React.RefObject<HTMLDivElement | null>;
}

const MenuOverlay = ({ isOpen, onClose, menuButtonRef, heroRef }: MenuOverlayProps) => {
  const [activeItem, setActiveItem] = useState<string>('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Get the currently hovered navigation item
  const hoveredNavItem = navigationItems.find(item => item.label === hoveredItem);

  // Medium circle size for menu - smaller on mobile
  const circleSize = isMobile ? 2000 : 1600;

  // Menu button dimensions (pill shape on desktop, square on mobile)
  const buttonWidth = isMobile ? 24 : 168;
  const buttonHeight = isMobile ? 24 : 48;

  // Get the menu button position for the expansion origin
  // Mobile uses viewport-relative (for fixed positioning), Desktop uses hero-relative (for absolute positioning)
  const getButtonPosition = () => {
    if (menuButtonRef.current && heroRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();

      if (isMobile) {
        // For mobile with fixed positioning, use viewport-relative coordinates
        return {
          left: buttonRect.left,
          top: buttonRect.top,
          centerX: buttonRect.left + buttonRect.width / 2,
          centerY: buttonRect.top + buttonRect.height / 2,
        };
      }

      // For desktop with absolute positioning, use hero-relative coordinates
      return {
        left: buttonRect.left - heroRect.left,
        top: buttonRect.top - heroRect.top,
        centerX: buttonRect.left - heroRect.left + buttonRect.width / 2,
        centerY: buttonRect.top - heroRect.top + buttonRect.height / 2,
      };
    }
    // Fallback
    return { left: 0, top: 0, centerX: 0, centerY: 0 };
  };

  const buttonPos = getButtonPosition();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile: Square-to-fullscreen expanding overlay */}
          {isMobile ? (
            <>
              {/* Expanding square background - starts behind menu button */}
              <motion.div
                initial={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  left: buttonPos.left - 2,
                  top: buttonPos.top - 2,
                }}
                animate={{
                  width: '100vw',
                  height: '100vh',
                  borderRadius: '0px',
                  left: 0,
                  top: 0,
                }}
                exit={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  left: buttonPos.left - 2,
                  top: buttonPos.top - 2,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="fixed bg-white"
                style={{
                  zIndex: 40,
                }}
              />

              {/* Content layer with close button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                className="fixed inset-0 overflow-y-auto"
                style={{ zIndex: 59 }}
              >
                {/* Close button - positioned at same location as hamburger menu */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  onClick={onClose}
                  className="fixed top-6 right-6 h-6 w-6 rounded-md bg-[#03463B] flex items-center justify-center shadow-lg z-100"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.button>

                {/* Mobile Navigation content - side by side like desktop */}
                <div className="flex gap-4 px-4 pt-20 pb-8">
                  {/* Main navigation - left side */}
                  <div className="flex flex-col flex-1">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      className="text-[10px] text-gray-500 mb-3"
                    >
                      Navigation
                    </motion.p>
                    <nav className="flex flex-col gap-1.5">
                      {navigationItems.map((item, index) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                          onClick={() => setActiveItem(item.label)}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                            activeItem === item.label
                              ? 'text-[#03463B]'
                              : 'text-[#03463B]/60 hover:text-[#03463B]'
                          }`}
                        >
                          {activeItem === item.label && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#03463B]" />
                          )}
                          {item.label}
                        </motion.a>
                      ))}
                    </nav>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-[1px] bg-gray-300 self-stretch my-4" />

                  {/* Right side - Hovered item content or bottom menu */}
                  <div className="flex flex-col gap-1.5 flex-1 pt-6 min-h-[200px]">
                    <AnimatePresence mode="wait">
                      {hoveredNavItem ? (
                        <motion.div
                          key={hoveredNavItem.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="flex flex-col gap-1.5"
                        >
                          <h3 className="text-sm font-semibold text-[#03463B] mb-1">
                            {hoveredNavItem.label}
                          </h3>
                          {hoveredNavItem.sections.map((section) => (
                            <span key={section} className="text-xs text-[#03463B]/60">
                              {section}
                            </span>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bottom-menu"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="flex flex-col gap-1.5"
                        >
                          {bottomMenuItems.map((subItem, index) => (
                            <motion.a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={onClose}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                              className="text-xs text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                            >
                              {subItem.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Desktop: Pill-to-circle expanding background - starts behind menu button */}
              <motion.div
                initial={{
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: '6px',
                  left: buttonPos.left,
                  top: buttonPos.top,
                  borderWidth: 0,
                }}
                animate={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: '800px',
                  left: buttonPos.centerX - circleSize / 2,
                  top: buttonPos.centerY - circleSize / 2,
                  borderWidth: 12,
                }}
                exit={{
                  width: buttonWidth,
                  height: buttonHeight,
                  borderRadius: '6px',
                  left: buttonPos.left,
                  top: buttonPos.top,
                  borderWidth: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute bg-white"
                style={{
                  zIndex: 100,
                  borderStyle: 'solid',
                  borderColor: '#d1d5db',
                }}
              />

              {/* Content layer - positioned within circle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
                className="absolute overflow-hidden flex items-center justify-center"
                style={{
                  zIndex: 101,
                  width: `${circleSize}px`,
                  height: `${circleSize}px`,
                  left: `${buttonPos.centerX - circleSize / 2}px`,
                  top: `${buttonPos.centerY - circleSize / 2}px`,
                  borderRadius: '50%',
                }}
              >
                {/* Close button - positioned on top of menu button (center of circle) */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  onClick={onClose}
                  className="absolute flex h-[45px] w-[45px] items-center justify-center rounded-xl hover:opacity-90 transition-all"
                  style={{
                    top: '47.6%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#03463B',
                  }}
                  aria-label="Close menu"
                >
                  {/* X icon with two crossing lines */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="5"
                      y1="5"
                      x2="19"
                      y2="19"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="19"
                      y1="5"
                      x2="5"
                      y2="19"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.button>

                {/* Navigation content */}
                <div className="flex gap-16" style={{ marginTop: '500px', marginLeft: '-550px' }}>
                  {/* Main navigation */}
                  <div className="flex flex-col">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-sm text-gray-500 mb-5"
                    >
                      Navigation
                    </motion.p>
                    <nav className="flex flex-col gap-2.5">
                      {navigationItems.map((item, index) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
                          onClick={() => setActiveItem(item.label)}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={`text-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                            activeItem === item.label
                              ? 'text-[#03463B]'
                              : 'text-[#03463B]/60 hover:text-[#03463B]'
                          }`}
                        >
                          {activeItem === item.label && (
                            <span className="w-2 h-2 rounded-full bg-[#03463B]" />
                          )}
                          {item.label}
                        </motion.a>
                      ))}
                    </nav>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-[1px] bg-gray-300 self-stretch my-8" />

                  {/* Right side - Hovered item content or bottom menu */}
                  <div className="flex flex-col gap-2.5 pt-8 min-w-[250px]">
                    <AnimatePresence mode="wait">
                      {hoveredNavItem ? (
                        <motion.div
                          key={hoveredNavItem.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="flex flex-col gap-2"
                        >
                          <h3 className="text-lg font-semibold text-[#03463B] mb-1">
                            {hoveredNavItem.label}
                          </h3>
                          {hoveredNavItem.sections.map((section) => (
                            <span key={section} className="text-sm text-[#03463B]/60">
                              {section}
                            </span>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="bottom-menu"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="flex flex-col gap-2.5"
                        >
                          {bottomMenuItems.map((subItem, index) => (
                            <motion.a
                              key={subItem.label}
                              href={subItem.href}
                              onClick={onClose}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              className="text-sm text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                            >
                              {subItem.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// MENU BUTTON - Toggle button that shows X when open
// ============================================
interface MenuButtonProps {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isOpen?: boolean;
}

const MenuButton = ({ onClick, buttonRef, isOpen }: MenuButtonProps) => {
  const isMobile = useIsMobile();

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative flex items-center justify-center shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${
        isMobile ? 'h-6 w-6 rounded-md' : 'h-[48px] w-[168px] rounded-md'
      } ${isOpen && isMobile ? 'bg-[#03463B]' : 'bg-white'}`}
      style={{ zIndex: 10000 }}
    >
      {/* Desktop: Show Menu text and divider (only when not open) */}
      {!isMobile && !isOpen && (
        <>
          <span className="text-sm font-medium tracking-wide pl-4 mr-auto text-[#0c3b5f]">Menu</span>
          <div className="h-[48px] w-px bg-gray-300 mx-5" />
        </>
      )}

      {/* Mobile: Show X when open, hamburger when closed */}
      {isMobile ? (
        isOpen ? (
          // X icon for close
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger icon
          <div className="flex flex-col gap-[4px]">
            <span className="h-[2px] bg-[#0c3b5f] w-[14px]" />
            <span className="h-[2px] bg-[#0c3b5f] w-[14px]" />
          </div>
        )
      ) : (
        // Desktop hamburger (always show)
        <div className={`flex flex-col gap-[6px] ${!isOpen ? 'pr-5' : ''}`}>
          <span className="h-[2px] bg-[#0c3b5f] w-[23.5px]" />
          <span className="h-[2px] bg-[#0c3b5f] w-[23.5px]" />
        </div>
      )}
    </button>
  );
};

// ============================================
// HERO COMPONENT
// ============================================
export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoButtonPos, setVideoButtonPos] = useState({ left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0 });
  const [expandingCard, setExpandingCard] = useState<number | null>(null);
  const [cardRect, setCardRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();


  // Refs for GSAP animation
  const backgroundRef = useRef<HTMLImageElement>(null);
  const buildingRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Track image loading state
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Wait for images to load before starting animation
  useEffect(() => {
    let count = 0;
    const totalImages = 2;

    const handleImageLoad = () => {
      count++;
      if (count === totalImages) {
        // Add a small delay to ensure everything is painted
        setTimeout(() => setImagesLoaded(true), 200);
      }
    };

    if (backgroundRef.current && buildingRef.current) {
      if (backgroundRef.current.complete) {
        handleImageLoad();
      } else {
        backgroundRef.current.addEventListener('load', handleImageLoad);
      }

      if (buildingRef.current.complete) {
        handleImageLoad();
      } else {
        buildingRef.current.addEventListener('load', handleImageLoad);
      }
    }

    return () => {
      if (backgroundRef.current) {
        backgroundRef.current.removeEventListener('load', handleImageLoad);
      }
      if (buildingRef.current) {
        buildingRef.current.removeEventListener('load', handleImageLoad);
      }
    };
  }, []);

  // GSAP Timeline Animation - only runs after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    // Set initial states immediately - both images start as a line in the middle
    // On mobile, building is 65% height at bottom, so adjust its clipPath to match background's visual center
    const buildingClipStart = isMobile ? '23%' : '50%';
    gsap.set(backgroundRef.current, {
      opacity: 1,
      clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      scale: 1,
    });
    gsap.set(buildingRef.current, {
      opacity: 1,
      clipPath: `polygon(0% ${buildingClipStart}, 100% ${buildingClipStart}, 100% ${buildingClipStart}, 0% ${buildingClipStart})`,
      scale: 1,
    });
    gsap.set(textRef.current, {
      opacity: 0,
      y: isMobile ? 200 : 400,
    });
    gsap.set(navRef.current, {
      opacity: 0,
      y: -30,
    });
    gsap.set(exploreButtonRef.current, {
      opacity: 0,
      y: 30,
    });

    let tl: gsap.core.Timeline | null = null;

    // Start animation immediately (page loader deactivated)
    const loaderDelay = setTimeout(() => {
      tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Animation sequence
      tl
        // 1. Both images reveal from middle to top and bottom
        .to([backgroundRef.current, buildingRef.current], {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power2.inOut',
        })
        // 2. Subtle zoom effect on both images (reduced for performance)
        .to([backgroundRef.current, buildingRef.current], {
          scale: 1.02,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
        // 3. Text slides up and fades in (behind building)
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: isMobile ? 1.4 : 1.2,
          ease: 'power2.out',
        }, isMobile ? '-=0.8' : '-=1.2')
        // 4. Navigation fades in
        .to(navRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.8')
        // 5. Explore button fades in (same time as nav)
        .to(exploreButtonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.8');
    }, 0); // Start immediately (page loader deactivated)

    return () => {
      clearTimeout(loaderDelay);
      if (tl) tl.kill();
    };
  }, [imagesLoaded, isMobile]);

  return (
    <div className="bg-[#f6f7f0]">
      {/* Cinematic Hero Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? 'calc(100vh - 16px)' : 'calc(100vh - 4px)', padding: isMobile ? '16px' : '24px' }}
      >
        <div
          ref={heroRef}
          className="relative w-full h-full overflow-hidden rounded-3xl"
        >
          {/* Menu Overlay - renders inside hero container */}
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            menuButtonRef={menuButtonRef}
            heroRef={heroRef}
          />

          {/* Layer 1: Background Image (z-index: 1) */}
          <div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          >
            <img
              ref={backgroundRef}
              src="/onlybg.png"
              alt="Background"
              className={`absolute inset-0 w-full h-full object-cover ${isMobile ? '' : 'scale-110'}`}
              style={{
                objectPosition: isMobile ? 'center center' : 'center top',
                clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
              }}
            />
          </div>

          {/* Layer 2: Text - JAGRAN LAKECITY UNIVERSITY (z-index: 2) */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: 2,
              paddingBottom: isMobile ? '45%' : '10%',
              opacity: 0,
            }}
          >
            <h1
              className="text-center font-bold uppercase tracking-wider select-none"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontSize: isMobile ? 'clamp(4.5rem, 22vw, 8rem)' : 'clamp(15rem, 20vw, 20rem)',
                lineHeight: isMobile ? 1.0 : 1.1,
                letterSpacing: isMobile ? '0.02em' : '0.01em',
                wordSpacing: isMobile ? '0.2em' : '1em',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                maxWidth: isMobile ? '90vw' : 'none',
                backgroundImage: isMobile
                  ? 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0) 100%)'
                  : 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}
            >
              {isMobile ? (
                <>
                  JAGRAN<br />LAKECITY
                </>
              ) : (
                'JAGRAN LAKECITY'
              )}
            </h1>
          </div>

          {/* Layer 3: Building/Foreground Image (z-index: 3) */}
          <img
            ref={buildingRef}
            src="/jluherot.png"
            alt="JLU Building"
            className="absolute"
            style={{
              zIndex: 3,
              width: '100%',
              height: isMobile ? '65%' : '100%',
              bottom: 0,
              left: 0,
              right: 0,
              objectFit: 'cover',
              objectPosition: 'center bottom',
              clipPath: isMobile
                ? 'polygon(0% 23%, 100% 23%, 100% 23%, 0% 23%)'
                : 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            }}
          />

          {/* Explore JLU Button (z-index: 120) */}
          <button
            ref={exploreButtonRef}
            onClick={() => {
              if (exploreButtonRef.current && heroRef.current) {
                const buttonRect = exploreButtonRef.current.getBoundingClientRect();
                const heroRect = heroRef.current.getBoundingClientRect();
                if (isMobile) {
                  setVideoButtonPos({
                    left: buttonRect.left,
                    top: buttonRect.top,
                    width: buttonRect.width,
                    height: buttonRect.height,
                    centerX: buttonRect.left + buttonRect.width / 2,
                    centerY: buttonRect.top + buttonRect.height / 2,
                  });
                } else {
                  setVideoButtonPos({
                    left: buttonRect.left - heroRect.left,
                    top: buttonRect.top - heroRect.top,
                    width: buttonRect.width,
                    height: buttonRect.height,
                    centerX: buttonRect.left - heroRect.left + buttonRect.width / 2,
                    centerY: buttonRect.top - heroRect.top + buttonRect.height / 2,
                  });
                }
              }
              setIsVideoOpen(true);
            }}
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16 bg-white text-[#21313c] font-semibold cursor-pointer"
            style={{
              zIndex: 120,
              padding: isMobile ? '12px 24px' : '16px 32px',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              visibility: isVideoOpen ? 'hidden' : 'visible',
              pointerEvents: isVideoOpen ? 'none' : 'auto',
              opacity: 0,
            }}
          >
            Explore JLU
          </button>

          {/* Video Expansion Overlay (z-index: 60) */}
          <AnimatePresence>
            {isVideoOpen && (
              <>
                {isMobile ? (
                  <>
                    {/* Mobile: Button expands to fullscreen */}
                    <motion.div
                      initial={{
                        width: videoButtonPos.width,
                        height: videoButtonPos.height,
                        borderRadius: '8px',
                        left: videoButtonPos.left,
                        top: videoButtonPos.top,
                      }}
                      animate={{
                        width: '100vw',
                        height: '100vh',
                        borderRadius: '0px',
                        left: 0,
                        top: 0,
                      }}
                      exit={{
                        width: videoButtonPos.width,
                        height: videoButtonPos.height,
                        borderRadius: '8px',
                        left: videoButtonPos.left,
                        top: videoButtonPos.top,
                      }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="fixed bg-white"
                        style={{ zIndex: 58 }}
                      />

                      {/* Mobile Video Content */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                        className="fixed inset-0"
                        style={{ zIndex: 59 }}
                      >
                        <button
                          onClick={() => setIsVideoOpen(false)}
                          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg z-10"
                          aria-label="Close video"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <video
                          className="w-full h-full object-cover"
                          src="/video.mp4"
                          autoPlay
                          playsInline
                          onEnded={() => setIsVideoOpen(false)}
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Desktop: Button expands to full hero size */}
                      <motion.div
                        initial={{
                          clipPath: `inset(${videoButtonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - videoButtonPos.left - videoButtonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - videoButtonPos.top - videoButtonPos.height : 0}px ${videoButtonPos.left}px round 8px)`,
                        }}
                        animate={{
                          clipPath: 'inset(0px 0px 0px 0px round 24px)',
                        }}
                        exit={{
                          clipPath: `inset(${videoButtonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - videoButtonPos.left - videoButtonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - videoButtonPos.top - videoButtonPos.height : 0}px ${videoButtonPos.left}px round 8px)`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute inset-0 bg-white"
                        style={{ zIndex: 100 }}
                      />

                      {/* Desktop Video Content */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.5 } }}
                        exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          zIndex: 101,
                          borderRadius: '24px',
                        }}
                      >
                        <button
                          onClick={() => setIsVideoOpen(false)}
                          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                          style={{ zIndex: 102 }}
                          aria-label="Close video"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#21313c" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <video
                          className="w-full h-full object-cover"
                          src="/video.mp4"
                          autoPlay
                          playsInline
                          onEnded={() => setIsVideoOpen(false)}
                        />
                      </motion.div>
                    </>
                  )}
                </>
              )}
          </AnimatePresence>

          {/* Navigation bar (z-index: 50) */}
          <nav
            ref={navRef}
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16"
            style={{ zIndex: 50, opacity: 0 }}
          >
            {/* Search button - hidden when menu is open on mobile */}
            <button
              className={`flex items-center justify-center bg-white text-slate-800 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${isMobile ? 'h-6 w-6 rounded-md' : 'h-12 w-12 rounded-xl'}`}
              style={{
                opacity: isMenuOpen && isMobile ? 0 : 1,
                visibility: isMenuOpen && isMobile ? 'hidden' : 'visible',
                pointerEvents: isMenuOpen && isMobile ? 'none' : 'auto',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* Centered logo - hidden when menu is open on mobile */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                opacity: isMenuOpen && isMobile ? 0 : 1,
                visibility: isMenuOpen && isMobile ? 'hidden' : 'visible',
                pointerEvents: isMenuOpen && isMobile ? 'none' : 'auto',
              }}
            >
              <a href="/">
                <img
                  src="/jlulogo.png"
                  alt="Jagran Lakecity University logo"
                  className="h-14 w-auto object-contain drop-shadow-lg sm:h-16 cursor-pointer"
                />
              </a>
            </div>

            {/* Menu Button - toggles menu open/close */}
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} buttonRef={menuButtonRef} isOpen={isMenuOpen} />
          </nav>
        </div>
      </section>

      {/* Intro text section */}
      <section className="relative px-4 pb-12 pt-14 sm:px-10 lg:px-16 bg-[#f6f7f0]">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-6">
          <div>
            <h2
              className="max-w-4xl leading-tight text-[#21313c]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
              }}
            >
              A university with a{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                pulse
              </span>
            </h2>
          </div>
          <div>
            <p
              className="max-w-3xl text-[#666]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Jagran Lakecity University is not defined by buildings alone. It is defined by the rhythm of daily life, the exchange of ideas, and the quiet confidence of people who belong here.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <p
              className="max-w-md text-right text-[#999]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Learning unfolds naturally, through dialogue, discovery, and shared moments that extend far beyond formal spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Image grid section */}
      <section className="relative px-0 pb-12 md:pb-20 bg-[#f6f7f0] overflow-hidden">
        <div className="relative mx-auto max-w-[1800px]" style={{ paddingLeft: isMobile ? '12px' : '16px', paddingRight: isMobile ? '12px' : '16px' }}>
          <div
            className="flex w-full items-end justify-center"
            style={{ gap: isMobile ? '12px' : '16px' }}
          >
            {[
              { src: '/posthero1.jpg', alt: 'Student portrait', height: 550, mobileHeight: 220, label: 'Apply Now', href: '/apply' },
              { src: '/posthero2.jpg', alt: 'Students collaborating', height: 430, mobileHeight: 180, label: '360° Tour', href: 'https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html' },
              { src: '/posthero3.jpg', alt: 'Group around laptop', height: 510, mobileHeight: 200, label: 'Student Clubs', href: '/student-clubs' },
            ].map((img, index) => (
              <div
                key={img.src}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="flex items-end group cursor-pointer"
                style={{
                  flex: '1 1 0',
                  maxWidth: '33.333%',
                  position: 'relative',
                }}
                onClick={() => {
                  const cardEl = cardRefs.current[index];
                  if (cardEl) {
                    const rect = cardEl.getBoundingClientRect();
                    setCardRect({
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                    });
                    setExpandingCard(index);
                    // Navigate after full animation completes
                    setTimeout(() => {
                      if (img.href.startsWith('http')) {
                        window.open(img.href, '_blank', 'noopener,noreferrer');
                        setExpandingCard(null);
                      } else {
                        window.location.href = img.href;
                      }
                    }, 1200);
                  }
                }}
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="block w-full object-cover"
                    style={{
                      height: isMobile ? `${img.mobileHeight}px` : `${img.height}px`,
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      display: 'block',
                    }}
                  />
                  {/* Dark overlay */}
                  <div
                    className="transition-all duration-300 group-hover:bg-black/40"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.15)',
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  {/* Hover button */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      borderTopLeftRadius: isMobile ? '12px' : '16px',
                      borderTopRightRadius: isMobile ? '12px' : '16px',
                    }}
                  >
                    <span
                      className="bg-white text-[#21313c] font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      style={{
                        padding: isMobile ? '10px 20px' : '14px 28px',
                        borderRadius: '8px',
                        fontSize: isMobile ? '12px' : '15px',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen card expansion overlay */}
        <AnimatePresence>
          {expandingCard !== null && (
            <>
              {/* Step 1: Card zooms to fullscreen with smooth easing */}
              <motion.div
                initial={{
                  position: 'fixed',
                  left: cardRect.left,
                  top: cardRect.top,
                  width: cardRect.width,
                  height: cardRect.height,
                  borderRadius: isMobile ? 12 : 16,
                }}
                animate={{
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  borderRadius: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{ zIndex: 9998, overflow: 'hidden' }}
              >
                <motion.img
                  src={['/posthero1.jpg', '/posthero2.jpg', '/posthero3.jpg'][expandingCard]}
                  alt="Expanding"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                />
                {/* Gradient overlay that fades in */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                  }}
                />
              </motion.div>

              {/* Step 2: Page slides up from bottom - clean reveal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.5,
                }}
                className="fixed inset-0 bg-[#f6f7f0]"
                style={{ zIndex: 9999 }}
              />
            </>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};
