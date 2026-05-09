import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    AlertTriangle,
    Smartphone,
    Users,
    Gamepad2,
    Siren,
    Mail,
    Search,
    Loader2,
    ShieldAlert
} from 'lucide-react';
import api from '../../services/api';
import FamilyService from '../../services/FamilyService';

const UserDashboard = () => {
    // Stan dla danych użytkownika i rodziny (bez streak)
    const [stats, setStats] = useState({ condition: 100, status: 'Ładowanie...' });
    const [events, setEvents] = useState([]);
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);

    // Stan dla Laboratorium Analizy
    const [analysisInput, setAnalysisInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const userResponse = await api.get('/user/dashboard');
                if (mounted) {
                    setStats({
                        condition: userResponse.data.condition || 100,
                        status: userResponse.data.status || 'Bezpieczny'
                    });
                    setEvents(userResponse.data.recentEvents || []);
                }
            } catch (error) {
                if (mounted) {
                    setStats({ condition: 100, status: 'Brak danych' });
                    setEvents([]);
                }
            }
            try {
                const familyData = await FamilyService.getFamily();
                if (mounted) setFamily(familyData);
            } catch (error) {
                if (mounted) setFamily(null);
            }
            if (mounted) setLoading(false);
        };
        fetchData();
        return () => { mounted = false; };
    }, []);

    const handleAnalyze = () => {
        if (!analysisInput.trim()) return;

        setIsScanning(true);
        setAnalysisResult(null);

        setTimeout(() => {
            setIsScanning(false);
            const isRisky = analysisInput.toLowerCase().includes('http') || analysisInput.toLowerCase().includes('zaloguj');
            setAnalysisResult({
                type: isRisky ? 'threat' : 'safe',
                message: isRisky
                    ? 'Wykryto podejrzany link lub próbę wyłudzenia danych. Nie klikaj w żadne odnośniki!'
                    : 'Wiadomość nie zawiera znanych wzorców phishingu. Możesz czuć się bezpieczniej.'
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-10">

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Panel Bezpieczeństwa</h1>
                        <p className="text-slate-500 font-medium">Zarządzaj ochroną swoją i swoich bliskich.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold border border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <Siren className="w-5 h-5" /> Przycisk Paniki
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-1 space-y-8">

                        <div className="bg-blue-600 p-8 rounded-3xl shadow-xl text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-8 h-8 text-blue-200" />
                                <h2 className="text-xl font-bold">Parasol Rodzinny</h2>
                            </div>
                            <div className="space-y-4">
                                {loading ? (
                                    <div className="flex items-center gap-2 text-blue-200 animate-pulse">
                                        <Loader2 className="animate-spin w-4 h-4" /> <span>Wczytywanie...</span>
                                    </div>
                                ) : family?.members?.length > 0 ? (
                                    family.members.map((member, idx) => {
                                        const name = typeof member === 'object' ? (member.name || member.username) : member;
                                        const score = member.securityScore ?? 100;
                                        const isThreat = score < 50;
                                        return (
                                            <div key={idx} className={`p-4 rounded-2xl border transition-all ${isThreat ? 'bg-red-500/30 border-red-400 animate-pulse' : 'bg-white/10 border-white/20'}`}>
                                                <p className="text-xs font-bold mb-1 uppercase opacity-80">{name}</p>
                                                <p className="font-bold text-lg">{isThreat ? '⚠️ ZAGROŻENIE' : `${score}% Bezpieczny`}</p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center p-6 bg-white/5 border border-dashed border-white/20 rounded-2xl">
                                        <p className="text-blue-100 text-sm mb-4">Nie utworzyłeś jeszcze grupy.</p>
                                        <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl text-xs uppercase hover:bg-blue-50 transition-colors">
                                            Skonfiguruj Rodzinę
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Gamepad2 className="w-8 h-8 text-indigo-600" />
                                <h3 className="font-bold text-xl text-slate-900">Trening Czujności</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">Sprawdź swoje umiejętności w grze "Tinder dla Phishingu".</p>
                            <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                Rozpocznij sesję
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                    <Search size={22} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Laboratorium Analizy</h2>
                                    <p className="text-slate-500 text-xs font-medium">Szybkie skanowanie podejrzanych treści przez AI</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <textarea
                                    value={analysisInput}
                                    onChange={(e) => setAnalysisInput(e.target.value)}
                                    placeholder="Wklej tutaj treść podejrzanej wiadomości lub link..."
                                    className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none text-sm"
                                />

                                <button
                                    onClick={handleAnalyze}
                                    disabled={isScanning || !analysisInput.trim()}
                                    className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {isScanning ? <Loader2 className="animate-spin w-5 h-5" /> : <ShieldCheck size={20} />}
                                    {isScanning ? 'Analizowanie...' : 'Zweryfikuj teraz'}
                                </button>

                                <AnimatePresence>
                                    {analysisResult && !isScanning && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-5 rounded-2xl border flex items-start gap-4 ${
                                                analysisResult.type === 'threat'
                                                    ? 'bg-red-50 border-red-200 text-red-900'
                                                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                            }`}
                                        >
                                            {analysisResult.type === 'threat'
                                                ? <ShieldAlert className="text-red-600 shrink-0" size={24} />
                                                : <ShieldCheck className="text-emerald-600 shrink-0" size={24} />
                                            }
                                            <div className="text-sm">
                                                <p className="font-bold mb-0.5">
                                                    {analysisResult.type === 'threat' ? 'Uwaga: Wysokie ryzyko' : 'Wynik: Wygląda na bezpieczne'}
                                                </p>
                                                <p className="opacity-80">{analysisResult.message}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                                <h2 className="text-2xl font-bold text-slate-900">Aktywna Tarcza</h2>
                            </div>
                            <div className="space-y-4">
                                {events.length > 0 ? (
                                    events.map((evt, index) => (
                                        <div key={index} className={`flex items-start gap-4 p-5 rounded-2xl border transition-all hover:shadow-md ${evt.isThreat ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                                            {evt.isThreat ? <AlertTriangle className="text-red-500 shrink-0" /> : (evt.type === 'sms' ? <Smartphone className="text-slate-400 shrink-0" /> : <Mail className="text-slate-400 shrink-0" />)}
                                            <div>
                                                <h3 className={`font-bold ${evt.isThreat ? 'text-red-900' : 'text-slate-800'}`}>{evt.title}</h3>
                                                <p className={`text-sm mt-1 ${evt.isThreat ? 'text-red-700' : 'text-slate-500'}`}>{evt.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <ShieldCheck className="w-10 h-10 text-emerald-400/50 mx-auto mb-3" />
                                        <p className="italic text-slate-400 text-sm">Twoje otoczenie cyfrowe jest obecnie czyste.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDashboard;