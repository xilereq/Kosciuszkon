import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Login, Register } from './pages';
import { FamilyDashboard, Dashboard } from "./pages";
import UserDashboard from './pages/Dashboard/UserDashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

    const checkAuth = () => {
        setIsAuthenticated(!!localStorage.getItem('access_token'));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            <Navbar isAuthenticated={isAuthenticated} onLogout={checkAuth} />
            <Routes>
                <Route path="/" element={
                    isAuthenticated ? (
                        <UserDashboard />
                    ) : (
                        <Dashboard/>
                    )
                } />
                <Route path="/login" element={
                    !isAuthenticated ? <Login onLoginSuccess={checkAuth} /> : <Navigate to="/" />
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/family" element={isAuthenticated ? <FamilyDashboard /> : <Navigate to="/login" />} />
            </Routes>
            {!isAuthenticated && <Footer />}
        </div>
    );
}

export default App;