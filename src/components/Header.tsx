'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import Image from 'next/image';
import SearchOverlay from './SearchOverlay';

// Navigation item types
interface NavigationColumn {
  title: string;
  items: string[];
}

interface SectionItem {
  label: string;
  slug: string;
  isGroupHeader?: boolean;
  isGroupChild?: boolean;
  pageHref?: string; // if set, clicking navigates to this route instead of parent#slug
}

interface NavigationItem {
  label: string;
  href: string;
  type: 'dropdown' | 'megamenu';
  sections?: (string | SectionItem)[];
  columns?: NavigationColumn[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'ABOUT JLU',
    href: '/about',
    type: 'dropdown',
    sections: [
      { label: 'Chancellor Message', slug: 'chancellor-message' },
      { label: 'Pro Chancellor Message', slug: 'pro-chancellor-message' },
      { label: 'Vice Chancellor Message', slug: 'vice-chancellor-message' },
      { label: 'Promoting Body', slug: 'promoting-body' },
      { label: 'JLU at a Glance', slug: 'jlu-at-a-glance' },
      { label: 'Governance', slug: 'governance' },
      { label: 'Governing Body : Board of Management : Academic Council', slug: 'governance', isGroupChild: true },
      { label: 'JLU Leadership Structure', slug: 'leadership' },
      { label: 'Accreditations & Memberships', slug: 'accreditations' },
      { label: 'University Partnerships', slug: 'university-partnerships', pageHref: '/university-partnerships' },
      { label: 'Honorary Doctorates', slug: 'honorary-doctorates' },
      { label: 'JLU Ignited Mind Awards', slug: 'ignited-mind-awards' },
      { label: 'JLU Staff', slug: 'jlu-staff' },
      { label: 'Ranking & Awards', slug: 'rankings' },
    ]
  },
  {
    label: 'ACADEMICS',
    href: '/academics',
    type: 'dropdown',
    sections: [
      { label: 'Faculty of Management', slug: 'faculty-of-management', isGroupHeader: true },
      { label: 'Jagran Lakecity Business School', slug: 'jagran-lakecity-business-school', isGroupChild: true },
      { label: 'Jagran School of Physical Education and Sports Science', slug: 'jagran-school-of-sports-management', isGroupChild: true },
      { label: 'Jagran School of Hospitality & Tourism', slug: 'jagran-school-of-hospitality-and-aviation-management', isGroupChild: true },
      { label: 'Faculty of Media & Social Science', slug: 'faculty-of-journalism-and-social-science', isGroupHeader: true },
      { label: 'Jagran School of Journalism', slug: 'jagran-school-of-journalism', isGroupChild: true },
      { label: 'Jagran School of Advertising and Public Relations', slug: 'jagran-school-of-advertising-and-public-relations', isGroupChild: true },
      { label: 'Jagran School of Events & Entertainment', slug: 'jagran-school-of-events-and-entertainment', isGroupChild: true },
      { label: 'Jagran School of Languages & Social Science', slug: 'jagran-school-of-languages-and-social-science', isGroupChild: true },
      { label: 'Faculty of Fashion, Design & Arts', slug: 'faculty-of-fashion-design-and-arts', isGroupHeader: true },
      { label: 'School of Design', slug: 'jagran-school-of-design', isGroupChild: true },
      { label: 'School of Architecture', slug: 'jagran-school-of-architecture', isGroupChild: true },
      { label: 'School of Fashion', slug: 'jagran-school-of-fashion', isGroupChild: true },
      { label: 'Faculty of Science & Technology', slug: 'faculty-of-engineering-and-technology', isGroupHeader: true },
      { label: 'Jagran School of Artificial Intelligence', slug: 'jagran-school-of-artificial-intelligence', isGroupChild: true },
      { label: 'Jagran School of Engineering', slug: 'jagran-school-of-engineering', isGroupChild: true },
      { label: 'Jagran School of Computer Application', slug: 'jagran-school-of-computer-application', isGroupChild: true },
      { label: 'Faculty of Pharmacy', slug: 'faculty-of-pharmacy', isGroupHeader: true },
      { label: 'Faculty of Law', slug: 'faculty-of-law', isGroupHeader: true },
      { label: 'IICA - Jagran Centre for Creative Skills', slug: 'iica-jagran-centre-for-creative-skills', isGroupHeader: true },
    ]
  },
  {
    label: 'CAMPUS',
    href: '/campus',
    type: 'dropdown',
    sections: [
      { label: 'University Campus', slug: 'university-campus' },
      { label: 'Student Accommodation', slug: 'student-accommodation' },
      { label: 'Dining Facilities', slug: 'dining-facilities' },
      { label: 'Academic Infrastructure', slug: 'academic-infrastructure' },
      { label: 'Gurudev Gupta Media Studio', slug: 'gurudev-gupta-media-studio', isGroupChild: true },
      { label: 'M.S Gill Culinary Studios', slug: 'ms-gill-culinary-studios', isGroupChild: true },
      { label: 'Technology Labs', slug: 'technology-labs', isGroupChild: true },
      { label: 'Shri Cyril Shroff Moot Court', slug: 'shri-cyril-shroff-moot-court', isGroupChild: true },
      { label: 'Sports Facilities', slug: 'sports-facilities' },
      { label: 'The Pyramid – University Library', slug: 'the-pyramid-university-library' },
      { label: 'Indoor Multipurpose Hall', slug: 'indoor-multipurpose-hall' },
    ]
  },
  {
    label: 'ADMISSIONS',
    href: '/admissions',
    type: 'megamenu',
    columns: [
      {
        title: 'Programs',
        items: [
          'Undergraduate Degree',
          'Postgraduate Degree',
          'Research Degree',
          'Centre for Professional Skills',
          'JLUx – Young Leadership Program',
        ]
      },
      {
        title: 'Apply',
        items: [
          'Book Campus Visits',
          'Application Process',
          'Admission FAQs',
          'Online Application Form',
        ]
      },
      {
        title: 'Fee & Support',
        items: [
          'Scholarships',
          'Chancellor Freeships',
          'Education Loan',
          'Refund Policy',
        ]
      }
    ]
  },
  {
    label: 'RESEARCH',
    href: '/research',
    type: 'dropdown',
    sections: [
      { label: 'Publications', slug: 'publications' },
      { label: 'Patents', slug: 'patents' },
      { label: 'Funded Projects', slug: 'funded-projects' },
    ]
  },
  {
    label: 'CAMPUS LIFE',
    href: '/campus-life',
    type: 'dropdown',
    sections: [
      { label: 'Student Council', slug: 'student-council' },
      { label: 'Student Clubs', slug: 'student-clubs' },
      { label: 'Student Achievements', slug: 'student-achievements' },
      { label: 'Corporate Relations', slug: 'corporate-relations' },
      { label: 'IgnitoX – Incubation Hub', slug: 'ignitox-incubation-hub' },
      { label: 'Igniting Mind Lecture Series', slug: 'igniting-mind-lecture-series' },
    ]
  },
  {
    label: 'INTERNATIONAL OFFICE',
    href: '/international-office',
    type: 'dropdown',
    sections: [
      { label: 'University Partner', slug: 'university-partner' },
      { label: 'Pathway Programs', slug: 'pathway-programs' },
      { label: 'Summer Schools', slug: 'summer-schools' },
      { label: 'International Admissions', slug: 'international-admissions' },
      { label: 'Student Application Process', slug: 'student-application-process', isGroupChild: true },
      { label: 'International FAQ', slug: 'international-faq', isGroupChild: true },
      { label: 'Fee Structure', slug: 'fee-structure', isGroupChild: true },
      { label: 'Application Form', slug: 'application-form', isGroupChild: true },
      { label: 'Immigration & Visa', slug: 'immigration-and-visa', isGroupChild: true },
      { label: 'Living in Bhopal', slug: 'living-in-bhopal' },
    ]
  },
  {
    label: 'NEWS & EVENTS',
    href: '/news-events',
    type: 'dropdown',
    sections: [
      { label: 'JLU in News', slug: 'jlu-in-news' },
      { label: 'Photo Gallery', slug: 'photo-gallery' },
      { label: 'Events Calendar', slug: 'events-calendar' },
      { label: 'Past Events', slug: 'past-events' },
      { label: 'Media Kit', slug: 'media-kit' },
    ]
  }
];

