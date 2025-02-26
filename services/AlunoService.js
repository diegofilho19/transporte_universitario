import axios from 'axios';

const API_URL = "http://localhost:3000"; // API Node.js

const createAluno = async (alunoData) => {
    const formData = new FormData();

    Object.keys(alunoData).forEach(key => {
        formData.append(key, alunoData[key]);
    });

    try {
        const response = await axios.post(`${API_URL}/cadastro-aluno`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        throw error;
    }
};

export default { createAluno };
