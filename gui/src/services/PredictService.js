import api from './api';

const PredictService = {
    /**
     * Wysyła tekst do analizy AI
     * @param {string} type - 'sms' lub 'email'
     * @param {string} text - treść do sprawdzenia
     */
    predict: async (type, text) => {
        try {
            const response = await api.post(`/predict/${type}`, { text });
            return response.data;
        } catch (err) {
            console.error("Błąd analizy AI:", err);
            throw err;
        }
    },

    amIBoss: async () => {
        try {
            const response = await api.get('/family/am_i_boss');
            return response.data; // Zwróci obiekt, np. { "is_boss": true }
        } catch (err) {
            console.error("Błąd podczas sprawdzania uprawnień szefa rodziny:", err);
            throw err;
        }
    }
};

export default PredictService;