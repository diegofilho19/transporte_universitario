import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from "expo-document-picker";

export default function CadastroScreen() {
  const [comprovante, setComprovante] = useState(null);
  const [foto, setFoto] = useState(null);
  const [universidade, setUniversidade] = useState('');
  const [cidade, setCidade] = useState('');
  const navigation = useNavigation();

  const pickDocument = async (setFile) => {
    let result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    if (result.type !== "cancel") {
      setFile(result.name);
    }
  };

  const handleLogin = () => {
    Alert.alert("Cadastro realizado com sucesso!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cadconteiner}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput style={styles.input} placeholder="Digite Seu Nome" require/>

          <Text style={styles.label}>Cpf:</Text>
          <TextInput style={styles.input} placeholder="CPF(000.000.000-00)" maxLength={11} require/>

          <Text style={styles.label}>Matrícula:</Text>
          <TextInput style={styles.input} placeholder="Matricula" require/>

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry require/>

          <Text style={styles.label}>Confirme sua Senha:</Text>
          <TextInput style={styles.input} placeholder="Confirme sua Senha" secureTextEntry require/>

          <Text style={styles.label}>Faculdade/Universidade:</Text>
          <View style={styles.pickerConteiner}>
            <Picker
              selectedValue={universidade}
              style={styles.inputpicker}
              onValueChange={(itemValue) => setUniversidade(itemValue)}
            >
              <Picker.Item label="Selecione a opção" value="" />
              <Picker.Item label="Universidade Federal de Pernambuco (UFPE)" value="ufpe" />
              <Picker.Item label="Universidade de Pernambuco (UPE)" value="upe" />
              <Picker.Item label="Universidade Católica de Pernambuco (UNICAP)" value="unicap" />
              <Picker.Item label="Universidade Federal Rural de Pernambuco (UFRPE)" value="ufrpe" />
              <Picker.Item label="Faculdade de Ciências Humanas de Olinda (FACHO)" value="facho" />
              <Picker.Item label="Faculdade Integrada do Recife (FIR)" value="fir" />
              <Picker.Item label="Faculdade Boa Viagem (FBV)" value="fbv" />
              <Picker.Item label="Faculdade Maurício de Nassau (UNINASSAU)" value="uninassau" />
              <Picker.Item label="Faculdade Marista (FMR)" value="fmr" />
              <Picker.Item label="Faculdade de Tecnologia e Ciências (FTC)" value="ftc" />
            </Picker>
          </View>

          <Text style={styles.label}>Cidade:</Text>
              <View style={styles.pickerConteiner}>
                <Picker
                  selectedValue={cidade}
                  style={styles.inputpicker}
                  onValueChange={(itemValue) => setCidade(itemValue)}
                >
                  <Picker.Item label="Selecione a cidade" value="" />
                  <Picker.Item label="Recife" value="recife" />
                  <Picker.Item label="Olinda" value="olinda" />
                  <Picker.Item label="Jaboatão dos Guararapes" value="jaboatao" />
                  <Picker.Item label="Caruaru" value="caruaru" />
                  <Picker.Item label="Petrolina" value="petrolina" />
                  <Picker.Item label="Paulista" value="paulista" />
                  <Picker.Item label="Cabo de Santo Agostinho" value="cabo" />
                  <Picker.Item label="Camaragibe" value="camaragibe" />
                  <Picker.Item label="Garanhuns" value="garanhuns" />
                  <Picker.Item label="Vitória de Santo Antão" value="vitoria" />
                </Picker>
              </View>

          <Text style={styles.label}>Comprovante de Matrícula:</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setComprovante)}>
            <Text>{comprovante ? comprovante : "Selecionar Comprovante de Matrícula"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Foto:</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setFoto)}>
            <Text>{foto ? foto : "Selecionar Foto"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
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
    width: 370, 
    height: 'auto', 
    flexDirection: 'column',
    alignContent: 'flex-start', 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  pickerConteiner: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  inputpicker: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: '#fff',
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
