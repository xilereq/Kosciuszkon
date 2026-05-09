import React, { useState, useRef, useEffect } from 'react';
import { X, Send, AlertTriangle, Loader2, ShieldAlert } from 'lucide-react';
import { ChatbotService } from '../../../services';

const ChatbotModal = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Witaj. Jestem Twoim asystentem bezpieczeństwa. Został wciśnięty przycisk paniki. Opisz krótko, co się stało (np. "Podałem dane do konta na fałszywej stronie"), a powiem Ci, co krok po kroku musisz zrobić.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const quickReplies = [
        "Podałem dane na fałszywej stronie banku",
        "Otworzyłem załącznik z podejrzanego maila",
        "Dostałem dziwnego SMS-a o dopłacie do paczki"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (textToSend = input) => {
        if (!textToSend.trim()) return;

        const userMessage = { role: 'user', content: textToSend };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);

        if (textToSend === input) setInput('');
        setIsLoading(true);

        try {
            const data = await ChatbotService.sendMessage(updatedMessages);
            setMessages([...updatedMessages, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            setMessages([...updatedMessages, { role: 'assistant', content: 'Wystąpił błąd połączenia z serwerem. Jeśli jesteś w niebezpieczeństwie finansowym, natychmiast skontaktuj się ze swoim bankiem!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl bg-slate-900/95 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-[0_0_100px_-20px_rgba(239,68,68,0.3)] border border-red-500/20 flex flex-col h-[650px] max-h-[90vh] overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-red-950/50 to-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-900/20 p-2 rounded-full">
                            <AlertTriangle className="text-red-400 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-red-400">Tryb Paniki</h2>
                            <p className="text-sm text-red-300 font-medium">Asystent Reagowania na Incydenty</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' ? (
                                <div className="max-w-[80%] p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 shadow-sm whitespace-pre-wrap flex items-start gap-3">
                                    <div className="pt-1">
                                        <ShieldAlert className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            ) : (
                                <div className="max-w-[80%] p-4 rounded-2xl bg-purple-600 text-white border border-purple-500 shadow-lg shadow-purple-900/50 whitespace-pre-wrap">
                                    {msg.content}
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-red-400" />
                                <span className="text-slate-400 text-sm">AI analizuje sytuację...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="bg-slate-900/50 border-t border-white/10 p-4">

                    {messages.length === 1 && !isLoading && (
                        <div className="px-4 pt-4 flex flex-wrap gap-2">
                            {quickReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(reply)}
                                    className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-2 rounded-full hover:bg-purple-100 transition-colors text-left"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="p-2">
                        <div className="flex items-center gap-2 bg-transparent p-2 rounded-2xl transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Napisz, co się stało..."
                                className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-xl focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 outline-none placeholder-slate-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                className="bg-red-600/80 text-white p-3 rounded-xl hover:bg-red-500 border border-red-500 transition-all disabled:opacity-50"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotModal;

