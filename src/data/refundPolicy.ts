export interface RefundSlab {
  id: string;
  timeline: string;
  condition: string;
  refundPercentage: number;
  deductionPercentage: number;
  description: string;
}

export interface RefundCategory {
  id: string;
  category: string;
  applicableTo: string;
  refundable: boolean;
  notes?: string;
}

export const ugcRefundPolicy: RefundSlab[] = [
  {
    id: "slab1",
    timeline: "Before Commencement of Classes",
    condition: "Cancellation request submitted before the announced date of commencement of classes",
    refundPercentage: 100,
    deductionPercentage: 0,
    description: "Full refund of fees paid (except processing charges of ₹1,000)"
  },
  {
    id: "slab2",
    timeline: "Within 15 Days of Commencement",
    condition: "Cancellation request submitted within 15 days from the announced date of commencement of classes",
    refundPercentage: 90,
    deductionPercentage: 10,
    description: "90% of fees will be refunded (10% deduction for processing)"
  },
  {
    id: "slab3",
    timeline: "Within 16 to 30 Days",
    condition: "Cancellation request submitted between 16-30 days from the announced date of commencement of classes",
    refundPercentage: 80,
    deductionPercentage: 20,
    description: "80% of fees will be refunded (20% deduction)"
  },
  {
    id: "slab4",
    timeline: "Within 31 to 45 Days",
    condition: "Cancellation request submitted between 31-45 days from the announced date of commencement of classes",
    refundPercentage: 50,
    deductionPercentage: 50,
    description: "50% of fees will be refunded (50% deduction)"
  },
  {
    id: "slab5",
    timeline: "After 45 Days",
    condition: "Cancellation request submitted after 45 days from the announced date of commencement of classes",
    refundPercentage: 0,
    deductionPercentage: 100,
    description: "No refund will be provided"
  }
];

export const feeCategories: RefundCategory[] = [
  {
    id: "tuition",
    category: "Tuition Fees",
    applicableTo: "Annual tuition fees paid for the program",
    refundable: true,
    notes: "Subject to UGC refund policy timeline and deductions"
  },
  {
    id: "caution",
    category: "Caution Money",
    applicableTo: "Refundable security deposit",
    refundable: true,
    notes: "Fully refundable at the time of course completion or withdrawal (no damage to property)"
  },
  {
    id: "admission",
    category: "Admission Charges",
    applicableTo: "One-time admission processing charges",
    refundable: false,
    notes: "Non-refundable under any circumstances"
  },
  {
    id: "application",
    category: "Application Fee",
    applicableTo: "Application processing fee (₹1,000)",
    refundable: false,
    notes: "Non-refundable - deducted from any refund amount"
  },
  {
    id: "exam",
    category: "Examination Fees",
    applicableTo: "Annual examination and assessment charges",
    refundable: true,
    notes: "Refundable on pro-rata basis if no examinations attended"
  },
  {
    id: "hostel",
    category: "Hostel Fees",
    applicableTo: "Annual hostel accommodation charges",
    refundable: true,
    notes: "Refundable as per hostel refund policy on pro-rata basis"
  },
  {
    id: "hostel-deposit",
    category: "Hostel Security Deposit",
    applicableTo: "Refundable hostel security deposit (₹10,000)",
    refundable: true,
    notes: "Fully refundable if no damage to hostel property"
  },
  {
    id: "mess",
    category: "Mess Fees",
    applicableTo: "Annual mess and dining charges",
    refundable: true,
    notes: "Refundable on pro-rata basis for unused months"
  }
];

export const refundProcess = [
  {
    step: 1,
    title: "Submit Written Request",
    description: "Submit a written refund request to the Admissions Office with reason for withdrawal"
  },
  {
    step: 2,
    title: "Attach Required Documents",
    description: "Attach original fee receipts, admission letter, and ID card with the request"
  },
  {
    step: 3,
    title: "Get No Dues Certificate",
    description: "Obtain No Dues Certificate from Library, Hostel, Department, and Accounts section"
  },
  {
    step: 4,
    title: "Dean's Approval",
    description: "Refund request forwarded to Dean for verification and approval"
  },
  {
    step: 5,
    title: "Accounts Processing",
    description: "Accounts section calculates refundable amount as per UGC guidelines"
  },
  {
    step: 6,
    title: "Approval from Competent Authority",
    description: "Final approval from university competent authority"
  },
  {
    step: 7,
    title: "Refund Disbursement",
    description: "Refund amount credited to the bank account provided within 30 working days"
  }
];

export const importantConditions = [
  "Refund policy is as per UGC (Prevention of Malpractices and Unfair Practices) Regulations",
  "Timeline calculated from the announced date of commencement of classes, not admission date",
  "Original fee receipts mandatory for processing refund request",
  "No Dues Certificate from all departments required",
  "Refund processed within 30 working days after approval",
  "Caution money refunded only if no damage to university/hostel property",
  "Admission charges and application fee are non-refundable",
  "In case of cancellation by university, 100% refund provided",
  "Students must sign refund policy undertaking at the time of admission",
  "For hostel refund, pro-rata calculation based on months utilized",
  "Mess fees refund on monthly pro-rata basis for unused period",
  "Any outstanding dues will be deducted from refund amount",
  "Refund applicable only to the fee payer (as per original receipt)",
  "Migration certificate issued only after full settlement of dues"
];

export const specialCases = [
  {
    id: "medical",
    case: "Medical Emergency",
    description: "In case of serious medical emergency preventing continuation of studies",
    policy: "Considered on case-to-case basis with medical certificate from recognized hospital"
  },
  {
    id: "transfer",
    case: "Transfer to Other Institution",
    description: "Student securing admission in other institution",
    policy: "Standard UGC refund policy applicable - submit transfer/admission proof"
  },
  {
    id: "academic",
    case: "Academic Ineligibility",
    description: "Student found academically ineligible after admission",
    policy: "Full refund provided if ineligibility due to university error"
  },
  {
    id: "duplicate",
    case: "Duplicate Payment",
    description: "Accidental duplicate payment of fees",
    policy: "Full refund of duplicate amount after verification within 15 days"
  },
  {
    id: "scholarship",
    case: "Government Scholarship",
    description: "Student awarded government scholarship after fee payment",
    policy: "Refund processed after scholarship amount received by university"
  }
];

export const contactInformation = {
  department: "Accounts & Finance Department",
  email: "accounts@jlu.edu.in",
  phone: "+91-755-4982222",
  office: "Administrative Block, Ground Floor",
  timings: "Monday to Friday: 9:00 AM - 5:00 PM",
  saturday: "9:00 AM - 1:00 PM (Closed on Sundays)"
};
