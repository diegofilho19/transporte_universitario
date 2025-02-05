import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function HomePage() {
    const navigation= useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={() => navigation.navigate("Carteirinha")}>
                <Text style={styles.buttonText}>ACESSE A CARTEIRA</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      marginTop: 10,  
      width: 350,
      padding: 30,
      borderRadius: 15,
      alignItems: "center",
      marginBottom: 10,
    },
    blueButton: {
      backgroundColor: "#4A90E2",
    },
    greenButton: {
      backgroundColor: "#4CAF50",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });