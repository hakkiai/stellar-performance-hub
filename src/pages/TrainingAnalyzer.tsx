
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import HODDashboard from '../components/training/HODDashboard';
import FacultyDashboard from '../components/training/FacultyDashboard';

const TrainingAnalyzer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'hod' | 'faculty' | 'student' | null>(null);
  const [username, setUsername] = useState('');
  
  const handleLoginSuccess = (role: 'hod' | 'faculty' | 'student', username: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUsername(username);
  };

  return (
    <div className="min-h-screen bg-space-gradient pb-20">
      <Navbar />
      
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-10 text-center animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Training Tool
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Training Performance Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage faculty assignments, track student performance, and evaluate training metrics across subjects.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {!isLoggedIn ? (
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-center">Login to Training Analyzer</h2>
              <LoginForm onLoginSuccess={(u, p) => {
                // Sample login credentials for demo
                if (u === 'admin' && p === 'admin') {
                  handleLoginSuccess('hod', u);
                  return true;
                } else if (u === 'sairaj' && p === 'faculty') {
                  // Sai Raj - Java faculty
                  handleLoginSuccess('faculty', 'faculty1');
                  return true;
                } else if (u === 'anjali' && p === 'faculty') {
                  // Anjali Sharma - Python faculty
                  handleLoginSuccess('faculty', 'faculty2');
                  return true;
                } else if (u === 'ravi' && p === 'faculty') {
                  // Ravi Kumar - Cloud Computing faculty
                  handleLoginSuccess('faculty', 'faculty3');
                  return true;
                } else {
                  return false;
                }
              }} />
              
              <div className="mt-6 pt-6 border-t border-border/30">
                <h3 className="text-md font-medium mb-2 text-center">Sample Login Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">HOD / Admin</p>
                    <p>Username: <span className="text-primary">admin</span></p>
                    <p>Password: <span className="text-primary">admin</span></p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Java Faculty</p>
                    <p>Username: <span className="text-primary">sairaj</span></p>
                    <p>Password: <span className="text-primary">faculty</span></p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Python Faculty</p>
                    <p>Username: <span className="text-primary">anjali</span></p>
                    <p>Password: <span className="text-primary">faculty</span></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {userRole === 'hod' ? 'HOD Dashboard' : 
                     userRole === 'faculty' ? 'Faculty Dashboard' : 'Student Dashboard'}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Logged in as: <span className="text-primary font-medium">{username}</span>
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserRole(null);
                    setUsername('');
                  }}
                  className="px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
              
              {userRole === 'hod' && <HODDashboard />}
              {userRole === 'faculty' && <FacultyDashboard facultyUsername={username} />}
              {userRole === 'student' && <p>Student dashboard would go here</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingAnalyzer;
