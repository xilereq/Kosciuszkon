import React from 'react';
import { ShieldCheck, AlertTriangle, Smartphone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ActiveShield = ({ events }) => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">Aktywna Tarcza</h2>
        </div>
        <div className="divide-y border-b border-slate-100 last:border-0 max-h-[360px] overflow-y-auto">
            {events.length > 0 ? events.map((evt, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0`}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${evt.isThreat ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                        {evt.isThreat ? <AlertTriangle className="w-4 h-4" /> : (evt.type === 'sms' ? <Smartphone className="w-4 h-4" /> : <Mail className="w-4 h-4" />)}
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold ${evt.isThreat ? 'text-red-900' : 'text-slate-800'}`}>{evt.title || evt.type}</h3>
                        <p className="text-sm mt-1 text-slate-500">{evt.description || evt.desc || 'Szczegóły zdarzenia.'}</p>
                    </div>
                    <div className="text-xs text-slate-400">{evt.date}</div>
                </motion.div>
            )) : <div className="text-center py-12 italic text-slate-400">Brak zarejestrowanych incydentów.</div>}
        </div>
    </div>
);

export default ActiveShield;