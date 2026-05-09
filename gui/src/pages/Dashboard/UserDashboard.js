import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FamilyService } from '../../services/';
import {SecurityHeader, FamilySidebar, AnalysisLab, ActiveShield, AwarenessTrainingCard} from '../../components';


const UserDashboard = () => {
    const [events, setEvents] = useState([]);
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, familyRes] = await Promise.all([
                    api.get('/user/dashboard'),
                    FamilyService.getFamily()
                ]);
                setEvents(userRes.data.recentEvents || []);
                setFamily(familyRes);
            } catch { console.error("Błąd ładowania"); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-10">
                <SecurityHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1 space-y-8">
                        <FamilySidebar family={family} loading={loading} />
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