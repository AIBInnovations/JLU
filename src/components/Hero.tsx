'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

// ============================================
// NAVIGATION DATA
// ============================================
const navigationItems = [
  { label: 'About Us', href: '/about', hasSubmenu: false },
  { label: 'Programs', href: '/programs', hasSubmenu: false },
  { label: 'Events', href: '/events', hasSubmenu: false },
  {
    label: 'Academics',
    href: '#',
    hasSubmenu: true,
    submenu: [
      'Faculty of Management',
      'Faculty of Journalism & Social Science',
      'Faculty of Fashion, Design & Arts',
      'Faculty of Engineering & Technology',
      'Faculty of Pharmacy',
      'Faculty of Law',
      'IICA - Jagran Centre for Creative Skills',
    ]
  },
  { label: 'Campus', href: '#', hasSubmenu: false },
  { label: 'Admissions', href: '#', hasSubmenu: false },
  { label: 'Research', href: '#', hasSubmenu: false },
  { label: 'Campus Life', href: '#', hasSubmenu: false },
  { label: 'International Office', href: '#', hasSubmenu: false },
  { label: 'News & Events', href: '/events', hasSubmenu: false },
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
  const isMobile = useIsMobile();

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
              {/* Expanding square background - starts exactly from menu button */}
              <motion.div
                initial={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  left: buttonPos.left + 16,
                  top: buttonPos.top + 6,
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
                  left: buttonPos.left + 16,
                  top: buttonPos.top + 6,
                }}
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="fixed bg-white"
                style={{
                  zIndex: 58,
                }}
              />

              {/* Content layer - no close button here, using the menu button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
                className="fixed inset-0 overflow-y-auto"
                style={{ zIndex: 59 }}
              >
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

                  {/* Submenu - right side */}
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.65 }}
                    className="flex flex-col gap-1.5 flex-1 pt-6"
                  >
                    {navigationItems
                      .find((item) => item.label === 'Academics')
                      ?.submenu?.map((subItem, index) => (
                        <motion.a
                          key={subItem}
                          href="#"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
                          className="text-xs text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                        >
                          {subItem}
                        </motion.a>
                      ))}
                  </motion.div>
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

                  {/* Submenu */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2.5 pt-8"
                  >
                    {navigationItems
                      .find((item) => item.label === 'Academics')
                      ?.submenu?.map((subItem, index) => (
                        <motion.a
                          key={subItem}
                          href="#"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="text-sm text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                        >
                          {subItem}
                        </motion.a>
                      ))}
                  </motion.div>
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
  const [hasExploreAnimated, setHasExploreAnimated] = useState(false);
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
    gsap.set(backgroundRef.current, {
      opacity: 1,
      clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      scale: 1,
      force3D: true,
    });
    gsap.set(buildingRef.current, {
      opacity: 1,
      clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
      scale: 1,
      force3D: true,
    });
    gsap.set(textRef.current, {
      opacity: 0,
      y: 400,
      force3D: true,
    });
    gsap.set(navRef.current, {
      opacity: 0,
      y: -30,
      force3D: true,
    });

    let tl: gsap.core.Timeline | null = null;

    // Wait for page loader to complete (~4 seconds) before starting animation
    const loaderDelay = setTimeout(() => {
      tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Animation sequence
      tl
        // 1. Both images reveal from middle to top and bottom
        .to([backgroundRef.current, buildingRef.current], {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power2.inOut',
          force3D: true,
        })
        // 2. Subtle zoom effect on both images
        .to([backgroundRef.current, buildingRef.current], {
          scale: 1.05,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }, '-=0.5')
        // 3. Text slides up and fades in (behind building)
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          force3D: true,
        }, '-=1.2')
        // 4. Navigation fades in
        .to(navRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }, '-=0.8');
    }, 4000); // Wait 4 seconds for page loader to complete

    return () => {
      clearTimeout(loaderDelay);
      if (tl) tl.kill();
    };
  }, [imagesLoaded]);

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
          <img
            ref={backgroundRef}
            src="/onlybg.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              zIndex: 1,
              objectPosition: 'center top',
              clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            }}
          />

          {/* Layer 2: Text - JAGRAN LAKECITY UNIVERSITY (z-index: 2) */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 2, paddingBottom: isMobile ? '30%' : '10%', opacity: 0 }}
          >
            <h1
              className="text-center font-bold uppercase tracking-wider select-none"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(15rem, 20vw, 20rem)',
                lineHeight: 1.1,
                letterSpacing: isMobile ? '0.05em' : '0.01em',
                wordSpacing: isMobile ? '0.5em' : '1em',
                whiteSpace: 'nowrap',
                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}
            >
              JAGRAN LAKECITY
            </h1>
          </div>

          {/* Layer 3: Building/Foreground Image (z-index: 3) */}
          <img
            ref={buildingRef}
            src="/jluherot.png"
            alt="JLU Building"
            className="absolute inset-0"
            style={{
              zIndex: 3,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
            }}
          />

          {/* Explore JLU Button (z-index: 120) */}
          <motion.button
            ref={exploreButtonRef}
            onClick={() => setIsVideoOpen(true)}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: isVideoOpen ? 0 : 1,
              y: isVideoOpen ? 100 : 0
            }}
            transition={{
              duration: 1,
              delay: !hasExploreAnimated ? 7 : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
            onAnimationComplete={() => {
              if (!hasExploreAnimated) {
                setHasExploreAnimated(true);
              }
            }}
            className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-16 bg-white text-[#21313c] font-semibold cursor-pointer"
            style={{
              zIndex: 120,
              padding: isMobile ? '12px 24px' : '16px 32px',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              visibility: isVideoOpen ? 'hidden' : 'visible',
              pointerEvents: isVideoOpen ? 'none' : 'auto',
            }}
          >
            Explore JLU
          </motion.button>

          {/* Video Expansion Overlay (z-index: 60) */}
          <AnimatePresence>
            {isVideoOpen && (() => {
              const getButtonPosition = () => {
                if (exploreButtonRef.current && heroRef.current) {
                  const buttonRect = exploreButtonRef.current.getBoundingClientRect();
                  const heroRect = heroRef.current.getBoundingClientRect();

                  if (isMobile) {
                    return {
                      left: buttonRect.left,
                      top: buttonRect.top,
                      width: buttonRect.width,
                      height: buttonRect.height,
                      centerX: buttonRect.left + buttonRect.width / 2,
                      centerY: buttonRect.top + buttonRect.height / 2,
                    };
                  }

                  return {
                    left: buttonRect.left - heroRect.left,
                    top: buttonRect.top - heroRect.top,
                    width: buttonRect.width,
                    height: buttonRect.height,
                    centerX: buttonRect.left - heroRect.left + buttonRect.width / 2,
                    centerY: buttonRect.top - heroRect.top + buttonRect.height / 2,
                  };
                }
                return { left: 0, top: 0, width: 0, height: 0, centerX: 0, centerY: 0 };
              };

              const buttonPos = getButtonPosition();

              return (
                <>
                  {isMobile ? (
                    <>
                      {/* Mobile: Button expands to fullscreen */}
                      <motion.div
                        initial={{
                          width: buttonPos.width,
                          height: buttonPos.height,
                          borderRadius: '8px',
                          left: buttonPos.left,
                          top: buttonPos.top,
                        }}
                        animate={{
                          width: '100vw',
                          height: '100vh',
                          borderRadius: '0px',
                          left: 0,
                          top: 0,
                        }}
                        exit={{
                          width: buttonPos.width,
                          height: buttonPos.height,
                          borderRadius: '8px',
                          left: buttonPos.left,
                          top: buttonPos.top,
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.16, 1, 0.3, 1],
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
                          clipPath: `inset(${buttonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - buttonPos.left - buttonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - buttonPos.top - buttonPos.height : 0}px ${buttonPos.left}px round 8px)`,
                        }}
                        animate={{
                          clipPath: 'inset(0px 0px 0px 0px round 24px)',
                        }}
                        exit={{
                          clipPath: `inset(${buttonPos.top}px ${heroRef.current ? heroRef.current.offsetWidth - buttonPos.left - buttonPos.width : 0}px ${heroRef.current ? heroRef.current.offsetHeight - buttonPos.top - buttonPos.height : 0}px ${buttonPos.left}px round 8px)`,
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
              );
            })()}
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
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="ml-0 max-w-4xl text-2xl font-normal leading-tight text-[#111827] sm:-ml-20 sm:text-3xl lg:-ml-28 lg:text-4xl">
              A university with a pulse
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="ml-0 sm:-ml-20 lg:-ml-28"
          >
            <p className="max-w-3xl text-base leading-relaxed text-[#2b2b2b] sm:text-lg">
              Jagran Lakecity University is not defined by buildings alone. It is defined by the rhythm of daily life, the exchange of ideas, and the quiet confidence of people who belong here.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex w-full translate-x-0 justify-end sm:translate-x-8 lg:translate-x-16 xl:translate-x-24 2xl:translate-x-32"
          >
            <p className="max-w-md text-right text-xs leading-relaxed text-[#2b2b2b] sm:text-sm">
              Learning unfolds naturally, through dialogue, discovery, and shared moments that extend far beyond formal spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image grid section */}
      <section className="relative px-0 pb-12 md:pb-20 bg-[#f6f7f0]">
        <div className="relative mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
          <motion.div
            className="flex w-full items-end justify-center"
            style={{ gap: isMobile ? '16px' : '10px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { src: '/posthero1.jpg', alt: 'Student portrait', height: 550, mobileHeight: 150 },
              { src: '/posthero2.jpg', alt: 'Students collaborating', height: 430, mobileHeight: 120 },
              { src: '/posthero3.jpg', alt: 'Group around laptop', height: 510, mobileHeight: 140 },
            ].map((img) => (
              <motion.div
                key={img.src}
                className="flex items-end"
                style={{
                  flex: '0 0 41%',
                  width: '41%',
                }}
                variants={{
                  hidden: {},
                  visible: {}
                }}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="block w-full object-cover"
                  style={{
                    height: isMobile ? `${img.mobileHeight}px` : `${img.height}px`,
                    borderTopLeftRadius: isMobile ? '12px' : '16px',
                    borderTopRightRadius: isMobile ? '12px' : '16px',
                  }}
                  variants={{
                    hidden: {
                      clipPath: 'inset(100% 0% 0% 0%)',
                    },
                    visible: {
                      clipPath: 'inset(0% 0% 0% 0%)',
                      transition: {
                        duration: isMobile ? 0.8 : 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
