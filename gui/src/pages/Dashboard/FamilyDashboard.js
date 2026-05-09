import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Shield,
    MessageSquare,
    Target,
    UserCircle,
    X,
    History,
    Smartphone,
    Mail,
    AlertTriangle,
    ChevronRight
} from 'lucide-react';
import FamilyService from '../../services/FamilyService';

const FamilyDashboard = () => {
    // Podstawowe stany
    const [familyName, setFamilyName] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [family, setFamily] = useState(null);
    const [stats, setStats] = useState({ goals: 0, messages: 0, premium: false });

    // Nowe stany dla raportu członka rodziny
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberEvents, setMemberEvents] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await FamilyService.getFamily();
                if (mounted && data) {
                    setFamily(data);
                    setStats({
                        goals: data.goals_count || 0,
                        messages: data.messages_count || 0,
                        premium: !!data.premium
                    });
                }
            } catch (err) {
                if (mounted) setFamily(null);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    // Funkcja otwierająca szczegółowy raport
    const openMemberReport = async (member) => {
        setSelectedMember(member);
        setIsModalLoading(true);
        try {
            // Próba pobrania danych z rozszerzonego FamilyService
            // W przypadku braku backendu, zwracamy dane testowe
            const events = await FamilyService.getMemberEvents(member.id || 1);
            setMemberEvents(events);
        } catch (err) {
            // Mock danych dla celów demonstracyjnych
            setMemberEvents([
                { id: 1, type: 'sms', date: '2024-05-20', desc: 'Zablokowano fałszywy link do dopłaty za paczkę', isThreat: true },
                { id: 2, type: 'mail', date: '2024-05-19', desc: 'Próba wyłudzenia danych logowania do banku', isThreat: true },
                { id: 3, type: 'sms', date: '2024-05-18', desc: 'Podejrzana wiadomość o wygranej w konkursie', isThreat: true },
                { id: 4, type: 'mail', date: '2024-05-17', desc: 'Wykryto złośliwy załącznik "Faktura.zip"', isThreat: true },
                { id: 5, type: 'sms', date: '2024-05-16', desc: 'Zablokowano prośbę o kod BLIK od nieznanego numeru', isThreat: true }
            ]);
        } finally {
            setIsModalLoading(false);
        }
    };

    const handleCreateFamily = async (e) => {
        e.preventDefault();
        if (!familyName || !userName) {
            setStatus({ type: 'error', message: 'Wypełnij obie nazwy!' });
            return;
        }
        setLoading(true);
        try {
            await FamilyService.createFamily(familyName, userName);
            setStatus({ type: 'success', message: `Rodzina "${familyName}" utworzona!` });
            const data = await FamilyService.getFamily();
            setFamily(data);
        } catch (err) {
            setStatus({ type: 'error', message: 'Błąd podczas tworzenia rodziny' });
        } finally {
            setLoading(false);
        }
    };

    const handleJoinFamily = async (e) => {
        e.preventDefault();
        if (!familyName || !userName) {
            setStatus({ type: 'error', message: 'Wypełnij obie nazwy!' });
            return;
        }
        setLoading(true);
        try {
            await FamilyService.joinFamily(familyName, userName);
            setStatus({ type: 'success', message: `Dołączono do rodziny!` });
            const data = await FamilyService.getFamily();
            setFamily(data);
        } catch (err) {
            setStatus({ type: 'error', message: 'Błąd podczas dołączania' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Family<span className="text-blue-600">Umbrella</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Panel zarządzania grupą</p>
                    </div>
                </header>

                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Formularz */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Users className="text-blue-600" /> Dołącz lub Stwórz
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                    placeholder="Nazwa rodziny"
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 pl-12"
                                />
                                <Shield className="absolute left-4 top-4 text-slate-400" size={20} />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Twoja nazwa"
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 pl-12"
                                />
                                <UserCircle className="absolute left-4 top-4 text-slate-400" size={20} />
                            </div>
                            <div className="flex gap-3">
                                <button onClick={handleCreateFamily} disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all">Utwórz</button>
                                <button onClick={handleJoinFamily} disabled={loading} className="flex-1 bg-white border-2 border-slate-100 font-bold py-4 rounded-2xl hover:border-blue-100 transition-all">Dołącz</button>
                            </div>
                            {status.message && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {status.message}
                                </div>
                            )}
                        </div>

                        {/* Lista członków rodziny z interakcją */}
                        <div className="bg-slate-50 rounded-[24px] p-6 flex flex-col items-center border border-dashed border-slate-200">
                            <h3 className="font-bold text-slate-800 text-xl mb-6">
                                {family ? `Grupa: ${family.family_name || family.name}` : 'Brak grupy'}
                            </h3>

                            {family ? (
                                <div className="w-full flex flex-col gap-3">
                                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2 text-center">Ochrona członków</p>
                                    {Array.isArray(family.members) && family.members.map((member, index) => {
                                        const name = typeof member === 'object' ? (member.name || member.username) : member;
                                        const securityScore = typeof member === 'object' && member.securityScore !== undefined ? member.securityScore : 100;

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => openMemberReport(member)}
                                                className="flex items-center justify-between w-full p-4 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all hover:border-blue-300 hover:shadow-md group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                                                        <UserCircle size={28} className="text-blue-600" />
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="font-bold text-slate-800 text-lg block leading-none mb-1.5">{name}</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <Shield size={14} className={securityScore < 90 ? "text-amber-500" : "text-emerald-500"} />
                                                            <span className="text-sm font-medium text-slate-500">Bezpieczeństwo: {securityScore}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 text-center">Podaj nazwy po lewej stronie, aby stworzyć lub dołączyć do grupy.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statystyki */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Target size={20} /></div>
                            <span className="font-bold text-slate-700">Aktywne Cele</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{stats.goals}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MessageSquare size={20} /></div>
                            <span className="font-bold text-slate-700">Wiadomości</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{stats.messages}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg">
                        <h3 className="font-bold mb-2">Premium Status</h3>
                        <p className="text-blue-100 text-sm mb-4">{stats.premium ? 'Plan Plus Aktywny' : 'Plan Darmowy'}</p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors text-sm">Sprawdź Plus</button>
                    </div>
                </div>
            </div>

            {/* Modal: Szczegóły Zagrożeń (Framer Motion) */}
            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-black text-slate-900">Raport Bezpieczeństwa</h2>
                                    <button onClick={() => setSelectedMember(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl mb-6 border border-blue-100">
                                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                                        {(selectedMember.name || selectedMember.username || 'U').slice(0,1).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{selectedMember.name || selectedMember.username}</div>
                                        <div className="text-sm text-slate-500 flex items-center gap-1">
                                            <History size={14} /> Ostatnie 5 incydentów
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {isModalLoading ? (
                                        <div className="py-10 text-center text-slate-400">Ładowanie historii...</div>
                                    ) : memberEvents.length > 0 ? (
                                        memberEvents.map((evt) => (
                                            <div key={evt.id} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-red-100 transition-colors">
                                                <div className={`p-2 rounded-lg shrink-0 ${evt.type === 'sms' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {evt.type === 'sms' ? <Smartphone size={20} /> : <Mail size={20} />}
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{evt.date}</span>
                                                        <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">ZABLOKOWANO</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700 font-semibold leading-snug">{evt.desc}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-slate-500 italic">Brak zarejestrowanych zagrożeń.</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
                                >
                                    Zamknij raport
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FamilyDashboard;