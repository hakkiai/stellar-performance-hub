
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const Hero = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
      {/* Campus Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${
          theme === 'dark' 
            ? 'from-background/30 via-background/20 to-background/30' 
            : 'from-background/20 via-background/5 to-background/20'
        } z-10`} />
        
        <img 
          src="/lovable-uploads/4d069f44-3e48-4c2e-b4ab-d0f052f15ee1.png" 
          alt="Ideal Institute Campus" 
          className="w-full h-full object-cover object-center brightness-[1.35]"
        />
      </div>
      
      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 max-w-4xl"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img
              src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg"
              alt="Ideal Institute of Technology"
              className="h-28 md:h-36 w-auto rounded-xl shadow-xl border-2 border-white"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-6 mt-8 text-4xl md:text-6xl lg:text-7xl college-name"
          >
            <span className="font-bold drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
              Ideal Institute of Technology
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-10 max-w-3xl text-lg md:text-xl text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] leading-relaxed"
          >
            Empowering futures through excellence in education and innovation in a world of boundless possibilities
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mt-6"
          >
            <a 
              href="#features" 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-space-500 to-cosmic-600 
                       text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                       transition-all duration-200 flex items-center space-x-2 smooth-transition"
            >
              <span>Explore Features</span>
            </a>
            <a 
              href="/academic-analyzer" 
              className="px-8 py-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/50
                       text-white font-medium shadow-lg hover:shadow-xl hover:bg-secondary/50
                       transform hover:-translate-y-1 transition-all duration-200 smooth-transition"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
