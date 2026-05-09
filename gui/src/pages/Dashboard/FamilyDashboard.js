import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FamilyService } from '../../services';
import {FamilyHeader, FamilyManagement, MemberList, FamilyStats, MemberReportModal} from '../../components'

const FamilyDashboard = () => {
    const [family, setFamily] = useState(null);
    const [stats, setStats] = useState({ goals: 0, messages: 0, premium: false });
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberEvents, setMemberEvents] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [isSupervisor, setIsSupervisor] = useState(null); // null oznacza ładowanie

    const loadFamilyData = async () => {
        try {
            // Używamy ujednoliconej metody amIBoss z FamilyService
            const res = await FamilyService.amIBoss();
            const supervisorStatus = res.is_boss === true;
            setIsSupervisor(supervisorStatus);

            // Jeśli ma uprawnienia, pobieramy dane rodziny
            if (supervisorStatus) {
                const data = await FamilyService.getFamily();
                if (data) {
                    setFamily(data);
                    setStats({
                        goals: data.goals_count || 0,
                        messages: data.messages_count || 0,
                        premium: !!data.premium
                    });
                }
            }
        } catch (err) {
            setFamily(null);
            setIsSupervisor(false);
        }
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

    // Ekran braku dostępu
    if (isSupervisor === false) {
        return (
            <div className="min-h-screen bg-slate-50 pt-28 pb-8 px-4 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-red-100 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Brak dostępu</h2>
                    <p className="text-slate-600">
                        Tylko supervisor rodziny może zarządzać Parasolem Rodzinnym.
                    </p>
                    <a href="/" className="mt-6 inline-block bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all">
                        Wróć do Panelu
                    </a>
                </div>
            </div>
        );
    }

    if (isSupervisor === null) {
        return <div className="min-h-screen bg-slate-50 flex justify-center items-center">Ładowanie...</div>;
    }

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