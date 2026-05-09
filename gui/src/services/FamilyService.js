import api from './api';

const FamilyService = {
    createFamily: async (familyName) => {
        const response = await api.post('/family/create', { family_name: familyName });
        return response.data;
    },
    joinFamily: async (familyName) => {
        const response = await api.post('/family/join', { family_name: familyName });
        return response.data;
    },
    getFamily: async () => {
        const response = await api.get('/family');
        return response.data;
    }
};

export default FamilyService;