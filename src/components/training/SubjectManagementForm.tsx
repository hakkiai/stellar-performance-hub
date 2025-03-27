
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SubjectManagementFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  editData?: any;
  isEditMode?: boolean;
}

const SubjectManagementForm = ({
  onSubmit,
  onCancel,
  editData,
  isEditMode = false,
}: SubjectManagementFormProps) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        ...formData,
        ...editData,
      });
    }
  }, [editData, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formTitle = `${isEditMode ? 'Edit' : 'Add'} Subject`;

  return (
    <div className="bg-secondary/10 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">{formTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Subject Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter subject name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter subject description"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6 space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? 'Update' : 'Add'} Subject
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubjectManagementForm;
