export interface SchoolProgram {
  name: string;
  duration: string;
  degree: string;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  head?: string;
  programs: SchoolProgram[];
  highlights: string[];
  image: string;
}

export interface Faculty {
  id: string;
  name: string;
  shortName: string;
  description: string;
  dean?: string;
  head?: string;
  schools: School[];
  stats: { label: string; value: string }[];
}

export const faculties: Faculty[] = [
  {
    id: 'management',
    name: 'Faculty of Management & Commerce',
    shortName: 'Management',
    description:
      'Provides comprehensive education and training, fostering leadership and expertise in business, hospitality, tourism, and sports management through industry-relevant syllabi and practice-based learning.',
    dean: 'Dr. Ankush Sharma',
    stats: [
      { label: 'Programs', value: '8+' },
      { label: 'Placement', value: '85%' },
      { label: 'Highest CTC', value: '₹12 LPA' },
      { label: 'Recruiters', value: '100+' },
    ],
    schools: [
      {
        id: 'jlbs',
        name: 'Jagran Lakecity Business School',
        shortName: 'JLBS',
        tagline: 'Harvard Case Studies. EY Certifications. Global Exposure.',
        description:
          'JLBS is among the top-ranked business schools in Central India, offering a true choice-based credit system with customized specializations. Students gain access to Harvard Business School online courses with digital certificates, Six Sigma courses designed by Ernst & Young, and AI-backed business simulations. Add-on certifications in CMA (IMA, USA) and ACCA (UK) set graduates apart globally.',
        head: 'Dr. Ankush Sharma',
        programs: [
          { name: 'MBA', duration: '2 Years', degree: 'PG' },
          { name: 'MBA (Finance / Marketing / HR)', duration: '2 Years', degree: 'PG' },
          { name: 'Executive MBA', duration: '2 Years', degree: 'PG' },
          { name: 'BBA', duration: '3 Years', degree: 'UG' },
          { name: 'BBA Honours (Strategic Finance)', duration: '3 Years', degree: 'UG' },
          { name: 'BMS', duration: '3 Years', degree: 'UG' },
          { name: 'B.Com (Hons)', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Harvard Business School online courses with digital certificates',
          'Six Sigma certification designed by Ernst & Young (EY)',
          'Add-on certifications: CMA (IMA, USA), ACCA (UK)',
          'Bloomberg terminal access and finance lab',
          'International summer courses in UK/US',
          'Global partnerships: CBU (USA), UCL (UK), HTWG (Germany)',
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      },
      {
        id: 'sports-mgmt',
        name: 'Jagran School of Sports Management',
        shortName: 'Sports Mgmt',
        tagline: 'Where the Business of Sports Meets Academic Rigour.',
        description:
          'Prepares students for the rapidly growing sports industry by combining management fundamentals with the dynamics of the sports ecosystem. Students learn sports marketing, event management, athlete management, and sports law alongside hands-on industry exposure.',
        programs: [
          { name: 'BBA Sports Management', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Elite Athlete Scholarships — up to 100% fee waiver',
          'World-class sports facilities and professional coaching',
          'Industry exposure through live sports event management',
          'Chancellor Freeships for meritorious students',
        ],
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8ab812?w=800&q=80',
      },
      {
        id: 'hospitality',
        name: 'Jagran School of Hospitality & Aviation Management',
        shortName: 'Hospitality & Aviation',
        tagline: 'Training for Global Service Excellence.',
        description:
          'Designed for global service industries with a focus on professionalism, operational excellence, and customer experience. Approximately 90% of hospitality students are placed in 3-star and 5-star hotels. Training kitchens, restaurant simulations, and international culinary modules provide hands-on industry readiness.',
        head: 'Dr. Nafees Haider Naqvi',
        programs: [
          { name: 'B.Sc Hospitality & Hotel Administration', duration: '3 Years', degree: 'UG' },
          { name: 'B.Sc Culinary Arts', duration: '3 Years', degree: 'UG' },
          { name: 'BBA Aviation & Airport Management', duration: '3 Years', degree: 'UG' },
          { name: 'MBA Aviation & Hospitality Management', duration: '2 Years', degree: 'PG' },
          { name: 'Diploma in Food Production & Patisserie', duration: '1 Year', degree: 'Diploma' },
          { name: 'PG Diploma in Indian Culinary Arts', duration: '1 Year', degree: 'Diploma' },
        ],
        highlights: [
          '~90% students placed in 3-star and 5-star hotels',
          'Professional training kitchens and restaurant simulations',
          'Top recruiters: Oberoi, Taj, JW Marriott, The Leela',
          'International cuisine modules and food science training',
        ],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      },
    ],
  },
  {
    id: 'journalism',
    name: 'Faculty of Journalism & Communication',
    shortName: 'Journalism',
    description:
      'Cultivates media excellence, creative prowess, and industry expertise. Ranked #1 in Madhya Pradesh and Top 15 in India for media education, preparing students for dynamic careers in journalism, advertising, and event management.',
    dean: 'Prof. Diwakar Shukla',
    stats: [
      { label: 'Programs', value: '6+' },
      { label: 'India Rank', value: 'Top 15' },
      { label: 'MP Rank', value: '#1' },
      { label: 'Studio', value: '20,000 sq.ft' },
    ],
    schools: [
      {
        id: 'journalism',
        name: 'Jagran School of Journalism',
        shortName: 'Journalism',
        tagline: 'Part of Google News Lab University Network.',
        description:
          'Trains journalists to report with integrity, context, and curiosity across all media platforms. The school operates a state-of-the-art 20,000 sq. ft. dedicated media production studio and is part of the Google News Lab University Network. Curriculum covers foundations through specialist journalism with mandatory newsroom apprenticeships.',
        programs: [
          { name: 'BA Journalism & Mass Communication', duration: '3 Years', degree: 'UG' },
          { name: 'MA Journalism & Mass Communication', duration: '2 Years', degree: 'PG' },
        ],
        highlights: [
          '20,000 sq. ft. dedicated media production studio',
          'Part of Google News Lab University Network',
          'Industry collaboration with Wittyfeed for new media',
          'Mandatory newsroom apprenticeships and field reporting',
          'Ranked #19 in Mass Communication by The Week (2024)',
        ],
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      },
      {
        id: 'advertising-pr',
        name: 'Jagran School of Advertising & Public Relations',
        shortName: 'Advertising & PR',
        tagline: 'Creative Strategy Meets Brand Communication.',
        description:
          'Focuses on brand communication, creative strategy, and audience engagement in a rapidly evolving media world. Students learn consumer insights, advertising strategies, brand activation, reputation management, and the creator economy through agency apprenticeships and live projects.',
        head: 'Dr. Rushit Prabodhchandra Dubal',
        programs: [
          { name: 'BBA Advertising & Public Relations', duration: '3 Years', degree: 'UG' },
          { name: 'MA Advertising & Public Relations', duration: '2 Years', degree: 'PG' },
        ],
        highlights: [
          'Brand activation and reputation management training',
          'Agency apprenticeships with leading media firms',
          'Creator economy and social media strategy modules',
          'Media planning and real campaign execution',
        ],
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      },
      {
        id: 'events-entertainment',
        name: 'Jagran School of Events & Entertainment',
        shortName: 'Events & Entertainment',
        tagline: 'Live Events. Real Experience. Industry Ready.',
        description:
          'Prepares students for the dynamic fields of events, media, and entertainment through practical exposure. The curriculum emphasizes live event production, vendor management, and creative direction with hands-on portfolio building.',
        programs: [
          { name: 'BBA Events & Entertainment', duration: '3 Years', degree: 'UG' },
          { name: 'Diploma in Events Management', duration: '1 Year', degree: 'Diploma' },
        ],
        highlights: [
          'Live event management and production experience',
          'Industry internships with top event companies',
          'Creative direction and vendor management training',
          'Portfolio development through real events',
        ],
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      },
      {
        id: 'languages-social',
        name: 'Jagran School of Languages & Social Sciences',
        shortName: 'Languages & Social Sciences',
        tagline: 'Critical Thinking Through Language and Culture.',
        description:
          'Encourages cultural awareness, critical thinking, and communication through language and social inquiry. Programs foster deep analytical skills, creative expression, and understanding of human behaviour and society.',
        head: 'Dr. Rolii Ajay Khare',
        programs: [
          { name: 'BA (Hons.) Psychology', duration: '3 Years', degree: 'UG' },
          { name: 'BA English Literature', duration: '3 Years', degree: 'UG' },
          { name: 'BA Public Policy', duration: '3 Years', degree: 'UG' },
          { name: 'MA Psychology', duration: '2 Years', degree: 'PG' },
          { name: 'MA English Literature', duration: '2 Years', degree: 'PG' },
        ],
        highlights: [
          'Psychology labs and counseling practicum',
          'Creative writing workshops and literary criticism',
          'Research methodology and field case studies',
          'Guest lectures by eminent academics and practitioners',
        ],
        image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
      },
    ],
  },
  {
    id: 'design',
    name: 'Faculty of Fashion, Design & Arts',
    shortName: 'Design & Arts',
    description:
      'Nurtures creativity, critical thinking, and cultural understanding through innovative programs in design, architecture, fashion, and the visual arts. Home to a 20,000 sq. ft. dedicated design facility.',
    stats: [
      { label: 'Programs', value: '7+' },
      { label: 'Design Facility', value: '20,000 sq.ft' },
      { label: 'Industry Partner', value: 'ImaginXP' },
      { label: 'Placement', value: '100%' },
    ],
    schools: [
      {
        id: 'design',
        name: 'Jagran School of Design',
        shortName: 'Design',
        tagline: 'Powered by ImaginXP. Partnered with NVIDIA.',
        description:
          'Partners with ImaginXP — India\'s leading UX design organization that has trained 15,000+ professionals — to deliver industry-led design education. The school offers access to a state-of-the-art 20,000 sq. ft. dedicated facility with digital design, graphics, film, animation, and media production spaces. Industry partnerships with NVIDIA, ITC, KPIT, and Toshiba-Mitsubishi.',
        programs: [
          { name: 'B.Des UI/UX Design', duration: '4 Years', degree: 'UG' },
          { name: 'B.Des Graphic Design', duration: '4 Years', degree: 'UG' },
          { name: 'B.Des Animation & Film Design', duration: '4 Years', degree: 'UG' },
          { name: 'B.Des Fashion Communication', duration: '4 Years', degree: 'UG' },
          { name: 'M.Des UI/UX Design', duration: '2 Years', degree: 'PG' },
          { name: 'Bachelor of Visual Arts', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Partnership with ImaginXP (trained 15,000+ design professionals)',
          '20,000 sq. ft. design studio with industry-standard tools',
          'Industry partners: NVIDIA, ITC, KPIT, Toshiba-Mitsubishi',
          '100% placement assistance with mandatory internships',
        ],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      },
      {
        id: 'architecture',
        name: 'Jagran School of Architecture',
        shortName: 'Architecture',
        tagline: 'Designing Spaces That Respond to People and Context.',
        description:
          'Balances creativity with structure, preparing students to design spaces that respond to people and context. The 5-year program integrates design studios with site visits, CAD/BIM training, and mandatory internships with architecture firms.',
        programs: [
          { name: 'B.Arch', duration: '5 Years', degree: 'UG' },
        ],
        highlights: [
          'Design studios led by expert faculty',
          'CAD, BIM and 3D modelling training',
          'Study tours and live site visit programs',
          'Internships with leading architecture firms',
        ],
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
      },
      {
        id: 'fashion',
        name: 'Jagran School of Fashion',
        shortName: 'Fashion',
        tagline: 'Where Culture, Creativity, and Industry Converge.',
        description:
          'Explores fashion as culture, creativity, and industry — blending design sensibility with practical insight. Students participate in fashion shows, exhibitions, and industry collaborations while mastering textile design, pattern making, and fashion marketing.',
        programs: [
          { name: 'B.Des Fashion Design', duration: '4 Years', degree: 'UG' },
          { name: 'B.Des Interior Design', duration: '4 Years', degree: 'UG' },
        ],
        highlights: [
          'Annual fashion shows and design exhibitions',
          'Collaborations with fashion brands and studios',
          'Textile design and sustainable fashion modules',
          'Portfolio-driven curriculum with industry mentors',
        ],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Faculty of Engineering & Technology',
    shortName: 'Engineering',
    description:
      'Advances innovation and technical expertise through cutting-edge programs with 9 specialized laboratories. Curriculum is revised yearly to stay current with emerging technologies in AI, blockchain, IoT, and robotics.',
    head: 'Dr. Dileep Kumar Singh',
    stats: [
      { label: 'Programs', value: '10+' },
      { label: 'Labs', value: '9 Specialized' },
      { label: 'IBM Partnership', value: 'Active' },
      { label: 'Robotics', value: 'Singapore Tie-up' },
    ],
    schools: [
      {
        id: 'ai',
        name: 'Jagran School of Artificial Intelligence',
        shortName: 'AI',
        tagline: 'Data-Driven Thinking. Intelligent Systems.',
        description:
          'Focused on emerging technologies, data-driven thinking, and intelligent systems. Students build expertise in AI, machine learning, data analytics, cybersecurity, and cloud computing through hands-on projects and industry mentorship.',
        programs: [
          { name: 'B.Tech AI & Machine Learning', duration: '4 Years', degree: 'UG' },
          { name: 'B.Tech Data Science', duration: '4 Years', degree: 'UG' },
          { name: 'BCA Artificial Intelligence', duration: '3 Years', degree: 'UG' },
          { name: 'BCA Data Science', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Machine Learning & Data Science Lab',
          'Specialisations in AI, ML, Data Analytics, Cybersecurity',
          'IBM collaboration for Blockchain & IoT courses',
          'Annual curriculum revision for contemporary technologies',
        ],
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      },
      {
        id: 'engineering',
        name: 'Jagran School of Engineering',
        shortName: 'Engineering',
        tagline: 'Strong Foundations. Industry Awareness.',
        description:
          'Offers strong technical foundations combined with practical learning and industry awareness across mechanical, civil, electronics, and computer science disciplines. Nine specialized laboratories including a robotics lab in collaboration with a Singapore university provide real-world research experience.',
        head: 'Dr. Dileep Kumar Singh',
        programs: [
          { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', degree: 'UG' },
          { name: 'B.Tech Electronics & Communication', duration: '4 Years', degree: 'UG' },
          { name: 'B.Tech Civil Engineering', duration: '4 Years', degree: 'UG' },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', degree: 'UG' },
        ],
        highlights: [
          '9 specialized laboratories for hands-on training',
          'Robotics lab in collaboration with Singapore university',
          'Programming, Database, Networking, and Project labs',
          'Admission via JLUET entrance test + interview',
        ],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      },
      {
        id: 'computer-application',
        name: 'Jagran School of Computer Applications',
        shortName: 'Computer Applications',
        tagline: 'Software. Computing. Digital Solutions.',
        description:
          'Prepares students for careers in software development, computing, and digital solutions through hands-on learning. Core curriculum covers programming languages, database management, networking, and web technologies with electives in AI, ML, cybersecurity, and cloud computing.',
        programs: [
          { name: 'BCA', duration: '3 Years', degree: 'UG' },
          { name: 'MCA', duration: '2 Years', degree: 'PG' },
          { name: 'B.Sc Computer Science', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Full-stack web and mobile development training',
          'Electives in AI, ML, Cybersecurity, Cloud Computing',
          'Industry internship program with leading tech firms',
          'Strong placement record in IT sector',
        ],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    shortName: 'Pharmacy',
    description:
      'Offers state-of-the-art pharmaceutical education emphasising both theoretical knowledge and practical skills. Students gain expertise through specialized laboratories, hospital training, and research opportunities in pharmaceutical sciences.',
    stats: [
      { label: 'Programs', value: '2' },
      { label: 'Labs', value: 'Specialized' },
      { label: 'Duration', value: '4 Years' },
      { label: 'Training', value: 'Hospital' },
    ],
    schools: [
      {
        id: 'pharmacy',
        name: 'School of Pharmaceutical Sciences',
        shortName: 'Pharma Sciences',
        tagline: 'Where Science Meets Healthcare.',
        description:
          'Combines rigorous scientific learning with responsibility, preparing students for careers in healthcare, research, and pharmaceutical sciences. The program includes hospital pharmacy training, research opportunities, and industry internships alongside comprehensive lab work.',
        programs: [
          { name: 'B.Pharma', duration: '4 Years', degree: 'UG' },
          { name: 'M.Pharma', duration: '2 Years', degree: 'PG' },
        ],
        highlights: [
          'State-of-the-art pharmaceutical laboratories',
          'Hospital pharmacy training and clinical exposure',
          'Research opportunities and publication support',
          'Industry internships with pharmaceutical companies',
        ],
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
      },
    ],
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    shortName: 'Law',
    description:
      'Develops legal professionals with clarity of thought, ethical grounding, and practical understanding of the law. All programs are mapped to European Teaching and Learning standards as part of the Tuning India project.',
    dean: 'Prof. (Dr.) Sachin Rastogi',
    stats: [
      { label: 'Programs', value: '7+' },
      { label: 'Global Bodies', value: '10+' },
      { label: 'Moot Court', value: 'International' },
      { label: 'Library', value: '35,000+ Books' },
    ],
    schools: [
      {
        id: 'law',
        name: 'Faculty of Law',
        shortName: 'Law',
        tagline: 'International Moot Courts. Global Legal Partnerships.',
        description:
          'Offers exceptional undergraduate, postgraduate, and research programs mapped to European Teaching and Learning standards. The faculty hosts the prestigious AUAP-JLU International Moot Court Competition and maintains partnerships with IALS, European Law Institute, World Bank\'s Global Forum on Law, and universities worldwide through EU Erasmus+ programs.',
        head: 'Prof. (Dr.) Sachin Rastogi',
        programs: [
          { name: 'BA LLB (Hons.)', duration: '5 Years', degree: 'UG' },
          { name: 'BBA LLB (Hons.)', duration: '5 Years', degree: 'UG' },
          { name: 'LLB', duration: '3 Years', degree: 'UG' },
          { name: 'BBA Business & Law', duration: '3 Years', degree: 'UG' },
          { name: 'LLM (Corporate / Criminal / Cyber / Taxation)', duration: '1 Year', degree: 'PG' },
          { name: 'Ph.D. Law', duration: '3 Years', degree: 'PhD' },
        ],
        highlights: [
          'AUAP-JLU International Moot Court Competition host',
          'Partnerships: IALS, European Law Institute, World Bank',
          'EU Erasmus+ international exchange programs',
          'Collaborations with NLIU Bhopal, NLSIU Bengaluru, University of Deusto',
          'Well-appointed moot court and 35,000+ volume library',
        ],
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      },
    ],
  },
  {
    id: 'iica',
    name: 'IICA — Jagran Centre for Creative Skills',
    shortName: 'IICA Creative',
    description:
      'India\'s first industry-led creative incubator in collaboration with NSDC Academy and the Ministry of Skill Development. Offers cutting-edge programs with mentorship from Oscar winners and Padma Shri awardees.',
    stats: [
      { label: 'Mentors', value: 'Oscar Winners' },
      { label: 'Apprenticeship', value: 'Paid' },
      { label: 'Partners', value: 'London Film School' },
      { label: 'Campuses', value: '4 Cities' },
    ],
    schools: [
      {
        id: 'iica-creative',
        name: 'Jagran Centre for Creative Skills',
        shortName: 'JCCS',
        tagline: 'Mentored by Oscar Winners. Powered by NSDC.',
        description:
          'India\'s first industry-led creative incubator offering future-ready careers in media and entertainment. All degree programs include 6–12 months of paid apprenticeship. Students receive mentorship from industry legends including Resul Pookutty (Oscar-winning Sound Designer), Shankar Mahadevan, and Padma Shri awardees. International partnerships with London Film School, NIPDB, and Toon Boom.',
        programs: [
          { name: 'B.Sc Immersive Media & Digital Experience Design', duration: '3 Years', degree: 'UG' },
          { name: 'BA Acting & Performing Arts', duration: '3 Years', degree: 'UG' },
          { name: 'BBA Events & Experiential Management', duration: '3 Years', degree: 'UG' },
          { name: 'BA Digital Content Design & Monetisation', duration: '3 Years', degree: 'UG' },
          { name: 'B.Sc Animation & Game Production', duration: '3 Years', degree: 'UG' },
          { name: 'B.Sc Sound Design & Music Production', duration: '3 Years', degree: 'UG' },
        ],
        highlights: [
          'Mentorship: Resul Pookutty (Oscar winner), Shankar Mahadevan, Padma Shri awardees',
          '6–12 months paid apprenticeship in every degree program',
          'International partnerships: London Film School, NIPDB, Toon Boom',
          'IP creation focus with real-world project-based learning',
          'Certification courses in Makeup & Prosthetics, DJ/VJ, AI Photography',
        ],
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
      },
    ],
  },
];
