import React from 'react';
import { Users, Loader2 } from 'lucide-react';

const FamilySidebar = ({ family, loading }) => (
    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl text-white">
        <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-blue-200" />
            <h2 className="text-xl font-bold">Parasol Rodzinny</h2>
        </div>
        <div className="space-y-4">
            {loading ? <Loader2 className="animate-spin" /> : family?.members?.length > 0 ? (
                family.members.map((member, idx) => {
                    const name = typeof member === 'object' ? (member.name || member.username) : member;
                    const score = member.securityScore ?? 100;
                    return (
                        <div key={idx} className={`p-4 rounded-2xl border ${score < 50 ? 'bg-red-500/30 border-red-400 animate-pulse' : 'bg-white/10 border-white/20'}`}>
                            <p className="text-xs font-bold mb-1 uppercase opacity-80">{name}</p>
                            <p className="font-bold text-lg">{score < 50 ? '⚠️ ZAGROŻENIE' : `${score}% Bezpieczny`}</p>
                        </div>
                    );
                })
            ) : <p className="text-sm opacity-70">Brak grupy.</p>}
        </div>
    </div>
);

export default FamilySidebar;