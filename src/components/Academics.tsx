'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const philosophyCards = [
  {
    id: 1,
    title: 'Values-driven learning',
    description: 'Education rooted in ethics, purpose, and responsible leadership.',
  },
  {
    id: 2,
    title: 'Interdisciplinary structure',
    description: 'Programs designed to connect disciplines, ideas, and real-world application.',
  },
  {
    id: 3,
    title: 'Industry & research integration',
    description: 'Learning shaped by industry exposure, live projects, and active research.',
  },
];

const facultiesData = [
  {
    id: 1,
    name: 'Faculty of Management',
    schools: [
      'Jagran Lakecity Business School',
      'Jagran School of Sports Management',
      'Jagran School of Hospitality & Aviation Management',
      'Centre for Executive Education',
    ],
  },
  {
    id: 2,
    name: 'Faculty of Journalism & Social Science',
    schools: [
      'Jagran School of Journalism & Communication',
      'School of Social Sciences',
      'School of Psychology & Behavioral Sciences',
      'School of Public Policy & Governance',
    ],
  },
  {
    id: 3,
    name: 'Faculty of Fashion, Design & Arts',
    schools: [
      'School of Fashion Design',
      'School of Interior Design',
      'School of Visual Arts & Animation',
      'School of Fine Arts & Photography',
    ],
  },
  {
    id: 4,
    name: 'Faculty of Engineering & Technology',
    schools: [
      'School of Computer Science & Engineering',
      'School of Mechanical Engineering',
      'School of Civil Engineering',
      'School of Electronics & Communication',
      'School of Artificial Intelligence & Data Science',
    ],
  },
  {
    id: 5,
    name: 'Faculty of Pharmacy',
    schools: [
      'School of Pharmaceutical Sciences',
      'Department of Pharmacology',
      'Department of Pharmaceutical Chemistry',
      'Centre for Drug Research & Development',
    ],
  },
  {
    id: 6,
    name: 'Faculty of Law',
    schools: [
      'School of Legal Studies',
      'Centre for Constitutional Law',
      'Centre for Corporate & Business Law',
      'Legal Aid Clinic',
    ],
  },
  {
    id: 7,
    name: 'IICA - Jagran Centre for Creative Skills',
    schools: [
      'School of Film & Television',
      'School of Acting & Theatre',
      'School of Music Production',
      'School of Digital Media & Content Creation',
    ],
  },
];

const methodologyCards = [
  {
    id: 1,
    title: 'Experiential Learning',
    description: 'Jagran Lakecity University hosts a wide range of signature events that bring the campus to life. From academic conclaves, award ceremonies, and leadership forums to cultural showcases and student-led festivals, these events create shared experiences that define the university\'s vibrant atmosphere.',
  },
  {
    id: 2,
    title: 'Case-based teaching',
    description: 'JLU events go beyond celebration — they are platforms for learning and leadership development. Students gain exposure to real-world conversations, industry perspectives, and collaborative problem-solving while actively contributing to planning, execution, and participation.',
  },
  {
    id: 3,
    title: 'Global exposure',
    description: 'JLU events go beyond celebration — they are platforms for learning and leadership development. Students gain exposure to real-world conversations, industry perspectives, and collaborative problem-solving while actively contributing to planning, execution, and participation.',
  },
];

const testimonials = [
  {
    id: 1,
    quote: 'The interdisciplinary approach here allowed me to combine my passion for sustainable design with advanced engineering principles.',
    name: 'Mohit Sharma',
    role: 'Student at Jagran Lakecity Business School',
  },
  {
    id: 2,
    quote: 'The interdisciplinary approach here allowed me to combine my passion for sustainable design with advanced engineering principles.',
    name: 'Dr. Sarah Chen',
    role: 'Faculty of Management',
  },
];

