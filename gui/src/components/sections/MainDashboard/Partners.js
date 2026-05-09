import React from 'react';

const Partners = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-purple-50 border-t border-purple-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest mb-10">Sponsorzy Bezpieczeństwa</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-12">
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white p-10 rounded-[32px] border border-purple-700/50 shadow-2xl shadow-purple-900/20 max-w-3xl mx-auto relative overflow-hidden">
                    <h4 className="font-bold text-2xl mb-2">Chroń swoich klientów z nami</h4>
                    <p className="text-purple-200 mb-4">Dołącz do firm dbających o bezpieczeństwo Polaków. Wyświetlaj swoje reklamy i kody rabatowe za pomyślne przejście symulacji.</p>
                    <button className="text-purple-300 font-bold hover:text-white transition-colors flex items-center gap-2">Zostań Partnerem →</button>
                </div>
            </div>
        </section>
    );
};

export default Partners;