// src/pages/Dashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FamilyService } from '../../services/';
import {SecurityHeader, FamilySidebar, AnalysisLab, ActiveShield, AwarenessTrainingCard} from '../../components';

const UserDashboard = () => {
    const [events, setEvents] = useState([]);
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSupervisor, setIsSupervisor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/user/dashboard');
                setEvents(userRes.data.recentEvents || []);

                const bossData = await FamilyService.amIBoss();
                const supervisorStatus = bossData.is_boss === true;
                setIsSupervisor(supervisorStatus);

                if (supervisorStatus) {
                    const familyRes = await FamilyService.getFamily();
                    setFamily(familyRes);
                }
            } catch (error) {
                console.error("Błąd ładowania danych panelu użytkownika:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-10">
                <SecurityHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1 space-y-8">
                        {isSupervisor && (
                            <FamilySidebar family={family} loading={loading} />
                        )}
                        <AwarenessTrainingCard />
                    </aside>
                    <main className="lg:col-span-2 space-y-8">
                        <AnalysisLab />
                        <ActiveShield events={events} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;