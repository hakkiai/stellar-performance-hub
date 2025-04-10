
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AdminLoginModal from './AdminLoginModal';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
  
  const handleAdminLogin = () => {
    toast.success("Admin login successful!", {
      description: "Redirecting to admin dashboard..."
    });
    
    setTimeout(() => {
      navigate('/admin-dashboard');
    }, 1000);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-background/60 backdrop-blur-md'}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://www.idealtech.edu.in/website/assets/images/ideal_logo.jpg" 
              alt="Ideal Institute of Technology" 
              className="h-10 w-auto rounded-md"
            />
            <span className="text-lg font-bold font-jetbrains hidden md:inline-block animate-fade-in">
              Ideal Institute of Technology
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link text-base font-medium py-1 bg-background/30 px-3 rounded-md backdrop-blur-sm">Home</Link>
            <Link to="/academic-analyzer" className="nav-link text-base font-medium py-1 bg-background/30 px-3 rounded-md backdrop-blur-sm">Academic Analyzer</Link>
            <Link to="/placement-hub" className="nav-link text-base font-medium py-1 bg-background/30 px-3 rounded-md backdrop-blur-sm">Placement Hub</Link>
            <Link to="/training-analyzer" className="nav-link text-base font-medium py-1 bg-background/30 px-3 rounded-md backdrop-blur-sm">Training Analyzer</Link>
            <ThemeToggle />
            <button
              onClick={() => setShowAdminModal(true)}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors smooth-transition"
              aria-label="Admin Settings"
              title="Admin Access"
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setShowAdminModal(true)}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors smooth-transition"
              aria-label="Admin Settings"
              title="Admin Access"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-foreground focus:outline-none smooth-transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
      
      <AdminLoginModal 
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLoginSuccess={handleAdminLogin}
      />
    </nav>
  );
};

export default Navbar;
