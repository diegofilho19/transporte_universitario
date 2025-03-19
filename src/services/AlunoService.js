const API_BASE_URL = "http://192.168.1.103/sistema_dashboard/backend";
const API_CADASTRO_URL = `${API_BASE_URL}/alunos/api_cadastro.php`;
const API_LOGIN_URL = `${API_BASE_URL}/alunos/api_login_aluno.php`;
const API_CARTEIRA_URL = `${API_BASE_URL}/alunos/api_carteira_aluno.php`;
const API_FACULDADES_URL = `${API_BASE_URL}/faculdades/get_faculdades.php`;

const AlunoService = {
  createAluno: async (formData) => {
    try {
      console.log("Enviando requisição para:", API_CADASTRO_URL);
      
      const response = await fetch(API_CADASTRO_URL, {
        method: "POST",
        body: formData,
      });
      
      // Obter texto da resposta para depuração
      const responseText = await response.text();
      console.log("Resposta bruta do servidor:", responseText);
      
      // Tentar converter para JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Erro ao analisar JSON:", parseError);
        throw new Error(`Servidor retornou: ${responseText}`);
      }
      
      if (!response.ok) {
        throw new Error(result.error || result.message || "Erro ao cadastrar aluno");
      }
      
      return result;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  },

  loginAluno: async (cpf, senha) => {
    try {
      const formData = new FormData();
      formData.append("cpf", cpf);
      formData.append("senha", senha);
      console.log("Enviando CPF para API:", cpf);
      
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Erro ao fazer login");
      }
      return result;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  getAlunoCarteira: async (cpf) => {
    try {
      const formData = new FormData();
      formData.append("cpf", cpf);
      
      const response = await fetch(API_CARTEIRA_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar carteira do aluno");
      }

      const result = await response.json();
      console.log("Resposta da API (carteira):", result);
      
      if (result.foto) {
        console.log("Caminho da foto recebido:", result.foto);
      } else {
        console.log("Nenhuma foto recebida do servidor");
      }
      
      return result;
    } catch (error) {
      console.error("Erro ao buscar carteira:", error);
      throw error;
    }
  },


  getFaculdades: async () => {
    try {
        // Log the full URL for debugging
        const url = `${API_BASE_URL}/faculdades/get_faculdades.php`;
        console.log("Fetching faculdades from:", url);
        
        const response = await fetch(url);
        
        // Log the response status and headers
        console.log("Response status:", response.status);
        console.log("Response type:", response.headers.get('content-type'));
        
        // Get the raw text first for debugging
        const text = await response.text();
        console.log("Raw response:", text.substring(0, 200)); // First 200 chars
        
        // Try to parse as JSON
        let result;
        try {
            result = JSON.parse(text);
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            throw new Error(`Failed to parse response as JSON: ${text.substring(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(result.error || "Erro ao buscar faculdades");
        }

        return result;
    } catch (error) {
        console.error("Erro ao buscar faculdades:", error);
        throw error;
    }
}
};

export default AlunoService;