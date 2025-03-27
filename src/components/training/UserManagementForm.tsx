
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserManagementFormProps {
  userType: 'faculty' | 'student';
  onSubmit: (data: any) => void;
  onCancel: () => void;
  editData?: any;
  isEditMode?: boolean;
  subjects?: { id: string; name: string }[];
}

const UserManagementForm = ({
  userType,
  onSubmit,
  onCancel,
  editData,
  isEditMode = false,
  subjects = [],
}: UserManagementFormProps) => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    name: '',
    subject: '',
    class: '',
  });

  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        ...formData,
        ...editData,
        password: '••••••••', // Placeholder for security
      });
    }
  }, [editData, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove password if not changed from placeholder
    const dataToSubmit = {
      ...formData,
      password: formData.password === '••••••••' ? undefined : formData.password,
    };
    onSubmit(dataToSubmit);
  };

  const formTitle = `${isEditMode ? 'Edit' : 'Add'} ${userType === 'faculty' ? 'Faculty' : 'Student'}`;

  return (
    <div className="bg-secondary/10 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">{formTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={`Enter ${userType} username`}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditMode ? "Leave unchanged or enter new password" : "Enter password"}
              required={!isEditMode}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          {userType === 'faculty' && (
            <div className="space-y-2">
              <Label htmlFor="subject">Assigned Subject</Label>
              <Select 
                value={formData.subject} 
                onValueChange={(value) => handleSelectChange('subject', value)}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {userType === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select 
                value={formData.class} 
                onValueChange={(value) => handleSelectChange('class', value)}
              >
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE-A">CSE-A</SelectItem>
                  <SelectItem value="CSE-B">CSE-B</SelectItem>
                  <SelectItem value="IT-A">IT-A</SelectItem>
                  <SelectItem value="IT-B">IT-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-6 space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update' : 'Add'} {userType === 'faculty' ? 'Faculty' : 'Student'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserManagementForm;
