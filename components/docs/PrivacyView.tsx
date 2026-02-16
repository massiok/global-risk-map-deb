import React from 'react';
import { ShieldAlert, Fingerprint, Lock, EyeOff, FileText, Scale } from 'lucide-react';

const PrivacyView: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <Fingerprint size={20} className="text-orange-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Sovereignty Policy</h2>
                    <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-bold">Data Governance Protocol 4.1</p>
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-[11px] text-slate-400 mono uppercase leading-relaxed">
                    HST Global operates under the principle of absolute technical sovereignty. Your operational integrity is our primary mission objective.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden group">
                        <Lock size={48} className="absolute -right-4 -bottom-4 text-slate-800 group-hover:text-blue-500/10 transition-colors" />
                        <div className="relative z-10 space-y-3">
                            <div className="flex items-center gap-2 text-blue-400">
                                <ShieldAlert size={16} />
                                <h3 className="text-[10px] font-black uppercase tracking-wider">Local Only Model</h3>
                            </div>
                            <p className="text-[10px] text-slate-500 mono uppercase leading-relaxed">
                                API keys and operational preferences are stored exclusively in your local workstation buffer. No identity telemetry is transmitted to HST Central.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl relative overflow-hidden group">
                        <EyeOff size={48} className="absolute -right-4 -bottom-4 text-slate-800 group-hover:text-emerald-500/10 transition-colors" />
                        <div className="relative z-10 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <EyeOff size={16} />
                                <h3 className="text-[10px] font-black uppercase tracking-wider">Zero Tracking</h3>
                            </div>
                            <p className="text-[10px] text-slate-500 mono uppercase leading-relaxed">
                                We do not employ cookies or session trackers. Your sector analysis is completely anonymous and ephemeral.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Scale size={14} className="text-slate-500" />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Legal Framework</h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "Subject to global data protection standards (GDPR-X compatible).",
                            "External API usage (Gemini) is governed by Google’s Enterprise Privacy TOS.",
                            "Users maintain the right to immediate local buffer purging (Logout command)."
                        ].map((text, i) => (
                            <li key={i} className="flex gap-4 items-start text-[10px] mono uppercase text-slate-400">
                                <span className="text-blue-500 mt-1">▶</span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </section>

                <div className="text-center pt-4 border-t border-slate-800">
                    <p className="text-[9px] text-slate-700 mono uppercase font-bold tracking-widest">
                        SEC_OPS_ID: 0xFF-ALFA-SOVEREIGN
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyView;
