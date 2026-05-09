import api from './api';

const FamilyService = {
    createFamily: async (familyName, userName) => {
        const response = await api.post('/family/create', {
            family_name: familyName,
            name: userName
        });
        return response.data;
    },
    joinFamily: async (familyName, userName) => {
        const response = await api.post('/family/join', {
            family_name: familyName,
            name: userName
        });
        return response.data;
    },
    getFamily: async () => {
        const response = await api.get('/family/members');
        return response.data;
    },

    getMemberEvents: async (memberId) => {
        const response = await api.get(`/family/member/${memberId}/events`);
        return response.data;
    },

    amIBoss: async () => {
        try {
            const response = await api.get('/family/am_i_boss');
            return response.data;
        } catch (err) {
            console.error("Błąd podczas sprawdzania uprawnień szefa rodziny:", err);
            throw err;
        }
    }
};

export default FamilyService;