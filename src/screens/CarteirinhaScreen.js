import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import AlunoService from "../services/AlunoService";
import { clearSession } from "../utils/sessionManager";

const BASE_URL = "http://192.168.1.103/sistema_dashboard";

const CarteirinhaScreen = ({ route, navigation }) => {
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

  // Função para construir a URL completa da imagem
  const getImageUrl = (relativePath) => {
    if (!relativePath) return null;
    
    // Se já for uma URL completa, retornar como está
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // Corrigir a duplicação de caminhos 'uploads/fotoAluno'
    let cleanPath = relativePath;
    
    // Verificar se há duplicação do caminho 'uploads/fotoAluno'
    if (relativePath.includes('uploads/fotoAluno/uploads/fotoAluno/')) {
      cleanPath = relativePath.replace('uploads/fotoAluno/uploads/fotoAluno/', 'uploads/fotoAluno/');
    }
    
    // Remover quaisquer barras iniciais se existirem
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1);
    }
    
    // Construir a URL completa
    const baseUrl = `${BASE_URL}/backend/alunos`;
    
    // Verificar se o caminho já começa com 'uploads'
    if (cleanPath.startsWith('uploads/')) {
      return `${baseUrl}/${cleanPath}`;
    } else {
      return `${baseUrl}/uploads/fotoAluno/${cleanPath}`;
    }
  };

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
            <>
              {console.log("Caminho original:", aluno.foto)}
              {console.log("URL da imagem após correção:", getImageUrl(aluno.foto))}
              <Image
                style={styles.fotoaluno}
                source={{ uri: getImageUrl(aluno.foto) }}
                resizeMode="cover"
              />
            </>
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
          <Text style={styles.info}>
            Turno: {aluno.turno || "Não disponível"}
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
          <Text style={styles.info}>
            Numero: {aluno.numero_fiscal || "Não disponível"}
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
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await clearSession();
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
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
    padding: 5,
  },
  cardconteiner: {
    backgroundColor: "#DFDFDF",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    maxHeight: '95%',
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  cardAluno: {
    marginVertical: 10,
    alignItems: "center",
  },
  fotoaluno: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#333",
  },
  placeholderFoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#333",
  },
  infoSection: {
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 8,
  },
  transportSection: {
    width: "100%",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  info: {
    fontSize: 16,
    marginVertical: 2,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  statusIndicatorContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 2,
  },
  statusIndicator: {
    paddingVertical: 8,
    paddingHorizontal: 20,
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
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default CarteirinhaScreen;
