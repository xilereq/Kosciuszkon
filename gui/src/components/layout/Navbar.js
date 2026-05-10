import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            onLogout();
        } catch (err) {
            console.error("Błąd wylogowania:", err);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-10 h-10 text-purple-600" />
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                            SafeGuard AI
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-medium">
                        {!isAuthenticated ? (
                            <>
                                <a href="/#features" className="hover:text-purple-600 transition">Funkcje</a>
                                <a href="/#family" className="hover:text-purple-600 transition">Dla Rodziny</a>
                                <Link to="/login" className="hover:text-purple-600 transition">Logowanie</Link>
                                <Link to="/register" className="bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 transition shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5">
                                    Zarejestruj się
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:text-purple-600 transition">Mój Panel</Link>
                                <Link to="/family" className="hover:text-purple-600 transition">Dla Rodziny</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition"
                                >
                                    Wyloguj się
                                </button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
                        {!isAuthenticated ? (
                            <>
                                <a href="#features" className="hover:text-purple-600">Funkcje</a>
                                <Link to="/login">Logowanie</Link>
                                <Link to="/register">Rejestracja</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">Mój Panel</Link>
                                <Link to="/family">Dla Rodziny</Link>
                                <button onClick={handleLogout} className="text-left text-red-600 font-bold">Wyloguj się</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;