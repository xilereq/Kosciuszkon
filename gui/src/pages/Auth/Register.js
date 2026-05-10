import React, { useState, useEffect } from 'react';
import AuthLayout from './AuthLayout.js';
import FormInput from '../../components/auth/FormInput.js';
import SubmitButton from '../../components/auth/SubmitButton.js';
import {Link, useNavigate} from 'react-router-dom';
import { AuthService } from '../../services';

const emailRegex = /^\S+@\S+\.\S+$/;

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        try {
            await AuthService.register({
                name: form.name,
                email: form.email,
                password: form.password
            });
            navigate('/login');
        } catch (err) {
            setErrors({
                general: err.response?.data?.error || 'Rejestracja nieudana. Użytkownik może już istnieć.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Zarejestruj się" subtitle="Utwórz nowe konto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                    <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">
                        {errors.general}
                    </p>
                )}
                <FormInput label="Imię" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                <FormInput label="Hasło" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
                <FormInput label="Potwierdź hasło" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                <div className="pt-2">
                    <SubmitButton label="Utwórz konto" loading={loading} disabled={loading} />
                </div>
            </form>
            <div className="mt-6 text-center text-sm text-slate-500">
                <p>
                    Masz już konto? <Link to="/login" className="text-purple-600 hover:underline">Zaloguj się</Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register;