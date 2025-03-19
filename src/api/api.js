const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

const storage = multer.diskStorage({
  destination: "/backend/alunos/uploads/fotoAluno/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

//Conexao com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app_sistema",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados estabelecida.");
});

// Rota para cadastrar aluno
app.post(
  "/backend/alunos/api_cadastro.php",
  upload.single("foto"),
  (req, res) => {
    const {
      nome_completo,
      cpf,
      matricula,
      numero_tel,
      senha,
      id_faculdade,
      curso,
      turno,
      compMatricula,
      id_cidade,
    } = req.body;
    const foto = req.file ? req.file.filename : null;

    if (
      !nome_completo ||
      !cpf ||
      !matricula ||
      !numero_tel ||
      !senha ||
      !id_faculdade ||
      !curso ||
      !turno ||
      !compMatricula||
      !id_cidade
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const sql =
      "INSERT INTO alunos (nome_completo, cpf, matricula, numero_tel, senha, id_faculdade, curso, id_cidade, foto, turno, compMatricula) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      nome_completo,
      cpf,
      matricula,
      numero_tel,
      senha,
      id_faculdade,
      curso,
      turno,
      id_cidade,
      foto,
      compMatricula,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar aluno:", err);
        return res.status(500).json({ error: "Erro ao cadastrar aluno" });
      }
      res.status(201).json({ message: "Aluno cadastrado com sucesso!" });
    });
  }
);

// Rota para login do aluno (usando CPF)
app.post("/backend/alunos/api_login_aluno.php", (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ error: "CPF e senha são obrigatórios" });
  }

  // Formatar CPF (remover pontos e traços)
  const cpfFormatado = cpf.replace(/[^\d]/g, "");

  // Primeiro, encontre o aluno pelo CPF
  const sqlFindAluno = "SELECT * FROM alunos WHERE cpf = ? OR cpf = ?";
  db.query(sqlFindAluno, [cpf, cpfFormatado], (err, results) => {
    if (err) {
      console.error("Erro ao realizar login:", err);
      return res.status(500).json({ error: "Erro ao realizar login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "CPF ou senha incorretos" });
    }

    const aluno = results[0];

    // Verificar a senha - se estiver usando bcrypt
    let senhaCorreta = false;

    if (aluno.senha.startsWith("$2")) {
      // Usando bcrypt
      const bcrypt = require("bcrypt"); // Você precisará instalar esta biblioteca
      senhaCorreta = bcrypt.compareSync(senha, aluno.senha);
    } else {
      // Comparação direta
      senhaCorreta = senha === aluno.senha;
    }

    if (!senhaCorreta) {
      return res.status(401).json({ error: "CPF ou senha incorretos" });
    }

    // Removendo a senha antes de enviar os dados do aluno
    delete aluno.senha;

    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      aluno,
    });
  });
});

//Get faculdades
app.get("/backend/faculdades/get_faculdades.php", (req, res) => {
  const sql = "SELECT id, sigla, cidade FROM faculdades";
  db.query(sql, (err, results) => {
      if (err) {
          console.error("Erro ao buscar faculdades:", err);
          return res.status(500).json({ error: "Erro ao buscar faculdades" });
      }
      res.status(200).json(results);
  });
});

app.use('/sistema_dashboard/backend/alunos/uploads/fotoAluno/', express.static(path.join(__dirname, 'backend/alunos/uploads/fotoAluno')));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
