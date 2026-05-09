import React from 'react';

const FormInput = ({ label, name, value, onChange, type = 'text', placeholder = '', error }) => {
    return (
        <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1" htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-slate-700 font-medium ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;
