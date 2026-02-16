
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Cpu, Zap } from 'lucide-react';

interface TacticalOrbProps {
    isListening: boolean;
    onToggleListen: () => void;
    isActive: boolean;
}

const TacticalOrb: React.FC<TacticalOrbProps> = ({ isListening, onToggleListen, isActive }) => {
    const [pulse, setPulse] = useState(1);

    useEffect(() => {
        if (isListening) {
            const interval = setInterval(() => {
                setPulse(p => (p === 1.1 ? 1 : 1.1));
            }, 400);
            return () => clearInterval(interval);
        } else {
            setPulse(1);
        }
    }, [isListening]);

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer Glow Rings */}
            <div
                className={`absolute inset-0 rounded-full transition-all duration-700 blur-2xl ${isListening ? 'bg-blue-500/40 scale-150' : isActive ? 'bg-emerald-500/20 scale-110' : 'bg-slate-800/20 scale-100'
                    }`}
            />

            {/* Animated Pulse Border */}
            <div
                className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${isListening ? 'border-blue-400/50 scale-125' : 'border-slate-800/30 scale-100'
                    }`}
                style={{ transform: `scale(${isListening ? pulse : 1})` }}
            />

            {/* Main Orb Body */}
            <button
                onClick={onToggleListen}
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl backdrop-blur-xl group overflow-hidden ${isListening
                        ? 'bg-blue-600 border-blue-400 shadow-blue-500/50 scale-110'
                        : isActive
                            ? 'bg-slate-900/90 border-emerald-500/50 shadow-emerald-500/20 hover:border-blue-500'
                            : 'bg-slate-950/80 border-slate-800 shadow-black'
                    } border-2`}
            >
                {/* Interior Energy Sweep */}
                <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-400/10 to-blue-500/0 animate-pulse ${isListening ? 'opacity-100' : 'opacity-0'}`} />

                {/* Core Icon */}
                <div className="relative z-20 flex flex-col items-center">
                    {isListening ? (
                        <div className="relative">
                            <Mic size={24} className="text-white animate-bounce" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        </div>
                    ) : (
                        <Cpu size={24} className={`${isActive ? 'text-emerald-500' : 'text-slate-600'} group-hover:text-blue-400 transition-colors duration-300`} />
                    )}
                </div>

                {/* Neural Scan Line (Static when idle, active when on) */}
                <div
                    className={`absolute left-0 w-full h-[1px] bg-blue-400/30 transition-all duration-1000 ${isListening ? 'top-0 animate-scan' : 'top-1/2 opacity-0'
                        }`}
                />
            </button>

            {/* Status Label */}
            <div className={`absolute top-full mt-4 flex flex-col items-center transition-all duration-500 ${isListening ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-2'}`}>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 animate-pulse">
                    {isListening ? 'Link_Active' : 'Neural_Idle'}
                </span>
                <span className="text-[6px] mono text-slate-600 uppercase tracking-widest mt-1">
                    Tactical Uplink S-04
                </span>
            </div>

            <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default TacticalOrb;
