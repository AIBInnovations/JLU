'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const academicPaths = [
  {
    id: 1,
    title: 'Undergraduate Programs',
    description: 'Build strong foundations for your future.',
  },
  {
    id: 2,
    title: 'Postgraduate Programs',
    description: 'Advance your expertise and leadership.',
  },
  {
    id: 3,
    title: 'Research Degrees',
    description: 'Create knowledge that shapes tomorrow.',
  },
];

const beyondDegrees = [
  {
    id: 1,
    title: 'Centre for Professional Skills',
    description: 'Industry-ready learning beyond classrooms.',
  },
  {
    id: 2,
    title: 'JLUx – Young Leadership Program',
    description: 'Early leadership exposure for future changemakers.',
  },
];

const financialOptions = [
  {
    id: 1,
    title: 'Scholarships',
    description: 'Merit and need-based financial aid.',
  },
  {
    id: 2,
    title: 'Chancellor Freeships',
    description: 'Special support for deserving students.',
  },
  {
    id: 3,
    title: 'Education Loans',
    description: 'Partnered banks and easy documentation.',
  },
  {
    id: 4,
    title: 'Refund Policy',
    description: 'Transparent and student-friendly.',
  },
];

const faqData = [
  {
    id: 1,
    question: 'Who can apply?',
    answer: 'Eligibility varies by program. Generally, undergraduate applicants need high school completion, while postgraduate applicants need a relevant bachelor\'s degree.',
  },
  {
    id: 2,
    question: 'What is the application deadline?',
    answer: 'Application deadlines vary by program and intake. Please check the specific program page for exact dates or contact our admissions office.',
  },
  {
    id: 3,
    question: 'Are scholarships available?',
    answer: 'Yes, JLU offers various scholarships based on merit, need, and special categories. Visit our scholarships page for detailed information.',
  },
  {
    id: 4,
    question: 'Is hostel accommodation guaranteed?',
    answer: 'Hostel accommodation is available on a first-come, first-served basis. We recommend applying early to secure your spot.',
  },
];

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section with Image */}
      <div ref={heroRef} className="relative w-screen m-0 p-0 overflow-hidden">
        {/* Hero Image with reveal animation */}
        <motion.div
          className="relative w-screen h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
              alt="Admissions"
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
            paddingLeft: '40px',
            paddingTop: '120px',
            maxWidth: '800px',
          }}
        >
          <h2
            className="text-white font-semibold leading-tight mb-5"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            YOUR <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#f0c14b', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>journey</span> STARTS HERE
          </h2>
          <p
            className="text-white font-semibold leading-tight"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            Admissions at Jagran Lakecity University are designed to help you choose the right path — with clarity, confidence, and support at every step.
          </p>
        </motion.div>

        {/* Large "Admissions" Text - Bottom Left */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            paddingLeft: '40px',
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
              fontSize: 'clamp(6rem, 14vw, 14rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admissions
          </motion.h1>
        </div>
      </div>

      {/* Choose your academic path Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            marginTop: '80px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Choose your academic path
          </h2>

          {/* Three Academic Path Cards */}
          <div className="flex">
            {academicPaths.map((path, index) => (
              <div
                key={path.id}
                className="flex flex-col bg-white"
                style={{
                  width: '400px',
                  height: '293px',
                  padding: '24px',
                  borderRight: index < 2 ? '1px solid #e5e5e5' : 'none',
                }}
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-[#d9d9d9] rounded-lg mb-8" />
                <h3 className="text-xl font-bold text-[#21313c] mb-3">
                  {path.title}
                </h3>
                <p className="text-sm text-[#21313c] mb-auto">
                  {path.description}
                </p>
                <a href="#" className="inline-flex items-center gap-3 text-[#21313c] font-medium hover:underline">
                  Learn more
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>

          {/* Beyond degrees Section */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
              Beyond degrees
            </h2>

            <div className="flex" style={{ gap: '24px' }}>
              {beyondDegrees.map((item, index) => (
                <div
                  key={item.id}
                  className="flex bg-white overflow-hidden"
                  style={{
                    width: '580px',
                    height: '280px',
                    paddingRight: '24px',
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative shrink-0"
                    style={{ width: '264px', height: '280px' }}
                  >
                    <Image
                      src={index === 0
                        ? "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                        : "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex flex-col justify-center p-6">
                    <h3 className="text-xl font-bold text-[#21313c] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#21313c]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campus Life Section */}
      <div className="w-full bg-white">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Campus Life
          </h2>

          <div className="flex" style={{ gap: '64px' }}>
            {/* Image */}
            <div
              className="relative shrink-0 overflow-hidden rounded-lg"
              style={{ width: '580px', height: '580px' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                alt="Campus Visit"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center" style={{ maxWidth: '500px' }}>
              <h3 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-6">
                Experience JLU before you decide
              </h3>
              <p className="text-base text-[#21313c] leading-relaxed mb-8">
                Walk through our campus, meet faculty, and see student life first-hand. Our advisors are ready to welcome you.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#21313c] rounded-full text-[#21313c] font-medium hover:bg-gray-50 transition-colors w-fit">
                Book a Campus Visit
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Making education accessible Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-4">
              Making education accessible
            </h2>
            <p className="text-base text-[#21313c]">
              Transparent pathways to funding your future.
            </p>
          </div>

          {/* Four Financial Options Cards */}
          <div className="flex justify-center">
            {financialOptions.map((option, index) => (
              <div
                key={option.id}
                className="flex flex-col bg-white"
                style={{
                  width: '300px',
                  height: '210px',
                  padding: '24px',
                  borderRight: index < 3 ? '1px solid #e5e5e5' : 'none',
                }}
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-[#e5e5e5] rounded-lg mb-6" />
                <h3 className="text-lg font-bold text-[#21313c] mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-[#21313c]">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission FAQs Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1440px',
            paddingTop: '80px',
            paddingRight: '120px',
            paddingBottom: '80px',
            paddingLeft: '120px',
          }}
        >
          <h2
            className="font-bold text-[#21313c] mb-12 text-center"
            style={{
              fontSize: '48px',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            Admission FAQs
          </h2>

          <div
            className="flex flex-col mx-auto"
            style={{ maxWidth: '1200px', gap: '44px' }}
          >
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-gray-300"
                style={{
                  minHeight: openFaq === faq.id ? '187px' : '107px',
                  paddingTop: '24px',
                  paddingRight: '24px',
                  paddingLeft: '24px',
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span
                    className="text-[#21313c]"
                    style={{
                      fontWeight: 500,
                      fontSize: '28px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                    }}
                  >
                    {faq.question}
                  </span>
                  <span className="text-2xl text-[#21313c]">
                    {openFaq === faq.id ? '∧' : '∨'}
                  </span>
                </button>
                {openFaq === faq.id && (
                  <div className="pb-6 mt-6">
                    <p
                      className="text-[#21313c]"
                      style={{
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '28px',
                        letterSpacing: '0%',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your future deserves Section */}
      <div className="w-full bg-[#d9d9d9]">
        <div
          className="mx-auto flex flex-col items-center justify-center"
          style={{
            maxWidth: '1440px',
            height: '396px',
            paddingTop: '80px',
            paddingBottom: '80px',
            gap: '44px',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] text-center">
            Your future deserves<br />the right start.
          </h2>

          <div className="flex items-center gap-6">
            <button className="px-10 py-4 bg-white rounded-full text-[#21313c] font-medium hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
            <button className="px-10 py-4 bg-transparent border border-[#21313c] rounded-full text-[#21313c] font-medium hover:bg-white/20 transition-colors">
              Talk to an Admissions Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Admissions };
export default Admissions;
