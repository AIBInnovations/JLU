'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FreeshipFormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  fatherName: string;
  motherName: string;
  programLevel: string;
  course: string;
  previousQualification: string;
  admissionYear: string;
  familyIncome: string;
  incomeSource: string;
  numberOfDependents: string;
  statementOfNeed: string;
  principalRecommendation: string;
  consent: boolean;
}

const programOptions: Record<string, string[]> = {
  UG: [
    'B.Tech CSE', 'B.Tech CSE (AI & ML)', 'B.Tech CSE (Data Science)', 'B.Tech ECE', 'B.Tech Mechanical', 'B.Tech Civil',
    'BBA', 'BBA (Sports Management)', 'B.Com', 'BMS',
    'BA LLB', 'BBA LLB', 'LLB',
    'BA Journalism', 'BA Mass Communication', 'B.Sc Film Making',
    'B.Pharma', 'D.Pharma',
    'BCA', 'B.Sc Computer Science', 'B.Sc Data Science',
    'BA English', 'B.Des', 'BFA',
    'BHM', 'BBA Hospitality',
  ],
  PG: [
    'MBA', 'MBA (Business Analytics)', 'MBA (Sports Management)', 'MBA (Hospitality)',
    'M.Tech CSE', 'M.Tech ECE', 'MCA', 'M.Sc Computer Science',
    'MA Journalism', 'MA Mass Communication',
    'LLM', 'M.Com', 'MA English', 'M.Des',
    'M.Pharma',
  ],
  PhD: [
    'Ph.D. Engineering', 'Ph.D. Management', 'Ph.D. Science', 'Ph.D. Law', 'Ph.D. Arts & Humanities',
  ],
};

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FreeshipApplication = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FreeshipFormData>({
    name: '',
    email: '',
    phone: '',
    dob: '',
    fatherName: '',
    motherName: '',
    programLevel: '',
    course: '',
    previousQualification: '',
    admissionYear: '',
    familyIncome: '',
    incomeSource: '',
    numberOfDependents: '',
    statementOfNeed: '',
    principalRecommendation: '',
    consent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'programLevel' ? { course: '' } : {}),
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 10-digit number';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
    }

    if (step === 2) {
      if (!formData.programLevel) newErrors.programLevel = 'Select a program level';
      if (!formData.course) newErrors.course = 'Select a course';
      if (!formData.previousQualification.trim()) newErrors.previousQualification = 'Previous qualification is required';
      if (!formData.admissionYear) newErrors.admissionYear = 'Select admission year';
    }

    if (step === 3) {
      if (!formData.familyIncome) newErrors.familyIncome = 'Select family income range';
      if (!formData.incomeSource.trim()) newErrors.incomeSource = 'Source of income is required';
      if (!formData.numberOfDependents) newErrors.numberOfDependents = 'Enter number of dependents';
      if (!formData.statementOfNeed.trim()) newErrors.statementOfNeed = 'Statement of need is required';
      if (!formData.consent) newErrors.consent = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const availableCourses = formData.programLevel ? programOptions[formData.programLevel] || [] : [];

  const inputClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] placeholder-gray-400 focus:border-[#f0c14b] focus:outline-none transition-colors text-base";
  const labelClasses = "block text-[#21313c] font-medium mb-2 text-sm";
  const selectClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] focus:border-[#f0c14b] focus:outline-none transition-colors text-base appearance-none cursor-pointer";
  const errorClasses = "text-red-500 text-xs mt-1";

  const stepLabels = ['Personal Info', 'Academics', 'Financial'];

  return (
    <section className="min-h-screen bg-[#f6f7f0]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/campus/gallery-3.jpg"
            alt="JLU Chancellor Freeship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative z-10 pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 w-full">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              <span
                className="text-[#f0c14b] uppercase tracking-widest block mb-4"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Chancellor&apos;s Initiative
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
                Apply for{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400, color: '#f0c14b' }}>
                  Chancellor Freeship
                </span>
              </h1>
              <p
                className="text-white/80 mx-auto"
                style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '620px' }}
              >
                The Chancellor Freeship is awarded to exceptional students who demonstrate outstanding potential but face financial constraints.
                Covers 100% tuition, free hostel accommodation, and a monthly stipend.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Eligibility Banner */}
        <div className="relative z-10 pb-6">
          <div className="max-w-2xl mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
              className="bg-[#f0c14b]/10 border border-[#f0c14b]/30 rounded-2xl p-5 md:p-6 backdrop-blur-sm"
            >
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" />
                  <line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" />
                </svg>
                Eligibility Criteria
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="text-white/70 text-xs">
                  <span className="text-white font-medium block mb-0.5">Family Income</span>
                  Below ₹3 lakhs per annum
                </div>
                <div className="text-white/70 text-xs">
                  <span className="text-white font-medium block mb-0.5">Academic Record</span>
                  Minimum 75% in qualifying exam
                </div>
                <div className="text-white/70 text-xs">
                  <span className="text-white font-medium block mb-0.5">Recommendation</span>
                  School principal letter required
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Form */}
        <div className="relative z-10 pb-20">
          <div className="max-w-2xl mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl">
                {!isSubmitted ? (
                  <>
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-3 mb-10">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <motion.div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                                currentStep >= step
                                  ? 'bg-[#f0c14b] text-[#21313c]'
                                  : 'bg-gray-200 text-gray-500'
                              }`}
                              animate={{ scale: currentStep === step ? 1.1 : 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {currentStep > step ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : (
                                step
                              )}
                            </motion.div>
                            <span className={`text-[10px] mt-1.5 font-medium ${currentStep >= step ? 'text-[#21313c]' : 'text-gray-400'}`}>
                              {stepLabels[step - 1]}
                            </span>
                          </div>
                          {step < 3 && (
                            <div
                              className={`w-10 h-1 mx-2 rounded-full transition-colors ${
                                currentStep > step ? 'bg-[#f0c14b]' : 'bg-gray-200'
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
                            className="space-y-5"
                          >
                            <div>
                              <label className={labelClasses}>Full Name *</label>
                              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" className={inputClasses} />
                              {errors.name && <p className={errorClasses}>{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className={labelClasses}>Father&apos;s Name *</label>
                                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Father's full name" className={inputClasses} />
                                {errors.fatherName && <p className={errorClasses}>{errors.fatherName}</p>}
                              </div>
                              <div>
                                <label className={labelClasses}>Mother&apos;s Name *</label>
                                <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} placeholder="Mother's full name" className={inputClasses} />
                                {errors.motherName && <p className={errorClasses}>{errors.motherName}</p>}
                              </div>
                            </div>
                            <div>
                              <label className={labelClasses}>Email Address *</label>
                              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" className={inputClasses} />
                              {errors.email && <p className={errorClasses}>{errors.email}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>Mobile Number *</label>
                              <div className="flex gap-3">
                                <div className="flex items-center px-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-[#21313c] font-medium">+91</div>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter mobile number" className={`${inputClasses} flex-1`} maxLength={10} />
                              </div>
                              {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>Date of Birth *</label>
                              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={inputClasses} />
                              {errors.dob && <p className={errorClasses}>{errors.dob}</p>}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Academic Details */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: customEase }}
                            className="space-y-5"
                          >
                            <div>
                              <label className={labelClasses}>Program Level *</label>
                              <div className="relative">
                                <select name="programLevel" value={formData.programLevel} onChange={handleInputChange} className={selectClasses}>
                                  <option value="">Select program level</option>
                                  <option value="UG">Undergraduate (UG)</option>
                                  <option value="PG">Postgraduate (PG)</option>
                                  <option value="PhD">Doctoral (PhD)</option>
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              {errors.programLevel && <p className={errorClasses}>{errors.programLevel}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>Course Applied For *</label>
                              <div className="relative">
                                <select name="course" value={formData.course} onChange={handleInputChange} className={selectClasses} disabled={!formData.programLevel}>
                                  <option value="">{formData.programLevel ? 'Select a course' : 'Select program level first'}</option>
                                  {availableCourses.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              {errors.course && <p className={errorClasses}>{errors.course}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>Previous Qualification *</label>
                              <input type="text" name="previousQualification" value={formData.previousQualification} onChange={handleInputChange} placeholder="e.g. 12th — 82%, B.Tech — 7.8 CGPA" className={inputClasses} />
                              {errors.previousQualification && <p className={errorClasses}>{errors.previousQualification}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>Year of Admission *</label>
                              <div className="relative">
                                <select name="admissionYear" value={formData.admissionYear} onChange={handleInputChange} className={selectClasses}>
                                  <option value="">Select year</option>
                                  <option value="2025-26">2025–26</option>
                                  <option value="2026-27">2026–27</option>
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              {errors.admissionYear && <p className={errorClasses}>{errors.admissionYear}</p>}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Financial Details */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: customEase }}
                            className="space-y-5"
                          >
                            <div>
                              <label className={labelClasses}>Annual Family Income *</label>
                              <div className="relative">
                                <select name="familyIncome" value={formData.familyIncome} onChange={handleInputChange} className={selectClasses}>
                                  <option value="">Select income range</option>
                                  <option value="below-1L">Below ₹1,00,000</option>
                                  <option value="1L-2L">₹1,00,000 – ₹2,00,000</option>
                                  <option value="2L-3L">₹2,00,000 – ₹3,00,000</option>
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              {errors.familyIncome && <p className={errorClasses}>{errors.familyIncome}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className={labelClasses}>Source of Income *</label>
                                <input type="text" name="incomeSource" value={formData.incomeSource} onChange={handleInputChange} placeholder="e.g. Agriculture, Daily wages" className={inputClasses} />
                                {errors.incomeSource && <p className={errorClasses}>{errors.incomeSource}</p>}
                              </div>
                              <div>
                                <label className={labelClasses}>Family Dependents *</label>
                                <input type="number" name="numberOfDependents" value={formData.numberOfDependents} onChange={handleInputChange} placeholder="e.g. 4" className={inputClasses} min="1" max="20" />
                                {errors.numberOfDependents && <p className={errorClasses}>{errors.numberOfDependents}</p>}
                              </div>
                            </div>
                            <div>
                              <label className={labelClasses}>Statement of Need *</label>
                              <textarea
                                name="statementOfNeed"
                                value={formData.statementOfNeed}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Describe your financial situation and why you need the Chancellor Freeship. Include any relevant details about your family circumstances."
                                className={`${inputClasses} resize-none`}
                              />
                              {errors.statementOfNeed && <p className={errorClasses}>{errors.statementOfNeed}</p>}
                            </div>
                            <div>
                              <label className={labelClasses}>School Principal Recommendation <span className="text-gray-400 font-normal">(Optional)</span></label>
                              <input type="text" name="principalRecommendation" value={formData.principalRecommendation} onChange={handleInputChange} placeholder="Principal's name and school" className={inputClasses} />
                            </div>

                            {/* Documents Note */}
                            <div className="p-4 bg-[#f0c14b]/10 rounded-xl border border-[#f0c14b]/25">
                              <div className="flex gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="1.5" className="shrink-0 mt-0.5">
                                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinecap="round" strokeLinejoin="round" />
                                  <polyline points="13 2 13 9 20 9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div>
                                  <p className="text-[#21313c] text-sm font-medium mb-1">Required Documents</p>
                                  <ul className="text-[#666] text-xs leading-relaxed space-y-0.5">
                                    <li>Income certificate from competent authority</li>
                                    <li>School principal recommendation letter</li>
                                    <li>Academic marksheets (10th & 12th)</li>
                                    <li>Aadhar card and passport-size photograph</li>
                                  </ul>
                                  <p className="text-[#21313c] text-xs font-medium mt-2">
                                    Email documents to <span className="text-[#f0c14b]">freeship@jlu.edu.in</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Consent */}
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer accent-[#21313c]" />
                              <span className="text-[#666] text-sm leading-relaxed">
                                I certify that all the information provided is true and correct. I understand that providing false information will result in cancellation of the freeship and possible disciplinary action. *
                              </span>
                            </label>
                            {errors.consent && <p className={errorClasses}>{errors.consent}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex gap-4 mt-8">
                        {currentStep > 1 && (
                          <motion.button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 py-4 border-2 border-gray-200 text-[#21313c] font-semibold rounded-xl hover:border-gray-300 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            Back
                          </motion.button>
                        )}
                        {currentStep < 3 ? (
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 py-4 bg-[#21313c] text-white font-semibold rounded-xl hover:bg-[#2a3f4c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            Continue
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-4 bg-[#f0c14b] text-[#21313c] font-semibold rounded-xl hover:bg-[#e0b43b] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {isSubmitting ? (
                              <>
                                <motion.span
                                  className="w-5 h-5 border-2 border-[#21313c]/30 border-t-[#21313c] rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Application
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-[#f0c14b] rounded-full flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#21313c" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-[#21313c] mb-2">Application Submitted!</h3>
                    <p className="text-gray-500 max-w-sm mb-2">
                      Your Chancellor Freeship application has been received. The selection committee will review your application and contact you for a personal interview.
                    </p>
                    <p className="text-[#21313c] text-sm font-medium">
                      Email your supporting documents to freeship@jlu.edu.in
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { FreeshipApplication };
export default FreeshipApplication;
