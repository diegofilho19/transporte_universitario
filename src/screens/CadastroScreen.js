import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AlunoService from "../services/AlunoService";
import { TextInputMask } from "react-native-masked-text";

const Dropdown = ({ options, onSelect, placeholder, isUniversidade = true }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dropdownItem} onPress={() => onItemPress(item)}>
      <Text>{isUniversidade ? `${item.sigla} - ${item.cidade}` : item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.dropdownButton}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.dropdownButtonText}>
        {(selected && (isUniversidade ? `${selected.sigla} - ${selected.cidade}` : selected.label)) || placeholder}
      </Text>
    </TouchableOpacity>
  );
};

export default function CadastroScreen() {
  const [foto, setFoto] = useState(null);
  const [comprovante, setComprovante] = useState(null);
  const [universidades, setUniversidades] = useState([]);
  const [universidade, setUniversidade] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [numero, setNumero] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cidade, setCidade] = useState("");
  const [curso, setCurso] = useState("");
  const [turno, setTurno] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const carregarFaculdades = async () => {
      try {
        console.log("API_BASE_URL:", AlunoService.API_BASE_URL);
        console.log("Carregando faculdades...");
        const url = `http://192.168.1.103/sistema_dashboard/backend/faculdades/get_faculdades.php`;
        console.log("Fetching from URL:", url);
        const response = await fetch(url);
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 200));
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
    Alert.alert(
      "Selecionar Foto",
      "Escolha uma opção",
      [
        {
          text: "Galeria",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              setFoto(result.assets[0].uri);
            }
          }
        },
        {
          text: "Câmera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            
            if (status !== 'granted') {
              Alert.alert('Desculpe, precisamos de permissão para acessar a câmera!');
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              setFoto(result.assets[0].uri);
            }
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  const pickComprovante = async () => {
    Alert.alert(
      "Selecionar Comprovante",
      "Escolha uma opção",
      [
        {
          text: "Galeria",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setComprovante(result.assets[0].uri);
            }
          }
        },
        {
          text: "Câmera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            
            if (status !== 'granted') {
              Alert.alert('Desculpe, precisamos de permissão para acessar a câmera!');
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setComprovante(result.assets[0].uri);
            }
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem. Tente novamente.");
      setSenha("");
      setConfirmarSenha("");
      return;
    }
    if (cpf.length !== 14) {
      Alert.alert("Erro", "CPF inválido. O CPF deve conter 11 dígitos.");
      return;
    }
    if (numero.length !== 15) {
      Alert.alert("Erro", "Telefone inválido. O telefone deve conter 11 dígitos.");
      return;
    }
    if (!universidade) {
      Alert.alert("Erro", "Selecione uma faculdade.");
      return;
    }
    if (!comprovante) {
      Alert.alert("Erro", "É necessário enviar um comprovante de matrícula.");
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
      formData.append("id_cidade", parseInt(cidade) || 1);
      formData.append("curso", curso || "Não especificado");
      formData.append("turno", turno);

      if (foto) {
        const response = await fetch(foto);
        const blob = await response.blob();
        
        // Nome do arquivo com extensão correta
        const extension = foto.split('.').pop() || 'jpg';
        const fileName = `foto-${Date.now()}.${extension}`;
        
        formData.append("foto", {
          uri: Platform.OS === 'android' ? foto : foto.replace('file://', ''),
          type: blob.type || 'image/jpeg',
          name: fileName,
        });
        
        console.log("Enviando foto:", fileName);
      }

      if (comprovante) {
        const response = await fetch(comprovante);
        const blob = await response.blob();
        
        // Nome do arquivo com extensão correta
        const extension = comprovante.split('.').pop() || 'jpg';
        const fileName = `comprovante-${Date.now()}.${extension}`;
        
        formData.append("compMatricula", {
          uri: Platform.OS === 'android' ? comprovante : comprovante.replace('file://', ''),
          type: blob.type || 'image/jpeg',
          name: fileName,
        });
        
        console.log("Enviando comprovante:", fileName);
      }

      console.log("Enviando formulário de cadastro:", Object.fromEntries(formData._parts));
      
      const resultado = await AlunoService.createAluno(formData);
      console.log("Resposta do cadastro:", resultado);
      
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert(
        "Erro ao realizar cadastro",
        "Verifique os dados e tente novamente."
      );
    }
  };

  // Opções de turno
  const turnos = [
    { id: "1", label: "Matutino" },
    { id: "2", label: "Vespertino" },
    { id: "3", label: "Noturno" },
    { id: "4", label: "Integral" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cadconteiner}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite Seu Nome"
            value={nome}
            onChangeText={setNome}
            required
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInputMask
            style={styles.input}
            type={"cpf"}
            onChangeText={(text) => setCpf(text)}
            placeholder="Digite Seu CPF"
            value={cpf}
            required
            placeholderTextColor={"#999"}
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
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>Matrícula:</Text>
          <TextInput
            style={styles.input}
            placeholder="Matricula"
            value={matricula}
            onChangeText={setMatricula}
            required
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            required
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>Confirme sua Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            required
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>Faculdade/Universidade:</Text>
          {Platform.OS === "ios" ? (
            <Dropdown
              options={universidades}
              onSelect={(item) => setUniversidade(String(item.id))}
              placeholder="Selecione a faculdade"
              isUniversidade={true}
            />
          ) : (
            <View style={styles.pickerContainer}>
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
          )}
          
          <Text style={styles.label}>Curso:</Text>
          <TextInput
            style={styles.input}
            placeholder="Curso"
            value={curso}
            onChangeText={setCurso}
            required
            placeholderTextColor={"#999"}
          />

          <Text style={styles.label}>Turno:</Text>
          {Platform.OS === "ios" ? (
            <Dropdown
              options={turnos}
              onSelect={(item) => setTurno(item.label)}
              placeholder="Selecione o turno"
              isUniversidade={false}
            />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={turno}
                style={styles.inputpicker}
                onValueChange={(itemValue) => setTurno(itemValue)}
              >
                <Picker.Item label="Selecione o turno" value="" />
                {turnos.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </Picker>
            </View>
          )}

          <Text style={styles.label}>Foto do Aluno:</Text>
          {foto && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: foto }}
                style={styles.imagePreview}
              />
            </View>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadButtonText}>
              {foto ? "Alterar Foto" : "Selecionar Foto"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Comprovante de Matrícula:</Text>
          {comprovante && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: comprovante }}
                style={styles.imagePreview}
              />
            </View>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={pickComprovante}>
            <Text style={styles.uploadButtonText}>
              {comprovante ? "Alterar Comprovante" : "Selecionar Comprovante"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
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
    paddingTop: Platform.OS === "ios" ? 0 : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  cadconteiner: {
    backgroundColor: "#DFDFDF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: Platform.OS === "ios" ? 15 : 10,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  pickerContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputpicker: {
    height: Platform.OS === "ios" ? 150 : 50,
    backgroundColor: "#fff",
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  uploadButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#008cffdc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdownButtonText: {
    color: '#333',
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '92%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
