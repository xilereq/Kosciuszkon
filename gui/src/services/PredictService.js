import api from './api';

const PredictService = {
    /**
     * Wysyła tekst do analizy AI
     * @param {string} type - 'sms' lub 'email'
     * @param {string} text - treść do sprawdzenia
     */
    predict: async (type, text) => {
        try {
            // Ponieważ api.js ma baseURL: '/api', ścieżka v1/predict/ typuje w blueprint Flask
            const response = await api.post(`/v1/predict/${type}`, { text });
            return response.data;
        } catch (err) {
            console.error("Błąd analizy AI:", err);
            throw err;
        }
    }
};

export default PredictService;