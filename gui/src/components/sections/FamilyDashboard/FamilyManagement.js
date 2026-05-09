import React, { useState } from 'react';
import { Users, Shield, UserCircle } from 'lucide-react';
import FamilyService from '../../../services/FamilyService';

const FamilyManagement = ({ onRefresh }) => {
    const [familyName, setFamilyName] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleAction = async (type) => {
        if (!familyName || !userName) return setStatus({ type: 'error', message: 'Wypełnij pola!' });
        setLoading(true);
        try {
            type === 'create'
                ? await FamilyService.createFamily(familyName, userName)
                : await FamilyService.joinFamily(familyName, userName);
            setStatus({ type: 'success', message: 'Gotowe!' });
            onRefresh();
        } catch { setStatus({ type: 'error', message: 'Błąd!' }); }
        finally { setLoading(false); }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Users className="text-purple-600" /> Grupa</h2>
            <div className="relative">
                <input value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder="Nazwa rodziny" className="w-full p-4 pl-12 bg-white/50 border border-purple-100 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 backdrop-blur-sm transition-all rounded-2xl outline-none" />
                <Shield className="absolute left-4 top-4 text-purple-400" size={20} />
            </div>
            <div className="relative">
                <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Twoja nazwa" className="w-full p-4 pl-12 bg-white/50 border border-purple-100 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 backdrop-blur-sm transition-all rounded-2xl outline-none" />
                <UserCircle className="absolute left-4 top-4 text-purple-400" size={20} />
            </div>
            <div className="flex gap-3">
                <button onClick={() => handleAction('create')} disabled={loading} className="flex-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all font-bold py-4 rounded-2xl">Utwórz</button>
                <button onClick={() => handleAction('join')} disabled={loading} className="flex-1 bg-white border-2 border-slate-100 font-bold py-4 rounded-2xl">Dołącz</button>
            </div>
            {status.message && <div className={`p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{status.message}</div>}
        </div>
    );
};

export default FamilyManagement;