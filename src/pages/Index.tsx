
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { BarChart4, Building2, BookOpen, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-space-gradient">
      <Navbar />
      
      <Hero />
      
      <div id="features" className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
            Analysis Tools
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
            Advanced Analytics Platform
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our comprehensive suite of tools designed to analyze and optimize academic and professional performance.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={item}>
            <FeatureCard
              title="Academic Performance Analyzer"
              description="Analyze student performance trends, identify areas for improvement, and track academic progress over time."
              icon={<BookOpen size={24} className="text-cosmic-500" />}
              linkTo="/academic-analyzer"
              delay={100}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <FeatureCard
              title="Campus Placement Hub"
              description="Track placement statistics, manage corporate relationships, and optimize student placement opportunities."
              icon={<Building2 size={24} className="text-space-500" />}
              linkTo="/placement-hub"
              delay={200}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <FeatureCard
              title="Training Performance Analyzer"
              description="Evaluate training program effectiveness, monitor skill development, and measure learning outcomes."
              icon={<BarChart4 size={24} className="text-starlight-500" />}
              linkTo="/training-analyzer"
              delay={300}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="/academic-analyzer" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                      bg-secondary/20 hover:bg-secondary/30 backdrop-blur-md 
                      border border-primary/10 transition-all duration-300 
                      group"
          >
            <span>Explore All Analytics Tools</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-secondary/30 backdrop-blur-sm mt-12 py-10"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <img
            src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg"
            alt="Ideal Institute of Technology"
            className="h-14 w-auto mx-auto mb-6 rounded-lg border-2 border-white"
          />
          
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ideal Institute of Technology. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
