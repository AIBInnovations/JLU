'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/components';
import { ugcRefundPolicy, refundProcess, contactInformation } from '@/data/refundPolicy';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function RefundPolicyPage() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-[#f6f7f0] min-h-screen">
      {/* Hero */}
      <section className="bg-[#21313c] text-white py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-[#f0c14b] uppercase tracking-widest block mb-4"
              style={{ fontSize: '12px', letterSpacing: '0.2em' }}
            >
              University Policy
            </span>
            <h1
              className="text-white font-semibold mb-4"
              style={{ fontSize: isMobile ? '2rem' : '3rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Fee Refund Policy{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                – 2026
              </span>
            </h1>
            <p className="text-white/70 text-sm md:text-base max-w-2xl" style={{ lineHeight: 1.7 }}>
              The scope of this document is to define the fee refund rules for the New Batch 2026.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-16">

          {/* UGC Context */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#666] text-sm mb-4" style={{ lineHeight: 1.8 }}>
              The University Grants Commission has issued a Notification on Refund of Fees and Non-Retention of Original Certificates effective from October 2018 (&ldquo;UGC Notification&rdquo;).
            </p>
            <p className="text-[#666] text-sm" style={{ lineHeight: 1.8 }}>
              From Year 2020 onwards, the UGC formally notifies the last date of admission (i.e. cutoff date) and it is binding on the University to comply with such dates. The UGC Notification of 2018 provides a five-tier system for refund of fees as follows:
            </p>
          </motion.div>

          {/* Refund Table */}
          <motion.div
            className="overflow-x-auto rounded-xl bg-white mb-10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <table className="w-full">
              <thead className="bg-[#21313c] text-white">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold w-16">S.No.</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold">Point of Time When Notice of Withdrawal of Admission is Served to the University</th>
                  <th className="px-5 py-4 text-center text-xs font-semibold w-40">Percentage of Refund Aggregate Fee*</th>
                </tr>
              </thead>
              <tbody>
                {ugcRefundPolicy.map((slab, index) => (
                  <tr key={slab.id} className="border-b border-gray-100">
                    <td className="px-5 py-4 text-sm text-[#21313c] font-medium">{index + 1}</td>
                    <td className="px-5 py-4 text-sm text-[#666]">{slab.condition}</td>
                    <td className="px-5 py-4 text-sm font-bold text-center" style={{ color: slab.refundPercentage > 0 ? '#027ea1' : '#dc2626' }}>
                      {slab.refundPercentage > 0 ? `${slab.refundPercentage}%` : '0% (No Refund)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Aggregate Fee Note */}
          <motion.div
            className="bg-white rounded-xl p-6 mb-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-[#666] text-sm" style={{ lineHeight: 1.8 }}>
              <strong className="text-[#21313c]">* Aggregate Fee</strong> includes all amounts collected from the student including Caution Money. Caution money will be refunded in full irrespective of the date on which application of withdrawal is received.
            </p>
          </motion.div>

          {/* Processing Charges & Uniform */}
          <motion.div
            className="bg-white rounded-xl p-6 mb-6 shadow-sm space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[#666] text-sm" style={{ lineHeight: 1.8 }}>
              <strong className="text-[#21313c]">Processing charges</strong> – Rs. 5,000/- to be deducted from the amounts received before the refund payout is processed. However, notwithstanding this policy, any communication from UGC may have an overriding effect.
            </p>
            <p className="text-[#666] text-sm" style={{ lineHeight: 1.8 }}>
              <strong className="text-[#21313c]">Student Uniform set</strong> – In case, the student has been issued the official student blazer set, the student will be liable to return the same else, deduction of Rs. 2,500/- will be applicable from the amounts received before the refund payout is processed.
            </p>
          </motion.div>

          {/* Exception Handling */}
          <motion.div
            className="bg-white rounded-xl p-6 mb-10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-[#21313c] font-semibold text-lg mb-3">Exception Handling</h3>
            <p className="text-[#666] text-sm" style={{ lineHeight: 1.8 }}>
              In exceptional circumstances, JLU may admit students after the formally notified last date of admission. In such cases, Refund policy will stay the same as the table aforementioned, where formally notified last date of admission for such students shall be the individual date on which they have been admitted. This date will be considered in the column titled &ldquo;Point of time when notice of withdrawal of admission is served to the University&rdquo;.
            </p>
          </motion.div>

          {/* Procedure for Seeking a Refund */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3
              className="text-[#21313c] font-semibold mb-6"
              style={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}
            >
              Procedure for Seeking a Refund
            </h3>
            <div className="space-y-4">
              {refundProcess.map((p) => (
                <div key={p.step} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 bg-[#f0c14b] rounded-full flex items-center justify-center text-[#21313c] font-bold text-sm shrink-0">
                    {p.step}
                  </div>
                  <div>
                    <h4 className="text-[#21313c] font-semibold text-sm mb-1">{p.title}</h4>
                    <p className="text-[#666] text-sm" style={{ lineHeight: 1.7 }}>{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-[#21313c] rounded-xl p-6 md:p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/60 text-xs mb-1">Department</p>
                <p>{contactInformation.department}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Refund Requests</p>
                <p><a href={`mailto:${contactInformation.email}`} className="text-[#f0c14b] underline">{contactInformation.email}</a></p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Grievances</p>
                <p><a href={`mailto:${contactInformation.grievanceEmail}`} className="text-[#f0c14b] underline">{contactInformation.grievanceEmail}</a></p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Phone</p>
                <p>{contactInformation.phone}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Office</p>
                <p>{contactInformation.office}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Timings</p>
                <p>{contactInformation.timings}<br />{contactInformation.saturday}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
