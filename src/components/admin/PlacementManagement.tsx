
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash, BriefcaseBusiness, Send, Users } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

// Mock data for jobs
const initialJobs = [
  { 
    id: '1', 
    companyName: 'TechCorp', 
    package: '10 LPA', 
    minPercentage: 75, 
    certificationRequired: true, 
    certificationName: 'AWS Developer', 
    jobUrl: 'https://example.com/techjob',
    lastDate: new Date('2025-05-15')
  },
  { 
    id: '2', 
    companyName: 'InnovateSoft', 
    package: '8 LPA', 
    minPercentage: 70, 
    certificationRequired: false, 
    certificationName: '', 
    jobUrl: 'https://example.com/innosoft',
    lastDate: new Date('2025-05-20')
  },
  { 
    id: '3', 
    companyName: 'CloudSystems', 
    package: '12 LPA', 
    minPercentage: 80, 
    certificationRequired: true, 
    certificationName: 'Azure Fundamentals', 
    jobUrl: 'https://example.com/cloudsys',
    lastDate: new Date('2025-04-30')
  }
];

// Mock data for applications
const initialApplications = [
  { 
    id: '1', 
    rollNumber: '216K1A0501', 
    name: 'Rahul Kumar', 
    email: 'rahul.k@student.ideal.edu', 
    branch: 'CSE', 
    company: 'TechCorp', 
    applyDate: new Date('2025-03-20'), 
    status: 'Pending' 
  },
  { 
    id: '2', 
    rollNumber: '216K1A0502', 
    name: 'Priya Sharma', 
    email: 'priya.s@student.ideal.edu', 
    branch: 'CSE', 
    company: 'TechCorp', 
    applyDate: new Date('2025-03-21'), 
    status: 'Shortlisted' 
  },
  { 
    id: '3', 
    rollNumber: '226K1A0503', 
    name: 'Aditya Singh', 
    email: 'aditya.s@student.ideal.edu', 
    branch: 'CS', 
    company: 'InnovateSoft', 
    applyDate: new Date('2025-03-19'), 
    status: 'Rejected' 
  },
  { 
    id: '4', 
    rollNumber: '236K1A0504', 
    name: 'Neha Patel', 
    email: 'neha.p@student.ideal.edu', 
    branch: 'CSE', 
    company: 'CloudSystems', 
    applyDate: new Date('2025-03-22'), 
    status: 'Pending' 
  }
];

type JobFormData = {
  id?: string;
  companyName: string;
  package: string;
  minPercentage: number;
  certificationRequired: boolean;
  certificationName: string;
  jobUrl: string;
  lastDate: Date;
}

