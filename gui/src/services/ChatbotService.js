import api from './api';

const ChatbotService = {
    sendMessage: async (history) => {
        try {
            const response = await api.post('/chat/message', { messages: history });
            return response.data;
        } catch (err) {
            console.error("Błąd podczas komunikacji z chatbotem:", err);
            throw err;
        }
    }
};

export default ChatbotService;