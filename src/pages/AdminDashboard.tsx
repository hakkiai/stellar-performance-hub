
import { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminDashboardComponent from '../components/admin/AdminDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-space-gradient pb-20">
      <Navbar />
      
      <div className="pt-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto mb-10 text-center animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            HOD Administration Panel
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            System Administration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage faculty, students, placements, and configure application settings.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-6 rounded-xl">
            <AdminDashboardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
