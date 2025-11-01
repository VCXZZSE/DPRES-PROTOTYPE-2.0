import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WelcomeAnimationProps {
  studentName: string;
  schoolName: string;
  onComplete: () => void;
}

export function WelcomeAnimation({ studentName, schoolName, onComplete }: WelcomeAnimationProps) {
  const [particles] = useState(() => {
    // Generate minimal floating particles
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
    }));
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // 5 seconds - swift and professional

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Sophisticated gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 60%, rgba(21, 94, 117, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 40%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 5, ease: "easeInOut" }}
      />

      {/* Minimal particles - subtle and refined */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-200/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bengali Alpona Pattern - Subtle geometric design */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-[0.08]">
        <motion.div
          className="w-[700px] h-[700px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Alpona-inspired geometric pattern */}
            {/* Outer square frame */}
            <rect x="50" y="50" width="300" height="300" fill="none" stroke="white" strokeWidth="0.5" />
            <rect x="70" y="70" width="260" height="260" fill="none" stroke="white" strokeWidth="0.5" />
            
            {/* Diagonal lines creating diamond patterns */}
            <line x1="50" y1="50" x2="350" y2="350" stroke="white" strokeWidth="0.5" />
            <line x1="350" y1="50" x2="50" y2="350" stroke="white" strokeWidth="0.5" />
            
            {/* Bengali lotus motif - simplified and geometric */}
            {[...Array(8)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 200 200)`}>
                {/* Petal shapes */}
                <path
                  d="M 200 200 L 190 150 Q 200 140 210 150 Z"
                  fill="rgba(255, 255, 255, 0.4)"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </g>
            ))}
            
            {/* Concentric circles - traditional alpona element */}
            {[80, 120, 160].map((r, i) => (
              <circle
                key={i}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity={0.6 - i * 0.1}
              />
            ))}
            
            {/* Small decorative dots at cardinal points */}
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 140;
              const y = 200 + Math.sin(rad) * 140;
              return (
                <circle key={`dot-${i}`} cx={x} cy={y} r="3" fill="white" opacity="0.6" />
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Kerala mural art inspired corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-[0.12]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Traditional Kerala mural corner motif */}
          <path
            d="M 0 0 Q 30 0 30 30 L 30 50 Q 30 30 50 30 L 30 30 Q 0 30 0 0"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="25" cy="25" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="25" cy="25" r="4" fill="white" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.12] rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 0 0 Q 30 0 30 30 L 30 50 Q 30 30 50 30 L 30 30 Q 0 30 0 0"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="25" cy="25" r="8" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="25" cy="25" r="4" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* Subtle tricolor accent - refined and minimal */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-20"
        style={{
          background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Professional logo with refined design */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="mb-10"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            {/* Subtle glow */}
            <motion.div 
              className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Logo container - professional gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-blue-800 to-cyan-900 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border border-white/10">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Shield icon - clean and professional */}
              <svg viewBox="0 0 24 24" className="w-12 h-12 sm:w-14 sm:h-14 text-white relative z-10" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            
            {/* Minimal border accent */}
            <div className="absolute -inset-0.5 border border-blue-400/20 rounded-2xl" />
          </div>
        </motion.div>

        {/* Welcome text - professional and clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-blue-300/60 mb-2">
            Welcome to DPRES
          </div>
          <motion.div 
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        </motion.div>

        {/* Student name - elegant presentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.8, 
            duration: 0.4,
            ease: "easeOut",
          }}
          className="relative mb-8"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl px-10 sm:px-16 py-5 border border-white/10 shadow-xl">
            {/* Subtle corner accents inspired by alpona */}
            <div className="absolute top-0 left-0 w-6 h-6">
              <svg viewBox="0 0 24 24" className="w-full h-full text-blue-300/30">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 w-6 h-6 rotate-90">
              <svg viewBox="0 0 24 24" className="w-full h-full text-blue-300/30">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 -rotate-90">
              <svg viewBox="0 0 24 24" className="w-full h-full text-blue-300/30">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rotate-180">
              <svg viewBox="0 0 24 24" className="w-full h-full text-blue-300/30">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-center tracking-wide text-white">
              {studentName}
            </h2>
          </div>
        </motion.div>

        {/* School name - refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl px-8 sm:px-12 py-3 border border-white/10">
            <p className="text-base sm:text-lg text-blue-100/80">
              {schoolName}
            </p>
          </div>
        </motion.div>

        {/* Subtitle - professional tone */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.4 }}
          className="text-blue-200/50 text-sm text-center max-w-md px-4"
        >
          Building resilience through knowledge and preparation
        </motion.p>

        {/* Refined loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
          className="mt-12 flex gap-2"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-blue-300/50 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Professional progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.3 }}
          className="mt-6 w-64 h-0.5 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bengali-inspired bottom decoration - minimal and elegant */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-16"
        >
          <svg width="100" height="30" viewBox="0 0 100 30" className="text-white" fill="none" stroke="currentColor">
            {/* Simple alpona-inspired motif */}
            <circle cx="50" cy="15" r="8" strokeWidth="0.5" />
            <circle cx="50" cy="15" r="12" strokeWidth="0.5" opacity="0.5" />
            <circle cx="30" cy="15" r="4" strokeWidth="0.5" />
            <circle cx="70" cy="15" r="4" strokeWidth="0.5" />
            <line x1="34" y1="15" x2="42" y2="15" strokeWidth="0.5" />
            <line x1="58" y1="15" x2="66" y2="15" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
