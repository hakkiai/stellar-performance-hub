
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[80vh] flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center starry-bg">
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 animate-float">
            <img
              src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg"
              alt="Ideal Institute of Technology"
              className="h-24 md:h-32 w-auto rounded-lg shadow-lg cosmic-border"
            />
          </div>
          
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
            Ideal Institute of Technology
          </h1>
          
          <p className="mb-8 max-w-3xl text-lg md:text-xl text-foreground/80">
            Empowering futures through excellence in education and innovation
          </p>
          
          <div className="w-full max-w-xs sm:max-w-md h-1 mb-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
