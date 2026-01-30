'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative w-screen bg-[#d9d9d9] overflow-hidden m-0 p-0"
        style={{ minHeight: '100vh' }}
      >
        {/* Content */}
        <div
          className="absolute"
          style={{
            top: '180px',
            left: '120px',
            maxWidth: '450px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#21313c] mb-6 leading-tight">
              Your journey<br />starts here.
            </h1>
            <p className="text-base text-[#21313c] leading-relaxed mb-8">
              Admissions at Jagran Lakecity University are designed to help you choose the right path — with clarity, confidence, and support at every step.
            </p>
            <div className="flex items-center gap-6">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[#21313c] font-medium hover:bg-gray-100 transition-colors">
                Apply
                <span>→</span>
              </button>
              <a href="#" className="text-[#21313c] font-medium hover:underline">
                Explore programs
              </a>
            </div>
          </motion.div>
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
              {beyondDegrees.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white"
                  style={{
                    width: '580px',
                    height: '280px',
                    paddingRight: '24px',
                  }}
                >
                  {/* Grey image placeholder */}
                  <div
                    className="bg-[#d9d9d9] shrink-0"
                    style={{ width: '264px', height: '280px' }}
                  />
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
            {/* Image Placeholder */}
            <div
              className="bg-[#e8e8e8] shrink-0"
              style={{ width: '580px', height: '580px' }}
            />

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
