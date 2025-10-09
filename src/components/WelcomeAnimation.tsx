import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WelcomeAnimationProps {
  studentName: string;
  schoolName: string;
  onComplete: () => void;
}

export function WelcomeAnimation({ studentName, schoolName, onComplete }: WelcomeAnimationProps) {
  const [particles] = useState(() => {
    // Generate particles once on mount (reduced from 40 to 20)
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Subtle animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.2) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Minimal particle system */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Single minimal mandala pattern */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-[600px] h-[600px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            {/* Clean circular pattern */}
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                <line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2="80"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle cx="200" cy="120" r="6" fill="rgba(37, 99, 235, 0.3)" />
              </g>
            ))}
            {/* Concentric circles */}
            {[80, 140, 200].map((r, i) => (
              <circle
                key={i}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity={0.2}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Minimal tricolor accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 opacity-40"
        style={{
          background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Minimal animated logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="mb-12"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Clean welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl mb-4 tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #F97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600',
            }}
          >
            WELCOME TO DPRES
          </h1>
          <motion.div 
            className="h-px w-32 mx-auto bg-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />
        </motion.div>

        {/* Student name - clean and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 2.2, 
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative mb-10"
        >
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl px-10 sm:px-16 py-6 border border-white/10">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-center tracking-wide text-white"
              style={{
                fontWeight: '700',
              }}
            >
              {studentName}
            </h2>
          </div>
        </motion.div>

        {/* School name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl px-8 sm:px-12 py-3 border border-white/10">
            <p className="text-base sm:text-lg md:text-xl text-white/80">
              {schoolName}
            </p>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="text-white/50 text-sm sm:text-base text-center max-w-md px-4"
        >
          Preparing for excellence in disaster readiness
        </motion.p>

        {/* Simple loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.5 }}
          className="mt-16 flex gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/40 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Clean progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 0.5 }}
          className="mt-6 w-56 h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Minimal Indian motif at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-16"
        >
          <svg width="80" height="40" viewBox="0 0 80 40" className="text-white" fill="none" stroke="currentColor">
            <circle cx="40" cy="20" r="8" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="8" strokeWidth="0.5" />
            <circle cx="60" cy="20" r="8" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
