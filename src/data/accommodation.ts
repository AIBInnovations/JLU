export interface HostelFees {
  id: string;
  hostelType: string;
  roomType: string;
  occupancy: string;
  annualFees: number;
  securityDeposit: number;
  amenities: string[];
  description?: string;
}

export interface HostelFacility {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const hostelFees: HostelFees[] = [
  {
    id: "boys-ac-single",
    hostelType: "Boys Hostel",
    roomType: "AC Single Room",
    occupancy: "Single Occupancy",
    annualFees: 120000,
    securityDeposit: 10000,
    amenities: [
      "Air Conditioned",
      "Attached Bathroom",
      "Study Table & Chair",
      "Wardrobe",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply"
    ],
    description: "Premium single occupancy room with AC and modern amenities"
  },
  {
    id: "boys-ac-double",
    hostelType: "Boys Hostel",
    roomType: "AC Double Room",
    occupancy: "Double Occupancy",
    annualFees: 90000,
    securityDeposit: 10000,
    amenities: [
      "Air Conditioned",
      "Attached Bathroom",
      "Study Table & Chair (2)",
      "Wardrobe (2)",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply"
    ],
    description: "Shared AC room with all modern facilities"
  },
  {
    id: "boys-nonac-triple",
    hostelType: "Boys Hostel",
    roomType: "Non-AC Triple Room",
    occupancy: "Triple Occupancy",
    annualFees: 70000,
    securityDeposit: 10000,
    amenities: [
      "Well Ventilated",
      "Attached Bathroom",
      "Study Table & Chair (3)",
      "Wardrobe (3)",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply"
    ],
    description: "Economical triple sharing room with essential amenities"
  },
  {
    id: "boys-nonac-quad",
    hostelType: "Boys Hostel",
    roomType: "Non-AC Quad Room",
    occupancy: "Four Occupancy",
    annualFees: 60000,
    securityDeposit: 10000,
    amenities: [
      "Spacious Room",
      "Attached Bathroom",
      "Study Table & Chair (4)",
      "Wardrobe (4)",
      "WiFi",
      "24x7 Power Backup",
      "Common Hot Water"
    ],
    description: "Budget-friendly four sharing room"
  },
  {
    id: "girls-ac-single",
    hostelType: "Girls Hostel",
    roomType: "AC Single Room",
    occupancy: "Single Occupancy",
    annualFees: 120000,
    securityDeposit: 10000,
    amenities: [
      "Air Conditioned",
      "Attached Bathroom",
      "Study Table & Chair",
      "Wardrobe",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply",
      "Security Systems"
    ],
    description: "Premium single occupancy room with enhanced security"
  },
  {
    id: "girls-ac-double",
    hostelType: "Girls Hostel",
    roomType: "AC Double Room",
    occupancy: "Double Occupancy",
    annualFees: 90000,
    securityDeposit: 10000,
    amenities: [
      "Air Conditioned",
      "Attached Bathroom",
      "Study Table & Chair (2)",
      "Wardrobe (2)",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply",
      "Security Systems"
    ],
    description: "Shared AC room with complete safety features"
  },
  {
    id: "girls-nonac-triple",
    hostelType: "Girls Hostel",
    roomType: "Non-AC Triple Room",
    occupancy: "Triple Occupancy",
    annualFees: 70000,
    securityDeposit: 10000,
    amenities: [
      "Well Ventilated",
      "Attached Bathroom",
      "Study Table & Chair (3)",
      "Wardrobe (3)",
      "WiFi",
      "24x7 Power Backup",
      "Hot Water Supply",
      "Security Systems"
    ],
    description: "Comfortable triple sharing with full security"
  },
  {
    id: "girls-nonac-quad",
    hostelType: "Girls Hostel",
    roomType: "Non-AC Quad Room",
    occupancy: "Four Occupancy",
    annualFees: 60000,
    securityDeposit: 10000,
    amenities: [
      "Spacious Room",
      "Attached Bathroom",
      "Study Table & Chair (4)",
      "Wardrobe (4)",
      "WiFi",
      "24x7 Power Backup",
      "Common Hot Water",
      "Security Systems"
    ],
    description: "Affordable four sharing room with safety measures"
  }
];

export const commonFacilities: HostelFacility[] = [
  {
    id: "mess",
    name: "Dining Facility",
    description: "Hygienic mess with nutritious vegetarian and non-vegetarian meals. Separate dining halls for boys and girls with varied menu.",
    icon: "utensils"
  },
  {
    id: "laundry",
    name: "Laundry Service",
    description: "Professional laundry service available at nominal charges. Washing machines and dryers provided in common areas.",
    icon: "shirt"
  },
  {
    id: "common-room",
    name: "Common Room",
    description: "Spacious common room with TV, indoor games, and recreational facilities for student relaxation and interaction.",
    icon: "tv"
  },
  {
    id: "study-room",
    name: "24x7 Study Room",
    description: "Dedicated air-conditioned study rooms with reading lights and comfortable seating for late-night studies.",
    icon: "book"
  },
  {
    id: "wifi",
    name: "High-Speed WiFi",
    description: "24x7 high-speed internet connectivity throughout the hostel premises for academic and personal use.",
    icon: "wifi"
  },
  {
    id: "security",
    name: "24x7 Security",
    description: "Round-the-clock security with CCTV surveillance, biometric access, and trained security personnel.",
    icon: "shield"
  },
  {
    id: "medical",
    name: "Medical Facility",
    description: "On-campus medical center with qualified doctors and nurses available for emergency medical assistance.",
    icon: "heart-pulse"
  },
  {
    id: "gym",
    name: "Fitness Center",
    description: "Well-equipped gymnasium with modern equipment, yoga room, and outdoor sports facilities.",
    icon: "dumbbell"
  },
  {
    id: "parking",
    name: "Vehicle Parking",
    description: "Secure parking facility for bicycles, two-wheelers, and four-wheelers with covered parking areas.",
    icon: "car"
  },
  {
    id: "water",
    name: "RO Water Supply",
    description: "24x7 purified drinking water through RO systems installed at multiple points in each hostel block.",
    icon: "droplet"
  },
  {
    id: "power",
    name: "Power Backup",
    description: "Uninterrupted power supply with 100% power backup through diesel generators and inverters.",
    icon: "zap"
  },
  {
    id: "housekeeping",
    name: "Housekeeping",
    description: "Daily housekeeping services for common areas and periodic cleaning of rooms by professional staff.",
    icon: "broom"
  }
];

export const hostelRules = [
  "Students must maintain discipline and follow hostel timings",
  "Entry/Exit timings: Boys - 6:00 AM to 10:00 PM, Girls - 6:00 AM to 8:00 PM",
  "Visitors allowed only in designated areas during visiting hours",
  "Smoking, alcohol, and drugs strictly prohibited",
  "Ragging is a punishable offense - zero tolerance policy",
  "Students must carry their ID cards at all times",
  "Damages to hostel property will be charged from security deposit",
  "Prior permission required for late-night study room access after 11 PM",
  "Attendance in mess is mandatory for hostel residents",
  "Room change requests considered only in exceptional cases"
];

export const messFees = {
  monthly: 4500,
  annual: 50000,
  description: "Mess fees include breakfast, lunch, evening snacks, and dinner. Special menu on festivals and occasions.",
  mealTimings: {
    breakfast: "7:30 AM - 9:30 AM",
    lunch: "12:30 PM - 2:30 PM",
    eveningSnacks: "5:00 PM - 6:00 PM",
    dinner: "8:00 PM - 10:00 PM"
  }
};

export const admissionProcess = [
  "Hostel admission along with university admission",
  "Fill hostel accommodation form during admission process",
  "Select preferred room type based on availability",
  "Pay hostel fees and security deposit",
  "Security deposit refundable at the time of leaving hostel",
  "Room allotment on first-come-first-serve basis",
  "Check-in with original documents and university ID",
  "Collect hostel ID card and room keys from warden"
];

export const importantNotes = [
  "Hostel fees mentioned are annual charges (excluding mess fees)",
  "Security deposit of ₹10,000 is refundable (subject to no damage)",
  "Mess fees of ₹50,000 per year charged separately",
  "Hostel fees to be paid in full at the time of admission",
  "Room type subject to availability - early admission recommended",
  "AC charges include electricity consumption up to 300 units/month",
  "Excess electricity consumption charged separately",
  "Hostel allotment valid for one academic year only",
  "Renewal required at the start of each academic session",
  "No refund for hostel fees once allotted (except as per refund policy)"
];
