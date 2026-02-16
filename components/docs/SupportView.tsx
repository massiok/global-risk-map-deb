import React from 'react';
import { LifeBuoy, Mail, MessageSquare, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

const SupportView: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <LifeBuoy size={20} className="text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Technical Support</h2>
                    <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-bold">Division of Operational Continuity</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <a
                    href="mailto:support@hstgrm.app"
                    className="flex items-center justify-between p-6 bg-slate-900/40 border border-slate-800 rounded-3xl hover:bg-slate-900/80 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-12px_rgba(16,185,129,0.3)] transition-all group no-underline"
                >
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Mail size={24} className="text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-[12px] font-black text-white uppercase tracking-wider mb-1">Direct Uplink</h3>
                            <p className="text-[10px] text-slate-500 mono uppercase">support@hstgrm.app</p>
                        </div>
                    </div>
                    <ExternalLink size={16} className="text-slate-700 group-hover:text-emerald-500" />
                </a>

                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                        <Zap size={16} className="text-blue-500" />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Troubleshooting Buffer</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { q: "Black Screen / Asset Failure", a: "Execute complete workstation reboot (Cmd+Shift+R)." },
                            { q: "Gemini Uplink Offline", a: "Verify API key integrity in Authorization gate." },
                            { q: "Performance Degradation", a: "Close redundant browser processes/buffers." }
                        ].map((item, i) => (
                            <div key={i} className="space-y-1">
                                <p className="text-[10px] font-black text-slate-300 uppercase underline decoration-slate-800 underline-offset-4">{item.q}</p>
                                <p className="text-[10px] text-slate-500 mono uppercase">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6 bg-emerald-900/10 border border-emerald-500/20 rounded-3xl border-dashed">
                <div className="flex items-center gap-4">
                    <ShieldCheck size={28} className="text-emerald-500 shrink-0" />
                    <p className="text-[10px] text-slate-400 mono uppercase leading-relaxed">
                        Our SEC-OPS support team is available for deep-analysis tickets 24/7. Response priority is determined by tactical clearance level.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SupportView;
