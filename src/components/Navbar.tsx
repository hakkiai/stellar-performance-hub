
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg" 
              alt="Ideal Institute of Technology" 
              className="h-10 w-auto rounded-md"
            />
            <span className="text-lg font-bold font-fira hidden md:inline-block animate-fade-in">
              Ideal Institute of Technology
            </span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/academic-analyzer" className="nav-link">Academic Analyzer</Link>
            <Link to="/placement-hub" className="nav-link">Placement Hub</Link>
            <Link to="/training-analyzer" className="nav-link">Training Analyzer</Link>
          </div>

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-2 bg-secondary/80 backdrop-blur-lg rounded-b-lg flex flex-col space-y-3">
          <Link to="/" className="nav-link py-3 border-b border-border/30">Home</Link>
          <Link to="/academic-analyzer" className="nav-link py-3 border-b border-border/30">Academic Analyzer</Link>
          <Link to="/placement-hub" className="nav-link py-3 border-b border-border/30">Placement Hub</Link>
          <Link to="/training-analyzer" className="nav-link py-3">Training Analyzer</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
