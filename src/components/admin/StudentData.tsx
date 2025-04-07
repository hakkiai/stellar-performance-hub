
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Filter } from 'lucide-react';

// Mock student data for different years
const initialStudents = [
  // 4th year students (roll numbers starting with 216K1A05)
  { id: '1', rollNumber: '216K1A0501', name: 'John Smith', year: '4th', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '2', rollNumber: '216K1A0502', name: 'Jane Doe', year: '4th', branch: 'CSE', section: 'A', performance: 'Excellent' },
  { id: '3', rollNumber: '216K1A0503', name: 'Robert Johnson', year: '4th', branch: 'CSE', section: 'A', performance: 'Average' },
  { id: '4', rollNumber: '216K1A0504', name: 'Emily Wilson', year: '4th', branch: 'CSE', section: 'B', performance: 'Good' },
  { id: '5', rollNumber: '216K1A0505', name: 'Michael Brown', year: '4th', branch: 'CS', section: 'A', performance: 'Decent' },
  { id: '6', rollNumber: '216K1A0506', name: 'Sarah Miller', year: '4th', branch: 'CS', section: 'A', performance: 'Bad' },
  { id: '7', rollNumber: '216K1A0507', name: 'David Garcia', year: '4th', branch: 'CS', section: 'B', performance: 'Average' },
  { id: '8', rollNumber: '216K1A0508', name: 'Jessica Martinez', year: '4th', branch: 'CS', section: 'B', performance: 'Excellent' },
  { id: '9', rollNumber: '216K1A0509', name: 'Thomas Anderson', year: '4th', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '10', rollNumber: '216K1A0510', name: 'Jennifer Taylor', year: '4th', branch: 'CSE', section: 'B', performance: 'Decent' },
  
  // 3rd year students (roll numbers starting with 226K1A05)
  { id: '11', rollNumber: '226K1A0501', name: 'Daniel Williams', year: '3rd', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '12', rollNumber: '226K1A0502', name: 'Olivia Jones', year: '3rd', branch: 'CSE', section: 'A', performance: 'Excellent' },
  { id: '13', rollNumber: '226K1A0503', name: 'James Brown', year: '3rd', branch: 'CSE', section: 'B', performance: 'Average' },
  { id: '14', rollNumber: '226K1A0504', name: 'Sophia Davis', year: '3rd', branch: 'CSE', section: 'B', performance: 'Good' },
  { id: '15', rollNumber: '226K1A0505', name: 'William Miller', year: '3rd', branch: 'CS', section: 'A', performance: 'Decent' },
  { id: '16', rollNumber: '226K1A0506', name: 'Emma Wilson', year: '3rd', branch: 'CS', section: 'A', performance: 'Bad' },
  { id: '17', rollNumber: '226K1A0507', name: 'Alexander Moore', year: '3rd', branch: 'CS', section: 'B', performance: 'Average' },
  { id: '18', rollNumber: '226K1A0508', name: 'Charlotte Taylor', year: '3rd', branch: 'CS', section: 'B', performance: 'Excellent' },
  { id: '19', rollNumber: '226K1A0509', name: 'Benjamin Martin', year: '3rd', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '20', rollNumber: '226K1A0510', name: 'Ava Thompson', year: '3rd', branch: 'CSE', section: 'B', performance: 'Decent' },
  
  // 2nd year students (roll numbers starting with 236K1A05)
  { id: '21', rollNumber: '236K1A0501', name: 'Ethan Anderson', year: '2nd', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '22', rollNumber: '236K1A0502', name: 'Mia Thomas', year: '2nd', branch: 'CSE', section: 'A', performance: 'Excellent' },
  { id: '23', rollNumber: '236K1A0503', name: 'Noah Jackson', year: '2nd', branch: 'CSE', section: 'B', performance: 'Average' },
  { id: '24', rollNumber: '236K1A0504', name: 'Amelia White', year: '2nd', branch: 'CSE', section: 'B', performance: 'Good' },
  { id: '25', rollNumber: '236K1A0505', name: 'Jacob Harris', year: '2nd', branch: 'CS', section: 'A', performance: 'Decent' },
  { id: '26', rollNumber: '236K1A0506', name: 'Harper Clark', year: '2nd', branch: 'CS', section: 'A', performance: 'Bad' },
  { id: '27', rollNumber: '236K1A0507', name: 'Logan Lewis', year: '2nd', branch: 'CS', section: 'B', performance: 'Average' },
  { id: '28', rollNumber: '236K1A0508', name: 'Isabella Lee', year: '2nd', branch: 'CS', section: 'B', performance: 'Excellent' },
  { id: '29', rollNumber: '236K1A0509', name: 'Samuel Walker', year: '2nd', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '30', rollNumber: '236K1A0510', name: 'Grace Hall', year: '2nd', branch: 'CSE', section: 'B', performance: 'Decent' },
  
  // 1st year students (roll numbers starting with 246K1A05)
  { id: '31', rollNumber: '246K1A0501', name: 'Mason Young', year: '1st', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '32', rollNumber: '246K1A0502', name: 'Scarlett Allen', year: '1st', branch: 'CSE', section: 'A', performance: 'Excellent' },
  { id: '33', rollNumber: '246K1A0503', name: 'Lucas King', year: '1st', branch: 'CSE', section: 'B', performance: 'Average' },
  { id: '34', rollNumber: '246K1A0504', name: 'Aria Wright', year: '1st', branch: 'CSE', section: 'B', performance: 'Good' },
  { id: '35', rollNumber: '246K1A0505', name: 'Henry Scott', year: '1st', branch: 'CS', section: 'A', performance: 'Decent' },
  { id: '36', rollNumber: '246K1A0506', name: 'Zoe Adams', year: '1st', branch: 'CS', section: 'A', performance: 'Bad' },
  { id: '37', rollNumber: '246K1A0507', name: 'Jackson Nelson', year: '1st', branch: 'CS', section: 'B', performance: 'Average' },
  { id: '38', rollNumber: '246K1A0508', name: 'Chloe Baker', year: '1st', branch: 'CS', section: 'B', performance: 'Excellent' },
  { id: '39', rollNumber: '246K1A0509', name: 'Carter Hill', year: '1st', branch: 'CSE', section: 'A', performance: 'Good' },
  { id: '40', rollNumber: '246K1A0510', name: 'Lily Green', year: '1st', branch: 'CSE', section: 'B', performance: 'Decent' },
];

