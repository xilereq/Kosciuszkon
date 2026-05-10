import React from 'react';
import { Users, Loader2, Bell } from 'lucide-react';

const FamilySidebar = ({ family, loading }) => (
    <div className="bg-gradient-to-b from-purple-600 to-purple-800 p-8 rounded-3xl shadow-xl shadow-purple-900/20 text-white relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-purple-200" />
            <h2 className="text-xl font-bold">Bezpieczna Sieć Rodzinna</h2>
        </div>
        <div className="space-y-4">
            {loading ? <Loader2 className="animate-spin" /> : family?.members?.length > 0 ? (
                family.members.map((member, idx) => {
                    const name = typeof member === 'object' ? (member.name || member.username) : member;
                    const notifications = member.notification_count || ((member.threats || 0) + (member.warnings || 0));
                    const hasIssues = notifications > 0;

                    return (
                        <div key={idx} className={`p-4 rounded-2xl border ${hasIssues ? 'bg-white/20 border-white/40' : 'bg-white/10 border-white/20'}`}>
                            <p className="font-bold text-lg mb-3">{name}</p>
                            <div className="flex items-center justify-between text-sm bg-black/10 px-3 py-1.5 rounded-lg">
                                <span className="flex items-center gap-2 opacity-90"><Bell size={14} /> Powiadomienia:</span>
                                <span className={`font-black ${hasIssues ? 'text-amber-300' : 'text-emerald-300'}`}>{notifications}</span>
                            </div>
                        </div>
                    );
                })
            ) : <p className="text-sm opacity-70">Brak grupy.</p>}
        </div>
    </div>
);

export default FamilySidebar;