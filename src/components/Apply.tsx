'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  level: string;
  course: string;
  consent: boolean;
}

interface Program {
  name: string;
  duration: string;
  type: string;
  specializations?: string[];
}

interface ProgramCategory {
  id: string;
  name: string;
  ugPrograms: Program[];
  pgPrograms: Program[];
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh'
];

const programCategories: ProgramCategory[] = [
  {
    id: 'management',
    name: 'Management and Commerce',
    ugPrograms: [
      { name: 'BBA', duration: '3 Years', type: 'Full Time' },
      { name: 'B.Com', duration: '3 Years', type: 'Full Time', specializations: ['Financial Markets', 'Banking & Finance', 'Accounting'] },
      { name: 'BMS', duration: '3 Years', type: 'Full Time', specializations: ['Marketing', 'HR', 'Finance', 'Business Analytics'] },
    ],
    pgPrograms: [
      { name: 'MBA', duration: '2 Years', type: 'Full Time', specializations: ['Finance', 'Marketing', 'HR'] },
      { name: 'MBA (Business Analytics)', duration: '2 Years', type: 'Full Time' },
      { name: 'M.Com', duration: '2 Years', type: 'Full Time' },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    ugPrograms: [
      { name: 'BHM', duration: '4 Years', type: 'Full Time' },
      { name: 'BBA in Hospitality', duration: '3 Years', type: 'Full Time' },
      { name: 'B.Sc in Hotel Management', duration: '3 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'MBA in Hospitality Management', duration: '2 Years', type: 'Full Time' },
      { name: 'M.Sc in Tourism', duration: '2 Years', type: 'Full Time' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports Management',
    ugPrograms: [
      { name: 'B.Sc in Sports Science', duration: '3 Years', type: 'Full Time' },
      { name: 'BBA in Sports Management', duration: '3 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'MBA in Sports Management', duration: '2 Years', type: 'Full Time' },
      { name: 'M.Sc in Sports Science', duration: '2 Years', type: 'Full Time' },
    ],
  },
  {
    id: 'journalism',
    name: 'Journalism & Communication',
    ugPrograms: [
      { name: 'BA in Journalism', duration: '3 Years', type: 'Full Time' },
      { name: 'BA in Mass Communication', duration: '3 Years', type: 'Full Time' },
      { name: 'B.Sc in Film Making', duration: '3 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'MA in Journalism', duration: '2 Years', type: 'Full Time' },
      { name: 'MA in Mass Communication', duration: '2 Years', type: 'Full Time' },
    ],
  },
  {
    id: 'humanities',
    name: 'Humanities, Art & Design',
    ugPrograms: [
      { name: 'BA in English', duration: '3 Years', type: 'Full Time' },
      { name: 'B.Des', duration: '4 Years', type: 'Full Time', specializations: ['Fashion', 'Interior', 'Product'] },
      { name: 'BFA', duration: '4 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'MA in English', duration: '2 Years', type: 'Full Time' },
      { name: 'M.Des', duration: '2 Years', type: 'Full Time' },
    ],
  },
  {
    id: 'law',
    name: 'Law',
    ugPrograms: [
      { name: 'BA LLB', duration: '5 Years', type: 'Full Time' },
      { name: 'BBA LLB', duration: '5 Years', type: 'Full Time' },
      { name: 'LLB', duration: '3 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'LLM', duration: '1 Year', type: 'Full Time', specializations: ['Corporate Law', 'Constitutional Law'] },
    ],
  },
  {
    id: 'science',
    name: 'Science & Technology',
    ugPrograms: [
      { name: 'B.Tech', duration: '4 Years', type: 'Full Time', specializations: ['CSE', 'ECE', 'Mechanical', 'Civil'] },
      { name: 'BCA', duration: '3 Years', type: 'Full Time' },
      { name: 'B.Sc', duration: '3 Years', type: 'Full Time', specializations: ['Computer Science', 'Data Science', 'AI/ML'] },
    ],
    pgPrograms: [
      { name: 'M.Tech', duration: '2 Years', type: 'Full Time', specializations: ['CSE', 'ECE'] },
      { name: 'MCA', duration: '2 Years', type: 'Full Time' },
      { name: 'M.Sc', duration: '2 Years', type: 'Full Time', specializations: ['Computer Science', 'Data Science'] },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    ugPrograms: [
      { name: 'B.Pharma', duration: '4 Years', type: 'Full Time' },
      { name: 'D.Pharma', duration: '2 Years', type: 'Full Time' },
    ],
    pgPrograms: [
      { name: 'M.Pharma', duration: '2 Years', type: 'Full Time', specializations: ['Pharmaceutics', 'Pharmacology'] },
    ],
  },
  {
    id: 'research',
    name: 'Research',
    ugPrograms: [],
    pgPrograms: [
      { name: 'Ph.D. in Engineering', duration: '3-5 Years', type: 'Full Time' },
      { name: 'Ph.D. in Management', duration: '3-5 Years', type: 'Full Time' },
      { name: 'Ph.D. in Science', duration: '3-5 Years', type: 'Full Time' },
      { name: 'Ph.D. in Law', duration: '3-5 Years', type: 'Full Time' },
      { name: 'Ph.D. in Arts & Humanities', duration: '3-5 Years', type: 'Full Time' },
    ],
  },
];

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Apply = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [degreeLevel, setDegreeLevel] = useState<'ug' | 'pg'>('ug');
  const [selectedCategory, setSelectedCategory] = useState('management');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    level: '',
    course: '',
    consent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'level' ? { course: '' } : {}),
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '' &&
               formData.email.trim() !== '' &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
               formData.phone.trim().length >= 10;
      case 2:
        return formData.state !== '' && formData.city.trim() !== '';
      case 3:
        return formData.level !== '' && formData.course !== '' && formData.consent;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const currentCategory = programCategories.find(c => c.id === selectedCategory);
  const displayPrograms = degreeLevel === 'ug' ? currentCategory?.ugPrograms : currentCategory?.pgPrograms;

  const inputClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] placeholder-gray-400 focus:border-[#c3fd7a] focus:outline-none transition-colors text-base";
  const labelClasses = "block text-[#21313c] font-medium mb-2 text-sm";
  const selectClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] focus:border-[#c3fd7a] focus:outline-none transition-colors text-base appearance-none cursor-pointer";

  return (
    <section className="min-h-screen bg-[#f6f7f0]">
      {/* Hero + Form Section with Full Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image - Covers Hero + Form Section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about1.jpg"
            alt="JLU Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 w-full">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              <span
                className="text-white/70 uppercase tracking-widest block mb-4"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                START YOUR JOURNEY
              </span>
              <h1
                className="text-white mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                Apply to{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  JLU Bhopal
                </span>
              </h1>
              <p
                className="text-white/80 mx-auto"
                style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}
              >
                Take the first step towards your future. Fill out the application form and our admissions team will get in touch with you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Two Column Layout - Left: Buttons, Right: Form */}
        <div className="relative z-10 pb-20">
          <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Left Side - Tour & Brochure */}
              <motion.div
                className="lg:w-1/2 flex flex-col justify-center"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
              >
                <h2
                  className="text-white mb-4"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Explore our{' '}
                  <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                    campus
                  </span>
                </h2>
                <p className="text-white/70 mb-8" style={{ fontSize: '16px', lineHeight: 1.7 }}>
                  Take a virtual tour of our campus or download our brochure to learn more about what JLU has to offer.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21313c] font-semibold rounded-full hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View 360 Tour
                  </motion.a>
                  <motion.a
                    href="/broucher/Fee-Structure2025.pdf" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-[#c3fd7a] text-[#21313c] font-semibold rounded-full hover:bg-[#b3ed6a] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Brochure
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Side - Form Card */}
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
              >
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
                {!isSubmitted ? (
                  <>
                    {/* Progress Steps - Centered */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                              currentStep >= step
                                ? 'bg-[#c3fd7a] text-[#21313c]'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                            animate={{ scale: currentStep === step ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {currentStep > step ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              step
                            )}
                          </motion.div>
                          {step < 3 && (
                            <div
                              className={`w-8 h-1 ml-3 rounded-full transition-colors ${
                                currentStep > step ? 'bg-[#c3fd7a]' : 'bg-gray-200'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>


                <form ref={formRef} onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: customEase }}
                        className="space-y-6"
                      >
                        <div>
                          <label className={labelClasses}>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={inputClasses}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClasses}>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className={inputClasses}
                            required
                          />
                        </div>
                        <div>
                          <label className={labelClasses}>Mobile Number *</label>
                          <div className="flex gap-3">
                            <div className="flex items-center px-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-[#21313c] font-medium">
                              +91
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter your mobile number"
                              className={`${inputClasses} flex-1`}
                              maxLength={10}
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Location */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: customEase }}
                        className="space-y-6"
                      >
                        <div>
                          <label className={labelClasses}>State *</label>
                          <div className="relative">
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className={selectClasses}
                              required
                            >
                              <option value="">Select your state</option>
                              {indianStates.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <label className={labelClasses}>City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                            className={inputClasses}
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Program Selection */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: customEase }}
                        className="space-y-6"
                      >
                        <div>
                          <label className={labelClasses}>Program Level *</label>
                          <div className="relative">
                            <select
                              name="level"
                              value={formData.level}
                              onChange={handleInputChange}
                              className={selectClasses}
                              required
                            >
                              <option value="">Select program level</option>
                              <option value="ug">Undergraduate (UG)</option>
                              <option value="pg">Postgraduate (PG)</option>
                              <option value="research">Research/Ph.D.</option>
                            </select>
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <label className={labelClasses}>Preferred Course *</label>
                          <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            placeholder="Enter your preferred course"
                            className={inputClasses}
                            required
                          />
                        </div>
                        <div className="pt-4">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              name="consent"
                              checked={formData.consent}
                              onChange={handleInputChange}
                              className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-[#c3fd7a] focus:ring-[#c3fd7a] cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 leading-relaxed">
                              I agree to receive information regarding my application and other updates from Jagran Lakecity University via email, SMS, and phone calls.
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-10">
                    {currentStep > 1 && (
                      <motion.button
                        type="button"
                        onClick={handlePrev}
                        className="flex-1 px-6 py-4 border-2 border-[#21313c] text-[#21313c] font-semibold rounded-xl hover:bg-[#21313c] hover:text-white transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                    )}
                    {currentStep < 3 ? (
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        disabled={!validateStep(currentStep)}
                        className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                          validateStep(currentStep)
                            ? 'bg-[#21313c] text-white hover:bg-[#2a3f4c]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={validateStep(currentStep) ? { scale: 1.02 } : {}}
                        whileTap={validateStep(currentStep) ? { scale: 0.98 } : {}}
                      >
                        Continue
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={!validateStep(3) || isSubmitting}
                        className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                          validateStep(3) && !isSubmitting
                            ? 'bg-[#c3fd7a] text-[#21313c] hover:bg-[#b3ed6a]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={validateStep(3) && !isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={validateStep(3) && !isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-[#21313c]/30 border-t-[#21313c] rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: customEase }}
              >
                <motion.div
                  className="w-20 h-20 bg-[#c3fd7a] rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-semibold text-[#21313c] mb-3">Application Submitted!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for your interest in Jagran Lakecity University. Our admissions team will contact you within 24-48 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/programs"
                    className="px-6 py-3 bg-[#21313c] text-white font-medium rounded-full hover:bg-[#2a3f4c] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Programs
                  </motion.a>
                  <motion.a
                    href="/"
                    className="px-6 py-3 border-2 border-[#21313c] text-[#21313c] font-medium rounded-full hover:bg-[#21313c] hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Home
                  </motion.a>
                </div>
              </motion.div>
            )}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </div>

      {/* What Are You Looking For - Unique Split Layout */}
      <div className="bg-[#21313c] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Side - Fixed Content */}
            <motion.div
              className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              <span
                className="text-[#c3fd7a] uppercase tracking-widest block mb-4"
                style={{ fontSize: '11px', letterSpacing: '0.25em' }}
              >
                FIND YOUR PATH
              </span>
              <h2
                className="text-white mb-6"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                }}
              >
                What are you{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#c3fd7a' }}>
                  looking for?
                </span>
              </h2>
              <p className="text-white/60 mb-10" style={{ fontSize: '15px', lineHeight: 1.8 }}>
                Work with a learning program that fits your life. Complete classes and coursework on your own schedule, in a program designed around you.
              </p>

              {/* Degree Level Toggle */}
              <div className="flex flex-col gap-3 mb-10">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">I'm looking for a</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDegreeLevel('ug')}
                    className={`px-6 py-3 text-sm font-medium transition-all border ${
                      degreeLevel === 'ug'
                        ? 'bg-[#c3fd7a] text-[#21313c] border-[#c3fd7a]'
                        : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    UG Degree
                  </button>
                  <button
                    onClick={() => setDegreeLevel('pg')}
                    className={`px-6 py-3 text-sm font-medium transition-all border ${
                      degreeLevel === 'pg'
                        ? 'bg-[#c3fd7a] text-[#21313c] border-[#c3fd7a]'
                        : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    PG Degree
                  </button>
                </div>
              </div>

              {/* Category List - Vertical */}
              <div className="space-y-1">
                {programCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 transition-all flex items-center justify-between group ${
                      selectedCategory === category.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${selectedCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'}`}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Fee Structure Link */}
              <motion.a
                href="/broucher/Fee-Structure2025.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-10 text-[#c3fd7a] text-sm font-medium hover:underline"
                whileHover={{ x: 4 }}
              >
                Download Fee Structure
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </motion.a>
            </motion.div>

            {/* Right Side - Programs Display */}
            <div className="lg:w-3/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${degreeLevel}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: customEase }}
                >
                  {/* Category Title */}
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <p className="text-[#c3fd7a] text-xs uppercase tracking-widest mb-2">
                      {degreeLevel === 'ug' ? 'Undergraduate' : 'Postgraduate'} Programs
                    </p>
                    <h3 className="text-white text-2xl font-semibold">
                      {currentCategory?.name}
                    </h3>
                  </div>

                  {/* Programs List */}
                  {displayPrograms && displayPrograms.length > 0 ? (
                    <div className="space-y-4">
                      {displayPrograms.map((program, index) => (
                        <motion.div
                          key={program.name}
                          className="group relative bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all cursor-pointer border border-white/5 hover:border-white/20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.08, ease: customEase }}
                          whileHover={{ x: 8 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="text-white text-xl font-semibold mb-1 group-hover:text-[#c3fd7a] transition-colors">
                                {program.name}
                              </h4>
                              {program.specializations && (
                                <p className="text-white/40 text-sm mb-3">
                                  Specializations: {program.specializations.join(' | ')}
                                </p>
                              )}
                              <div className="flex items-center gap-6 text-sm">
                                <span className="text-white/60 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#c3fd7a] rounded-full"></span>
                                  {program.duration}
                                </span>
                                <span className="text-white/60 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#c3fd7a] rounded-full"></span>
                                  {program.type}
                                </span>
                              </div>
                            </div>
                            <div className="text-white/30 group-hover:text-[#c3fd7a] transition-colors">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>

                          {/* Hover line accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c3fd7a] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
                          <path d="M12 6v6l4 2"/>
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <p className="text-white/40">
                        {degreeLevel === 'ug'
                          ? 'No undergraduate programs in this category.'
                          : 'No postgraduate programs in this category.'}
                      </p>
                    </div>
                  )}

                  {/* Request Full Listing */}
                  <motion.div
                    className="mt-10 pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-white/40 text-sm mb-4">
                      Already know what you're looking for?
                    </p>
                    <a
                      href="/programs"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#21313c] font-semibold text-sm hover:bg-[#c3fd7a] transition-colors"
                    >
                      Request Full Program Listing
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Need Help Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
          >
            <span
              className="text-[#999] uppercase tracking-widest block mb-4"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              SUPPORT
            </span>
            <h2
              className="text-[#21313c] mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Need{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                help?
              </span>
            </h2>
            <p className="text-[#666] max-w-xl mx-auto">
              Our admissions team is here to guide you through every step of the application process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Call Us */}
            <motion.a
              href="tel:18001805522"
              className="flex flex-col items-center text-center p-8 bg-[#f6f7f0] rounded-2xl hover:shadow-lg transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: customEase }}
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 bg-[#21313c] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#c3fd7a] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-[#21313c] transition-colors">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-1">Toll Free Number</p>
              <p className="font-semibold text-[#21313c] text-lg">1800-180-5522</p>
            </motion.a>

            {/* Email Us */}
            <motion.a
              href="mailto:admissions@jlu.edu.in"
              className="flex flex-col items-center text-center p-8 bg-[#f6f7f0] rounded-2xl hover:shadow-lg transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: customEase }}
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 bg-[#21313c] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#c3fd7a] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-[#21313c] transition-colors">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-1">Email Us</p>
              <p className="font-semibold text-[#21313c] text-lg">admissions@jlu.edu.in</p>
            </motion.a>

            {/* Virtual Tour */}
            <motion.a
              href="https://panel123.s3.ap-south-1.amazonaws.com/360JLU/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 bg-[#f6f7f0] rounded-2xl hover:shadow-lg transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 bg-[#21313c] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#c3fd7a] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-[#21313c] transition-colors">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-1">Explore Campus</p>
              <p className="font-semibold text-[#21313c] text-lg">Take a Virtual Tour</p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Apply };
export default Apply;
