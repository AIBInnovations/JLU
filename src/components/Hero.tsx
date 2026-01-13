import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// NAVIGATION DATA
// ============================================
const navigationItems = [
  { label: 'About Us', href: '#', hasSubmenu: false },
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
  { label: 'News & Events', href: '#', hasSubmenu: false },
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
  const [activeItem, setActiveItem] = useState<string>('Academics');

  // Medium circle size for menu
  const circleSize = 1600;

  // Get the menu button position relative to the hero container for the expansion origin
  const getCirclePosition = () => {
    if (menuButtonRef.current && heroRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      // Position circle so its center aligns with menu button center, relative to hero
      const buttonCenterX = buttonRect.left - heroRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top - heroRect.top + buttonRect.height / 2;
      return {
        left: buttonCenterX - circleSize / 2,
        top: buttonCenterY - circleSize / 2,
      };
    }
    // Fallback - position from right side of hero
    return { right: -800, top: -1074 };
  };

  const circlePos = getCirclePosition();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Circular expanding background - exact Figma specs */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.32, 0, 0.67, 0],  // ease-in for open
            }}
            className="absolute bg-white"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              left: `${circlePos.left}px`,
              top: `${circlePos.top}px`,
              borderRadius: '50039px',
              transformOrigin: 'center center',
              zIndex: 100,
              border: '12px solid #d1d5db',
            }}
          />

          {/* Content layer - positioned within circle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0 } }}
            className="absolute overflow-hidden flex items-center justify-center"
            style={{
              zIndex: 101,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              left: `${circlePos.left}px`,
              top: `${circlePos.top}px`,
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
    </AnimatePresence>
  );
};

// ============================================
// MENU BUTTON - Original design with divider
// ============================================
interface MenuButtonProps {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuButton = ({ onClick, buttonRef }: MenuButtonProps) => {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label="Open menu"
      className="flex h-[48px] w-[168px] items-center justify-center rounded-md bg-white text-[#0c3b5f] shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10"
    >
      <span className="text-sm font-medium tracking-wide pl-4 mr-auto">Menu</span>
      {/* Vertical divider line */}
      <div className="h-[48px] w-px bg-gray-300 mx-5" />
      <div className="flex flex-col gap-[6px] pr-5">
        <span className="h-[2px] w-[23.5px] bg-[#0c3b5f]" />
        <span className="h-[2px] w-[23.5px] bg-[#0c3b5f]" />
      </div>
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

  return (
    <div className="bg-[#f6f7f0]">
      {/* Hero Section */}
      <section className="relative" style={{ padding: '20px 17px 0 17px' }}>
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            width: '1887px',
            maxWidth: '100%',
            aspectRatio: '1887 / 949',
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
            className="relative z-60 flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16"
          >
            {/* Search button */}
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-800 shadow-lg shadow-black/5 transition-shadow hover:shadow-xl hover:shadow-black/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>

            {/* Centered logo */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <img
                src="/jlulogo.png"
                alt="Jagran Lakecity University logo"
                className="h-14 w-auto object-contain drop-shadow-lg sm:h-16"
              />
            </motion.div>

            {/* Menu Button */}
            <MenuButton onClick={() => setIsMenuOpen(true)} buttonRef={menuButtonRef} />
          </motion.nav>

          {/* Hero headline */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-4xl text-4xl font-bold leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:text-5xl lg:text-6xl"
            >
              Lorem ipsum dolor sit amet consectetur.
            </motion.h1>
          </motion.div>

        </div>

        {/* Scroll indicator - 101x101 ellipse centered at bottom edge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
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
      <section className="relative px-6 pb-12 pt-14 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="-ml-14 max-w-4xl text-2xl font-normal leading-tight text-[#111827] sm:-ml-20 sm:text-3xl lg:-ml-28 lg:text-4xl">
              Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque pharetra
              facilisi amet. Eu ut sem a id nec nunc ante nunc.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex w-full translate-x-4 justify-end sm:translate-x-8 lg:translate-x-16 xl:translate-x-24 2xl:translate-x-32"
          >
            <p className="max-w-sm text-right text-xs leading-relaxed text-[#2b2b2b] sm:text-sm">
              Lorem ipsum dolor sit amet consectetur. Feugiat mi enim lectus convallis scelerisque pharetra
              facilisi amet. Eu ut sem a id nec nunc ante nunc. Lectus eleifend sed mattis nascetur sed
              scelerisque.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image grid section */}
      <section className="relative px-0 pb-20">
        <div className="relative -mx-6 sm:-mx-10 lg:-mx-16">
          <div className="grid w-full grid-cols-1 items-end gap-0 md:grid-cols-3">
            {[
              { src: '/posthero1.jpg', alt: 'Student portrait', height: 710 },
              { src: '/posthero2.jpg', alt: 'Students collaborating', height: 557 },
              { src: '/posthero3.jpg', alt: 'Group around laptop', height: 659 },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                className="flex h-full items-end overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="block w-full object-cover"
                  style={{ height: `${img.height}px` }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
