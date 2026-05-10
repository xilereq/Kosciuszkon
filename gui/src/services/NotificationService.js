import api from './api';

const NotificationService = {
    getAllNotifications: async () => {
        const response = await api.get('/notification/all');
        return response.data;
    },

    deleteNotification: async (notificationId) => {
        try {
            const response = await api.delete(`/notification/remove/${notificationId}`);
            return response.data;
        } catch (error) {
            console.error(`Błąd podczas usuwania powiadomienia o ID ${notificationId}:`, error);
            throw error;
        }
    }
};

export default NotificationService;