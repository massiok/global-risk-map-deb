
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Search, Shield, Radio, Layers, Menu, Wifi, Eye, EyeOff, Globe, Crosshair, AlertTriangle, Zap, Info, ExternalLink, ChevronDown, Target, Terminal as TerminalIcon, Maximize2, Monitor, Settings, HelpCircle, Activity, X, Database, ShieldCheck, Cpu, FileText, LifeBuoy, Fingerprint, Lock, Unlock, User, ArrowRight, ShieldAlert, Loader2 as LoaderIcon, Key } from 'lucide-react';
import WorldMap from './components/WorldMap';
import IntelligencePanel from './components/IntelligencePanel';
import { getCountryBriefing } from './services/geminiService';
import { IntelligenceResponse, RiskLevel, LayerVisibility } from './types';
import { MOCK_RISK_DATA, RISK_COLORS } from './constants';
import AboutView from './components/docs/AboutView';
import TechView from './components/docs/TechView';
import PrivacyView from './components/docs/PrivacyView';
import SupportView from './components/docs/SupportView';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [bootPhase, setBootPhase] = useState(0);
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('HST_GEMINI_API_KEY') || '');
  const [isStandalone, setIsStandalone] = useState<boolean>(localStorage.getItem('HST_STANDALONE_MODE') === 'true');
  const [inputKey, setInputKey] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<{ id: string; name: string } | null>(null);
  const [briefing, setBriefing] = useState<IntelligenceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCommand, setViewCommand] = useState<{ type: 'COORDS', lat: number, lng: number } | null>(null);
  const [logs, setLogs] = useState<string[]>(["SYSTEM: HST Global Risk Map v1.0.4 initialized", "AUTH: Awaiting neural handshake..."]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [showDocModal, setShowDocModal] = useState<'about' | 'tech' | 'privacy' | 'support' | null>(null);
  const [layers, setLayers] = useState<LayerVisibility>({ risk: true, bases: true, hud: true });

  const menuRef = useRef<HTMLDivElement>(null);

  // Memoize currentRisk based on selectedCountry
  const currentRisk = useMemo(() => {
    if (!selectedCountry) return { score: 0, level: RiskLevel.UNKNOWN };
    return MOCK_RISK_DATA[selectedCountry.id] || { score: 0, level: RiskLevel.UNKNOWN };
  }, [selectedCountry]);

  useEffect(() => {
    const initAuth = async () => {
      // Professional boot sequence
      for (let i = 1; i <= 3; i++) {
        setBootPhase(i);
        await new Promise(r => setTimeout(r, 600));
      }

      try {
        const storedKey = localStorage.getItem('HST_GEMINI_API_KEY');
        const standalonePref = localStorage.getItem('HST_STANDALONE_MODE') === 'true';

        if (storedKey || standalonePref) {
          setIsAuthorized(true);
          addLog(standalonePref ? "AUTH: Standalone mode restored." : "AUTH: Security token found. Session restored.");
        }
      } catch (e) {
        addLog("AUTH: Initial handshake failed. Manual clearance required.");
      }
      setCheckingAuth(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleConnect = () => {
    if (!inputKey.trim()) return;
    setIsAuthorizing(true);
    setTimeout(() => {
      setApiKey(inputKey);
      localStorage.setItem('HST_GEMINI_API_KEY', inputKey);
      localStorage.setItem('HST_STANDALONE_MODE', 'false');
      setIsStandalone(false);
      setIsAuthorized(true);
      setIsAuthorizing(false);
      addLog("AUTH: External API key synchronized. Uplink active.");
    }, 1000);
  };

  const handleEnterStandalone = () => {
    setIsStandalone(true);
    localStorage.setItem('HST_STANDALONE_MODE', 'true');
    setIsAuthorized(true);
    addLog("AUTH: Standalone mode active. Using local heuristics.");
  };

  const handleLogout = () => {
    localStorage.removeItem('HST_GEMINI_API_KEY');
    localStorage.removeItem('HST_STANDALONE_MODE');
    setIsAuthorized(false);
    window.location.reload();
  };

  const fetchIntelligence = useCallback(async (countryId: string, countryName: string, forceRefresh: boolean = false) => {
    setLoading(true);
    addLog(`INTEL: Analyzing sector ${countryId} (${countryName})...`);
    try {
      const data = await getCountryBriefing(countryName, apiKey, forceRefresh ? false : isStandalone);
      setBriefing(data);
      addLog(`INTEL: ${countryName} SITREP synchronized.`);
    } catch (error) {
      console.error('Failed to fetch intelligence:', error);
      if (error instanceof Error && error.message.includes("Requested entity was not found")) {
        addLog("ERROR: API Key rejected by backend. Resetting authorization.");
        setIsAuthorized(false);
      } else {
        addLog(`ERROR: Connection to ${countryId} timed out.`);
      }
      setBriefing(null);
    } finally {
      setLoading(false);
    }
  }, [apiKey, isStandalone, addLog]);

  const handleCountrySelect = useCallback((id: string, name: string) => {
    setSelectedCountry({ id, name });
    setIsSidebarOpen(true);
    fetchIntelligence(id, name);
  }, [fetchIntelligence]);

  const handleRegenerateIntel = () => {
    if (!selectedCountry) return;
    fetchIntelligence(selectedCountry.id, selectedCountry.name, true);
  };

  const toggleLayer = (layer: keyof LayerVisibility) => {
    addLog(`VIEW: Visual overlay [${layer.toUpperCase()}] updated.`);
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const menuItems: Record<string, { label: string; action: () => void; icon?: any }[]> = {
    'System': [
      { label: 'Workstation Info', action: () => { setShowDocModal('about'); setActiveMenu(null); }, icon: Info },
      { label: 'Clear Telemetry Logs', action: () => { setLogs([]); setActiveMenu(null); }, icon: TerminalIcon },
      { label: 'Check Updates', action: () => { addLog("SYSTEM: Running HST-CORE v1.0.4 stable."); setActiveMenu(null); }, icon: Cpu },
      { label: 'Lock Console', action: () => { handleLogout(); }, icon: Lock }
    ],
    'Intelligence': [
      { label: 'Global Situation', action: () => { addLog(`INTEL: Tracking ${Object.keys(MOCK_RISK_DATA).length} threat vectors.`); setActiveMenu(null); }, icon: Shield },
      { label: 'Secure Export', action: () => { addLog("EXPORT: Packet ready for secure transit."); setActiveMenu(null); }, icon: Database }
    ],
    'View': [
      { label: 'Risk Heatmap', action: () => toggleLayer('risk'), icon: Shield },
      { label: 'Tactical Nodes', action: () => toggleLayer('bases'), icon: Radio },
      { label: 'Satellite Grid', action: () => toggleLayer('hud'), icon: Globe }
    ],
    'Help': [
      { label: 'Operations Manual', action: () => { setShowDocModal('tech'); setActiveMenu(null); }, icon: FileText },
      { label: 'Sovereignty Policy', action: () => { setShowDocModal('privacy'); setActiveMenu(null); }, icon: Fingerprint },
      { label: 'Technical Support', action: () => { setShowDocModal('support'); setActiveMenu(null); }, icon: LifeBuoy }
    ]
  };

  // SPLASH SCREEN (Security Gate)
  if (!isAuthorized || checkingAuth) {
    const bootLogs = [
      "Initializing secure sandbox...",
      "Connecting to Gemini Intelligence Uplink...",
      "Checking API Authorization...",
      "Awaiting User Credentials..."
    ];

    return (
      <div className="h-screen w-screen bg-[#010409] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-md w-full z-10 space-y-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10 group">
              <Monitor size={64} className="text-blue-500 group-hover:scale-110 transition-transform duration-500" />
              {checkingAuth && (
                <div className="absolute -bottom-3 -right-3 bg-blue-600 p-3 rounded-full border-8 border-[#010409]">
                  <LoaderIcon className="animate-spin text-white" size={16} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-white uppercase tracking-[0.25em]">HST GLOBAL</h1>
              <p className="text-[10px] text-blue-500 font-bold tracking-[0.6em] uppercase">Intelligence Workstation</p>
            </div>
          </div>

          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-10 space-y-8 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] backdrop-blur-3xl animate-in zoom-in-95 duration-700 delay-300">
            <div className="space-y-3 text-center">
              <h2 className="text-xl font-bold text-slate-100 uppercase tracking-tight">System Authorization</h2>
              <div className="h-5 flex items-center justify-center">
                <p className="text-[11px] mono text-slate-400 uppercase tracking-widest font-medium">
                  {checkingAuth ? (
                    <span className="flex items-center gap-2">
                      <LoaderIcon size={12} className="animate-spin" />
                      {bootLogs[bootPhase - 1]}
                    </span>
                  ) : "Uplink Credentials Required"}
                </p>
              </div>
            </div>

            {!checkingAuth && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-3">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <Key size={14} />
                    </div>
                    <input
                      type="password"
                      placeholder="GEMINI_API_KEY..."
                      value={inputKey}
                      onChange={(e) => setInputKey(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-11 pr-4 text-xs mono text-blue-400 placeholder:text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-bold tracking-wider"
                    />
                  </div>

                  <button
                    onClick={handleConnect}
                    disabled={isAuthorizing || !inputKey.trim()}
                    className={`w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black uppercase text-xs py-5 rounded-2xl tracking-[0.2em] transition-all flex items-center justify-center gap-3 group shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] ${isAuthorizing ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {isAuthorizing ? <LoaderIcon className="animate-spin" size={20} /> : (
                      <><Zap size={18} className="group-hover:scale-125 transition-transform" /> Connect Workstation</>
                    )}
                  </button>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={handleEnterStandalone}
                    className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:white font-black uppercase text-[10px] py-4 rounded-2xl tracking-[0.2em] transition-all flex items-center justify-center gap-3 group"
                  >
                    <Shield size={16} className="text-slate-500 group-hover:text-amber-500" />
                    Enter Standalone Mode
                  </button>

                  <div className="flex items-center gap-4 px-2">
                    <div className="h-[1px] flex-1 bg-slate-800" />
                    <span className="text-[8px] mono text-slate-600 font-bold uppercase tracking-widest whitespace-nowrap">Provisioning</span>
                    <div className="h-[1px] flex-1 bg-slate-800" />
                  </div>

                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-transparent border border-dashed border-slate-800 hover:border-blue-500/50 text-slate-500 hover:text-blue-400 font-bold uppercase text-[9px] py-3 rounded-xl tracking-[0.2em] transition-all flex items-center justify-center gap-3 no-underline group"
                  >
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Create New API Key
                  </a>
                </div>

                <p className="text-[9px] mono text-slate-600 text-center leading-relaxed px-4 opacity-80 uppercase tracking-tighter">
                  Encrypted session. Key stored locally via browser buffer.
                </p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-700 mono uppercase font-bold tracking-[0.2em] text-center max-w-xs leading-relaxed opacity-60 px-6">
            Authorized operators only. Activity encrypted by HST SEC-OPS Division.
          </div>
        </div>
      </div>
    );
  }

  // MAIN WORKSTATION UI
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#010409] text-slate-200 flex-col font-sans">
      {/* MENU BAR */}
      <nav ref={menuRef} className="h-8 bg-[#0d1117] border-b border-slate-800 flex items-center px-4 justify-between select-none z-[200]">
        <div className="flex items-center gap-6 h-full">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setShowDocModal('about')}>
            <Monitor size={14} className="text-blue-500" />
            <span className="text-[10px] font-black tracking-widest text-white uppercase">HST WORKSTATION</span>
          </div>

          <div className="flex items-center h-full">
            {Object.keys(menuItems).map(menu => (
              <div key={menu} className="relative h-full flex items-center">
                <button
                  onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                  className={`text-[10px] px-3 h-full transition-colors uppercase font-bold tracking-tight ${activeMenu === menu ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  {menu}
                </button>
                {activeMenu === menu && (
                  <div className="absolute top-full left-0 w-60 bg-[#0d1117] border border-slate-800 shadow-2xl z-[210] py-1 animate-in fade-in slide-in-from-top-1 duration-100 ring-1 ring-white/5">
                    {menuItems[menu].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full text-left px-4 py-2 text-[10px] text-slate-300 hover:bg-blue-600 hover:text-white flex items-center gap-3 transition-colors uppercase font-bold tracking-wide"
                      >
                        {item.icon && <item.icon size={12} />}
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-2">
            <Wifi size={12} className={isStandalone ? "text-amber-500" : "text-emerald-500"} />
            <span className="text-[9px] mono uppercase text-slate-300">{isStandalone ? "UNLINKED_BUFFER" : "HYPER_LINK_STABLE"}</span>
          </div>
          <span className={`text-[9px] mono uppercase font-bold border px-2 rounded ${isStandalone ? "text-amber-500 border-amber-900/50" : "text-blue-500 border-blue-900/50"}`}>
            {isStandalone ? "LOCAL_CLEARANCE" : "COMMANDER_CLEARANCE"}
          </span>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col relative min-w-0">
          <header className="h-14 border-b border-slate-800/60 bg-[#010409] flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 leading-none">Global Sector Scanning</h2>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider mt-1">SITREP Awareness Map</p>
              </div>

              <div className="relative group ml-4">
                <div className="absolute inset-y-0 left-0 px-3 flex items-center z-10 text-slate-600">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  placeholder="LOCATE SECTOR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-[10px] mono font-bold text-slate-300 w-64 focus:outline-none focus:border-blue-500 transition-all uppercase placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMatrix(!showMatrix)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${showMatrix ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                <Target size={12} />
                <span>Risk Matrix</span>
              </button>
              <button
                onClick={() => setShowLayerPanel(!showLayerPanel)}
                className={`p-2 rounded-lg border transition-all ${showLayerPanel ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
              >
                <Layers size={16} />
              </button>
            </div>
          </header>

          <div className="flex-1 relative bg-[#010409]">
            <WorldMap
              onCountrySelect={handleCountrySelect}
              selectedCountryId={selectedCountry?.id || null}
              riskData={MOCK_RISK_DATA}
              visibleLayers={layers}
              viewCommand={viewCommand}
            />

            {showMatrix && (
              <div className="absolute top-4 right-4 w-48 bg-slate-950/90 border border-slate-800 rounded-xl shadow-2xl p-5 animate-in slide-in-from-top-1 z-50 backdrop-blur-xl">
                <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 border-b border-slate-800 pb-2">Threat Tiers</h4>
                <div className="space-y-3">
                  {[
                    { l: 'CRITICAL', c: RISK_COLORS[RiskLevel.CRITICAL] },
                    { l: 'HIGH', c: RISK_COLORS[RiskLevel.HIGH] },
                    { l: 'MEDIUM', c: RISK_COLORS[RiskLevel.MEDIUM] },
                    { l: 'STABLE', c: RISK_COLORS[RiskLevel.LOW] }
                  ].map(item => (
                    <div key={item.l} className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-400 mono">{item.l}</span>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.c }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showLayerPanel && (
              <div className="absolute top-4 right-4 w-60 bg-slate-950/90 border border-slate-800 rounded-xl shadow-2xl p-5 z-50 backdrop-blur-xl animate-in slide-in-from-top-1">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                  <Zap size={12} className="text-blue-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Visual Layers</span>
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'risk', label: 'Threat Heatmap', icon: Shield, color: 'text-orange-400' },
                    { id: 'bases', label: 'Tactical Nodes', icon: Radio, color: 'text-blue-400' },
                    { id: 'hud', label: 'Sat Telemetry', icon: Globe, color: 'text-emerald-400' }
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => toggleLayer(layer.id as keyof LayerVisibility)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${layers[layer.id as keyof LayerVisibility] ? 'bg-white/5 border border-white/10' : 'opacity-20 border border-transparent'}`}
                    >
                      <div className="flex items-center gap-3">
                        <layer.icon size={14} className={layer.color} />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-300 mono">{layer.label}</span>
                      </div>
                      {layers[layer.id as keyof LayerVisibility] ? <Eye size={12} className="text-blue-400" /> : <EyeOff size={12} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full h-32 bg-[#010409]/95 border-t border-slate-800 z-10 flex flex-col backdrop-blur-xl">
              <div className="h-6 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={10} className="text-slate-500" />
                  <span className="text-[8px] font-black uppercase text-slate-500 tracking-[0.2em]">Telemetry Diagnostics</span>
                </div>
                <span className="text-[7px] mono text-emerald-500/50">SEC_ALPHA_ACTIVE</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 mono text-[10px] text-emerald-500/80 space-y-0.5 scroll-smooth">
                {logs.map((log, i) => (
                  <div key={i} className={i === 0 ? "text-emerald-400 font-bold" : ""}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className={`fixed inset-y-0 right-0 z-[110] w-full xs:w-[380px] md:w-[480px] transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:block lg:w-[420px] xl:w-[480px]`}>
          <IntelligencePanel
            countryId={selectedCountry?.id || ""}
            countryName={selectedCountry?.name || "Sector Alpha"}
            briefing={briefing}
            loading={loading}
            onClose={() => setIsSidebarOpen(false)}
            onRefresh={handleRegenerateIntel}
            currentRisk={currentRisk}
          />
        </aside>
      </div>

      <footer className="h-7 bg-[#0d1117] border-t border-slate-800 flex items-center overflow-hidden z-[100]">
        <div className="bg-red-900/30 px-3 h-full flex items-center gap-2 border-r border-slate-800">
          <AlertTriangle size={10} className="text-red-500" />
          <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">LIVE_FEED</span>
        </div>
        <div className="flex-1 px-4 overflow-hidden relative">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {Object.entries(MOCK_RISK_DATA).filter(([_, d]) => d.level === RiskLevel.CRITICAL).map(([id]) => (
              <div key={id} className="flex items-center gap-2">
                <span className="text-red-400 font-bold text-[9px] mono uppercase">ALARM_SECTOR_{id}</span>
                <span className="text-slate-600 text-[8px] mono uppercase tracking-tight">Critical geopolitical instability detected. Uplink established.</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 border-l border-slate-800 text-[8px] text-slate-500 mono font-bold bg-slate-900/50 h-full flex items-center">
          OS: HST-X-STABLE
        </div>
      </footer>

      {showDocModal && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[300] flex items-center justify-center p-6">
          <div className="bg-[#0d1117] border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 ring-1 ring-white/10">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
              <div className="flex items-center gap-3">
                <Monitor size={20} className="text-blue-500" />
                <span className="font-black uppercase tracking-widest text-white text-[10px]">Document Viewer</span>
              </div>
              <button onClick={() => setShowDocModal(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
              {showDocModal === 'about' && <AboutView />}
              {showDocModal === 'tech' && <TechView />}
              {showDocModal === 'privacy' && <PrivacyView />}
              {showDocModal === 'support' && <SupportView />}
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={() => setShowDocModal(null)}
                  className="flex-1 bg-blue-600 text-white font-black uppercase text-[10px] py-4 rounded-2xl tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/10"
                >
                  Close Secure Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
        * { cursor: default !important; }
        button, a, input, [role="button"] { cursor: pointer !important; }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #1e293b;
            border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #334155;
        }
      `}</style>
    </div>
  );
};

export default App;
