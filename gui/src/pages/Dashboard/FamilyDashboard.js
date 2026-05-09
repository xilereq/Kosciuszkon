import React, { useState, useEffect } from 'react';
import { FamilyService } from '../../services';
import {FamilyHeader, FamilyManagement, MemberList, FamilyStats, MemberReportModal} from '../../components'

const FamilyDashboard = () => {
    const [family, setFamily] = useState(null);
    const [stats, setStats] = useState({ goals: 0, messages: 0, premium: false });
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberEvents, setMemberEvents] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const loadFamilyData = async () => {
        try {
            const data = await FamilyService.getFamily();
            if (data) {
                setFamily(data);
                setStats({
                    goals: data.goals_count || 0,
                    messages: data.messages_count || 0,
                    premium: !!data.premium
                });
            }
        } catch (err) { setFamily(null); }
    };

    useEffect(() => { loadFamilyData(); }, []);

    const openMemberReport = async (member) => {
        setSelectedMember(member);
        setIsModalLoading(true);
        try {
            const events = await FamilyService.getMemberEvents(member.id || 1);
            setMemberEvents(events);
        } catch (err) {
            setMemberEvents([
                { id: 1, type: 'sms', date: '2024-05-20', desc: 'Zablokowano fałszywy link', isThreat: true },
                { id: 2, type: 'mail', date: '2024-05-19', desc: 'Próba wyłudzenia danych', isThreat: true }
            ]);
        } finally { setIsModalLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <FamilyHeader />
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <FamilyManagement onRefresh={loadFamilyData} />
                        <MemberList family={family} onOpenReport={openMemberReport} />
                    </div>
                </div>
                <FamilyStats stats={stats} />
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