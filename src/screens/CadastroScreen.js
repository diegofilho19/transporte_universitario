import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AlunoService from "../services/AlunoService";
import { TextInputMask } from "react-native-masked-text";

export default function CadastroScreen() {
  const [foto, setFoto] = useState(null);
  const [universidades, setUniversidades] = useState([]);
  const [universidade, setUniversidade] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [numero, setNumero] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cidade, setCidade] = useState("");
  const [curso, setCurso] = useState(""); // Added missing state for curso
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigation = useNavigation();

  // Carrega as faculades
  useEffect(() => {
    const carregarFaculdades = async () => {
      try {
        console.log("API_BASE_URL:", AlunoService.API_BASE_URL); // Log the base URL
        console.log("Carregando faculdades...");
        
        // Tentando usar a URL diretamente
        const url = `http://192.168.1.106/sistema_dashboard/backend/faculdades/get_faculdades.php`;
        console.log("Fetching from URL:", url);
        
        const response = await fetch(url);
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 200));
        
        // Agora tentar analisar o JSON
        const data = await AlunoService.getFaculdades();
        console.log("Faculdades carregadas:", data);
        setUniversidades(data);
      } catch (error) {
        console.error("Erro ao carregar faculdades:", error);
        Alert.alert("Erro", "Falha ao carregar faculdades.");
      }
    };
  
    carregarFaculdades();
  }, []);

  const pickImage = async () => {
    // Solicita permissão para acessar a biblioteca de fotos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a biblioteca de fotos negada!");
      return;
    }

    // Abre a biblioteca de fotos e permite selecionar uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Se o usuário selecionar uma imagem, atualiza o estado `foto`
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleCadastro = async () => {
    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem. Tente novamente.");
      setSenha(""); // Limpa os campos de senha
      setConfirmarSenha("");
      return;
    }
    
    if (cpf.length !== 14) {
      Alert.alert('Erro', 'CPF inválido. O CPF deve conter 11 dígitos.');
      return;
    }
    
    if (numero.length !== 15) {
      Alert.alert('Erro', 'Telefone inválido. O telefone deve conter 11 dígitos.');
      return;
    }
    
    if (!universidade) {
      Alert.alert('Erro', 'Selecione uma faculdade.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome_completo", nome);
      formData.append("cpf", cpf);
      formData.append("numero_tel", numero);
      formData.append("matricula", matricula);
      formData.append("senha", senha);
      formData.append("id_faculdade", parseInt(universidade));
      formData.append("id_cidade", parseInt(cidade) || 1); // Default to 1 if not set
      formData.append("curso", curso || "Não especificado");

      if (foto) {
        const response = await fetch(foto);
        const blob = await response.blob();
        formData.append("foto", {
          uri: foto,
          type: blob.type,
          name: `foto-${Date.now()}.png`,
        });
      }

      await AlunoService.createAluno(formData);
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert(
        "Erro ao realizar cadastro",
        "Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cadconteiner}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite Seu Nome"
            value={nome}
            onChangeText={setNome}
            required
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInputMask
            style={styles.input}
            type={"cpf"}
            onChangeText={(text) => setCpf(text)}
            placeholder="Digite Seu CPF"
            value={cpf}
            required
          />

          <Text style={styles.label}>Número(Tel):</Text>
          <TextInputMask
            style={styles.input}
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            onChangeText={(text) => setNumero(text)}
            placeholder="Digite Seu Número"
            value={numero}
            required
            maxLength={15}
          />

          <Text style={styles.label}>Matrícula:</Text>
          <TextInput
            style={styles.input}
            placeholder="Matricula"
            value={matricula}
            onChangeText={setMatricula}
            required
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            required
          />

          <Text style={styles.label}>Confirme sua Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            required
          />

          <Text style={styles.label}>Faculdade/Universidade:</Text>
          <View style={styles.pickerConteiner}>
            <Picker
              selectedValue={universidade}
              style={styles.inputpicker}
              onValueChange={(itemValue) => setUniversidade(itemValue)}
            >
              <Picker.Item label="Selecione a faculdade" value="" />
              {universidades.map((faculdade) => (
                <Picker.Item
                  key={faculdade.id}
                  label={`${faculdade.sigla} - ${faculdade.cidade}`}
                  value={String(faculdade.id)}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Curso:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Curso" 
            value={curso}
            onChangeText={setCurso}
            required 
          />

          <Text style={styles.label}>Foto do Aluno:</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickImage}
          >
            <Text>{foto ? "Foto Selecionada" : "Selecionar Foto"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCadastro}
          >
            <Text style={styles.submitButtonText}>CADASTRE-SE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cadconteiner: {
    backgroundColor: "#DFDFDF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    height: "auto",
    flexDirection: "column",
    alignContent: "flex-start",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  pickerConteiner: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
  },
  inputpicker: {
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#008cffdc",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});