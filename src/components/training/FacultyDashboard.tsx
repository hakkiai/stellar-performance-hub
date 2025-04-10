
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Save, Filter } from 'lucide-react';
import { toast } from "sonner";

interface FacultyDashboardProps {
  facultyUsername: string;
}

// Define types for student data
interface Student {
  id: string;
  name: string;
  roll: string;
  performanceLevel: string;
  feedback: string;
}

// Define types for the nested data structure
interface SectionData {
  [section: string]: Student[];
}

interface YearData {
  [year: string]: SectionData;
}

// Mock student data for the different years and sections
const mockStudentsData: YearData = {
  '1': {
    'A': [
      { id: '1A01', name: 'Rahul Kumar', roll: 'CSE2023001', performanceLevel: '', feedback: '' },
      { id: '1A02', name: 'Priya Sharma', roll: 'CSE2023002', performanceLevel: '', feedback: '' },
      { id: '1A03', name: 'Amit Singh', roll: 'CSE2023003', performanceLevel: '', feedback: '' },
      { id: '1A04', name: 'Neha Gupta', roll: 'CSE2023004', performanceLevel: '', feedback: '' },
      { id: '1A05', name: 'Vikram Patel', roll: 'CSE2023005', performanceLevel: '', feedback: '' },
    ],
    'B': [
      { id: '1B01', name: 'Arun Verma', roll: 'CSE2023101', performanceLevel: '', feedback: '' },
      { id: '1B02', name: 'Divya Mishra', roll: 'CSE2023102', performanceLevel: '', feedback: '' },
      { id: '1B03', name: 'Karan Joshi', roll: 'CSE2023103', performanceLevel: '', feedback: '' },
      { id: '1B04', name: 'Meera Roy', roll: 'CSE2023104', performanceLevel: '', feedback: '' },
      { id: '1B05', name: 'Nikhil Tiwari', roll: 'CSE2023105', performanceLevel: '', feedback: '' },
    ]
  },
  '2': {
    'A': [
      { id: '2A01', name: 'Rajesh Khanna', roll: 'CSE2022001', performanceLevel: '', feedback: '' },
      { id: '2A02', name: 'Pooja Mehta', roll: 'CSE2022002', performanceLevel: '', feedback: '' },
      { id: '2A03', name: 'Sanjay Kumar', roll: 'CSE2022003', performanceLevel: '', feedback: '' },
      { id: '2A04', name: 'Deepika Rao', roll: 'CSE2022004', performanceLevel: '', feedback: '' },
      { id: '2A05', name: 'Vinod Shah', roll: 'CSE2022005', performanceLevel: '', feedback: '' },
    ],
    'B': [
      { id: '2B01', name: 'Manoj Patel', roll: 'CSE2022101', performanceLevel: '', feedback: '' },
      { id: '2B02', name: 'Anjali Reddy', roll: 'CSE2022102', performanceLevel: '', feedback: '' },
      { id: '2B03', name: 'Rohit Dubey', roll: 'CSE2022103', performanceLevel: '', feedback: '' },
      { id: '2B04', name: 'Shweta Nair', roll: 'CSE2022104', performanceLevel: '', feedback: '' },
      { id: '2B05', name: 'Rahul Agarwal', roll: 'CSE2022105', performanceLevel: '', feedback: '' },
    ]
  },
  '3': {
    'A': [
      { id: '3A01', name: 'Vivek Maran', roll: 'CSE2021001', performanceLevel: '', feedback: '' },
      { id: '3A02', name: 'Sneha Saha', roll: 'CSE2021002', performanceLevel: '', feedback: '' },
      { id: '3A03', name: 'Raj Malhotra', roll: 'CSE2021003', performanceLevel: '', feedback: '' },
      { id: '3A04', name: 'Ananya Das', roll: 'CSE2021004', performanceLevel: '', feedback: '' },
      { id: '3A05', name: 'Suresh Pillai', roll: 'CSE2021005', performanceLevel: '', feedback: '' },
    ],
    'B': [
      { id: '3B01', name: 'Rakesh Singh', roll: 'CSE2021101', performanceLevel: '', feedback: '' },
      { id: '3B02', name: 'Kavya Nair', roll: 'CSE2021102', performanceLevel: '', feedback: '' },
      { id: '3B03', name: 'Prakash Iyer', roll: 'CSE2021103', performanceLevel: '', feedback: '' },
      { id: '3B04', name: 'Meenakshi Das', roll: 'CSE2021104', performanceLevel: '', feedback: '' },
      { id: '3B05', name: 'Rajeev Kumar', roll: 'CSE2021105', performanceLevel: '', feedback: '' },
    ]
  },
  '4': {
    'A': [
      { id: '4A01', name: 'Ajay Reddy', roll: 'CSE2020001', performanceLevel: '', feedback: '' },
      { id: '4A02', name: 'Suman Verma', roll: 'CSE2020002', performanceLevel: '', feedback: '' },
      { id: '4A03', name: 'Deepak Gupta', roll: 'CSE2020003', performanceLevel: '', feedback: '' },
      { id: '4A04', name: 'Aarti Singh', roll: 'CSE2020004', performanceLevel: '', feedback: '' },
      { id: '4A05', name: 'Vijay Sharma', roll: 'CSE2020005', performanceLevel: '', feedback: '' },
    ],
    'B': [
      { id: '4B01', name: 'Mohan Lal', roll: 'CSE2020101', performanceLevel: '', feedback: '' },
      { id: '4B02', name: 'Riya Choudhury', roll: 'CSE2020102', performanceLevel: '', feedback: '' },
      { id: '4B03', name: 'Siddharth Roy', roll: 'CSE2020103', performanceLevel: '', feedback: '' },
      { id: '4B04', name: 'Aishwarya Patel', roll: 'CSE2020104', performanceLevel: '', feedback: '' },
      { id: '4B05', name: 'Kunal Sharma', roll: 'CSE2020105', performanceLevel: '', feedback: '' },
    ]
  }
};

