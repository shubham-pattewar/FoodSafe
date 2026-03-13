import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scanAPI } from '../services/api';
import ScoreMeter from '../components/ScoreMeter';
import { ChevronLeft, ArrowRightLeft, Search, Database, Flame, Hexagon, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompareProducts = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await scanAPI.getHistory();
        const validScans = data.filter(s => s.productId && s.scanData);
        const uniqueProducts = Array.from(new Map(validScans.map(s => [s.productId._id, s])).values());
        setScans(uniqueProducts);
      } catch (error) {
        console.error('Failed to fetch scan history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="flex h-[calc(100vh-8rem)] items-center justify-center font-mono text-tech glow-text-tech animate-pulse">Establishing Node Connection...</div>;

  const getWinnerGlassClass = (p1, p2, targetItem) => {
    if (!p1 || !p2) return 'border-white/5';
    if (targetItem === 1 && p1.scanData.score > p2.scanData.score) return 'border-safe shadow-[0_0_30px_rgba(57,255,20,0.15)] bg-safe/5';
    if (targetItem === 2 && p2.scanData.score > p1.scanData.score) return 'border-safe shadow-[0_0_30px_rgba(57,255,20,0.15)] bg-safe/5';
    return 'border-white/5 opacity-80 scale-95'; // Loosing card scales back slightly
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <div className="mb-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <button onClick={() => navigate('/dashboard')} className="absolute left-8 top-32 flex items-center text-sm font-mono text-gray-400 hover:text-tech transition-colors hidden md:flex">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Neural Hub
        </button>
        <div className="inline-flex items-center space-x-2 bg-tech/10 border border-tech/30 rounded-full px-4 py-2 mb-4">
           <Crosshair className="w-4 h-4 text-tech glow-text-tech animate-spin-slow" />
           <span className="text-xs font-mono font-medium text-tech glow-text-tech uppercase tracking-wider">Comparative Matrix</span>
        </div>
        <h1 className="text-4xl font-extrabold font-display text-white mb-2">Node Evaluation</h1>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Select two organic datasets from your local matrix to isolate the superior variable.
        </p>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row gap-6 relative">
        
        {/* Node Alpha Selector */}
        <div className={`flex-1 glass-panel transition-all duration-500 rounded-3xl p-6 relative ${getWinnerGlassClass(product1, product2, 1)}`}>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center">
             <Hexagon className="w-4 h-4 mr-2" /> Node Alpha
          </h2>
          
          <div className="relative mb-8 z-20">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-tech glow-text-tech" />
            </div>
            <select
              className="w-full bg-space-900 border border-tech/30 rounded-xl pl-12 pr-4 py-4 text-white font-mono text-sm focus:ring-1 focus:ring-tech focus:border-tech appearance-none cursor-pointer shadow-inner"
              value={product1?.productId?._id || ''}
              onChange={(e) => {
                const selected = scans.find(s => s.productId._id === e.target.value);
                if (selected) setProduct1(selected);
              }}
            >
              <option value="" disabled className="text-gray-500">Select dataset...</option>
              {scans.map(scan => (
                <option key={`p1-${scan._id}`} value={scan.productId._id}>
                  {scan.productId.name.substring(0,30)} - [{scan.scanData.score} PTS]
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow to fit glassmorphism theme */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
               <ChevronLeft className="w-4 h-4 text-gray-400 -rotate-90" />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {product1 && (
              <motion.div variants={itemVariants} initial="hidden" animate="show" exit="exit" className="space-y-6 flex flex-col items-center">
                <div className="text-center w-full bg-white/5 rounded-2xl py-6 border border-white/5">
                  <p className="text-tech glow-text-tech font-mono text-xs mb-2 uppercase tracking-widest">{product1.productId.brand || 'NULL_ORG'}</p>
                  <h3 className="text-2xl font-bold font-display text-white">{product1.productId.name}</h3>
                </div>
                
                <div className="py-2 scale-110">
                  <ScoreMeter score={product1.scanData.score} size={220} />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="bg-space-900/50 border border-danger/20 p-4 rounded-2xl shadow-inner">
                    <Flame className="w-6 h-6 text-danger glow-text-danger mx-auto mb-2" />
                    <span className="block text-3xl font-display font-bold text-white">{product1.scanData.hiddenSugars.length}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-tight">Sugars</span>
                  </div>
                  <div className="bg-space-900/50 border border-warning/20 p-4 rounded-2xl shadow-inner">
                    <Database className="w-6 h-6 text-warning glow-text-warning mx-auto mb-2" />
                    <span className="block text-3xl font-display font-bold text-white">{product1.scanData.additives.length}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-tight">Additives</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Central VS Divider */}
        <div className="hidden lg:flex flex-col justify-center items-center relative z-10 w-16">
          <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-tech/30 to-transparent"></div>
          <motion.div 
            animate={{ rotate: 180 }} 
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-tech/30 z-20 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
          >
            <ArrowRightLeft className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Node Beta Selector */}
        <div className={`flex-1 glass-panel transition-all duration-500 rounded-3xl p-6 relative ${getWinnerGlassClass(product2, product1, 2)}`}>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center justify-end">
             Node Beta <Hexagon className="w-4 h-4 ml-2" />
          </h2>
          
          <div className="relative mb-8 z-20">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-tech glow-text-tech" />
            </div>
            <select
              className="w-full bg-space-900 border border-tech/30 rounded-xl pl-12 pr-4 py-4 text-white font-mono text-sm focus:ring-1 focus:ring-tech focus:border-tech appearance-none cursor-pointer shadow-inner"
              value={product2?.productId?._id || ''}
              onChange={(e) => {
                const selected = scans.find(s => s.productId._id === e.target.value);
                if (selected) setProduct2(selected);
              }}
            >
              <option value="" disabled className="text-gray-500">Select dataset...</option>
              {scans.map(scan => (
                <option key={`p2-${scan._id}`} value={scan.productId._id} disabled={scan.productId._id === product1?.productId?._id}>
                  {scan.productId.name.substring(0,30)} - [{scan.scanData.score} PTS]
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
               <ChevronLeft className="w-4 h-4 text-gray-400 -rotate-90" />
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {product2 && (
              <motion.div variants={itemVariants} initial="hidden" animate="show" exit="exit" className="space-y-6 flex flex-col items-center">
                <div className="text-center w-full bg-white/5 rounded-2xl py-6 border border-white/5">
                  <p className="text-tech glow-text-tech font-mono text-xs mb-2 uppercase tracking-widest">{product2.productId.brand || 'NULL_ORG'}</p>
                  <h3 className="text-2xl font-bold font-display text-white">{product2.productId.name}</h3>
                </div>
                
                <div className="py-2 scale-110">
                  <ScoreMeter score={product2.scanData.score} size={220} />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="bg-space-900/50 border border-danger/20 p-4 rounded-2xl shadow-inner">
                    <Flame className="w-6 h-6 text-danger glow-text-danger mx-auto mb-2" />
                    <span className="block text-3xl font-display font-bold text-white">{product2.scanData.hiddenSugars.length}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-tight">Sugars</span>
                  </div>
                  <div className="bg-space-900/50 border border-warning/20 p-4 rounded-2xl shadow-inner">
                    <Database className="w-6 h-6 text-warning glow-text-warning mx-auto mb-2" />
                    <span className="block text-3xl font-display font-bold text-white">{product2.scanData.additives.length}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-tight">Additives</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CompareProducts;
