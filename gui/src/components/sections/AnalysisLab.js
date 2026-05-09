import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, Zap, Loader2, Info } from 'lucide-react';

const AnalysisLab = () => {
    const [input, setInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = () => {
        if (!input.trim()) return;

        setIsScanning(true);
        setResult(null);

        // Symulacja procesu analizy przez AI (2.5 sekundy)
        setTimeout(() => {
            setIsScanning(false);

            // Prosta logika detekcji: jeśli tekst zawiera link, oznaczamy jako ryzykowne
            if (input.toLowerCase().includes('http') || input.toLowerCase().includes('www.')) {
                setResult({
                    status: 'danger',
                    title: 'WYKRYTO WYSOKIE RYZYKO!',
                    description: 'Nasza analiza wykazała, że ta wiadomość zawiera podejrzany odnośnik. Może to być próba wyłudzenia danych (phishing) lub zainfekowania urządzenia.'
                });
            } else {
                setResult({
                    status: 'safe',
                    title: 'TREŚĆ WYDAJE SIĘ BEZPIECZNA',
                    description: 'SafeGuard AI nie znalazł w przesłanym tekście typowych wzorców stosowanych przez oszustów. Mimo to, zawsze zachowaj czujność.'
                });
            }
        }, 2500);
    };

    return (
        <div className="glass-card p-8 rounded-[32px] mb-8 relative overflow-hidden border border-white/40 shadow-xl">
            {/* Nagłówek modułu */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-none">Laboratorium SafeGuard</h2>
                        <p className="text-sm text-slate-500 mt-1">Skaner wiadomości i linków wspierany przez AI</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    System Aktywny
                </div>
            </div>

            {/* Pole wprowadzania danych */}
            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Wklej tutaj treść SMS-a, e-maila lub podejrzany adres URL, który chcesz sprawdzić..."
                    className="w-full h-36 p-6 bg-white/60 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-slate-700 font-medium placeholder:text-slate-400"
                />

                <div className="absolute bottom-4 right-4 flex gap-3">
                    {input && (
                        <button
                            onClick={() => { setInput(''); setResult(null); }}
                            className="px-4 py-2 text-slate-400 hover:text-slate-600 font-bold transition-colors"
                        >
                            Wyczyść
                        </button>
                    )}
                    <button
                        onClick={handleAnalyze}
                        disabled={isScanning || !input.trim()}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition-all transform active:scale-95"
                    >
                        {isScanning ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Analizowanie...
                            </>
                        ) : (
                            <>
                                <Search size={20} />
                                Sprawdź bezpiecznie
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Sekcja wyników i animacji */}
            <AnimatePresence mode="wait">
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 flex flex-col items-center py-6 border-t border-dashed border-slate-200"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
                            />
                            <div className="relative bg-white p-6 rounded-full shadow-inner border border-blue-100">
                                <ShieldCheck size={48} className="text-blue-600" />
                            </div>
                        </div>
                        <h3 className="mt-4 text-blue-700 font-bold text-lg tracking-tight">Skanowanie w toku...</h3>
                        <p className="text-slate-400 text-sm">Przeszukiwanie bazy znanych zagrożeń i analiza lingwistyczna</p>
                    </motion.div>
                )}

                {result && !isScanning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`mt-8 p-6 rounded-2xl border-2 flex items-start gap-5 shadow-sm ${
                            result.status === 'danger'
                                ? 'bg-red-50/50 border-red-200 text-red-900'
                                : 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        }`}
                    >
                        <div className={`p-3 rounded-xl shrink-0 ${
                            result.status === 'danger' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                            {result.status === 'danger' ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-black text-xl tracking-tight leading-none">
                                    {result.title}
                                </h3>
                            </div>
                            <p className="font-medium opacity-80 leading-relaxed text-sm md:text-base">
                                {result.description}
                            </p>

                            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
                                <Info size={14} />
                                Analiza wygenerowana automatycznie przez SafeGuard AI
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnalysisLab;