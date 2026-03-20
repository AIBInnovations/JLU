import { programs } from './programs';
import { faculties } from './faculties';

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: 'Program' | 'Page' | 'School' | 'Faculty' | 'Section';
}

// Static pages
const pages: SearchItem[] = [
  { title: 'Home', description: 'Jagran Lakecity University homepage', href: '/', category: 'Page' },
  { title: 'About JLU', description: 'Introduction, history, leadership, governance', href: '/about', category: 'Page' },
  { title: 'Academics', description: 'Schools, colleges and programs offered', href: '/academics', category: 'Page' },
  { title: 'Admissions', description: 'Application process, eligibility, important dates', href: '/admissions', category: 'Page' },
  { title: 'Campus', description: 'Infrastructure, facilities, library, labs', href: '/campus', category: 'Page' },
  { title: 'Campus Life', description: 'Student clubs, cultural activities, sports', href: '/campus-life', category: 'Page' },
  { title: 'Research', description: 'Research centers, areas, publications, projects', href: '/research', category: 'Page' },
  { title: 'International Office', description: 'Global partnerships, exchange programs, study abroad', href: '/international-office', category: 'Page' },
  { title: 'News & Events', description: 'Latest news, events calendar, press releases', href: '/news-events', category: 'Page' },
  { title: 'All Programs', description: 'Browse all undergraduate, postgraduate and PhD programs', href: '/programs', category: 'Page' },
  { title: 'Placements', description: 'Placement statistics, recruiters, highest packages', href: '/placement', category: 'Page' },
  { title: 'Scholarship', description: 'Scholarship opportunities and financial aid', href: '/scholarship', category: 'Page' },
  { title: 'Freeship', description: 'Chancellor freeship and merit-based fee waivers', href: '/freeship', category: 'Page' },
  { title: 'Loan Assistance', description: 'Education loan support and guidance', href: '/loan-assistance', category: 'Page' },
  { title: 'Apply Now', description: 'Start your application to JLU', href: '/apply', category: 'Page' },
  { title: 'Talk to Advisor', description: 'Connect with an admission advisor', href: '/talk-to-advisor', category: 'Page' },
  { title: 'Alumni', description: 'Alumni network and success stories', href: '/alumni', category: 'Page' },
  { title: 'Student Clubs', description: 'Explore student clubs and organizations', href: '/student-clubs', category: 'Page' },
  { title: 'Lakecity Voice', description: 'JLU podcast - coming soon', href: '/podcast', category: 'Page' },
  { title: 'Events', description: 'Upcoming events and past highlights', href: '/events', category: 'Page' },
  { title: 'Faculties', description: 'Explore all faculties and departments', href: '/faculties', category: 'Page' },
  { title: 'Certifications', description: 'Certificate courses and add-on programs', href: '/certifications', category: 'Page' },
  { title: 'JLUx', description: 'JLU experience and innovation hub', href: '/jlux', category: 'Page' },
  { title: 'Why JLU - Global Network', description: 'International partnerships and global reach', href: '/why-jlu/global-network', category: 'Page' },
  { title: 'Why JLU - Industry Intervention', description: 'Industry collaborations and interventions', href: '/why-jlu/industry-intervention', category: 'Page' },
  { title: 'Why JLU - Interdisciplinary Degrees', description: 'Cross-disciplinary learning opportunities', href: '/why-jlu/interdisciplinary-degrees', category: 'Page' },
  { title: 'Why JLU - Student Approach', description: 'Student-centric teaching methodology', href: '/why-jlu/student-approach', category: 'Page' },
];

// Navigation sections (sub-pages / scroll targets)
const sections: SearchItem[] = [
  { title: 'Introduction', description: 'About JLU - Introduction', href: '/about#introduction', category: 'Section' },
  { title: 'History & Heritage', description: 'About JLU - History & Heritage', href: '/about#history', category: 'Section' },
  { title: 'Leadership', description: 'About JLU - Leadership messages', href: '/about#leadership', category: 'Section' },
  { title: 'Governance', description: 'About JLU - University governance', href: '/about#governance', category: 'Section' },
  { title: 'Accreditations', description: 'About JLU - Accreditations & approvals', href: '/about#accreditations', category: 'Section' },
  { title: 'Rankings & Awards', description: 'About JLU - Rankings & awards', href: '/about#rankings', category: 'Section' },
  { title: 'Honorary Doctorates', description: 'About JLU - Honorary doctorates', href: '/about#honorary-doctorates', category: 'Section' },
  { title: 'Scholarships', description: 'Admissions - Scholarship opportunities', href: '/admissions#scholarships', category: 'Section' },
  { title: 'Fee Structure', description: 'Admissions - Tuition and fee details', href: '/admissions#fee-structure', category: 'Section' },
  { title: 'Research Centers', description: 'Research - Research centers', href: '/research#research-centers', category: 'Section' },
  { title: 'Publications', description: 'Research - Publications', href: '/research#publications', category: 'Section' },
  { title: 'Innovation Labs', description: 'Research - Innovation labs', href: '/research#innovation-labs', category: 'Section' },
  { title: 'Global Partnerships', description: 'International Office - Global partnerships', href: '/international-office#global-partnerships', category: 'Section' },
  { title: 'Exchange Programs', description: 'International Office - Exchange programs', href: '/international-office#exchange-programs', category: 'Section' },
  { title: 'Study Abroad', description: 'International Office - Study abroad', href: '/international-office#study-abroad', category: 'Section' },
];

// Faculty pages
const facultyPages: SearchItem[] = [
  { title: 'Faculty of Science and Technology', description: 'Engineering departments and programs', href: '/faculty/engineering', category: 'Faculty' },
  { title: 'Faculty of Management', description: 'Management and commerce programs', href: '/faculty/management', category: 'Faculty' },
  { title: 'Faculty of Law', description: 'Law programs and departments', href: '/faculty/law', category: 'Faculty' },
  { title: 'Faculty of Humanities', description: 'Humanities, arts and social sciences', href: '/faculty/humanities', category: 'Faculty' },
  { title: 'Faculty of Media and Social Sciences', description: 'Journalism and mass communication', href: '/faculty/journalism', category: 'Faculty' },
  { title: 'Faculty of Pharmacy', description: 'Pharmacy education and research', href: '/faculty/pharmacy', category: 'Faculty' },
];

// Build dynamic items from data
function buildProgramItems(): SearchItem[] {
  return programs.map((p) => ({
    title: p.name,
    description: `${p.category} | ${p.duration} | ${p.school}`,
    href: `/programs/${p.slug}`,
    category: 'Program' as const,
  }));
}

function buildSchoolItems(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const faculty of faculties) {
    for (const school of faculty.schools) {
      items.push({
        title: school.name,
        description: school.tagline,
        href: `/schools/${school.id}`,
        category: 'School',
      });
    }
  }
  return items;
}

// Complete search index
export function getSearchIndex(): SearchItem[] {
  return [...pages, ...sections, ...facultyPages, ...buildProgramItems(), ...buildSchoolItems()];
}
