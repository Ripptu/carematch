import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HeartHandshake, LogOut, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export function Navbar() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      setIsScrolled(currentScrollPos > 50);

      // Hero area check: if we are at the top, show it.
      if (currentScrollPos < 100) {
        setIsVisible(true);
      } else {
        // Scrolling down: hide, scrolling up: show
        setIsVisible(prevScrollPos > currentScrollPos);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <motion.nav 
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5" : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-black text-white p-2 rounded-xl group-hover:bg-brand-black-dark transition-colors">
              <HeartHandshake size={24} />
            </div>
            <span className="font-semibold text-xl tracking-tight text-brand-text">
              CareMatch
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/fuer-angehoerige" className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors">
              Für Angehörige
            </Link>
            <Link to="/fuer-studenten" className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors">
              Für Studenten
            </Link>
            <Link to="/ueber-uns" className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors">
              Über uns
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={role === 'relative' ? '/dashboard' : '/profile'}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-black transition-colors"
                >
                  <User size={18} />
                  <span>Mein Bereich</span>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Abmelden"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-brand-black transition-colors hidden sm:block"
                >
                  Anmelden
                </Link>
                <Link 
                  to="/register" 
                  className={cn(
                    "text-sm font-medium px-5 py-2.5 rounded-full transition-all",
                    "bg-brand-black text-white hover:bg-brand-black-dark shadow-sm hover:shadow-md"
                  )}
                >
                  Jetzt registrieren
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

