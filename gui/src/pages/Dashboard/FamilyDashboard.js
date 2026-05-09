import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Shield, Settings, MessageSquare, Target } from 'lucide-react';
import  { FamilyService } from '../../services';

const FamilyDashboard = () => {
    const [familyName, setFamilyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [family, setFamily] = useState(null);
    const [stats, setStats] = useState({ goals: 0, messages: 0, premium: false });

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await FamilyService.getFamily();
                if (!mounted) return;
                if (data) {
                    setFamily(data);
                    setStats({
                        goals: data.goals_count || 0,
                        messages: data.messages_count || 0,
                        premium: !!data.premium
                    });
                } else {
                    setFamily(null);
                }
            } catch (err) {
                setFamily(null);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const handleCreateFamily = async (e) => {
        e.preventDefault();
        if (!familyName) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await FamilyService.createFamily(familyName);
            setStatus({ type: 'success', message: `Rodzina "${familyName}" została utworzona!` });
            setFamilyName('');
            const data = await FamilyService.getFamily();
            setFamily(data);
        } catch (err) {
            const errorMsg = err.response?.data?.description || 'Błąd podczas tworzenia rodziny';
            setStatus({ type: 'error', message: typeof errorMsg === 'string' ? errorMsg : 'Błąd walidacji' });
        } finally {
            setLoading(false);
        }
    };

    const handleJoinFamily = async (e) => {
        e.preventDefault();
        if (!familyName) return;

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await FamilyService.joinFamily(familyName);
            setStatus({ type: 'success', message: `Dołączono do rodziny "${familyName}"!` });
            setFamilyName('');
            const data = await FamilyService.getFamily();
            setFamily(data);
        } catch (err) {
            const errorMsg = err.response?.data?.description || 'Błąd podczas dołączania do rodziny';
            setStatus({ type: 'error', message: typeof errorMsg === 'string' ? errorMsg : 'Nie znaleziono rodziny' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Family<span className="text-blue-600">Umbrella</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Panel zarządzania grupą</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2.5 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                            <Settings size={20} />
                        </button>
                        <div className="h-10 w-10 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-700 font-bold shadow-lg">
                            {family ? (family.display_initials || (family.name || '').slice(0,2).toUpperCase()) : ''}
                        </div>
                    </div>
                </header>

                {/* Sekcja Zarządzania Rodziną (API Connect) */}
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Users size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Twoja Rodzina</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-slate-600 mb-4">Wpisz nazwę rodziny, aby stworzyć nową grupę lub dołączyć do istniejącej.</p>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                    placeholder="Nazwa rodziny..."
                                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-700"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCreateFamily}
                                        disabled={loading || !familyName}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                                    >
                                        <Shield size={18} /> Utwórz
                                    </button>
                                    <button
                                        onClick={handleJoinFamily}
                                        disabled={loading || !familyName}
                                        className="flex-1 bg-white border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50 disabled:opacity-50 text-slate-700 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <UserPlus size={18} /> Dołącz
                                    </button>
                                </div>
                            </div>

                            {status.message && (
                                <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${
                                    status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                }`}>
                                    {status.message}
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50 rounded-[24px] p-6 flex flex-col justify-center items-center text-center border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <Target className="text-slate-300" size={32} />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-1">{family ? 'Aktywna grupa' : 'Brak aktywnej grupy'}</h3>
                            <p className="text-sm text-slate-500">{family ? (family.description || 'Zacznij zarządzać zadaniami.') : 'Stwórz rodzinę, aby zacząć zbierać punkty i zarządzać zadaniami.'}</p>
                        </div>
                    </div>
                </div>

                {/* Statystyki / Placeholdery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Target size={20} />
                            </div>
                            <span className="font-bold text-slate-700">Aktywne Cele</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{stats.goals}</div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <MessageSquare size={20} />
                            </div>
                            <span className="font-bold text-slate-700">Wiadomości</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{stats.messages}</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-100">
                        <h3 className="font-bold mb-2">Premium Status</h3>
                        <p className="text-blue-100 text-sm mb-4">{stats.premium ? 'Twoja rodzina ma abonament Plus.' : 'Twoja rodzina korzysta z darmowego planu.'}</p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors text-sm">
                            Sprawdź Plus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyDashboard;