import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScoreMeter = ({ score = 0, size = 180 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Simple count up animation
    let start = 0;
    const end = parseInt(score, 10);
    if (start === end) return;
    
    let totalDuration = 1500;
    let incrementTime = (totalDuration / end);
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (val) => {
    if (val >= 75) return 'var(--color-safe)'; // #39FF14
    if (val >= 40) return 'var(--color-warning)'; // #FFD60A
    return 'var(--color-danger)'; // #FF3B3B
  };

  const currentColor = getScoreColor(animatedScore);
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center group">
      
      {/* Background Ambient Glow */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-[50px] z-0 transition-colors duration-500"
        style={{ backgroundColor: currentColor }}
      />

      <div className="relative z-10" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90 w-full h-full drop-shadow-xl"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-gray-800"
            fill="transparent"
          />
          {/* Progress Indicator - Heartbeat Pulse */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset,
              scale: animatedScore > 80 ? [1, 1.02, 1] : [1, 1.01, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              strokeDashoffset: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformOrigin: 'center' }}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="transition-colors duration-500"
            css={{ 
              stroke: currentColor,
              filter: `drop-shadow(0 0 12px ${currentColor})`
            }}
          />
        </svg>

        {/* Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-5xl font-mono font-bold tracking-tighter"
            style={{ color: currentColor, textShadow: `0 0 20px ${currentColor}` }}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-gray-400 font-display uppercase tracking-widest mt-1">/100</span>
        </div>
      </div>

    </div>
  );
};

export default ScoreMeter;