const StudentData = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = yearFilter === 'all' || student.year === yearFilter;
    const matchesBranch = branchFilter === 'all' || student.branch === branchFilter;
    const matchesPerformance = performanceFilter === 'all' || student.performance === performanceFilter;
    
    return matchesSearch && matchesYear && matchesBranch && matchesPerformance;
  });

  const handleDownloadReport = () => {
    // In a real app, this would generate a CSV/Excel report
    alert('Downloading student report...');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st">1st Year</SelectItem>
                <SelectItem value="2nd">2nd Year</SelectItem>
                <SelectItem value="3rd">3rd Year</SelectItem>
                <SelectItem value="4th">4th Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="CS">CS</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Average">Average</SelectItem>
                <SelectItem value="Decent">Decent</SelectItem>
                <SelectItem value="Bad">Bad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleDownloadReport} 
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Download size={16} />
          Download Report
        </Button>
      </div>
      
      <div className="bg-secondary/5 backdrop-blur-sm rounded-lg p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-mono">{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.performance === 'Excellent' ? 'bg-green-500/20 text-green-500' :
                      student.performance === 'Good' ? 'bg-blue-500/20 text-blue-500' :
                      student.performance === 'Average' ? 'bg-yellow-500/20 text-yellow-500' :
                      student.performance === 'Decent' ? 'bg-orange-500/20 text-orange-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {student.performance}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No students match the current filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentData;
