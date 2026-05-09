// src/pages/Dashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { FamilyService } from '../../services/';
import {SecurityHeader, FamilySidebar, AnalysisLab, ActiveShield, AwarenessTrainingCard} from '../../components';
import { motion } from 'framer-motion';

const UserDashboard = () => {
    const events = [];
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSupervisor, setIsSupervisor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50 via-slate-50 to-white pt-28 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.45 }}>
                    <SecurityHeader />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1 space-y-8">
                        {isSupervisor && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
                                <FamilySidebar family={family} loading={loading} />
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}>
                            <AwarenessTrainingCard />
                        </motion.div>

                    </aside>
                    <main className="lg:col-span-2 space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45 }}>
                            <AnalysisLab />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.45 }}>
                            <ActiveShield events={events} />
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;