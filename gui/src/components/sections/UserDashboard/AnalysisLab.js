import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, ShieldAlert, AlertTriangle, Zap, Loader2, Info, Smartphone, Mail } from 'lucide-react';
import { PredictService } from '../../../services';

const AnalysisLab = () => {
    const [input, setInput] = useState('');
    const [type, setType] = useState('sms');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {
        if (!input.trim()) return;

        setIsScanning(true);
        setResult(null);

        try {
            const data = await PredictService.predict(type, input);

            // Pobieramy prawdopodobieństwo (obsługa formatu 0-1 lub 0-100)
            const probValue = data.prediction.confidence;
            const percentage = probValue <= 1 ? Math.round(probValue * 100) : Math.round(probValue);
            const explanation = data.prediction.explanation || "Brak dodatkowych informacji.";

            // Logika wykrywania statusu na podstawie procentów
            let status = 'safe';
            let title = 'TREŚĆ WYDAJE SIĘ BEZPIECZNA';

            if (percentage >= 80) {
                status = 'danger';
                title = 'WYKRYTO ZAGROŻENIE!';
            } else if (percentage >= 50) {
                status = 'warning';
                title = 'OSTRZEŻENIE - PODEJRZANA TREŚĆ';
            }

            setResult({
                status,
                probability: percentage,
                title,
                description: explanation,
            });
        } catch (err) {
            setResult({
                status: 'danger',
                title: 'BŁĄD POŁĄCZENIA',
                description: 'Nie udało się połączyć z serwerem analizy AI. Spróbuj ponownie później.'
            });
        } finally {
            setIsScanning(false);
        }
    };

    // Funkcje pomocnicze do stylizacji w zależności od statusu
    const getContainerStyles = (status) => {
        switch (status) {
            case 'danger': return 'bg-red-50 border-red-200 text-red-900';
            case 'warning': return 'bg-amber-50 border-amber-200 text-amber-900';
            default: return 'bg-emerald-50 border-emerald-200 text-emerald-900'; // safe
        }
    };

    const getIconStyles = (status) => {
        switch (status) {
            case 'danger': return 'bg-red-100 text-red-600';
            case 'warning': return 'bg-amber-100 text-amber-600';
            default: return 'bg-emerald-100 text-emerald-600'; // safe
        }
    };

    const getProgressBarStyles = (status) => {
        switch (status) {
            case 'danger': return 'bg-red-500';
            case 'warning': return 'bg-amber-500';
            default: return 'bg-emerald-500'; // safe
        }
    };

    const renderIcon = (status) => {
        switch (status) {
            case 'danger': return <ShieldAlert size={32} />;
            case 'warning': return <AlertTriangle size={32} />;
            default: return <ShieldCheck size={32} />; // safe
        }
    };

    return (
        <div className="glass-card p-8 rounded-[32px] mb-8 relative overflow-hidden border border-white/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-none">Laboratorium SafeGuard</h2>
                        <p className="text-sm text-slate-500 mt-1">Analiza AI w czasie rzeczywistym</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setType('sms')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${type === 'sms' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <Smartphone size={16} /> SMS
                    </button>
                    <button
                        onClick={() => setType('email')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${type === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <Mail size={16} /> E-mail
                    </button>
                </div>
            </div>

            <div className="relative">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Wklej tutaj treść ${type === 'sms' ? 'SMS-a' : 'e-maila'} do sprawdzenia...`}
                    className="w-full h-36 p-6 bg-white/60 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-slate-700 font-medium"
                />

                <div className="absolute bottom-4 right-4 flex gap-3">
                    <button
                        onClick={handleAnalyze}
                        disabled={isScanning || !input.trim()}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black disabled:opacity-50 transition-all shadow-lg"
                    >
                        {isScanning ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                        {isScanning ? 'AI Analizuje...' : 'Analizuj'}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {result && !isScanning && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-8 p-6 rounded-2xl border-2 flex flex-col gap-4 ${getContainerStyles(result.status)}`}
                    >
                        <div className="flex items-start gap-5">
                            <div className={`p-3 rounded-xl shrink-0 ${getIconStyles(result.status)}`}>
                                {renderIcon(result.status)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-xl mb-1">{result.title}</h3>
                                <p className="font-medium opacity-80 text-sm md:text-base">{result.description}</p>

                                {/* Sekcja Procentowa */}
                                {result.probability !== undefined && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold uppercase tracking-tighter">Prawdopodobieństwo AI:</span>
                                            <span className="text-sm font-black">{result.probability}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200/50 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${result.probability}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={`h-full ${getProgressBarStyles(result.status)}`}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
                                    <Info size={14} /> Wynik z Twojego modelu Flask AI
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnalysisLab;