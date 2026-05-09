import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left visual column - desktop only */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden items-center justify-center">
                <div className="absolute -top-20 -left-20 w-[60%] h-[60%] rounded-full bg-purple-500/30 blur-[100px]" />
                <div className="absolute top-10 -right-10 w-[40%] h-[40%] rounded-full bg-fuchsia-500/20 blur-[90px]" />
                <div className="relative z-10 max-w-lg text-center px-8">
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">Witaj w SafeGuard AI</h2>
                    <p className="text-purple-200">Twoja Cyfrowa Tarcza — ochrona, której możesz ufać.</p>
                </div>
            </div>

            {/* Right form column */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
                <div className="max-w-md w-full space-y-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-black text-slate-900">{title}</h2>
                        {subtitle && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
                    </div>

                    {children}


                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

