import React from 'react';
import { Gamepad2 } from 'lucide-react';

const AwarenessTrainingCard = () => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-indigo-600" />
            <h3 className="font-bold text-xl text-slate-900">Trening Czujności</h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">Sprawdź swoje umiejętności w grze "Tinder dla Phishingu".</p>
        <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">Rozpocznij sesję</button>
    </div>
);

export default AwarenessTrainingCard;