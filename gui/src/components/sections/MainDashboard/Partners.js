import React from 'react';

const Partners = () => {
    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest mb-10">Sponsorzy Bezpieczeństwa</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-12">
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                    <div className="h-8 w-32 bg-slate-400 rounded" />
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-2xl mx-auto">
                    <h4 className="font-bold text-xl mb-2">Chroń swoich klientów z nami</h4>
                    <p className="text-slate-600 mb-4">Dołącz do firm dbających o bezpieczeństwo Polaków. Wyświetlaj swoje reklamy i kody rabatowe za pomyślne przejście symulacji.</p>
                    <button className="text-blue-600 font-bold hover:underline">Zostań Partnerem →</button>
                </div>
            </div>
        </section>
    );
};

export default Partners;