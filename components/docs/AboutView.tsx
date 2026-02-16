import React from 'react';
import { Monitor, Cpu, Globe, Shield, Info, Terminal } from 'lucide-react';

const AboutView: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-6 bg-slate-900 shadow-2xl border border-slate-800 rounded-3xl ring-1 ring-white/10 group">
                    <Monitor size={48} className="text-blue-500 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">HST GLOBAL</h2>
                    <p className="text-blue-500 text-[10px] mono font-bold tracking-[0.5em] uppercase">Tactical Suite v1.0.4</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Globe size={16} />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Mission Profile</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mono uppercase">
                        Providing peak situational awareness for high-stakes geopolitical analysis. HST Global integrates multi-source intelligence into a single tactical interface.
                    </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <Shield size={16} />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Core Security</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mono uppercase">
                        Advanced encryption protocols and secure-air-gap compatibility. Your intelligence data remains local and sovereign at all times.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Cpu size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">System Diagnostics</span>
                    </div>
                    <span className="text-[9px] mono text-emerald-500 font-bold">STATUS: STABLE</span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[10px] mono uppercase">
                    <div className="flex justify-between border-b border-slate-800/50 pb-1">
                        <span className="text-slate-500">Codename:</span>
                        <span className="text-slate-300">DEB-STABLE-104</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-1">
                        <span className="text-slate-500">Clearance:</span>
                        <span className="text-slate-300">ALFA-COMMANDER</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-1">
                        <span className="text-slate-500">Arch:</span>
                        <span className="text-slate-300">ARM64-LINUX</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/50 pb-1">
                        <span className="text-slate-500">Build:</span>
                        <span className="text-slate-300">2026.02.16</span>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className="text-[9px] text-slate-600 mono uppercase tracking-tight leading-relaxed">
                    Proprietary Intelligence Technology.<br />
                    © 2026 HST Global Risk Map Solutions. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AboutView;