// Bottom menu items - always shown in right section
const bottomMenuItems = [
  { label: 'Student Clubs', href: '/student-clubs' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Lakecity Voice', href: '/podcast' },
  { label: 'Placements', href: '/placement' },
  { label: 'Faculties', href: '/faculties' },
];

// Menu Overlay Component (exact copy from Hero)
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuOverlay = ({ isOpen, onClose, menuButtonRef }: MenuOverlayProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const handleSectionClick = (href: string, slug: string, pageHref?: string) => {
    onClose();
    // If a dedicated page route exists for this section, navigate there directly
    if (pageHref) {
      router.push(pageHref);
      return;
    }
    const targetPath = href;
    const scrollToEl = () => {
      // Always dispatch event first so components can expand accordions/tabs
      window.dispatchEvent(new CustomEvent('navigate-section', { detail: { slug } }));
      // Then try direct element ID scroll as fallback
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    };
    if (pathname === targetPath) {
      scrollToEl();
    } else {
      router.push(`${targetPath}#${slug}`);
      setTimeout(scrollToEl, 1000);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Get the currently hovered navigation item
  const hoveredNavItem = navigationItems.find(item => item.label === hoveredItem);

  // Get the currently active navigation item (based on current page)
  const activeNavItem = navigationItems.find(item => isActive(item.href));

  // Show hovered item's submenu, or fall back to active page's submenu
  const displayedNavItem = hoveredNavItem || activeNavItem;

  // Tablets (768-1024px) use the mobile-style fullscreen overlay for better usability
  const useMobileOverlay = isMobile || (isTablet && !isMobile);
  const circleSize = useMobileOverlay ? 2000 : 1600;
  const buttonWidth = useMobileOverlay ? 24 : 168;
  const buttonHeight = useMobileOverlay ? 24 : 48;

  const getButtonPosition = () => {
    if (menuButtonRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();

      // Use viewport-relative coordinates for fixed positioning
      return {
        left: buttonRect.left,
        top: buttonRect.top,
        centerX: buttonRect.left + buttonRect.width / 2,
        centerY: buttonRect.top + buttonRect.height / 2,
      };
    }
    return { left: 0, top: 0, centerX: 0, centerY: 0 };
  };

  const buttonPos = getButtonPosition();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile/Tablet: Square-to-fullscreen expanding overlay */}
          {useMobileOverlay ? (
            <>
              {/* Expanding square background - starts exactly from menu button */}
              <motion.div
                initial={{
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                  borderRadius: '6px',
                  left: isMobile ? buttonPos.left + 16 : buttonPos.left,
                  top: isMobile ? buttonPos.top + 6 : buttonPos.top,
                }}
                animate={{
                  width: '100vw',
                  height: '100dvh',
                  borderRadius: '0px',
                  left: 0,
                  top: 0,
                }}
                exit={{
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                  borderRadius: '6px',
                  left: isMobile ? buttonPos.left + 16 : buttonPos.left,
                  top: isMobile ? buttonPos.top + 6 : buttonPos.top,
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
                className="fixed top-0 left-0 right-0 overflow-y-auto overflow-x-hidden"
                style={{
                  zIndex: 59,
                  height: '100dvh',
                  maxHeight: '100dvh',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                }}
              >
                {/* Mobile/Tablet Navigation content - full-width stacked layout */}
                <div className={`flex flex-col pt-20 pb-48 ${isTablet && !isMobile ? 'px-12' : 'px-6'}`}>
                  {/* Main navigation */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      className="text-xs text-gray-400 uppercase tracking-widest mb-5"
                    >
                      Navigation
                    </motion.p>
                    <nav className="flex flex-col">
                      {navigationItems.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                        >
                          <button
                            onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                            className={`w-full text-left py-3.5 border-b border-gray-100 flex items-center justify-between ${
                              isActive(item.href)
                                ? 'text-[#027ea1]'
                                : 'text-[#027ea1]/70'
                            }`}
                          >
                            <span className={`${isTablet && !isMobile ? 'text-xl' : 'text-lg'} font-medium flex items-center gap-2.5`}>
                              {isActive(item.href) && (
                                <span className="w-2 h-2 rounded-full bg-[#027ea1]" />
                              )}
                              {item.label}
                            </span>
                            <svg
                              className={`w-4 h-4 text-[#027ea1]/40 transition-transform duration-300 ${expandedMobileItem === item.label ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Expandable sub-content */}
                          <AnimatePresence>
                            {expandedMobileItem === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="py-3 pl-4 flex flex-col gap-1">
                                  {/* Link to main page */}
                                  <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="text-sm font-medium text-[#027ea1] mb-2 inline-flex items-center gap-1"
                                  >
                                    View All
                                    <span className="text-xs">→</span>
                                  </Link>

                                  {item.type === 'megamenu' && item.columns ? (
                                    item.columns.map((column) => (
                                      <div key={column.title} className="mb-3">
                                        <p className="text-xs font-semibold text-[#027ea1] uppercase tracking-wider mb-2">
                                          {column.title}
                                        </p>
                                        {column.items.map((subItem) => {
                                          const slug = subItem.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
                                          const specialLinks: Record<string, string> = {
                                            'certificate-courses': '/certifications',
                                          };
                                          const specialHref = specialLinks[slug];
                                          if (specialHref) {
                                            return (
                                              <Link
                                                key={subItem}
                                                href={specialHref}
                                                onClick={onClose}
                                                className="text-sm text-[#027ea1]/60 block py-1.5"
                                              >
                                                <span className="text-[#027ea1]/30 mr-2">•</span>{subItem}
                                              </Link>
                                            );
                                          }
                                          return (
                                            <button
                                              key={subItem}
                                              onClick={() => handleSectionClick(item.href, slug)}
                                              className="text-sm text-[#027ea1]/60 block py-1.5 text-left"
                                            >
                                              <span className="text-[#027ea1]/30 mr-2">•</span>{subItem}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    ))
                                  ) : item.sections ? (
                                    item.sections.map((section) => {
                                      const label = typeof section === 'string' ? section : section.label;
                                      const slug = typeof section === 'string'
                                        ? section.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
                                        : section.slug;
                                      const pageHref = typeof section !== 'string' ? section.pageHref : undefined;
                                      return (
                                        <button
                                          key={label}
                                          onClick={() => handleSectionClick(item.href, slug, pageHref)}
                                          className="text-sm text-[#027ea1]/60 block py-1.5 text-left"
                                        >
                                          <span className="text-[#027ea1]/30 mr-2">•</span>{label}
                                        </button>
                                      );
                                    })
                                  ) : null}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {/* Explore More */}
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.3 }}
                      className="text-xs text-gray-400 uppercase tracking-widest mb-3"
                    >
                      Explore More
                    </motion.p>
                    <div className={`flex gap-3 mb-6 ${isTablet && !isMobile ? 'flex-wrap gap-4' : 'overflow-x-auto'}`}>
                      {bottomMenuItems.map((subItem, index) => (
                        <motion.a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={onClose}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.04, duration: 0.3 }}
                          className={`${isTablet && !isMobile ? 'text-sm' : 'text-xs'} text-[#027ea1]/70 transition-colors whitespace-nowrap shrink-0`}
                        >
                          {subItem.label}
                        </motion.a>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className={`grid gap-3 ${isTablet && !isMobile ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      <a href="https://apply.jlu.edu.in/" onClick={onClose}>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.95, duration: 0.3 }}
                          className="bg-[#027ea1] text-white font-semibold py-3 px-4 rounded-lg text-sm text-center cursor-pointer"
                        >
                          Apply Now
                        </motion.div>
                      </a>
                      <motion.a
                        href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.3 }}
                        className="font-semibold py-3 px-4 rounded-lg text-sm text-center"
                        style={{ backgroundColor: '#21313c', color: '#ffffff' }}
                      >
                        360° Tour
                      </motion.a>
                    </div>
                  </div>

                </div>

                {/* Decorative image fixed at bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none overflow-visible"
                  style={{ zIndex: 59 }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/menuu.png"
                    alt="Menu decoration"
                    width={1800}
                    height={900}
                    className="object-contain opacity-30"
                    style={{ width: '150vw', maxWidth: 'none' }}
                  />
                </motion.div>
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
                className="fixed bg-white"
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
                className="fixed overflow-hidden flex items-center justify-center"
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
                  className="absolute flex h-[35px] w-[35px] items-center justify-center rounded-xl hover:opacity-90 transition-all"
                  style={{
                    top: '47.6%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#027ea1',
                    zIndex: 10,
                  }}
                  aria-label="Close menu"
                >
                  {/* X icon with two crossing lines */}
                  <svg
                    width="18"
                    height="18"
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
                <div className="flex gap-6" style={{ marginTop: '440px', marginLeft: '-400px', height: '490px' }} onMouseLeave={() => setHoveredItem(null)}>
                  {/* Main navigation */}
                  <div className="flex flex-col" style={{ marginLeft: '-120px' }}>
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
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
                          onHoverStart={() => setHoveredItem(item.label)}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`text-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                              isActive(item.href)
                                ? 'text-[#027ea1]'
                                : 'text-[#027ea1]/60 hover:text-[#027ea1]'
                            }`}
                          >
                            {isActive(item.href) && (
                              <span className="w-2 h-2 rounded-full bg-[#027ea1]" />
                            )}
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-[1px] bg-gray-300 h-[400px] my-8" />

                  {/* Right side - Hovered item content + explore more links */}
                  <div className="flex flex-col pt-8 w-[550px] h-full" style={{ marginLeft: '0px' }}>
                    {/* Sub-content container */}
                    <div className="flex-1 relative">
                      {/* Sub-content: shown when hovering or when on active page */}
                      {displayedNavItem && (
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-semibold text-[#027ea1] mb-1">
                            {displayedNavItem.label}
                          </h3>
                          {displayedNavItem.type === 'megamenu' && displayedNavItem.columns ? (
                            <div className="flex gap-8">
                              {displayedNavItem.columns.map((column) => (
                                <div key={column.title} className="flex flex-col gap-2">
                                  <p className="text-sm font-semibold text-[#027ea1] mb-1">
                                    {column.title}
                                  </p>
                                  {column.items.map((item) => {
                                    const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
                                    const specialLinks: Record<string, string> = {
                                      'certificate-courses': '/certifications',
                                    };
                                    const specialHref = specialLinks[slug];
                                    if (specialHref) {
                                      return (
                                        <Link
                                          key={item}
                                          href={specialHref}
                                          onClick={onClose}
                                          className="text-sm text-[#027ea1]/60 hover:text-[#027ea1] cursor-pointer transition-colors"
                                        >
                                          <span className="text-[#027ea1]/30 mr-2">•</span>{item}
                                        </Link>
                                      );
                                    }
                                    return (
                                      <button
                                        key={item}
                                        onClick={() => handleSectionClick(displayedNavItem.href, slug)}
                                        className="text-sm text-[#027ea1]/60 hover:text-[#027ea1] cursor-pointer transition-colors block text-left"
                                      >
                                        <span className="text-[#027ea1]/30 mr-2">•</span>{item}
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          ) : displayedNavItem.sections ? (
                            (() => {
                              const sections = displayedNavItem.sections;
                              const hasGroups = sections.some(s => typeof s !== 'string' && (s.isGroupHeader || s.isGroupChild));
                              const needsTwoColumns = sections.length > 12;

                              const renderSection = (section: typeof sections[0], idx: number) => {
                                const label = typeof section === 'string' ? section : section.label;
                                const slug = typeof section === 'string'
                                  ? section.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
                                  : section.slug;
                                const isGroupHeader = typeof section !== 'string' && section.isGroupHeader;
                                const isGroupChild = typeof section !== 'string' && section.isGroupChild;
                                const pageHref = typeof section !== 'string' ? section.pageHref : undefined;
                                return (
                                  <button
                                    key={`${label}-${idx}`}
                                    onClick={() => handleSectionClick(displayedNavItem.href, slug, pageHref)}
                                    className={`text-[13px] cursor-pointer transition-colors block text-left leading-relaxed ${
                                      isGroupHeader
                                        ? 'text-[#027ea1] font-semibold mt-2 first:mt-0'
                                        : 'text-[#027ea1]/60 hover:text-[#027ea1]'
                                    }`}
                                    style={isGroupChild ? { paddingLeft: '18px' } : {}}
                                  >
                                    <span className={`mr-1.5 ${isGroupHeader ? 'text-[#027ea1]/40' : 'text-[#027ea1]/30'}`}>•</span>{label}
                                  </button>
                                );
                              };

                              if (needsTwoColumns && hasGroups) {
                                let splitIdx = Math.ceil(sections.length / 2);
                                for (let i = splitIdx; i < sections.length; i++) {
                                  const s = sections[i];
                                  if (typeof s !== 'string' && s.isGroupHeader) { splitIdx = i; break; }
                                }
                                const col1 = sections.slice(0, splitIdx);
                                const col2 = sections.slice(splitIdx);
                                return (
                                  <div className="flex gap-8">
                                    <div className="flex flex-col gap-0.5 flex-1">{col1.map((s, i) => renderSection(s, i))}</div>
                                    <div className="flex flex-col gap-0.5 flex-1">{col2.map((s, i) => renderSection(s, i + splitIdx))}</div>
                                  </div>
                                );
                              }

                              return <div className="flex flex-col gap-0.5">{sections.map((s, i) => renderSection(s, i))}</div>;
                            })()
                          ) : null}
                        </div>
                      )}

                      {/* Explore More: shown when no nav item to display */}
                      {!displayedNavItem && (
                        <div className="absolute inset-x-0 top-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                            Explore More
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {bottomMenuItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                onClick={onClose}
                                className="text-sm text-[#027ea1]/70 hover:text-[#027ea1] transition-colors cursor-pointer"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                          {/* Quick Actions */}
                          <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-4">
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                              Quick Actions
                            </p>
                            <div className="flex gap-2">
                              <a href="https://apply.jlu.edu.in/" onClick={onClose} className="bg-[#027ea1] text-white font-normal py-2 px-4 rounded-md hover:bg-[#026a88] transition-all shadow-sm hover:shadow-md text-center text-xs cursor-pointer whitespace-nowrap">
                                Apply Now
                              </a>
                              <a
                                href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="font-normal py-2 px-4 rounded-md transition-all shadow-sm hover:shadow-md text-center text-xs whitespace-nowrap"
                                style={{ backgroundColor: '#21313c', color: '#ffffff' }}
                              >
                                360° Tour
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Explore More + Quick Actions below sub-content */}
                    {displayedNavItem && (
                      <>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                            Explore More
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {bottomMenuItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                onClick={onClose}
                                className="text-sm text-[#027ea1]/70 hover:text-[#027ea1] transition-colors cursor-pointer"
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-3">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                            Quick Actions
                          </p>
                          <div className="flex gap-2">
                            <a href="https://apply.jlu.edu.in/" onClick={onClose} className="bg-[#027ea1] text-white font-normal py-2 px-4 rounded-md hover:bg-[#026a88] transition-all shadow-sm hover:shadow-md text-center text-xs cursor-pointer whitespace-nowrap">
                              Apply Now
                            </a>
                            <a
                              href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              className="font-normal py-2 px-4 rounded-md transition-all shadow-sm hover:shadow-md text-center text-xs whitespace-nowrap"
                              style={{ backgroundColor: '#21313c', color: '#ffffff' }}
                            >
                              360° Tour
                            </a>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Menu Image at Bottom */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute pointer-events-none"
                  style={{ bottom: '50px', left: '100px' }}
                >
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/menuu.png"
                    alt="Menu decoration"
                    width={1200}
                    height={1200}
                    className="object-contain opacity-30"
                  />
                </motion.div>

              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

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
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlulogo.png"
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


