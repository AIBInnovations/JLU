'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { courseFees, searchCourses } from '../data/courseFees';
import { admissionSteps, requiredDocuments } from '../data/admissionProcedure';
import { allScholarships, scholarshipApplicationProcess } from '../data/scholarships';
import { hostelFees, commonFacilities, messFees } from '../data/accommodation';
import { ugcRefundPolicy, feeCategories, refundProcess, importantConditions } from '../data/refundPolicy';

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
    modalContent: {
      heading: 'Centre for Professional Skills',
      intro: 'The Centre for Professional Skills (CPS) at JLU bridges the gap between academic knowledge and industry demands. Through hands-on training, certifications, and real-world projects, students develop the competencies that top employers actively seek.',
      sections: [
        {
          title: 'Professional Certifications',
          points: [
            'Industry-recognized certifications from Google, AWS, Microsoft, and Salesforce',
            'Domain-specific certifications in Data Analytics, Cloud Computing, and Digital Marketing',
            'Soft skills certification in Business Communication, Leadership, and Negotiation',
            'Certification programs co-designed with hiring partners',
          ],
        },
        {
          title: 'Skill Development Tracks',
          points: [
            'Technical Skills: Coding bootcamps, UI/UX design, DevOps fundamentals',
            'Business Skills: Financial modeling, market research, business strategy',
            'Communication: Public speaking, corporate presentation, professional writing',
            'Entrepreneurship: Startup incubation, pitch deck preparation, funding strategies',
          ],
        },
        {
          title: 'Industry Partnerships',
          points: [
            'Collaborative training with 50+ corporate partners',
            'Live projects and internships embedded into the curriculum',
            'Guest lectures and masterclasses by industry leaders',
            'Campus-to-corporate transition workshops',
          ],
        },
        {
          title: 'Program Outcomes',
          points: [
            '90%+ students receive at least one professional certification before graduation',
            'Dedicated career counseling and placement preparation',
            'Portfolio-ready projects for every student',
            'Access to exclusive job fairs and hiring drives',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: 'JLUx – Young Leadership Program',
    description: 'Early leadership exposure for future changemakers.',
    modalContent: {
      heading: 'JLUx – Young Leadership Program',
      intro: 'JLUx is JLU\'s signature early-leadership initiative designed for students in classes 11 and 12. It offers young minds a head start in developing critical thinking, public speaking, and leadership capabilities through immersive campus experiences.',
      sections: [
        {
          title: 'Program Structure',
          points: [
            'Weekend and holiday immersive sessions on JLU campus',
            'Semester-long engagement with structured milestones',
            'Blend of workshops, simulations, and mentoring circles',
            'Capstone leadership project presented to a panel of industry experts',
          ],
        },
        {
          title: 'Leadership Tracks',
          points: [
            'Public Policy & Governance: Model UN, debate, and policy drafting',
            'Innovation & Technology: Design thinking, prototyping, and hackathons',
            'Social Impact: Community projects, sustainability challenges, and NGO collaboration',
            'Business & Entrepreneurship: Startup simulations, branding, and market analysis',
          ],
        },
        {
          title: 'Mentorship & Exposure',
          points: [
            'One-on-one mentorship from JLU faculty and alumni leaders',
            'Interaction with CEOs, policymakers, and thought leaders',
            'Campus immersion experience — labs, libraries, sports, and cultural events',
            'Participation in national-level inter-school competitions hosted by JLU',
          ],
        },
        {
          title: 'Benefits & Recognition',
          points: [
            'Certificate of completion recognized during JLU admissions',
            'Scholarship consideration for top-performing JLUx graduates',
            'Priority access to JLU entrance tests and personal interviews',
            'Lifetime membership in the JLUx Alumni Network',
          ],
        },
      ],
    },
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
      ctaHref: '/scholarship',
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
      ctaHref: '/freeship',
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
      ctaHref: '/loan-assistance',
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
      ctaHref: '/broucher/Fee-Structure2025.pdf',
      isDownload: true,
    },
  },
];

const faqData = [
  {
    id: 1,
    question: 'Who can apply to JLU?',
    answer: 'Eligibility varies by program. Generally, undergraduate applicants need 10+2 completion from a recognized board, while postgraduate applicants need a relevant bachelor\'s degree with minimum required percentage. Specific program requirements are available on individual course pages.',
  },
  {
    id: 2,
    question: 'What is the application deadline?',
    answer: 'Application deadlines vary by program and intake. JLU typically has rolling admissions for most programs. However, we recommend applying early to secure your preferred course and hostel accommodation.',
  },
  {
    id: 3,
    question: 'How do I apply for admission?',
    answer: 'The application process involves: (1) Email your documents to admissions@jlu.edu.in, (2) Fill the online application form, (3) Validate your email, (4) Pay application fee, (5) Upload required documents, (6) Appear for entrance test/interview if applicable, and (7) Complete fee payment upon selection.',
  },
  {
    id: 4,
    question: 'What is the application fee?',
    answer: 'The application fee is ₹1,000, which is non-refundable. This covers the cost of processing your application, entrance test (if applicable), and administrative charges.',
  },
  {
    id: 5,
    question: 'Is there an entrance exam?',
    answer: 'JLUET (JLU Entrance Test) is conducted for certain programs. Some programs also require a personal interview. The specific requirement depends on the course you\'re applying for. Merit-based admissions are also available for certain programs based on 10+2 or graduation marks.',
  },
  {
    id: 6,
    question: 'What documents are required for admission?',
    answer: 'Required documents include: 10th and 12th marksheets, graduation/PG marksheets (for PG/PhD programs), passport-size photograph, Aadhar card, digital signature, category certificate (if applicable), and sports certificates (for sports quota).',
  },
  {
    id: 7,
    question: 'Are scholarships available?',
    answer: 'Yes, JLU offers multiple scholarship categories: Merit-based scholarships (up to 100% tuition waiver), Sports scholarships (based on national/state level achievements), and Need-based scholarships (for students from economically weaker sections). Detailed criteria are available in the scholarships section.',
  },
  {
    id: 8,
    question: 'How do I apply for a sports scholarship?',
    answer: 'Sports scholarships are awarded based on your achievement level in recognized competitions. Submit your sports certificates during admission. International level participants can receive 100% tuition waiver plus stipend, while state-level participants get 15-50% waiver depending on medal/participation.',
  },
  {
    id: 9,
    question: 'What is the fee structure?',
    answer: 'Fee structure varies by program and includes admission charges, caution money (refundable), alumni fund, resource fee, tuition fees, and examination fees. Annual fees range from ₹75,000 to ₹2,50,000 depending on the program. Complete fee details are available in the Courses & Fee Structure section.',
  },
  {
    id: 10,
    question: 'Can I pay fees in installments?',
    answer: 'Yes, fee payment in installments is available. Students need to pay seat booking amount first to confirm admission, followed by remaining fee before session commencement. Contact the accounts department for specific installment plans.',
  },
  {
    id: 11,
    question: 'Is hostel accommodation available?',
    answer: 'Yes, separate hostel facilities are available for boys and girls with various room options: AC single, AC double, non-AC triple, and non-AC quad rooms. Annual hostel fees range from ₹60,000 to ₹1,20,000 depending on room type, plus ₹10,000 refundable security deposit.',
  },
  {
    id: 12,
    question: 'Is hostel accommodation mandatory?',
    answer: 'Hostel accommodation is not mandatory. Students can opt for day scholar status if they have local accommodation arrangements. However, outstation students are encouraged to stay in hostel for better academic and campus life experience.',
  },
  {
    id: 13,
    question: 'What facilities are available in hostels?',
    answer: 'Hostels provide 24x7 WiFi, power backup, RO water, mess facility, laundry service, gym, study rooms, medical facility, CCTV surveillance, and biometric security. AC rooms have attached bathrooms, while non-AC rooms have common facilities.',
  },
  {
    id: 14,
    question: 'What is the mess fee?',
    answer: 'Annual mess fee is ₹50,000 (₹4,500 per month), which covers breakfast, lunch, evening snacks, and dinner. Both vegetarian and non-vegetarian options are available. Special meals are served during festivals and occasions.',
  },
  {
    id: 15,
    question: 'What is the refund policy?',
    answer: 'JLU follows UGC refund guidelines: 100% refund before class commencement (minus ₹1,000 processing fee), 90% within 15 days, 80% within 16-30 days, 50% within 31-45 days, and no refund after 45 days from commencement date.',
  },
  {
    id: 16,
    question: 'Which fees are non-refundable?',
    answer: 'Application fee (₹1,000) and admission charges are completely non-refundable. Caution money and hostel security deposit are fully refundable upon course completion or withdrawal (subject to no damage). Other fees follow UGC refund policy.',
  },
  {
    id: 17,
    question: 'How long does the refund process take?',
    answer: 'Refund processing takes approximately 30 working days after approval from competent authority. You need to submit a written request with original receipts and obtain No Dues Certificate from all departments.',
  },
  {
    id: 18,
    question: 'Can I transfer my admission to another program?',
    answer: 'Yes, internal transfer to another JLU program is possible subject to eligibility and seat availability. Fee adjustment will be made accordingly. Submit your transfer request to the admissions office along with the reason for transfer.',
  },
  {
    id: 19,
    question: 'Is education loan assistance available?',
    answer: 'Yes, JLU has partnerships with major banks including SBI, HDFC Credila, ICICI, PNB, and Bank of Baroda. Loans up to ₹20 lakhs available without collateral, with competitive interest rates and flexible repayment options. Our loan assistance cell helps with the entire process.',
  },
  {
    id: 20,
    question: 'What is the seat booking amount?',
    answer: 'Seat booking amount varies by program and is adjustable against the total annual fee. This amount must be paid after selection to confirm your seat reservation. It is refundable as per UGC guidelines if you withdraw within the stipulated timeline.',
  },
  {
    id: 21,
    question: 'Can international students apply?',
    answer: 'Yes, JLU welcomes international students. Additional requirements include valid passport, student visa, and equivalence certificate for foreign qualifications. International students should contact the international admissions office for specific guidance.',
  },
  {
    id: 22,
    question: 'Is there a campus tour facility?',
    answer: 'Yes, campus tours are available Monday to Saturday. You can book a campus tour through our website or contact the admissions office. Virtual tours are also available for outstation and international students.',
  },
  {
    id: 23,
    question: 'What is the medium of instruction?',
    answer: 'English is the primary medium of instruction for all programs at JLU. This ensures global standards of education and prepares students for international career opportunities.',
  },
  {
    id: 24,
    question: 'How can I track my application status?',
    answer: 'After submitting your application and validating your email, you will receive login credentials for your personal application dashboard. You can track your application status, upload documents, and access all further instructions through this dashboard.',
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

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
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white shadow-2xl flex flex-col"
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0"
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
              className="p-6 overflow-y-auto flex-1 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

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
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white shadow-2xl flex flex-col"
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#f6f7f0] shrink-0"
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
              className="p-6 overflow-y-auto flex-1 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
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
              {data.modalContent.isDownload ? (
                <motion.a
                  href={data.modalContent.ctaHref}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-8 py-4 bg-[#21313c] text-white font-semibold rounded-xl hover:bg-[#2a3f4c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                  </svg>
                  {data.modalContent.cta}
                </motion.a>
              ) : (
                <Link href={data.modalContent.ctaHref || '#'}>
                  <motion.div
                    className="w-full mt-8 py-4 bg-[#21313c] text-white font-semibold rounded-xl hover:bg-[#2a3f4c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Beyond Degree Modal Component
interface BeyondDegreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: typeof beyondDegrees[0] | null;
}

const BeyondDegreeModal = ({ isOpen, onClose, data }: BeyondDegreeModalProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!data) return null;

  const accentColor = data.id === 1 ? '#03463B' : '#f0c14b';
  const accentBg = data.id === 1 ? '#03463B' : '#f0c14b';
  const accentText = data.id === 1 ? '#fff' : '#21313c';

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
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed z-[9999] bg-white shadow-2xl flex flex-col"
            style={{
              ...(isMobile
                ? { inset: 0, borderRadius: 0 }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '560px',
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                  }),
            }}
            onWheel={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {/* Header with accent gradient */}
            <motion.div
              className="relative p-6 pb-8 overflow-hidden shrink-0"
              style={{ background: `linear-gradient(135deg, #21313c 0%, ${data.id === 1 ? '#03463B' : '#2a3f4c'} 100%)` }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{ background: accentColor }} />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10" style={{ background: accentColor }} />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-3xl font-bold block mb-2" style={{ color: accentColor }}>
                    {String(data.id).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-semibold text-white">{data.modalContent.heading}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="p-6 overflow-y-auto flex-1 min-h-0"
              style={{ overscrollBehavior: 'contain' }}
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
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: accentBg, color: accentText }}
                      >
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    <ul className="space-y-2 pl-8">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-[#666] text-sm leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accentColor }}></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href={data.id === 1 ? '/certifications' : '/jlux'}
                className="w-full mt-8 py-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 no-underline"
                style={{ backgroundColor: accentBg, color: accentText }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {data.id === 1 ? 'Explore Certifications' : 'Apply for JLUx'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round"/>
                  <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const admissionTabs = [
  { id: 'fees', label: 'Courses & Fee Structure' },
  { id: 'procedure', label: 'Admission Procedure' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'refund', label: 'Refund Policy' },
  { id: 'accommodation', label: 'On Campus Accommodation' },
  { id: 'faqs', label: "Admission FAQ's" },
];

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedFinancialOption, setSelectedFinancialOption] = useState<typeof financialOptions[0] | null>(null);
  const [activeTab, setActiveTab] = useState('fees');
  const [feeSearch, setFeeSearch] = useState('');
  const [selectedBeyondDegree, setSelectedBeyondDegree] = useState<typeof beyondDegrees[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const tabContentRef = useRef<HTMLDivElement>(null);
  const tabSectionRef = useRef<HTMLDivElement>(null);
  const procedureRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabContentRef.current) {
      tabContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Scroll the page to the tabbed section so it's visible
    if (tabSectionRef.current) {
      tabSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Capture wheel/touchpad events so the tab content scrolls instead of the page
  useEffect(() => {
    const el = tabContentRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight) return; // nothing to scroll

      // Manually scroll the container and block the page from scrolling
      e.preventDefault();
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeTab]);

  // Track scroll progress for the procedure timeline — direct DOM updates for 60fps
  useEffect(() => {
    if (activeTab !== 'procedure') return;
    const scrollEl = tabContentRef.current;
    const timelineEl = procedureRef.current;
    const lineEl = progressLineRef.current;
    if (!scrollEl || !timelineEl || !lineEl) return;

    const trackEl = trackLineRef.current;

    let lineSized = false;
    let raf = 0;
    const update = () => {
      // Size the lines once after layout is ready
      if (!lineSized) {
        const firstStep = stepRefs.current[0];
        const lastStep = stepRefs.current[admissionSteps.length - 1];
        if (firstStep && lastStep && trackEl) {
          const lineTop = firstStep.offsetTop + 16;
          const lineBottom = lastStep.offsetTop + 16;
          const lineHeight = lineBottom - lineTop;
          trackEl.style.top = `${lineTop}px`;
          trackEl.style.height = `${lineHeight}px`;
          lineEl.style.top = `${lineTop}px`;
          lineEl.style.height = `${lineHeight}px`;
          lineSized = true;
        }
      }
      const scrollTop = scrollEl.scrollTop;
      const viewHeight = scrollEl.clientHeight;

      // Use actual first/last step positions for accurate progress
      const firstStepEl = stepRefs.current[0];
      const lastStepEl = stepRefs.current[admissionSteps.length - 1];
      if (!firstStepEl || !lastStepEl) return;

      const stepsStart = timelineEl.offsetTop + firstStepEl.offsetTop;
      const stepsEnd = timelineEl.offsetTop + lastStepEl.offsetTop + lastStepEl.offsetHeight;

      const start = stepsStart - viewHeight * 0.15;
      const end = stepsEnd - viewHeight * 0.75;
      const progress = Math.min(1, Math.max(0, (scrollTop - start) / (end - start)));

      // Update progress line directly
      lineEl.style.transform = `scaleY(${progress})`;

      // Update each step marker + content directly
      const totalSteps = admissionSteps.length;
      stepRefs.current.forEach((stepEl, i) => {
        if (!stepEl) return;
        const threshold = i / totalSteps;
        const active = progress >= threshold;
        const marker = stepEl.querySelector<HTMLElement>('[data-marker]');
        const label = stepEl.querySelector<HTMLElement>('[data-label]');
        const content = stepEl.querySelector<HTMLElement>('[data-content]');

        if (marker) {
          marker.style.background = active ? '#f0c14b' : '#e5e7eb';
          marker.style.transform = active ? 'scale(1)' : 'scale(0.85)';
          marker.style.boxShadow = active ? '0 0 0 4px rgba(240,193,75,0.2)' : 'none';
        }
        if (label) {
          label.style.color = active ? '#21313c' : '#999';
        }
        if (content) {
          content.style.opacity = active ? '1' : '0.4';
          content.style.transform = active ? 'translateY(0)' : 'translateY(4px)';
        }
        const heading = stepEl.querySelector<HTMLElement>('[data-heading]');
        if (heading) {
          heading.style.color = active ? '#21313c' : '#999';
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    // Initial paint
    requestAnimationFrame(update);
    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      scrollEl.removeEventListener('scroll', onScroll);
    };
  }, [activeTab]);

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

      {/* ═══════════════════════════════════════════════════════ */}
      {/* THREE-COLUMN SHOWCASE — Programs / Apply / Fee & Support */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div id="ug-application-process" />
      <div id="eligibility-criteria" />
      <div id="entrance-exams" />
      <div className="w-full bg-white">
        <div className="mx-auto px-5 py-20 md:px-10 md:py-28 lg:px-30 lg:py-36" style={{ maxWidth: '1440px' }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <span className="text-[#999] uppercase tracking-widest block mb-5" style={{ fontSize: '12px', letterSpacing: '0.2em' }}>
              Explore Admissions
            </span>
            <h2
              className="text-[#21313c] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              Your path to{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                JLU
              </span>
            </h2>
            <p className="text-[#666] text-base md:text-lg max-w-2xl" style={{ lineHeight: 1.8 }}>
              Choose your program, apply with ease, and discover the financial support that makes your education possible.
            </p>
          </motion.div>

          {/* Three-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Column 1 — Programs */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: customEase }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden"
              style={{ background: 'linear-gradient(165deg, #21313c 0%, #03463B 100%)', minHeight: '560px' }}
            >
              {/* Decorative element */}
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-[0.06]" style={{ background: '#f0c14b' }} />
              <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full opacity-[0.06]" style={{ background: '#f0c14b' }} />

              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/campus/smart-classroom.jpg"
                  alt="Academic Programs"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#21313c]" />
                <div className="absolute top-5 left-6">
                  <span className="text-[#f0c14b] text-xs uppercase tracking-widest font-medium" style={{ letterSpacing: '0.2em' }}>
                    Programs
                  </span>
                </div>
              </div>

              <div className="relative z-10 px-7 pb-8 -mt-4">
                <h3 className="text-white text-2xl md:text-[28px] font-bold mb-8" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Academic{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    Programs
                  </span>
                </h3>

                <div className="space-y-3">
                  {[
                    { title: 'Undergraduate Degree', desc: 'B.Tech, BBA, BA, B.Com & more', href: '/programs?tab=UG' },
                    { title: 'Postgraduate Degree', desc: 'MBA, M.Tech, MA, M.Sc & more', href: '/programs?tab=PG' },
                    { title: 'Research Degree', desc: 'Ph.D programs across disciplines', href: '/programs?tab=PhD' },
                    { title: 'Centre for Professional Skills', desc: 'Industry-ready certification courses', beyondIdx: 0 },
                    { title: 'JLUx – Young Leadership Program', desc: 'Early leadership for future changemakers', beyondIdx: 1 },
                  ].map((item, i) => {
                    const inner = (
                      <>
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-[#f0c14b]/15 flex items-center justify-center mt-0.5">
                          <span className="text-[#f0c14b] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-[15px] mb-0.5 group-hover/item:text-[#f0c14b] transition-colors">{item.title}</h4>
                          <p className="text-white/40 text-xs">{item.desc}</p>
                        </div>
                        <span className="ml-auto text-white/20 group-hover/item:text-[#f0c14b] group-hover/item:translate-x-1 transition-all text-sm mt-1">&rarr;</span>
                      </>
                    );
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * i, ease: customEase }}
                        viewport={{ once: true }}
                      >
                        {'href' in item && item.href ? (
                          <Link href={item.href} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.07] transition-colors duration-300 cursor-pointer group/item">
                            {inner}
                          </Link>
                        ) : (
                          <div
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.07] transition-colors duration-300 cursor-pointer group/item"
                            onClick={() => 'beyondIdx' in item && item.beyondIdx !== undefined && setSelectedBeyondDegree(beyondDegrees[item.beyondIdx])}
                          >
                            {inner}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Column 2 — Apply */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: customEase }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden border border-[#e5e5e5] flex flex-col"
              style={{ background: '#fff', minHeight: '560px' }}
            >
              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/campus/gallery-3.jpg"
                  alt="Apply to JLU"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                <div className="absolute top-5 left-6">
                  <span className="bg-[#f0c14b] text-[#21313c] text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full" style={{ letterSpacing: '0.15em' }}>
                    Apply
                  </span>
                </div>
              </div>

              <div className="px-7 pb-8 -mt-4 relative z-10 flex flex-col flex-1">
                <h3 className="text-[#21313c] text-2xl md:text-[28px] font-bold mb-8" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Start Your{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    Application
                  </span>
                </h3>

                <div className="space-y-3">
                  {[
                    { title: 'Book Campus Visit', desc: 'Tour our 50+ acre campus in person', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
                    { title: 'Application Process', desc: '12-step guided process with dashboard', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    { title: "Admission FAQ's", desc: '24 frequently asked questions answered', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01' },
                    { title: 'Online Application Form', desc: 'Apply in under 15 minutes', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i + 0.15, ease: customEase }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f6f7f0] transition-colors duration-300 cursor-pointer group/item"
                      onClick={i === 0 ? () => setIsTourModalOpen(true) : undefined}
                    >
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#21313c]/5 flex items-center justify-center group-hover/item:bg-[#21313c] transition-colors duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/item:stroke-white transition-colors duration-300">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#21313c] font-semibold text-[15px] mb-0.5">{item.title}</h4>
                        <p className="text-[#999] text-xs">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Apply CTA — pushed to bottom */}
                <Link href="/apply" className="block mt-auto pt-8">
                  <motion.div
                    className="w-full py-4 bg-[#21313c] text-white font-semibold rounded-xl text-center flex items-center justify-center gap-3 hover:bg-[#2a3f4c] transition-colors cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Apply Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            {/* Column 3 — Fee & Support */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: customEase }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden"
              style={{ background: '#f0c14b', minHeight: '560px' }}
            >
              {/* Image header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/campus/gallery-11.jpg"
                  alt="Fee & Support"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #f0c14b 100%)' }} />
                <div className="absolute top-5 left-6">
                  <span className="bg-[#21313c] text-white text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full" style={{ letterSpacing: '0.15em' }}>
                    Fee & Support
                  </span>
                </div>
              </div>

              <div className="px-7 pb-8 -mt-4 relative z-10">
                <h3 className="text-[#21313c] text-2xl md:text-[28px] font-bold mb-8" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Financial{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    Support
                  </span>
                </h3>

                <div className="space-y-3">
                  {[
                    { idx: 0, title: 'Scholarships', desc: 'Merit & need-based up to 100% waiver' },
                    { idx: 1, title: 'Chancellor Freeships', desc: 'Full support for exceptional students' },
                    { idx: 2, title: 'Education Loan', desc: 'Partner banks, up to 20L without collateral' },
                    { idx: 3, title: 'Refund Policy', desc: 'Transparent UGC-compliant guidelines' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * i + 0.3, ease: customEase }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#21313c]/[0.07] transition-colors duration-300 cursor-pointer group/item"
                      onClick={() => setSelectedFinancialOption(financialOptions[item.idx])}
                    >
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#21313c]/10 flex items-center justify-center">
                        <span className="text-[#21313c] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#21313c] font-semibold text-[15px] mb-0.5">{item.title}</h4>
                        <p className="text-[#21313c]/50 text-xs">{item.desc}</p>
                      </div>
                      <span className="text-[#21313c]/30 group-hover/item:text-[#21313c] group-hover/item:translate-x-1 transition-all text-sm mt-1">&rarr;</span>
                    </motion.div>
                  ))}
                </div>

                {/* Fee Details Link */}
                <div className="mt-8 pt-6 border-t border-[#21313c]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#21313c] font-semibold text-sm">Annual fees from</p>
                      <p className="text-[#21313c] text-2xl font-bold">₹75,000</p>
                    </div>
                    <motion.button
                      className="px-5 py-2.5 bg-[#21313c] text-white font-medium text-sm rounded-full flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTabChange('fees')}
                    >
                      View All Fees
                      <span>&rarr;</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Admissions Info — Tabbed Section */}
      <div id="important-dates" />
      <div id="pg-application-process" />
      <div id="eligibility-requirements" />
      <div ref={tabSectionRef} className="w-full bg-white">
        <div
          className="mx-auto px-5 py-16 md:px-10 md:py-20 lg:px-30 lg:py-35"
          style={{ maxWidth: '1440px' }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-6"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              Everything You Need
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
                Details
              </span>
            </h2>
          </motion.div>

          {/* Tabs + Content Layout */}
          <div className="flex flex-col lg:flex-row gap-0 min-h-[600px]">

            {/* Left Sidebar — Tab Navigation */}
            <div className="lg:w-[320px] shrink-0 bg-[#21313c] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none p-6 lg:p-8 flex flex-col">
              <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {admissionTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`text-left px-5 py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#f0c14b] text-[#21313c]'
                        : 'text-white/70'
                    }`}
                    style={{ fontSize: '15px' }}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Download Button */}
              <div className="hidden lg:block mt-auto pt-8">
                <button className="w-full flex items-center justify-center gap-2 px-5 py-4 border border-[#f0c14b] text-[#f0c14b] rounded-xl font-medium transition-all duration-300 text-sm cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                  </svg>
                  Download Fee Structure
                </button>
              </div>
            </div>

            {/* Right Content Area */}
            <div
              className="flex-1 bg-[#f6f7f0] rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none relative overflow-hidden"
              style={{ height: '720px' }}
            >
              <div
                ref={tabContentRef}
                className="absolute inset-0 overflow-y-auto overscroll-contain p-6 md:p-8 lg:p-10"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#c1c1c1 transparent',
                }}
              >

                {/* ── Courses & Fee Structure ── */}
                {activeTab === 'fees' && (
                  <motion.div
                    key="fees"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3
                      className="text-[#21313c] font-semibold mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                    >
                      Courses & Fee Structure
                    </h3>
                    <p className="text-[#666] text-sm mb-6">
                      Complete fee breakdown for all programs. Search by program name, school, or faculty.
                    </p>

                    {/* Search */}
                    <div className="mb-6">
                      <input
                        type="text"
                        value={feeSearch}
                        onChange={(e) => setFeeSearch(e.target.value)}
                        placeholder="Search programs..."
                        className="w-full px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#03463B] focus:ring-2 focus:ring-[#03463B]/10 transition-all"
                      />
                    </div>

                    {/* Fee Table Header Row */}
                    <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-[#21313c] text-white rounded-t-xl text-xs font-semibold">
                      <div className="col-span-3">Program</div>
                      <div className="col-span-1 text-center">Duration</div>
                      <div className="col-span-2">School</div>
                      <div className="col-span-1 text-right">Admission</div>
                      <div className="col-span-1 text-right">Caution</div>
                      <div className="col-span-1 text-right">Resource</div>
                      <div className="col-span-1 text-right">Tuition</div>
                      <div className="col-span-1 text-right">Exam</div>
                      <div className="col-span-1 text-right font-bold">Total/Yr</div>
                    </div>

                    {/* Fee Table Rows */}
                    <div className="divide-y divide-gray-200 bg-white rounded-b-xl md:rounded-b-xl rounded-xl md:rounded-t-none overflow-hidden">
                      {(feeSearch ? searchCourses(feeSearch) : courseFees).map((program) => (
                        <div key={program.id}>
                          {/* Desktop Row */}
                          <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-xs">
                            <div className="col-span-3 text-[#21313c] font-medium">{program.name}</div>
                            <div className="col-span-1 text-[#666] text-center">{program.duration}</div>
                            <div className="col-span-2 text-[#666] truncate" title={program.school}>{program.school}</div>
                            <div className="col-span-1 text-[#666] text-right">₹{program.admissionCharges.toLocaleString('en-IN')}</div>
                            <div className="col-span-1 text-[#666] text-right">₹{program.cautionMoney.toLocaleString('en-IN')}</div>
                            <div className="col-span-1 text-[#666] text-right">₹{program.resourceFee.toLocaleString('en-IN')}</div>
                            <div className="col-span-1 text-[#666] text-right">₹{program.tuitionFees.toLocaleString('en-IN')}</div>
                            <div className="col-span-1 text-[#666] text-right">₹{program.examFees.toLocaleString('en-IN')}</div>
                            <div className="col-span-1 text-[#21313c] font-bold text-right">₹{program.totalFeesPerYear.toLocaleString('en-IN')}</div>
                          </div>
                          {/* Mobile Card */}
                          <div className="md:hidden p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-[#21313c] font-semibold text-sm">{program.name}</h4>
                              <span className="text-[#21313c] font-bold text-sm">₹{program.totalFeesPerYear.toLocaleString('en-IN')}</span>
                            </div>
                            <p className="text-[#666] text-xs">{program.school} · {program.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* One-time fees note */}
                    <p className="text-[#999] text-xs mt-4 italic">
                      * Admission Charges, Caution Money & Alumni Fund are one-time fees. Caution Money is refundable.
                    </p>
                  </motion.div>
                )}

                {/* ── Admission Procedure ── */}
                {activeTab === 'procedure' && (
                  <motion.div
                    key="procedure"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3
                      className="text-[#21313c] font-semibold mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                    >
                      Admission Procedure
                    </h3>
                    <p className="text-[#666] text-sm mb-10">
                      Follow these steps to complete your admission at JLU.
                    </p>

                    {/* Scroll-driven Timeline
                         Layout: circle=32px, line=2px centered in circle
                         paddingLeft=44px so content clears the circle
                         circle at left:0, center at 16px
                         line at left:15px (16px - 1px half-width) */}
                    <div ref={procedureRef} className="relative" style={{ paddingLeft: '44px' }}>
                      {/* Background track line — height set dynamically by useEffect */}
                      <div ref={trackLineRef} className="absolute w-[2px] bg-gray-200 rounded-full" style={{ left: '15px', height: 0 }} />
                      {/* Filled progress line — height set dynamically by useEffect */}
                      <div
                        ref={progressLineRef}
                        className="absolute w-[2px] bg-[#f0c14b] origin-top rounded-full will-change-transform"
                        style={{ left: '15px', transform: 'scaleY(0)', height: 0 }}
                      />

                      {admissionSteps.map((step, index) => (
                        <div
                          key={step.id}
                          ref={(el) => { stepRefs.current[index] = el; }}
                          className="relative pb-10 last:pb-0"
                        >
                          {/* Circle marker — 32px, left edge at container left:0, center at 16px = line center */}
                          <div
                            data-marker=""
                            className="absolute flex items-center justify-center will-change-transform"
                            style={{
                              left: '-44px',
                              top: '0px',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: '#e5e7eb',
                              transform: 'scale(0.85)',
                              boxShadow: 'none',
                              transition: 'background 0.35s, transform 0.35s, box-shadow 0.35s',
                            }}
                          >
                            <span
                              data-label=""
                              className="font-bold"
                              style={{
                                fontSize: '12px',
                                color: '#999',
                                transition: 'color 0.35s',
                              }}
                            >
                              {String(step.id).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Content */}
                          <div
                            data-content=""
                            className="ml-5"
                            style={{
                              opacity: 0.4,
                              transform: 'translateY(4px)',
                              transition: 'opacity 0.35s, transform 0.35s',
                            }}
                          >
                            <h4
                              data-heading=""
                              className="font-semibold text-base mb-1"
                              style={{ color: '#999', transition: 'color 0.35s' }}
                            >
                              {step.title}
                            </h4>
                            <p className="text-[#666] text-sm mb-2">{step.description}</p>
                            {step.details && (
                              <ul className="space-y-1">
                                {step.details.map((detail, i) => (
                                  <li key={i} className="text-[#666] text-xs flex items-start gap-2">
                                    <span className="w-1 h-1 bg-[#03463B] rounded-full mt-1.5 shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Required Documents */}
                    <div className="mt-12 bg-white rounded-xl p-6">
                      <h4 className="text-[#21313c] font-semibold text-lg mb-4">Required Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {requiredDocuments.map((doc) => (
                          <div key={doc.id} className="flex items-start gap-2 text-sm">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${doc.mandatory ? 'bg-red-500' : 'bg-gray-400'}`} />
                            <div>
                              <span className="text-[#21313c] font-medium">{doc.name}</span>
                              {!doc.mandatory && <span className="text-[#999] text-xs ml-1">(if applicable)</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Scholarships ── */}
                {activeTab === 'scholarships' && (
                  <motion.div
                    key="scholarships"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3
                      className="text-[#21313c] font-semibold mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                    >
                      Scholarships & Awards
                    </h3>
                    <p className="text-[#666] text-sm mb-8">
                      Comprehensive scholarship programs recognizing excellence in academics, sports, and supporting students in need.
                    </p>

                    {allScholarships.map((category) => (
                      <div key={category.id} className="mb-10 last:mb-0">
                        <h4 className="text-[#21313c] font-semibold text-xl mb-2">{category.title}</h4>
                        <p className="text-[#666] text-sm mb-4">{category.description}</p>
                        <div className="overflow-x-auto rounded-xl bg-white">
                          <table className="w-full">
                            <thead className="bg-[#21313c] text-white">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold">Level</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold">Achievement</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold">Reward</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.scholarships.map((s) => (
                                <tr key={s.id} className="border-b border-gray-100">
                                  <td className="px-4 py-3 text-sm text-[#21313c] font-medium">{s.level}</td>
                                  <td className="px-4 py-3 text-sm text-[#666]">{s.rank}</td>
                                  <td className="px-4 py-3 text-sm text-[#03463B] font-semibold">{s.reward}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    <div className="mt-8 bg-white rounded-xl p-6">
                      <h4 className="text-[#21313c] font-semibold text-lg mb-4">Application Process</h4>
                      <ol className="space-y-2">
                        {scholarshipApplicationProcess.map((step, i) => (
                          <li key={i} className="text-[#666] text-sm flex items-start gap-3">
                            <span className="w-6 h-6 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-xs shrink-0">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}

                {/* ── Refund Policy ── */}
                {activeTab === 'refund' && (
                  <motion.div
                    key="refund"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-[#21313c] font-semibold mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Fee Refund Policy</h3>
                    <p className="text-[#666] text-sm mb-8">JLU follows UGC guidelines for fee refunds. Complete transparency in all fee-related matters.</p>

                    <div className="overflow-x-auto rounded-xl bg-white mb-8">
                      <table className="w-full">
                        <thead className="bg-[#21313c] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Timeline</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Condition</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold">Refund</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold">Deduction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ugcRefundPolicy.map((slab) => (
                            <tr key={slab.id} className="border-b border-gray-100">
                              <td className="px-4 py-3 text-sm text-[#21313c] font-medium">{slab.timeline}</td>
                              <td className="px-4 py-3 text-xs text-[#666]">{slab.condition}</td>
                              <td className="px-4 py-3 text-sm text-[#03463B] font-bold text-center">{slab.refundPercentage}%</td>
                              <td className="px-4 py-3 text-sm text-red-600 font-bold text-center">{slab.deductionPercentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <h4 className="text-[#21313c] font-semibold text-lg mb-4">Refund Process</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {refundProcess.map((p) => (
                        <div key={p.step} className="flex items-start gap-3 bg-white rounded-xl p-4">
                          <div className="w-8 h-8 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-xs shrink-0">{p.step}</div>
                          <div>
                            <h5 className="text-[#21313c] font-medium text-sm">{p.title}</h5>
                            <p className="text-[#666] text-xs mt-0.5">{p.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-[#21313c] font-semibold text-lg mb-4">Fee Categories</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                      {feeCategories.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-xl p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-[#21313c] font-medium text-sm">{cat.category}</h5>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.refundable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {cat.refundable ? 'Refundable' : 'Non-refundable'}
                            </span>
                          </div>
                          {cat.notes && <p className="text-[#666] text-xs">{cat.notes}</p>}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-xl p-6">
                      <h4 className="text-[#21313c] font-semibold text-lg mb-3">Important Conditions</h4>
                      <ul className="space-y-2">
                        {importantConditions.slice(0, 8).map((c, i) => (
                          <li key={i} className="text-[#666] text-xs flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#03463B] rounded-full mt-1.5 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* ── On Campus Accommodation ── */}
                {activeTab === 'accommodation' && (
                  <motion.div
                    key="accommodation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-[#21313c] font-semibold mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>On Campus Accommodation</h3>
                    <p className="text-[#666] text-sm mb-8">Safe, comfortable, and well-equipped hostel facilities for boys and girls.</p>

                    <div className="overflow-x-auto rounded-xl bg-white mb-6">
                      <table className="w-full">
                        <thead className="bg-[#21313c] text-white">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Hostel</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Room Type</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Occupancy</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold">Annual Fee</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold">Deposit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hostelFees.map((h) => (
                            <tr key={h.id} className="border-b border-gray-100">
                              <td className="px-4 py-3 text-sm text-[#21313c] font-medium">{h.hostelType}</td>
                              <td className="px-4 py-3 text-sm text-[#666]">{h.roomType}</td>
                              <td className="px-4 py-3 text-sm text-[#666]">{h.occupancy}</td>
                              <td className="px-4 py-3 text-sm text-[#21313c] font-bold text-right">₹{h.annualFees.toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3 text-sm text-[#666] text-right">₹{h.securityDeposit.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-white rounded-xl p-5 mb-8">
                      <h4 className="text-[#21313c] font-semibold text-base mb-2">Mess Fees</h4>
                      <p className="text-[#21313c] font-bold text-lg">
                        ₹{messFees.annual.toLocaleString('en-IN')}<span className="text-[#666] font-normal text-sm"> /year</span>
                        <span className="text-[#666] font-normal text-sm ml-2">(₹{messFees.monthly.toLocaleString('en-IN')}/month)</span>
                      </p>
                      <p className="text-[#666] text-xs mt-1">{messFees.description}</p>
                    </div>

                    <h4 className="text-[#21313c] font-semibold text-lg mb-4">Hostel Facilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {commonFacilities.map((f) => (
                        <div key={f.id} className="bg-white rounded-xl p-4">
                          <h5 className="text-[#21313c] font-medium text-sm mb-1">{f.name}</h5>
                          <p className="text-[#666] text-xs">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── Admission FAQs ── */}
                {activeTab === 'faqs' && (
                  <motion.div
                    key="faqs"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-[#21313c] font-semibold mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Admission FAQ&apos;s</h3>
                    <p className="text-[#666] text-sm mb-6">Answers to the most commonly asked questions about admissions at JLU.</p>

                    <div className="space-y-0 bg-white rounded-xl overflow-hidden">
                      {faqData.map((faq, index) => (
                        <div key={faq.id} className="border-b border-gray-100 last:border-0">
                          <button
                            className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                            onClick={() => toggleFaq(faq.id)}
                          >
                            <span className="flex items-center gap-3">
                              <span className={`text-xs font-medium ${openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#ccc]'}`}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className={`font-semibold text-sm transition-colors ${openFaq === faq.id ? 'text-[#f0c14b]' : 'text-[#21313c]'}`}>
                                {faq.question}
                              </span>
                            </span>
                            <motion.div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === faq.id ? 'bg-[#f0c14b]' : 'bg-[#21313c]'}`}
                              animate={{ rotate: openFaq === faq.id ? 45 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1V13M1 7H13" stroke={openFaq === faq.id ? '#21313c' : 'white'} strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openFaq === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-[#666] text-sm px-5 pb-4 pl-14 leading-relaxed">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Programs - Full Width Scattered Gallery Style */}
      <div id="ug-programs" />
      <div id="pg-programs" />
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
              <Link key={path.id} href="/programs" className="block">
                <motion.div
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
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Beyond Degrees - Horizontal Split Layout */}
      <div id="selection-process" />
      <div id="research-admissions" />
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
                onClick={() => setSelectedBeyondDegree(item)}
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
      <div id="scholarships" />
      <div id="financial-aid" />
      <div id="fee-structure" />
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

      {/* CTA Section */}
      <div id="admission-faqs" />
      <div id="contact-admissions" />
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
            <motion.a
              href="/talk-to-advisor"
              className="px-8 md:px-10 py-3 md:py-4 bg-transparent border border-[#21313c]/50 text-[#21313c] font-medium w-full sm:w-auto rounded-full text-center"
              whileHover={{ scale: 1.05, borderColor: '#21313c' }}
              whileTap={{ scale: 0.98 }}
            >
              Talk to an Admissions Advisor
            </motion.a>
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

      {/* Beyond Degree Modal */}
      <BeyondDegreeModal
        isOpen={selectedBeyondDegree !== null}
        onClose={() => setSelectedBeyondDegree(null)}
        data={selectedBeyondDegree}
      />
    </section>
  );
};

export { Admissions };
export default Admissions;
