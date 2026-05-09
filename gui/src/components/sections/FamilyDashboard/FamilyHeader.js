import React from 'react';

const FamilyHeader = () => (
    <header className="flex justify-between items-center mb-10">
        <div>
            <div className="mb-2">
                <span className="inline-block text-xs font-bold uppercase px-3 py-1 rounded-full bg-purple-600 text-white">Panel Zarządzania</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Bezpieczna <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">Sieć Rodzinna</span>
            </h1>
            <p className="text-slate-500 font-medium">Panel zarządzania grupą</p>
        </div>
    </header>
);

export default FamilyHeader;