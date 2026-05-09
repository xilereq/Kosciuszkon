import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Hero, Features, Gamification, FamilyUmbrella, Partners } from './components';
import { Login, Register } from './pages';
// Importujemy nowy komponent (stworzysz go w kroku 2)
import UserDashboard from './pages/Dashboard/UserDashboard';

function App() {
    // Stan sprawdzający czy użytkownik jest zalogowany
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

    // Funkcja odświeżająca stan (wywołamy ją po loginie/wylogowaniu)
    const checkAuth = () => {
        setIsAuthenticated(!!localStorage.getItem('access_token'));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            {/* Przekazujemy stan i funkcję wylogowania do Navbaru */}
            <Navbar isAuthenticated={isAuthenticated} onLogout={checkAuth} />
            <Routes>
                <Route path="/" element={
                    isAuthenticated ? (
                        <UserDashboard />
                    ) : (
                        <>
                            <Hero />
                            <Features />
                            <Gamification />
                            <FamilyUmbrella />
                            <Partners />
                        </>
                    )
                } />
                <Route path="/login" element={
                    !isAuthenticated ? <Login onLoginSuccess={checkAuth} /> : <Navigate to="/" />
                } />
                <Route path="/register" element={<Register />} />
            </Routes>
            {!isAuthenticated && <Footer />}
        </div>
    );
}

export default App;