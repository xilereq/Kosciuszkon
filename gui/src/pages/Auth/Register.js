import React, { useState } from 'react';
import AuthLayout from './AuthLayout.js';
import FormInput from '../../components/auth/FormInput.js';
import SubmitButton from '../../components/auth/SubmitButton.js';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^\S+@\S+\.\S+$/;

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
        if (!form.name) errs.name = 'Imię jest wymagane';
        if (!form.email) errs.email = 'Email jest wymagany';
        else if (!emailRegex.test(form.email)) errs.email = 'Nieprawidłowy adres email';
        if (!form.password) errs.password = 'Hasło jest wymagane';
        else if (form.password.length < 8) errs.password = 'Hasło musi mieć co najmniej 8 znaków';
        if (form.confirmPassword !== form.password) errs.confirmPassword = 'Hasła nie są zgodne';
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
            // symulowany sukces - przekierowanie do logowania
            navigate('/login');
        }, 1200);
    };

    return (
        <AuthLayout title="Zarejestruj się" subtitle="Utwórz nowe konto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput label="Imię" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                <FormInput label="Hasło" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
                <FormInput label="Potwierdź hasło" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                <div className="pt-2">
                    <SubmitButton label="Utwórz konto" loading={loading} disabled={loading} />
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;

