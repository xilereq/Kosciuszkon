import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Smartphone, Mail, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationService from '../../../services/NotificationService';

const ActiveShield = ({ events = [], onDelete, canDelete = false }) => {
    const [localEvents, setLocalEvents] = useState(events || []);
    const [isDeletingId, setIsDeletingId] = useState(null);

    useEffect(() => {
        setLocalEvents(events || []);
    }, [events]);

    const handleDelete = async (id) => {
        if (!id) {
            console.warn('handleDelete: brak id, nie można usunąć powiadomienia', id);
            alert('Brak identyfikatora powiadomienia — nie można usunąć.');
            return;
        }

        const confirmed = window.confirm('Czy na pewno chcesz usunąć to powiadomienie?');
        if (!confirmed) return;

        try {
            setIsDeletingId(id);
            await NotificationService.deleteNotification(id);

            setLocalEvents((prev) => prev.filter((e) => (e.id ?? e._id ?? e.notification_id ?? e.notificationId) !== id));

            if (typeof onDelete === 'function') onDelete(id);
        } catch (error) {
            console.error('Błąd podczas usuwania powiadomienia:', error);
            alert('Nie udało się usunąć powiadomienia. Spróbuj ponownie.');
        } finally {
            setIsDeletingId(null);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-slate-900">Aktywna Tarcza</h2>
            </div>
            <div className="divide-y border-b border-slate-100 last:border-0 max-h-[360px] overflow-y-auto">
                {localEvents.length > 0 ? localEvents.map((evt, index) => {

                    let iconBgColor = 'bg-slate-100 text-slate-600';
                    let titleColor = 'text-slate-800';
                    let Icon = evt.type === 'sms' ? Smartphone : Mail;

                    if (evt.isThreat) {
                        const isHighRisk = evt.probability > 0.8 || evt.probability > 80;

                        if (isHighRisk) {
                            iconBgColor = 'bg-red-100 text-red-600';
                            titleColor = 'text-red-900';
                            Icon = AlertTriangle;
                        } else {
                            iconBgColor = 'bg-yellow-100 text-yellow-600';
                            titleColor = 'text-yellow-900';
                            Icon = AlertCircle;
                        }
                    }

                    // Spróbuj różnych pól identyfikatora — zabezpieczenie przed undefined
                    const itemId = evt.id ?? evt._id ?? evt.notification_id ?? evt.notificationId;

                    return (
                        <motion.div
                            key={itemId ?? index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className={`flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <h3 className={`font-bold ${titleColor}`}>{evt.title || evt.type}</h3>
                                <p className="text-sm mt-1 text-slate-500">{evt.description || evt.desc || 'Szczegóły zdarzenia.'}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-xs text-slate-400 mr-2">{evt.date}</div>

                                {canDelete && (
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(itemId)}
                                        disabled={isDeletingId === itemId}
                                        className={`flex items-center gap-2 text-red-600 hover:text-red-800 px-2 py-1 rounded ${isDeletingId === itemId ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        aria-label="Usuń powiadomienie"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">{isDeletingId === itemId ? 'Usuwanie...' : 'Usuń'}</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                }) : <div className="text-center py-12 italic text-slate-400">Brak zarejestrowanych incydentów.</div>}
            </div>
        </div>
    );
};

export default ActiveShield;

