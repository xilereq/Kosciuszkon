import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Beaker, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const handleInstallClick = () => {
        alert(
            "Instalacja wersji deweloperskiej (Hackathon MVP):\n\n" +
            "1. Otwórz nową kartę i wpisz adres: chrome://extensions\n" +
            "2. Włącz 'Tryb dewelopera' w prawym górnym rogu.\n" +
            "3. Kliknij 'Załaduj rozpakowane' i wybierz folder 'plugin' z naszego projektu."
        );
    };
    return (
        <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 relative overflow-hidden">
            {/* Tło - poprawiona warstwa z-index i pozycjonowanie */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-purple-300/20 blur-[120px]" />
                <div className="absolute top-[10%] -right-[5%] w-[50%] h-[50%] rounded-full bg-fuchsia-300/20 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                        Twoja Tarcza w <span className="bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">Cyfrowym Świecie.</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                        Kompleksowa ochrona przed phishingiem, prosta edukacja i cyfrowy parasol nad Twoimi bliskimi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleInstallClick}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl shadow-blue-200"
                        >
                            Zainstaluj darmową wtyczkę <ChevronRight className="w-5 h-5" />
                        </button>
                        <Link to="/login" className="flex items-center justify-center gap-2 bg-white/80 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl text-lg font-bold hover:border-purple-400 hover:bg-purple-50 transition-all">
                            <Beaker className="w-5 h-5 text-purple-500" /> Zaloguj do Laboratorium
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
                        <div className="bg-slate-100 h-8 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <div className="p-8">
                            <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl shadow-purple-900/10 animate-pulse relative z-20">
                                <AlertTriangle className="w-12 h-12 text-amber-500 shrink-0" />
                                <div>
                                    <h4 className="text-amber-800 font-bold text-lg">Podejrzany link!</h4>
                                    <p className="text-amber-700 text-sm md:text-base">Ta strona próbuje wyłudzić Twoje dane do banku. SafeGuard AI zablokował połączenie.</p>
                                </div>
                            </div>
                            <div className="mt-8 space-y-3">
                                <div className="h-4 bg-slate-100 rounded w-3/4" />
                                <div className="h-4 bg-slate-100 rounded w-1/2" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-60" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;