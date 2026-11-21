// Program curriculum modules based on real JLU data
export interface Module {
  name: string;
  credits?: number;
}

export interface ProgramModules {
  programId: string;
  structure: {
    year?: number;
    semester?: number;
    title: string;
    modules: Module[];
  }[];
}

export const programModules: ProgramModules[] = [
  // BCA - Based on real JLU curriculum data
  {
    programId: 'bca',
    structure: [
      {
        title: 'Foundation Courses',
        modules: [
          { name: 'Mathematics' },
          { name: 'Digital Electronics' },
          { name: 'Computer Organization' },
          { name: 'Psychology' },
          { name: 'Design Thinking' },
          { name: 'Sustainability' },
        ],
      },
      {
        title: 'Programming & Development',
        modules: [
          { name: 'C Programming' },
          { name: 'Object Oriented Programming' },
          { name: 'Python Programming' },
          { name: 'HTML-CSS Javascript' },
          { name: 'Web Application Development' },
          { name: 'Mobile App Development' },
        ],
      },
      {
        title: 'Core Computer Science',
        modules: [
          { name: 'Database Management Systems' },
          { name: 'Data Structures and Algorithms' },
          { name: 'Operating Systems' },
          { name: 'Computer Networks' },
        ],
      },
      {
        title: 'Analytics & Advanced Topics',
        modules: [
          { name: 'Excel Analytics' },
          { name: 'Data Analytics' },
          { name: 'Machine Learning' },
        ],
      },
      {
        title: 'Experiential Learning',
        modules: [
          { name: 'Industry Project' },
          { name: 'Internship' },
        ],
      },
    ],
  },
  // BCA AI
  {
    programId: 'bca-ai',
    structure: [
      {
        title: 'Foundation & Programming',
        modules: [
          { name: 'Mathematics for AI' },
          { name: 'Python Programming' },
          { name: 'C Programming' },
          { name: 'Data Structures and Algorithms' },
          { name: 'Database Management Systems' },
        ],
      },
      {
        title: 'AI & Machine Learning',
        modules: [
          { name: 'Introduction to Artificial Intelligence' },
          { name: 'Machine Learning Fundamentals' },
          { name: 'Deep Learning' },
          { name: 'Natural Language Processing' },
          { name: 'Computer Vision' },
        ],
      },
      {
        title: 'Applied AI',
        modules: [
          { name: 'AI Application Development' },
          { name: 'Chatbot Development' },
          { name: 'AI for Business Analytics' },
          { name: 'AI Ethics and Responsible AI' },
        ],
      },
      {
        title: 'Practical Experience',
        modules: [
          { name: 'AI Project Work' },
          { name: 'Industry Internship' },
        ],
      },
    ],
  },
  // BCA Data Science
  {
    programId: 'bca-ds',
    structure: [
      {
        title: 'Foundation',
        modules: [
          { name: 'Mathematics & Statistics' },
          { name: 'Programming Fundamentals' },
          { name: 'Python Programming' },
          { name: 'Database Management' },
        ],
      },
      {
        title: 'Data Science Core',
        modules: [
          { name: 'Data Analytics' },
          { name: 'Data Visualization' },
          { name: 'Statistical Methods' },
          { name: 'Machine Learning for Data Science' },
          { name: 'Big Data Fundamentals' },
        ],
      },
      {
        title: 'Advanced Analytics',
        modules: [
          { name: 'Predictive Analytics' },
          { name: 'Business Intelligence' },
          { name: 'Data Mining' },
          { name: 'Excel Analytics' },
        ],
      },
      {
        title: 'Capstone',
        modules: [
          { name: 'Data Science Project' },
          { name: 'Industry Internship' },
        ],
      },
    ],
  },
  // B.Tech CSE
  {
    programId: 'btech-cse',
    structure: [
      {
        title: 'Engineering Foundation',
        modules: [
          { name: 'Engineering Mathematics' },
          { name: 'Engineering Physics' },
          { name: 'Engineering Chemistry' },
          { name: 'Engineering Graphics' },
          { name: 'Electrical & Electronics Engineering' },
        ],
      },
      {
        title: 'Programming & Algorithms',
        modules: [
          { name: 'Programming in C' },
          { name: 'C++ and Object Oriented Programming' },
          { name: 'Java Programming' },
          { name: 'Python Programming' },
          { name: 'Data Structures and Algorithms' },
        ],
      },
      {
        title: 'Core Computer Science',
        modules: [
          { name: 'Database Management Systems' },
          { name: 'Operating Systems' },
          { name: 'Computer Networks' },
          { name: 'Computer Organization and Architecture' },
          { name: 'Software Engineering' },
          { name: 'Theory of Computation' },
        ],
      },
      {
        title: 'Advanced Topics',
        modules: [
          { name: 'Machine Learning' },
          { name: 'Data Science' },
          { name: 'Web Development' },
          { name: 'Cloud Computing' },
          { name: 'Artificial Intelligence' },
        ],
      },
      {
        title: 'Laboratory & Projects',
        modules: [
          { name: 'Programming Lab (C, C++, Java, Python)' },
          { name: 'Database and Web Development Lab' },
          { name: 'Machine Learning and Data Science Lab' },
          { name: 'Computer Networking Lab' },
          { name: 'Major Project' },
          { name: 'Internship' },
        ],
      },
    ],
  },
  // B.Tech AI
  {
    programId: 'btech-ai',
    structure: [
      {
        title: 'Engineering Foundation',
        modules: [
          { name: 'Engineering Mathematics' },
          { name: 'Applied Physics' },
          { name: 'Programming Fundamentals' },
          { name: 'Digital Electronics' },
        ],
      },
      {
        title: 'AI Core',
        modules: [
          { name: 'Introduction to Artificial Intelligence' },
          { name: 'Machine Learning' },
          { name: 'Deep Learning' },
          { name: 'Natural Language Processing' },
          { name: 'Computer Vision' },
          { name: 'Neural Networks' },
        ],
      },
      {
        title: 'Supporting Technologies',
        modules: [
          { name: 'Data Structures & Algorithms' },
          { name: 'Database Management Systems' },
          { name: 'Big Data Analytics' },
          { name: 'Cloud Computing for AI' },
        ],
      },
      {
        title: 'Applied AI',
        modules: [
          { name: 'AI Application Development' },
          { name: 'Robotics and Automation' },
          { name: 'AI in Industry 4.0' },
          { name: 'Capstone Project' },
        ],
      },
    ],
  },
  // B.Tech Data Science
  {
    programId: 'btech-ds',
    structure: [
      {
        title: 'Foundation',
        modules: [
          { name: 'Engineering Mathematics & Statistics' },
          { name: 'Programming in Python' },
          { name: 'Data Structures' },
          { name: 'Database Systems' },
        ],
      },
      {
        title: 'Data Science Core',
        modules: [
          { name: 'Statistical Methods for Data Science' },
          { name: 'Machine Learning' },
          { name: 'Data Mining and Warehousing' },
          { name: 'Big Data Analytics' },
          { name: 'Data Visualization' },
        ],
      },
      {
        title: 'Advanced Analytics',
        modules: [
          { name: 'Deep Learning' },
          { name: 'Predictive Analytics' },
          { name: 'Business Intelligence' },
          { name: 'Cloud Computing' },
        ],
      },
      {
        title: 'Applications',
        modules: [
          { name: 'Data Science Project' },
          { name: 'Industry Internship' },
        ],
      },
    ],
  },
  // MBA
  {
    programId: 'mba',
    structure: [
      {
        title: 'First Year - Core Courses',
        modules: [
          { name: 'Managerial Economics' },
          { name: 'Financial Accounting' },
          { name: 'Marketing Management' },
          { name: 'Human Resource Management' },
          { name: 'Operations Management' },
          { name: 'Business Communication' },
          { name: 'Organizational Behavior' },
          { name: 'Business Statistics' },
        ],
      },
      {
        title: 'Second Year - Specializations',
        modules: [
          { name: 'Strategic Management' },
          { name: 'Business Analytics' },
          { name: 'Entrepreneurship Development' },
          { name: 'Elective Specialization Courses' },
        ],
      },
      {
        title: 'Practical Components',
        modules: [
          { name: 'Summer Internship Project' },
          { name: 'Live Industry Project' },
          { name: 'Management Dissertation' },
        ],
      },
    ],
  },
  // BA LLB
  {
    programId: 'ba-llb',
    structure: [
      {
        title: 'Foundation Law Courses',
        modules: [
          { name: 'Introduction to Law' },
          { name: 'Legal Methods' },
          { name: 'Constitutional Law I & II' },
          { name: 'Jurisprudence' },
          { name: 'Contract Law I & II' },
        ],
      },
      {
        title: 'Core Law Subjects',
        modules: [
          { name: 'Criminal Law' },
          { name: 'Tort Law' },
          { name: 'Family Law' },
          { name: 'Property Law' },
          { name: 'Administrative Law' },
          { name: 'Company Law' },
          { name: 'Environmental Law' },
        ],
      },
      {
        title: 'Arts Subjects',
        modules: [
          { name: 'Political Science' },
          { name: 'Economics' },
          { name: 'Sociology' },
          { name: 'History' },
        ],
      },
      {
        title: 'Practical Training',
        modules: [
          { name: 'Moot Court' },
          { name: 'Legal Drafting' },
          { name: 'Professional Ethics' },
          { name: 'Mandatory Internships' },
        ],
      },
    ],
  },
  // BBA LLB
  {
    programId: 'bba-llb',
    structure: [
      {
        title: 'Business Foundation',
        modules: [
          { name: 'Principles of Management' },
          { name: 'Business Economics' },
          { name: 'Financial Accounting' },
          { name: 'Marketing Management' },
        ],
      },
      {
        title: 'Core Law Subjects',
        modules: [
          { name: 'Constitutional Law' },
          { name: 'Contract Law' },
          { name: 'Corporate Law' },
          { name: 'Criminal Law' },
          { name: 'Intellectual Property Rights' },
          { name: 'Competition Law' },
        ],
      },
      {
        title: 'Business Law Integration',
        modules: [
          { name: 'Business Regulations' },
          { name: 'Taxation Law' },
          { name: 'Securities Law' },
          { name: 'Mergers & Acquisitions' },
        ],
      },
      {
        title: 'Practical Components',
        modules: [
          { name: 'Moot Court Competitions' },
          { name: 'Legal Drafting & Pleadings' },
          { name: 'Corporate Internships' },
        ],
      },
    ],
  },
  // BBA
  {
    programId: 'bba',
    structure: [
      {
        title: 'Foundation Courses',
        modules: [
          { name: 'Principles of Management' },
          { name: 'Business Economics' },
          { name: 'Business Mathematics & Statistics' },
          { name: 'Business Communication' },
        ],
      },
      {
        title: 'Core Business',
        modules: [
          { name: 'Financial Accounting' },
          { name: 'Marketing Management' },
          { name: 'Human Resource Management' },
          { name: 'Operations Management' },
          { name: 'Financial Management' },
          { name: 'Organizational Behavior' },
        ],
      },
      {
        title: 'Advanced Topics',
        modules: [
          { name: 'Strategic Management' },
          { name: 'Entrepreneurship Development' },
          { name: 'Business Analytics' },
          { name: 'Digital Marketing' },
        ],
      },
      {
        title: 'Practical Experience',
        modules: [
          { name: 'Live Industry Projects' },
          { name: 'Summer Internship' },
        ],
      },
    ],
  },
];

export const getModulesByProgramId = (programId: string): ProgramModules | undefined => {
  return programModules.find(m => m.programId === programId);
};
