
import { useState } from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';
import CSVEditor from '../components/CSVEditor';

const AcademicAnalyzer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-space-gradient pb-20">
      <Navbar />
      
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-10 text-center animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Analytics Tool
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Academic Performance Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload and analyze academic data to identify trends, track performance metrics, and generate insightful reports.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!isLoggedIn ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <CSVEditor />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicAnalyzer;
