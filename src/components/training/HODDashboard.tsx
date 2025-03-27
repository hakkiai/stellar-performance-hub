
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash, User, BookOpen, Users } from 'lucide-react';
import { toast } from "sonner";
import UserManagementForm from './UserManagementForm';
import SubjectManagementForm from './SubjectManagementForm';

// Mock data for the demo
const initialFaculty = [
  { id: '1', username: 'faculty1', name: 'Dr. Smith', subject: 'Java' },
  { id: '2', username: 'faculty2', name: 'Dr. Johnson', subject: 'Python' },
  { id: '3', username: 'faculty3', name: 'Prof. Williams', subject: 'CC' },
];

const initialStudents = [
  { id: '1', username: 'student1', name: 'John Doe', class: 'CSE-A' },
  { id: '2', username: 'student2', name: 'Jane Smith', class: 'CSE-A' },
  { id: '3', username: 'student3', name: 'Bob Brown', class: 'CSE-B' },
];

const initialSubjects = [
  { id: '1', name: 'Java', description: 'Programming with Java' },
  { id: '2', name: 'Python', description: 'Python Programming' },
  { id: '3', name: 'CC', description: 'Cloud Computing' },
  { id: '4', name: 'Aptitude', description: 'Aptitude Training' },
  { id: '5', name: 'Verbal Ability', description: 'English & Communication' },
];

const HODDashboard = () => {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [students, setStudents] = useState(initialStudents);
  const [subjects, setSubjects] = useState(initialSubjects);
  
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  
  const [editItem, setEditItem] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  // Faculty management functions
  const handleAddFaculty = (newFaculty: any) => {
    setFaculty([...faculty, { ...newFaculty, id: Date.now().toString() }]);
    setShowFacultyForm(false);
    toast.success(`Faculty ${newFaculty.name} added successfully`);
  };

  const handleEditFaculty = (id: string) => {
    const facultyToEdit = faculty.find(f => f.id === id);
    if (facultyToEdit) {
      setEditItem(facultyToEdit);
      setEditMode(true);
      setShowFacultyForm(true);
    }
  };

  const handleUpdateFaculty = (updatedFaculty: any) => {
    setFaculty(faculty.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
    setShowFacultyForm(false);
    setEditItem(null);
    setEditMode(false);
    toast.success(`Faculty ${updatedFaculty.name} updated successfully`);
  };

  const handleDeleteFaculty = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
    toast.success("Faculty removed successfully");
  };

  // Student management functions
  const handleAddStudent = (newStudent: any) => {
    setStudents([...students, { ...newStudent, id: Date.now().toString() }]);
    setShowStudentForm(false);
    toast.success(`Student ${newStudent.name} added successfully`);
  };

  const handleEditStudent = (id: string) => {
    const studentToEdit = students.find(s => s.id === id);
    if (studentToEdit) {
      setEditItem(studentToEdit);
      setEditMode(true);
      setShowStudentForm(true);
    }
  };

  const handleUpdateStudent = (updatedStudent: any) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setShowStudentForm(false);
    setEditItem(null);
    setEditMode(false);
    toast.success(`Student ${updatedStudent.name} updated successfully`);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success("Student removed successfully");
  };

  // Subject management functions
  const handleAddSubject = (newSubject: any) => {
    setSubjects([...subjects, { ...newSubject, id: Date.now().toString() }]);
    setShowSubjectForm(false);
    toast.success(`Subject ${newSubject.name} added successfully`);
  };

  const handleEditSubject = (id: string) => {
    const subjectToEdit = subjects.find(s => s.id === id);
    if (subjectToEdit) {
      setEditItem(subjectToEdit);
      setEditMode(true);
      setShowSubjectForm(true);
    }
  };

  const handleUpdateSubject = (updatedSubject: any) => {
    setSubjects(subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s));
    setShowSubjectForm(false);
    setEditItem(null);
    setEditMode(false);
    toast.success(`Subject ${updatedSubject.name} updated successfully`);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast.success("Subject removed successfully");
  };

  return (
    <div>
      <Tabs defaultValue="faculty" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <User size={16} />
            Faculty Management
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users size={16} />
            Student Management
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BookOpen size={16} />
            Subject Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faculty" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => {
                setEditMode(false);
                setEditItem(null);
                setShowFacultyForm(true);
              }} 
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add Faculty
            </Button>
          </div>
          
          {showFacultyForm && (
            <UserManagementForm
              userType="faculty"
              onSubmit={editMode ? handleUpdateFaculty : handleAddFaculty}
              onCancel={() => {
                setShowFacultyForm(false);
                setEditItem(null);
                setEditMode(false);
              }}
              editData={editItem}
              isEditMode={editMode}
              subjects={subjects}
            />
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Assigned Subject</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>{f.username}</TableCell>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>{f.subject}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditFaculty(f.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteFaculty(f.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => {
                setEditMode(false);
                setEditItem(null);
                setShowStudentForm(true);
              }} 
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add Student
            </Button>
          </div>
          
          {showStudentForm && (
            <UserManagementForm
              userType="student"
              onSubmit={editMode ? handleUpdateStudent : handleAddStudent}
              onCancel={() => {
                setShowStudentForm(false);
                setEditItem(null);
                setEditMode(false);
              }}
              editData={editItem}
              isEditMode={editMode}
            />
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.username}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditStudent(s.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteStudent(s.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => {
                setEditMode(false);
                setEditItem(null);
                setShowSubjectForm(true);
              }} 
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Add Subject
            </Button>
          </div>
          
          {showSubjectForm && (
            <SubjectManagementForm
              onSubmit={editMode ? handleUpdateSubject : handleAddSubject}
              onCancel={() => {
                setShowSubjectForm(false);
                setEditItem(null);
                setEditMode(false);
              }}
              editData={editItem}
              isEditMode={editMode}
            />
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditSubject(s.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteSubject(s.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HODDashboard;
