'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const academicPaths = [
  {
    id: 1,
    title: 'Undergraduate Programs',
    description: 'Build strong foundations for your future with industry-aligned curriculum.',
  },
  {
    id: 2,
    title: 'Postgraduate Programs',
    description: 'Advance your expertise and take the lead in your chosen field.',
  },
  {
    id: 3,
    title: 'Research Degrees',
    description: 'Create knowledge that shapes tomorrow through cutting-edge research.',
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
    modalContent: {
      heading: 'Scholarships at JLU',
      intro: 'JLU offers a wide range of scholarships to support meritorious and deserving students in their academic journey.',
      sections: [
        {
          title: 'Merit-Based Scholarships',
          points: [
            'Up to 100% tuition fee waiver for academic toppers',
            'Based on performance in JLU entrance exam or 12th board results',
            'Renewable annually based on academic performance',
          ],
        },
        {
          title: 'Need-Based Scholarships',
          points: [
            'Financial assistance for economically weaker sections',
            'Family income-based eligibility criteria',
            'Covers tuition, hostel, and other academic expenses',
          ],
        },
        {
          title: 'Special Category Scholarships',
          points: [
            'Sports excellence scholarship',
            'Cultural and arts scholarship',
            'Single parent and orphan student support',
          ],
        },
      ],
      cta: 'Apply for Scholarship',
    },
  },
  {
    id: 2,
    title: 'Chancellor Freeships',
    description: 'Special support for deserving students.',
    modalContent: {
      heading: 'Chancellor Freeships',
      intro: 'The Chancellor Freeship is a prestigious award given to exceptional students who demonstrate outstanding potential but face financial constraints.',
      sections: [
        {
          title: 'Eligibility Criteria',
          points: [
            'Annual family income below ₹3 lakhs',
            'Minimum 75% in qualifying examination',
            'Strong recommendation from school principal',
          ],
        },
        {
          title: 'Benefits',
          points: [
            '100% tuition fee waiver for the entire program',
            'Free hostel accommodation',
            'Monthly stipend for personal expenses',
            'Free access to all academic resources and facilities',
          ],
        },
        {
          title: 'Application Process',
          points: [
            'Submit application along with income certificate',
            'Appear for personal interview with selection committee',
            'Final selection based on merit-cum-means basis',
          ],
        },
      ],
      cta: 'Apply for Freeship',
    },
  },
  {
    id: 3,
    title: 'Education Loans',
    description: 'Partnered banks and easy documentation.',
    modalContent: {
      heading: 'Education Loan Assistance',
      intro: 'JLU has partnered with leading banks and financial institutions to help students secure education loans with minimal hassle.',
      sections: [
        {
          title: 'Partner Banks',
          points: [
            'State Bank of India (SBI)',
            'HDFC Credila',
            'ICICI Bank',
            'Punjab National Bank',
            'Bank of Baroda',
          ],
        },
        {
          title: 'Loan Features',
          points: [
            'Loan amount up to ₹20 lakhs without collateral',
            'Competitive interest rates starting from 8.5% p.a.',
            'Moratorium period until course completion + 6 months',
            'Flexible repayment tenure of up to 15 years',
          ],
        },
        {
          title: 'Documentation Support',
          points: [
            'Dedicated loan assistance cell on campus',
            'Help with application form filling',
            'Coordination with bank officials',
            'Fast-track processing for JLU students',
          ],
        },
      ],
      cta: 'Get Loan Assistance',
    },
  },
  {
    id: 4,
    title: 'Refund Policy',
    description: 'Transparent and student-friendly.',
    modalContent: {
      heading: 'Fee Refund Policy',
      intro: 'JLU follows a transparent and student-friendly refund policy in accordance with UGC guidelines.',
      sections: [
        {
          title: 'Refund Timeline',
          points: [
            'Before admission: 100% refund (less processing fee)',
            'Within 15 days of admission: 90% refund',
            'Within 30 days of admission: 80% refund',
            'After 30 days: No refund applicable',
          ],
        },
        {
          title: 'Refund Process',
          points: [
            'Submit written application to Admissions Office',
            'Attach original fee receipts and ID card',
            'Refund processed within 15 working days',
            'Amount credited to original payment source',
          ],
        },
        {
          title: 'Special Cases',
          points: [
            'Medical emergencies: Case-by-case consideration',
            'Visa rejection for international programs: Full refund',
            'Transfer to another JLU program: Fee adjustment',
          ],
        },
      ],
      cta: 'Download Full Policy',
    },
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

// Custom easing
const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Campus Tour Modal Component
interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampusTourModal = ({ isOpen, onClose }: CampusTourModalProps) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    numberOfVisitors: '1',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', numberOfVisitors: '1', message: '' });
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white overflow-hidden shadow-2xl"
            style={{
              ...(isMobile
                ? { inset: 0, borderRadius: 0 }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '480px',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                  }),
            }}
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-100"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              <div>
                <h2 className="text-xl font-semibold text-[#21313c]">Book a Campus Tour</h2>
                <p className="text-sm text-gray-500 mt-1">Experience JLU in person</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>

            {/* Form Content */}
            <motion.div
              className="p-6 overflow-y-auto"
              style={{ height: 'calc(100% - 88px)' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center h-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-[#c3fd7a] rounded-full flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#03463B" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-[#21313c] mb-2">Tour Booked!</h3>
                    <p className="text-gray-500">Your campus tour has been scheduled. We'll send you a confirmation email with all the details shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`flex-1 px-4 py-3 rounded-r-xl border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={getMinDate()}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.preferredDate ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all`}
                      />
                      {errors.preferredDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
                      )}
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Preferred Time Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.preferredTime ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all appearance-none bg-white`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2321313c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
                      )}
                    </div>

                    {/* Number of Visitors */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Number of Visitors
                      </label>
                      <select
                        name="numberOfVisitors"
                        value={formData.numberOfVisitors}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all appearance-none bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2321313c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                        }}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-[#21313c] mb-2">
                        Special Requests <span className="text-gray-400">(Optional)</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all resize-none"
                        placeholder="Any specific areas you'd like to explore?"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#03463B] text-white font-semibold rounded-xl hover:bg-[#025a4a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.span
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Scheduling Tour...
                        </>
                      ) : (
                        <>
                          Schedule Campus Tour
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
                            <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </motion.button>

                    {/* Note */}
                    <p className="text-xs text-gray-400 text-center">
                      Campus tours are available Monday to Saturday. A confirmation will be sent to your email.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Financial Info Modal Component
interface FinancialInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: typeof financialOptions[0] | null;
}

const FinancialInfoModal = ({ isOpen, onClose, data }: FinancialInfoModalProps) => {
  const isMobile = useIsMobile();

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white overflow-hidden shadow-2xl"
            style={{
              ...(isMobile
                ? { inset: 0, borderRadius: 0 }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '520px',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                  }),
            }}
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f6f7f0]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              <div>
                <span className="text-[#f0c14b] font-bold text-3xl block mb-1">
                  {String(data.id).padStart(2, '0')}
                </span>
                <h2 className="text-xl font-semibold text-[#21313c]">{data.modalContent.heading}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/80 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>

            {/* Content */}
            <motion.div
              className="p-6 overflow-y-auto"
              style={{ height: 'calc(100% - 120px)' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Intro */}
              <p className="text-[#666] text-base leading-relaxed mb-8">
                {data.modalContent.intro}
              </p>

              {/* Sections */}
              <div className="space-y-6">
                {data.modalContent.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="text-[#21313c] font-semibold text-lg mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#f0c14b] rounded-full flex items-center justify-center text-xs font-bold text-[#21313c]">
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <ul className="space-y-2 pl-8">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-[#666] text-sm leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#03463B] rounded-full mt-2 shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full mt-8 py-4 bg-[#21313c] text-white font-semibold rounded-xl hover:bg-[#2a3f4c] transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {data.modalContent.cta}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
                  <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedFinancialOption, setSelectedFinancialOption] = useState<typeof financialOptions[0] | null>(null);
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
          transition={{ duration: 2, ease: customEase }}
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
          className="absolute top-0 left-0 px-5 pt-24 md:px-0 md:pt-0"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 40px)',
            paddingTop: 'clamp(100px, 15vw, 120px)',
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

          {/* Apply Now Button */}
          <motion.a
            href="/apply"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-[#21313c] text-white font-semibold rounded-full shadow-lg hover:bg-[#2a3f4c] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Large "Admissions" Text - Bottom Left */}
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
              fontSize: 'clamp(5rem, 14vw, 14rem)',
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

      {/* Academic Programs - Full Width Scattered Gallery Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto relative px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Academic Programs
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Choose your{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                academic path
              </span>
            </h2>
          </motion.div>

          {/* Three Cards with Floating Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {academicPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`group cursor-pointer ${index === 1 ? 'lg:mt-15' : index === 2 ? 'lg:mt-7.5' : ''}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden mb-6 md:mb-8 h-70 md:h-80 lg:h-95">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={
                        index === 0
                          ? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                          : index === 1
                          ? "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80"
                          : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
                      }
                      alt={path.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  {/* Number overlay */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: '72px', lineHeight: 1, opacity: 0.3 }}
                    >
                      {String(path.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-[#21313c] font-semibold mb-3 group-hover:text-[#f0c14b] transition-colors"
                  style={{ fontSize: '24px', letterSpacing: '-0.02em' }}
                >
                  {path.title}
                </h3>
                <p className="text-[#666] mb-4" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  {path.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[#21313c] font-medium text-sm">
                  Explore Programs
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Beyond Degrees - Horizontal Split Layout */}
      <div className="w-full bg-[#21313c]">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Special Programs
            </span>
            <h2
              className="text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Beyond{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                degrees
              </span>
            </h2>
          </motion.div>

          {/* Horizontal Cards - Full Width Alternating */}
          <div className="flex flex-col" style={{ gap: '2px' }}>
            {beyondDegrees.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex group cursor-pointer ${index === 1 ? 'flex-row-reverse' : ''}`}
                style={{ height: '400px' }}
              >
                {/* Image Half */}
                <div className="relative w-1/2 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={index === 0
                        ? "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                        : "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Content Half */}
                <div className="w-1/2 bg-[#2a3f4c] flex flex-col justify-center p-4 md:p-8 lg:p-16">
                  <span
                    className="text-[#f0c14b] font-medium mb-2 md:mb-4 text-xs md:text-sm"
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-white font-semibold mb-2 md:mb-4 text-base md:text-xl lg:text-[32px]"
                    style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#999] mb-4 md:mb-8 text-xs md:text-sm lg:text-base" style={{ lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 md:gap-2 text-white font-medium text-xs md:text-sm">
                    Learn More
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Life Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-0"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Experience
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Experience the{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Campus
                </span>
              </h2>
            </div>
            <p
              className="text-[#666]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
              }}
            >
              Step inside the campus. Get a sense of what it's like to belong.
            </p>
          </motion.div>

          {/* Main Content - Image Left, Content Right */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20">
            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative shrink-0 overflow-hidden group cursor-pointer w-full lg:w-145 h-72 md:h-96 lg:h-145"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                  alt="Campus Visit"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-white/60 uppercase tracking-wider block mb-2" style={{ fontSize: '11px' }}>
                  Virtual Tour Available
                </span>
                <h3 className="text-white font-semibold" style={{ fontSize: '24px' }}>
                  Experience JLU Before You Decide
                </h3>
              </div>
            </motion.div>

            {/* Right Side - Content + Two Small Images */}
            <div className="flex flex-col justify-between flex-1">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-[#21313c] mb-6"
                  style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  More than academics,<br />
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    a complete experience
                  </span>
                </h3>
                <p
                  className="text-[#666] mb-8"
                  style={{ fontSize: '16px', lineHeight: 1.8 }}
                >
                  Our advisors are ready to welcome you. Book a campus visit and explore what makes JLU special.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setIsTourModalOpen(true)}
                    className="px-8 py-4 bg-[#21313c] text-white font-medium flex items-center justify-center gap-3"
                    style={{ borderRadius: '100px' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a Campus Visit
                    <span>→</span>
                  </motion.button>
                  <Link href="/apply">
                    <motion.button
                      className="px-8 py-4 bg-[#f0c14b] text-[#21313c] font-medium flex items-center justify-center gap-3 w-full"
                      style={{ borderRadius: '100px' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Online Application
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round"/>
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Two Small Images */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group cursor-pointer flex-1 h-40 md:h-48 lg:h-50"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                      alt="Student Life"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-semibold" style={{ fontSize: '16px' }}>
                      Student Clubs
                    </h4>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group cursor-pointer flex-1 h-40 md:h-48 lg:h-50"
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
                      alt="Hostel"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-semibold" style={{ fontSize: '16px' }}>
                      Accommodation
                    </h4>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Support - Vertical Accordion Style */}
      <div className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-0"
          >
            <div>
              <span
                className="text-[#999] uppercase tracking-widest block mb-6"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Financial Support
              </span>
              <h2
                className="text-[#21313c]"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Making education{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  accessible
                </span>
              </h2>
            </div>
            <p
              className="text-[#666]"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                maxWidth: '400px',
              }}
            >
              Transparent pathways to funding your future.
            </p>
          </motion.div>

          {/* Four Cards in Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {financialOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer bg-[#f6f7f0] p-8 hover:bg-[#21313c] transition-colors duration-300"
                style={{ minHeight: '280px' }}
                onClick={() => setSelectedFinancialOption(option)}
              >
                <span
                  className="text-[#f0c14b] font-bold block mb-6"
                  style={{ fontSize: '48px', lineHeight: 1 }}
                >
                  {String(option.id).padStart(2, '0')}
                </span>
                <h4
                  className="text-[#21313c] group-hover:text-white font-semibold mb-3 transition-colors"
                  style={{ fontSize: '22px', letterSpacing: '-0.02em' }}
                >
                  {option.title}
                </h4>
                <p
                  className="text-[#666] group-hover:text-[#999] transition-colors"
                  style={{ fontSize: '15px', lineHeight: 1.7 }}
                >
                  {option.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[#21313c] group-hover:text-white font-medium text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <span>→</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission FAQs Section */}
      <div className="w-full bg-[#f6f7f0]">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{
            maxWidth: '1440px',
          }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Questions & Answers
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Admission{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                FAQs
              </span>
            </h2>
          </motion.div>

          <div
            className="flex flex-col mx-auto"
            style={{ maxWidth: '1000px', gap: '0' }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="border-b border-[#d1d1d1]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  className="w-full cursor-pointer py-5 md:py-6 lg:py-8 text-left group"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3 md:gap-4 lg:gap-6">
                      <span
                        className={`font-medium transition-colors ${
                          openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#ccc]'
                        }`}
                        style={{ fontSize: '14px', minWidth: '30px' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-semibold transition-colors text-base md:text-lg lg:text-[22px] ${
                          openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#21313c]'
                        }`}
                        style={{
                          lineHeight: '1.3',
                        }}
                      >
                        {faq.question}
                      </span>
                    </span>
                    <motion.div
                      className={`w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 ml-2 md:ml-3 lg:ml-4 transition-colors ${
                        openFaq === faq.id ? 'bg-[#f0c14b]' : 'bg-[#21313c]'
                      }`}
                      animate={{
                        rotate: openFaq === faq.id ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1V13M1 7H13"
                          stroke={openFaq === faq.id ? '#21313c' : 'white'}
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: customEase }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-[#666] pt-4 md:pt-5 lg:pt-6 pl-0 md:pl-8 lg:pl-12 leading-relaxed text-sm md:text-base"
                          style={{
                            lineHeight: '1.8',
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-3 pb-8 md:px-6 md:pb-14 lg:px-10 lg:pb-20">
        <div
          className="mx-auto flex flex-col items-center justify-center bg-[#f0c14b] px-4 py-8 md:px-10 md:py-16 lg:px-30 lg:py-30 rounded-xl md:rounded-3xl lg:rounded-4xl"
          style={{
            maxWidth: '1400px',
          }}
        >
          <motion.div
            className="text-center mb-6 md:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="text-[#21313c]/60 uppercase tracking-widest block mb-3 md:mb-5 lg:mb-6 text-[9px] md:text-[11px] lg:text-[12px]"
              style={{ letterSpacing: '0.2em' }}
            >
              Start Your Journey
            </span>
            <h2
              className="text-[#21313c]"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Your future deserves<br />
              <span
                className="text-[#21313c]"
                style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}
              >
                the right start.
              </span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href="/apply"
              className="px-8 md:px-10 py-3 md:py-4 bg-[#21313c] text-white font-semibold flex items-center justify-center gap-3 w-full sm:w-auto rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <span>→</span>
            </motion.a>
            <motion.button
              className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-[#21313c]/50 text-[#21313c] font-medium w-full sm:w-auto rounded-full text-center"
              whileHover={{ scale: 1.05, borderColor: '#21313c' }}
              whileTap={{ scale: 0.98 }}
            >
              Talk to an Admissions Advisor
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Campus Tour Modal */}
      <CampusTourModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />

      {/* Financial Info Modal */}
      <FinancialInfoModal
        isOpen={selectedFinancialOption !== null}
        onClose={() => setSelectedFinancialOption(null)}
        data={selectedFinancialOption}
      />
    </section>
  );
};

export { Admissions };
export default Admissions;
