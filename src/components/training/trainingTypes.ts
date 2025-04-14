
// Define types for student data
export interface Student {
  id: string;
  name: string;
  roll: string;
  performanceLevel: string;
  feedback: string;
}

// Define types for the nested data structure
export interface SectionData {
  [section: string]: Student[];
}

export interface YearData {
  [year: string]: SectionData;
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
  year: string;
  branch: string;
  subject: string;
  testConducted: string;
  studentsAppeared: string[];
}
