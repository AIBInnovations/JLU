'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export const AntiRaggingBanner = () => {
  const isMobile = useIsMobile();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({
    description: '',
    anonymous: true,
    contact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsReportModalOpen(false);
        setIsSubmitted(false);
        setReportData({ description: '', anonymous: true, contact: '' });
      }, 2500);
    }, 1000);
  };

  return (
    <>
      <section className="relative py-12 md:py-16 bg-[#f0c14b] overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            {/* Shield Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#20323d] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f0c14b" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#20323d] mb-3"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
            >
              Anti-Ragging{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Commitment
              </span>
            </h3>

            {/* Description */}
            <p className="text-[#20323d]/70 text-sm md:text-base max-w-xl mb-8">
              JLU maintains a zero-tolerance policy against ragging. Your safety is our priority.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Helpline */}
              <a
                href="tel:18001805522"
                className="flex items-center gap-2.5 px-8 py-3.5 bg-[#20323d] text-white font-medium rounded-full hover:bg-[#2d4050] transition-all shadow-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-semibold">1800-180-5522</span>
              </a>

              {/* Report Button */}
              <motion.button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-2.5 px-8 py-3.5 bg-white text-[#20323d] font-medium rounded-full hover:bg-gray-50 transition-all shadow-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Report Incident
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportModalOpen(false)}
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className="bg-white rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{
                  width: isMobile ? '100%' : '480px',
                  maxWidth: '100%',
                  maxHeight: '90vh',
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
              {/* Header */}
              <div className="bg-[#f0c14b] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#20323d] rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f4c950" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#20323d]" style={{ fontFamily: 'Inter, sans-serif' }}>Report Ragging Incident</h3>
                    <p className="text-xs text-[#20323d]/60">Confidential & Secure</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#20323d]/10 text-[#20323d]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-[#20323d] mb-2">Report Submitted</h4>
                      <p className="text-gray-500">Our anti-ragging committee will take immediate action. Stay safe.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmitReport}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                        Your report will be handled with strict confidentiality. All information is encrypted and only accessible to authorized committee members.
                      </p>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-[#20323d] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Describe the Incident <span className="text-amber-600">*</span>
                        </label>
                        <textarea
                          value={reportData.description}
                          onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                          placeholder="Please provide details about the incident including date, time, location, and people involved..."
                        />
                      </div>

                      {/* Anonymous Toggle */}
                      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div>
                          <p className="font-medium text-[#20323d]" style={{ fontFamily: 'Inter, sans-serif' }}>Report Anonymously</p>
                          <p className="text-xs text-gray-500">Your identity will not be disclosed</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReportData(prev => ({ ...prev, anonymous: !prev.anonymous }))}
                          className={`relative w-12 h-6 rounded-full transition-colors ${reportData.anonymous ? 'bg-[#03463B]' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${reportData.anonymous ? 'left-7' : 'left-1'}`}
                          />
                        </button>
                      </div>

                      {/* Contact (if not anonymous) */}
                      {!reportData.anonymous && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <label className="block text-sm font-medium text-[#20323d] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Contact Information
                          </label>
                          <input
                            type="text"
                            value={reportData.contact}
                            onChange={(e) => setReportData(prev => ({ ...prev, contact: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                            placeholder="Phone or email for follow-up"
                          />
                        </motion.div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={!reportData.description.trim()}
                        className="w-full py-4 bg-[#20323d] text-white font-semibold rounded-xl hover:bg-[#2d4050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        Submit Report
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 2L15 22 11 13 2 9 22 2z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>

                      {/* Emergency Contact */}
                      <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-2">For immediate assistance, call</p>
                        <a href="tel:18001805522" className="text-[#03463B] font-bold text-lg hover:underline">
                          1800-180-5522
                        </a>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
