// Função principal para buscar e exibir os produtos
function carregarProdutos() {
  axios.get('http://localhost:3000/produtos')
    .then(response => {
      const produtos = response.data;

      // Seleciona o corpo da tabela onde os dados serão inseridos
      const tbody = document.querySelector('#tabela-cupomList tbody');

      // Limpa o conteúdo anterior da tabela (caso já tenha sido carregado antes)
      tbody.innerHTML = '';

      // Itera sobre cada produto e cria uma linha na tabela
      produtos.forEach(produto => {
        const tr = document.createElement('tr');

        // Cria e adiciona cada célula da linha com segurança
        tr.appendChild(criarCelula(produto.id));
        tr.appendChild(criarCelula(produto.produto));
        tr.appendChild(criarCelula(produto.qtdPP));
        tr.appendChild(criarCelula(produto.qtdPG));
        tr.appendChild(criarCelula(produto.pesoPP));
        tr.appendChild(criarCelula(produto.pesoPG));
        tr.appendChild(criarCelula(produto.cubagemPP));
        tr.appendChild(criarCelula(produto.cubagemPG));
        tr.appendChild(criarCelula(produto.volumePP));
        tr.appendChild(criarCelula(produto.volumePG));
        tr.appendChild(criarCelula(produto.custoUnit));

        // Adiciona a linha completa ao corpo da tabela
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao buscar produtos: ' + error.message);
    });
}

// Função auxiliar para criar uma célula de tabela com conteúdo seguro
function criarCelula(conteudo) {
  const td = document.createElement('td');
  td.textContent = conteudo ?? ''; // Usa valor vazio se for null/undefined
  return td;
}

// Chama a função ao carregar a página
window.addEventListener('DOMContentLoaded', carregarProdutos);