// Mapping for faculty usernames to their details
interface FacultyDetail {
  name: string;
  subject: string;
}

interface FacultyDetailsMap {
  [key: string]: FacultyDetail;
}

const facultyDetails: FacultyDetailsMap = {
  'sairaj': { name: 'Sai Raj', subject: 'Java' },
  'anjali': { name: 'Anjali Sharma', subject: 'Python' },
  'ravi': { name: 'Ravi Kumar', subject: 'Cloud Computing' },
  'abhishek': { name: 'Abhishek Mishra', subject: 'Data Structures' },
};

const performanceLevels = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'decent', label: 'Decent' },
  { value: 'bad', label: 'Bad' },
];

const years = ['1', '2', '3', '4'];
const sections = ['A', 'B'];

const FacultyDashboard = ({ facultyUsername }: FacultyDashboardProps) => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  
  // Get faculty details based on username
  const faculty = facultyDetails[facultyUsername] || 
    { name: facultyUsername, subject: 'Not Assigned' };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (selectedSection && mockStudentsData[year]) {
      setStudents(mockStudentsData[year][selectedSection] || []);
    } else {
      setStudents([]);
    }
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    if (selectedYear && mockStudentsData[selectedYear]) {
      setStudents(mockStudentsData[selectedYear][section] || []);
    } else {
      setStudents([]);
    }
  };

  const handlePerformanceChange = (studentId: string, value: string) => {
    setStudents(
      students.map(student => 
        student.id === studentId 
          ? { ...student, performanceLevel: value } 
          : student
      )
    );
  };

  const handleFeedbackChange = (studentId: string, value: string) => {
    setStudents(
      students.map(student => 
        student.id === studentId 
          ? { ...student, feedback: value } 
          : student
      )
    );
  };

  const handleSaveEvaluations = () => {
    // In a real app, this would save to backend
    toast.success(`Evaluations saved for Year ${selectedYear}, Section ${selectedSection}`);
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    toast.success(`Report generated for Year ${selectedYear}, Section ${selectedSection}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Faculty Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome, <span className="font-medium text-primary">{faculty.name}</span> - 
            Subject: <span className="font-medium text-primary">{faculty.subject}</span>
          </p>
        </div>
      </div>

      <div className="glass-card p-4 rounded-lg">
        <h3 className="font-medium mb-4 text-lg">Select Class</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="year-select">Year</Label>
            <Select 
              value={selectedYear} 
              onValueChange={handleYearChange}
            >
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year === '1' ? '1st Year' : 
                     year === '2' ? '2nd Year' : 
                     year === '3' ? '3rd Year' : '4th Year'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="section-select">Section</Label>
            <Select 
              value={selectedSection} 
              onValueChange={handleSectionChange}
              disabled={!selectedYear}
            >
              <SelectTrigger id="section-select">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedYear && selectedSection && students.length > 0 ? (
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lg">
              Student Evaluations - Year {selectedYear}, Section {selectedSection}
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleSaveEvaluations}
              >
                <Save size={16} />
                Save Evaluations
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={handleDownloadReport}
              >
                <Download size={16} />
                Download Report
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Performance Level</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="w-48">
                    <Select 
                      value={student.performanceLevel} 
                      onValueChange={(value) => handlePerformanceChange(student.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {performanceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Textarea 
                      value={student.feedback}
                      onChange={(e) => handleFeedbackChange(student.id, e.target.value)}
                      placeholder="Enter feedback"
                      className="min-h-[80px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : selectedYear && selectedSection ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No students found for the selected year and section.</p>
        </div>
      ) : (
        <div className="text-center py-8 glass-card rounded-lg">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Select Year and Section</p>
          <p className="text-muted-foreground">
            Please select a year and section to view and evaluate students.
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
