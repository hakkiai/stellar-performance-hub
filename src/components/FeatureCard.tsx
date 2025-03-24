
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  delay: number;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon, linkTo, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={linkTo}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${delay}ms`,
      }}
    >
      <div 
        className={`glass-card rounded-xl p-6 h-full transition-all duration-500 animate-fade-in
          ${isHovered ? 'transform scale-[1.02] shadow-xl shadow-primary/10' : ''}`}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/20 text-primary">
            {icon}
          </div>
          
          <h3 className="mb-3 text-xl font-semibold">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          
          <div className={`text-primary font-medium transition-all duration-300 
            ${isHovered ? 'translate-x-1' : ''}`}>
            Explore →
          </div>
        </div>
        
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl transition-opacity duration-500 
            ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>
    </Link>
  );
};

export default FeatureCard;
