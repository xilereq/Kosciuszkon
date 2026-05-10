import api from './api';

const NotificationService = {
    getAllNotifications: async () => {
        const response = await api.get('/notification/all');
        return response.data;
    }
};

export default NotificationService;