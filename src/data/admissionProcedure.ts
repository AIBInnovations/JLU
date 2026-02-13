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
}

export const admissionSteps: AdmissionStep[] = [
  {
    id: 1,
    title: "Email Required Documents",
    description: "Send your academic documents to admissions@jlu.edu.in",
    details: [
      "Email copies of 10th, 12th, and Graduation marksheets",
      "Subject line: 'Application for [Program Name]'",
      "Attach all documents in PDF format"
    ],
    timeline: "Initial step",
    icon: "mail"
  },
  {
    id: 2,
    title: "Fill Application Form",
    description: "Complete the online application form with accurate details",
    details: [
      "Access the application portal",
      "Fill personal and academic information",
      "Select desired program and specialization",
      "Review all details before submission"
    ],
    timeline: "After document submission",
    icon: "form"
  },
  {
    id: 3,
    title: "Validate Your Email",
    description: "Verify your email address to activate your application",
    details: [
      "Check your inbox for validation email",
      "Click on the verification link",
      "Email validation required within 24 hours"
    ],
    timeline: "Immediately after form submission",
    icon: "check-circle"
  },
  {
    id: 4,
    title: "Access Application Dashboard",
    description: "Log in to your personalized application dashboard",
    details: [
      "Use credentials received via email",
      "Track application status",
      "Access all further instructions and forms"
    ],
    timeline: "After email validation",
    icon: "dashboard"
  },
  {
    id: 5,
    title: "Pay Application Fee",
    description: "Complete the application fee payment online",
    details: [
      "Application fee: ₹1,000 (non-refundable)",
      "Payment via credit/debit card, net banking, or UPI",
      "Save payment receipt for records"
    ],
    timeline: "Within 48 hours of dashboard access",
    icon: "payment"
  },
  {
    id: 6,
    title: "Upload Required Documents",
    description: "Upload all mandatory documents through the dashboard",
    details: [
      "Upload scanned copies in PDF format",
      "Maximum file size: 2MB per document",
      "Ensure documents are clear and readable",
      "Digital signatures where required"
    ],
    timeline: "After application fee payment",
    icon: "upload"
  },
  {
    id: 7,
    title: "Download Application Form",
    description: "Download the filled and submitted application form",
    details: [
      "Download form from dashboard",
      "Print and keep for records",
      "Form will be required during entrance test/interview"
    ],
    timeline: "After document upload",
    icon: "download"
  },
  {
    id: 8,
    title: "Appear in JLUET/Personal Interview",
    description: "Attend the JLU Entrance Test or Personal Interview",
    details: [
      "Entrance test for eligible programs",
      "Personal interview for specific courses",
      "Carry printed application form and ID proof",
      "Test/Interview schedule sent via email"
    ],
    timeline: "As per scheduled date",
    icon: "edit"
  },
  {
    id: 9,
    title: "Sign Refund Undertaking",
    description: "Download, sign, and upload the refund policy undertaking",
    details: [
      "Download undertaking from dashboard",
      "Read UGC refund policy carefully",
      "Sign and upload scanned copy",
      "Parent/Guardian signature required for minors"
    ],
    timeline: "After JLUET/PI result",
    icon: "file-text"
  },
  {
    id: 10,
    title: "Deposit Seat Booking Amount",
    description: "Pay seat booking fee to confirm your admission",
    details: [
      "Seat booking fee as per program",
      "Payment confirms your seat reservation",
      "Fee adjustable against total annual fee",
      "Refundable as per UGC guidelines"
    ],
    timeline: "Within specified deadline",
    icon: "bookmark"
  },
  {
    id: 11,
    title: "Apply for Scholarship (If Eligible)",
    description: "Submit scholarship application if you qualify",
    details: [
      "Sports scholarship for state/national players",
      "Merit-based scholarships",
      "Submit supporting documents and certificates",
      "Scholarship committee review and approval"
    ],
    timeline: "After seat booking",
    icon: "award"
  },
  {
    id: 12,
    title: "Deposit Full Annual Fee",
    description: "Pay the complete annual fee to finalize admission",
    details: [
      "Pay remaining fee after seat booking adjustment",
      "Multiple payment options available",
      "Fee payment before academic session begins",
      "Receive final admission confirmation"
    ],
    timeline: "Before session commencement",
    icon: "check-square"
  }
];

export const requiredDocuments: RequiredDocument[] = [
  {
    id: "doc1",
    name: "10th Standard Marksheet",
    description: "Self-attested copy of Class 10 board examination marksheet",
    mandatory: true
  },
  {
    id: "doc2",
    name: "12th Standard Marksheet",
    description: "Self-attested copy of Class 12 board examination marksheet",
    mandatory: true
  },
  {
    id: "doc3",
    name: "Graduation Marksheet (For PG Programs)",
    description: "Self-attested copies of all semester/year marksheets",
    mandatory: true
  },
  {
    id: "doc4",
    name: "Post Graduation Marksheet (For PhD Programs)",
    description: "Self-attested copies of Master's degree marksheets",
    mandatory: true
  },
  {
    id: "doc5",
    name: "Passport Size Photograph",
    description: "Recent color photograph with white background (JPEG format)",
    mandatory: true
  },
  {
    id: "doc6",
    name: "Aadhar Card",
    description: "Clear scanned copy of Aadhar card (both sides)",
    mandatory: true
  },
  {
    id: "doc7",
    name: "Passport (If Available)",
    description: "Scanned copy of passport for international students",
    mandatory: false
  },
  {
    id: "doc8",
    name: "Digital Signature",
    description: "Scanned signature on white paper (JPG/PNG format)",
    mandatory: true
  },
  {
    id: "doc9",
    name: "Category Certificate (If Applicable)",
    description: "SC/ST/OBC certificate for reservation benefits",
    mandatory: false
  },
  {
    id: "doc10",
    name: "Sports Certificates (For Sports Quota)",
    description: "State/National level participation certificates",
    mandatory: false
  }
];

export const importantNotes = [
  "All documents must be in PDF format unless specified otherwise",
  "File size should not exceed 2MB per document",
  "Documents should be clear, complete, and readable",
  "False information may lead to cancellation of admission",
  "Keep original documents ready for verification during campus visit",
  "Application fee of ₹1,000 is non-refundable",
  "Seat booking fee is adjustable against annual fee",
  "Refund policy follows UGC guidelines",
  "Scholarship applications reviewed after admission confirmation"
];
