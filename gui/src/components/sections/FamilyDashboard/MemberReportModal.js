import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Smartphone, Mail, Clock, ShieldAlert, MapPin, AlertOctagon } from 'lucide-react';

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

                    <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl mb-6">
                        <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-md shadow-purple-200">{(member.name || 'U').slice(0,1)}</div>
                        <div>
                            <div className="font-bold">{member.name || member.username}</div>
                            <div className="text-sm text-slate-500 flex items-center gap-1"><History size={14} /> Ostatnie incydenty</div>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
                        {isLoading ? (
                            <div className="text-center py-10">Ładowanie...</div>
                        ) : (
                            events.length > 0 ? events.map(evt => (
                                <div key={evt.id} className="relative">
                                    {/* Akcent powagi */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-l-2xl" />

                                    <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ml-3">
                                        {/* Nagłówek karty */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${evt.type === 'sms' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'}`}>
                                                    {evt.type === 'sms' ? <Smartphone size={20} /> : <Mail size={20} />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800">{evt.title || 'Zdarzenie'}</div>
                                                    <div className="text-xs text-slate-400">{evt.type?.toUpperCase()}</div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest">ZABLOKOWANO</span>
                                            </div>
                                        </div>

                                        {/* Siatka metadanych */}
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-2">
                                            <div className="flex items-center gap-2"><Clock size={14} /> <span>{evt.date}{evt.time ? ` • ${evt.time}` : ''}</span></div>
                                            <div className="flex items-center gap-2"><MapPin size={14} /> <span>{evt.source || 'Brak danych'}</span></div>
                                            <div className="flex items-center gap-2"><ShieldAlert size={14} /> <span>{evt.threatType || 'Nieznany typ zagrożenia'}</span></div>
                                            <div className="flex items-center gap-2 text-right text-xs text-slate-400"><AlertOctagon size={14} /> <span>{evt.severity || ''}</span></div>
                                        </div>

                                        {/* Sekcja Opisu */}
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-medium text-slate-700 flex items-start gap-2">
                                            <AlertOctagon className="text-red-500 mt-1" size={18} />
                                            <div>{evt.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10 text-slate-500">Brak incydentów do wyświetlenia.</div>
                            )
                        )}
                    </div>

                    <button onClick={onClose} className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl">Zamknij</button>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default MemberReportModal;

