
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, BookOpen, Activity, School } from 'lucide-react';
import FacultyManagement from './FacultyManagement';
import HODManagement from './HODManagement';
import StudentData from './StudentData';
import SystemSettings from './SystemSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("faculty");
  const [viewMode, setViewMode] = useState("management");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Administrator Dashboard</h2>
          <p className="text-muted-foreground">
            System management and configuration panel
          </p>
        </div>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && setViewMode(val)}>
          <ToggleGroupItem value="management" aria-label="Management View">
            <Settings className="h-4 w-4 mr-2" />
            Management
          </ToggleGroupItem>
          <ToggleGroupItem value="analytics" aria-label="Analytics View">
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-secondary/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Faculty
            </CardTitle>
            <CardDescription>Manage faculty accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Active faculty members</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <School className="h-5 w-5 mr-2 text-primary" />
              Students
            </CardTitle>
            <CardDescription>Student database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">483</p>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Subjects
            </CardTitle>
            <CardDescription>Course subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">Active subjects</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <Users size={16} />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="hod" className="flex items-center gap-2">
            <Users size={16} />
            HOD Management
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <School size={16} />
            Student Data
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            System Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faculty">
          <FacultyManagement />
        </TabsContent>
        
        <TabsContent value="hod">
          <HODManagement />
        </TabsContent>
        
        <TabsContent value="students">
          <StudentData />
        </TabsContent>
        
        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
