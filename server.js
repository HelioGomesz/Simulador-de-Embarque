//criando uma rota que devolve uma resposta
//get, post, put, delete
//Get listar dados
//Post criar dados
//Put atualizar dados
//Delete deletar dados

// 1) Tipo de Rota / Método HTTP
// 2) Endpoint / rota

// Criar API de Produtos
// Criar Produto
// Listar Produtos
// Editar um Produto
// Deletar um Produto

// Mongo DB
// Username: HNdevs25
// Senha: HN2025

// Importando as dependências necessárias
// Prisma Client é a biblioteca que permite interagir com o banco de dados
import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import cors from "cors";
import multer from "multer";
import XLSX from "xlsx";

const prisma = new PrismaClient();
const app = express();
// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });
// Lista de origens permitidas (opcional - usado para restringir acesso em produção)
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5501"
];

// Middleware CORS configurado
app.use(cors({
  // A função 'origin' é chamada para cada requisição para verificar se ela pode acessar o servidor
  origin: (origin, callback) => {
    // Se a requisição não tiver origem (ex: Postman ou mesma origem), ela é permitida
    if (!origin) {
      return callback(null, true);
    }

    // Se a origem estiver na lista de permitidas, também é permitida
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Se a origem não for permitida, retorna erro
    return callback(new Error("Not allowed by CORS"));
  },

  // Permite envio de cookies e headers personalizados (caso necessário)
  credentials: true
}));
app.use(express.json());

// ROTA DE UPLOAD DE EXCEL E ATUALIZAÇÃO DE CUSTOS UNITÁRIOS
app.post("/produtos/upload-excel", upload.single("excelFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado." });
    }
    // Lê o arquivo Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    let atualizados = 0;
    // Para cada linha, atualiza o custo unitário do produto
    for (const row of rows) {
      // Ajuste os nomes das colunas conforme o seu Excel (ex: Produto, CustoUnit)
      const produto = row["Produto"] || row["produto"];
      const custoUnit = row["Custo Unit"] || row["custo unit"] || row["CustoUnit"] || row["custoUnit"];
      if (produto && custoUnit !== undefined) {
        // Atualiza no banco de dados
        const result = await prisma.produtos.updateMany({
          where: { produto: produto },
          data: { custoUnit: Number(custoUnit) },
        });
        if (result.count > 0) atualizados += result.count;
      }
    }
    return res.json({ atualizados });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao processar o arquivo." });
  }
});
//ROTA DE CRIAÇÃO DE PRODUTOS
//Cria um novo produto
app.post("/produtos", async (req, res) => {
  await prisma.produtos.create({
    data: {
      produto: req.body.produto,
      qtdPP: req.body.qtdPP,
      qtdPG: req.body.qtdPG,
      pesoPP: req.body.pesoPP,
      pesoPG: req.body.pesoPG,
      cubagemPP: req.body.cubagemPP,
      cubagemPG: req.body.cubagemPG,
      padraoCX: req.body.padraoCX,
      custoUnit: req.body.custoUnit,
    },
  });

  res.status(201).json(req.body); //STATUS 201 TUDO OK E FOI CRIADO
});

//ROTA DE LISTAGEM DE PRODUTOS
//Retorna todos os produtos cadastrados
// Também pode ser usado para filtrar produtos
// Exemplo: /produtos?produto=nomeDoProduto
// Retorna todos os produtos se não houver filtro
app.get("/produtos", async (req, res) => {
  const produtos = await prisma.produtos.findMany();
  res.status(200).json(produtos); //STATUS 200 CRIADO
});

//ROTA DE EDIÇÃO DE PRODUTO
//:id é um parâmetro de rota que será passado na URL
//Exemplo: /produtos/1234567890
app.put("/produtos/:id", async (req, res) => {
  await prisma.produtos.update({
    where: {
      id: req.params.id, //id do produto que será editado
    },
    data: {
      produto: req.body.produto,
      qtdPP: req.body.qtdPP,
      qtdPG: req.body.qtdPG,
      pesoPP: req.body.pesoPP,
      pesoPG: req.body.pesoPG,
      cubagemPP: req.body.cubagemPP,
      cubagemPG: req.body.cubagemPG,
      padraoCX: req.body.padraoCX,
      custoUnit: req.body.custoUnit,
    },
  });
  res.status(201).json(req.body); //STATUS 201 TUDO OK E FOI EDITADO
});

//ROTA DE DELEÇÃO DE PRODUTO
app.delete("/produtos/:id", async (req, res) => {
  await prisma.produtos.delete({
    where: {
      id: req.params.id, //id do produto que será deletado
    },
  });
  res.status(200).json({ message: "Produto deletado com sucesso" }); //STATUS 200 TUDO OK E FOI DELETADO
});

app.listen(3000);

console.log("Servidor rodando na porta 3000"); //Mensagem de confirmação de que o servidor está rodando
// Acesse a API em http://localhost:3000/produtos   