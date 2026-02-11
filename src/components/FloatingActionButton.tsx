'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface FloatingActionButtonProps {
  onEnquireClick: () => void;
}

const actionItems = [
  {
    id: 'apply',
    label: 'Apply Now',
    description: 'Start your journey',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: '/apply',
    accentColor: '#c3fd7a',
  },
  {
    id: 'enquire',
    label: 'Enquire',
    description: 'Get in touch',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    action: 'enquire',
    accentColor: '#0ea5e9',
  },
  {
    id: 'brochure',
    label: 'Brochure',
    description: 'Download PDF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="18" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 15 12 18 15 15" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: '/brochure.pdf',
    accentColor: '#f59e0b',
  },
  {
    id: 'tour',
    label: 'Virtual Tour',
    description: 'Explore campus',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: 'https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html',
    accentColor: '#8b5cf6',
  },
  {
    id: 'contact',
    label: 'Call Us',
    description: '1800-180-5522',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: 'tel:18001805522',
    accentColor: '#10b981',
  },
];

export const FloatingActionButton = ({ onEnquireClick }: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate in after hero loads (sync with hero animation timing ~2.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2200); // Appears after hero animation completes
    return () => clearTimeout(timer);
  }, []);

  // Calculate heights - each item is ~58px (py-3 = 24px + icon 40px - overlaps) + padding
  const collapsedHeight = isMobile ? 60 : 68;
  const expandedHeight = (actionItems.length * 58) + 32; // 5 items * 58px + py-4 padding

  // Symmetrical two-step animation for both open and close
  useEffect(() => {
    if (isExpanded) {
      // Opening: container expands first, then content reveals from right
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShowContent(true);
        setIsAnimating(false);
      }, 150); // Faster reveal for right-to-left
      return () => clearTimeout(timer);
    } else {
      // Closing: content hides first, then container shrinks
      setShowContent(false);
    }
  }, [isExpanded]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const handleItemClick = (item: typeof actionItems[0]) => {
    if (item.action === 'enquire') {
      onEnquireClick();
      setIsExpanded(false);
    } else if (item.href) {
      if (item.href.startsWith('#')) {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (item.href.startsWith('tel:')) {
        window.location.href = item.href;
      } else if (item.href.startsWith('http')) {
        // External links open in new tab
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.href;
      }
      setIsExpanded(false);
    }
  };

  const buttonWidth = isMobile ? 52 : 56;

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-[9000] right-0"
      style={{
        top: '50%',
      }}
      initial={{ x: 100, y: '-50%' }}
      animate={{
        x: isVisible ? 0 : 100,
        y: '-50%'
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Panel that expands to the left - separate from button */}
      <motion.div
        className="absolute right-0 bg-[#1a3a3a] shadow-xl overflow-hidden"
        style={{
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          top: '50%',
          y: '-50%',
        }}
        initial={false}
        animate={{
          width: isExpanded ? 'auto' : buttonWidth,
          height: isExpanded ? expandedHeight : collapsedHeight,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          width: { duration: 0.4, delay: isExpanded ? 0 : 0.1 },
          height: { duration: 0.4, delay: isExpanded ? 0 : 0.1 },
        }}
      >
        {/* Expanded Content Panel */}
        <AnimatePresence mode="sync">
          {isExpanded && (
            <motion.div
              className="overflow-hidden h-full"
              style={{ marginRight: buttonWidth }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                opacity: { duration: 0.25 }
              }}
            >
              <div
                className="relative h-full"
                style={{
                  minWidth: '220px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  className="h-full"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{
                    clipPath: showContent ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                  }}
                  exit={{ clipPath: 'inset(0 100% 0 0)' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="py-4 px-3 h-full flex flex-col justify-center">
                    {actionItems.map((item, index) => (
                      <div key={item.id}>
                        <motion.button
                          onClick={() => handleItemClick(item)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group"
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: showContent ? 1 : 0,
                            x: showContent ? 0 : 20,
                            transition: {
                              delay: showContent ? index * 0.04 + 0.1 : 0,
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1]
                            }
                          }}
                          whileHover={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 text-white"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {item.icon}
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <p
                              className="text-sm font-semibold text-white truncate"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {item.label}
                            </p>
                            <p
                              className="text-xs text-white/50 truncate"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </motion.button>
                        {index < actionItems.length - 1 && (
                          <div className="mx-4 h-px bg-white/10" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button - completely separate, never moves */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative flex items-center justify-center text-white bg-[#1a3a3a]"
        style={{
          width: buttonWidth,
          height: collapsedHeight,
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
        }}
      >
        {/* Plus to X icon - only rotates */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ zIndex: 10 }}
          initial={false}
          animate={{
            rotate: isExpanded ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </motion.svg>

        {/* Pulse animation when collapsed */}
        {!isExpanded && (
          <motion.span
            className="absolute inset-0 bg-[#21313c]"
            style={{
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
            }}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </button>
    </motion.div>
  );
};
