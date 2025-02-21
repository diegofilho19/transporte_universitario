import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function CarteirinhaScreen({ isActive = true }) {
  // isActive será recebido do dashboard, com valor padrão true
  
  return (
    <View style={styles.container}>
      <View style={styles.cardconteiner}>
        <Text style={styles.title}>Carteira do Estudante</Text>
        <Text style={styles.text}>Aqui vai a sua carteira do estudante.</Text>
        <View style={styles.cardAluno}>
          <Image style={styles.fotoaluno} source={{ uri: 'https://example.com/aluno.png' }} />
        </View>
        <Text style={styles.info}>Nome: Nome do Aluno</Text>
        <Text style={styles.info}>Cpf: 000.000.000-00</Text>
        <Text style={styles.info}>Matrícula: 00000000</Text>
        <Text style={styles.info}>Carro: Nome do carro</Text> 
        
        <Text style={styles.status}>STATUS:</Text>
        
        {/* Indicador de Status (não clicável) */}
        <View style={styles.statusIndicatorContainer}>
          <View
            style={[
              styles.statusIndicator,
              isActive ? styles.activeIndicator : styles.inactiveIndicator
            ]}
          >
            <Text 
              style={isActive ? styles.activeText : styles.inactiveText}
            >
              {isActive ? "Ativo" : "Inativo"}
            </Text>
          </View>
        </View>
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
    height: 600, 
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
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },
  // Estilos para o indicador de status
  statusIndicatorContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
  },
  statusIndicator: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  activeIndicator: {
    backgroundColor: '#A8E6D5',
  },
  inactiveIndicator: {
    backgroundColor: '#FFCCCB',
  },
  activeText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveText: {
    color: '#CD5C5C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});