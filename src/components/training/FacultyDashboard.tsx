
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Save, Filter, BarChart2, Book, Calendar, Upload } from 'lucide-react';
import { toast } from "sonner";
import SessionRecordTable from './SessionRecordTable';
import AnalyticsView from './AnalyticsView';
import { Student, YearData, FacultyDetailsMap, performanceLevels } from './trainingTypes';

interface FacultyDashboardProps {
  facultyUsername: string;
}

// Mock student data for the different years and branches
const mockStudentsData: YearData = {
  '1': {
    'CSE-B': [
      { id: '1A01', name: 'Rahul Kumar', roll: 'CSE2023001', performanceLevel: '', feedback: '' },
      { id: '1A02', name: 'Priya Sharma', roll: 'CSE2023002', performanceLevel: '', feedback: '' },
      { id: '1A03', name: 'Amit Singh', roll: 'CSE2023003', performanceLevel: '', feedback: '' },
      { id: '1A04', name: 'Neha Gupta', roll: 'CSE2023004', performanceLevel: '', feedback: '' },
      { id: '1A05', name: 'Vikram Patel', roll: 'CSE2023005', performanceLevel: '', feedback: '' },
    ],
    'CSM': [
      { id: '1B01', name: 'Arun Verma', roll: 'CSM2023101', performanceLevel: '', feedback: '' },
      { id: '1B02', name: 'Divya Mishra', roll: 'CSM2023102', performanceLevel: '', feedback: '' },
      { id: '1B03', name: 'Karan Joshi', roll: 'CSM2023103', performanceLevel: '', feedback: '' },
      { id: '1B04', name: 'Meera Roy', roll: 'CSM2023104', performanceLevel: '', feedback: '' },
      { id: '1B05', name: 'Nikhil Tiwari', roll: 'CSM2023105', performanceLevel: '', feedback: '' },
    ],
    'MAC': [
      { id: '1C01', name: 'Suresh Reddy', roll: 'MAC2023001', performanceLevel: '', feedback: '' },
      { id: '1C02', name: 'Kavita Rao', roll: 'MAC2023002', performanceLevel: '', feedback: '' },
      { id: '1C03', name: 'Vikrant Mehta', roll: 'MAC2023003', performanceLevel: '', feedback: '' },
    ],
    'ECE': [
      { id: '1D01', name: 'Anand Kumar', roll: 'ECE2023001', performanceLevel: '', feedback: '' },
      { id: '1D02', name: 'Shilpa Iyer', roll: 'ECE2023002', performanceLevel: '', feedback: '' },
      { id: '1D03', name: 'Rajat Sharma', roll: 'ECE2023003', performanceLevel: '', feedback: '' },
    ]
  },
  '2': {
    'CSE-B': [
      { id: '2A01', name: 'Rajesh Khanna', roll: 'CSE2022001', performanceLevel: '', feedback: '' },
      { id: '2A02', name: 'Pooja Mehta', roll: 'CSE2022002', performanceLevel: '', feedback: '' },
      { id: '2A03', name: 'Sanjay Kumar', roll: 'CSE2022003', performanceLevel: '', feedback: '' },
      { id: '2A04', name: 'Deepika Rao', roll: 'CSE2022004', performanceLevel: '', feedback: '' },
      { id: '2A05', name: 'Vinod Shah', roll: 'CSE2022005', performanceLevel: '', feedback: '' },
    ],
    'CSM': [
      { id: '2B01', name: 'Manoj Patel', roll: 'CSM2022101', performanceLevel: '', feedback: '' },
      { id: '2B02', name: 'Anjali Reddy', roll: 'CSM2022102', performanceLevel: '', feedback: '' },
      { id: '2B03', name: 'Rohit Dubey', roll: 'CSM2022103', performanceLevel: '', feedback: '' },
      { id: '2B04', name: 'Shweta Nair', roll: 'CSM2022104', performanceLevel: '', feedback: '' },
      { id: '2B05', name: 'Rahul Agarwal', roll: 'CSM2022105', performanceLevel: '', feedback: '' },
    ],
    'MAC': [
      { id: '2C01', name: 'Prashant Jain', roll: 'MAC2022001', performanceLevel: '', feedback: '' },
      { id: '2C02', name: 'Nisha Verma', roll: 'MAC2022002', performanceLevel: '', feedback: '' },
      { id: '2C03', name: 'Vipul Singh', roll: 'MAC2022003', performanceLevel: '', feedback: '' },
    ],
    'ECE': [
      { id: '2D01', name: 'Smita Kapoor', roll: 'ECE2022001', performanceLevel: '', feedback: '' },
      { id: '2D02', name: 'Aditya Gupta', roll: 'ECE2022002', performanceLevel: '', feedback: '' },
      { id: '2D03', name: 'Komal Sharma', roll: 'ECE2022003', performanceLevel: '', feedback: '' },
    ]
  },
  '3': {
    'CSE-B': [
      { id: '3A01', name: 'Vivek Maran', roll: 'CSE2021001', performanceLevel: '', feedback: '' },
      { id: '3A02', name: 'Sneha Saha', roll: 'CSE2021002', performanceLevel: '', feedback: '' },
      { id: '3A03', name: 'Raj Malhotra', roll: 'CSE2021003', performanceLevel: '', feedback: '' },
      { id: '3A04', name: 'Ananya Das', roll: 'CSE2021004', performanceLevel: '', feedback: '' },
      { id: '3A05', name: 'Suresh Pillai', roll: 'CSE2021005', performanceLevel: '', feedback: '' },
    ],
    'CSM': [
      { id: '3B01', name: 'Rakesh Singh', roll: 'CSM2021101', performanceLevel: '', feedback: '' },
      { id: '3B02', name: 'Kavya Nair', roll: 'CSM2021102', performanceLevel: '', feedback: '' },
      { id: '3B03', name: 'Prakash Iyer', roll: 'CSM2021103', performanceLevel: '', feedback: '' },
      { id: '3B04', name: 'Meenakshi Das', roll: 'CSM2021104', performanceLevel: '', feedback: '' },
      { id: '3B05', name: 'Rajeev Kumar', roll: 'CSM2021105', performanceLevel: '', feedback: '' },
    ],
    'MAC': [
      { id: '3C01', name: 'Aman Khanna', roll: 'MAC2021001', performanceLevel: '', feedback: '' },
      { id: '3C02', name: 'Ritika Patel', roll: 'MAC2021002', performanceLevel: '', feedback: '' },
      { id: '3C03', name: 'Naveen Reddy', roll: 'MAC2021003', performanceLevel: '', feedback: '' },
    ],
    'ECE': [
      { id: '3D01', name: 'Sangeeta Roy', roll: 'ECE2021001', performanceLevel: '', feedback: '' },
      { id: '3D02', name: 'Rohan Kapoor', roll: 'ECE2021002', performanceLevel: '', feedback: '' },
      { id: '3D03', name: 'Sheetal Verma', roll: 'ECE2021003', performanceLevel: '', feedback: '' },
    ]
  },
  '4': {
    'CSE-B': [
      { id: '4A01', name: 'Ajay Reddy', roll: 'CSE2020001', performanceLevel: '', feedback: '' },
      { id: '4A02', name: 'Suman Verma', roll: 'CSE2020002', performanceLevel: '', feedback: '' },
      { id: '4A03', name: 'Deepak Gupta', roll: 'CSE2020003', performanceLevel: '', feedback: '' },
      { id: '4A04', name: 'Aarti Singh', roll: 'CSE2020004', performanceLevel: '', feedback: '' },
      { id: '4A05', name: 'Vijay Sharma', roll: 'CSE2020005', performanceLevel: '', feedback: '' },
    ],
    'CSM': [
      { id: '4B01', name: 'Mohan Lal', roll: 'CSM2020101', performanceLevel: '', feedback: '' },
      { id: '4B02', name: 'Riya Choudhury', roll: 'CSM2020102', performanceLevel: '', feedback: '' },
      { id: '4B03', name: 'Siddharth Roy', roll: 'CSM2020103', performanceLevel: '', feedback: '' },
      { id: '4B04', name: 'Aishwarya Patel', roll: 'CSM2020104', performanceLevel: '', feedback: '' },
      { id: '4B05', name: 'Kunal Sharma', roll: 'CSM2020105', performanceLevel: '', feedback: '' },
    ],
    'MAC': [
      { id: '4C01', name: 'Vikas Malhotra', roll: 'MAC2020001', performanceLevel: '', feedback: '' },
      { id: '4C02', name: 'Tanya Saxena', roll: 'MAC2020002', performanceLevel: '', feedback: '' },
      { id: '4C03', name: 'Farhan Ahmed', roll: 'MAC2020003', performanceLevel: '', feedback: '' },
    ],
    'ECE': [
      { id: '4D01', name: 'Jatin Mehra', roll: 'ECE2020001', performanceLevel: '', feedback: '' },
      { id: '4D02', name: 'Priyanka Gupta', roll: 'ECE2020002', performanceLevel: '', feedback: '' },
      { id: '4D03', name: 'Mohit Sharma', roll: 'ECE2020003', performanceLevel: '', feedback: '' },
    ]
  }
};

