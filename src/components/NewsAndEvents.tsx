'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Custom easing for smooth animations
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: customEase },
  },
};

// ============================================================
// UPCOMING EVENTS DATA — Update this array to add/edit events
// ============================================================
const upcomingEventsData = [
  { date: '2026-04-05', title: 'Orientation Program 2026-27', venue: 'JLU Main Auditorium', category: 'Academic' },
  { date: '2026-04-15', title: 'International Yoga Day Celebration', venue: 'JLU Campus Ground', category: 'Wellness' },
  { date: '2026-05-10', title: 'Industry Connect Summit', venue: 'JLU Convention Centre', category: 'Industry' },
  { date: '2026-05-25', title: 'National Science Day Seminar', venue: 'Faculty of Science and Technology', category: 'Academic' },
  { date: '2026-06-08', title: 'Workshop on AI & Machine Learning', venue: 'Jagran School of AI', category: 'Workshop' },
  { date: '2026-06-20', title: 'Alumni Homecoming 2026', venue: 'JLU Campus', category: 'Alumni' },
  { date: '2026-07-12', title: 'Inter-University Sports Meet', venue: 'JLU Sports Complex', category: 'Sports' },
  { date: '2026-07-26', title: 'Hackathon: Lakecity Hack 2026', venue: 'Faculty of Science and Technology', category: 'Technology' },
  { date: '2026-08-09', title: 'Independence Day Celebration', venue: 'JLU Main Ground', category: 'Cultural' },
  { date: '2026-08-22', title: 'Research Paper Presentation', venue: 'JLU Research Centre', category: 'Academic' },
  { date: '2026-09-05', title: 'Teachers Day Celebration', venue: 'JLU Auditorium', category: 'Cultural' },
  { date: '2026-09-18', title: 'International Moot Court Competition', venue: 'Faculty of Law', category: 'Academic' },
  { date: '2026-10-02', title: 'Lehar - Annual Cultural Fest', venue: 'JLU Campus', category: 'Cultural' },
  { date: '2026-10-20', title: 'Placement Drive - Season 1', venue: 'JLU Placement Cell', category: 'Placement' },
  { date: '2026-11-05', title: 'International Festival of Media', venue: 'Faculty of Media and Social Sciences', category: 'Media' },
  { date: '2026-11-22', title: 'Entrepreneurship Conclave', venue: 'JLBS Auditorium', category: 'Industry' },
  { date: '2026-12-10', title: 'Annual Convocation 2026', venue: 'JLU Main Auditorium', category: 'Academic' },
  { date: '2026-12-20', title: 'Winter Cultural Night', venue: 'JLU Amphitheatre', category: 'Cultural' },
  { date: '2027-01-15', title: 'Republic Day Celebration', venue: 'JLU Main Ground', category: 'Cultural' },
  { date: '2027-01-28', title: 'National Law Fest', venue: 'Faculty of Law', category: 'Academic' },
  { date: '2027-02-14', title: 'Design Exhibition & Showcase', venue: 'Jagran School of Design', category: 'Exhibition' },
  { date: '2027-02-28', title: 'Placement Drive - Season 2', venue: 'JLU Placement Cell', category: 'Placement' },
  { date: '2027-03-09', title: 'JLU International Festival of Media', venue: 'JLU Campus', category: 'Media' },
  { date: '2027-03-25', title: 'Annual Sports Day', venue: 'JLU Sports Complex', category: 'Sports' },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function EventsCalendarSection() {
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(calendarMonth.year, calendarMonth.month);
  const firstDay = getFirstDayOfMonth(calendarMonth.year, calendarMonth.month);

  const eventDatesInMonth = new Set(
    upcomingEventsData
      .filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === calendarMonth.year && d.getMonth() === calendarMonth.month;
      })
      .map((e) => new Date(e.date).getDate())
  );

  const eventsForSelected = selectedDate
    ? upcomingEventsData.filter((e) => e.date === selectedDate)
    : [];

  const todayStr = new Date().toISOString().split('T')[0];

  // Get upcoming events (from today onwards)
  const upcoming = upcomingEventsData
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const prevMonth = () => {
    setCalendarMonth((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCalendarMonth((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
    setSelectedDate(null);
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  return (
    <div id="events-calendar" className="w-full bg-[#f6f7f0]">
      <div
        className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
        style={{ maxWidth: '1440px' }}
      >
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <span
            className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
            style={{ letterSpacing: '0.2em' }}
          >
            Events Calendar
          </span>
          <h1
            className="text-[#21313c] text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            What&apos;s happening{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic' }}>
              on campus
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16">
          {/* Left - Upcoming Events List */}
          <motion.div
            className="flex-1"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[#999] uppercase tracking-widest text-xl md:text-2xl font-bold mb-6" style={{ letterSpacing: '0.15em' }}>
              Upcoming Events
            </p>
            {upcoming.map((event) => {
              const d = new Date(event.date);
              const day = String(d.getDate()).padStart(2, '0');
              const month = MONTHS[d.getMonth()].substring(0, 3).toUpperCase();
              return (
                <motion.div
                  key={event.date + event.title}
                  variants={staggerItem}
                  className="group cursor-pointer py-5 md:py-6 border-b border-[#21313c]/10 hover:border-[#21313c]/30 transition-colors"
                >
                  <div className="flex items-start gap-4 md:gap-8">
                    <div className="text-center min-w-16 md:min-w-20">
                      <p className="text-[#f0c14b] leading-none text-4xl md:text-5xl font-bold">{day}</p>
                      <p className="text-[#21313c] uppercase tracking-wider text-xs md:text-sm font-medium">{month}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[#027ea1]/10 text-[#027ea1] text-xl md:text-2xl font-bold font-medium rounded-full">
                          {event.category}
                        </span>
                      </div>
                      <h4 className="text-[#21313c] group-hover:text-[#f0c14b] transition-colors text-lg md:text-xl font-bold leading-tight">
                        {event.title}
                      </h4>
                      <p className="text-[#999] mt-1 text-xs md:text-sm">{event.venue}</p>
                    </div>
                    <motion.span
                      className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block text-xl"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right - Full Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
            className="w-full lg:w-[420px] shrink-0"
          >
            <div className="bg-[#21313c] rounded-2xl overflow-hidden">
              {/* Calendar Header */}
              <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5 border-b border-white/10">
                <p className="text-xl md:text-2xl font-bold text-white">
                  {MONTHS[calendarMonth.month]} {calendarMonth.year}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    onClick={prevMonth}
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ←
                  </motion.button>
                  <motion.button
                    onClick={nextMonth}
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    →
                  </motion.button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 px-4 md:px-6 pt-4">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-white/40 text-xs font-medium pb-3">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 px-4 md:px-6 pb-4">
                {/* Empty cells for days before first of month */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 md:h-11" />
                ))}
                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calendarMonth.year}-${String(calendarMonth.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const hasEvent = eventDatesInMonth.has(day);
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === todayStr;

                  return (
                    <button
                      key={day}
                      onClick={() => hasEvent ? handleDayClick(day) : undefined}
                      className={`h-10 md:h-11 flex flex-col items-center justify-center rounded-lg text-sm relative transition-all
                        ${hasEvent ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'}
                        ${isSelected ? 'bg-[#f0c14b] text-[#21313c] font-bold' : ''}
                        ${isToday && !isSelected ? 'ring-1 ring-[#f0c14b]' : ''}
                        ${!isSelected ? 'text-white/80' : ''}
                      `}
                    >
                      {day}
                      {hasEvent && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#f0c14b]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Date Events */}
              <AnimatePresence>
                {selectedDate && eventsForSelected.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 overflow-hidden"
                  >
                    <div className="px-5 py-4 md:px-6 md:py-5 space-y-3">
                      {eventsForSelected.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#f0c14b] mt-1.5 shrink-0" />
                          <div>
                            <p className="text-white font-medium text-sm">{event.title}</p>
                            <p className="text-white/50 text-xs">{event.venue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legend */}
              <div className="px-5 py-3 md:px-6 border-t border-white/10 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f0c14b]" />
                  <span className="text-white/40 text-xs">Event day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded ring-1 ring-[#f0c14b]" />
                  <span className="text-white/40 text-xs">Today</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const pastEventsImages = [
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1039.JPG', // Convocation 2025
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/computer%20lab.JPG', // Science Expo
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/student-clubs.jpg', // Sports Meet
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9018.JPG', // Cultural Fest
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Mental%20Health%20week/IMG_7775.JPG', // Mental Health Week
  'https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1081.JPG', // Alumni Meet
];

const pastEventsData = [
  {
    id: 1,
    year: '2025',
    title: 'Convocation 2025',
    description: 'Celebrating 2,500 graduates across 40 disciplines.',
  },
  {
    id: 2,
    year: '2024',
    title: 'Science Expo',
    description: 'Over 200 student projects showcased to industry leaders.',
  },
  {
    id: 3,
    year: '2024',
    title: 'Sports Meet',
    description: 'A display of true athleticism and competitive spirit.',
  },
  {
    id: 4,
    year: '2024',
    title: 'Cultural Fest',
    description: 'Three days of music, dance, and artistic expression.',
  },
  {
    id: 5,
    year: '2023',
    title: 'Tech Summit',
    description: 'Industry experts shared insights on emerging technologies.',
  },
  {
    id: 6,
    year: '2023',
    title: 'Alumni Meet',
    description: 'Reconnecting generations of JLU graduates.',
  },
];

const NewsAndEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryScale, setGalleryScale] = useState(1);
  const [archiveEvent, setArchiveEvent] = useState<typeof pastEventsData[number] | null>(null);
  const cardsPerView = 3;
  const maxSlide = Math.max(0, pastEventsData.length - cardsPerView);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Calculate gallery scale based on viewport width
  useEffect(() => {
    const calculateScale = () => {
      const scale = Math.min(1, window.innerWidth / 1440);
      setGalleryScale(scale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
  };
  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen"
          style={{
            minHeight: '100vh',
          }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1020.JPG"
              alt="News & Events at JLU"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Paragraph at Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 40px)',
            paddingTop: 'clamp(100px, 15vw, 120px)',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-bold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            STAY <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#027ea1', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>connected</span>
          </h2>
          <p
            className="text-white"
            style={{
              fontWeight: 600, lineHeight: 1.5, fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            Stay updated with the latest news, announcements, and events happening at Jagran Lakecity University.
          </p>
        </motion.div>

        {/* Large "News & Events" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: 'clamp(8px, 2vw, 40px)',
            paddingBottom: '0px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-normal select-none"
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            News & Events
          </motion.h1>
        </div>
      </div>

      {/* JLU in News Section */}
      <div id="jlu-in-news" />
      <div id="latest-news" />
      <div id="media-coverage" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-0 mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Media Coverage
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                JLU in the{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  news
                </span>
              </h2>
            </div>
            <motion.a
              href="#"
              className="inline-flex items-center gap-3 text-[#21313c] font-medium group text-sm md:text-[15px]"
              whileHover={{ x: 5 }}
            >
              View all coverage
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </motion.a>
          </motion.div>

          {/* Featured News Card + Grid */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 md:gap-8">
            {/* Featured Story - Large Card */}
            <motion.div
              className="relative overflow-hidden group cursor-pointer w-full lg:w-1/2 h-80 md:h-125 rounded-2xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: customEase }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_0858.JPG"
                  alt="JLU 11th Foundation Day"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
                <span className="bg-[#f0c14b] text-[#21313c] px-3 py-1 text-xl md:text-2xl font-bold font-bold uppercase tracking-wider">
                  Featured
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-xl md:text-2xl font-bold font-medium">
                  Hindustan Times
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                <p className="text-white/60 text-xs md:text-sm mb-2">January 2026</p>
                <h3 className="text-white font-bold text-lg md:text-2xl lg:text-3xl leading-tight mb-3">
                  JLU Celebrates 11th Foundation Day with Global Academic Leaders
                </h3>
                <p className="text-white/70 text-sm md:text-base hidden md:block" style={{ lineHeight: 1.7 }}>
                  Jagran Lakecity University marked its 11th Foundation Day with distinguished guests from across the globe, reaffirming its commitment to academic excellence and innovation.
                </p>
              </div>
            </motion.div>

            {/* News Grid - Right Side */}
            <motion.div
              className="flex-1 flex flex-col gap-4 md:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* News Item 1 */}
              <motion.a
                href="#"
                variants={staggerItem}
                className="flex gap-4 md:gap-6 p-4 md:p-5 bg-[#f6f7f0] rounded-xl group cursor-pointer hover:bg-[#eef0e4] transition-colors"
              >
                <div className="relative shrink-0 overflow-hidden w-20 h-20 md:w-28 md:h-28 rounded-lg">
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9025.JPG"
                    alt="AUAP Conference"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <span className="text-[#999] text-xl md:text-2xl font-bold font-medium">Times of India</span>
                    <span className="text-[#999] text-[12px]">|</span>
                    <span className="text-[#999] text-xl md:text-2xl font-bold">Dec 2025</span>
                  </div>
                  <h4 className="text-[#21313c] font-bold text-sm md:text-base leading-snug group-hover:text-[#f0c14b] transition-colors line-clamp-2">
                    JLU Hosts AUAP International Conference on Higher Education
                  </h4>
                  <p className="text-[#666] text-xs md:text-sm mt-1.5 hidden md:block line-clamp-2" style={{ lineHeight: 1.6 }}>
                    University leaders from 15 countries gathered at JLU for the Association of Universities of Asia and the Pacific conference.
                  </p>
                </div>
              </motion.a>

              {/* News Item 2 */}
              <motion.a
                href="#"
                variants={staggerItem}
                className="flex gap-4 md:gap-6 p-4 md:p-5 bg-[#f6f7f0] rounded-xl group cursor-pointer hover:bg-[#eef0e4] transition-colors"
              >
                <div className="relative shrink-0 overflow-hidden w-20 h-20 md:w-28 md:h-28 rounded-lg">
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9067.JPG"
                    alt="JLU Rankings"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <span className="text-[#999] text-xl md:text-2xl font-bold font-medium">India Today</span>
                    <span className="text-[#999] text-[12px]">|</span>
                    <span className="text-[#999] text-xl md:text-2xl font-bold">Nov 2025</span>
                  </div>
                  <h4 className="text-[#21313c] font-bold text-sm md:text-base leading-snug group-hover:text-[#f0c14b] transition-colors line-clamp-2">
                    JLU Ranked Among Top Private Universities in Central India
                  </h4>
                  <p className="text-[#666] text-xs md:text-sm mt-1.5 hidden md:block line-clamp-2" style={{ lineHeight: 1.6 }}>
                    Jagran Lakecity University secures a top position in the India Today-MDRA Best Universities Survey for 2025.
                  </p>
                </div>
              </motion.a>

              {/* News Item 3 */}
              <motion.a
                href="#"
                variants={staggerItem}
                className="flex gap-4 md:gap-6 p-4 md:p-5 bg-[#f6f7f0] rounded-xl group cursor-pointer hover:bg-[#eef0e4] transition-colors"
              >
                <div className="relative shrink-0 overflow-hidden w-20 h-20 md:w-28 md:h-28 rounded-lg">
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/JAgran%20of%20Social%20science/DSC08858.JPG"
                    alt="Research Innovation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <span className="text-[#999] text-xl md:text-2xl font-bold font-medium">The Pioneer</span>
                    <span className="text-[#999] text-[12px]">|</span>
                    <span className="text-[#999] text-xl md:text-2xl font-bold">Oct 2025</span>
                  </div>
                  <h4 className="text-[#21313c] font-bold text-sm md:text-base leading-snug group-hover:text-[#f0c14b] transition-colors line-clamp-2">
                    JLU Faculty Receives National Award for Innovation in Pharmaceutical Research
                  </h4>
                  <p className="text-[#666] text-xs md:text-sm mt-1.5 hidden md:block line-clamp-2" style={{ lineHeight: 1.6 }}>
                    Dr. Vandana Rathore honoured for her pioneering work in novel drug delivery systems.
                  </p>
                </div>
              </motion.a>

              {/* News Item 4 */}
              <motion.a
                href="#"
                variants={staggerItem}
                className="flex gap-4 md:gap-6 p-4 md:p-5 bg-[#f6f7f0] rounded-xl group cursor-pointer hover:bg-[#eef0e4] transition-colors"
              >
                <div className="relative shrink-0 overflow-hidden w-20 h-20 md:w-28 md:h-28 rounded-lg">
                  <Image
                    src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1426.JPG"
                    alt="Convocation"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                    <span className="text-[#999] text-xl md:text-2xl font-bold font-medium">Dainik Bhaskar</span>
                    <span className="text-[#999] text-[12px]">|</span>
                    <span className="text-[#999] text-xl md:text-2xl font-bold">Sep 2025</span>
                  </div>
                  <h4 className="text-[#21313c] font-bold text-sm md:text-base leading-snug group-hover:text-[#f0c14b] transition-colors line-clamp-2">
                    10th Convocation Ceremony: 2,500 Students Awarded Degrees
                  </h4>
                  <p className="text-[#666] text-xs md:text-sm mt-1.5 hidden md:block line-clamp-2" style={{ lineHeight: 1.6 }}>
                    The grand ceremony saw dignitaries, gold medalists, and proud families celebrating academic achievements.
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What's happening on campus Section */}
      <EventsCalendarSection />

      {/* Highlights from past events Section */}
      <div id="past-events" />
      <div id="press-releases" className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-0 mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            viewport={{ once: true }}
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
                style={{ letterSpacing: '0.2em' }}
              >
                Archive
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Highlights from{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  past events
                </span>
              </h2>
            </div>
            <div className="flex gap-2 md:gap-3">
              <motion.button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={currentSlide >= maxSlide}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-[#21313c] flex items-center justify-center text-[#21313c] hover:bg-[#21313c] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </motion.button>
            </div>
          </motion.div>

          {/* Cards Carousel */}
          <div className="overflow-hidden -mx-5 px-5 md:mx-0 md:px-0">
            <motion.div
              className="flex gap-4 md:gap-8"
              animate={{ x: -currentSlide * (typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 432) }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              {pastEventsData.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="shrink-0 group cursor-pointer w-64 md:w-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: customEase }}
                  viewport={{ once: true }}
                  onClick={() => setArchiveEvent(event)}
                >
                  {/* Card Image */}
                  <motion.div
                    className="relative overflow-hidden w-64 h-80 md:w-100 md:h-125 rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: customEase }}
                    >
                      <Image
                        src={pastEventsImages[index]}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#f0c14b] px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-[#21313c] z-10">
                      {event.year}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                    </div>
                  </motion.div>
                  {/* Card Content */}
                  <div className="mt-4 md:mt-6 flex flex-col h-22.5 md:h-25">
                    <p className="text-[#666] text-sm md:text-base flex-1" style={{ lineHeight: 1.7 }}>
                      {event.description}
                    </p>
                    <motion.button
                      onClick={() => setArchiveEvent(event)}
                      className="inline-flex items-center gap-2 text-[#21313c] font-medium group-hover:text-[#f0c14b] transition-colors text-sm md:text-base mt-auto pt-2"
                      whileHover={{ x: 3 }}
                    >
                      View Archive <span>→</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Campus in moments Section */}
      <div id="photo-gallery" className="w-full bg-white pb-12 md:pb-[120px]">
        {/* Mobile: Percentage-based layout (matches Campus.tsx) */}
        <div
          className="relative mx-auto overflow-hidden h-[500px] sm:h-[700px] md:hidden"
          style={{ maxWidth: '1440px' }}
        >
          {/* Card 1 - Top Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '28%', height: '24%', top: '0%', left: '13%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Anti%20Ragging%20WEEK/IMG_1947.JPG"
              alt="Students in library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 2 - Top Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '21%', height: '32%', top: '0%', left: '52%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9025.JPG"
              alt="Event hall"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 3 - Top Right (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '13%', height: '19%', top: '-5%', left: '89%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/aerial-view.webp"
              alt="Campus building"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 4 - Middle Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '15%', height: '22%', top: '30%', left: '80%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/JAgran%20of%20Social%20science/DSC08858.JPG"
              alt="Lab equipment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 5 - Middle Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '19%', height: '32%', top: '31%', left: '0%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9060.JPG"
              alt="Campus event"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 6 - Bottom Right Upper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '20%', height: '34%', top: '60%', left: '80%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1426.JPG"
              alt="Students together"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 7 - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '28%', height: '21%', top: '79%', left: '44%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_0858.JPG"
              alt="Graduation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 8 - Bottom Center Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '15%', height: '32%', top: '68%', left: '22%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Mental%20Health%20week/IMG_7813.JPG"
              alt="Library"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Card 9 - Bottom Left (partially cut) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            viewport={{ once: true }}
            className="absolute overflow-hidden group cursor-pointer rounded-lg"
            style={{ width: '15%', height: '18%', top: '75%', left: '-4%' }}
          >
            <Image
              src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Anti%20Ragging%20WEEK/IMG_3582.JPG"
              alt="Sports"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Center Content - Mobile */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              viewport={{ once: true }}
              className="text-[#21313c] mb-2 text-lg sm:text-2xl"
              style={{
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
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
              className="text-[#666] mb-4 text-xs sm:text-sm max-w-[250px] sm:max-w-[300px]"
              style={{ lineHeight: 1.7 }}
            >
              Experience the vibrant life, learning, and celebrations at JLU campus.
            </motion.p>
          </div>
        </div>

        {/* Desktop: Original scaled layout */}
        <div
          className="relative mx-auto hidden md:block"
          style={{
            maxWidth: '1440px',
            height: `${1000 * galleryScale}px`,
            overflow: 'hidden'
          }}
        >
          {/* Scalable Container - scales proportionally with viewport */}
          <div
            className="absolute origin-top-left"
            style={{
              width: '1440px',
              height: '1000px',
              transform: `scale(${galleryScale})`,
            }}
          >
            {/* Card 1 - Top Left - Students Studying */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '403px', height: '238px', top: '0px', left: '188px', borderRadius: '16px' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Anti%20Ragging%20WEEK/IMG_1947.JPG"
                  alt="Students collaborating"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 2 - Top Center - Graduation */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '308px', height: '325px', top: '0px', left: '753px', borderRadius: '16px' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_0858.JPG"
                  alt="Graduation ceremony"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 3 - Top Right (partially cut) - Campus Architecture */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '193px', height: '193px', top: '-50px', left: '1284px', borderRadius: '16px' }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/campus/aerial-view.webp"
                  alt="Campus building"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 4 - Middle Right - Lab Work */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '215px', height: '215px', top: '302px', left: '1154px', borderRadius: '16px' }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/JAgran%20of%20Social%20science/DSC08858.JPG"
                  alt="Students in lab"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 5 - Middle Left - Cultural Event */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '267px', height: '325px', top: '308px', left: '0px', borderRadius: '16px' }}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Lehar/IMG_9060.JPG"
                  alt="Cultural performance"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 6 - Bottom Left (partially cut) - Sports */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '212px', height: '175px', top: '750px', left: '-56px', borderRadius: '16px' }}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Anti%20Ragging%20WEEK/IMG_3582.JPG"
                  alt="Sports activity"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 7 - Bottom Center Left - Library */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '214px', height: '325px', top: '675px', left: '319px', borderRadius: '16px' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Mental%20Health%20week/IMG_7813.JPG"
                  alt="Library"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 8 - Bottom Center - Campus Garden */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '399px', height: '210px', top: '790px', left: '627px', borderRadius: '16px' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/JLu%20events/photos/Convocation/DSC_1020.JPG"
                  alt="Campus grounds"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            {/* Card 9 - Bottom Right - Student Life */}
            <motion.div
              className="absolute overflow-hidden cursor-pointer group"
              style={{ width: '286px', height: '343px', top: '601px', left: '1154px', borderRadius: '16px' }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="https://jlu-website-media.s3.ap-south-1.amazonaws.com/website-content/jlu%20ignited%20mind%20Award/photos/AMF_1426.JPG"
                  alt="Students socializing"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Center Content - Desktop */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            <motion.h2
              className="font-bold text-[#21313c] mb-4"
              style={{ fontSize: 'clamp(1.25rem, 3.5vw, 3rem)' }}
              initial={{ opacity: 0, scale: 1.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              Campus Gallery:{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                A Living
              </span>
              <br />
              Learning Environment
            </motion.h2>
            <motion.p
              className="text-[#666] mb-6 max-w-md"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.25rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              Experience the vibrant life, learning, and celebrations at JLU campus.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Media resources Section */}
      <div id="media-kit" />
      <div id="announcements" className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto flex flex-col lg:flex-row justify-between gap-10 md:gap-12 lg:gap-16 px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
        {/* Left Side - Media Resources */}
        <motion.div
          className="flex-1 w-full lg:max-w-125"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <span
            className="text-[#999] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
            style={{ letterSpacing: '0.2em' }}
          >
            Downloads
          </span>
          <h2
            className="text-[#21313c] mb-4"
            style={{
              fontSize: 'clamp(2.25rem, 4vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            Media{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              resources
            </span>
          </h2>
          <p className="text-[#666] mb-8 md:mb-12 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
            Official resources and assets for journalists, institutional partners, and media outlets covering university activities.
          </p>

          {/* Download Items */}
          <motion.div
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Item 1 - University Logo Pack */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-4 md:gap-6 py-4 md:py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">University Logo Pack</h3>
                <p className="text-xs md:text-sm text-[#999]">PNG, SVG, EPS (45MB)</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">→</span>
            </motion.a>

            {/* Item 2 - Brand Guidelines */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-4 md:gap-6 py-4 md:py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">Brand Guidelines</h3>
                <p className="text-xs md:text-sm text-[#999]">PDF (12MB)</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">→</span>
            </motion.a>

            {/* Item 3 - Leadership Photos */}
            <motion.a
              href="#"
              variants={staggerItem}
              className="flex items-center gap-4 md:gap-6 py-4 md:py-6 border-b border-[#21313c]/10 group cursor-pointer hover:border-[#21313c]/30 transition-colors"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border-2 border-[#21313c] flex items-center justify-center group-hover:bg-[#21313c] group-hover:text-white transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#21313c] group-hover:text-[#f0c14b] transition-colors">Leadership Photos</h3>
                <p className="text-xs md:text-sm text-[#999]">High-Res Gallery</p>
              </div>
              <span className="text-[#21313c] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">→</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side - Press Inquiries Card */}
        <motion.div
          className="bg-[#21313c] flex flex-col justify-center w-full lg:w-120 p-6 md:p-10 lg:p-12 rounded-2xl"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          viewport={{ once: true }}
        >
          <span
            className="text-[#f0c14b] uppercase tracking-widest block mb-4 md:mb-6 text-xl md:text-2xl font-bold"
            style={{ letterSpacing: '0.2em' }}
          >
            Press Inquiries
          </span>
          <h3
            className="text-white mb-4 text-xl md:text-2xl lg:text-3xl font-bold"
            style={{
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Get in touch with our{' '}
            <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
              communications
            </span>{' '}
            team
          </h3>
          <p className="text-white/70 mb-8 md:mb-10 text-sm md:text-base" style={{ lineHeight: 1.8 }}>
            For urgent media requests, interview coordination, or campus filming permissions, please contact our office directly.
          </p>
          <div className="flex flex-col gap-3 md:gap-4">
            <motion.a
              href="https://jlu.edu.in/wp-content/uploads/2024/05/JLU-Media-Kit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 md:py-4 bg-[#f0c14b] text-[#21313c] font-bold rounded-full hover:bg-[#e5b63e] transition-colors text-sm md:text-base text-center block no-underline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Media Kit
            </motion.a>
            <motion.a
              href="https://wa.me/917314041400?text=Hello!%20I%20would%20like%20to%20contact%20the%20Communications%20team%20at%20JLU."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#21313c] transition-colors text-sm md:text-base text-center block no-underline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Communications
            </motion.a>
          </div>
        </motion.div>
        </div>
      </div>
      {/* Archive Modal */}
      <AnimatePresence>
        {archiveEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setArchiveEvent(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: customEase }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={pastEventsImages[pastEventsData.indexOf(archiveEvent)]}
                  alt={archiveEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#f0c14b] px-3 py-1.5 text-xs font-bold text-[#21313c] rounded">
                  {archiveEvent.year}
                </span>
                <button
                  onClick={() => setArchiveEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold">{archiveEvent.title}</h3>
                </div>
              </div>
              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <p className="text-[#666] text-base leading-relaxed mb-6">
                  {archiveEvent.description}
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-[#21313c] font-bold text-sm uppercase tracking-wider mb-4">Event Highlights</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#f6f7f0] rounded-xl p-4">
                      <p className="text-[#21313c] font-bold text-lg">500+</p>
                      <p className="text-[#666] text-xs">Attendees</p>
                    </div>
                    <div className="bg-[#f6f7f0] rounded-xl p-4">
                      <p className="text-[#21313c] font-bold text-lg">20+</p>
                      <p className="text-[#666] text-xs">Speakers & Guests</p>
                    </div>
                    <div className="bg-[#f6f7f0] rounded-xl p-4">
                      <p className="text-[#21313c] font-bold text-lg">3 Days</p>
                      <p className="text-[#666] text-xs">Event Duration</p>
                    </div>
                    <div className="bg-[#f6f7f0] rounded-xl p-4">
                      <p className="text-[#21313c] font-bold text-lg">50+</p>
                      <p className="text-[#666] text-xs">Media Mentions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { NewsAndEvents };
export default NewsAndEvents;
