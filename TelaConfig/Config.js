let listaProdutos = [];
let idCounter = 1;

function abrirCadastro() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  limparCampos();
}

function limparCampos() {
  document.getElementById("produto").value = "";
  document.getElementById("tamanhoPallet").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("cubagem").value = "";
}

function addEntry() {
  const produto = document.getElementById("produto").value;
  const tamanho = document.getElementById("tamanhoPallet").value;
  const quantidade = document.getElementById("quantidade").value;
  const peso = document.getElementById("peso").value;
  const cubagem = document.getElementById("cubagem").value;

  if (!produto || !quantidade || !peso || !cubagem) {
    alert("Preencha todos os campos.");
    return;
  }

  const id = idCounter++;
  listaProdutos.push({ id, produto, tamanho, quantidade, peso, cubagem });
  salvarLocalStorage();
  atualizarTabela();
  closeModal();
}

function atualizarTabela() {
  const filtroTexto = document
    .getElementById("filtroProduto")
    .value.toLowerCase();

  const tabela = document.getElementById("tabela-cupomList");
  tabela.innerHTML = "";
  let totalQuantidade = 0,
    totalPeso = 0,
    totalCubagem = 0;

  const filtrados = listaProdutos.filter((item) => {
    return !filtroTexto || item.produto.toLowerCase().includes(filtroTexto);
  });

  if (filtrados.length === 0 && filtroTexto) {
    alert("Produto não cadastrado");
  }

  filtrados.forEach((item) => {
    totalQuantidade += item.quantidade;
    totalPeso += item.peso;
    totalCubagem += item.cubagem;

    const tr = document.createElement("tr");
    tr.className = item.tamanho === "PP" ? "linha-pp" : "linha-pg";
    tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.tamanho}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>
            <td>${item.peso}</td>
            <td>${item.cubagem}</td>
            <td>
              <span class="acoes-container">
                <button class="btn-acao" title="Editar" onclick="editarProduto(${item.id})">✏️</button>
                <button class="btn-acao btn-excluir" title="Excluir" onclick="excluirProduto(${item.id})">🗑️</button>
              </span>
            </td>
          `;
    tabela.appendChild(tr);
  });
}

function excluirProduto(id) {
  listaProdutos = listaProdutos.filter((item) => item.id !== id);
  salvarLocalStorage();
  atualizarTabela();
}

function editarProduto(id) {
  const item = listaProdutos.find((p) => p.id === id);
  if (!item) return;

  document.getElementById("produto").value = item.produto;
  document.getElementById("tamanhoPallet").value = item.tamanho;
  document.getElementById("quantidade").value = item.quantidade;
  document.getElementById("peso").value = item.peso;
  document.getElementById("cubagem").value = item.cubagem;

  listaProdutos = listaProdutos.filter((p) => p.id !== id);
  salvarLocalStorage();
  abrirCadastro();
}

function salvarLocalStorage() {
  localStorage.setItem("produtosCadastro", JSON.stringify(listaProdutos));
  localStorage.setItem("contadorId", idCounter);
}

function carregarLocalStorage() {
  const dadosSalvos = localStorage.getItem("produtosCadastro");
  const contadorSalvo = localStorage.getItem("contadorId");

  if (dadosSalvos) {
    listaProdutos = JSON.parse(dadosSalvos);
  }

  if (contadorSalvo) {
    idCounter = parseInt(contadorSalvo);
  }

  atualizarTabela();
}

function filtrarTabela() {
  atualizarTabela();
}

function limparFiltro() {
  document.getElementById("filtroProduto").value = "";
  atualizarTabela();
}

function restaurarDadosOriginais() {
  localStorage.removeItem("produtosCadastro");
  localStorage.removeItem("contadorId");
  listaProdutos = [];
  idCounter = 1;
  atualizarTabela();
}

function confirmarResetarDados() {
  const resposta = confirm(
    "Tem certeza que deseja resetar? Você irá perder todos os dados já cadastrados!"
  );
  if (resposta) {
    restaurarDadosOriginais();
  }
}

function exportarParaExcel() {
  const tabela = document.getElementById("tabela-cupomList");
  const rows = Array.from(tabela.rows).map((row) => {
    const cells = Array.from(row.cells);
    return cells.slice(0, -1).map((cell) => cell.textContent);
  });
  const ws = XLSX.utils.aoa_to_sheet([
    ["ID", "Tamanho", "Produto", "Quantidade", "Peso (kg)", "Cubagem"],
    ...rows,
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Produtos");
  const dataAtual = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
  XLSX.writeFile(wb, `Produtos_Cadastrados ${dataAtual}.xlsx`);
}

//Função de arrastar o modal na tela

function makeModalDraggable() {
  const modal = document.getElementById("modal");
  const header = document.getElementById("modal-header");
  let offsetX = 0,
    offsetY = 0,
    mouseX = 0,
    mouseY = 0;

  header.onmousedown = function (event) {
    event.preventDefault();
    mouseX = event.clientX;
    mouseY = event.clientY;

    document.onmousemove = function (event) {
      offsetX = event.clientX - mouseX;
      offsetY = event.clientY - mouseY;
      modal.style.left = modal.offsetLeft + offsetX + "px";
      modal.style.top = modal.offsetTop + offsetY + "px";
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

window.onload = function () {
  makeModalDraggable();
  carregarLocalStorage();

  // Corrigir o botão principal da página
  const botaoPrincipal = document.querySelector(".tabela-cadastro button");
  botaoPrincipal.onclick = abrirCadastro;
};
