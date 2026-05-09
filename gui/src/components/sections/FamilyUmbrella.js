import React from 'react';
import { Users } from 'lucide-react';

const FamilyStatus = ({ name, status, color, alert }) => (
    <div className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md border ${alert ? 'border-amber-400 animate-pulse' : 'border-white/20'}`}>
        <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">{name}</div>
        <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="font-bold text-lg italic">{status}</span>
        </div>
        {alert && <button className="mt-4 w-full py-2 bg-amber-400 text-amber-900 rounded-xl font-bold text-sm">ZAREAGUJ</button>}
    </div>
);

const FamilyUmbrella = () => {
    return (
        <section id="family" className="py-24 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full mb-6">
                    <Users className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Family Dashboard</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8">☂️ Cyfrowy Parasol Rodzinny</h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-16 leading-relaxed">
                    Dostań powiadomienie PUSH, gdy Twoja Babcia lub Dziadek spróbuje wejść w podejrzany link.
                    Zainterweniuj, zanim stracą oszczędności życia.
                </p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <FamilyStatus name="Ty" status="100% bezpieczny" color="bg-emerald-400" />
                    <FamilyStatus name="Mama" status="95% bezpieczna" color="bg-emerald-400" />
                    <FamilyStatus name="Babcia Krysia" status="⚠️ Zagrożenie!" color="bg-amber-400" alert />
                </div>
            </div>
        </section>
    );
};

export default FamilyUmbrella;