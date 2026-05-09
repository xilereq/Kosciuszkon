import React from 'react';
import { UserCircle, Shield, ChevronRight } from 'lucide-react';

const MemberList = ({ family, onOpenReport }) => (
    <div className="bg-slate-50 rounded-[24px] p-6 flex flex-col items-center border border-dashed border-slate-200">
        <h3 className="font-bold text-slate-800 text-xl mb-6">
            {family ? `Grupa: ${family.family_name || family.name}` : 'Brak grupy'}
        </h3>
        {family?.members ? (
            <div className="w-full flex flex-col gap-3">
                {family.members.map((member, index) => {
                    const name = typeof member === 'object' ? (member.name || member.username) : member;
                    const score = member.securityScore || 100;
                    return (
                        <button key={index} onClick={() => onOpenReport(member)} className="flex items-center justify-between w-full p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100"><UserCircle size={28} className="text-blue-600" /></div>
                                <div className="text-left">
                                    <span className="font-bold text-slate-800 text-lg block leading-none mb-1.5">{name}</span>
                                    <div className="flex items-center gap-1.5">
                                        <Shield size={14} className={score < 90 ? "text-amber-500" : "text-emerald-500"} />
                                        <span className="text-sm font-medium text-slate-500">Bezpieczeństwo: {score}%</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-300 group-hover:text-blue-600" size={20} />
                        </button>
                    );
                })}
            </div>
        ) : <p className="text-sm text-slate-500">Stwórz grupę po lewej.</p>}
    </div>
);

export default MemberList;