const PlacementManagement = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [showJobForm, setShowJobForm] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState("all");
  
  // Job form state
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    companyName: '',
    package: '',
    minPercentage: 70,
    certificationRequired: false,
    certificationName: '',
    jobUrl: '',
    lastDate: new Date()
  });
  
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [selectedCompanyForNotification, setSelectedCompanyForNotification] = useState('');

  // Handle job form input changes
  const handleJobFormChange = (field: keyof JobFormData, value: any) => {
    setJobFormData({
      ...jobFormData,
      [field]: value
    });
  };

  // Add or update job
  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editJobId) {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === editJobId ? { ...jobFormData, id: editJobId } : job
      ));
      toast.success("Job updated successfully");
    } else {
      // Add new job
      const newJob = {
        ...jobFormData,
        id: Date.now().toString()
      };
      setJobs([...jobs, newJob]);
      toast.success("New job posted successfully");
    }
    
    // Reset form
    setShowJobForm(false);
    setEditJobId(null);
    setJobFormData({
      companyName: '',
      package: '',
      minPercentage: 70,
      certificationRequired: false,
      certificationName: '',
      jobUrl: '',
      lastDate: new Date()
    });
  };

  // Edit job
  const handleEditJob = (id: string) => {
    const jobToEdit = jobs.find(job => job.id === id);
    if (jobToEdit) {
      setJobFormData(jobToEdit);
      setEditJobId(id);
      setShowJobForm(true);
    }
  };

  // Delete job
  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast.success("Job deleted successfully");
  };

  // Send notifications to students
  const handleSendNotifications = () => {
    if (!selectedCompanyForNotification) {
      toast.error("Please select a company");
      return;
    }
    
    toast.success(`Notifications sent to students about ${selectedCompanyForNotification} job opportunity`);
    setSelectedCompanyForNotification('');
  };

  // Update application status
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    toast.success("Application status updated");
  };

  // Filter applications based on status
  const filteredApplications = applicationFilter === "all" 
    ? applications 
    : applications.filter(app => app.status.toLowerCase() === applicationFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <BriefcaseBusiness size={16} />
            Job Postings
          </TabsTrigger>
          <TabsTrigger value="notify" className="flex items-center gap-2">
            <Send size={16} />
            Notify Students
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Users size={16} />
            Applications
          </TabsTrigger>
        </TabsList>
        
        {/* Job Postings Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                setEditJobId(null);
                setJobFormData({
                  companyName: '',
                  package: '',
                  minPercentage: 70,
                  certificationRequired: false,
                  certificationName: '',
                  jobUrl: '',
                  lastDate: new Date()
                });
                setShowJobForm(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Post New Job
            </Button>
          </div>
          
          {showJobForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editJobId ? "Edit Job" : "Post New Job"}</CardTitle>
                <CardDescription>
                  Enter the details of the job opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitJob} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName"
                        value={jobFormData.companyName}
                        onChange={(e) => handleJobFormChange('companyName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="package">Package Offered</Label>
                      <Input 
                        id="package"
                        value={jobFormData.package}
                        onChange={(e) => handleJobFormChange('package', e.target.value)}
                        required
                        placeholder="e.g., 10 LPA"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="minPercentage">Minimum Percentage Required</Label>
                      <Input 
                        id="minPercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={jobFormData.minPercentage}
                        onChange={(e) => handleJobFormChange('minPercentage', parseInt(e.target.value))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobUrl">Job URL</Label>
                      <Input 
                        id="jobUrl"
                        type="url"
                        value={jobFormData.jobUrl}
                        onChange={(e) => handleJobFormChange('jobUrl', e.target.value)}
                        required
                        placeholder="https://..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastDate">Last Date to Apply</Label>
                      <Input 
                        id="lastDate"
                        type="date"
                        value={jobFormData.lastDate instanceof Date 
                          ? jobFormData.lastDate.toISOString().split('T')[0] 
                          : ''
                        }
                        onChange={(e) => handleJobFormChange('lastDate', new Date(e.target.value))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="certificationRequired">Certification Required</Label>
                        <Switch 
                          id="certificationRequired"
                          checked={jobFormData.certificationRequired}
                          onCheckedChange={(checked) => handleJobFormChange('certificationRequired', checked)}
                        />
                      </div>
                      
                      {jobFormData.certificationRequired && (
                        <div className="pt-2">
                          <Label htmlFor="certificationName">Certification Name</Label>
                          <Input 
                            id="certificationName"
                            value={jobFormData.certificationName}
                            onChange={(e) => handleJobFormChange('certificationName', e.target.value)}
                            required={jobFormData.certificationRequired}
                            placeholder="e.g., AWS Developer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowJobForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editJobId ? "Update Job" : "Post Job"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Last Date</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.companyName}</TableCell>
                  <TableCell>{job.package}</TableCell>
                  <TableCell>{
                    job.lastDate instanceof Date 
                      ? format(job.lastDate, 'dd MMM yyyy')
                      : 'Invalid date'
                  }</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Min. {job.minPercentage}%</p>
                      {job.certificationRequired && (
                        <p className="text-xs text-muted-foreground">
                          Cert: {job.certificationName}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditJob(job.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        {/* Notify Students Tab */}
        <TabsContent value="notify" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notify Students</CardTitle>
              <CardDescription>
                Select a company to notify eligible students about the job opportunity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companySelect">Select Company</Label>
                  <Select 
                    value={selectedCompanyForNotification}
                    onValueChange={setSelectedCompanyForNotification}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map(job => (
                        <SelectItem key={job.id} value={job.companyName}>
                          {job.companyName} - {job.package}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleSendNotifications}
                  disabled={!selectedCompanyForNotification}
                  className="w-full"
                >
                  <Send size={16} className="mr-2" />
                  Send Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-medium">Student Applications</h3>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={applicationFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setApplicationFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={applicationFilter === "pending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setApplicationFilter("pending")}
              >
                Pending
              </Button>
              <Button 
                variant={applicationFilter === "shortlisted" ? "default" : "outline"} 
                size="sm"
                onClick={() => setApplicationFilter("shortlisted")}
              >
                Shortlisted
              </Button>
              <Button 
                variant={applicationFilter === "rejected" ? "default" : "outline"} 
                size="sm"
                onClick={() => setApplicationFilter("rejected")}
              >
                Rejected
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Apply Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.rollNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p>{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.branch} | {app.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>{
                    app.applyDate instanceof Date 
                      ? format(app.applyDate, 'dd MMM yyyy')
                      : 'Invalid date'
                  }</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' :
                      app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-600' :
                      'bg-red-500/20 text-red-600'
                    }`}>
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.status.toLowerCase()}
                      onValueChange={(value) => handleUpdateStatus(app.id, value.charAt(0).toUpperCase() + value.slice(1))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
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

export default PlacementManagement;
