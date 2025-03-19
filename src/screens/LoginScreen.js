import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AlunoService from "../services/AlunoService";
import { TextInputMask } from "react-native-masked-text";
import { getSession, saveSession } from "../utils/sessionManager";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const alunoData = await getSession();
      if (alunoData) {
        navigation.navigate("Carteirinha", { cpf: alunoData.cpf });
      }
    } catch (error) {
      console.error('Erro ao verificar status do login:', error);
    }
  };

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const response = await AlunoService.loginAluno(cpf, senha);

      console.log("Resposta da API:", response);

      if (response && response.aluno) {
        await saveSession(response.aluno);
        Alert.alert("Sucesso", "Login efetuado com sucesso!");
        navigation.navigate("Carteirinha", { cpf: response.aluno.cpf });
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Falha no login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Transporte Universitário</Text>
              <Text style={styles.subtitle}>
                Faça o login para ter acesso à sua carteira de transporte
                universitário.
              </Text>
              {windowHeight > 550 && (
                <Image
                  source={require("../../assets/imgs/bus-yellow.png")}
                  style={styles.image}
                />
              )}
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.loginTitle}>Login</Text>

                <Text style={styles.label}>CPF:</Text>
                <TextInputMask
                  type={'cpf'}
                  style={styles.input}
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChangeText={setCpf}
                  keyboardType="numeric"
                  placeholderTextColor={"#999"}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                  placeholderTextColor={"#999"}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Cadastro do Aluno")}
                >
                  <Text style={styles.linkText}>
                    Não tem uma conta? Cadastre-se
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.footer}>
            @2025 - Todos Direitos Reservados - IVF-Assessoria na Gestão Pública
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: windowWidth < 350 ? 20 : 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: windowWidth < 350 ? 14 : 16,
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  image: {
    width: Math.min(200, windowWidth * 0.5),
    height: Math.min(200, windowWidth * 0.5),
    resizeMode: "contain",
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 450,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: Platform.OS === "ios" ? 12 : 10,
    width: "100%",
    marginBottom: 15,
    textDecorationColor: "#000",
    placeholderTextcolor: "#000",
  },
  button: {
    backgroundColor: "#008cffdc",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#fff",
  },
  linkText: {
    color: "#007bff",
    marginTop: 15,
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
