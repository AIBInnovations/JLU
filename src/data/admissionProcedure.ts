export interface AdmissionStep {
  id: number;
  title: string;
  description: string;
  details?: string[];
  timeline?: string;
  icon?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  category?: string;
}

export const admissionSteps: AdmissionStep[] = [
  {
    id: 1,
    title: "Submit Online Application",
    description: "Submit your application online through the official admission portal.",
    details: [
      "Apply through https://apply.jlu.edu.in",
      "All admissions processed through online mode only, unless otherwise notified",
    ],
    timeline: "20th December 2025 – 31st August 2026",
    icon: "form"
  },
  {
    id: 2,
    title: "Email Validation",
    description: "Upon successful registration, candidates shall receive an email for validation of their registered email ID.",
    details: [
      "Check your inbox for the validation email",
      "Click on the verification link to activate your account",
    ],
    timeline: "Immediately after registration",
    icon: "mail"
  },
  {
    id: 3,
    title: "Access Application Dashboard",
    description: "After validation, access the application form through the dashboard.",
    details: [
      "Login credentials (User ID and Password) sent via registered email and mobile number",
      "Complete the application form in all respects",
    ],
    timeline: "After email validation",
    icon: "dashboard"
  },
  {
    id: 4,
    title: "Upload Documents & Pay Application Fee",
    description: "Upload prescribed documents and pay the non-refundable application fee.",
    details: [
      "Upload all required documents as specified",
      "Pay the non-refundable application fee of \u20B91,600/- through online payment modes",
      "Download and retain a copy of the filled-in application form for future reference",
    ],
    timeline: "During application submission",
    icon: "upload"
  },
  {
    id: 5,
    title: "Appear for JLUET / Personal Interview",
    description: "Appear for the Jagran Lakecity University Entrance Test (JLUET) and/or Personal Interview (PI), wherever applicable.",
    details: [
      "JLUET is mandatory for Law and Design programs",
      "Personal Interview as per program requirements",
      "Carry printed application form and valid ID proof",
    ],
    timeline: "As per scheduled date",
    icon: "edit"
  },
  {
    id: 6,
    title: "Receive Provisional Admission Letter (PAL)",
    description: "Candidates shortlisted based on eligibility, merit, and performance in JLUET/PI shall be issued a Provisional Admission Letter.",
    details: [
      "PAL issued within three (03) working days of shortlisting",
    ],
    timeline: "Within 3 working days of JLUET/PI",
    icon: "file-text"
  },
  {
    id: 7,
    title: "Confirm Admission & Deposit Seat Booking Amount",
    description: "Report to the Admission Office, sign the Refund Undertaking, and deposit the prescribed seat booking amount.",
    details: [
      "Must be done within three (03) working days of issuance of the PAL",
      "Sign the Refund Undertaking at the Admission Office",
    ],
    timeline: "Within 3 working days of PAL",
    icon: "bookmark"
  },
  {
    id: 8,
    title: "Apply for Scholarship (If Eligible)",
    description: "Eligible candidates may apply for scholarships as per the university scholarship policy.",
    details: [
      "Submit duly filled Scholarship Application Form",
      "Attach supporting documents within the stipulated timeline",
      "Scholarships awarded subject to fulfilment of eligibility criteria and approval of competent authority",
    ],
    timeline: "After seat booking",
    icon: "award"
  },
  {
    id: 9,
    title: "Pay Full First-Semester Fee & Complete Registration",
    description: "Final admission confirmed only after payment of the full first-semester fee and completion of registration formalities.",
    details: [
      "Pay remaining fee at the Student Section Office",
      "Complete all registration formalities",
      "Admission is provisional until verification of original documents",
    ],
    timeline: "Before session commencement",
    icon: "check-square"
  }
];

export const requiredDocuments: RequiredDocument[] = [
  {
    id: "doc1",
    name: "Class 10 Mark Sheet",
    description: "Self-attested copy of Class 10 board examination marksheet",
    mandatory: true,
    category: "Undergraduate Programs"
  },
  {
    id: "doc2",
    name: "Class 12 Mark Sheet",
    description: "Self-attested copy of Class 12 board examination marksheet",
    mandatory: true,
    category: "Undergraduate Programs"
  },
  {
    id: "doc3",
    name: "Graduation Mark Sheet",
    description: "Self-attested copies of graduation marksheets",
    mandatory: true,
    category: "Postgraduate Programs"
  },
  {
    id: "doc4",
    name: "Post-Graduation Mark Sheet",
    description: "Self-attested copies of post-graduation marksheets",
    mandatory: true,
    category: "Doctoral Programs"
  },
  {
    id: "doc5",
    name: "Recent Passport-Size Colour Photograph",
    description: "Recent colour photograph (JPEG format)",
    mandatory: true,
    category: "Common Documents"
  },
  {
    id: "doc6",
    name: "Aadhaar Card",
    description: "Clear scanned copy of Aadhaar card (for Indian nationals)",
    mandatory: true,
    category: "Common Documents"
  },
  {
    id: "doc7",
    name: "APAAR ID",
    description: "Academic Bank of Credits APAAR ID",
    mandatory: true,
    category: "Common Documents"
  },
  {
    id: "doc8",
    name: "Valid Passport (International Applicants)",
    description: "Scanned copy of valid passport for international applicants",
    mandatory: false,
    category: "Common Documents"
  },
  {
    id: "doc9",
    name: "Digital Signature",
    description: "Scanned signature on white paper (JPG/PNG format)",
    mandatory: true,
    category: "Common Documents"
  }
];

export const importantNotes = [
  "Original documents must be produced for verification at the time of admission",
  "All admissions processed through online mode only via https://apply.jlu.edu.in",
  "Application fee of \u20B91,600 is non-refundable",
  "Application dates: 20th December 2025 – 31st August 2026 (dates may be revised)",
  "JLUET is mandatory for Law and Design programs",
  "Admission is provisional until verification of original documents",
  "The University reserves the right to amend or modify this policy as per UGC regulations",
  "Any dispute arising out of the admission process shall be subject to the jurisdiction of Bhopal, Madhya Pradesh"
];

export const eligibilityCriteria = {
  undergraduate: {
    title: "Undergraduate Programs",
    criteria: [
      "Minimum 50% aggregate marks in Class 12 or equivalent examination from a recognized board",
      "Admission based on merit, followed by Personal Interview and/or JLUET, wherever applicable",
      "JLUET is mandatory for Law and Design programs",
    ]
  },
  postgraduate: {
    title: "Postgraduate Programs",
    criteria: [
      "Minimum 50% aggregate marks in Graduation from a UGC-recognized university",
      "Admission based on merit, followed by JLUET and Personal Interview",
      "Eligibility criteria may vary for specific programs as per statutory council norms",
    ]
  }
};
