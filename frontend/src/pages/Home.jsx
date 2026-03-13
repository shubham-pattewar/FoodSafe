import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ScanLine, ShieldCheck, Activity, BrainCircuit, ArrowRight, 
  Zap, Target, Hexagon, Database, Code, Cpu, Flame, CheckCircle, 
  AlertTriangle, Smartphone, Box, Sparkles, Medal, Shield, 
  Crosshair, Layers, Fingerprint
} from 'lucide-react';
import ScoreMeter from '../components/ScoreMeter';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };

  const inverseFloatAnimation = {
    y: [0, 20, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-12 overflow-hidden bg-space-900 selection:bg-tech/30 selection:text-white">
      
      {/* Background Decorative Grid & Glows */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
      {/* 
        ========================================================
        HERO SECTION
        ========================================================
      */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-16 pb-32 flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass-panel rounded-full px-5 py-2 mb-4 border-tech/30 bg-tech/5 backdrop-blur-xl">
          <span className="flex h-2.5 w-2.5 rounded-full bg-tech animate-pulse shadow-[0_0_8px_#39FF14]"></span>
          <span className="text-[11px] font-mono font-bold text-tech glow-text-tech uppercase tracking-[0.2em] relative top-px">Neural Engine v2.0 Online</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <span className="font-mono text-sm md:text-base text-safe uppercase tracking-[0.3em] font-bold glow-text-safe">Decode the Matrix of Organic Matter</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
          <span className="block drop-shadow-md">Scan, Analyse</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-tech via-[var(--color-text-main)] to-safe pb-2 filter drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">And Eat Safe.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg md:text-xl text-gray-400 mb-10 font-light leading-relaxed">
          FoodSafe utilizes advanced <span className="text-tech glow-text-tech font-mono">Neural OCR</span> and <span className="text-safe glow-text-safe font-mono">OpenMatrix Data</span> to instantly detect hidden sugars, synthetic additives, and generate a gamified safety score for your food.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto relative z-20">
          <Link to="/signup" className="btn-primary flex items-center justify-center text-lg w-full sm:w-auto overflow-hidden group py-4 px-8 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
            <span className="relative z-10 flex items-center font-bold tracking-wide">
              INITIALIZE SCANNER <ScanLine className="ml-3 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-tech/20"></div>
          </Link>
          <Link to="/login" className="btn-secondary flex items-center justify-center text-lg w-full sm:w-auto py-4 px-8 hover:bg-white/10 border-white/20">
            ACCESS TERMINAL
          </Link>
        </motion.div>

        {/* Floating Abstract Orbs for Hero */}
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 10, -5, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-10 lg:left-32 glass-panel p-3 rounded-lg flex items-center gap-3 hidden md:flex border-danger/30 shadow-[0_0_15px_rgba(255,59,59,0.15)] pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse"></div>
          <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">Hazard: E129 Detected</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-64 right-10 lg:right-32 glass-panel p-4 rounded-full flex flex-col items-center justify-center hidden md:flex border-safe/40 shadow-[0_0_20px_rgba(57,255,20,0.2)] pointer-events-none"
        >
          <span className="font-display font-bold text-safe glow-text-safe text-2xl leading-none">98</span>
          <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest mt-1">Safe Node</span>
        </motion.div>
      </motion.div>

      {/* 
        ========================================================
        SECTION 1: THE FOOD MATRIX PROBLEM
        ========================================================
      */}
      <div className="relative z-10 w-full bg-space-900/50 backdrop-blur-3xl border-y border-tech/10 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Most Food Labels Hide the Real Ingredients.</h2>
            <p className="text-tech font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest glow-text-tech">FoodSafe reveals the hidden matrix inside your food.</p>
          </div>

          <div className="relative w-full max-w-3xl aspect-video md:aspect-[21/9] flex items-center justify-center my-10 rounded-3xl z-10">
            {/* Background Radar Grid */}
            <div className="absolute inset-0 border border-white/5 rounded-[40px] bg-space-800/40 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="w-[800px] h-[800px] border border-tech/10 rounded-full flex items-center justify-center opacity-30">
                <div className="w-[600px] h-[600px] border border-tech/20 rounded-full flex items-center justify-center">
                  <div className="w-[400px] h-[400px] border border-tech/30 rounded-full flex items-center justify-center relative">
                    {/* Rotating Radar Line */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(57,255,20,0.2)_90deg,transparent_90deg)] rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Center Hovering Device (The Product Scanner Engine) */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotateX: [0, 5, 0], rotateY: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              className="relative z-20 w-40 h-56 glass-panel rounded-3xl flex flex-col items-center justify-center border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6),_0_0_50px_rgba(255,255,255,0.05)] bg-space-800/90 overflow-hidden"
            >
              {/* Device Screen Glow */}
              <div className="absolute inset-x-2 top-2 bottom-6 bg-space-900 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center shadow-inner relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-tech/20 via-transparent to-safe/10"></div>
                 <Smartphone className="w-16 h-16 text-gray-500/50 mb-4" />
                 
                 {/* Precision Scanning Beam */}
                 <motion.div
                   animate={{ top: ['-10%', '110%', '-10%'] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-1 bg-tech shadow-[0_0_15px_#39FF14] z-10"
                 />
                 
                 {/* UI overlay stub inside device screen */}
                 <div className="absolute bottom-2 left-2 right-2 h-4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-safe/50"></motion.div>
                 </div>
              </div>
              <div className="absolute bottom-2 w-8 h-1 rounded-full bg-white/20"></div>
            </motion.div>

            {/* Orbiting Ingredient/Chemical Tags (3D Layering Effect) */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] border border-transparent rounded-full z-30 pointer-events-none">
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2" style={{ perspective: '500px' }}>
                <motion.div animate={{ rotate: -360, rotateX: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-danger/40 bg-danger/10 text-danger shadow-[0_0_20px_rgba(255,59,59,0.3)] whitespace-nowrap backdrop-blur-xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center"><Flame className="w-3.5 h-3.5 mr-1.5"/> High Fructose Synth</span>
                </motion.div>
              </div>

              <div className="absolute top-1/2 -right-10 md:-right-16 -translate-y-1/2">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-danger/40 bg-danger/10 text-danger shadow-[0_0_20px_rgba(255,59,59,0.3)] whitespace-nowrap backdrop-blur-xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1.5"/> E102 (Tartrazine)</span>
                </motion.div>
              </div>

              <div className="absolute bottom-10 right-1/4">
                <motion.div animate={{ rotate: -360, scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-warning/40 bg-warning/5 text-warning whitespace-nowrap backdrop-blur-xl shadow-[0_0_15px_rgba(255,214,10,0.2)]">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center"><Target className="w-3.5 h-3.5 mr-1.5"/> Artificial Flavor</span>
                </motion.div>
              </div>

              <div className="absolute bottom-10 left-1/4">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-white/20 text-gray-300 whitespace-nowrap backdrop-blur-xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center"><Database className="w-3.5 h-3.5 mr-1.5 text-gray-400"/> Sodium Benzoate</span>
                </motion.div>
              </div>

              <div className="absolute top-1/2 -left-10 md:-left-16 -translate-y-1/2">
                <motion.div animate={{ rotate: -360, scale: [0.9, 1, 0.9] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-danger/40 bg-danger/10 text-danger shadow-[0_0_20px_rgba(255,59,59,0.3)] whitespace-nowrap backdrop-blur-xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1.5"/> Maltodextrin Matrix</span>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================
        SECTION 2: SCAN YOUR FOOD
        ========================================================
      */}
      <div className="relative z-10 w-full py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1 relative h-[500px] flex items-center justify-center">
            {/* Holographic glowing orb behind */}
            <div className="absolute w-[300px] h-[300px] bg-tech/20 rounded-full blur-[100px] z-0"></div>
            
            {/* Phone Frame */}
            <div className="relative z-10 w-[240px] h-[480px] rounded-[40px] border-[8px] border-space-800 bg-space-900 shadow-[0_0_50px_rgba(57,255,20,0.15)] overflow-hidden flex flex-col">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-space-800 rounded-b-xl z-30"></div>
              
              {/* Camera Viewfinder (Simulated) */}
              <div className="flex-1 relative bg-black flex items-center justify-center p-4">
                 <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')]"></div>
                 
                 {/* Product being scanned */}
                 <div className="w-3/4 h-1/2 border-2 border-dashed border-tech/50 rounded-xl relative overflow-hidden flex items-center justify-center bg-space-800/80 backdrop-blur-sm z-10">
                    <Layers className="w-12 h-12 text-gray-500 opacity-50" />
                    {/* Vertically moving scanning beam */}
                    <motion.div 
                      animate={{ y: ['-100%', '300%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-4 bg-gradient-to-b from-transparent to-tech border-b border-tech shadow-[0_5px_15px_#39FF14] z-20"
                    />
                 </div>

                 {/* Focus Corners */}
                 <div className="absolute top-10 left-4 w-6 h-6 border-t-2 border-l-2 border-white/50 z-20"></div>
                 <div className="absolute top-10 right-4 w-6 h-6 border-t-2 border-r-2 border-white/50 z-20"></div>
                 <div className="absolute bottom-32 left-4 w-6 h-6 border-b-2 border-l-2 border-white/50 z-20"></div>
                 <div className="absolute bottom-32 right-4 w-6 h-6 border-b-2 border-r-2 border-white/50 z-20"></div>
              </div>
              
              {/* Fake UI Bottom */}
              <div className="h-24 bg-space-900 border-t border-white/10 flex justify-center items-center z-30">
                 <div className="w-12 h-12 rounded-full border-2 border-tech flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-tech/20"></div>
                 </div>
              </div>

            </div>

            {/* Orbiting Result Badges off the phone */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-8 top-1/4 glass-panel px-4 py-2 rounded-xl border-danger/40 bg-space-900/90 shadow-xl z-20 flex items-center">
               <CheckCircle className="w-4 h-4 text-danger mr-2" />
               <span className="font-mono text-xs font-bold text-gray-300">Hidden Sugars</span>
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-12 top-1/2 glass-panel px-4 py-2 rounded-xl border-warning/40 bg-space-900/90 shadow-xl z-20 flex items-center">
               <CheckCircle className="w-4 h-4 text-warning mr-2" />
               <span className="font-mono text-xs font-bold text-gray-300">Synthetic Additives</span>
            </motion.div>
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }} className="absolute right-0 bottom-1/3 glass-panel px-4 py-2 rounded-xl border-safe/40 bg-space-900/90 shadow-xl z-20 flex items-center">
               <CheckCircle className="w-4 h-4 text-safe mr-2" />
               <span className="font-mono text-xs font-bold text-gray-300">Preservatives</span>
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Scan Any Food Product</h2>
            <p className="text-gray-400 font-light text-lg mb-8 leading-relaxed max-w-lg">
              Unlock the secrets of the food ecosystem simply by pointing your device. FoodSafe's advanced optics neural-link extracts complex data instantly.
            </p>
            <Link to="/signup" className="inline-flex items-center text-tech font-bold font-mono tracking-widest hover:text-white transition-colors uppercase">
               Deploy Visual Scanner <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>

      {/* 
        ========================================================
        SECTION 3: AI INGREDIENT ANALYZER
        ========================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 mt-10">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">AI Ingredient Analyzer</h2>
            <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest selection:bg-tech/30">Three-tier algorithmic threat separation.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center h-full">
          {/* Panel 1 */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="glass-panel rounded-3xl p-8 relative overflow-hidden group border-tech/20 mt-8 md:mt-0 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tech/5 rounded-bl-[100px] group-hover:bg-tech/10 transition-colors"></div>
            <BrainCircuit className="w-12 h-12 text-tech mb-6 relative z-10 glow-text-tech" />
            <h3 className="text-2xl font-bold font-display text-white mb-3 relative z-10">Ingredient Parsing</h3>
            <p className="text-sm text-gray-400 font-light relative z-10">Our Neural OCR reads real ingredient composition directly from the label to bypass false marketing claims.</p>
          </motion.div>

          {/* Panel 2 */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="glass-panel rounded-3xl p-8 relative overflow-hidden group border-warning/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-bl-[100px] group-hover:bg-warning/10 transition-colors"></div>
            <AlertTriangle className="w-12 h-12 text-warning mb-6 relative z-10 glow-text-warning" />
            <h3 className="text-2xl font-bold font-display text-white mb-3 relative z-10">Additive Detection</h3>
            <p className="text-sm text-gray-400 font-light relative z-10">Detects harmful E-numbers, synthetic dyes, and artificial preservatives instantly.</p>
          </motion.div>

          {/* Panel 3 */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="glass-panel rounded-3xl p-8 relative overflow-hidden group border-danger/20 md:mt-16 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-bl-[100px] group-hover:bg-danger/10 transition-colors"></div>
            <Hexagon className="w-12 h-12 text-danger mb-6 relative z-10 glow-text-danger" />
            <h3 className="text-2xl font-bold font-display text-white mb-3 relative z-10">Hidden Sugar Detection</h3>
            <p className="text-sm text-gray-400 font-light relative z-10">Identifies over 60 disguised sugars like maltodextrin, dextrose, and high-fructose variants.</p>
          </motion.div>
        </div>
      </div>

      {/* 
        ========================================================
        SECTION 4: SAFETY SCORE SYSTEM
        ========================================================
      */}
      <div className="relative z-10 w-full py-16 bg-space-900/50 backdrop-blur-3xl border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          
          <div className="text-center mb-24 relative z-50">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight drop-shadow-lg">Safety Score System</h2>
            <p className="text-safe glow-text-safe font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto drop-shadow-lg">Algorithmic risk evaluation</p>
          </div>

          <div className="w-full max-w-4xl relative flex items-center justify-center py-32 mt-16 z-10">
            {/* Background Aura */}
            <div className="absolute w-[400px] h-[400px] bg-warning/10 rounded-full blur-[120px] z-0"></div>

            {/* Orbiting Labels */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-dashed border-white/10 z-10">
               
               {/* 1. Top */}
               <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-warning/40 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(255,214,10,0.2)] z-20 whitespace-nowrap backdrop-blur-md">
                    Hidden Sugars Detected
                  </motion.div>
               </div>

               {/* 2. Top Right */}
               <div className="absolute top-[20%] -right-10 md:-right-16">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-danger/40 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(255,59,59,0.2)] z-20 whitespace-nowrap backdrop-blur-md">
                    Synthetic Dyes
                  </motion.div>
               </div>

               {/* 3. Bottom Right */}
               <div className="absolute bottom-[20%] -right-10 md:-right-16">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-safe/40 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(57,255,20,0.2)] z-20 whitespace-nowrap backdrop-blur-md">
                    Processing Level
                  </motion.div>
               </div>

               {/* 4. Bottom Left */}
               <div className="absolute bottom-[20%] -left-10 md:-left-16">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-tech/40 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(57,255,20,0.2)] z-20 whitespace-nowrap backdrop-blur-md">
                    Additives Found
                  </motion.div>
               </div>

               {/* 5. Top Left */}
               <div className="absolute top-[20%] -left-10 md:-left-16">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-white/20 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-lg z-20 whitespace-nowrap backdrop-blur-md">
                    Preservative Count
                  </motion.div>
               </div>

               {/* 6. Bottom */}
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="glass-panel px-4 py-2 rounded-xl border-tech/20 text-gray-300 font-mono text-xs tracking-widest uppercase shadow-lg z-20 whitespace-nowrap backdrop-blur-md border-opacity-50">
                    Nutrient Density
                  </motion.div>
               </div>

            </motion.div>

            {/* Core Score Ring */}
            <div className="relative z-30 scale-125 md:scale-150">
               <ScoreMeter score={72} size={200} />
            </div>

          </div>
        </div>
      </div>

      {/* 
        ========================================================
        SECTION 5: PRODUCT COMPARISON
        ========================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32 mt-10">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Compare Products Instantly</h2>
            <p className="text-tech font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest glow-text-tech">Isolate the superior nutritional variable.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center relative">
          
          {/* Left Product - Bad */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-sm glass-panel rounded-3xl p-8 border-danger/30 relative overflow-hidden bg-space-800 opacity-90 scale-95">
             <div className="absolute top-0 right-0 w-32 h-32 bg-danger/10 rounded-bl-[100px]"></div>
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                   <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Processed Snack</p>
                   <h3 className="text-3xl font-display font-bold text-white">Chili Chips</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-danger flex items-center justify-center text-xl font-display font-bold text-danger glow-text-danger shadow-[0_0_15px_rgba(255,59,59,0.3)]">32</div>
             </div>
             
             <div className="space-y-4 relative z-10 w-full">
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1 text-gray-400"><span>Hidden Sugar</span><span className="text-danger glow-text-danger">High</span></div>
                 <div className="h-2 w-full bg-space-900 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1 }} className="h-full bg-danger"></motion.div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1 text-gray-400"><span>Additives</span><span className="text-danger glow-text-danger">4 Dyes</span></div>
                 <div className="h-2 w-full bg-space-900 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-danger"></motion.div>
                 </div>
               </div>
             </div>
          </motion.div>

          <div className="hidden lg:flex w-16 h-16 rounded-full glass-panel items-center justify-center absolute left-1/2 -translate-x-1/2 z-20 border-tech/40">
             <span className="font-mono text-sm font-bold text-tech">VS</span>
          </div>

          {/* Right Product - Good */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-sm glass-panel rounded-3xl p-8 border-safe/50 relative overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.15)] bg-safe/5 z-10 scale-105">
             <div className="absolute top-0 right-0 w-32 h-32 bg-safe/10 rounded-bl-[100px]"></div>
             <div className="absolute -inset-1 bg-gradient-to-r from-safe/10 to-transparent blur z-0 pointer-events-none"></div>
             
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                   <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Organic</p>
                   <h3 className="text-3xl font-display font-bold text-white">Rolled Oats</h3>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-safe flex items-center justify-center text-xl font-display font-bold text-safe glow-text-safe shadow-[0_0_20px_rgba(57,255,20,0.4)]">88</div>
             </div>
             
             <div className="space-y-4 relative z-10 w-full">
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1 text-gray-300"><span>Added Sugar</span><span className="text-safe glow-text-safe">0g</span></div>
                 <div className="h-2 w-full bg-space-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '5%' }} transition={{ duration: 1 }} className="h-full bg-safe"></motion.div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-mono mb-1 text-gray-300"><span>Additives</span><span className="text-safe glow-text-safe">None</span></div>
                 <div className="h-2 w-full bg-space-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '0%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-safe"></motion.div>
                 </div>
               </div>
             </div>
          </motion.div>

        </div>
      </div>

      {/* 
        ========================================================
        SECTION 6: HOW FOODSAFE WORKS
        ========================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-24">
            <h2 className="text-4xl font-display font-bold text-white">Initialization Sequence</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative gap-12 md:gap-4">
           {/* Connecting Line Desktop */}
           <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-px bg-gradient-to-r from-tech/20 via-tech to-tech/20 z-0">
             <motion.div 
               animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-2px] w-4 h-[5px] rounded-full bg-tech glow-text-tech shadow-[0_0_10px_#39FF14]"
             />
           </div>

           {/* Step 1 */}
           <div className="flex flex-col items-center flex-1 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center border-tech/30 mb-6 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-tech/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                 <ScanLine className="w-10 h-10 text-white relative z-10" />
                 <div className="absolute -bottom-2 -right-2 bg-space-900 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-tech">01</div>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Acquire Target</h3>
              <p className="text-center text-sm font-light text-gray-400 font-mono tracking-tight max-w-[200px]">Upload or Scan Food Label barcode via terminal.</p>
           </div>

           {/* Step 2 */}
           <div className="flex flex-col items-center flex-1 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center border-warning/30 mb-6 relative overflow-hidden group shadow-[0_0_20px_rgba(255,214,10,0.15)]">
                 <div className="absolute inset-0 bg-warning/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                 <BrainCircuit className="w-10 h-10 text-white relative z-10" />
                 <div className="absolute -bottom-2 -right-2 bg-space-900 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-warning">02</div>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Neural Extraction</h3>
              <p className="text-center text-sm font-light text-gray-400 font-mono tracking-tight max-w-[200px]">AI parses ingredients against the OpenMatrix database.</p>
           </div>

           {/* Step 3 */}
           <div className="flex flex-col items-center flex-1 relative z-10">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center border-safe/40 mb-6 relative overflow-hidden group shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                 <div className="absolute inset-0 bg-safe/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                 <ShieldCheck className="w-10 h-10 text-safe glow-text-safe relative z-10" />
                 <div className="absolute -bottom-2 -right-2 bg-space-900 border border-white/10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-safe">03</div>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Data Output</h3>
              <p className="text-center text-sm font-light text-gray-400 font-mono tracking-tight max-w-[200px]">Receive Gamified Safety Score and threat breakdown.</p>
           </div>
        </div>
      </div>

      {/* 
        ========================================================
        SECTION 7: GAMIFICATION SYSTEM
        ========================================================
      */}
      <div className="relative w-full max-w-7xl mx-auto px-4 py-32 overflow-hidden">
        <div className="glass-panel border-tech/20 rounded-[40px] p-10 md:p-16 relative w-full flex flex-col items-center z-10 bg-space-800/60 backdrop-blur-2xl overflow-hidden">
           
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.tech)_0%,transparent_50%)] opacity-5"></div>

           <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center z-10">Level Up Your Biology</h2>
           
           <div className="w-full max-w-md my-8 z-10">
              <div className="flex justify-between font-mono text-xs font-bold uppercase tracking-widest mb-2">
                 <span className="text-tech glow-text-tech">Health XP</span>
                 <span className="text-white">860 / 1000</span>
              </div>
              {/* Liquid-Filled Glass Tube */}
              <div className="h-6 w-full glass-panel rounded-full overflow-hidden p-1 relative shadow-[inset_0_5px_10px_rgba(0,0,0,0.6)] border border-white/5 bg-space-900/50">
                 <motion.div 
                   initial={{ width: 0 }} 
                   whileInView={{ width: '86%' }} 
                   transition={{ duration: 1.5, ease: "easeOut" }} 
                   className="h-full rounded-full relative overflow-hidden"
                   style={{
                     background: 'linear-gradient(90deg, #39FF14 0%, #FFD60A 100%)',
                     boxShadow: '0 0 20px rgba(57,255,20,0.5), inset 0 2px 5px rgba(255,255,255,0.5)'
                   }}
                 >
                    {/* Liquid bubbles/shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
                    <motion.div 
                      animate={{ x: ['-100%', '100%'], y: [0, -2, 0] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30 blur-[2px]"
                    />
                 </motion.div>
              </div>
              <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-3 font-mono">140 XP to Level 4 (Nutrition Guardian)</p>
           </div>

           {/* Orbiting Badges */}
           <div className="relative w-full max-w-2xl h-64 flex items-center justify-center mt-10 z-10">
              
              <motion.div animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-0 md:left-10 top-0 glass-panel p-4 rounded-2xl flex flex-col items-center border-safe/30 bg-space-900 shadow-xl">
                 <Shield className="w-10 h-10 text-safe glow-text-safe mb-2" />
                 <span className="font-mono text-[10px] uppercase font-bold text-gray-300">Safe Eater Lv.3</span>
              </motion.div>

              <motion.div animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-0 md:right-10 bottom-0 glass-panel p-4 rounded-2xl flex flex-col items-center border-tech/40 bg-tech/10 shadow-xl scale-110">
                 <Medal className="w-12 h-12 text-tech glow-text-tech mb-2" />
                 <span className="font-mono text-xs uppercase font-bold text-white">Nutrition Guardian</span>
              </motion.div>

              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute left-[30%] bottom-10 glass-panel p-3 rounded-2xl flex flex-col items-center border-warning/30 bg-space-900 shadow-xl scale-90">
                 <Target className="w-8 h-8 text-warning mb-2" />
                 <span className="font-mono text-[9px] uppercase font-bold text-gray-400">Additive Hunter</span>
              </motion.div>

              <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute right-[20%] top-10 glass-panel p-3 rounded-2xl flex flex-col items-center border-danger/30 bg-space-900 shadow-xl scale-90">
                 <Flame className="w-8 h-8 text-danger mb-2" />
                 <span className="font-mono text-[9px] uppercase font-bold text-gray-400">Sugar Slayer</span>
              </motion.div>
           </div>

        </div>
      </div>

      {/* 
        ========================================================
        SECTION 8: FINAL CALL TO ACTION
        ========================================================
      */}
      <div className="relative z-10 w-full py-40 border-t border-white/5 bg-gradient-to-b from-transparent to-space-800/30 overflow-hidden">
        
        {/* Massive background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-safe/10 blur-[150px] pointer-events-none z-0 rounded-t-full"></div>

        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}
          className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="w-24 h-24 rounded-full border border-safe/40 bg-safe/10 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(57,255,20,0.3)] relative group">
             <div className="absolute inset-0 rounded-full border-t-2 border-safe animate-spin"></div>
             <Fingerprint className="w-12 h-12 text-safe glow-text-safe" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Decode Your Food <br/> Before You Eat.</motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-400 font-mono text-sm max-w-xl mx-auto uppercase tracking-widest mb-12">
             Terminal access granted. Join the network to reclaim your biological health.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <Link to="/signup" className="relative group px-10 py-5 rounded-2xl bg-safe/20 text-white font-bold tracking-widest uppercase font-mono shadow-[0_0_30px_rgba(57,255,20,0.3)] border border-safe/50 overflow-hidden hover:scale-105 transition-all duration-300">
               <span className="relative z-10 flex items-center">
                 INITIATE SCAN <ScanLine className="ml-3 w-5 h-5" />
               </span>
               <div className="absolute inset-0 bg-safe/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
            </Link>
            <Link to="/login" className="px-10 py-5 rounded-2xl glass-panel text-white font-bold tracking-widest uppercase font-mono hover:bg-white/10 transition-all border border-white/20">
               ACCESS NETWORK
            </Link>
          </motion.div>

        </motion.div>
      </div>

    </div>
  );
};

export default Home;
