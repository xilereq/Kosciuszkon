import React, { useState } from 'react';
import AuthLayout from './AuthLayout.js';
import FormInput from '../../components/auth/FormInput.js';
import SubmitButton from '../../components/auth/SubmitButton.js';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services';


const Login = ({onLoginSuccess}) => {
    const [form, setForm] = useState({ username: '', password: '' });
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
        if (!form.username) errs.username = 'Nazwa użytkownika jest wymagana';
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
        try {
            await AuthService.login({
                username: form.username,
                password: form.password
            });
            onLoginSuccess();
            navigate('/');
        } catch (err) {
            const apiError = err.response?.data?.error;
            let errorMessage = 'Wystąpił nieoczekiwany błąd';

            if (Array.isArray(apiError)) {
                errorMessage = apiError[0]?.msg || apiError[0] || errorMessage;
            } else if (typeof apiError === 'string') {
                errorMessage = apiError;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Zaloguj się" subtitle="Wprowadź dane do logowania">
            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                    <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">
                        {errors.general}
                    </p>
                )}
                <FormInput label="Nazwa użytkownika" name="username" type="text" value={form.username} onChange={handleChange} error={errors.username} />
                <FormInput label="Hasło" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
                <div className="pt-2">
                    <SubmitButton label="Zaloguj" loading={loading} disabled={loading} />
                </div>
                <div className="text-sm text-center text-gray-500">
                    <p>Nie masz konta? <Link to="/register" className="text-purple-600 hover:underline">Zarejestruj się</Link></p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;