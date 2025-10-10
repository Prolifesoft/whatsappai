import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Logo: React.FC = () => (
  <Link to="/" className="flex items-center space-x-2">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-8 h-8 text-brand-green"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.75.45 3.41 1.27 4.9L2 22l5.25-1.38c1.44.78 3.03 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.83S17.5 2 12.04 2zM9.53 16.23h-.11c-.57 0-1.25-.22-2.1-.66L7 15.38l-1.33.7c-.22.12-.46.06-.61-.12s-.16-.41-.04-.63l.89-1.63c-.45-.7-.7-1.48-.7-2.31 0-2.67 2.16-4.84 4.84-4.84.62 0 1.21.12 1.74.33l.4.15 1.5-1.5c.2-.2.51-.2.71 0s.2.51 0 .71l-1.5 1.5.15.4c.21.53.33 1.12.33 1.74.01 2.67-2.15 4.84-4.83 4.84zm1.09-3.32c-.17-.09-.37-.14-.58-.14-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.21 0 .41-.05.58-.14l2.17.65c-.39.51-.94.85-1.56.97v.75c0 .28.22.5.5.5s.5-.22.5-.5v-.75c1.4-.29 2.5-1.5 2.5-2.91 0-1.07-.57-2.01-1.42-2.52l-2.19.65z"/>
    </svg>
    <span className="font-bold text-xl text-slate-800">AgentAI</span>
  </Link>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-slate-600 hover:text-brand-dark font-medium transition-colors">Özellikler</a>
          <a href="#use-cases" onClick={(e) => handleNavClick(e, 'use-cases')} className="text-slate-600 hover:text-brand-dark font-medium transition-colors">Kullanım Alanları</a>
          <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className="text-slate-600 hover:text-brand-dark font-medium transition-colors">Fiyatlandırma</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-slate-600 hover:text-brand-dark font-medium transition-colors">SSS</a>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-brand-dark font-medium transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-6 rounded-full transition-all duration-300"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-brand-dark font-medium transition-colors">
                Giriş Yap
              </Link>
              <Link 
                to="/register"
                className="bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;