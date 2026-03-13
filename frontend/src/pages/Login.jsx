import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, Crosshair, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Slight artificial delay to sell the "SciFi processing" feel
    setTimeout(async () => {
       const result = await login(email, password);
       if (!result.success) {
         setError(result.message || 'Invalid biometrics or credentials.');
       }
       setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Decorative Matrix Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-tech/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-safe/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ type: "spring", stiffness: 100 }}
         className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-tech/10 border border-tech/30 mb-6 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
            <Crosshair className="w-8 h-8 text-tech glow-text-tech" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Terminal Access
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-mono tracking-widest uppercase">
            Identify yourself to the matrix
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle hover glow tracking border */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-tech/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                 initial={{ opacity: 0, y: -10 }} 
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-danger/10 border border-danger/30 p-4 rounded-xl flex items-center shadow-inner"
              >
                <AlertTriangle className="w-5 h-5 text-danger glow-text-danger mr-3" />
                <p className="text-sm text-danger-300 font-mono">{error}</p>
              </motion.div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Comm-Link (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12 bg-space-900/50"
                  placeholder="agent@matrix.net"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Decryption Key (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 tracking-widest bg-space-900/50"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <button 
               type="submit" 
               disabled={loading}
               className={`w-full py-4 rounded-xl flex items-center justify-center text-sm font-bold uppercase tracking-widest font-mono transition-all ${
                  loading 
                  ? 'bg-tech/5 border border-tech/20 text-tech/50' 
                  : 'bg-tech/20 border border-tech/50 text-white shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:bg-tech/30 hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]'
               }`}
            >
              {loading ? (
                 <span className="flex items-center"><span className="w-4 h-4 rounded-full border-t-2 border-tech mr-2 animate-spin"></span> Verifying...</span>
              ) : (
                 <span className="flex items-center">Initiate Handshake <ArrowRight className="w-4 h-4 ml-2" /></span>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-500 font-mono">
          New to the network?{' '}
          <Link to="/signup" className="text-tech glow-text-tech font-bold hover:underline">
            Request Clearance
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;
