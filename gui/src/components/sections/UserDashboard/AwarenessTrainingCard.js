import React from 'react';
import { Gamepad2 } from 'lucide-react';

const AwarenessTrainingCard = () => (
    <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-purple-900/20">
        {/* dekoracyjne rozmyte kółko */}
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4 relative z-10">
            <Gamepad2 className="w-8 h-8 text-purple-300" />
            <h3 className="font-bold text-xl text-white">Trening Czujności</h3>
        </div>
        <p className="text-sm text-purple-200 mb-6 relative z-10">Sprawdź swoje umiejętności w grze "Tinder dla Phishingu".</p>
        <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl relative z-10 hover:scale-[1.02] transition-transform shadow-lg">Rozpocznij sesję</button>
    </div>
);

export default AwarenessTrainingCard;