import React, { useState, useRef } from 'react';
import { Gamepad2, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TrainingService from '../../../services/TrainingService';

const AwarenessTrainingCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragKey, setDragKey] = useState(0);
    const [isSwipingOut, setIsSwipingOut] = useState(false);
    const [swipeX, setSwipeX] = useState(0);
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

    const statsRef = useRef({
        correct: 0,
        total: 0,
    });

    const handleDragEnd = async (event, info) => {
        if (!currentMessage || isSubmitting || isSwipingOut) return;
        const offsetX = info.offset.x;
        const threshold = 120;

        if (offsetX > threshold) {
            setSwipeX(500);
            setIsSwipingOut(true);
            setIsAwaitingResponse(true);
            await new Promise((res) => setTimeout(res, 260));
            await handleSwipe('safe');
            setIsAwaitingResponse(false);
            setDragKey((k) => k + 1);
        } else if (offsetX < -threshold) {
            setSwipeX(-500);
            setIsSwipingOut(true);
            setIsAwaitingResponse(true);
            await new Promise((res) => setTimeout(res, 260));
            await handleSwipe('spam');
            setIsAwaitingResponse(false);
            setDragKey((k) => k + 1);
        } else {
        }
    };

    const startSession = async () => {
        setIsPlaying(true);
        statsRef.current = { correct: 0, total: 0 };
        await loadRandomMessage();
    };

    const loadRandomMessage = async () => {
        setIsLoading(true);
        setShowFeedback(false);
        setFeedback(null);
        try {
            const message = await TrainingService.getRandomMessage();
            setCurrentMessage(message);
        } catch (error) {
            console.error('Błąd podczas pobierania wiadomości:', error);
            setFeedback({
                isCorrect: false,
                message: 'Nie udało się pobrać wiadomości. Spróbuj ponownie.',
            });
            setShowFeedback(true);
        } finally {
            setIsSwipingOut(false);
            setSwipeX(0);
            setIsLoading(false);
        }
    };

    const handleSwipe = async (guess) => {
        if (!currentMessage || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const result = await TrainingService.submitSwipe(currentMessage.message_id, guess);
            const isCorrect = result.is_correct;

            statsRef.current.total += 1;
            if (isCorrect) {
                statsRef.current.correct += 1;
            }

            setFeedback({
                isCorrect,
                message: isCorrect ? 'Poprawnie' : 'Niedobrze... ',
                explanation: result.explanation || '',
                trueLabel: result.true_label,
            });
            setShowFeedback(true);
        } catch (error) {
            console.error('Błąd podczas wysyłania oceny:', error);
            setFeedback({
                isCorrect: false,
                message: 'Błąd podczas wysyłania odpowiedzi.',
            });
            setShowFeedback(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeFeedbackAndContinue = async () => {
        await loadRandomMessage();
    };

    const endSession = () => {
        setIsPlaying(false);
        setCurrentMessage(null);
        setFeedback(null);
        setShowFeedback(false);
        statsRef.current = { correct: 0, total: 0 };
        // ensure swipe state reset on end
        setIsSwipingOut(false);
        setSwipeX(0);
    };

    if (!isPlaying) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-purple-900/20"
            >
                <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <Gamepad2 className="w-8 h-8 text-purple-300" />
                    <h3 className="font-bold text-xl text-white">Trening Czujności</h3>
                </div>
                <p className="text-sm text-purple-200 mb-6 relative z-10">
                    Sprawdź swoje umiejętności w grze "Tinder dla Phishingu".
                </p>
                <button
                    onClick={startSession}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl relative z-10 hover:scale-[1.02] transition-transform shadow-lg"
                >
                    Rozpocznij sesję
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-purple-900/20 min-h-[500px] flex flex-col"
        >
            <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-purple-300" />
                    <h3 className="font-bold text-xl text-white">Trening Czujności</h3>
                </div>
                <button
                    onClick={endSession}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Zakończ grę"
                >
                    <X className="w-5 h-5 text-purple-300" />
                </button>
            </div>

            {statsRef.current.total > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-4 bg-slate-800/50 rounded-lg relative z-10"
                >
                    <p className="text-sm text-purple-200">
                        Wynik: <span className="font-bold text-white">{statsRef.current.correct}/{statsRef.current.total}</span>
                    </p>
                </motion.div>
            )}

            <div className="flex-1 flex flex-col justify-center relative z-10">
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center gap-4"
                    >
                        <Loader className="w-12 h-12 text-purple-400 animate-spin" />
                        <p className="text-purple-200">Ładowanie wiadomości...</p>
                    </motion.div>
                ) : currentMessage && !showFeedback ? (
                    <motion.div
                        key={`${currentMessage.message_id}-${dragKey}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={isSwipingOut ? { x: swipeX, opacity: 0, transition: { duration: 0.25 } } : { opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        drag={isSwipingOut ? false : "x"}
                        dragElastic={0.3}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.02 }}
                        className={`space-y-6 ${isSwipingOut ? 'pointer-events-none' : 'cursor-grab'}`}
                    >
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                            <p className="text-sm text-purple-200 mb-4 font-semibold">
                                Typ: <span className="text-purple-100">{currentMessage.type === 'email' ? '📧 Email' : '📱 SMS'}</span>
                            </p>
                            <p className="text-base text-white leading-relaxed break-words">
                                {currentMessage.text}
                            </p>
                        </div>

                        <div className="flex items-center justify-center">
                            <p className="text-sm text-slate-400">Przesuń w lewo — Spam; w prawo — Bezpieczne.</p>
                        </div>

                        {/* Optional fallback buttons for keyboard/accessibility - visually subtle */}
                        <div className="grid grid-cols-2 gap-4 opacity-0 pointer-events-none">
                            <button onClick={() => handleSwipe('spam')} className="py-2 px-4">Spam</button>
                            <button onClick={() => handleSwipe('safe')} className="py-2 px-4">Safe</button>
                        </div>
                    </motion.div>
                ) : null}

                <AnimatePresence>
                    {/* Overlay shown while waiting for server response after swipe */}
                    {isAwaitingResponse && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 flex items-center justify-center p-4 z-50"
                        >
                            <motion.div className="absolute inset-0 bg-black/40" />
                            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full z-10 flex flex-col items-center gap-4">
                                <Loader className="w-10 h-10 text-purple-400 animate-spin" />
                                <p className="text-sm text-purple-200">Oczekiwanie na odpowiedź...</p>
                            </div>
                        </motion.div>
                    )}
                     {showFeedback && feedback && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 flex items-center justify-center p-4 z-50"
                            onClick={closeFeedbackAndContinue}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/50"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full relative z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col items-center text-center">
                                    {feedback.isCorrect ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mb-4"
                                        >
                                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mb-4"
                                        >
                                            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                                        </motion.div>
                                    )}

                                    <h4 className={`text-2xl font-bold mb-4 ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                        {feedback.message}
                                    </h4>

                                    {!feedback.isCorrect && feedback.trueLabel && (
                                        <div className="mb-4 p-3 bg-slate-800/50 rounded-lg w-full">
                                            <p className="text-xs text-purple-300 mb-1">Prawdziwa etykieta:</p>
                                            <p className="text-sm font-semibold text-yellow-300">
                                                {feedback.trueLabel === 'spam' ? '🚨 SPAM' : '✅ BEZPIECZNE'}
                                            </p>
                                        </div>
                                    )}

                                    {feedback.explanation && (
                                        <p className="text-sm text-purple-200 mb-6">
                                            {feedback.explanation}
                                        </p>
                                    )}

                                    <button
                                        onClick={closeFeedbackAndContinue}
                                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform"
                                    >
                                        Następna wiadomość
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-purple-200 font-semibold rounded-xl transition-colors relative z-10"
                onClick={endSession}
            >
                Zakończ grę
            </motion.button>
        </motion.div>
    );
};

export default AwarenessTrainingCard;
