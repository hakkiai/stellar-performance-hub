
import { useState } from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import FacultyDashboard from '../components/training/FacultyDashboard';

const TrainingAnalyzer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
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
            Track student performance and evaluate training metrics across subjects.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {!isLoggedIn ? (
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-center">Faculty Login</h2>
              <LoginForm onLoginSuccess={(u, p) => {
                // Simplified faculty login credentials
                if ((u === 'sairaj' && p === 'root') || 
                    (u === 'anjali' && p === 'root') || 
                    (u === 'ravi' && p === 'root') || 
                    (u === 'abhishek' && p === 'root')) {
                  handleLoginSuccess(u);
                  return true;
                } else {
                  return false;
                }
              }} />
              
              <div className="mt-6 pt-6 border-t border-border/30">
                <h3 className="text-md font-medium mb-2 text-center">Sample Faculty Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Java Faculty</p>
                    <p>Username: <span className="text-primary">sairaj</span></p>
                    <p>Password: <span className="text-primary">root</span></p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Python Faculty</p>
                    <p>Username: <span className="text-primary">anjali</span></p>
                    <p>Password: <span className="text-primary">root</span></p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Cloud Computing Faculty</p>
                    <p>Username: <span className="text-primary">ravi</span></p>
                    <p>Password: <span className="text-primary">root</span></p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="font-medium">Data Structures Faculty</p>
                    <p>Username: <span className="text-primary">abhishek</span></p>
                    <p>Password: <span className="text-primary">root</span></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Faculty Dashboard</h2>
                  <p className="text-muted-foreground text-sm">
                    Logged in as: <span className="text-primary font-medium">{username}</span>
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUsername('');
                  }}
                  className="px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
              
              <FacultyDashboard facultyUsername={username} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingAnalyzer;
