import React from 'react';
import { ShieldCheck, AlertTriangle, Smartphone, Mail } from 'lucide-react';

const ActiveShield = ({ events }) => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Aktywna Tarcza</h2>
        </div>
        <div className="space-y-4">
            {events.length > 0 ? events.map((evt, index) => (
                <div key={index} className={`flex items-start gap-4 p-5 rounded-2xl border ${evt.isThreat ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                    {evt.isThreat ? <AlertTriangle className="text-red-500" /> : (evt.type === 'sms' ? <Smartphone className="text-slate-400" /> : <Mail className="text-slate-400" />)}
                    <div>
                        <h3 className={`font-bold ${evt.isThreat ? 'text-red-900' : 'text-slate-800'}`}>{evt.title}</h3>
                        <p className="text-sm mt-1 text-slate-500">{evt.description}</p>
                    </div>
                </div>
            )) : <div className="text-center py-12 italic text-slate-400">Brak zarejestrowanych incydentów.</div>}
        </div>
    </div>
);

export default ActiveShield;