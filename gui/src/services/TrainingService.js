import api from './api';

class TrainingService {

  async getRandomMessage() {
    try {
      const response = await api.get('/training/random');
      return response.data;
    } catch (error) {
      console.error('Błąd podczas pobierania losowej wiadomości:', error);
      throw error;
    }
  }

  async submitSwipe(messageId, guess) {
    try {
      const response = await api.post('/training/swipe', {
        message_id: messageId,
        guess: guess,
      });
      return response.data;
    } catch (error) {
      console.error('Błąd podczas wysyłania oceny:', error);
      throw error;
    }
  }
}

export default new TrainingService();

