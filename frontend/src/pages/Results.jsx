import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import ScoreMeter from '../components/ScoreMeter';
import { AlertTriangle, Info, ChevronLeft, ShieldCheck, Flame, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // id is obtained from parameters, but we rely on router state mostly for immediate UX
  // Real app might trigger a fetch here if state is null

  useEffect(() => {
    if (!state?.scanData) {
      navigate('/dashboard'); // Kick back if manually navigated to random ID lacking state
    }
  }, [state, navigate]);

  if (!state?.scanData) return null;

  const { data: product, scanData } = state;
  const isSafe = scanData.score >= 75;
  const isWarning = scanData.score >= 40 && scanData.score < 75;
  
  const accentColor = isSafe ? 'text-safe glow-text-safe border-safe/30 bg-safe/5' : 
                      isWarning ? 'text-warning glow-text-warning border-warning/30 bg-warning/5' : 
                      'text-danger glow-text-danger border-danger/30 bg-danger/5';


  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <div className="mb-6">
        <button onClick={() => navigate('/scan')} className="flex items-center text-sm font-mono text-gray-500 hover:text-tech transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Abort Analysis / Return
        </button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Gamified Score Widget */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className={`glass-panel rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden h-full ${accentColor.split(' ')[2]} ${accentColor.split(' ')[3]}`}>
             {/* Neon backing glow */}
             <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-current to-transparent"></div>
             
             <div className="relative z-10 w-full">
                <p className="text-xs font-mono font-bold tracking-widest uppercase mb-6 text-gray-400">Analysis Concluded</p>
                <div className="flex justify-center mb-8">
                  <ScoreMeter score={scanData.score} size={240} />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold font-display text-white mb-1">{product?.name || 'Unknown Organic Matter'}</h2>
                  {product?.brand && <p className="text-sm font-mono text-gray-400 tracking-wider uppercase">{product.brand}</p>}
                </div>

                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border bg-space-900/50 backdrop-blur-md shadow-inner">
                  {isSafe && <><ShieldCheck className={`w-5 h-5 mr-2 ${accentColor.split(' ')[0]}`} /><span className={`font-mono font-bold tracking-widest text-sm uppercase ${accentColor.split(' ')[0]}`}>Safe for Consumption</span></>}
                  {isWarning && <><AlertTriangle className={`w-5 h-5 mr-2 ${accentColor.split(' ')[0]}`} /><span className={`font-mono font-bold tracking-widest text-sm uppercase ${accentColor.split(' ')[0]}`}>Moderate Risk</span></>}
                  {!isSafe && !isWarning && <><Flame className={`w-5 h-5 mr-2 ${accentColor.split(' ')[0]}`} /><span className={`font-mono font-bold tracking-widest text-sm uppercase ${accentColor.split(' ')[0]}`}>Hazardous Matter</span></>}
                </div>
             </div>
          </div>
        </motion.div>

        {/* Right Column: Deep Data Analysis */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          
          {/* XP & Rewards Banner */}
          <div className="glass-panel-hover glass-panel rounded-2xl p-4 flex items-center justify-between border-tech/30 bg-tech/5">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tech/20 flex items-center justify-center border border-tech/30">
                   <Zap className="w-6 h-6 text-tech glow-text-tech" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display text-lg leading-tight">Data Integrated</h3>
                  <p className="text-tech text-xs font-mono tracking-widest uppercase">+ {isSafe ? '300' : '100'} Health XP Awarded</p>
                </div>
             </div>
             <Link to="/dashboard" className="btn-primary py-2 px-4 text-sm hidden sm:block">View Neural Hub</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hidden Sugars Card */}
            <div className="glass-panel rounded-2xl p-6 border-danger/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-danger/5 rounded-bl-[100px] border-l border-b border-danger/10 group-hover:bg-danger/10 transition-colors"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-lg font-bold font-display text-white flex items-center">
                  <Flame className="w-5 h-5 text-danger glow-text-danger mr-2" />
                  Hidden Sugars
                </h3>
                <span className="text-2xl font-bold text-danger glow-text-danger font-mono">{scanData.hiddenSugars.length}</span>
              </div>
              <div className="relative z-10">
                {scanData.hiddenSugars.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {scanData.hiddenSugars.map((sugar, idx) => (
                      <span key={idx} className="px-3 py-1 bg-danger/10 border border-danger/30 rounded-lg text-sm text-danger-300 font-mono flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse mr-2"></span>
                        {sugar}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">No deceptive sugar nodes detected.</p>
                )}
              </div>
            </div>

            {/* Synthetic Additives Card */}
            <div className="glass-panel rounded-2xl p-6 border-warning/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-warning/5 rounded-bl-[100px] border-l border-b border-warning/10 group-hover:bg-warning/10 transition-colors"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-lg font-bold font-display text-white flex items-center">
                  <Database className="w-5 h-5 text-warning glow-text-warning mr-2" />
                  Synthetic Additives
                </h3>
                <span className="text-2xl font-bold text-warning glow-text-warning font-mono">{scanData.additives.length}</span>
              </div>
              <div className="relative z-10">
                {scanData.additives.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {scanData.additives.map((additive, idx) => (
                      <span key={idx} className="px-3 py-1 bg-warning/10 border border-warning/30 rounded-lg text-sm text-warning-300 font-mono flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse mr-2"></span>
                        {additive}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">No artificial E-number nodes detected.</p>
                )}
              </div>
            </div>
          </div>

          {/* Warning System & All Ingredients List */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-bold font-display text-white mb-4 border-b border-white/5 pb-2 flex items-center">
              <Info className="w-5 h-5 text-tech glow-text-tech mr-2" />
              Raw Matrix Extraction (Ingredients)
            </h3>
            
            {scanData.warnings?.length > 0 && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 shadow-inner">
                 <p className="text-red-400 font-mono text-sm tracking-wide uppercase font-bold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" /> Active Hazards
                 </p>
                 <ul className="list-disc pl-5 space-y-1">
                   {scanData.warnings.map((w, i) => (
                     <li key={i} className="text-red-300 text-sm font-mono">{w}</li>
                   ))}
                 </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {product?.ingredients?.map((ingredient, idx) => {
                const isSugar = scanData.hiddenSugars.includes(ingredient);
                const isAdditive = scanData.additives.includes(ingredient);
                
                let badgeClass = "bg-white/5 border-white/10 text-gray-300";
                if (isSugar) badgeClass = "bg-danger/20 border-danger/40 text-danger-200 glow-text-danger font-bold";
                else if (isAdditive) badgeClass = "bg-warning/20 border-warning/40 text-warning-200 glow-text-warning font-bold";

                return (
                  <span key={idx} className={`px-2.5 py-1 font-mono text-xs rounded-md border ${badgeClass} transition-colors hover:bg-space-700`}>
                    {ingredient}
                  </span>
                );
              })}
            </div>
          </div>
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;
