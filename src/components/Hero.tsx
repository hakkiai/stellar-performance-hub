
import { useEffect, useState, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const Hero = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Create parallax effect for stars
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      starsRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
      {/* Campus Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${
          theme === 'dark' 
            ? 'from-background/90 via-background/70 to-background/90' 
            : 'from-background/80 via-background/60 to-background/80'
        } z-10`} />
        
        <img 
          src="/lovable-uploads/4d069f44-3e48-4c2e-b4ab-d0f052f15ee1.png" 
          alt="Ideal Institute Campus" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Animated stars */}
      <div 
        ref={starsRef}
        className="absolute inset-0 overflow-hidden z-5 transition-transform duration-300 ease-out"
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating planet orbs */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-cosmic-400/20 backdrop-blur-sm animate-float-slow"></div>
      <div className="absolute bottom-1/4 left-1/5 w-20 h-20 rounded-full bg-space-300/20 backdrop-blur-sm animate-float"></div>
      
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
            className="mb-8 animate-float"
          >
            <img
              src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg"
              alt="Ideal Institute of Technology"
              className="h-28 md:h-36 w-auto rounded-xl shadow-xl cosmic-border"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
              Ideal Institute of Technology
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-10 max-w-3xl text-lg md:text-xl text-foreground/90 leading-relaxed"
          >
            Empowering futures through excellence in education and innovation in a world of boundless possibilities
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full max-w-md h-1 mb-12 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full"
          />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#features" 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-space-500 to-cosmic-600 
                       text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                       transition-all duration-300 flex items-center space-x-2"
            >
              <span>Explore Features</span>
            </a>
            <a 
              href="/academic-analyzer" 
              className="px-8 py-3 rounded-full bg-secondary/30 backdrop-blur-sm border border-primary/20
                       text-foreground font-medium shadow-lg hover:shadow-xl hover:bg-secondary/50
                       transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary/80 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
