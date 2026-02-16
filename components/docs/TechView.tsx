import React from 'react';
import { Book, Terminal, Zap, Database, Cpu, Layers } from 'lucide-react';

const TechView: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Book size={20} className="text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Operations Manual</h2>
                    <p className="text-[10px] text-slate-500 mono uppercase tracking-widest font-bold">Technical Specifications v1.0.4</p>
                </div>
            </div>

            <div className="space-y-6">
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Terminal size={14} className="text-blue-500" />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Interface Capabilities</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { title: "Real-time Threat Mapping", desc: "Interactive D3-powered global risk visualization." },
                            { title: "Gemini Intelligence Uplink", desc: "Automated sitrep synthesis via neural-linguistic models." },
                            { title: "Tactical Overlay Engine", desc: "Multi-layered HUD for coordinate and base tracking." }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
                                <h4 className="text-[10px] font-black text-blue-400 uppercase mb-1">{item.title}</h4>
                                <p className="text-[10px] text-slate-400 mono uppercase">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Database size={14} className="text-emerald-500" />
                        <h3 className="text-[11px] font-black uppercase tracking-wider">Data Architecture</h3>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-[10px] mono uppercase">
                            <thead className="bg-slate-900 text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="px-4 py-2 font-black">Module</th>
                                    <th className="px-4 py-2 font-black">Source</th>
                                    <th className="px-4 py-2 font-black">Latency</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50 text-slate-400">
                                <tr>
                                    <td className="px-4 py-3 text-slate-200">Risk Data</td>
                                    <td className="px-4 py-3">HST SEC-CORE</td>
                                    <td className="px-4 py-3 text-emerald-500">~2ms</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-slate-200">Map Vectors</td>
                                    <td className="px-4 py-3">Global-189-A</td>
                                    <td className="px-4 py-3 text-emerald-500">~0.5ms</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-slate-200">Intel Synthesis</td>
                                    <td className="px-4 py-3">Gemini-Pro-1.5</td>
                                    <td className="px-4 py-3 text-amber-500">VAR_NET</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="bg-blue-600/5 border border-blue-500/20 p-5 rounded-2xl">
                    <div className="flex items-start gap-4">
                        <Zap size={20} className="text-blue-400 mt-1 shrink-0" />
                        <div className="space-y-2">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-wider">Operational Warning</h4>
                            <p className="text-[10px] text-slate-400 mono uppercase leading-relaxed">
                                This workstation requires a stable handshake with the Gemini Intelligence Network for live sitreps. In [STANDALONE_MODE], the system uses cached heuristics and local threat patterns.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TechView;
