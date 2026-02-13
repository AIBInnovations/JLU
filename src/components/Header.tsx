'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useIsMobile } from '../hooks/useIsMobile';
import Image from 'next/image';

// Navigation item types
interface NavigationColumn {
  title: string;
  items: string[];
}

interface SectionItem {
  label: string;
  slug: string;
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
      { label: 'Introduction', slug: 'introduction' },
      { label: 'History & Heritage', slug: 'history' },
      { label: 'Leadership', slug: 'leadership' },
      { label: 'Governance', slug: 'governance' },
      { label: 'Accreditations', slug: 'accreditations' },
      { label: 'Rankings & Awards', slug: 'rankings' },
      { label: 'Honorary Doctorates', slug: 'honorary-doctorates' },
    ]
  },
  {
    label: 'ACADEMICS',
    href: '/academics',
    type: 'megamenu',
    columns: [
      {
        title: 'Schools & Colleges',
        items: [
          'School of Engineering',
          'School of Business',
          'School of Law',
          'School of Liberal Arts',
          'School of Architecture',
          'School of Pharmacy',
          'School of Journalism'
        ]
      },
      {
        title: 'Programs Offered',
        items: [
          'Undergraduate Programs',
          'Postgraduate Programs',
          'Doctoral Programs',
          'Certificate Courses',
          'Online Programs',
          'Executive Education'
        ]
      }
    ]
  },
  {
    label: 'CAMPUS',
    href: '/campus',
    type: 'dropdown',
    sections: [
      'Infrastructure',
      'Facilities',
      'Library',
      'Laboratories',
      'Sports Complex',
      'Student Accommodation',
      'Dining Services',
      'Medical Center'
    ]
  },
  {
    label: 'ADMISSIONS',
    href: '/admissions',
    type: 'megamenu',
    columns: [
      {
        title: 'Undergraduate Admissions',
        items: [
          'UG Application Process',
          'Eligibility Criteria',
          'Entrance Exams',
          'Important Dates',
          'UG Programs'
        ]
      },
      {
        title: 'Postgraduate Admissions',
        items: [
          'PG Application Process',
          'Eligibility Requirements',
          'Selection Process',
          'PG Programs',
          'Research Admissions'
        ]
      },
      {
        title: 'Support & Resources',
        items: [
          'Scholarships',
          'Financial Aid',
          'Fee Structure',
          'Admission FAQs',
          'Contact Admissions'
        ]
      }
    ]
  },
  {
    label: 'RESEARCH',
    href: '/research',
    type: 'dropdown',
    sections: [
      'Research Centers',
      'Research Areas',
      'Publications',
      'Research Projects',
      'Innovation Labs',
      'Collaborations',
      'Research Funding'
    ]
  },
  {
    label: 'CAMPUS LIFE',
    href: '/campus-life',
    type: 'dropdown',
    sections: [
      'Student Clubs',
      'Cultural Activities',
      'Sports & Recreation',
      'Events & Festivals',
      'Student Council',
      'Community Service',
      'Health & Wellness'
    ]
  },
  {
    label: 'INTERNATIONAL OFFICE',
    href: '/international-office',
    type: 'dropdown',
    sections: [
      'Global Partnerships',
      'Exchange Programs',
      'International Students',
      'Study Abroad',
      'Visa Assistance',
      'International Faculty'
    ]
  },
  {
    label: 'NEWS & EVENTS',
    href: '/news-events',
    type: 'dropdown',
    sections: [
      'Latest News',
      'Events Calendar',
      'Press Releases',
      'Media Coverage',
      'Announcements',
      'Photo Gallery'
    ]
  }
];

