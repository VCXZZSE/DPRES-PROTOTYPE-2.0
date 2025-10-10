import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Zap } from 'lucide-react';

interface AdminWelcomeAnimationProps {
  adminEmail: string;
  onComplete: () => void;
}

export function AdminWelcomeAnimation({ adminEmail, onComplete }: AdminWelcomeAnimationProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000); // Shorter duration for professionals

    const timeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeUpdate);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      {/* Professional grid background */}
      <div className="absolute inset-0 command-center-grid opacity-30" />
      
      {/* Subtle scan lines effect */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.1) 50%, transparent 100%)',
            'linear-gradient(180deg, transparent 40%, rgba(239, 68, 68, 0.1) 90%, transparent 100%)',
            'linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.1) 50%, transparent 100%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Government tricolor accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 opacity-60"
        style={{
          background: 'linear-gradient(90deg, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* System status header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-8 text-white/60 font-mono text-sm"
        >
          <div>SDMA COMMAND CENTER</div>
          <div>{currentTime.toLocaleTimeString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour12: false 
          })} IST</div>
        </motion.div>

        {/* Professional SDMA logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-8"
        >
          <div className="relative w-24 h-24">
            {/* Main shield */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center admin-glass">
              <Shield className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border-2 border-red-500 rounded-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Professional welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl mb-2 text-white font-semibold tracking-wide">
            SDMA COMMAND CENTER
          </h1>
          <motion.div 
            className="h-px w-40 mx-auto bg-red-500/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>

        {/* Admin credentials display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mb-8"
        >
          <div className="admin-glass rounded-xl px-8 py-4 border border-red-500/20">
            <div className="text-center">
              <div className="text-red-300 text-sm mb-1 font-mono">AUTHORIZED ACCESS</div>
              <div className="text-white text-lg font-medium">{adminEmail}</div>
            </div>
          </div>
        </motion.div>

        {/* System status indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Activity, label: 'SYSTEMS', status: 'ONLINE' },
            { icon: Shield, label: 'SECURITY', status: 'ACTIVE' },
            { icon: Zap, label: 'ALERTS', status: 'READY' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 + index * 0.1, duration: 0.4 }}
              className="admin-glass rounded-lg p-3 text-center border border-green-500/20"
            >
              <item.icon className="w-5 h-5 text-green-400 mx-auto mb-1" strokeWidth={1.5} />
              <div className="text-white/70 text-xs font-mono">{item.label}</div>
              <div className="text-green-400 text-xs font-mono">{item.status}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-white/60 text-sm mb-4 font-mono">INITIALIZING COMMAND CENTER...</div>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Professional footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="absolute bottom-8 text-center text-white/40 text-xs font-mono"
        >
          <div>STATE DISASTER MANAGEMENT AUTHORITY</div>
          <div className="mt-1">GOVERNMENT OF WEST BENGAL</div>
        </motion.div>

        {/* Corner accent elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500"
        />
      </div>
    </div>
  );
}