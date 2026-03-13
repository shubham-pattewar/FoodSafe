import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { scanAPI } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity, ShieldAlert, BadgeInfo, Flame, Crosshair, Hexagon } from 'lucide-react';
import ScoreMeter from '../components/ScoreMeter';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    averageScore: 0,
    totalSugarsDetected: 0,
    totalAdditivesDetected: 0,
    streak: 0,
    xp: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await scanAPI.getHistory();
        setHistory(data);
        
        let avgScore = 0;
        let sugars = 0;
        let additives = 0;
        
        if (data.length > 0) {
          avgScore = data.reduce((acc, curr) => acc + (curr.scanData?.score || 0), 0) / data.length;
          data.forEach(scan => {
            sugars += scan.scanData?.hiddenSugars?.length || 0;
            additives += scan.scanData?.additives?.length || 0;
          });
        }
        
        setStats({
          totalScans: data.length,
          averageScore: Math.round(avgScore),
          totalSugarsDetected: sugars,
          totalAdditivesDetected: additives,
          streak: Math.min(data.length, 12), // Simulated logic for gamified streak
          xp: data.length * 150 + Math.round(avgScore * 10) // Simulated gamified XP
        });
      } catch (error) {
        console.error('Failed to fetch user history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-tech animate-spin mb-4 shadow-[0_0_15px_#39FF14]"></div>
            <span className="font-mono text-tech glow-text-tech text-sm tracking-widest uppercase">Syncing Neural Data...</span>
         </div>
      </div>
    );
  }

  // Format data for Sci-Fi Recharts AreaChart
  const chartData = history.slice().reverse().map((scan, index) => ({
    name: `Scan ${index + 1}`,
    score: scan.scanData?.score || 0,
  }));

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Gamified Header Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech to-white">{user?.name}</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-1 flex items-center">
            <Crosshair className="w-4 h-4 mr-2 text-tech glow-text-tech" />
            Neural Link Active • Status: Online
          </p>
        </div>
        
        <div className="flex space-x-4">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 border-warning/20">
            <Flame className="w-5 h-5 text-warning glow-text-warning" />
            <div>
               <p className="text-[10px] uppercase tracking-wider text-gray-400 font-mono leading-none">Streak</p>
               <p className="text-lg font-bold text-white leading-none mt-1">{stats.streak} Days</p>
            </div>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 border-safe/20">
            <Hexagon className="w-5 h-5 text-safe glow-text-safe" />
            <div>
               <p className="text-[10px] uppercase tracking-wider text-gray-400 font-mono leading-none">Health XP</p>
               <p className="text-lg font-bold text-white leading-none mt-1">{stats.xp.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Core Safety Metric Ring */}
        <motion.div variants={itemVariants} className="glass-panel-hover glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-[320px]">
           <div className="absolute top-4 left-4 text-xs font-mono text-gray-400 tracking-widest uppercase">System Average</div>
           <ScoreMeter score={stats.averageScore} size={200} />
        </motion.div>

        {/* Neural Trend Chart */}
        <motion.div variants={itemVariants} className="glass-panel-hover glass-panel rounded-2xl p-6 lg:col-span-2 h-[320px] flex flex-col">
          <h3 className="text-sm font-mono text-gray-400 mb-4 tracking-widest uppercase flex items-center">
            <Activity className="w-4 h-4 mr-2 text-tech glow-text-tech" />
            Safety Velocity Array
          </h3>
          <div className="flex-grow w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0B0B0B" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{fill: '#475569', fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{fill: '#475569', fontSize: 12}} dx={-10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#39FF14', borderRadius: '12px', boxShadow: '0 0 15px rgba(57,255,20,0.2)' }}
                  itemStyle={{ color: '#39FF14', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Area type="monotone" dataKey="score" stroke="#39FF14" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, fill: '#39FF14', stroke: '#0B0B0B', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Metrics */}
        <motion.div variants={itemVariants} className="glass-panel-hover glass-panel rounded-2xl p-6 relative overflow-hidden group">
           <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-danger/10 rounded-full blur-3xl group-hover:bg-danger/20 transition-all"></div>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-sm font-mono text-gray-400 tracking-widest uppercase">Analyzed Threats</p>
                 <p className="text-4xl font-bold font-display text-white mt-2">{stats.totalSugarsDetected}</p>
                 <p className="text-sm text-gray-500 mt-1">Hidden Sugars isolated</p>
              </div>
              <ShieldAlert className="w-12 h-12 text-danger glow-text-danger" />
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel-hover glass-panel rounded-2xl p-6 relative overflow-hidden group">
           <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-warning/10 rounded-full blur-3xl group-hover:bg-warning/20 transition-all"></div>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-sm font-mono text-gray-400 tracking-widest uppercase">Synthetic Nodes</p>
                 <p className="text-4xl font-bold font-display text-white mt-2">{stats.totalAdditivesDetected}</p>
                 <p className="text-sm text-gray-500 mt-1">Additives detected</p>
              </div>
              <BadgeInfo className="w-12 h-12 text-warning glow-text-warning" />
           </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="glass-panel-hover glass-panel rounded-2xl p-6 relative overflow-hidden group">
           <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-safe/10 rounded-full blur-3xl group-hover:bg-safe/20 transition-all"></div>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-sm font-mono text-gray-400 tracking-widest uppercase">Total Operations</p>
                 <p className="text-4xl font-bold font-display text-white mt-2">{stats.totalScans}</p>
                 <p className="text-sm text-gray-500 mt-1">Successful neural scans</p>
              </div>
              <Activity className="w-12 h-12 text-safe glow-text-safe" />
           </div>
        </motion.div>

      </motion.div>

      {/* Orbiting Recent Scans Grid */}
      <div className="mt-10">
        <h2 className="text-lg font-mono tracking-widest uppercase text-gray-300 mb-6 flex items-center">
           <span className="w-2 h-2 bg-tech rounded-full mr-2 glow-text-tech animate-pulse"></span>
           Recent Scan Logs
        </h2>
        
        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.slice(0, 6).map((scan, i) => (
              <motion.div 
                key={scan._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel-hover glass-panel rounded-xl p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white font-display truncate w-48">{scan.productId?.name || 'Unknown Product'}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">{new Date(scan.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-2 py-1 rounded font-mono font-bold text-xs border ${
                    scan.scanData?.score >= 75 ? 'text-safe border-safe/30 bg-safe/10' :
                    scan.scanData?.score >= 40 ? 'text-warning border-warning/30 bg-warning/10' :
                    'text-danger border-danger/30 bg-danger/10'
                  }`}>
                    {scan.scanData?.score}/100
                  </div>
                </div>
                
                <div className="flex gap-2 text-xs font-mono mt-auto">
                   <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">{scan.scanData?.hiddenSugars?.length || 0} Sugars</span>
                   <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">{scan.scanData?.additives?.length || 0} Additives</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-12 text-center text-gray-500 font-mono">
            No active records found in matrix. Deploy scanner to populate logs.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
