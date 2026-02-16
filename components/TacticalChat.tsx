import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Cpu, User, Loader2, Zap } from 'lucide-react';
import { ChatMessage } from '../types';

interface TacticalChatProps {
    countryName: string;
    isStandalone: boolean;
}

const TacticalChat: React.FC<TacticalChatProps> = ({ countryName, isStandalone }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: `SYSTEM READY. ANALYZING ${countryName.toUpperCase()} SECTOR. AWAITING OPERATIONAL QUERY.`,
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // AI simulation / Actual AI integration would go here
        setTimeout(() => {
            const responseContent = isStandalone
                ? `[LOCAL_BUFFER_RESPONSE]: ANALYSIS OF "${input.toUpperCase()}" REQUIRES NEURAL HANDSHAKE. PLEASE AUTHORIZE VIA API UPLINK FOR DEEP SYNTHESIS.`
                : `ANALYZING ${input}... GEOPOLITICAL VECTORS IN ${countryName} INDICATE CONTINUED VOLATILITY IN THIS DOMAIN.`;

            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseContent,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[400px]">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Tactical Comm Uplink</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-emerald-500 mono uppercase">Encrypted</span>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.5),rgba(2,6,23,0.8))]"
            >
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`mt-1 p-1.5 rounded bg-slate-900 border ${msg.role === 'user' ? 'border-blue-500/30' : 'border-slate-800'} shrink-0`}>
                            {msg.role === 'user' ? <User size={12} className="text-blue-400" /> : <Cpu size={12} className="text-slate-400" />}
                        </div>
                        <div className={`space-y-1 max-w-[80%]`}>
                            <div className={`p-3 rounded-2xl text-[10px] mono uppercase leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600/10 border border-blue-500/20 text-blue-200 rounded-tr-none'
                                    : 'bg-slate-900/50 border border-slate-800 text-slate-300 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                            <p className={`text-[8px] text-slate-600 mono ${msg.role === 'user' ? 'text-right' : ''}`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="mt-1 p-1.5 rounded bg-slate-900 border border-slate-800 shrink-0">
                            <Loader2 size={12} className="text-slate-600 animate-spin" />
                        </div>
                        <div className="bg-slate-900/30 p-3 rounded-2xl animate-pulse">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" />
                                <div className="w-1 h-1 rounded-full bg-slate-500 animate-bounce delay-100" />
                                <div className="w-1 h-1 rounded-full bg-slate-500 animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 bg-slate-900/50 border-t border-slate-800">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'ENTER' || e.key === 'Enter' ? handleSend() : null}
                        placeholder="ENTER TACTICAL QUERY..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-[10px] mono text-white focus:outline-none focus:border-blue-500 transition-colors uppercase placeholder:text-slate-700"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors disabled:opacity-50 disabled:bg-slate-800"
                    >
                        <Send size={12} />
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-2 px-1">
                    <Zap size={10} className="text-amber-500" />
                    <span className="text-[8px] text-slate-600 mono uppercase tracking-tighter">Neural Proxy Active // Standing by</span>
                </div>
            </div>
        </div>
    );
};

export default TacticalChat;
