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
  const padraoCX = document.getElementById("padraoCX").value;
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
    produto,
    qtdPP,
    qtdPG,
    pesoPP,
    pesoPG,
    cubagemPP,
    cubagemPG,
    padraoCX: padraoCX ? parseFloat(padraoCX) : null,
    custoUnit: custoUnit ? parseFloat(custoUnit) : null,
  };

  // Se estiver editando, faz PUT no backend
  if (produtosEditandoId) {
    axios.put(`http://localhost:3000/produtos/${produtosEditandoId}`, data)
      .then(() => {
        produtosEditandoId = null;
        closeModal();
        carregarProdutosBackend(); // Atualiza a tabela
      })
      .catch((error) => {
        alert("Erro ao editar produto: " + error.message);
      });
    return;
  }

  // Inclusão via POST
  axios.post("http://localhost:3000/produtos", data)
    .then(() => {
      closeModal();
      carregarProdutosBackend(); // Atualiza a tabela com os dados do backend
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        alert("Erro: Produto já cadastrado no banco de dados!");
      } else {
        alert("Erro ao cadastrar produto: " + error.message);
      }
    });
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
      <td>${item.padraoCX || ""}</td>      
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

// Função para excluir produto usando o backend (DELETE)
function excluirProduto(id) {
  if (!confirm("Tem certeza que deseja excluir este produto?")) return;
  // Chama a API backend para deletar o produto
  axios.delete(`http://localhost:3000/produtos/${id}`)
    .then(() => {
      carregarProdutosBackend(); // Atualiza a tabela após exclusão
    })
    .catch((error) => {
      alert("Erro ao excluir produto: " + error.message);
    });
}

// Função para preparar a edição de um produto
function editarProduto(id) {
  // Busca o produto na lista local para preencher o formulário
  const item = produtos.find((p) => p.id === id);
  if (!item) return;
  document.getElementById("produto").value = item.produto;
  document.getElementById("qtdPP").value = item.qtdPP || "";
  document.getElementById("qtdPG").value = item.qtdPG || "";
  document.getElementById("pesoPP").value = item.pesoPP || "";
  document.getElementById("pesoPG").value = item.pesoPG || "";
  document.getElementById("cubagemPP").value = item.cubagemPP || "";
  document.getElementById("cubagemPG").value = item.cubagemPG || "";
  document.getElementById("padraoCX").value = item.padraoCX || "";
  document.getElementById("custoUnit").value = item.custoUnit || "";
  produtosEditandoId = id; // Marca o produto que está sendo editado
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
  document.getElementById("padraoCX").value = "";
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
      "Padrao CX",
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

// Adiciona função para buscar produtos do backend usando axios
async function carregarProdutosBackend() {
  try {
    const response = await axios.get("http://localhost:3000/produtos");
    produtos = response.data;
    atualizarTabela();
  } catch (error) {
    console.error("Erro ao buscar produtos do backend:", error);
    // fallback para localStorage se quiser
    // carregarLocalStorage();
  }
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
    // Integração do upload de Excel
    const formUpload = document.getElementById("form-upload");
    if (formUpload) {
      formUpload.addEventListener("submit", async function (e) {
        e.preventDefault();
        const inputFile = document.getElementById("excelFile");
        const resultadoDiv = document.getElementById("resultado-upload");
        resultadoDiv.textContent = "";
        if (!inputFile.files.length) {
          resultadoDiv.textContent = "Selecione um arquivo Excel.";
          resultadoDiv.style.color = "red";
          return;
        }
        const formData = new FormData();
        formData.append("excelFile", inputFile.files[0]);
        try {
          const response = await axios.post("http://localhost:3000/produtos/upload-excel", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data && typeof response.data.atualizados === "number") {
            resultadoDiv.textContent = `${response.data.atualizados} produtos atualizados com sucesso.`;
            resultadoDiv.style.color = "green";
            carregarProdutosBackend();
          } else {
            resultadoDiv.textContent = "Arquivo processado, mas nenhum produto foi atualizado.";
            resultadoDiv.style.color = "orange";
          }
        } catch (err) {
          resultadoDiv.textContent = "Erro ao processar o arquivo.";
          resultadoDiv.style.color = "red";
        }
      });
    }
  carregarLocalStorage();
});

// Modifica o carregamento inicial para usar o backend
window.onload = function () {
  makeModalDraggable();
  // Corrigir o botão 'Incluir' para abrir o modal corretamente
  const botaoIncluir = document.querySelector(".btn-Incluir");
  if (botaoIncluir) botaoIncluir.onclick = abrirCadastro;
  carregarProdutosBackend(); // <-- carrega do backend
};
