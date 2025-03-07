import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import AlunoService from "../services/AlunoService";

const CarteirinhaScreen = ({ route }) => {
  const [aluno, setAluno] = useState({});
  const [loading, setLoading] = useState(true);
  let statusAtivo;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarteira = async () => {
      try {
        setLoading(true);
        const cpf = route.params?.cpf;
        if (!cpf) {
          throw new Error("CPF não fornecido");
        }
        const data = await AlunoService.getAlunoCarteira(cpf);
        if (data.error) {
          throw new Error(data.error);
        }
        console.log("Dados do aluno (incluindo foto):", data);
        setAluno(data);
        statusAtivo = data.ativo;
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError(err.message || "Erro ao carregar dados do aluno");
      } finally {
        setLoading(false);
      }
    };
    fetchCarteira();
  }, [route.params?.cpf]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardconteiner}>
        <Text style={styles.title}>Carteira do Estudante</Text>
        
        <View style={styles.cardAluno}>
          {aluno.foto ? (
            <Image
              style={styles.fotoaluno}
              source={{ uri: aluno.foto }}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderFoto}>
              <Text>Sem foto</Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.info}>
            Nome: {aluno.nome_completo || "Não disponível"}
          </Text>
          <Text style={styles.info}>CPF: {aluno.cpf || "Não disponível"}</Text>
          <Text style={styles.info}>Numero: {aluno.numero_tel || "Não disponível"}</Text>
          <Text style={styles.info}>
            Matrícula: {aluno.matricula || "Não disponível"}
          </Text>
          <Text style={styles.info}>
            Faculdade: {aluno.faculdade || "Não disponível"}
          </Text>
          <Text style={styles.info}>
            Cidade: {aluno.cidade || "Não disponível"}
          </Text>
        </View>

        <View style={styles.transportSection}>
          <Text style={styles.sectionTitle}>Informações de Transporte</Text>
          <Text style={styles.info}>
            Motorista: {aluno.motorista || "Não disponível"}
          </Text>
          <Text style={styles.info}>
            Carro: {aluno.carro || "Não disponível"}
          </Text>
          <Text style={styles.info}>
            Placa: {aluno.placa || "Não disponível"}
          </Text>
          <Text style={styles.info}>
            Destino: {aluno.destino || "Não disponível"}
          </Text>
        </View>

        <Text style={styles.status}>STATUS:</Text>
        <View style={styles.statusIndicatorContainer}>
          <View
            style={[
              styles.statusIndicator,
              aluno.ativo ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
          >
            <Text style={aluno.ativo ? styles.activeText : styles.inactiveText}>
              {aluno.ativo ? "Ativo" : "Inativo"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
    height: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  cardAluno: {
    marginVertical: 15,
    alignItems: "center",
  },
  fotoaluno: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#333",
  },
  placeholderFoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#333",
  },
  infoSection: {
    width: "100%",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 10,
  },
  transportSection: {
    width: "100%",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  info: {
    fontSize: 16,
    marginVertical: 3,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  statusIndicatorContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 5,
  },
  statusIndicator: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  activeIndicator: {
    backgroundColor: "#A8E6D5",
  },
  inactiveIndicator: {
    backgroundColor: "#FFCCCB",
  },
  activeText: {
    color: "#2E8B57",
    fontWeight: "bold",
    fontSize: 16,
  },
  inactiveText: {
    color: "#CD5C5C",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CarteirinhaScreen;
