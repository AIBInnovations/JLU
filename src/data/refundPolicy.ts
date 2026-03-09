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
    timeline: "More than 15 days before last date",
    condition: "Notice of withdrawal served more than 15 days before the formally notified last date of admission",
    refundPercentage: 100,
    deductionPercentage: 0,
    description: "100% refund of aggregate fee"
  },
  {
    id: "slab2",
    timeline: "Less than 15 days before last date",
    condition: "Notice of withdrawal served less than 15 days before the formally notified last date of admission",
    refundPercentage: 90,
    deductionPercentage: 10,
    description: "90% refund of aggregate fee"
  },
  {
    id: "slab3",
    timeline: "Less than 15 days after last date",
    condition: "Notice of withdrawal served less than 15 days after the formally notified last date of admission",
    refundPercentage: 80,
    deductionPercentage: 20,
    description: "80% refund of aggregate fee"
  },
  {
    id: "slab4",
    timeline: "15–30 days after last date",
    condition: "Notice of withdrawal served more than 15 days but less than 30 days after the formally notified last date of admission",
    refundPercentage: 50,
    deductionPercentage: 50,
    description: "50% refund of aggregate fee"
  },
  {
    id: "slab5",
    timeline: "More than 30 days after last date",
    condition: "Notice of withdrawal served more than 30 days after the formally notified last date of admission",
    refundPercentage: 0,
    deductionPercentage: 100,
    description: "No refund"
  }
];

export const feeCategories: RefundCategory[] = [
  {
    id: "aggregate",
    category: "Aggregate Fee",
    applicableTo: "All amounts collected from the student including Caution Money",
    refundable: true,
    notes: "Subject to UGC refund policy timeline as per table above"
  },
  {
    id: "caution",
    category: "Caution Money",
    applicableTo: "Refundable security deposit",
    refundable: true,
    notes: "Refunded in full irrespective of the date of withdrawal application"
  },
  {
    id: "processing",
    category: "Processing Charges",
    applicableTo: "Rs. 5,000/- deducted from amounts received",
    refundable: false,
    notes: "Deducted before the refund payout is processed"
  },
  {
    id: "uniform",
    category: "Student Uniform Set",
    applicableTo: "Official student blazer set if issued",
    refundable: false,
    notes: "Return the blazer set or Rs. 2,500/- will be deducted from refund"
  }
];

export const refundProcess = [
  {
    step: 1,
    title: "Tier Deadline Compliance",
    description: "All initial requests for refunds must be received by the Office of Admissions and Outreach no later than 5 p.m. on the last deadline in each tier to be processed within that tier."
  },
  {
    step: 2,
    title: "Submit Refund Request",
    description: "Send a request to admission@jlu.edu.in — this will be treated as a notice of withdrawal and the quantum of refund will be calculated as per the UGC five-tier table. Please include your name, programme, and application number in all communications."
  },
  {
    step: 3,
    title: "Receive Refund Application Form",
    description: "Candidates will receive a refund application form and further instructions. Failure to follow the instructions closely and submit the completed refund application form will result in the refund being delayed."
  },
  {
    step: 4,
    title: "Submit Completed Refund Form",
    description: "The duly completed refund application form must be sent to admission@jlu.edu.in within 7 (seven) working days of being received by the applicant."
  },
  {
    step: 5,
    title: "Exit Interview (If Required)",
    description: "Applicants for refunds may undergo an exit interview with a member of the Admissions and Outreach staff/faculty prior to their application being processed. This interview is primarily for informational purposes and will in no way impact the status of the refund request unless the applicant rescinds the refund request themselves."
  },
  {
    step: 6,
    title: "Refund Processing",
    description: "From the receipt of the completed refund application form, all refund requests will take at least 15 (fifteen) working days to process."
  },
  {
    step: 7,
    title: "Grievance Handling",
    description: "Any grievance regarding refunds under this policy must be sent to fee.info@jlu.edu.in"
  }
];

export const importantConditions = [
  "Scope: This policy defines the fee refund rules for the New Batch 2026",
  "The UGC Notification of 2018 provides a five-tier system for refund of fees as applicable",
  "From Year 2020 onwards, UGC formally notifies the last date of admission (cutoff date) which is binding on the University",
  "Aggregate Fee includes all amounts collected from the student including Caution Money",
  "Caution Money will be refunded in full irrespective of the date of withdrawal",
  "Processing charges of Rs. 5,000/- will be deducted before refund payout",
  "If the student has been issued the official blazer set, it must be returned or Rs. 2,500/- will be deducted",
  "Any communication from UGC may have an overriding effect on this policy",
  "All initial refund requests must be received by the Office of Admissions no later than 5 p.m. on the last deadline in each tier",
  "Failure to submit completed refund application form within 7 working days will result in delay",
  "Refund requests take at least 15 working days to process from receipt of completed form",
  "Any grievance regarding refunds must be sent to fee.info@jlu.edu.in"
];

export const specialCases = [
  {
    id: "exception",
    case: "Exception Handling",
    description: "Students admitted after the formally notified last date of admission",
    policy: "Refund policy stays the same — the individual admission date will be considered as the formally notified last date for that student"
  },
  {
    id: "deadline",
    case: "Deadline Compliance",
    description: "All initial refund requests must be received by 5 p.m. on the last deadline",
    policy: "Requests received after the tier deadline will be processed in the next applicable tier"
  },
  {
    id: "ugc-override",
    case: "UGC Override",
    description: "Any new communication from UGC",
    policy: "Any communication from UGC may have an overriding effect on this policy"
  }
];

export const contactInformation = {
  department: "Office of Admissions and Outreach",
  email: "admission@jlu.edu.in",
  grievanceEmail: "fee.info@jlu.edu.in",
  phone: "+91-755-4982222",
  office: "Administrative Block, Ground Floor",
  timings: "Monday to Friday: 9:00 AM - 5:00 PM",
  saturday: "9:00 AM - 1:00 PM (Closed on Sundays)"
};