// Bottom menu items - always shown in right section
const bottomMenuItems = [
  { label: 'Student Clubs', href: '/student-clubs' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Podcast', href: '/podcast' },
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleSectionClick = (href: string, slug: string) => {
    onClose();
    const targetPath = href;
    const scrollToEl = () => {
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (pathname === targetPath) {
      // Already on the page — just scroll
      scrollToEl();
    } else {
      // Navigate first, then scroll after page renders
      router.push(`${targetPath}#${slug}`);
      setTimeout(scrollToEl, 600);
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

  // Show hovered item's sub-content, or fall back to active page's sub-content
  const displayNavItem = hoveredNavItem || activeNavItem;

  const circleSize = isMobile ? 2000 : 1500;
  const buttonWidth = isMobile ? 24 : 168;
  const buttonHeight = isMobile ? 24 : 48;

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
                style={{ zIndex: 59, overscrollBehavior: 'contain' }}
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
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                          onHoverStart={() => setHoveredItem(item.label)}
                          onHoverEnd={() => setHoveredItem(null)}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                              isActive(item.href)
                                ? 'text-[#03463B]'
                                : 'text-[#03463B]/60 hover:text-[#03463B]'
                            }`}
                          >
                            {isActive(item.href) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#03463B]" />
                            )}
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-[1px] bg-gray-300 h-[300px] my-4" />

                  {/* Right side - Hovered item content or featured buttons and bottom menu */}
                  <div className="flex flex-col gap-1.5 flex-1 pt-6 min-h-[200px]">
                    <AnimatePresence mode="wait">
                      {displayNavItem ? (
                        <motion.div
                          key={displayNavItem.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="flex flex-col gap-1.5"
                        >
                          <h3 className="text-sm font-semibold text-[#03463B] mb-1">
                            {displayNavItem.label}
                          </h3>
                          {displayNavItem.type === 'megamenu' && displayNavItem.columns ? (
                            <div className="flex flex-col gap-3">
                              {displayNavItem.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="text-xs font-semibold text-[#03463B] mb-1.5">
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
                                          className="text-xs text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors block mb-1"
                                        >
                                          {item}
                                        </Link>
                                      );
                                    }
                                    return (
                                      <button
                                        key={item}
                                        onClick={() => handleSectionClick(displayNavItem.href, slug)}
                                        className="text-xs text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors block mb-1 text-left"
                                      >
                                        {item}
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          ) : displayNavItem.sections ? (
                            displayNavItem.sections.map((section) => {
                              const label = typeof section === 'string' ? section : section.label;
                              const slug = typeof section === 'string'
                                ? section.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
                                : section.slug;
                              return (
                                <button
                                  key={label}
                                  onClick={() => handleSectionClick(displayNavItem.href, slug)}
                                  className="text-xs text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors block text-left"
                                >
                                  {label}
                                </button>
                              );
                            })
                          ) : null}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="featured-content"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="flex flex-col gap-3"
                        >
                          {/* Bottom Menu - Mobile */}
                          <div className="mb-3">
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.65, duration: 0.3 }}
                              className="text-[9px] text-gray-500 uppercase tracking-wider mb-2"
                            >
                              Explore More
                            </motion.p>
                            <div className="flex flex-col gap-1.5">
                              {bottomMenuItems.map((subItem, index) => (
                                <motion.a
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={onClose}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.7 + index * 0.04, duration: 0.3 }}
                                  className="text-xs text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                                >
                                  {subItem.label}
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* Featured Action Buttons - Mobile (at bottom) */}
                          <div className="flex flex-col gap-2 border-t pt-3">
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9, duration: 0.3 }}
                              className="text-[9px] text-gray-500 uppercase tracking-wider mb-1"
                            >
                              Quick Actions
                            </motion.p>
                            <div className="flex gap-2">
                              <Link href="/apply" onClick={onClose} className="flex-1">
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.95, duration: 0.3 }}
                                  className="bg-[#03463B] text-white font-semibold py-2 px-3 rounded-md hover:bg-[#025039] transition-all text-xs text-center cursor-pointer"
                                >
                                  Apply Now
                                </motion.div>
                              </Link>
                              <motion.a
                                href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.3 }}
                                className="flex-1 border-2 border-[#03463B] text-[#03463B] font-semibold py-2 px-3 rounded-md hover:bg-[#03463B] hover:text-white transition-all text-xs text-center"
                              >
                                360° Tour
                              </motion.a>
                            </div>
                          </div>
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
                    backgroundColor: '#03463B',
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
                <div className="flex gap-6" style={{ marginTop: '480px', marginLeft: '-350px' }}>
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
                          onHoverEnd={() => setHoveredItem(null)}
                        >
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`text-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                              isActive(item.href)
                                ? 'text-[#03463B]'
                                : 'text-[#03463B]/60 hover:text-[#03463B]'
                            }`}
                          >
                            {isActive(item.href) && (
                              <span className="w-2 h-2 rounded-full bg-[#03463B]" />
                            )}
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Vertical divider line */}
                  <div className="w-[1px] bg-gray-300 h-[400px] my-8" />

                  {/* Right side - Hovered item content or featured buttons and bottom menu */}
                  <div className="flex flex-col gap-2.5 pt-8 w-[520px]" style={{ marginLeft: '0px' }}>
                    <AnimatePresence mode="wait">
                      {displayNavItem ? (
                        <motion.div
                          key={displayNavItem.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="flex flex-col gap-2"
                        >
                          <h3 className="text-lg font-semibold text-[#03463B] mb-1">
                            {displayNavItem.label}
                          </h3>
                          {displayNavItem.type === 'megamenu' && displayNavItem.columns ? (
                            <div className="flex gap-8">
                              {displayNavItem.columns.map((column) => (
                                <div key={column.title} className="flex flex-col gap-2">
                                  <p className="text-sm font-semibold text-[#03463B] mb-1">
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
                                          className="text-sm text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      );
                                    }
                                    return (
                                      <button
                                        key={item}
                                        onClick={() => handleSectionClick(displayNavItem.href, slug)}
                                        className="text-sm text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors block text-left"
                                      >
                                        {item}
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          ) : displayNavItem.sections ? (
                            displayNavItem.sections.map((section) => {
                              const label = typeof section === 'string' ? section : section.label;
                              const slug = typeof section === 'string'
                                ? section.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
                                : section.slug;
                              return (
                                <button
                                  key={label}
                                  onClick={() => handleSectionClick(displayNavItem.href, slug)}
                                  className="text-sm text-[#03463B]/60 hover:text-[#03463B] cursor-pointer transition-colors block text-left"
                                >
                                  {label}
                                </button>
                              );
                            })
                          ) : null}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="featured-content"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="flex flex-col gap-4"
                        >
                          {/* Bottom Menu */}
                          <div className="mb-4">
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="text-xs text-gray-500 uppercase tracking-wider mb-3"
                            >
                              Explore More
                            </motion.p>
                            <div className="flex flex-col gap-2">
                              {bottomMenuItems.map((subItem, index) => (
                                <motion.a
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={onClose}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 + index * 0.04, duration: 0.3 }}
                                  className="text-sm text-[#03463B]/70 hover:text-[#03463B] transition-colors cursor-pointer"
                                >
                                  {subItem.label}
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* Featured Action Buttons (at bottom) */}
                          <div className="flex flex-col gap-2 border-t pt-4 mt-3">
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.3 }}
                              className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5"
                            >
                              Quick Actions
                            </motion.p>
                            <div className="flex gap-2">
                              <Link href="/apply" onClick={onClose}>
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.45, duration: 0.3 }}
                                  className="bg-[#03463B] text-white font-normal py-2 px-4 rounded-md hover:bg-[#025039] transition-all shadow-sm hover:shadow-md text-center text-xs cursor-pointer whitespace-nowrap"
                                >
                                  Apply Now
                                </motion.div>
                              </Link>
                              <motion.a
                                href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="border border-[#03463B] text-[#03463B] font-normal py-2 px-4 rounded-md hover:bg-[#03463B] hover:text-white transition-all text-center text-xs whitespace-nowrap"
                              >
                                360° Tour
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                    src="/menuu.png"
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

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={`relative flex items-center justify-center shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${
        isMobile ? 'h-6 w-6 rounded-md' : 'h-[42px] w-[150px] rounded-md'
      } ${isOpen && isMobile ? 'bg-[#03463B]' : 'bg-white'}`}
      style={{ zIndex: 10000 }}
    >
      {/* Desktop: Show Menu text and divider (only when not open) */}
      {!isMobile && !isOpen && (
        <>
          <span className="text-sm font-medium tracking-wide pl-4 mr-auto text-[#0c3b5f]">Menu</span>
          <div className="h-[32px] w-px bg-gray-300 mx-5" />
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

// Header Component
export const Header = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMobile = useIsMobile();
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
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide header when scrolling down (after 100px)
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
      animate={{ y: isVisible || isMenuOpen ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
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
        className="relative flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-32"
        style={{ zIndex: 60 }}
      >
        {/* Logo on left - bigger */}
        <motion.div
          initial={{ opacity: 0, x: -15, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: isHomepage ? 2.9 : 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{
            opacity: isMenuOpen && isMobile ? 0 : 1,
            visibility: isMenuOpen && isMobile ? 'hidden' : 'visible',
            pointerEvents: isMenuOpen && isMobile ? 'none' : 'auto',
          }}
        >
          <Link href="/">
            <img
              src="/jlulogo.png"
              alt="Jagran Lakecity University logo"
              className={`w-auto object-contain drop-shadow-lg cursor-pointer ${
                isMobile ? 'h-14' : 'h-16 sm:h-20'
              }`}
            />
          </Link>
        </motion.div>

        {/* Right side - Search and Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search button */}
          <button
            className={`flex items-center justify-center bg-white text-slate-800 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-black/10 ${
              isMobile ? 'h-6 w-6 rounded-md' : 'h-12 w-12 rounded-xl'
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
