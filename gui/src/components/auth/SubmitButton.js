import React from 'react';

const SubmitButton = ({ label, loading, disabled }) => {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700'} shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50`}
        >
            {loading ? 'Proszę czekać...' : label}
        </button>
    );
};

export default SubmitButton;
