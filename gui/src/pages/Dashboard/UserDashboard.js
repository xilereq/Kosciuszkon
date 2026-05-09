import React from 'react';
import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Smartphone,
    Users,
    Gamepad2,
    Siren
} from 'lucide-react';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* NAGŁÓWEK */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                            Twoja Tarcza w Cyfrowym Świecie
                        </h1>
                        <p className="text-slate-500">
                            Kompleksowa ochrona, edukacja i cyfrowy parasol nad Twoimi bliskimi.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold border border-red-200 hover:bg-red-600 hover:text-white transition-all">
                        <Siren className="w-5 h-5" /> Przycisk Paniki
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEWA KOLUMNA: KONDYCJA, STREAKI I TINDER */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Karta: Twoja Kondycja */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <h2 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-6">Twoja Kondycja</h2>
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="0" className="text-blue-600" />
                                </svg>
                                <span className="absolute text-4xl font-black text-slate-900">100%</span>
                            </div>
                            <p className="text-blue-600 font-bold bg-blue-50 py-2 rounded-xl">Status: Bezpieczny</p>
                        </div>

                        {/* Karta: System Streaków */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <h2 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">System Streaków</h2>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="bg-emerald-100 p-3 rounded-full">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                </div>
                                <span className="text-3xl font-black text-slate-900">14 Dni</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Nagradzamy każdy dzień bez wpadki i regularną edukację.
                            </p>
                        </div>

                        {/* Karta: Tinder dla phishingu (PRZENIESIONY NA LEWO) */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Gamepad2 className="w-8 h-8 text-indigo-600" />
                                <h3 className="font-bold text-xl text-slate-900">Tinder dla phishingu</h3>
                            </div>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                Szybka gra typu swipe: zdecyduj w sekundę, czy wiadomość jest bezpieczna, aby utrzymać swoją tarczę.
                            </p>
                            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
                                Rozpocznij Trening
                            </button>
                        </div>
                    </div>

                    {/* ŚRODEK I PRAWA: GŁÓWNE MODUŁY WIZUALNE I ALERTY */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Karta: Aktywna Tarcza */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Aktywna Tarcza</h2>
                            </div>
                            <p className="text-slate-500 mb-6">Analiza e-mail i SMS w czasie rzeczywistym. Proste ostrzeżenia zamiast żargonu.</p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 bg-red-50 p-4 rounded-2xl border border-red-100 transition hover:shadow-md">
                                    <AlertTriangle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-red-900">Podejrzany link! (Odrzucono)</h3>
                                        <p className="text-sm text-red-700 mt-1">Ta strona próbuje wyłudzić Twoje dane do banku. SafeGuard AI zablokował połączenie.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition hover:shadow-md">
                                    <Smartphone className="w-6 h-6 text-slate-400 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-slate-700">Wiadomość SMS zweryfikowana</h3>
                                        <p className="text-sm text-slate-500 mt-1">Ostatnia wiadomość od kuriera jest bezpieczna.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Karta: Family Dashboard */}
                        <div className="bg-blue-600 p-8 rounded-3xl shadow-md text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-8 h-8 text-blue-200" />
                                <h2 className="text-2xl font-bold">Cyfrowy Parasol Rodzinny</h2>
                            </div>
                            <p className="text-blue-100 mb-8 max-w-lg">
                                Dostań powiadomienie PUSH, gdy Twoi bliscy wejdą w podejrzany link. Zainterweniuj, zanim stracą oszczędności życia.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-center backdrop-blur-sm transition hover:bg-white/20">
                                    <p className="text-sm text-blue-200 uppercase font-bold mb-2">Ty</p>
                                    <p className="font-bold text-lg">100% Bezpieczny</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-center backdrop-blur-sm transition hover:bg-white/20">
                                    <p className="text-sm text-blue-200 uppercase font-bold mb-2">Mama</p>
                                    <p className="font-bold text-lg">95% Bezpieczna</p>
                                </div>
                                <div className="bg-red-500/20 p-4 rounded-2xl border border-red-400/50 text-center backdrop-blur-sm animate-pulse">
                                    <p className="text-sm text-red-200 uppercase font-bold mb-2 flex justify-center items-center gap-1">
                                        <AlertTriangle className="w-4 h-4" /> Babcia Krysia
                                    </p>
                                    <p className="font-bold text-red-100 text-lg">Zagrożenie!</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;