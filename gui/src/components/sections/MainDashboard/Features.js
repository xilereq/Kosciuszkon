import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Beaker, Zap } from 'lucide-react';

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl transition-all"
    >
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </motion.div>
);

const Features = () => {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Jak Cię chronimy</h2>
                    <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<ShieldCheck className="w-10 h-10 text-purple-600" />}
                        title="Aktywna Tarcza"
                        desc="Analiza e-mail i SMS w czasie rzeczywistym. Proste ostrzeżenia zamiast żargonu IT."
                    />
                    <FeatureCard
                        icon={<Beaker className="w-10 h-10 text-emerald-600" />}
                        title="Ręczne Laboratorium"
                        desc="Wklej podejrzany link lub wiadomość i sprawdź ją bezpiecznie przed kliknięciem."
                    />
                    <FeatureCard
                        icon={<Zap className="w-10 h-10 text-amber-500" />}
                        title="Symulator Zagrożeń AI"
                        desc="Kontrolowane, fałszywe e-maile, które uczą Cię czujności poprzez praktykę."
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;