import React, { useState } from 'react';
import { Siren } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

const SecurityHeader = () => {
    const [isPanicChatOpen, setIsPanicChatOpen] = useState(false);

    return (
        <>
            <div className="py-6 flex justify-between items-end border-b border-slate-200/60 mb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Panel Bezpieczeństwa</h1>
                    <p className="text-slate-500 font-medium">Zarządzaj ochroną swoją i swoich bliskich.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                        <button
                            onClick={() => setIsPanicChatOpen(true)}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold border border-red-200 hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-red-200"
                        >
                            <Siren className="w-5 h-5 animate-pulse" /> Przycisk Paniki
                        </button>
                        <p className="text-sm text-slate-400 mt-2">Chatbot, który może pomóc w sytuacji kryzysowej.</p>
                    </div>
                </div>
            </div>

            {isPanicChatOpen && (
                <ChatbotModal onClose={() => setIsPanicChatOpen(false)} />
            )}
        </>
    );
};

export default SecurityHeader;