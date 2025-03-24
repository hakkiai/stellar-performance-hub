
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { BarChart4, Building2, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navbar />
      
      <Hero />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Analysis Tools
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced Analytics Platform
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our comprehensive suite of tools designed to analyze and optimize academic and professional performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Academic Performance Analyzer"
            description="Analyze student performance trends, identify areas for improvement, and track academic progress over time."
            icon={<BookOpen size={24} />}
            linkTo="/academic-analyzer"
            delay={100}
          />
          
          <FeatureCard
            title="Campus Placement Hub"
            description="Track placement statistics, manage corporate relationships, and optimize student placement opportunities."
            icon={<Building2 size={24} />}
            linkTo="/placement-hub"
            delay={200}
          />
          
          <FeatureCard
            title="Training Performance Analyzer"
            description="Evaluate training program effectiveness, monitor skill development, and measure learning outcomes."
            icon={<BarChart4 size={24} />}
            linkTo="/training-analyzer"
            delay={300}
          />
        </div>
      </div>
      
      <footer className="bg-secondary/30 backdrop-blur-sm mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ideal Institute of Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
