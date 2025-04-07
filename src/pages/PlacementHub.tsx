
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Briefcase, Calendar, Certificate, ExternalLink, Upload, UserCircle } from 'lucide-react';
import { format } from "date-fns";

const PlacementHub = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState("jobs");
  const [certificates, setCertificates] = useState<{name: string, date: Date}[]>([]);
  const [certName, setCertName] = useState('');

  // Mock student data
  const studentData = {
    name: "Rahul Kumar",
    rollNumber: "216K1A0501",
    batch: "2021-2025",
    branch: "CSE",
    email: "rahul.k@student.ideal.edu"
  };

  // Mock job data
  const availableJobs = [
    { 
      id: '1', 
      companyName: 'TechCorp', 
      package: '10 LPA', 
      minPercentage: 75, 
      certificationRequired: true, 
      certificationName: 'AWS Developer', 
      jobUrl: 'https://example.com/techjob',
      lastDate: new Date('2025-05-15'),
      eligibility: true
    },
    { 
      id: '2', 
      companyName: 'InnovateSoft', 
      package: '8 LPA', 
      minPercentage: 70, 
      certificationRequired: false, 
      certificationName: '', 
      jobUrl: 'https://example.com/innosoft',
      lastDate: new Date('2025-05-20'),
      eligibility: true
    },
    { 
      id: '3', 
      companyName: 'CloudSystems', 
      package: '12 LPA', 
      minPercentage: 80, 
      certificationRequired: true, 
      certificationName: 'Azure Fundamentals', 
      jobUrl: 'https://example.com/cloudsys',
      lastDate: new Date('2025-04-30'),
      eligibility: false
    }
  ];

  // Mock applications data
  const applications = [
    { 
      id: '1', 
      companyName: 'TechCorp', 
      applyDate: new Date('2025-03-15'), 
      status: 'Shortlisted' 
    },
    { 
      id: '2', 
      companyName: 'InnovateSoft', 
      applyDate: new Date('2025-03-18'), 
      status: 'Pending' 
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login - in a real app, this would validate against API
    if (username === 'student' && password === 'password') {
      setIsLoggedIn(true);
      toast.success('Login successful');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/placement-hub');
    toast.success('Logged out successfully');
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    // This would update the status in a real application
    toast.success(`Application status updated to: ${newStatus}`);
  };

  const handleUploadCertificate = () => {
    if (!certName.trim()) {
      toast.error('Please enter certificate name');
      return;
    }
    
    // In a real app, this would handle file upload
    setCertificates([...certificates, { name: certName, date: new Date() }]);
    setCertName('');
    toast.success('Certificate uploaded successfully');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-space-gradient">
        <Navbar />
        
        <div className="pt-24 container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-10 text-center animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
              Student Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Placement Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              View job opportunities, track applications, and manage certifications.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access the Placement Hub
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground text-center">
                <p>Use demo credentials: username "student" and password "password"</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient pb-20">
      <Navbar />
      
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-10 text-center animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Student Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Placement Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View job opportunities, track applications, and manage certifications.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Student Profile Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-secondary/20 p-6 flex flex-col items-center justify-center">
                <UserCircle className="w-24 h-24 text-primary mb-3" />
                <h2 className="text-xl font-semibold">{studentData.name}</h2>
                <p className="text-sm text-muted-foreground">{studentData.rollNumber}</p>
              </div>
              
              <div className="md:w-3/4 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Batch</p>
                    <p className="font-medium">{studentData.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p className="font-medium">{studentData.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{studentData.email}</p>
                  </div>
                  <div className="flex items-center justify-end md:justify-end">
                    <Button onClick={handleLogout} variant="destructive" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="glass-card p-6 rounded-xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid grid-cols-3 gap-4">
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Briefcase size={16} />
                  Available Jobs
                </TabsTrigger>
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Track Applications
                </TabsTrigger>
                <TabsTrigger value="certificates" className="flex items-center gap-2">
                  <Certificate size={16} />
                  Certificates
                </TabsTrigger>
              </TabsList>
              
              {/* Available Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableJobs.map(job => (
                    <Card 
                      key={job.id} 
                      className={`overflow-hidden ${!job.eligibility ? 'opacity-60' : ''}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{job.companyName}</CardTitle>
                            <CardDescription>Package: {job.package}</CardDescription>
                          </div>
                          {job.eligibility ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-600">
                              Eligible
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-600">
                              Not Eligible
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Requirements:</span>
                          <ul className="list-disc list-inside mt-1 ml-2 space-y-1">
                            <li>Minimum {job.minPercentage}% marks</li>
                            {job.certificationRequired && (
                              <li>
                                {job.certificationName} certification
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Last Date:</span>{' '}
                          {job.lastDate instanceof Date 
                            ? format(job.lastDate, 'dd MMM yyyy')
                            : 'Invalid date'
                          }
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full flex items-center gap-2"
                          disabled={!job.eligibility}
                          onClick={() => window.open(job.jobUrl, '_blank')}
                        >
                          <ExternalLink size={16} />
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Track Applications Tab */}
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>
                      Track status of your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Apply Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.length > 0 ? (
                          applications.map(app => (
                            <TableRow key={app.id}>
                              <TableCell className="font-medium">{app.companyName}</TableCell>
                              <TableCell>{format(app.applyDate, 'dd MMM yyyy')}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  app.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-600' :
                                  app.status === 'Shortlisted' ? 'bg-green-500/20 text-green-600' :
                                  app.status === 'Rejected' ? 'bg-red-500/20 text-red-600' :
                                  'bg-blue-500/20 text-blue-600'
                                }`}>
                                  {app.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Select
                                  defaultValue={app.status.toLowerCase()}
                                  onValueChange={(value) => handleStatusUpdate(app.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Update" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                              You haven't applied to any jobs yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Certificates Tab */}
              <TabsContent value="certificates">
                <Card>
                  <CardHeader>
                    <CardTitle>My Certificates</CardTitle>
                    <CardDescription>
                      Upload and manage your certifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1">
                        <Input 
                          placeholder="Certificate name" 
                          value={certName}
                          onChange={(e) => setCertName(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleUploadCertificate}
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Upload Certificate
                      </Button>
                    </div>
                    
                    {certificates.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Certificate Name</TableHead>
                            <TableHead>Upload Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {certificates.map((cert, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{cert.name}</TableCell>
                              <TableCell>{format(cert.date, 'dd MMM yyyy')}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="bg-secondary/10 rounded-lg p-8 text-center">
                        <Certificate className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No certificates yet</h3>
                        <p className="text-muted-foreground">
                          Upload your first certificate to showcase your skills.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementHub;
