'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components';
import { useRef } from 'react';

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Certificate Programs Data
const professionalCertificates = [
  {
    id: 1,
    title: 'MS Office & Power BI',
    subtitle: 'Professional Certification',
    duration: '4 months',
    fee: '₹21,500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    gradient: 'from-[#4a90a4] to-[#2d5a6a]',
    features: ['Basic to Expert', 'Real Projects', 'Industry Certificate'],
  },
  {
    id: 2,
    title: 'Cognitive Behaviour Therapy',
    subtitle: 'Healthcare Certificate',
    duration: 'Self-paced',
    fee: 'Contact Admissions',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    gradient: 'from-[#27ae60] to-[#1a7a42]',
    features: ['Online Learning', 'Expert Faculty', 'Professional Cert'],
  },
  {
    id: 3,
    title: 'Law & Economics',
    subtitle: 'Masterclass Series',
    duration: '6 Sessions',
    fee: 'Free',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    gradient: 'from-[#8e44ad] to-[#5f2c7a]',
    features: ['Expert Sessions', 'Case Studies', 'Research Focus'],
  },
  {
    id: 4,
    title: 'Law Teacher Training',
    subtitle: 'Professional Development',
    duration: 'Semester',
    fee: 'Contact Faculty',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80',
    gradient: 'from-[#e67e22] to-[#a85919]',
    features: ['Modern Tools', 'Research Training', 'Practical Approach'],
  },
];

export default function CertificationsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#f6f7f0] min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="relative w-screen overflow-hidden">
        <motion.div
          className="relative w-screen min-h-screen"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.8, ease: customEase }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
              alt="Certifications"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-black/40" style={{ opacity }} />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {/* Top Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="px-5 md:px-10 pt-28 md:pt-32"
          >
            <span className="inline-block bg-[#f0c14b]/20 backdrop-blur-sm border border-[#f0c14b]/30 text-[#f0c14b] text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              Professional Development
            </span>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white font-semibold leading-tight mt-4 text-lg md:text-2xl max-w-3xl"
            >
              Industry-recognized certifications designed to accelerate your career growth and open global opportunities.
            </motion.h2>
          </motion.div>

          {/* Large Title */}
          <div className="px-3 md:px-10 pb-0">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
              className="font-bold select-none text-[5rem] md:text-[clamp(7rem,14vw,14rem)] leading-[0.85] tracking-[-0.02em]"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 85%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Certifications
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Certificate Programs - Horizontal Cards */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="mb-12 md:mb-16"
          >
            <span className="text-[#999] uppercase tracking-widest text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
              Our Programs
            </span>
            <h2 className="text-[#21313c] text-4xl md:text-6xl font-bold leading-tight">
              Professional{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Certificates
              </span>
            </h2>
          </motion.div>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {professionalCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-60 group-hover:opacity-40 transition-opacity`} />

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#21313c] px-3 py-1 rounded-full text-xs font-semibold">
                      {cert.duration}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-2xl font-bold mb-1">{cert.title}</h3>
                    <p className="text-white/80 text-sm">{cert.subtitle}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {cert.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-[#f6f7f0] text-[#666] px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#999] mb-1">Investment</p>
                      <p className="text-2xl font-bold text-[#21313c]">{cert.fee}</p>
                    </div>
                    <Link
                      href="/admissions"
                      className="inline-flex items-center gap-2 bg-[#21313c] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#f0c14b] hover:text-[#21313c] transition-colors"
                    >
                      Apply Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#21313c] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: '42+', label: 'Industry Partners' },
              { value: '15+', label: 'Programs' },
              { value: '100%', label: 'Job-Ready' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-[#c3fd7a] text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Partnerships - Split Layout */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80"
            alt="Partnerships"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#21313c]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="mb-12"
          >
            <span className="text-[#f0c14b] uppercase tracking-widest text-xs mb-4 block" style={{ letterSpacing: '0.2em' }}>
              Global Recognition
            </span>
            <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
              Industry{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#c3fd7a' }}>
                Partnerships
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: 'ACCA', desc: 'Accounting Excellence' },
              { name: 'CIMA', desc: 'Management Accounting' },
              { name: 'Harvard', desc: 'Business Education' },
              { name: 'Adobe', desc: 'Creative Technology' },
            ].map((partner) => (
              <div
                key={partner.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#f0c14b] transition-colors">
                  <span className="text-white text-2xl font-bold group-hover:text-[#21313c]">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{partner.name}</h3>
                <p className="text-white/60 text-sm">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harvard Highlight - Full Width */}
      <section className="bg-gradient-to-br from-[#21313c] to-[#2d4050] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
            >
              <div className="inline-block px-4 py-2 bg-[#f0c14b]/20 border border-[#f0c14b]/30 rounded-full text-[#f0c14b] text-xs font-bold uppercase tracking-wider mb-4">
                Featured Partnership
              </div>
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
                Harvard Business{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#c3fd7a' }}>
                  Publishing
                </span>
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Pursue up to 6 online courses from Harvard Business School with digital certification. Access world-class case studies and business simulations.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Digital Certificates', 'Case Studies', 'Video Lectures', 'Simulations'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#c3fd7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 bg-white text-[#21313c] px-6 py-3 rounded-lg font-semibold hover:bg-[#f0c14b] transition-colors"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80"
                alt="Harvard Business School"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section className="bg-[#f6f7f0] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
            className="text-center mb-12"
          >
            <span className="text-[#999] uppercase tracking-widest text-xs mb-4 block">Why JLU</span>
            <h2 className="text-[#21313c] text-4xl md:text-6xl font-bold">
              Key{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                Benefits
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Industry Recognition', desc: 'Globally recognized certifications' },
              { title: 'Career Growth', desc: 'Fast-track your professional journey' },
              { title: 'Global Access', desc: 'International opportunities' },
              { title: 'Expert Faculty', desc: 'Learn from industry leaders' },
              { title: 'Practical Training', desc: 'Real-world projects' },
              { title: 'Flexible Learning', desc: 'Online and offline options' },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-[#21313c] text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-[#666] text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NSDC Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
              className="relative h-96 rounded-2xl overflow-hidden order-2 md:order-1"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80"
                alt="Skills Development"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: customEase }}
              className="order-1 md:order-2"
            >
              <span className="text-[#999] uppercase tracking-widest text-xs mb-3 block">
                Skill Development
              </span>
              <h2 className="text-[#21313c] text-3xl md:text-5xl font-bold mb-4">
                NSDC —{' '}
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
                  Creative Skills
                </span>
              </h2>
              <p className="text-[#666] text-lg mb-6 leading-relaxed">
                Partnership with NSDC Academy under Ministry of Skill Development & Entrepreneurship for cutting-edge skill training.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Industry-aligned programs',
                  'Celebrity mentorship',
                  'Real-world projects',
                  'Paid apprenticeships',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c3fd7a] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#21313c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#666]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#21313c] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: customEase }}
          >
            <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
              Ready to{' '}
              <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', color: '#c3fd7a' }}>
                Upskill?
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Start your certification journey today and unlock new career opportunities with industry-recognized credentials.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-[#f0c14b] text-[#21313c] px-10 py-4 rounded-full font-semibold hover:bg-white transition-colors text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                View Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
