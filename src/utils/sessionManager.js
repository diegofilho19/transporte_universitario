import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (alunoData) => {
  try {
    await AsyncStorage.setItem('alunoData', JSON.stringify(alunoData));
    return true;
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
    return false;
  }
};

export const getSession = async () => {
  try {
    const alunoData = await AsyncStorage.getItem('alunoData');
    return alunoData ? JSON.parse(alunoData) : null;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('alunoData');
    return true;
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
    return false;
  }
}; 