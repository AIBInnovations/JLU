'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import SearchOverlay from './SearchOverlay';
import dynamic from 'next/dynamic';

// Menu overlay is heavy (~700 lines + framer-motion JSX), only ever shown on
// hamburger click. Dynamic-import keeps it out of the initial Header chunk.
const MenuOverlay = dynamic(() => import('./MenuOverlay'), { ssr: false });

// Menu Button Component (exact copy from Hero)
interface MenuButtonProps {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isOpen?: boolean;
}

const MenuButton = ({ onClick, buttonRef, isOpen }: MenuButtonProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative flex items-center justify-center shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${
        isMobile ? 'h-6 w-6 rounded-md' : isTablet ? 'h-8 w-8 rounded-md' : 'h-[42px] w-[150px] rounded-md'
      } ${isOpen && (isMobile || isTablet) ? 'bg-[#027ea1]' : 'bg-white'}`}
      style={{ zIndex: 10000 }}
    >
      {/* Desktop: Show Menu text and divider (only when not open) */}
      {!isTablet && !isOpen && (
        <>
          <span className="text-sm font-medium tracking-wide pl-4 mr-auto text-[#0c3b5f]">Menu</span>
          <div className="h-[32px] w-px bg-gray-300 mx-5" />
        </>
      )}

      {/* Mobile/Tablet: Show X when open, hamburger when closed */}
      {isMobile || isTablet ? (
        isOpen ? (
          // X icon for close
          <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger icon
          <div className="flex flex-col gap-[4px]">
            <span className={`h-[2px] bg-[#0c3b5f] ${isMobile ? 'w-[14px]' : 'w-[18px]'}`} />
            <span className={`h-[2px] bg-[#0c3b5f] ${isMobile ? 'w-[14px]' : 'w-[18px]'}`} />
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

// Header Component
export const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomepage = pathname === '/';

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 30) {
        // Hide header quickly when scrolling down
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: isVisible || isMenuOpen ? 0 : -150 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuButtonRef={menuButtonRef}
      />

      {/* Navigation bar - logo left, search & menu right */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: isHomepage ? 2.8 : 0.2,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="relative flex items-center justify-between px-6 pt-8 sm:pt-10 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-32"
        style={{ zIndex: 60 }}
      >
        {/* Left side - Search on mobile/tablet, spacer on desktop */}
        <div className="flex-1">
          {(isMobile || isTablet) && (
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className={`flex items-center justify-center bg-white text-slate-800 shadow-lg shadow-black/5 rounded-md ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
              style={{
                opacity: isMenuOpen ? 0 : 1,
                visibility: isMenuOpen ? 'hidden' : 'visible',
                pointerEvents: isMenuOpen ? 'none' : 'auto',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          )}
        </div>

        {/* Logo centered */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: isHomepage ? 2.9 : 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: isMobile ? '22.5px' : isTablet ? '28px' : '32px',
            opacity: isMenuOpen && (isMobile || isTablet) ? 0 : 1,
            visibility: isMenuOpen && (isMobile || isTablet) ? 'hidden' : 'visible',
            pointerEvents: isMenuOpen && (isMobile || isTablet) ? 'none' : 'auto',
          }}
        >
          <Link href="/">
            <img
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlulogo.webp"
              alt="Jagran Lakecity University logo"
              className={`w-auto object-contain drop-shadow-lg cursor-pointer ${
                isMobile ? 'h-20' : isTablet ? 'h-20' : 'h-18 sm:h-20 lg:h-24'
              }`}
            />
          </Link>
        </motion.div>

        {/* Right side - Search and Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search button - desktop only (mobile/tablet search is on left) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
            className={`flex items-center justify-center bg-white text-slate-800 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${
              isMobile || isTablet ? 'hidden' : 'h-12 w-12 rounded-xl'
            }`}
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

          {/* Menu Button */}
          <MenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            buttonRef={menuButtonRef}
            isOpen={isMenuOpen}
          />
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Header;


