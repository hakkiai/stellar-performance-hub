
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash, Search } from 'lucide-react';
import { toast } from "sonner";
import UserManagementForm from '../training/UserManagementForm';

// Mock HOD data
const initialHODs = [
  { id: '1', username: 'admin', name: 'Dr. Johnson (HOD)', department: 'Computer Science' },
  { id: '2', username: 'hod2', name: 'Dr. Williams', department: 'Information Technology' },
  { id: '3', username: 'hod3', name: 'Prof. Davis', department: 'Electronics & Communication' },
];

const HODManagement = () => {
  const [hods, setHODs] = useState(initialHODs);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHODs = hods.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (newHOD: any) => {
    setHODs([...hods, { 
      ...newHOD, 
      id: Date.now().toString(),
      department: newHOD.subject || 'Not Assigned'
    }]);
    setShowForm(false);
    toast.success(`HOD ${newHOD.name} added successfully`);
  };

  const handleEdit = (id: string) => {
    const hodToEdit = hods.find(h => h.id === id);
    if (hodToEdit) {
      setEditItem({...hodToEdit, subject: hodToEdit.department});
      setIsEditMode(true);
      setShowForm(true);
    }
  };

  const handleUpdate = (updatedHOD: any) => {
    const updated = {
      ...updatedHOD,
      department: updatedHOD.subject || 'Not Assigned'
    };
    
    setHODs(hods.map(h => h.id === updated.id ? updated : h));
    setShowForm(false);
    setEditItem(null);
    setIsEditMode(false);
    toast.success(`HOD ${updated.name} updated successfully`);
  };

  const handleDelete = (id: string) => {
    setHODs(hods.filter(h => h.id !== id));
    toast.success("HOD removed successfully");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search HODs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={() => {
            setIsEditMode(false);
            setEditItem(null);
            setShowForm(true);
          }} 
          className="flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Add HOD
        </Button>
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
          subjects={[
            { id: '1', name: 'Computer Science' },
            { id: '2', name: 'Information Technology' },
            { id: '3', name: 'Electronics & Communication' },
            { id: '4', name: 'Electrical Engineering' },
            { id: '5', name: 'Mechanical Engineering' },
          ]}
        />
      )}
      
      <div className="bg-secondary/5 backdrop-blur-sm rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHODs.map((hod) => (
              <TableRow key={hod.id}>
                <TableCell>{hod.username}</TableCell>
                <TableCell>{hod.name}</TableCell>
                <TableCell>{hod.department}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEdit(hod.id)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(hod.id)}
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

export default HODManagement;
