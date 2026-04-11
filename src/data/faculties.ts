export interface SchoolProgram {
  name: string;
  duration: string;
  degree: string;
  slug?: string;
}

export interface DeanContact {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  image?: string;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  head?: string;
  deanContact?: DeanContact;
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
    name: 'Faculty of Management',
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
        deanContact: {
          name: 'Prof. (Dr.) Kishore Kumar Morya',
          title: 'Dean, Faculty of Management',
          phone: '7471110177',
          linkedin: 'https://www.linkedin.com/in/kishorekumarmorya/',
          image: '/kishore-kumar-morya.png',
        },
        programs: [
          { name: 'BBA*', duration: '3 Years', degree: 'UG', slug: 'bachelor-of-business-administration' },
          { name: 'B.Com*', duration: '3 Years', degree: 'UG', slug: 'bachelor-of-commerce' },
          { name: 'BMS* (Marketing / Finance / HR / Risk Management / Business Analytics)', duration: '3 Years', degree: 'UG', slug: 'bms' },
          { name: 'MBA (Marketing / Finance / HR / Logistics & Supply Chain)', duration: '2 Years', degree: 'PG', slug: 'master-of-business-administration' },
          { name: 'MBA (Business Analytics)', duration: '2 Years', degree: 'PG', slug: 'mba-business-analytics' },
          { name: 'MBA (Family Business)', duration: '2 Years', degree: 'PG', slug: 'mba-family-business' },
        ],
        highlights: [
          'Harvard Business School online courses with digital certificates',
          'Six Sigma certification designed by Ernst & Young (EY)',
          'Add-on certifications: CMA (IMA, USA), ACCA (UK)',
          'Bloomberg terminal access and finance lab',
          'International summer courses in UK/US',
          'Global partnerships: CBU (USA), UCL (UK), HTWG (Germany)',
        ],
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
      },
      {
        id: 'sports-mgmt',
        name: 'Jagran School of Physical Education and Sports Science',
        shortName: 'Sports Management',
        tagline: 'Where the Business of Sports Meets Academic Rigour.',
        description:
          'Prepares students for the rapidly growing sports industry by combining management fundamentals with the dynamics of the sports ecosystem. Students learn sports marketing, event management, athlete management, and sports law alongside hands-on industry exposure.',
        deanContact: {
          name: 'Prof. (Dr.) Kishore Kumar Morya',
          title: 'Dean, Faculty of Management',
          phone: '7471110177',
          linkedin: 'https://www.linkedin.com/in/kishorekumarmorya/',
          image: '/kishore-kumar-morya.png',
        },
        programs: [
          { name: 'BBA Sports Management', duration: '3 Years', degree: 'UG', slug: 'bba-sports-management' },
          { name: 'Bachelor of Physical Education and Sports Science', duration: '3 Years', degree: 'UG', slug: 'bachelor-of-physical-education-sports-science' },
          { name: 'Master of Physical Education and Sports Science', duration: '2 Years', degree: 'PG', slug: 'master-of-physical-education-sports-science' },
        ],
        highlights: [
          'Elite Athlete Scholarships — up to 100% fee waiver',
          'World-class sports facilities and professional coaching',
          'Industry exposure through live sports event management',
          'Chancellor Freeships for meritorious students',
        ],
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
      },
      {
        id: 'hospitality',
        name: 'Jagran School of Hospitality & Tourism',
        shortName: 'Hospitality & Aviation',
        tagline: 'Training for Global Service Excellence.',
        description:
          'Designed for global service industries with a focus on professionalism, operational excellence, and customer experience. Approximately 90% of hospitality students are placed in 3-star and 5-star hotels. Training kitchens, restaurant simulations, and international culinary modules provide hands-on industry readiness.',
        head: 'Dr. Nafees Haider Naqvi',
        deanContact: {
          name: 'Prof. (Dr.) Kishore Kumar Morya',
          title: 'Dean, Faculty of Management',
          phone: '7471110177',
          linkedin: 'https://www.linkedin.com/in/kishorekumarmorya/',
          image: '/kishore-kumar-morya.png',
        },
        programs: [
          { name: 'B.Sc (Hospitality and Hotel Administration)', duration: '3 Years', degree: 'UG', slug: 'bsc-hospitality-hotel-administration' },
          { name: 'BBA (Aviation and Airport Management)', duration: '3 Years', degree: 'UG', slug: 'bba-aviation-airport-management' },
        ],
        highlights: [
          '~90% students placed in 3-star and 5-star hotels',
          'Professional training kitchens and restaurant simulations',
          'Top recruiters: Oberoi, Taj, JW Marriott, The Leela',
          'International cuisine modules and food science training',
        ],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      },
    ],
  },
  {
    id: 'journalism',
    name: 'Faculty of Media & Social Science',
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
          'Trains journalists to report with integrity, context, and curiosity across all media platforms. The school operates a state-of-the-art 20,000 sq. ft. dedicated media production studio and is part of the Google News Lab University Network.',
        deanContact: {
          name: 'Dr. Rushit Dubal',
          title: 'Assistant Dean — Faculty of Media & Social Science',
          phone: '+91 747 111 0122',
          linkedin: 'https://www.linkedin.com/in/dr-rushit-dubal-9a802aa/',
          image: '/dr-rushit-dubal.jpg',
        },
        programs: [
          { name: 'BA Journalism and Mass Communication*', duration: '3 Years', degree: 'UG', slug: 'bachelor-journalism-mass-communication' },
          { name: 'MA (Mass Communication)', duration: '2 Years', degree: 'PG', slug: 'ma-journalism-mass-communication' },
        ],
        highlights: [
          '20,000 sq. ft. dedicated media production studio',
          'Part of Google News Lab University Network',
          'Industry collaboration with Wittyfeed for new media',
          'Mandatory newsroom apprenticeships and field reporting',
          'Ranked #19 in Mass Communication by The Week (2024)',
        ],
        image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
      },
      {
        id: 'advertising-pr',
        name: 'Jagran School of Advertising and Public Relations',
        shortName: 'Advertising & PR',
        tagline: 'Creative Strategy Meets Brand Communication.',
        description:
          'Focuses on brand communication, creative strategy, and audience engagement in a rapidly evolving media world.',
        head: 'Dr. Rushit Prabodhchandra Dubal',
        deanContact: {
          name: 'Dr. Rushit Dubal',
          title: 'Assistant Dean — Faculty of Media & Social Science',
          phone: '+91 747 111 0122',
          linkedin: 'https://www.linkedin.com/in/dr-rushit-dubal-9a802aa/',
          image: '/dr-rushit-dubal.jpg',
        },
        programs: [
          { name: 'BBA Advertising and PR', duration: '3 Years', degree: 'UG', slug: 'bba-advertising-pr' },
          { name: 'MBA Advertising and PR', duration: '2 Years', degree: 'PG', slug: 'mba-advertising-pr' },
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
        name: 'Jagran School of Events and Entertainment',
        shortName: 'Events & Entertainment',
        tagline: 'Live Events. Real Experience. Industry Ready.',
        description:
          'Prepares students for the dynamic fields of events, media, and entertainment through practical exposure.',
        programs: [
          { name: 'BBA Events and Entertainment', duration: '3 Years', degree: 'UG', slug: 'bba-events-entertainment' },
        ],
        highlights: [
          'Live event management and production experience',
          'Industry internships with top event companies',
          'Creative direction and vendor management training',
          'Portfolio development through real events',
        ],
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      },
      {
        id: 'languages-social',
        name: 'Jagran School of Languages & Social Science',
        shortName: 'Languages & Social Sciences',
        tagline: 'Critical Thinking Through Language and Culture.',
        description:
          'Encourages cultural awareness, critical thinking, and communication through language and social inquiry.',
        head: 'Dr. Rolii Ajay Khare',
        programs: [
          { name: 'BA English Literature*', duration: '3 Years', degree: 'UG', slug: 'ba-english' },
          { name: 'BA Psychology*', duration: '3 Years', degree: 'UG', slug: 'ba-psychology' },
          { name: 'BA Economics*', duration: '3 Years', degree: 'UG', slug: 'ba-economics' },
          { name: 'BA Public Policy*', duration: '3 Years', degree: 'UG', slug: 'ba-public-policy' },
          { name: 'MA English Literature', duration: '2 Years', degree: 'PG', slug: 'ma-english-literature' },
          { name: 'MA Psychology', duration: '2 Years', degree: 'PG', slug: 'ma-psychology' },
        ],
        highlights: [
          'Psychology labs and counseling practicum',
          'Creative writing workshops and literary criticism',
          'Research methodology and field case studies',
          'Guest lectures by eminent academics and practitioners',
        ],
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      },
    ],
  },
  {
    id: 'design',
    name: 'Faculty of Fashion, Design & Arts',
    shortName: 'Design & Arts',
    description:
      'Nurtures creativity, critical thinking, and cultural understanding through innovative programs in design, architecture, fashion, and the visual arts.',
    stats: [
      { label: 'Programs', value: '7+' },
      { label: 'Design Facility', value: '20,000 sq.ft' },
      { label: 'Industry Partner', value: 'ImaginXP' },
      { label: 'Placement', value: '100%' },
    ],
    schools: [
      {
        id: 'design',
        name: 'School of Design',
        shortName: 'Design',
        tagline: 'Powered by ImaginXP. Partnered with NVIDIA.',
        description:
          'Partners with ImaginXP — India\'s leading UX design organization that has trained 15,000+ professionals — to deliver industry-led design education.',
        deanContact: {
          name: 'Dr. Manika Walia',
          title: 'Dean, Faculty of Fashion, Design & Art',
          linkedin: 'https://www.linkedin.com/in/manika-walia-77628a107',
          image: '/manika-walia.png',
        },
        programs: [
          { name: 'B.Des (User Experience Design)', duration: '4 Years', degree: 'UG', slug: 'bdes-ui-ux-design' },
          { name: 'B.Des (Animation and Film Design)', duration: '4 Years', degree: 'UG', slug: 'bdes-animation-film-design' },
          { name: 'B.Des (Graphic Design)', duration: '4 Years', degree: 'UG', slug: 'bdes-graphic-design' },
          { name: 'B.Des (Interior Architecture)', duration: '4 Years', degree: 'UG', slug: 'bdes-interior-design' },
          { name: 'M.Des (User Experience Design)', duration: '2 Years', degree: 'PG', slug: 'mdes-ui-ux-design' },
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
        name: 'School of Architecture',
        shortName: 'Architecture',
        tagline: 'Designing Spaces That Respond to People and Context.',
        description:
          'Balances creativity with structure, preparing students to design spaces that respond to people and context.',
        deanContact: {
          name: 'Dr. Manika Walia',
          title: 'Dean, Faculty of Fashion, Design & Art',
          linkedin: 'https://www.linkedin.com/in/manika-walia-77628a107',
          image: '/manika-walia.png',
        },
        programs: [
          { name: 'B.Arch', duration: '5 Years', degree: 'UG', slug: 'bachelor-of-architecture' },
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
        name: 'School of Fashion',
        shortName: 'Fashion',
        tagline: 'Where Culture, Creativity, and Industry Converge.',
        description:
          'Explores fashion as culture, creativity, and industry — blending design sensibility with practical insight.',
        deanContact: {
          name: 'Dr. Manika Walia',
          title: 'Dean, Faculty of Fashion, Design & Art',
          linkedin: 'https://www.linkedin.com/in/manika-walia-77628a107',
          image: '/manika-walia.png',
        },
        programs: [
          { name: 'B.Des (Fashion Communication)', duration: '4 Years', degree: 'UG', slug: 'bdes-fashion-communication' },
        ],
        highlights: [
          'Annual fashion shows and design exhibitions',
          'Collaborations with fashion brands and studios',
          'Textile design and sustainable fashion modules',
          'Portfolio-driven curriculum with industry mentors',
        ],
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
      },
    ],
  },
  {
    id: 'engineering',
    name: 'Faculty of Science & Technology',
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
          'Focused on emerging technologies, data-driven thinking, and intelligent systems.',
        programs: [
          { name: 'B.Tech (Artificial Intelligence)', duration: '4 Years', degree: 'UG', slug: 'btech-artificial-intelligence' },
          { name: 'B.Tech (Data Science)', duration: '4 Years', degree: 'UG', slug: 'btech-data-science' },
          { name: 'M.Tech (Artificial Intelligence)', duration: '2 Years', degree: 'PG', slug: 'mtech-artificial-intelligence' },
          { name: 'M.Tech (Data Science)', duration: '2 Years', degree: 'PG', slug: 'mtech-data-science' },
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
          'Offers strong technical foundations combined with practical learning and industry awareness.',
        head: 'Dr. Dileep Kumar Singh',
        programs: [
          { name: 'B.Tech (Computer Science and Engineering)', duration: '4 Years', degree: 'UG', slug: 'btech-computer-science-engineering' },
          { name: 'B.Tech (Robotics and Automation)', duration: '4 Years', degree: 'UG', slug: 'btech-robotics-automation' },
          { name: 'B.Tech (Sustainable Engineering)', duration: '4 Years', degree: 'UG', slug: 'btech-sustainable-engineering' },
          { name: 'M.Tech (Computer Science and Engineering)', duration: '2 Years', degree: 'PG', slug: 'mtech-computer-science-engineering' },
        ],
        highlights: [
          '9 specialized laboratories for hands-on training',
          'Robotics lab in collaboration with Singapore university',
          'Programming, Database, Networking, and Project labs',
          'Admission via JLUET entrance test + interview',
        ],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      },
      {
        id: 'computer-application',
        name: 'Jagran School of Computer Application',
        shortName: 'Computer Applications',
        tagline: 'Software. Computing. Digital Solutions.',
        description:
          'Prepares students for careers in software development, computing, and digital solutions through hands-on learning.',
        programs: [
          { name: 'BCA* (General)', duration: '3 Years', degree: 'UG', slug: 'bachelor-of-computer-application' },
          { name: 'BCA* (Data Science)', duration: '3 Years', degree: 'UG', slug: 'bca-data-science' },
          { name: 'BCA* (User Experience)', duration: '3 Years', degree: 'UG', slug: 'bca-user-experience' },
          { name: 'BCA* (Full Stack Development)', duration: '3 Years', degree: 'UG', slug: 'bca-full-stack-development' },
          { name: 'BCA* (Cloud Computing)', duration: '3 Years', degree: 'UG', slug: 'bca-cloud-computing' },
        ],
        highlights: [
          'Full-stack web and mobile development training',
          'Electives in AI, ML, Cybersecurity, Cloud Computing',
          'Industry internship program with leading tech firms',
          'Strong placement record in IT sector',
        ],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    shortName: 'Pharmacy',
    description:
      'Offers state-of-the-art pharmaceutical education emphasising both theoretical knowledge and practical skills.',
    stats: [
      { label: 'Programs', value: '1' },
      { label: 'Labs', value: 'Specialized' },
      { label: 'Duration', value: '4 Years' },
      { label: 'Training', value: 'Hospital' },
    ],
    schools: [
      {
        id: 'pharmacy',
        name: 'Faculty of Pharmacy',
        shortName: 'Pharmacy',
        tagline: 'Where Science Meets Healthcare.',
        description:
          'Combines rigorous scientific learning with responsibility, preparing students for careers in healthcare, research, and pharmaceutical sciences.',
        programs: [
          { name: 'B.Pharma', duration: '4 Years', degree: 'UG', slug: 'bachelor-of-pharmacy' },
        ],
        highlights: [
          'State-of-the-art pharmaceutical laboratories',
          'Hospital pharmacy training and clinical exposure',
          'Research opportunities and publication support',
          'Industry internships with pharmaceutical companies',
        ],
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
      },
    ],
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    shortName: 'Law',
    description:
      'Develops legal professionals with clarity of thought, ethical grounding, and practical understanding of the law.',
    dean: 'Prof. (Dr.) Sachin Rastogi',
    stats: [
      { label: 'Programs', value: '8' },
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
          'Offers exceptional undergraduate, postgraduate, and research programs mapped to European Teaching and Learning standards.',
        head: 'Prof. (Dr.) Sachin Rastogi',
        deanContact: {
          name: 'Prof. (Dr.) Sachin Rastogi',
          title: 'Dean, Faculty of Law',
          phone: '08130810940',
          email: 'drsachin.rastogi@jlu.edu.in',
          linkedin: 'https://www.linkedin.com/in/dr-sachin-rastogi-6459a225/',
          image: '/sachin-rastogi.jpg',
        },
        programs: [
          { name: 'BA LLB (Hons)', duration: '5 Years', degree: 'UG', slug: 'ba-llb-integrated' },
          { name: 'BBA LLB (Hons)', duration: '5 Years', degree: 'UG', slug: 'bba-llb-integrated' },
          { name: 'BBA Business and Law', duration: '3 Years', degree: 'UG', slug: 'bba-business-and-law' },
          { name: 'LLB', duration: '3 Years', degree: 'UG', slug: 'llb' },
          { name: 'LLM (Corporate and IP Law)', duration: '1 Year', degree: 'PG', slug: 'master-of-laws' },
          { name: 'LLM (Cyber Law and Cyber Security)', duration: '1 Year', degree: 'PG', slug: 'llm-cyber-law' },
          { name: 'LLM (Criminal Law and Criminal Justice)', duration: '1 Year', degree: 'PG', slug: 'llm-criminal-law' },
          { name: 'LLM (Constitutional Law)', duration: '1 Year', degree: 'PG', slug: 'llm-constitutional-law' },
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
    name: 'IICA - Jagran Centre for Creative Skills',
    shortName: 'IICA Creative',
    description:
      'India\'s first industry-led creative incubator in collaboration with NSDC Academy and the Ministry of Skill Development.',
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
          'India\'s first industry-led creative incubator offering future-ready careers in media and entertainment.',
        programs: [
          { name: 'B.Sc. Animation & Game Production', duration: '3 Years', degree: 'UG', slug: 'bsc-animation-game-production' },
        ],
        highlights: [
          'Mentorship: Resul Pookutty (Oscar winner), Shankar Mahadevan, Padma Shri awardees',
          '6–12 months paid apprenticeship in every degree program',
          'International partnerships: London Film School, NIPDB, Toon Boom',
          'IP creation focus with real-world project-based learning',
        ],
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      },
    ],
  },
];
