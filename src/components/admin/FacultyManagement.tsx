
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash, Filter, Search } from 'lucide-react';
import { toast } from "sonner";
import UserManagementForm from '../training/UserManagementForm';

// Mock faculty data
const initialFaculty = [
  { id: '1', username: 'faculty1', name: 'Dr. Smith', subject: 'Java' },
  { id: '2', username: 'faculty2', name: 'Dr. Johnson', subject: 'Python' },
  { id: '3', username: 'faculty3', name: 'Prof. Williams', subject: 'CC' },
  { id: '4', username: 'faculty4', name: 'Dr. Brown', subject: 'Aptitude' },
  { id: '5', username: 'faculty5', name: 'Prof. Davis', subject: 'Verbal Ability' },
];

// Mock subject data
const subjects = [
  { id: '1', name: 'Java', description: 'Programming with Java' },
  { id: '2', name: 'Python', description: 'Python Programming' },
  { id: '3', name: 'CC', description: 'Cloud Computing' },
  { id: '4', name: 'Aptitude', description: 'Aptitude Training' },
  { id: '5', name: 'Verbal Ability', description: 'English & Communication' },
];

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState(initialFaculty);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (newFaculty: any) => {
    setFaculty([...faculty, { ...newFaculty, id: Date.now().toString() }]);
    setShowForm(false);
    toast.success(`Faculty ${newFaculty.name} added successfully`);
  };

  const handleEdit = (id: string) => {
    const facultyToEdit = faculty.find(f => f.id === id);
    if (facultyToEdit) {
      setEditItem(facultyToEdit);
      setIsEditMode(true);
      setShowForm(true);
    }
  };

  const handleUpdate = (updatedFaculty: any) => {
    setFaculty(faculty.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
    setShowForm(false);
    setEditItem(null);
    setIsEditMode(false);
    toast.success(`Faculty ${updatedFaculty.name} updated successfully`);
  };

  const handleDelete = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
    toast.success("Faculty removed successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculty..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button 
            onClick={() => {
              setIsEditMode(false);
              setEditItem(null);
              setShowForm(true);
            }} 
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Add Faculty
          </Button>
        </div>
      </div>
      
      {showForm && (
        <UserManagementForm
          userType="faculty"
          onSubmit={isEditMode ? handleUpdate : handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditItem(null);
            setIsEditMode(false);
          }}
          editData={editItem}
          isEditMode={isEditMode}
          subjects={subjects}
        />
      )}
      
      <div className="bg-secondary/5 backdrop-blur-sm rounded-lg p-4">
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
            {filteredFaculty.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.username}</TableCell>
                <TableCell>{f.name}</TableCell>
                <TableCell>{f.subject}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(f.id)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(f.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FacultyManagement;
