import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <ShieldCheck className="w-8 h-8 text-purple-400" />
                        <span className="text-xl font-bold text-white">SafeGuard AI</span>
                    </div>
                    <p className="max-w-xs">Innowacyjna platforma ochrony przed oszustwami cyfrowymi. Misja: Bezpieczny internet dla każdego pokolenia.</p>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Pobierz</h5>
                    <ul className="space-y-4">
                        <li>Chrome Extension</li>
                        <li>Android App</li>
                        <li>iOS App</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-bold mb-6">Pomoc</h5>
                    <ul className="space-y-4">
                        <li>Zgłoś zagrożenie</li>
                        <li>Regulamin</li>
                        <li>Polityka Prywatności</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-sm">
                © 2026 SafeGuard AI. Wszystkie prawa zastrzeżone.
            </div>
        </footer>
    );
};

export default Footer;