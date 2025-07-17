let produtos = [];
let produtosEditandoId = null;

function abrirCadastro() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  limparCampos();
}

function addEntry() {
  const produto = document.getElementById("produto").value;
  const qtdPP = document.getElementById("qtdPP").value;
  const qtdPG = document.getElementById("qtdPG").value;
  const pesoPP = document.getElementById("pesoPP").value;
  const pesoPG = document.getElementById("pesoPG").value;
  const cubagemPP = document.getElementById("cubagemPP").value;
  const cubagemPG = document.getElementById("cubagemPG").value;
  const volumePP = document.getElementById("volumePP").value;
  const volumePG = document.getElementById("volumePG").value;
  const custoUnit = document.getElementById("custoUnit").value;

  if (!produto) {
    alert("Preencha o campo Produto.");
    return;
  }

  // Verifica duplicidade (exceto se for edição do mesmo produto)
  const produtoExistente = produtos.find(
    (p) => p.produto === produto && p.id !== produtosEditandoId
  );
  if (produtoExistente) {
    alert("Produto já foi cadastrado!");
    return;
  }

  const data = {
    id: produtosEditandoId || Date.now().toString(),
    produto,
    qtdPP,
    qtdPG,
    pesoPP,
    pesoPG,
    cubagemPP,
    cubagemPG,
    volumePP,
    volumePG,
    custoUnit,
  };

  if (produtosEditandoId) {
    const idx = produtos.findIndex((p) => p.id === produtosEditandoId);
    if (idx !== -1) produtos[idx] = data;
    produtosEditandoId = null;
  } else {
    produtos.push(data);
  }
  salvarLocalStorage();
  closeModal();
  atualizarTabela();
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela-cupomList");
  tabela.innerHTML = "";
  const filtroInput = document.getElementById("filtroProduto");
  let filtro = filtroInput ? filtroInput.value.trim().toLowerCase() : "";

  let produtosFiltrados = produtos;
  if (filtro) {
    produtosFiltrados = produtos.filter(
      (item) =>
        (item.produto && item.produto.toLowerCase().includes(filtro)) ||
        (item.id && item.id.toLowerCase().includes(filtro))
    );
  }

  produtosFiltrados.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.produto}</td>
      <td>${item.qtdPP || ""}</td>
      <td>${item.qtdPG || ""}</td>
      <td>${item.pesoPP || ""}</td>
      <td>${item.pesoPG || ""}</td>
      <td>${item.cubagemPP || ""}</td>
      <td>${item.cubagemPG || ""}</td>
      <td>${item.volumePP || ""}</td>
      <td>${item.volumePG || ""}</td>
      <td>${item.custoUnit || ""}</td>
      <td>
        <span class="acoes-container">
          <button class="btn-acao" title="Editar" onclick="editarProduto('${
            item.id
          }')">✏️</button>
          <button class="btn-acao btn-excluir" title="Excluir" onclick="excluirProduto('${
            item.id
          }')">🗑️</button>
        </span>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

function excluirProduto(id) {
  produtos = produtos.filter((item) => item.id !== id);
  salvarLocalStorage();
  atualizarTabela();
}

function editarProduto(id) {
  const item = produtos.find((p) => p.id === id);
  if (!item) return;
  document.getElementById("produto").value = item.produto;
  document.getElementById("qtdPP").value = item.qtdPP || "";
  document.getElementById("qtdPG").value = item.qtdPG || "";
  document.getElementById("pesoPP").value = item.pesoPP || "";
  document.getElementById("pesoPG").value = item.pesoPG || "";
  document.getElementById("cubagemPP").value = item.cubagemPP || "";
  document.getElementById("cubagemPG").value = item.cubagemPG || "";
  document.getElementById("volumePP").value = item.volumePP || "";
  document.getElementById("volumePG").value = item.volumePG || "";
  document.getElementById("custoUnit").value = item.custoUnit || "";
  produtosEditandoId = id;
  abrirCadastro();
}

function limparCampos() {
  document.getElementById("produto").value = "";
  document.getElementById("qtdPP").value = "";
  document.getElementById("qtdPG").value = "";
  document.getElementById("pesoPP").value = "";
  document.getElementById("pesoPG").value = "";
  document.getElementById("cubagemPP").value = "";
  document.getElementById("cubagemPG").value = "";
  document.getElementById("volumePP").value = "";
  document.getElementById("volumePG").value = "";
  document.getElementById("custoUnit").value = "";
  produtosEditandoId = null;
}

function salvarLocalStorage() {
  localStorage.setItem("produtosCadastro", JSON.stringify(produtos));
}

function carregarLocalStorage() {
  const dadosSalvos = localStorage.getItem("produtosCadastro");

  if (dadosSalvos) {
    produtos = JSON.parse(dadosSalvos);
  }

  atualizarTabela();
}

function filtrarTabela() {
  atualizarTabela();
}

function limparFiltro() {
  const filtroInput = document.getElementById("filtroProduto");
  if (filtroInput) filtroInput.value = "";
  atualizarTabela();
}

function restaurarDadosOriginais() {
  localStorage.removeItem("produtosCadastro");
  produtos = [];
  salvarLocalStorage();
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
    return cells.slice(0, 11).map((cell) => cell.textContent);
  });
  const ws = XLSX.utils.aoa_to_sheet([
    [
      "ID",
      "Produto",
      "Qtd PP",
      "Qtd PG",
      "Peso PP",
      "Peso PG",
      "Cubagem PP",
      "Cubagem PG",
      "Volume PP",
      "Volume PG",
      "Custo Unit",
    ],
    ...rows,
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Produtos");
  const dataAtual = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
  XLSX.writeFile(wb, `Produtos_Cadastrados_${dataAtual}.xlsx`);
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

document.addEventListener("DOMContentLoaded", function () {
  const produtoInput = document.getElementById("produto");
  if (produtoInput) {
    produtoInput.addEventListener("input", function (e) {
      // Permite letras, números, espaços, hífen e parênteses, e converte para maiúsculo
      let value = e.target.value
        .normalize("NFD")
        .replace(/[^\p{L}\p{N}\s\-\(\)]/gu, "");
      e.target.value = value.toUpperCase();
    });
  }
  carregarLocalStorage();
});

window.onload = function () {
  makeModalDraggable();
  // Corrigir o botão principal da página
  const botaoPrincipal = document.querySelector(".tabela-cadastro button");
  botaoPrincipal.onclick = abrirCadastro;
};

