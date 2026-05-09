import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-500 mt-2">{subtitle}</p>}
                </div>

                {children}

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Masz już konto? <Link to="/login" className="text-indigo-600 hover:underline">Zaloguj się</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

