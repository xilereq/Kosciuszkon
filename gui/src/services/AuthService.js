import api from './api';

const authService = {
    register: async (userData) => {
        try {
            const payload = {
                username: userData.name || userData.username || userData.email?.split('@')[0],
                name: userData.name,
                email: userData.email,
                password: userData.password
            };
            const response = await api.post('/register', payload);
            return response.data;
        } catch (err) {
            const serverMessage = err?.response?.data?.error || err?.response?.data?.message || err?.message;
            const error = new Error(serverMessage || 'Rejestracja nieudana');
            error.response = err.response;
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            if (response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            return response.data;
        } catch (err) {
            const serverMessage = err?.response?.data?.error || err?.response?.data?.message || err?.message;
            const error = new Error(serverMessage || 'Logowanie nieudane');
            error.response = err.response;
            throw error;
        }
    },

    refreshToken: async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/refresh', {}, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        });
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    }
};

export default authService;