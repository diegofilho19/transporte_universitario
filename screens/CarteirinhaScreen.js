import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CarteirinhaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cardconteiner}>
        <Text style={styles.title}>Carteira do Estudante</Text>
        <Text style={styles.text}>Aqui vai a sua carteira do estudante com QR Code.</Text>
        <View style={styles.cardAluno}>
          <Image style={styles.fotoaluno} source={{ uri: 'https://example.com/aluno.png' }} />
        </View>
        <Text style={styles.info}>Nome: Nome do Aluno</Text>
        <Text style={styles.info}>Cpf: 000.000.000-00</Text>
        <Text style={styles.info}>Matrícula: 00000000</Text>
        <Text style={styles.info}>Carro: Nome do carro</Text> 
        
        <Text style={styles.qrLabel}>QR-CODE:</Text>
        <Image style={styles.qrCode} source={{uri:'https://img.icons8.com/ios/50/qr-code--v1.png'}} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff",
  },
  cardconteiner: { 
    backgroundColor: "#DFDFDF",
    padding: 20, 
    borderRadius: 10, 
    elevation: 5, 
    width: 350, 
    height: 643, 
    alignItems: "center", 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center",
    textTransform: "uppercase",
  },
  text: { 
    fontSize: 16, 
    textAlign: "center", 
    marginTop: 10 
  },
  cardAluno: { 
    backgroundColor: "#fff", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20, 
    borderRadius: 100, 
    width: 150, 
    height: 150, 
    marginTop: 20, 
  },
  fotoaluno: { 
    width: 100, 
    height: 100, 
    borderRadius: 50 
  },

  info: {
    display: 'flex',
    fontSize: 18,
    marginVertical: 3,
    margin: 0,
    marginTop: 10,
  },

  qrLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});