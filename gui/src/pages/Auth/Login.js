import React, { useState } from 'react';
import AuthLayout from './AuthLayout.js';
import FormInput from '../../components/auth/FormInput.js';
import SubmitButton from '../../components/auth/SubmitButton.js';
import { useNavigate, Link } from 'react-router-dom';

const emailRegex = /^\S+@\S+\.\S+$/;

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = 'Email jest wymagany';
        else if (!emailRegex.test(form.email)) errs.email = 'Nieprawidłowy adres email';
        if (!form.password) errs.password = 'Hasło jest wymagane';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = validate();
        if (Object.keys(v).length) {
            setErrors(v);
            return;
        }
        setLoading(true);
        // symulacja requestu
        setTimeout(() => {
            setLoading(false);
            // symulujemy sukces
            navigate('/');
        }, 1000);
    };

    return (
        <AuthLayout title="Zaloguj się" subtitle="Wprowadź dane do logowania">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                <FormInput label="Hasło" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
                <div className="pt-2">
                    <SubmitButton label="Zaloguj" loading={loading} disabled={loading} />
                </div>
                <div className="text-sm text-center text-gray-500">
                    <p>Nie masz konta? <Link to="/register" className="text-indigo-600 hover:underline">Zarejestruj się</Link></p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;

