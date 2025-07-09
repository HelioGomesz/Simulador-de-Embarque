import express from "express"

const app = express();

//criando uma rota que devolve uma resposta
    //get, post, put, delete
        //Get listar dados
        //Post criar dados
        //Put atualizar dados
        //Delete deletar dados

    // 1) Tipo de Rota / Método HTTP
    // 2) Endpoint / rota
app.get('/produtos', (req, res) => {
    res.send('Listando produtos')

})

app.listen(3000)