'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getSearchIndex, type SearchItem } from '../data/searchIndex';
import { useIsMobile } from '../hooks/useIsMobile';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<SearchItem['category'], string> = {
  Program: '#027ea1',
  Page: '#1a6b5a',
  School: '#2d8b6e',
  Faculty: '#0c5e4f',
  Section: '#4a9d8a',
};

const categoryIcons: Record<SearchItem['category'], React.ReactNode> = {
  Program: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  Page: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  School: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Faculty: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Section: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  const searchIndex = useMemo(() => getSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);

    return searchIndex
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        let score = 0;

        // Exact title match
        if (titleLower === q) score += 100;
        // Title starts with query
        else if (titleLower.startsWith(q)) score += 80;
        // Title contains query
        else if (titleLower.includes(q)) score += 60;

        // All words match in title or description
        const allWordsMatch = words.every(
          (w) => titleLower.includes(w) || descLower.includes(w)
        );
        if (allWordsMatch) score += 40;

        // Individual word matches
        for (const w of words) {
          if (titleLower.includes(w)) score += 10;
          if (descLower.includes(w)) score += 5;
        }

        // Boost pages and programs
        if (item.category === 'Page') score += 3;
        if (item.category === 'Program') score += 2;

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }, [query, searchIndex]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigateTo = useCallback(
    (href: string) => {
      onClose();
      // For hash links, handle scroll
      if (href.includes('#')) {
        const [path, hash] = href.split('#');
        router.push(path);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      } else {
        router.push(href);
      }
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      // Scroll selected item into view
      setTimeout(() => {
        const el = resultsRef.current?.querySelector(`[data-index="${Math.min(selectedIndex + 1, results.length - 1)}"]`);
        el?.scrollIntoView({ block: 'nearest' });
      }, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      setTimeout(() => {
        const el = resultsRef.current?.querySelector(`[data-index="${Math.max(selectedIndex - 1, 0)}"]`);
        el?.scrollIntoView({ block: 'nearest' });
      }, 0);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigateTo(results[selectedIndex].href);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Close on Escape globally
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: { category: SearchItem['category']; items: (SearchItem & { score: number; globalIndex: number })[] }[] = [];
    const categoryOrder: SearchItem['category'][] = ['Page', 'Program', 'School', 'Faculty', 'Section'];
    let globalIndex = 0;

    for (const cat of categoryOrder) {
      const items = results
        .filter((r) => r.category === cat)
        .map((r) => ({ ...r, globalIndex: globalIndex++ }));
      if (items.length > 0) groups.push({ category: cat, items });
    }
    // Reset globalIndex mapping - we need to recalculate
    globalIndex = 0;
    for (const group of groups) {
      for (const item of group.items) {
        item.globalIndex = globalIndex++;
      }
    }
    return groups;
  }, [results]);

  // Quick suggestions when no query
  const quickLinks = [
    { title: 'All Programs', href: '/programs' },
    { title: 'Admissions', href: '/admissions' },
    { title: 'Placements', href: '/placement' },
    { title: 'Scholarship', href: '/scholarship' },
    { title: 'Campus Life', href: '/campus-life' },
    { title: 'Apply Now', href: '/apply' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed ${
              isMobile
                ? 'inset-x-0 top-0 rounded-b-2xl max-h-[85vh]'
                : 'top-6 left-1/2 -translate-x-1/2 w-full max-w-[640px] rounded-2xl max-h-[70vh]'
            } bg-white shadow-2xl flex flex-col overflow-hidden`}
            style={{ zIndex: 9999 }}
          >
            {/* Search input area */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              {/* Search icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#027ea1"
                className="h-5 w-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search programs, pages, schools..."
                className="flex-1 text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                autoComplete="off"
              />

              {/* Clear / Close */}
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results area */}
            <div ref={resultsRef} className="overflow-y-auto flex-1 overscroll-contain">
              {query.trim() === '' ? (
                /* Quick suggestions */
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 px-1">
                    Quick Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => navigateTo(link.href)}
                        className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-[#027ea1] hover:bg-[#027ea1] hover:text-white transition-all"
                      >
                        {link.title}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                /* No results */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" className="mb-3">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    No results found for &quot;{query}&quot;
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Try different keywords
                  </p>
                </div>
              ) : (
                /* Grouped results */
                <div className="py-2">
                  {groupedResults.map((group) => (
                    <div key={group.category}>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-5 pt-3 pb-1">
                        {group.category === 'Page' ? 'Pages' : group.category === 'Program' ? 'Programs' : group.category === 'School' ? 'Schools' : group.category === 'Faculty' ? 'Faculties' : 'Sections'}
                      </p>
                      {group.items.map((item) => (
                        <button
                          key={item.href}
                          data-index={item.globalIndex}
                          onClick={() => navigateTo(item.href)}
                          onMouseEnter={() => setSelectedIndex(item.globalIndex)}
                          className={`w-full flex items-start gap-3 px-5 py-2.5 text-left transition-colors ${
                            selectedIndex === item.globalIndex
                              ? 'bg-[#027ea1]/5'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span
                            className="mt-0.5 shrink-0"
                            style={{ color: categoryColors[item.category] }}
                          >
                            {categoryIcons[item.category]}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {highlightMatch(item.title, query)}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`shrink-0 mt-1 transition-opacity ${
                              selectedIndex === item.globalIndex
                                ? 'opacity-60 text-[#027ea1]'
                                : 'opacity-0'
                            }`}
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-2.5 flex items-center justify-between text-xs text-gray-400">
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                <div className="hidden sm:flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">&uarr;</kbd>
                    <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">&darr;</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">Enter</kbd>
                    open
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/** Highlight matching text in a string */
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegex(query.trim())})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-[#027ea1] font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default SearchOverlay;
