import React from 'react';
import { CheckCircle2, Zap, X } from 'lucide-react';

const Gamification = () => {
    return (
        <section id="edu" className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative flex justify-center">
                    <div className="w-72 h-[550px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="p-6 text-white pt-12">
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold">Twoja Kondycja</span>
                                <span className="text-emerald-400 font-bold">100%</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-center">
                                </div>
                                <div className="bg-blue-600 p-4 rounded-2xl">
                                    <div className="text-sm font-bold mb-2">Gra: Tinder dla Phishingu</div>
                                    <div className="h-32 bg-white/10 rounded-xl flex items-center justify-center text-4xl">
                                        ✉️?
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <X className="text-red-400" />
                                        <CheckCircle2 className="text-emerald-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <h2 className="text-4xl font-bold mb-8 italic">"Ucz się nawykowo. Utrzymaj 100% Cyber-Kondycji!"</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4 items-start">
                            <div className="bg-blue-100 p-2 rounded-lg"><CheckCircle2 className="text-blue-600" /></div>
                            <div>
                                <h4 className="font-bold text-lg">System Streaków</h4>
                                <p className="text-slate-600">Nagradzamy każdy dzień bez wpadki i regularną edukację.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="bg-blue-100 p-2 rounded-lg"><CheckCircle2 className="text-blue-600" /></div>
                            <div>
                                <h4 className="font-bold text-lg">Tinder dla phishingu</h4>
                                <p className="text-slate-600">Szybka gra typu swipe: zdecyduj w sekundę, czy wiadomość jest bezpieczna.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="bg-emerald-100 p-2 rounded-lg"><Zap className="text-emerald-600" /></div>
                            <div>
                                <h4 className="font-bold text-lg text-emerald-700">Realne Nagrody</h4>
                                <p className="text-slate-600">Wymieniaj punkty bezpieczeństwa na kody rabatowe od naszych Partnerów.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Gamification;