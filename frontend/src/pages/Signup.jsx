import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Lock, Mail, Cpu, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Decryption keys do not match. Synchronization failed.');
    }

    setLoading(true);
    
    // Artificial delay for UI dramatic effect
    setTimeout(async () => {
       const result = await register(name, email, password);
       if (!result.success) {
         setError(result.message || 'Node linkage failed.');
       }
       setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      
      {/* Decorative Hexagon Matrix Canvas */}
      <div className="absolute top-0 right-20 w-80 h-80 bg-tech/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ type: "spring", stiffness: 100 }}
         className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-2xl bg-safe/10 border border-safe/30 mb-6 shadow-[0_0_20px_rgba(57,255,20,0.2)] rotate-45">
            <Cpu className="w-8 h-8 text-safe glow-text-safe -rotate-45" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Register Agent
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-mono tracking-widest uppercase">
            Initialize new organic array
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden group border-safe/10">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-safe/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-danger/10 border border-danger/30 p-3 rounded-lg flex items-center"
              >
                <AlertTriangle className="w-4 h-4 text-danger mr-3 flex-shrink-0" />
                <p className="text-xs text-danger-300 font-mono">{error}</p>
              </motion.div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                Designation (Name)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <User className="w-4 h-4 text-gray-500" />
                </div>
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="input-field pl-11 bg-space-900/50 py-2.5" placeholder="Agent Smith" disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                Comm-Link (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11 bg-space-900/50 py-2.5" placeholder="agent@matrix.net" disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                Encryption Sequence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 tracking-widest bg-space-900/50 py-2.5" placeholder="••••••••" disabled={loading}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">
                Confirm Sequence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-11 tracking-widest bg-space-900/50 py-2.5" placeholder="••••••••" disabled={loading}
                />
              </div>
            </div>

            <button 
               type="submit" 
               disabled={loading}
               className={`w-full py-3.5 mt-2 rounded-xl flex items-center justify-center text-sm font-bold uppercase tracking-widest font-mono transition-all ${
                  loading 
                  ? 'bg-safe/5 border border-safe/20 text-safe/50' 
                  : 'bg-safe/20 border border-safe/50 text-white shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:bg-safe/30 hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]'
               }`}
            >
              {loading ? (
                 <span className="flex items-center"><span className="w-4 h-4 rounded-full border-t-2 border-safe mr-2 animate-spin"></span> Binding...</span>
              ) : (
                 <span className="flex items-center">Establish Link <ArrowRight className="w-4 h-4 ml-2" /></span>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-500 font-mono">
          Already cleared?{' '}
          <Link to="/login" className="text-safe glow-text-safe font-bold hover:underline">
            Access Terminal
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Signup;
