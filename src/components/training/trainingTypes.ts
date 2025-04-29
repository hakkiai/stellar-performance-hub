
// Define types for student data
export interface Student {
  id: string;
  name: string;
  roll: string; // hallticket_no
  regulation: string;
  batch: string;
  branch: string;
  performanceLevel: string;
  feedback: string;
}

// Define types for the nested data structure
export interface RegulationData {
  [regulation: string]: Student[];
}

export interface BranchData {
  [branch: string]: RegulationData;
}

export interface YearData {
  [year: string]: BranchData;
}

// Roll Number Range Filter
export interface RollNumberRange {
  start: string;
  end: string;
}

// Mapping for faculty usernames to their details
export interface FacultyDetail {
  name: string;
  subject: string;
}

export interface FacultyDetailsMap {
  [key: string]: FacultyDetail;
}

export const performanceLevels = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'decent', label: 'Decent' },
  { value: 'bad', label: 'Bad' },
];

export interface SessionRecord {
  id: string;
  date: string;
  branch: string;
  regulation: string;
  subject: string;
  testConducted: string;
  studentsAppeared: string[];
  rollRange?: RollNumberRange;
}

// New interface for CSV Student Data
export interface CSVStudentData {
  hallticket_no: string;
  regulation: string;
  batch: string;
  branch: string;
  student_name: string;
}

// Branch options
export const branchOptions = ["CSE", "CSM", "MECH", "CIVIL", "ECE"];

// Regulation options
export const regulationOptions = ["R20", "R19", "R18", "R22"];
