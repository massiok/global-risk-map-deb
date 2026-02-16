
import React from 'react';
import { AlertCircle, ShieldAlert, Globe, Loader2, X, Activity, Terminal, ListChecks, Coins, Target, ShieldCheck, Lock, UserCheck, ShieldQuestion, Key, RefreshCw, Clock, Newspaper, ChevronRight } from 'lucide-react';
import TacticalChat from './TacticalChat';
import { IntelligenceResponse, RiskLevel, NewsItem } from '../types';
import { getGlobalNews } from '../services/geminiService';
import { RISK_COLORS, RISK_GRADIENTS } from '../constants';

interface IntelligencePanelProps {
  countryId: string;
  countryName: string;
  briefing: IntelligenceResponse | null;
  loading: boolean;
  onClose: () => void;
  onRefresh: () => void;
  currentRisk: { score: number; level: RiskLevel };
}

const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  countryId,
  countryName,
  briefing,
  loading,
  onClose,
  onRefresh,
  currentRisk
}) => {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = React.useState(false);

  React.useEffect(() => {
    const loadNews = async () => {
      setNewsLoading(true);
      try {
        const data = await getGlobalNews();
        setNews(data);
      } catch (e) {
        console.error("RSS_UPLINK_FAILURE", e);
      } finally {
        setNewsLoading(false);
      }
    };
    loadNews();
  }, [countryId]);
  return (
    <div className="h-full w-full bg-[#0d1117] border-l border-slate-800 flex flex-col shadow-2xl overflow-hidden relative">
      <div className={`p-8 bg-gradient-to-br ${RISK_GRADIENTS[currentRisk.level]} border-b border-slate-800 relative`}>
        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-500">
              <Lock size={8} />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">Top Secret</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: RISK_COLORS[currentRisk.level] }} />
              <span className={`text-[9px] font-black uppercase tracking-widest`} style={{ color: RISK_COLORS[currentRisk.level] }}>{currentRisk.level} THREAT</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none">{countryName}</h2>
            {briefing && (
              <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${briefing.source === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                briefing.source === 'CACHED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}>
                <div className={`w-1 h-1 rounded-full ${briefing.source === 'LIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-current'}`} />
                {briefing.source} INTEL
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-2">
              <UserCheck size={10} className="text-blue-500" />
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest"> Clearance Verified: OPERATOR_001</span>
            </div>
            {briefing?.timestamp && (
              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={10} />
                <span className="text-[8px] font-bold uppercase tracking-widest">
                  T+{new Date(briefing.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-4 -m-4 bg-slate-950/20 hover:bg-slate-950/80 rounded-full text-slate-400 hover:text-white transition-all z-50 flex items-center justify-center group"
          title="Close Intelligence SITREP"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#0d1117] custom-scrollbar">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-6">
            <div className="relative">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <Activity className="absolute inset-0 m-auto text-blue-400 opacity-20" size={16} />
            </div>
            <p className="mono text-[9px] uppercase tracking-[0.4em] font-black animate-pulse">Decrypting Signal</p>
          </div>
        ) : briefing ? (
          <>
            <section className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-blue-600/20" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <ShieldCheck size={12} className="text-blue-400" />
                  Executive Summary
                </h3>
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all flex items-center gap-2 group"
                >
                  <RefreshCw size={10} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
                  <span className="text-[8px] font-black tracking-widest">REGROW INTEL</span>
                </button>
              </div>
              <p className="text-slate-100 leading-relaxed text-lg font-medium tracking-tight italic opacity-90">"{briefing.summary}"</p>
            </section>

            <div className="grid grid-cols-1 gap-4 relative">
              {!briefing.isAdvanced && (
                <div className="absolute inset-x-0 -inset-y-2 z-20 flex flex-col items-center justify-center p-6 bg-[#0d1117]/60 backdrop-blur-md rounded-xl border border-blue-500/30 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]">
                  <div className="p-3 bg-blue-600/20 rounded-full border border-blue-500/40 mb-3 animate-pulse">
                    <Key size={20} className="text-blue-400" />
                  </div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] mb-1">Neural Handshake Required</h4>
                  <p className="text-[9px] text-slate-400 mono uppercase tracking-tight text-center max-w-[200px]">Advanced geopolitical synthesis is encrypted. Please authorize via API uplink to decrypt full SITREP.</p>
                </div>
              )}

              <div className={`${!briefing.isAdvanced ? 'blur-[6px] select-none opacity-40 pointer-events-none' : ''} space-y-4`}>
                {[
                  { l: 'Stability', d: briefing.politicalStability, i: ShieldAlert, c: 'text-red-400' },
                  { l: 'Conflict', d: briefing.conflictPotential, i: AlertCircle, c: 'text-orange-400' },
                  { l: 'Economic', d: briefing.economicRisk, i: Coins, c: 'text-emerald-400' }
                ].map(v => (
                  <div key={v.l} className="p-4 bg-slate-900/40 rounded border border-slate-800 hover:bg-slate-900 transition-colors">
                    <h4 className={`text-[8px] font-black uppercase mb-2 flex items-center gap-2 ${v.c}`}>
                      <v.i size={10} /> {v.l} STATUS
                    </h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed mono opacity-80">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="space-y-4">
              <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Newspaper size={12} className="text-emerald-500" />
                Global News Uplink (Non-API)
              </h3>
              <div className="space-y-2">
                {newsLoading ? (
                  <div className="p-4 flex items-center justify-center text-slate-700 animate-pulse">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span className="text-[9px] mono uppercase">Syncing RSS Buffer...</span>
                  </div>
                ) : news.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/30 border border-slate-800/50 rounded-lg hover:bg-slate-900/50 transition-all group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{item.category} // {item.timestamp}</span>
                      <ChevronRight size={10} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Tactical Threat Vectors</h3>
              <div className="space-y-2">
                {briefing.keyThreats.map((threat, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800 rounded group hover:border-blue-500/50 transition-all">
                    <span className="mono text-[9px] text-blue-600 font-bold">TRT-0{idx + 1}</span>
                    <span className="text-slate-200 text-[9px] font-bold uppercase tracking-wide group-hover:text-blue-200">{threat}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-4 border-t border-slate-800/50">
              <TacticalChat countryName={countryName} isStandalone={!briefing.isAdvanced} />
            </section>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-700 text-center gap-6">
            <div className="p-4 rounded-full border border-slate-800/50">
              <Globe size={32} className="opacity-20" />
            </div>
            <div className="space-y-2">
              <p className="text-[9px] mono uppercase font-bold text-slate-500">Awaiting Target Selection</p>
              <p className="text-[8px] mono text-slate-700">Sector data will be retrieved via HST primary uplink.</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-[#010409] border-t border-slate-800">
        <div className="flex justify-between items-center opacity-60">
          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest mono">SEC-OPS // HST-INTEL</span>
          <span className="text-[8px] text-blue-900 font-black uppercase tracking-widest mono">DEB-PKG-REF: 104-B</span>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
