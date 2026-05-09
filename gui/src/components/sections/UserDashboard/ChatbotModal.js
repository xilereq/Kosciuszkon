import React, { useState, useRef, useEffect } from 'react';
import { X, Send, AlertTriangle, Loader2 } from 'lucide-react';
import { ChatbotService } from '../../../services';

const ChatbotModal = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Witaj. Jestem Twoim asystentem bezpieczeństwa. Został wciśnięty przycisk paniki. Opisz krótko, co się stało (np. "Podałem dane do konta na fałszywej stronie"), a powiem Ci, co krok po kroku musisz zrobić.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Przykładowe wiadomości (szybkie podpowiedzi)
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

        // Czyścimy input tylko, jeśli wysyłamy tekst z pola input
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
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-red-50 rounded-t-[32px]">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle className="text-red-600 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-900">Tryb Paniki</h2>
                            <p className="text-sm text-red-600 font-medium">Asystent Reagowania na Incydenty</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${
                                msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm whitespace-pre-wrap'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                <span className="text-slate-500 text-sm">AI analizuje sytuację...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area + Quick Replies */}
                <div className="bg-white border-t border-slate-100 rounded-b-[32px] flex flex-col">

                    {/* Sekcja szybkich podpowiedzi pokazana TYLKO gdy jest 1 wiadomość (powitanie) */}
                    {messages.length === 1 && !isLoading && (
                        <div className="px-4 pt-4 flex flex-wrap gap-2">
                            {quickReplies.map((reply, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(reply)}
                                    className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-full hover:bg-blue-100 transition-colors text-left"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="p-4">
                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Napisz, co się stało..."
                                className="flex-1 bg-transparent border-none outline-none px-4 text-slate-700"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
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