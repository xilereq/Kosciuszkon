import React from 'react';

const FamilyHeader = () => (
    <header className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Bezpieczna <span className="text-blue-600">Sieć Rodzinna</span>
            </h1>
            <p className="text-slate-500 font-medium">Panel zarządzania grupą</p>
        </div>
    </header>
);

export default FamilyHeader;