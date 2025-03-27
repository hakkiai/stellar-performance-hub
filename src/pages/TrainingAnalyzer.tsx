
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
            <LoginForm onLoginSuccess={(u, p) => {
              // Super simplified auth logic for demo
              if (u === 'admin' && p === 'admin') {
                handleLoginSuccess('hod', u);
              } else if (u.startsWith('faculty') && p === 'password') {
                handleLoginSuccess('faculty', u);
              } else if (u.startsWith('student') && p === 'password') {
                // Student login logic would go here
                handleLoginSuccess('student', u);
              } else {
                return false;
              }
              return true;
            }} />
          ) : (
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Welcome, {username}</h2>
                  <p className="text-muted-foreground text-sm">
                    Role: {userRole === 'hod' ? 'Super Admin (HOD)' : userRole === 'faculty' ? 'Faculty' : 'Student'}
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
