// services/AuthService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.105:8081/transporte-api/';

const AuthService = {
    login: async (cpf, senha) => {
        try {
            const response = await axios.post(`${BASE_URL}api/auth/login.php`, {
                cpf,
                senha
            });
            
            // Salvar token no AsyncStorage
            await AsyncStorage.setItem('userToken', response.data.token);
            
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Erro de conexão');
        }
    },

    getUserProfile: async () => {
        const token = await AsyncStorage.getItem('userToken');
        
        try {
            const response = await axios.get(`${BASE_URL}api/user/profile.php`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Erro de conexão');
        }
    }
};

export default AuthService;