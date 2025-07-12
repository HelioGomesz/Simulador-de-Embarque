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
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()
const app = express();
app.use(express.json());


//ROTA DE CRIAÇÃO DE PRODUTOS
    //Cria um novo produto
app.post('/produtos', async (req, res) => {

    await prisma.produtos.create({
        data: {
            produto: req.body.produto,
            qtdPP: req.body.qtdPP,
            qtdPG: req.body.qtdPG,
            pesoPP: req.body.pesoPP,
            pesoPG: req.body.pesoPG,
            cubagemPP: req.body.cubagemPP,
            cubagemPG: req.body.cubagemPG,
            volumePP: req.body.volumePP,
            volumePG: req.body.volumePG,
            custoUnit: req.body.custoUnit
        }
    });

    res.status(201).json(req.body); //STATUS 201 TUDO OK E FOI CRIADO
});

//ROTA DE LISTAGEM DE PRODUTOS
    //Retorna todos os produtos cadastrados
    // Também pode ser usado para filtrar produtos
    // Exemplo: /produtos?produto=nomeDoProduto
    // Retorna todos os produtos se não houver filtro
app.get('/produtos', async (req, res) => {

    const produtos = await prisma.produtos.findMany();
    res.status(200).json(produtos); //STATUS 200 CRIADO

});


//ROTA DE EDIÇÃO DE PRODUTO
    //:id é um parâmetro de rota que será passado na URL
    //Exemplo: /produtos/1234567890
app.put('/produtos/:id', async (req, res) => {

    await prisma.produtos.update({
        where: {
            id: req.params.id //id do produto que será editado
        },
        data: {
            produto: req.body.produto,
            qtdPP: req.body.qtdPP,
            qtdPG: req.body.qtdPG,
            pesoPP: req.body.pesoPP,
            pesoPG: req.body.pesoPG,
            cubagemPP: req.body.cubagemPP,
            cubagemPG: req.body.cubagemPG,
            volumePP: req.body.volumePP,
            volumePG: req.body.volumePG,
            custoUnit: req.body.custoUnit
        }
    });
    res.status(201).json(req.body); //STATUS 201 TUDO OK E FOI EDITADO

});

//ROTA DE DELEÇÃO DE PRODUTO
app.delete('/produtos/:id', async (req, res) => {
    await prisma.produtos.delete({
        where: {
            id: req.params.id //id do produto que será deletado
        }
    });
    res.status(200).json({ message: 'Produto deletado com sucesso' }); //STATUS 200 TUDO OK E FOI DELETADO
});

app.listen(3000);