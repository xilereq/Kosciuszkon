import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-950 to-black text-slate-400 py-16 px-4">
            <div className="w-full mb-6">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="w-8 h-8 text-purple-400" />
                        <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">ScamRadar</span>
                    </div>
                    <p className="max-w-xs text-slate-400 leading-relaxed text-sm">Innowacyjna platforma ochrony przed oszustwami cyfrowymi. Misja: Bezpieczny internet dla każdego pokolenia.</p>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Pobierz</h5>
                    <ul className="space-y-4">
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">Chrome Extension</li>
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">Android App</li>
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">iOS App</li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Pomoc</h5>
                    <ul className="space-y-4">
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">Zgłoś zagrożenie</li>
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">Regulamin</li>
                        <li role="button" tabIndex={0} className="text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center gap-2">Polityka Prywatności</li>
                    </ul>
                </div>


            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-slate-500 text-xs">© {new Date().getFullYear()} ScamRadar. Wszelkie prawa zastrzeżone.</div>
                <div className="flex items-center gap-4 text-slate-400 text-xs">
                    <span className="cursor-pointer hover:text-purple-400 transition-colors">Polityka Prywatności</span>
                    <span className="cursor-pointer hover:text-purple-400 transition-colors">Regulamin</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;