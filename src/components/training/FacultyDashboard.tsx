
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, Save, FileSpreadsheet } from 'lucide-react';
import { toast } from "sonner";

interface FacultyDashboardProps {
  facultyUsername: string;
}

// Mock data for the demostration
const mockStudentData = [
  { id: '1', name: 'John Doe', roll: 'CSE001', performanceLevel: '', feedback: '' },
  { id: '2', name: 'Jane Smith', roll: 'CSE002', performanceLevel: '', feedback: '' },
  { id: '3', name: 'Bob Brown', roll: 'CSE003', performanceLevel: '', feedback: '' },
  { id: '4', name: 'Alice Johnson', roll: 'CSE004', performanceLevel: '', feedback: '' },
  { id: '5', name: 'Charlie Wilson', roll: 'CSE005', performanceLevel: '', feedback: '' },
];

// Mock subject assignment
const mockFacultySubject = {
  faculty1: 'Java',
  faculty2: 'Python',
  faculty3: 'CC',
};

const performanceLevels = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'average', label: 'Average' },
  { value: 'decent', label: 'Decent' },
  { value: 'bad', label: 'Bad' },
];

const FacultyDashboard = ({ facultyUsername }: FacultyDashboardProps) => {
  const [students, setStudents] = useState(mockStudentData);
  // Get assigned subject based on faculty username
  const assignedSubject = mockFacultySubject[facultyUsername as keyof typeof mockFacultySubject] || 'Not Assigned';
  
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsFileUploaded(true);
      toast.success('Student data file uploaded successfully');
      // In a real app, we would parse the Excel/CSV file here
      // For demo, we'll just use our mock data
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
    toast.success('Student evaluations saved successfully');
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    toast.success('Evaluation report ready for download');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Faculty Dashboard</h2>
          <p className="text-muted-foreground">
            Subject: <span className="font-medium text-primary">{assignedSubject}</span>
          </p>
        </div>
      </div>

      {!isFileUploaded ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Student Data</h3>
          <p className="text-muted-foreground mb-4">
            Upload an Excel/CSV file containing the list of students for evaluation
          </p>
          <div className="flex justify-center">
            <Label 
              htmlFor="file-upload" 
              className="stellar-btn py-2 px-4 flex items-center gap-2 cursor-pointer"
            >
              <Upload size={16} />
              Choose File
            </Label>
            <Input 
              id="file-upload" 
              type="file" 
              accept=".xlsx,.xls,.csv" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={20} className="text-primary" />
              <span>{fileName}</span>
            </div>
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

          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-medium mb-4">Student Evaluations</h3>
            
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
        </>
      )}
    </div>
  );
};

export default FacultyDashboard;
