export interface ScholarshipLevel {
  id: string;
  level: string;
  rank: string;
  reward: string;
  description?: string;
}

export interface ScholarshipCategory {
  id: string;
  category: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  scholarships: ScholarshipLevel[];
}

export const sportsScholarshipPolicy: ScholarshipCategory = {
  id: "sports",
  category: "Sports Scholarship",
  title: "Sports Excellence Scholarship Program",
  description: "JLU recognizes and rewards outstanding sports achievements at state and national levels. Students with proven track records in sports competitions are eligible for scholarships based on their performance level.",
  eligibility: [
    "Participation in state or national level sports competitions",
    "Valid certificates from recognized sports authorities",
    "Representation of state or country in recognized tournaments",
    "Maintained academic eligibility as per university norms",
    "No disciplinary actions during the academic year"
  ],
  benefits: [
    "Tuition fee waiver as per achievement level",
    "Access to world-class sports facilities",
    "Professional coaching and training support",
    "Priority accommodation in sports hostel",
    "Participation in inter-university competitions",
    "Sports kit and equipment support",
    "Medical and fitness support"
  ],
  scholarships: [
    {
      id: "intl-gold",
      level: "International",
      rank: "Gold Medal",
      reward: "100% tuition fee waiver + ₹50,000 annual stipend",
      description: "For gold medalists in recognized international championships"
    },
    {
      id: "intl-silver",
      level: "International",
      rank: "Silver Medal",
      reward: "100% tuition fee waiver + ₹40,000 annual stipend",
      description: "For silver medalists in recognized international championships"
    },
    {
      id: "intl-bronze",
      level: "International",
      rank: "Bronze Medal",
      reward: "100% tuition fee waiver + ₹30,000 annual stipend",
      description: "For bronze medalists in recognized international championships"
    },
    {
      id: "intl-participation",
      level: "International",
      rank: "Participation",
      reward: "75% tuition fee waiver + ₹20,000 annual stipend",
      description: "For participation in recognized international championships"
    },
    {
      id: "national-gold",
      level: "National",
      rank: "Gold Medal",
      reward: "100% tuition fee waiver",
      description: "For gold medalists in recognized national championships"
    },
    {
      id: "national-silver",
      level: "National",
      rank: "Silver Medal",
      reward: "75% tuition fee waiver",
      description: "For silver medalists in recognized national championships"
    },
    {
      id: "national-bronze",
      level: "National",
      rank: "Bronze Medal",
      reward: "50% tuition fee waiver",
      description: "For bronze medalists in recognized national championships"
    },
    {
      id: "national-participation",
      level: "National",
      rank: "Participation",
      reward: "25% tuition fee waiver",
      description: "For participation in recognized national championships"
    },
    {
      id: "state-gold",
      level: "State",
      rank: "Gold Medal",
      reward: "50% tuition fee waiver",
      description: "For gold medalists in recognized state championships"
    },
    {
      id: "state-silver",
      level: "State",
      rank: "Silver Medal",
      reward: "40% tuition fee waiver",
      description: "For silver medalists in recognized state championships"
    },
    {
      id: "state-bronze",
      level: "State",
      rank: "Bronze Medal",
      reward: "30% tuition fee waiver",
      description: "For bronze medalists in recognized state championships"
    },
    {
      id: "state-participation",
      level: "State",
      rank: "Participation",
      reward: "15% tuition fee waiver",
      description: "For participation in recognized state championships"
    }
  ]
};

export const meritScholarships: ScholarshipCategory = {
  id: "merit",
  category: "Merit Scholarship",
  title: "Academic Excellence Scholarship",
  description: "Merit-based scholarships for students demonstrating exceptional academic performance.",
  eligibility: [
    "Outstanding academic record in previous qualifying examination",
    "Minimum 90% aggregate in 12th standard for UG programs",
    "Minimum 80% aggregate in graduation for PG programs",
    "Maintained CGPA of 8.5 or above during the program",
    "No backlog or supplementary examinations"
  ],
  benefits: [
    "Partial to full tuition fee waiver",
    "Recognition in university honor roll",
    "Priority for research opportunities",
    "Letter of recommendation from faculty",
    "Access to advanced learning resources"
  ],
  scholarships: [
    {
      id: "merit-tier1",
      level: "Tier 1",
      rank: "95% and above",
      reward: "100% tuition fee waiver",
      description: "For exceptional academic achievement"
    },
    {
      id: "merit-tier2",
      level: "Tier 2",
      rank: "90-94.9%",
      reward: "50% tuition fee waiver",
      description: "For outstanding academic performance"
    },
    {
      id: "merit-tier3",
      level: "Tier 3",
      rank: "85-89.9%",
      reward: "25% tuition fee waiver",
      description: "For excellent academic performance"
    }
  ]
};

export const needBasedScholarships: ScholarshipCategory = {
  id: "need-based",
  category: "Need-Based Scholarship",
  title: "Financial Assistance Program",
  description: "Financial support for deserving students from economically weaker sections.",
  eligibility: [
    "Annual family income below ₹3,00,000",
    "Valid income certificate from competent authority",
    "Good academic record (minimum 60% in previous examination)",
    "Indian citizenship",
    "No other scholarship or financial aid received"
  ],
  benefits: [
    "Tuition fee waiver or reduction",
    "Hostel fee concession",
    "Book and study material allowance",
    "Examination fee waiver"
  ],
  scholarships: [
    {
      id: "need-category1",
      level: "Category 1",
      rank: "Income below ₹1,00,000",
      reward: "75% tuition fee waiver + ₹15,000 annual support",
      description: "Maximum financial assistance"
    },
    {
      id: "need-category2",
      level: "Category 2",
      rank: "Income ₹1,00,000 - ₹2,00,000",
      reward: "50% tuition fee waiver + ₹10,000 annual support",
      description: "Substantial financial assistance"
    },
    {
      id: "need-category3",
      level: "Category 3",
      rank: "Income ₹2,00,000 - ₹3,00,000",
      reward: "25% tuition fee waiver",
      description: "Partial financial assistance"
    }
  ]
};

export const allScholarships: ScholarshipCategory[] = [
  sportsScholarshipPolicy,
  meritScholarships,
  needBasedScholarships
];

export const scholarshipApplicationProcess = [
  "Fill the scholarship application form during admission process",
  "Submit required supporting documents and certificates",
  "Scholarship committee reviews all applications",
  "Verification of documents and eligibility criteria",
  "Scholarship award notification sent via email",
  "Fee adjustment processed after approval",
  "Annual renewal based on continued performance and eligibility"
];

export const importantNotes = [
  "Scholarships are subject to annual renewal based on performance",
  "Students must maintain minimum attendance of 75%",
  "Any disciplinary action may lead to scholarship cancellation",
  "Only one scholarship category applicable per student (highest eligible)",
  "Sports scholarship requires annual participation in university teams",
  "Merit scholarship requires maintaining CGPA of 8.5 or above",
  "Need-based scholarship requires annual income certificate submission",
  "All certificates must be from recognized authorities only",
  "Scholarship does not cover admission charges, caution money, or exam fees"
];
