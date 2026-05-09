import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Smartphone, Mail } from 'lucide-react';

const MemberReportModal = ({ member, events, isLoading, onClose }) => (
    <AnimatePresence>
        {member && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-slate-900">Raport Bezpieczeństwa</h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl mb-6">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">{(member.name || 'U').slice(0,1)}</div>
                        <div><div className="font-bold">{member.name || member.username}</div><div className="text-sm text-slate-500 flex items-center gap-1"><History size={14} /> Ostatnie incydenty</div></div>
                    </div>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {isLoading ? <div className="text-center py-10">Ładowanie...</div> : events.map(evt => (
                            <div key={evt.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className={`p-2 rounded-lg ${evt.type === 'sms' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {evt.type === 'sms' ? <Smartphone size={20} /> : <Mail size={20} />}
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1"><span>{evt.date}</span><span className="text-red-600">ZABLOKOWANO</span></div>
                                    <p className="text-sm font-semibold">{evt.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={onClose} className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl">Zamknij</button>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default MemberReportModal;