// Mapping for faculty usernames to their details
const facultyDetails: FacultyDetailsMap = {
  'sairaj': { name: 'Sai Raj', subject: 'Java' },
  'anjali': { name: 'Anjali Sharma', subject: 'Python' },
  'ravi': { name: 'Ravi Kumar', subject: 'Cloud Computing' },
  'abhishek': { name: 'Abhishek Mishra', subject: 'Data Structures' },
};

const years = ['1', '2', '3', '4'];
const branches = ['CSE-B', 'CSM', 'MAC', 'ECE'];

interface SessionRecord {
  id: string;
  date: string;
  year: string;
  branch: string;
  subject: string;
  testConducted: string;
  studentsAppeared: string[];
}

const FacultyDashboard = ({ facultyUsername }: FacultyDashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [testConducted, setTestConducted] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sessionRecords, setSessionRecords] = useState<SessionRecord[]>([]);
  
  // Get faculty details based on username
  const faculty = facultyDetails[facultyUsername] || 
    { name: facultyUsername, subject: 'Not Assigned' };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (selectedBranch && mockStudentsData[year]) {
      setStudents(mockStudentsData[year][selectedBranch] || []);
    } else {
      setStudents([]);
    }
  };

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    if (selectedYear && mockStudentsData[selectedYear]) {
      setStudents(mockStudentsData[selectedYear][branch] || []);
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

  const handleStudentSelection = (studentRoll: string) => {
    if (selectedStudents.includes(studentRoll)) {
      setSelectedStudents(selectedStudents.filter(roll => roll !== studentRoll));
    } else {
      setSelectedStudents([...selectedStudents, studentRoll]);
    }
  };

  const handleSaveSession = () => {
    if (!selectedYear || !selectedBranch || !subject) {
      toast.error("Please select year, branch, and subject before saving");
      return;
    }

    const newSession: SessionRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      year: selectedYear,
      branch: selectedBranch,
      subject: subject,
      testConducted: testConducted,
      studentsAppeared: selectedStudents,
    };

    setSessionRecords([...sessionRecords, newSession]);
    toast.success(`Session record saved for ${subject} - Year ${selectedYear}, Branch ${selectedBranch}`);
  };

  const handleSaveEvaluations = () => {
    // In a real app, this would save to backend
    toast.success(`Evaluations saved for Year ${selectedYear}, Branch ${selectedBranch}`);
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    toast.success(`Report generated for Year ${selectedYear}, Branch ${selectedBranch}`);
  };

  const handleFakeDataEntry = () => {
    // Populate with fake data
    setSubject(faculty.subject);
    setTestConducted("Quiz on " + faculty.subject + " fundamentals");
    setSelectedStudents(students.slice(0, 3).map(s => s.roll));
    
    // Randomly assign performance levels
    const levels = ["excellent", "good", "average", "decent", "bad"];
    setStudents(
      students.map(student => ({
        ...student,
        performanceLevel: levels[Math.floor(Math.random() * levels.length)],
        feedback: `Performance feedback for ${student.name} in ${faculty.subject}`
      }))
    );
    
    toast.success("Fake data populated for demonstration purposes");
  };

  const handleExcelUpload = () => {
    // In a real application, this would handle actual file upload
    toast.success("Excel file upload simulation completed");
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Calendar size={16} />
            Sessions & Evaluations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 size={16} />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-6">
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
                <Label htmlFor="branch-select">Branch</Label>
                <Select 
                  value={selectedBranch} 
                  onValueChange={handleBranchChange}
                  disabled={!selectedYear}
                >
                  <SelectTrigger id="branch-select">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedYear && selectedBranch && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Enter details about today's session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject-taught">Subject Taught Today</Label>
                  <Input 
                    id="subject-taught" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Java Programming"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="test-conducted">Test Conducted (if any)</Label>
                  <Input 
                    id="test-conducted" 
                    value={testConducted}
                    onChange={(e) => setTestConducted(e.target.value)}
                    placeholder="e.g. Quiz on Java Basics"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Students who appeared</Label>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2 py-1">
                        <Checkbox 
                          id={`student-${student.id}`}
                          checked={selectedStudents.includes(student.roll)}
                          onCheckedChange={() => handleStudentSelection(student.roll)}
                        />
                        <label 
                          htmlFor={`student-${student.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {student.roll} - {student.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={handleFakeDataEntry}
                  >
                    <Book size={16} />
                    Populate Demo Data
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleExcelUpload}
                  >
                    <Upload size={16} />
                    Upload Excel
                  </Button>
                  
                  <Button 
                    className="flex items-center gap-2 ml-auto"
                    onClick={handleSaveSession}
                  >
                    <Save size={16} />
                    Save Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {sessionRecords.length > 0 && (
            <SessionRecordTable 
              records={sessionRecords} 
              onDelete={(id) => {
                setSessionRecords(sessionRecords.filter(record => record.id !== id));
                toast.success("Session record deleted");
              }}
            />
          )}

          {selectedYear && selectedBranch && students.length > 0 ? (
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">
                  Student Evaluations - Year {selectedYear}, Branch {selectedBranch}
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
          ) : selectedYear && selectedBranch ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students found for the selected year and branch.</p>
            </div>
          ) : (
            <div className="text-center py-8 glass-card rounded-lg">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Select Year and Branch</p>
              <p className="text-muted-foreground">
                Please select a year and branch to view session details and evaluate students.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsView 
            facultyUsername={facultyUsername} 
            sessionRecords={sessionRecords}
            students={students}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyDashboard;
