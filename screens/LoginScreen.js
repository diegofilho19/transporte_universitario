import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    Alert.alert("Login efetuado com sucesso!");
    navigation.navigate("Pagina Inicial");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Transporte Universitário</Text>
        <Text style={styles.subtitle}>Faça o login para ter acesso à sua carteira de transporte universitário.</Text>
        <Image source={require('../assets/imgs/bus-yellow.png')} style={styles.image} />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.card}>
          <Text style={styles.loginTitle}>Login</Text>

          <Text style={styles.label}>CPF:</Text>
          <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} maxLength={11}/>

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro do Aluno")}>
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>@2025 - Todos Direitos Reservados - IVF-Assessoria na Gestão Pública</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  leftContainer: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 40 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  image: { width: 200, height: 200, resizeMode: "contain" },
  rightContainer: { width: "80%", alignItems: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "100%", elevation: 5 },
  loginTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, width: "100%", marginBottom: 10 },
  button: { backgroundColor: "#008cffdc", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { fontSize: 16, fontWeight: "600", textTransform: "uppercase" },
  linkText: { color: "#007bff", marginTop: 10, textAlign: "center" },
  footer: { marginTop: 20, fontSize: 14, textAlign: "center", color: "#666" },
});
