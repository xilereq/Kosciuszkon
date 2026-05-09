import React, { useState } from 'react';
import { Siren } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

const SecurityHeader = () => {
    const [isPanicChatOpen, setIsPanicChatOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Panel Bezpieczeństwa</h1>
                    <p className="text-slate-500 font-medium">Zarządzaj ochroną swoją i swoich bliskich.</p>
                </div>
                <button
                    onClick={() => setIsPanicChatOpen(true)}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold border border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-red-200"
                >
                    <Siren className="w-5 h-5 animate-pulse" /> Przycisk Paniki
                </button>
            </div>

            {isPanicChatOpen && (
                <ChatbotModal onClose={() => setIsPanicChatOpen(false)} />
            )}
        </>
    );
};

export default SecurityHeader;