import React from 'react';
import { Target, MessageSquare } from 'lucide-react';

const FamilyStats = ({ stats }) => (
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
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm">Sprawdź Plus</button>
        </div>
    </div>
);

export default FamilyStats;