import React from 'react';
import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Smartphone,
    Users,
    Gamepad2,
    Siren,
    Bell
} from 'lucide-react';

const FamilyDashboard = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* NAGŁÓWEK ZMIENIONY NA PARASOL RODZINNY */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                            Cyfrowy Parasol Rodzinny
                        </h1>
                        <p className="text-slate-500">
                            Zarządzaj bezpieczeństwem bliskich i reaguj na zagrożenia w czasie rzeczywistym.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold border border-red-200 hover:bg-red-600 hover:text-white transition-all">
                        <Siren className="w-5 h-5" /> Przycisk Paniki
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEWA KOLUMNA: POZOSTAJE BEZ ZMIAN (KONDYCJA, STREAKI I TINDER) */}
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

                        {/* Karta: Tinder dla phishingu */}
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

                    {/* ŚRODEK I PRAWA: KAFELKI ZMIENIONE POD KĄTEM RODZINY */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Karta: Alerty Rodzinne (Zamiast Aktywnej Tarczy) */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Bell className="w-8 h-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Alerty Rodzinne</h2>
                            </div>
                            <p className="text-slate-500 mb-6">Powiadomienia o zagrożeniach wykrytych u Twoich bliskich w czasie rzeczywistym.</p>

                            <div className="space-y-4">
                                {/* Alert dotyczący Babci */}
                                <div className="flex items-start gap-4 bg-red-50 p-4 rounded-2xl border border-red-100 transition hover:shadow-md">
                                    <AlertTriangle className="w-6 h-6 text-red-500 mt-1 shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-red-900">Wykryto zagrożenie! (Babcia Krysia)</h3>
                                            <span className="text-[10px] bg-red-200 text-red-700 font-bold px-2 py-0.5 rounded uppercase">Pilne</span>
                                        </div>
                                        <p className="text-sm text-red-700 mt-1">Babcia próbowała wejść w fałszywy link z SMS ("Niedopłata za paczkę"). SafeGuard AI zablokował połączenie.</p>
                                        <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-red-700 transition">
                                            Zadzwoń do Babci
                                        </button>
                                    </div>
                                </div>
                                {/* Alert dotyczący Mamy */}
                                <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition hover:shadow-md">
                                    <ShieldCheck className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-slate-700">Wiadomość zweryfikowana (Mama)</h3>
                                        <p className="text-sm text-slate-500 mt-1">Ostatnia wiadomość e-mail z banku została zweryfikowana jako bezpieczna.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Karta: Podopieczni Parasola (Niebieska karta, skupiona tylko na podopiecznych) */}
                        <div className="bg-blue-600 p-8 rounded-3xl shadow-md text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-8 h-8 text-blue-200" />
                                <h2 className="text-2xl font-bold">Podopieczni Parasola</h2>
                            </div>
                            <p className="text-blue-100 mb-8 max-w-lg">
                                Monitoruj status bezpieczeństwa członków swojej rodziny. System poinformuje Cię, gdy ich Cyber-Kondycja spadnie.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Profil Mamy */}
                                <div className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center backdrop-blur-sm transition hover:bg-white/20 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold mb-3 text-xl">M</div>
                                    <p className="text-sm text-blue-200 uppercase font-bold mb-1">Mama</p>
                                    <p className="font-bold text-xl">95% Bezpieczna</p>
                                </div>
                                {/* Profil Babci */}
                                <div className="bg-red-500/20 p-6 rounded-2xl border border-red-400/50 text-center backdrop-blur-sm animate-pulse flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-red-500/40 flex items-center justify-center font-bold mb-3 text-xl text-white">BK</div>
                                    <p className="text-sm text-red-200 uppercase font-bold mb-1 flex justify-center items-center gap-1">
                                        <AlertTriangle className="w-4 h-4" /> Babcia Krysia
                                    </p>
                                    <p className="font-bold text-red-100 text-xl">Zagrożenie!</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyDashboard;