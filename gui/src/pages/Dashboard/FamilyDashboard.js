import React, { useState, useEffect } from 'react';
import { FamilyService } from '../../services';
import { FamilyHeader, FamilyManagement, MemberList, MemberReportModal } from '../../components';
import { ShieldCheck } from 'lucide-react';

const FamilyDashboard = () => {
    const [family, setFamily] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberEvents, setMemberEvents] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [isSupervisor, setIsSupervisor] = useState(null);

    const loadFamilyData = async () => {
        try {
            const res = await FamilyService.amIBoss();
            const supervisorStatus = res.is_boss === true;
            setIsSupervisor(supervisorStatus);

            try {
                const data = await FamilyService.getFamily();
                if (data && (data.members || data.family_name)) {
                    setFamily(data);
                } else {
                    setFamily(null);
                }
            } catch (err) {
                setFamily(null);
            }
        } catch (err) {
            setIsSupervisor(false);
            setFamily(null);
        }
    };

    useEffect(() => { loadFamilyData(); }, []);

    const openMemberReport = async (member) => {
        if (!isSupervisor) {
            alert("Tylko administrator rodziny może przeglądać szczegółowe raporty.");
            return;
        }
        setSelectedMember(member);
        setIsModalLoading(true);
        try {
            const events = await FamilyService.getMemberEvents(member.id || 1);
            setMemberEvents(events);
        } catch (err) {
            setMemberEvents([
                { id: 1, type: 'sms', date: '2024-05-20', desc: 'Zablokowano fałszywy link', isThreat: true }
            ]);
        } finally { setIsModalLoading(false); }
    };

    if (isSupervisor === null) return <div className="min-h-screen bg-slate-50 flex justify-center items-center font-bold">Ładowanie...</div>;

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50 via-slate-50 to-white pt-28 pb-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <FamilyHeader />

                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 mb-8">
                    {family ? (
                        <div className="space-y-8">
                            {!isSupervisor && (
                                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center gap-4 text-emerald-800">
                                    <div className="bg-emerald-500 text-white p-2 rounded-full">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Jesteś chroniony</p>
                                        <p className="text-sm opacity-90">Należysz do grupy: <span className="font-black underline">{family.family_name || family.name}</span></p>
                                    </div>
                                </div>
                            )}

                            <div className={isSupervisor ? "grid md:grid-cols-2 gap-8" : "block"}>
                                {isSupervisor && <FamilyManagement onRefresh={loadFamilyData} />}
                                <div className={!isSupervisor ? "max-w-2xl mx-auto w-full" : ""}>
                                    <MemberList family={family} onOpenReport={openMemberReport} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-bold text-slate-800 mb-2">Nie należysz do żadnej grupy</h2>
                                <p className="text-slate-500">Utwórz nową rodzinę jako administrator lub dołącz do istniejącej wpisując jej nazwę.</p>
                            </div>
                            <FamilyManagement onRefresh={loadFamilyData} />
                        </div>
                    )}
                </div>

            </div>

            <MemberReportModal
                member={selectedMember}
                events={memberEvents}
                isLoading={isModalLoading}
                onClose={() => setSelectedMember(null)}
            />
        </div>
    );
};

export default FamilyDashboard;

