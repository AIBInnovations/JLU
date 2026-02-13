'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvisorFormData {
  name: string;
  email: string;
  phone: string;
  programInterest: string;
  currentEducation: string;
  preferredDate: string;
  preferredTime: string;
  contactMode: string;
  message: string;
  consent: boolean;
}

const programInterests = [
  'Engineering & Technology',
  'Management & Commerce',
  'Law',
  'Pharmacy',
  'Journalism & Communication',
  'Humanities, Art & Design',
  'Hospitality & Tourism',
  'Sports Management',
  'Science & Research',
  'Not sure — need guidance',
];

const timeSlots = [
  '9:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',
];

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AdvisorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<AdvisorFormData>({
    name: '',
    email: '',
    phone: '',
    programInterest: '',
    currentEducation: '',
    preferredDate: '',
    preferredTime: '',
    contactMode: '',
    message: '',
    consent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 10-digit number';
    if (!formData.programInterest) newErrors.programInterest = 'Select an area of interest';
    if (!formData.currentEducation.trim()) newErrors.currentEducation = 'Enter your current education';
    if (!formData.contactMode) newErrors.contactMode = 'Select how you want to be contacted';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] placeholder-gray-400 focus:border-[#03463B] focus:outline-none transition-colors text-base";
  const labelClasses = "block text-[#21313c] font-medium mb-2 text-sm";
  const selectClasses = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-[#21313c] focus:border-[#03463B] focus:outline-none transition-colors text-base appearance-none cursor-pointer";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <section className="min-h-screen bg-[#f6f7f0]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/campus/gallery-3.jpg"
            alt="JLU Admissions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
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
                className="text-white/70 uppercase tracking-widest block mb-4"
                style={{ fontSize: '12px', letterSpacing: '0.2em' }}
              >
                Personalized Guidance
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
                Talk to an{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Admissions Advisor
                </span>
              </h1>
              <p
                className="text-white/80 mx-auto"
                style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}
              >
                Have questions about programs, admissions, scholarships, or campus life?
                Our experienced advisors are here to help you make the right choice.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="relative z-10 pb-6">
          <div className="max-w-2xl mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone Call' },
                { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', label: 'Video Call' },
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <path d={item.icon} />
                  </svg>
                  <span className="text-white/80 text-xs font-medium">{item.label}</span>
                </div>
              ))}
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
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-2">
                        <h2 className="text-[#21313c] text-xl font-semibold">Schedule a Consultation</h2>
                        <p className="text-[#666] text-sm mt-1">Fill in your details and our advisor will get in touch with you.</p>
                      </div>

                      <div>
                        <label className={labelClasses}>Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" className={inputClasses} />
                        {errors.name && <p className={errorClasses}>{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses}>Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className={inputClasses} />
                          {errors.email && <p className={errorClasses}>{errors.email}</p>}
                        </div>
                        <div>
                          <label className={labelClasses}>Mobile Number *</label>
                          <div className="flex gap-2">
                            <div className="flex items-center px-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-[#21313c] font-medium text-sm">+91</div>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Mobile number" className={`${inputClasses} flex-1`} maxLength={10} />
                          </div>
                          {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className={labelClasses}>Area of Interest *</label>
                        <div className="relative">
                          <select name="programInterest" value={formData.programInterest} onChange={handleInputChange} className={selectClasses}>
                            <option value="">Select your area of interest</option>
                            {programInterests.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {errors.programInterest && <p className={errorClasses}>{errors.programInterest}</p>}
                      </div>

                      <div>
                        <label className={labelClasses}>Current Education *</label>
                        <input type="text" name="currentEducation" value={formData.currentEducation} onChange={handleInputChange} placeholder="e.g. 12th Science, B.Tech 3rd Year, Working Professional" className={inputClasses} />
                        {errors.currentEducation && <p className={errorClasses}>{errors.currentEducation}</p>}
                      </div>

                      <div>
                        <label className={labelClasses}>How would you like to be contacted? *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'phone', label: 'Phone Call' },
                            { value: 'video', label: 'Video Call' },
                            { value: 'email', label: 'Email' },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-colors text-center ${
                                formData.contactMode === opt.value ? 'border-[#03463B] bg-[#03463B]/5' : 'border-gray-200'
                              }`}
                            >
                              <input type="radio" name="contactMode" value={opt.value} checked={formData.contactMode === opt.value} onChange={handleInputChange} className="hidden" />
                              <span className="text-[#21313c] font-medium text-sm">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.contactMode && <p className={errorClasses}>{errors.contactMode}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses}>Preferred Date <span className="text-gray-400 font-normal">(Optional)</span></label>
                          <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} min={getMinDate()} className={inputClasses} />
                        </div>
                        <div>
                          <label className={labelClasses}>Preferred Time <span className="text-gray-400 font-normal">(Optional)</span></label>
                          <div className="relative">
                            <select name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} className={selectClasses}>
                              <option value="">Any time</option>
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                              ))}
                            </select>
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClasses}>Your Question or Message <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="What would you like to discuss with the admissions advisor?"
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      {/* Consent */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer accent-[#21313c]" />
                        <span className="text-[#666] text-sm leading-relaxed">
                          I agree to receive communication from JLU regarding admissions. My details will not be shared with third parties. *
                        </span>
                      </label>
                      {errors.consent && <p className={errorClasses}>{errors.consent}</p>}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#03463B] text-white font-semibold rounded-xl hover:bg-[#025a4a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
                            Scheduling...
                          </>
                        ) : (
                          <>
                            Schedule Consultation
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-[#c3fd7a] rounded-full flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#03463B" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-[#21313c] mb-2">Consultation Scheduled!</h3>
                      <p className="text-gray-500 max-w-sm mb-4">
                        An admissions advisor will reach out to you shortly via your preferred contact method. We typically respond within 24 hours.
                      </p>
                      <div className="flex items-center gap-2 text-[#03463B] text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Direct line: +91-755-2740-600
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AdvisorForm };
export default AdvisorForm;
