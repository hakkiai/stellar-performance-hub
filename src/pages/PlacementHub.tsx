
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Briefcase, Calendar, Award, ExternalLink, Upload, UserCircle, Camera, Check, UploadCloud } from 'lucide-react';
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlacementHub = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [certificates, setCertificates] = useState<{name: string, date: Date}[]>([]);
  const [certName, setCertName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const certificateFileRef = useRef<HTMLInputElement>(null);

  const studentData = {
    name: "Rahul Kumar",
    rollNumber: "216K1A0501",
    batch: "2021-2025",
    branch: "CSE",
    email: "rahul.k@student.ideal.edu"
  };

  const availableJobs = [
    { 
      id: '1', 
      company: 'TechSolutions Inc.', 
      package: '12 LPA', 
      requirements: { 
        minPercentage: 75, 
        certification: 'AWS Cloud Practitioner'
      },
      lastDate: new Date('2025-05-15'),
      applicationUrl: 'https://example.com/apply'
    },
    { 
      id: '2', 
      company: 'Innovate Systems', 
      package: '8.5 LPA', 
      requirements: { 
        minPercentage: 70, 
        certification: null
      },
      lastDate: new Date('2025-05-20'),
      applicationUrl: 'https://example.com/apply'
    },
    { 
      id: '3', 
      company: 'Digital Dynamics', 
      package: '10 LPA', 
      requirements: { 
        minPercentage: 80, 
        certification: 'React Developer'
      },
      lastDate: new Date('2025-05-25'),
      applicationUrl: 'https://example.com/apply'
    }
  ];

  const applications = [
    { 
      id: '1', 
      company: 'TechSolutions Inc.', 
      applicationDate: new Date('2025-04-05'),
      status: 'Pending'
    },
    { 
      id: '2', 
      company: 'Innovate Systems', 
      applicationDate: new Date('2025-04-03'),
      status: 'Shortlisted'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'student' && password === 'password') {
      setIsLoggedIn(true);
      toast.success('Login successful');
    } else {
      toast.error('Invalid credentials. Try username: student, password: password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfilePicture(null);
    toast.success('Logged out successfully');
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    toast.success(`Application status updated to: ${newStatus}`);
  };

  const handleCertificateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim()) {
      toast.error('Please enter a certificate name');
      return;
    }
    
    if (certificateFileRef.current?.files?.length) {
      // Simulate upload progress
      let progress = 0;
      setUploadProgress(progress);
      
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setCertificates([...certificates, { name: certName, date: new Date() }]);
          setCertName('');
          setUploadProgress(0);
          toast.success('Certificate uploaded successfully');
          
          // Reset file input
          if (certificateFileRef.current) {
            certificateFileRef.current.value = '';
          }
          
          // Switch to certificates tab to show the upload result
          setActiveTab('certificates');
        }
      }, 200);
    } else {
      toast.error('Please select a file to upload');
    }
  };
  
  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      toast.loading('Uploading profile picture...');
      
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          setProfilePicture(reader.result as string);
          toast.dismiss();
          toast.success('Profile picture updated successfully');
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-space-gradient">
        <Navbar />
        
        <div className="pt-32 pb-20 container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
              Student Access
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 cosmic-text">
              Campus Placement Hub
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Access job opportunities, track applications, and manage your professional development
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LoginForm 
              onLoginSuccess={(username, password) => {
                if (username === 'student' && password === 'password') {
                  setIsLoggedIn(true);
                  toast.success('Login successful');
                  return true;
                }
                return false;
              }} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="cosmic-card overflow-hidden">
              <CardHeader className="bg-secondary/20 border-b border-border/10">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="text-primary" size={20} />
                  About the Placement Hub
                </CardTitle>
                <CardDescription>
                  Your gateway to career opportunities and professional development
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-1 shrink-0" />
                    <span>Access job postings tailored to your academic profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-1 shrink-0" />
                    <span>Track application status in real-time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-1 shrink-0" />
                    <span>Upload and manage professional certificates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 mt-1 shrink-0" />
                    <span>Receive notifications about new opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Student Dashboard
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 cosmic-text">
            Your Campus Placement Portal
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Manage your placement journey and professional development
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 overflow-hidden cosmic-card">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-secondary/20 p-6 flex flex-col items-center justify-center border-r border-border/10">
                <div className="relative mb-4 group">
                  <Avatar className="w-28 h-28 border-2 border-primary/20">
                    <AvatarImage src={profilePicture || undefined} />
                    <AvatarFallback className="text-3xl bg-primary/10">
                      {studentData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div 
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-full 
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-opacity duration-200 cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Camera className="text-white" size={24} />
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden" 
                    onChange={handleProfilePictureUpload}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mb-2 w-full bg-secondary/20 hover:bg-secondary/40"
                  onClick={triggerFileInput}
                >
                  <Camera size={14} className="mr-2" />
                  Update Photo
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              
              <div className="md:w-3/4 p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <UserCircle size={24} />
                  {studentData.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Roll Number</p>
                    <p className="font-medium">{studentData.rollNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{studentData.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Batch</p>
                    <p className="font-medium">{studentData.batch}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p className="font-medium">{studentData.branch}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase size={16} />
                Available Jobs
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Calendar size={16} />
                Track Applications
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <Award size={16} />
                Certificates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableJobs.map(job => (
                  <Card key={job.id} className="cosmic-card overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-1">{job.company}</CardTitle>
                          <CardDescription>Package: {job.package}</CardDescription>
                        </div>
                        <span className="px-2 py-1 bg-secondary/30 rounded-md text-xs">
                          {format(job.lastDate, 'MMM d, yyyy')}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-2">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">Requirements:</p>
                        <ul className="space-y-1">
                          <li className="text-sm flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                            <span>Min. Percentage: {job.requirements.minPercentage}%</span>
                          </li>
                          {job.requirements.certification && (
                            <li className="text-sm flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary/60" />
                              <span>Certification: {job.requirements.certification}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/10 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          Apply before {format(job.lastDate, 'MMM d, yyyy')}
                        </span>
                        
                        <Button 
                          size="sm" 
                          className="bg-cosmic-500 hover:bg-cosmic-600 transition-colors text-white"
                          onClick={() => {
                            toast.success(`Application link for ${job.company} opened`);
                            window.open(job.applicationUrl, '_blank');
                          }}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="applications">
              <Card className="cosmic-card overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} />
                    Your Applications
                  </CardTitle>
                  <CardDescription>
                    Track and manage your job applications
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {applications.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Application Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map(app => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.company}</TableCell>
                            <TableCell>{format(app.applicationDate, 'MMM d, yyyy')}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-500' :
                                app.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                                'bg-blue-500/20 text-blue-500'
                              }`}>
                                {app.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Select 
                                onValueChange={(value) => handleStatusUpdate(app.id, value)}
                                defaultValue={app.status}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue placeholder="Update" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                  <SelectItem value="Rejected">Rejected</SelectItem>
                                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="bg-secondary/10 rounded-lg p-8 text-center">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium mb-1">No applications yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by applying to available job openings
                      </p>
                      <Button 
                        onClick={() => setActiveTab('jobs')}
                        className="bg-cosmic-500 hover:bg-cosmic-600 text-white"
                      >
                        <Briefcase size={14} className="mr-2" />
                        Browse Jobs
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificates">
              <Card className="cosmic-card overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award size={20} />
                    Professional Certificates
                  </CardTitle>
                  <CardDescription>
                    Manage your professional certifications and achievements
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <form onSubmit={handleCertificateUpload} className="space-y-4 p-4 bg-secondary/10 rounded-lg">
                      <h3 className="text-lg font-medium">Upload New Certificate</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="certName">Certificate Name</Label>
                          <Input 
                            id="certName" 
                            value={certName}
                            onChange={(e) => setCertName(e.target.value)}
                            placeholder="e.g. AWS Certified Developer"
                            className="bg-secondary/5"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="certFile">Certificate File</Label>
                          <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-secondary/20 transition-colors">
                            <input 
                              type="file" 
                              ref={certificateFileRef}
                              id="certFile"
                              className="hidden" 
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                            <div 
                              className="flex flex-col items-center justify-center cursor-pointer"
                              onClick={() => certificateFileRef.current?.click()}
                            >
                              <UploadCloud size={36} className="text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPG or PNG (max. 10MB)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {uploadProgress > 0 && (
                        <div className="w-full bg-secondary/20 rounded-full h-2 mt-2">
                          <div 
                            className="bg-cosmic-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-cosmic-500 hover:bg-cosmic-600 text-white"
                        disabled={uploadProgress > 0}
                      >
                        <Upload size={14} className="mr-2" />
                        Upload Certificate
                      </Button>
                    </form>
                    
                    {certificates.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Certificate Name</TableHead>
                            <TableHead>Upload Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certificates.map((cert, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{cert.name}</TableCell>
                              <TableCell>{format(cert.date, 'MMM d, yyyy')}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="bg-secondary/10 rounded-lg p-8 text-center">
                        <Award className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No certificates yet</h3>
                        <p className="text-muted-foreground">
                          Upload your first certificate to showcase your skills.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PlacementHub;
