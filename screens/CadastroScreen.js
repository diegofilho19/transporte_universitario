import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <Text style={styles.text}>Tela de cadastro em desenvolvimento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold" },
  text: { fontSize: 18, textAlign: "center", marginTop: 10 },
});