const Academics = () => {
  const [openFaculty, setOpenFaculty] = useState<number | null>(2);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const toggleFaculty = (id: number) => {
    setOpenFaculty(openFaculty === id ? null : id);
  };

  return (
    <section className="w-screen m-0 p-0 overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative w-screen bg-[#d9d9d9] overflow-hidden m-0 p-0"
        style={{ minHeight: '100vh' }}
      >
        <div className="absolute inset-0 flex items-end px-[120px] pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#21313c] mb-4">
              Academics
            </h1>
            <p className="text-lg text-[#21313c]">
              Learning designed around people, purpose and progress
            </p>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Section */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Philosophy
          </h2>
          <div className="flex" style={{ gap: '64px' }}>
            {philosophyCards.map((card) => (
              <div
                key={card.id}
                className="bg-white flex flex-col"
                style={{ width: '373px', height: '538px' }}
              >
                {/* Image Placeholder */}
                <div className="bg-[#d9d9d9] flex-1" />
                {/* Content */}
                <div
                  style={{
                    width: '373px',
                    height: '281px',
                    paddingTop: '24px',
                    paddingRight: '24px',
                    paddingBottom: '80px',
                    paddingLeft: '24px',
                  }}
                >
                  <h3 className="text-lg font-bold text-[#21313c] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#21313c]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculties Overview Section */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Faculties Overview
          </h2>
          <div className="flex flex-col">
            {facultiesData.map((faculty) => (
              <div key={faculty.id} className="border-b border-gray-300">
                {openFaculty === faculty.id ? (
                  <div
                    className="bg-[#d9d9d9]"
                    style={{
                      maxWidth: '1200px',
                      height: '371px',
                      paddingTop: '24px',
                      paddingRight: '24px',
                      paddingLeft: '24px',
                      gap: '64px',
                    }}
                  >
                    <button
                      onClick={() => toggleFaculty(faculty.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-lg font-medium text-[#21313c]">
                        {faculty.name}
                      </span>
                      <span className="text-2xl text-[#21313c]">−</span>
                    </button>
                    {faculty.schools.length > 0 && (
                      <div className="mt-6">
                        <ul className="list-disc list-inside space-y-2">
                          {faculty.schools.map((school, index) => (
                            <li key={index} className="text-base text-[#21313c]">
                              {school}
                            </li>
                          ))}
                        </ul>
                        <a href="#" className="inline-block text-[#21313c] underline font-medium mt-4">
                          View Programs
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => toggleFaculty(faculty.id)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-medium text-[#21313c]">
                      {faculty.name}
                    </span>
                    <span className="text-2xl text-[#21313c]">+</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teaching Methodology Section */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Teaching Methodology
          </h2>
          <div className="flex justify-center">
            {methodologyCards.map((card, index) => (
              <div
                key={card.id}
                className="flex flex-col justify-between"
                style={{
                  width: '400px',
                  height: '514px',
                  padding: '24px',
                  backgroundColor: index === 0 ? '#e8e8e8' : index === 1 ? '#b8b8b8' : '#d9d9d9',
                }}
              >
                {/* Header with indicator */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#c4c4c4] rounded-full" />
                    <h3 className="text-xl font-bold text-[#21313c]">
                      {card.title}
                    </h3>
                  </div>
                  {/* Content */}
                  <p className="text-sm text-[#21313c] leading-relaxed">
                    {card.description}
                  </p>
                </div>
                {/* Read More */}
                <div>
                  <a href="#" className="text-sm text-[#21313c] underline font-medium">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student & Faculty Voices Section */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#21313c] mb-12">
            Student & Faculty Voices
          </h2>
          <div className="flex justify-center" style={{ gap: '24px' }}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col"
                style={{ width: '580px', minHeight: '380px' }}
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-[#d9d9d9] rounded-full mb-8" />
                {/* Quote */}
                <p className="text-base text-[#21313c] leading-relaxed mb-8 flex-1">
                  "{testimonial.quote}"
                </p>
                {/* Author */}
                <div>
                  <p className="text-xl font-bold text-[#21313c]">
                    {testimonial.name}
                  </p>
                  <p className="text-base text-[#21313c]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation arrows */}
          <div className="flex justify-center gap-16 mt-12">
            <button
              onClick={() => setCurrentTestimonial(Math.max(0, currentTestimonial - 1))}
              className="text-[#21313c] text-3xl font-light"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentTestimonial(Math.min(testimonials.length - 1, currentTestimonial + 1))}
              className="text-[#21313c] text-3xl font-light"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Academics };
export default Academics;
