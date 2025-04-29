
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
import { Student, FacultyDetailsMap, performanceLevels, branchOptions, SessionRecord } from './trainingTypes';

interface FacultyDashboardProps {
  facultyUsername: string;
}

// Mock student data for the different years and branches
const mockStudentsData = {
  '1': {
    'CSE': {
      'R20': [
        { id: '1A01', name: 'Rahul Kumar', roll: 'CSE2023001', regulation: 'R20', batch: '2023-27', branch: 'CSE', performanceLevel: '', feedback: '' },
        { id: '1A02', name: 'Priya Sharma', roll: 'CSE2023002', regulation: 'R20', batch: '2023-27', branch: 'CSE', performanceLevel: '', feedback: '' },
        { id: '1A03', name: 'Amit Singh', roll: 'CSE2023003', regulation: 'R20', batch: '2023-27', branch: 'CSE', performanceLevel: '', feedback: '' }
      ],
      'R19': [
        { id: '1B01', name: 'Arun Verma', roll: 'CSE2023101', regulation: 'R19', batch: '2023-27', branch: 'CSE', performanceLevel: '', feedback: '' },
        { id: '1B02', name: 'Divya Mishra', roll: 'CSE2023102', regulation: 'R19', batch: '2023-27', branch: 'CSE', performanceLevel: '', feedback: '' }
      ]
    },
    'CSM': {
      'R20': [
        { id: '1C01', name: 'Suresh Reddy', roll: 'CSM2023001', regulation: 'R20', batch: '2023-27', branch: 'CSM', performanceLevel: '', feedback: '' },
        { id: '1C02', name: 'Kavita Rao', roll: 'CSM2023002', regulation: 'R20', batch: '2023-27', branch: 'CSM', performanceLevel: '', feedback: '' }
      ]
    },
    'MECH': {
      'R20': [
        { id: '1D01', name: 'Anand Kumar', roll: 'MECH2023001', regulation: 'R20', batch: '2023-27', branch: 'MECH', performanceLevel: '', feedback: '' },
        { id: '1D02', name: 'Shilpa Iyer', roll: 'MECH2023002', regulation: 'R20', batch: '2023-27', branch: 'MECH', performanceLevel: '', feedback: '' }
      ]
    },
    'CIVIL': {
      'R20': [
        { id: '1E01', name: 'Ramesh Kumar', roll: 'CIVIL2023001', regulation: 'R20', batch: '2023-27', branch: 'CIVIL', performanceLevel: '', feedback: '' },
        { id: '1E02', name: 'Preethi Singh', roll: 'CIVIL2023002', regulation: 'R20', batch: '2023-27', branch: 'CIVIL', performanceLevel: '', feedback: '' }
      ]
    },
    'ECE': {
      'R20': [
        { id: '1F01', name: 'Deepak Sharma', roll: 'ECE2023001', regulation: 'R20', batch: '2023-27', branch: 'ECE', performanceLevel: '', feedback: '' },
        { id: '1F02', name: 'Anjali Patel', roll: 'ECE2023002', regulation: 'R20', batch: '2023-27', branch: 'ECE', performanceLevel: '', feedback: '' }
      ]
    }
  },
  '2': {
    'CSE': {
      'R20': [
        { id: '2A01', name: 'Rajesh Khanna', roll: 'CSE2022001', regulation: 'R20', batch: '2022-26', branch: 'CSE', performanceLevel: '', feedback: '' },
        { id: '2A02', name: 'Pooja Mehta', roll: 'CSE2022002', regulation: 'R20', batch: '2022-26', branch: 'CSE', performanceLevel: '', feedback: '' }
      ]
    },
    'CSM': {
      'R20': [
        { id: '2B01', name: 'Manoj Patel', roll: 'CSM2022101', regulation: 'R20', batch: '2022-26', branch: 'CSM', performanceLevel: '', feedback: '' },
        { id: '2B02', name: 'Anjali Reddy', roll: 'CSM2022102', regulation: 'R20', batch: '2022-26', branch: 'CSM', performanceLevel: '', feedback: '' }
      ]
    },
    'MECH': {
      'R20': [
        { id: '2D01', name: 'Smita Kapoor', roll: 'MECH2022001', regulation: 'R20', batch: '2022-26', branch: 'MECH', performanceLevel: '', feedback: '' },
        { id: '2D02', name: 'Aditya Gupta', roll: 'MECH2022002', regulation: 'R20', batch: '2022-26', branch: 'MECH', performanceLevel: '', feedback: '' }
      ]
    }
  },
  '3': {
    'CSE': {
      'R19': [
        { id: '3A01', name: 'Vivek Maran', roll: 'CSE2021001', regulation: 'R19', batch: '2021-25', branch: 'CSE', performanceLevel: '', feedback: '' },
        { id: '3A02', name: 'Sneha Saha', roll: 'CSE2021002', regulation: 'R19', batch: '2021-25', branch: 'CSE', performanceLevel: '', feedback: '' }
      ]
    },
    'CSM': {
      'R19': [
        { id: '3B01', name: 'Rakesh Singh', roll: 'CSM2021101', regulation: 'R19', batch: '2021-25', branch: 'CSM', performanceLevel: '', feedback: '' },
        { id: '3B02', name: 'Kavya Nair', roll: 'CSM2021102', regulation: 'R19', batch: '2021-25', branch: 'CSM', performanceLevel: '', feedback: '' }
      ]
    }
  }
};

