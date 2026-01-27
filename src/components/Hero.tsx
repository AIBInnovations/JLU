import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-[#f6f7f0]">
      {/* Hero Section */}
      <section className="relative" style={{ padding: isMobile ? '12px 12px 0 12px' : '20px 17px 0 17px' }}>
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            width: '1887px',
            maxWidth: '100%',
            aspectRatio: isMobile ? '9 / 14' : '1887 / 949',
            minHeight: isMobile ? '55vh' : 'auto',
            maxHeight: isMobile ? '65vh' : 'none',
          }}
        >
          {/* Menu Overlay - renders inside hero container */}
          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            menuButtonRef={menuButtonRef}
            heroRef={heroRef}
          />

          {/* Background image - crop from bottom, show top */}
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            src="/herobg.png"
            alt="JLU Campus"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center top' }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/30" />

          {/* Navigation bar */}
          <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16"
            style={{ zIndex: 60 }}
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
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
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
            </motion.div>

            {/* Menu Button - toggles menu open/close */}
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} buttonRef={menuButtonRef} isOpen={isMenuOpen} />
          </motion.nav>

          {/* Hero headline */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg font-medium text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] md:text-xl"
            >
              A confluence of minds, cultures, and lived experiences
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl"
            >
              Igniting minds, changing lives
            </motion.h1>
          </motion.div>

        </div>

        {/* Scroll indicator - 101x101 ellipse centered at bottom edge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            // Scroll to horizontal scroll section (after hero and image grid)
            const heroHeight = window.innerHeight;
            const imageGridHeight = isMobile ? 100 : 900; // Scroll past hero + image grid to horizontal scroll
            const targetScroll = heroHeight + imageGridHeight;
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-30 cursor-pointer"
          style={{
            width: '101px',
            height: '101px',
          }}
        >
          <div
            className="w-full h-full rounded-full bg-[#f6f7f0] flex items-center justify-center"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            {/* Inner circle with border */}
            <div className="flex items-center justify-center rounded-full border border-gray-400" style={{ width: '90px', height: '90px' }}>
              <svg
                className="w-4 h-10"
                viewBox="0 0 17 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 0V44M8.5 44L1 36.5M8.5 44L16 36.5"
                  stroke="#21313c"
                  strokeWidth={1}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Intro text section */}
      <section className="relative px-4 pb-12 pt-14 sm:px-10 lg:px-16">
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
      <section className="relative px-0 pb-12 md:pb-20">
        <div className="relative mx-0 sm:-mx-10 lg:-mx-16">
          <motion.div
            className="flex w-full items-end"
            style={{ padding: '0', gap: isMobile ? '4px' : '0' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { src: '/posthero1.jpg', alt: 'Student portrait', height: 710, mobileHeight: 180 },
              { src: '/posthero2.jpg', alt: 'Students collaborating', height: 557, mobileHeight: 140 },
              { src: '/posthero3.jpg', alt: 'Group around laptop', height: 659, mobileHeight: 165 },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                className="flex-1 flex items-end overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: isMobile ? 60 : 40, scale: isMobile ? 0.95 : 1 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: isMobile ? 0.6 : 0.8,
                      delay: i * (isMobile ? 0.15 : 0.15),
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }
                }}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="block w-full object-cover"
                  style={{ height: isMobile ? `${img.mobileHeight}px` : `${img.height}px` }}
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
