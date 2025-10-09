import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ backgroundColor: '#000000' }}>
      {/* Subtle animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-70"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.4) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Enhanced particle system */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
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

      {/* Indian Background Elements */}
      {/* Lotus Pattern - Bottom Left */}
      <motion.div
        className="absolute bottom-32 left-16 opacity-8"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-orange-300">
          <g stroke="currentColor" fill="currentColor" fillOpacity="0.1" strokeWidth="0.5">
            {[...Array(8)].map((_, i) => (
              <ellipse
                key={i}
                cx="60"
                cy="60"
                rx="35"
                ry="15"
                transform={`rotate(${i * 45} 60 60)`}
              />
            ))}
            <circle cx="60" cy="60" r="8" fill="currentColor" fillOpacity="0.3" />
          </g>
        </svg>
      </motion.div>

      {/* Small Chakra Symbols scattered */}
      <motion.div
        className="absolute top-1/3 left-1/4 opacity-6"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-blue-300">
          <g stroke="currentColor" fill="none" strokeWidth="0.5">
            <circle cx="30" cy="30" r="25" />
            <circle cx="30" cy="30" r="15" />
            <circle cx="30" cy="30" r="5" fill="currentColor" fillOpacity="0.2" />
          </g>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-1/4 opacity-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-yellow-300">
          <g stroke="currentColor" fill="currentColor" fillOpacity="0.1" strokeWidth="0.5">
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1="20"
                y1="5"
                x2="20"
                y2="35"
                transform={`rotate(${i * 60} 20 20)`}
              />
            ))}
            <circle cx="20" cy="20" r="8" />
            <circle cx="20" cy="20" r="3" fill="currentColor" fillOpacity="0.3" />
          </g>
        </svg>
      </motion.div>

      {/* Om Symbol - Very subtle */}
      <motion.div
        className="absolute top-1/2 left-12 opacity-4"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <path
            d="M25 35c0-8 6-12 12-12s12 4 12 12c0 4-2 8-6 10 4 2 6 6 6 10 0 8-6 12-12 12s-12-4-12-12c0-4 2-8 6-10-4-2-6-6-6-10z"
            stroke="currentColor"
            fill="none"
            strokeWidth="0.5"
          />
          <circle cx="40" cy="25" r="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </motion.div>

      {/* Paisley patterns */}
      <motion.div
        className="absolute top-1/4 right-1/3 opacity-5"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" className="text-pink-300">
          <path
            d="M25 10c8 0 15 7 15 15 0 8-7 15-15 15-4 0-8-2-10-5 2-3 5-7 5-10 0-8-7-15 5-15z"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity="0.1"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      {/* Indian Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${15 + (i * 12)}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-white">
            <path
              d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </svg>
        </motion.div>
      ))}

      {/* Geometric Indian pattern - corners */}
      <motion.div
        className="absolute top-8 left-8 opacity-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-cyan-300">
          <g stroke="currentColor" fill="none" strokeWidth="0.5">
            <rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" />
            <rect x="20" y="20" width="20" height="20" transform="rotate(45 30 30)" />
            <circle cx="30" cy="30" r="5" />
          </g>
        </svg>
      </motion.div>

      {/* Enhanced tricolor accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 opacity-80 shadow-lg"
        style={{
          background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
          boxShadow: '0 2px 10px rgba(255, 153, 51, 0.3)',
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

        {/* Student name - Creative text effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 2.2, 
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative mb-8"
        >
          {/* Glowing backdrop effect */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(37, 99, 235, 0.6) 0%, rgba(249, 115, 22, 0.6) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Main text with gradient and shadow */}
          <h2
            className="relative text-4xl sm:text-5xl md:text-6xl text-center tracking-wide z-10 px-8"
            style={{
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #dbeafe 60%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
              filter: 'drop-shadow(0 4px 20px rgba(37, 99, 235, 0.4))',
            }}
          >
            {studentName}
          </h2>
          
          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-4"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.8), rgba(249, 115, 22, 0.8), transparent)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '60%' }}
            transition={{ delay: 3, duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        {/* School name - Creative text effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="text-center mb-48 relative"
        >
          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 blur-2xl opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* School name with elegant styling */}
          <p 
            className="relative text-lg sm:text-xl md:text-2xl z-10 px-6"
            style={{ 
              fontWeight: '600',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 50%, #f1f5f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em',
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.2)',
              filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.15))',
            }}
          >
            {schoolName}
          </p>
          
          {/* Decorative elements */}
          <motion.div
            className="flex justify-center mt-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.8 }}
          >
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent self-center"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
          </motion.div>
        </motion.div>

        {/* Subtitle - greyish color */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="text-gray-400 text-base sm:text-lg text-center max-w-lg px-4 mb-16 mt-8"
          style={{ 
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            lineHeight: '1.6',
            letterSpacing: '0.01em',
            color: '#9ca3af',
          }}
        >
          Preparing for excellence in disaster readiness
        </motion.p>

        {/* Three dots moved to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 0.5 }}
          className="flex gap-2 mb-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/50 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Simple loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.5 }}
          className="mt-8 flex gap-2"
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

        {/* Enhanced Indian motif at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-16"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" className="text-white" fill="none" stroke="currentColor">
            {/* Traditional Indian border pattern */}
            <g strokeWidth="0.5">
              {/* Central lotus */}
              <g transform="translate(60, 30)">
                {[...Array(8)].map((_, i) => (
                  <ellipse
                    key={i}
                    rx="12"
                    ry="4"
                    transform={`rotate(${i * 45})`}
                    fillOpacity="0.1"
                    fill="currentColor"
                  />
                ))}
                <circle r="3" fill="currentColor" fillOpacity="0.3" />
              </g>
              
              {/* Side decorative elements */}
              <circle cx="20" cy="30" r="6" strokeWidth="0.3" />
              <circle cx="100" cy="30" r="6" strokeWidth="0.3" />
              
              {/* Connecting patterns */}
              <path d="M26 30 Q 40 20 54 30" strokeWidth="0.3" />
              <path d="M66 30 Q 80 20 94 30" strokeWidth="0.3" />
              
              {/* Small decorative dots */}
              <circle cx="35" cy="25" r="1" fill="currentColor" fillOpacity="0.4" />
              <circle cx="85" cy="25" r="1" fill="currentColor" fillOpacity="0.4" />
            </g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
