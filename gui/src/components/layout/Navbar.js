import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-10 h-10 text-blue-600" />
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              SafeGuard AI
            </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#features" className="hover:text-blue-600 transition">Funkcje</a>
                        <a href="#family" className="hover:text-blue-600 transition">Dla Rodziny</a>
                        <a href="#edu" className="hover:text-blue-600 transition">Edukacja</a>
                        <Link to="/login" className="hover:text-blue-600 transition">Logowanie</Link>
                        <Link to="/register" className="hover:text-blue-600 transition">Rejestracja</Link>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Zainstaluj wtyczkę
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
                        <a href="#features" className="hover:text-blue-600 transition">Funkcje</a>
                        <a href="#family" className="hover:text-blue-600 transition">Dla Rodziny</a>
                        <a href="#edu" className="hover:text-blue-600 transition">Edukacja</a>
                        <Link to="/login" className="hover:text-blue-600 transition">Logowanie</Link>
                        <Link to="/register" className="hover:text-blue-600 transition">Rejestracja</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;