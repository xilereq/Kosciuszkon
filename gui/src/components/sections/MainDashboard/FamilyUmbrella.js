import React from 'react';
import { Users } from 'lucide-react';

const FamilyStatus = ({ name, status, color, alert }) => (
    <div className={`p-6 rounded-2xl bg-white/10 backdrop-blur-md border ${alert ? 'border-amber-400 animate-pulse' : 'border-white/20'}`}>
        <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">{name}</div>
        <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="font-bold text-base italic">{status}</span>
        </div>
        {alert && <button className="mt-4 w-full py-2 bg-amber-400 text-amber-900 rounded-xl font-bold text-sm">ZAREAGUJ</button>}
    </div>
);

const FamilyUmbrella = () => {
    return (
        <section id="family" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 text-center relative">
                <div className="inline-flex items-center gap-2 bg-purple-500 px-4 py-2 rounded-full mb-6">
                    <Users className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Dla Rodziny</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8">Bezpieczna Sieć Rodzinna</h2>
                <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-16 leading-relaxed">
                    Dostań powiadomienie, gdy Twoja Babcia lub Dziadek spróbuje wejść w podejrzany link.
                    Zainterweniuj, zanim stracą oszczędności życia.
                </p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <FamilyStatus name="Ty" status="0 powiadomień" color="bg-emerald-400" />
                    <FamilyStatus name="Mama" status="1 powiadomienie" color="bg-amber-400" />
                    <FamilyStatus name="Babcia Krysia" status="4 powiadomienia" color="bg-red-400" alert />
                </div>
            </div>
        </section>
    );
};

export default FamilyUmbrella;