// Real JLU placement data based on official sources and NIRF 2025 data

export interface PlacementStats {
  year: string;
  highestPackage: string;
  medianPackage: string;
  placementRate?: string;
}

export interface ProgramPlacement {
  programCategory: 'UG' | 'PG' | 'Law' | 'MBA';
  stats: PlacementStats[];
  topRecruiters: string[];
}

// Top recruiting companies based on real JLU placement data (2024)
export const topRecruiters = {
  it: [
    'Amazon',
    'Microsoft',
    'Infosys',
    'IBM',
    'Samsung',
    'Wipro',
  ],
  banking: [
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Bank of America',
    'ICICI Lombard',
    'JP Morgan Chase',
  ],
  consulting: [
    'KPMG',
    'Shell',
    'ANZ',
  ],
  hospitality: [
    'Marriott',
    'The Oberoi Group',
    'The Leela',
    'The Westin',
    'Vivanta',
    'Taj',
    'Radisson',
  ],
  media: [
    'NDTV',
    'Times of India',
    'McCann Worldgroup',
  ],
  ecommerce: [
    'Flipkart',
    'Amazon',
  ],
  others: [
    'Reliance Jio',
    'Mercedes-Benz',
    'S&P Global',
    'Nielsen',
    'Berger',
    'Puma',
  ],
};

// All major recruiters combined
export const allTopRecruiters = [
  // Featured Top Recruiters
  'Amazon',
  'Microsoft',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Infosys',
  'Reliance Jio',
  'KPMG',
  // IT Sector
  'IBM',
  'Samsung',
  'Wipro',
  // Banking & Finance
  'Bank of America',
  'ICICI Lombard',
  'JP Morgan Chase',
  'Motilal Oswal',
  'Muthoot Finance',
  // Hospitality
  'Marriott',
  'The Oberoi Group',
  'The Leela',
  'The Westin',
  'Vivanta',
  'Taj',
  'Radisson',
  // Media
  'NDTV',
  'Times of India',
  'McCann Worldgroup',
  // E-commerce & Retail
  'Flipkart',
  'Puma',
  // Consulting & Services
  'Shell',
  'ANZ',
  'S&P Global',
  'Nielsen',
  // Others
  'Mercedes-Benz',
  'Berger',
  'CavinKare',
];

// Program-wise placement data based on NIRF 2025 data
export const programPlacements: ProgramPlacement[] = [
  {
    programCategory: 'UG',
    stats: [
      {
        year: '2023-24',
        highestPackage: '₹12 LPA',
        medianPackage: '₹5 LPA',
        placementRate: '60-85%',
      },
    ],
    topRecruiters: [
      'Amazon',
      'Infosys',
      'Wipro',
      'HDFC Bank',
      'Flipkart',
      'Reliance Jio',
    ],
  },
  {
    programCategory: 'PG',
    stats: [
      {
        year: '2023-24',
        highestPackage: '₹12 LPA',
        medianPackage: '₹5.53 LPA',
        placementRate: '70-85%',
      },
    ],
    topRecruiters: [
      'Microsoft',
      'IBM',
      'KPMG',
      'JP Morgan Chase',
      'Amazon',
      'ICICI Bank',
    ],
  },
  {
    programCategory: 'MBA',
    stats: [
      {
        year: '2023-24',
        highestPackage: '₹12 LPA',
        medianPackage: '₹6.60 LPA',
        placementRate: '80%',
      },
    ],
    topRecruiters: [
      'KPMG',
      'HDFC Bank',
      'ICICI Bank',
      'Shell',
      'JP Morgan Chase',
      'Motilal Oswal',
    ],
  },
  {
    programCategory: 'Law',
    stats: [
      {
        year: '2023-24',
        highestPackage: '₹8 LPA',
        medianPackage: '₹2.40-3 LPA',
        placementRate: '60%',
      },
    ],
    topRecruiters: [
      'Law Firms',
      'Corporate Legal Departments',
      'Consulting Firms',
    ],
  },
];

// Overall placement highlights
export const placementHighlights = {
  totalRecruiters: '100+',
  highestPackage2024: '₹12 LPA',
  highestPackage2023: '₹8 LPA',
  medianPackageOverall: '₹4.28 LPA',
  establishedYear: '2013', // Career Development Center
  placementRate: '60-85%',
};

// Sector-wise recruiter count
export const sectorDistribution = {
  'IT & Technology': 15,
  'Banking & Finance': 20,
  'Hospitality': 12,
  'Media & Communication': 8,
  'Consulting': 10,
  'E-commerce & Retail': 8,
  'Others': 27,
};
