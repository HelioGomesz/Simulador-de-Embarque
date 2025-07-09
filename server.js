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

import express from "express";
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()
const app = express();
app.use(express.json());

const produtos = [];

//ROTA DE CRIAÇÃO DE PRODUTO
app.post('/produtos', (req, res) => {

    produtos.push(req.body);
    res.status(201).json(req.body); //STATUS 201 TUDO OK E FOI CRIADO
});

//ROTA DE LISTAGEM DE PRODUTOS
app.get('/produtos', (req, res) => {
    
    res.status(200).json(produtos); //STATUS 200 CRIADO

});

app.listen(3000);