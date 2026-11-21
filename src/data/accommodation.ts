export interface HostelFees {
  id: string;
  roomType: string;
  occupancy: string;
  semesterFees: number;
  cautionMoney: number;
  isAC: boolean;
}

export interface HostelFacility {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const hostelFees: HostelFees[] = [
  {
    id: "single-ensuite-ac",
    roomType: "Single Ensuite - AC",
    occupancy: "Single Occupancy",
    semesterFees: 75000,
    cautionMoney: 10000,
    isAC: true,
  },
  {
    id: "single-ac",
    roomType: "Single Occupancy - AC",
    occupancy: "Single Occupancy",
    semesterFees: 56000,
    cautionMoney: 10000,
    isAC: true,
  },
  {
    id: "double-ac",
    roomType: "Double Occupancy - AC",
    occupancy: "Double Occupancy",
    semesterFees: 50000,
    cautionMoney: 10000,
    isAC: true,
  },
  {
    id: "single-nonac",
    roomType: "Single Occupancy - Non AC",
    occupancy: "Single Occupancy",
    semesterFees: 45000,
    cautionMoney: 10000,
    isAC: false,
  },
  {
    id: "double-nonac",
    roomType: "Double Occupancy - Non AC",
    occupancy: "Double Occupancy",
    semesterFees: 35000,
    cautionMoney: 10000,
    isAC: false,
  },
  {
    id: "triple-nonac",
    roomType: "Triple Occupancy - Non AC",
    occupancy: "Triple Occupancy",
    semesterFees: 27000,
    cautionMoney: 10000,
    isAC: false,
  },
];

export const hostelAmenities = [
  "Laundry",
  "WiFi",
  "Electricity",
  "Gym",
  "Swimming Pool",
  "Housekeeping",
];

export const messFees = {
  semester: 55000,
  type: "Veg",
  description: "All applicable taxes are included in the amounts quoted.",
  operator: "Yummy Food Services",
  meals: ["Breakfast", "Lunch", "Hi Tea", "Dinner"],
};

export const busFees = {
  semester: 15000,
  description: "Bus fee per semester",
};

export const commonFacilities: HostelFacility[] = [
  {
    id: "laundry",
    name: "Laundry",
    description: "Professional laundry service included in hostel charges.",
    icon: "shirt",
  },
  {
    id: "wifi",
    name: "WiFi",
    description: "High-speed internet connectivity throughout the hostel premises.",
    icon: "wifi",
  },
  {
    id: "electricity",
    name: "Electricity",
    description: "Electricity charges included in hostel fees.",
    icon: "zap",
  },
  {
    id: "gym",
    name: "Gym",
    description: "Well-equipped gymnasium with modern equipment.",
    icon: "dumbbell",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    description: "Access to on-campus swimming pool facility.",
    icon: "waves",
  },
  {
    id: "housekeeping",
    name: "Housekeeping",
    description: "Daily housekeeping services for common areas and rooms.",
    icon: "broom",
  },
];

export const accounting = {
  hostel: {
    description: "All hostel fee will be paid to vendor directly",
    vendor: "Classic Accommodation",
  },
  mess: {
    description: "All mess fee (Veg) will be paid directly to mess operator",
    vendor: "Yummy Food Services",
  },
};

export const hostelRules = [
  "Students must maintain discipline and follow hostel timings",
  "Visitors allowed only in designated areas during visiting hours",
  "Smoking, alcohol, and drugs strictly prohibited",
  "Ragging is a punishable offense - zero tolerance policy",
  "Students must carry their ID cards at all times",
  "Damages to hostel property will be charged from caution money",
  "Room change requests considered only in exceptional cases",
];

export const admissionProcess = [
  "Hostel admission along with university admission",
  "Fill hostel accommodation form during admission process",
  "Select preferred room type based on availability",
  "Pay hostel fees and caution money",
  "Caution money of ₹10,000 is refundable at the time of leaving hostel",
  "Room allotment on first-come-first-serve basis",
  "Check-in with original documents and university ID",
  "Collect hostel ID card and room keys from warden",
];

export const importantNotes = [
  "All applicable taxes are included in the amounts quoted",
  "Hostel charges are per semester",
  "Caution money of ₹10,000 is refundable (subject to no damage)",
  "Mess charges of ₹55,000 per semester (Veg) charged separately",
  "Hostel fees to be paid to vendor directly — Classic Accommodation",
  "Mess fees to be paid directly to mess operator — Yummy Food Services",
  "Room type subject to availability - early admission recommended",
  "Hostel charges include Laundry, WiFi, Electricity, Gym, Swimming Pool, and Housekeeping",
  "Mess charges include Breakfast, Lunch, Hi Tea, and Dinner",
];