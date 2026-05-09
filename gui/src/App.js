import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {Footer, Navbar} from './components';
import {Hero, Features, Gamification, FamilyUmbrella, Partners} from './components';
import {Login, Register} from './pages';



function App() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <>
                        <Hero />
                        <Features />
                        <Gamification />
                        <FamilyUmbrella />
                        <Partners />
                    </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;