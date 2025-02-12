// services/AlunoService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.105:8081/transporte-api/';

const AlunoService = {
    createAluno: async (alunoData) => {
        const token = await AsyncStorage.getItem('userToken');
        
        try {
            const response = await axios.post(`${BASE_URL}api/aluno/create.php`, alunoData, {
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

export default AlunoService;