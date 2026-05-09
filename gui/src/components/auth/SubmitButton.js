import React from 'react';

const SubmitButton = ({ label, loading, disabled }) => {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
            {loading ? 'Proszę czekać...' : label}
        </button>
    );
};

export default SubmitButton;
