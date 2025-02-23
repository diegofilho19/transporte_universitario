import axios from 'axios';

const handleCadastro = async () => {
  try {
    const response = await axios.post('http://192.168.1.105/sistema_dashboard/alunos/cadastrar_aluno.php', {
      nome_completo: nome,
      cpf: cpf,
      // ... outros dados do formulário
    });

    if (response.status === 200) {
      Alert.alert('Cadastro realizado com sucesso!');
    } else {
      Alert.alert('Erro ao realizar cadastro:', response.data.message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Erro ao realizar cadastro:', 'Ocorreu um erro inesperado.');
  }
};