// Available regulations
const regulations = ['R20', 'R19', 'R18'];

// Mapping for faculty usernames to their details
const facultyDetails: FacultyDetailsMap = {
  'sairaj': { name: 'Sai Raj', subject: 'Java' },
  'anjali': { name: 'Anjali Sharma', subject: 'Python' },
  'ravi': { name: 'Ravi Kumar', subject: 'Cloud Computing' },
  'abhishek': { name: 'Abhishek Mishra', subject: 'Data Structures' },
};

const years = ['1', '2', '3', '4'];

const FacultyDashboard = ({ facultyUsername }: FacultyDashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>("sessions");
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('');
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
    setSelectedBranch('');
    setSelectedRegulation('');
    setStudents([]);
  };

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    setSelectedRegulation('');
    setStudents([]);
  };

  const handleRegulationChange = (regulation: string) => {
    setSelectedRegulation(regulation);
    
    if (selectedYear && selectedBranch && mockStudentsData[selectedYear]?.[selectedBranch]?.[regulation]) {
      setStudents(mockStudentsData[selectedYear][selectedBranch][regulation] || []);
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
    if (!selectedYear || !selectedBranch || !selectedRegulation || !subject) {
      toast.error("Please select year, branch, regulation, and subject before saving");
      return;
    }

    const newSession: SessionRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      year: selectedYear,
      branch: selectedBranch,
      regulation: selectedRegulation,
      subject: subject,
      testConducted: testConducted,
      studentsAppeared: selectedStudents,
    };

    setSessionRecords([...sessionRecords, newSession]);
    toast.success(`Session record saved for ${subject} - Year ${selectedYear}, Branch ${selectedBranch}, Regulation ${selectedRegulation}`);
  };

  const handleSaveEvaluations = () => {
    // In a real app, this would save to backend
    toast.success(`Evaluations saved for Year ${selectedYear}, Branch ${selectedBranch}, Regulation ${selectedRegulation}`);
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    toast.success(`Report generated for Year ${selectedYear}, Branch ${selectedBranch}, Regulation ${selectedRegulation}`);
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                    {branchOptions.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="regulation-select">Regulation</Label>
                <Select 
                  value={selectedRegulation} 
                  onValueChange={handleRegulationChange}
                  disabled={!selectedYear || !selectedBranch}
                >
                  <SelectTrigger id="regulation-select">
                    <SelectValue placeholder="Select regulation" />
                  </SelectTrigger>
                  <SelectContent>
                    {regulations.map((regulation) => (
                      <SelectItem key={regulation} value={regulation}>
                        {regulation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedYear && selectedBranch && selectedRegulation && (
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

          {selectedYear && selectedBranch && selectedRegulation && students.length > 0 ? (
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">
                  Student Evaluations - Year {selectedYear}, Branch {selectedBranch}, Regulation {selectedRegulation}
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
          ) : selectedYear && selectedBranch && selectedRegulation ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No students found for the selected year, branch, and regulation.</p>
            </div>
          ) : (
            <div className="text-center py-8 glass-card rounded-lg">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Select Year, Branch, and Regulation</p>
              <p className="text-muted-foreground">
                Please select all options to view session details and evaluate students.
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
