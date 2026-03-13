import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Leaf, LogOut, User, ScanLine, LayoutDashboard, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Scan', path: '/scan', icon: ScanLine },
    { name: 'Compare', path: '/compare', icon: ArrowRightLeft },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-6 inset-x-0 mx-auto w-[95%] max-w-6xl glass-panel rounded-full px-6 py-3 flex justify-between items-center z-50"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-tech/10 group-hover:bg-tech/20 transition-colors">
          <Leaf className="w-5 h-5 text-tech glow-text-tech" />
          <motion.div 
            className="absolute inset-0 rounded-full border border-tech/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-tech transition-colors hidden sm:block">
          Food<span className="text-tech glow-text-tech">Safe</span>
        </span>
      </Link>

      {/* Navigation Links */}
      {user && (
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10 text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm font-mono text-gray-300">
              <User className="w-4 h-4 text-tech glow-text-tech" />
              <span>{user.name.split(' ')[0]}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors border border-rose-500/20"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="btn-primary py-2 px-5 text-sm"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
