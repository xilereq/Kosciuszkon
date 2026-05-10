import React from 'react';
import { UserCircle, ChevronRight, Bell } from 'lucide-react';

const MemberList = ({ family, onOpenReport }) => (
    <div className="bg-slate-50 rounded-[24px] p-6 flex flex-col items-center border border-dashed border-slate-200">
        <h3 className="font-bold text-slate-800 text-xl mb-6">
            {family ? `Grupa: ${family.family_name || family.name}` : 'Brak grupy'}
        </h3>
        {family?.members ? (
            <div className="w-full flex flex-col gap-3">
                {family.members.map((member, index) => {
                    const name = typeof member === 'object' ? (member.name || member.username) : member;
                    const notifications = member.notification_count || 0;

                    return (
                        <button key={index} onClick={() => onOpenReport(member)} className="flex items-center justify-between w-full p-4 bg-white border border-purple-50 shadow-sm hover:shadow-lg hover:shadow-purple-500/15 hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 rounded-2xl group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100">
                                    <UserCircle size={28} className="text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <span className="font-bold text-slate-800 text-lg block leading-none mb-2">{name}</span>
                                    <div className={`flex items-center gap-1.5 text-sm font-bold ${notifications > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                                        <Bell size={14} />
                                        <span>Powiadomienia: {notifications}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-300 group-hover:text-purple-600" size={20} />
                        </button>
                    );
                })}
            </div>
        ) : <p className="text-sm text-slate-500">Stwórz grupę po lewej.</p>}
    </div>
);

export default MemberList;