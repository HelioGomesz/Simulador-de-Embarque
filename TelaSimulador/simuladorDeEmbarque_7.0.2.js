let selectedCube = null; // variável para cubo selecionado
let totalQuantidade = 0; // variável para quantidade total
let totalPeso = 0; // variável para peso total
let totalValor = 0; // variável para valor total
let cubagemTotal = 73.28; // variável para cubagem total
let cubagemOcupada = 0; //  variável para cubagem ocupada
let markUp = []; // variável para markUp
let totalVolume = 0;

// ===== MULTI-SELEÇÃO DE CUBOS =====
let selectedCubes = []; // variável para cubos selecionados

let produtos = {};

// ===Função para carregar produtos do backend e montar o objeto produtos===
async function carregarProdutosBackend() {
  try {
    const response = await axios.get("http://localhost:3000/produtos");
    // Monta o objeto produtos no formato esperado pelo simulador
    produtos = {};
    response.data.forEach((item) => {
      // Garante que cada produto tem estrutura PP e PG
      if (!produtos[item.produto]) produtos[item.produto] = { PP: {}, PG: {} };
      produtos[item.produto].PP = {
        quantidade: parseFloat(item.qtdPP) || 0,
        peso: parseFloat(item.pesoPP) || 0,
        cubagem: parseFloat(item.cubagemPP) || 0,
        precoUnitario: parseFloat(item.custoUnit) || 0,
        padraoCx: parseFloat(item.padraoCX) || 1,
      };
      produtos[item.produto].PG = {
        quantidade: parseFloat(item.qtdPG) || 0,
        peso: parseFloat(item.pesoPG) || 0,
        cubagem: parseFloat(item.cubagemPG) || 0,
        precoUnitario: parseFloat(item.custoUnit) || 0,
        padraoCx: parseFloat(item.padraoCX) || 1,
      };
    });
    atualizarSelectProdutos();
  } catch (error) {
    alert("Erro ao carregar produtos do backend: " + error.message);
  }
}

// ===Função para atualizar o select de produtos do modal===
function atualizarSelectProdutos() {
  const select = document.getElementById("produto");
  if (!select) return;
  // Salva o valor selecionado para manter após atualização
  const valorSelecionado = select.value;
  select.innerHTML =
    '<option value="" disabled selected>Selecione um produto</option>';
  Object.keys(produtos).forEach((codigo) => {
    const option = document.createElement("option");
    option.value = codigo;
    option.textContent = codigo;
    select.appendChild(option);
  });
  // Restaura seleção se possível
  if (produtos[valorSelecionado]) select.value = valorSelecionado;
}

// Chamar o carregamento dos produtos ao iniciar
window.addEventListener("DOMContentLoaded", carregarProdutosBackend);

// ===Função para formatar valores em reais===
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// ===Função para obter o prefixo do produto (ex: LM0001, LM0006, etc.)===
function getProdutoPrefix(produto) {
  return produto.split("-")[0];
}

// ===Função para verificar se produtos são da mesma família===
function isSameProductFamily(produto1, produto2) {
  return getProdutoPrefix(produto1) === getProdutoPrefix(produto2);
}

// ===Função para calcular a quantidade total de produtos da mesma família no cubo===
function getTotalQuantitySameFamily(cube, produto) {
  const produtoPrefix = getProdutoPrefix(produto);
  const existingProducts = cube.querySelectorAll(".produto-bloco");
  let totalQuantity = 0;

  existingProducts.forEach((bloco) => {
    const existingProduto = bloco.getAttribute("data-categoria");
    if (isSameProductFamily(existingProduto, produto)) {
      const quantidade = parseInt(
        bloco.querySelector(".quantidade-cubo").textContent
      );
      totalQuantity += quantidade;
    }
  });

  return totalQuantity;
}

// ===Função para obter a quantidade máxima permitida para o tipo de pallet===
function getMaxQuantityForPallet(cubeId) {
  const isPequeno = cubeId.startsWith("P");
  return isPequeno ? 1000 : 2000; // Limite baseado no tipo de pallet
}

// ===Adiciona/remover seleção visual e gerencia array de seleção===
function toggleCubeSelection(cube) {
  const idx = selectedCubes.indexOf(cube);
  if (idx === -1) {
    selectedCubes.push(cube);
    cube.classList.add("selecionado");
  } else {
    selectedCubes.splice(idx, 1);
    cube.classList.remove("selecionado");
  }
  updateAddProductButton();
  atualizarMensagemModal();
}

// ===Atualiza visibilidade do botão flutuante de adicionar produto===
function updateAddProductButton() {
  let btn = document.getElementById("multiAddBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "multiAddBtn";
    btn.className = "floating-multiadd-btn";
    btn.title = "Adicionar Produto nos Pallets Selecionados";
    btn.innerHTML =
      '<span style="font-size:1.7rem;line-height:1;display:flex;align-items:center;justify-content:center;">&#10133;</span>';
    btn.onclick = showMultiAddModal;
    document.body.appendChild(btn);
  }
  btn.style.display = selectedCubes.length > 0 ? "block" : "none";

  // Atualizar botão de unificação
  updateUnifyButton();
}

// ===Verifica se pode unificar e atualiza o botão de unificação===
function updateUnifyButton() {
  let unifyBtn = document.getElementById("unifyBtn");
  if (!unifyBtn) {
    unifyBtn = document.createElement("button");
    unifyBtn.id = "unifyBtn";
    unifyBtn.className = "floating-unify-btn";
    unifyBtn.title = "Unificar Pallet (Produtos Especiais)";
    unifyBtn.innerHTML =
      '<span style="font-size:1.7rem;line-height:1;display:flex;align-items:center;justify-content:center;">🔗</span>';
    unifyBtn.onclick = showUnifyModal;
    document.body.appendChild(unifyBtn);
  }

  // Mostrar se há pelo menos 1 pallet pequeno selecionado, todos aptos para unificação
  const palletsPequenos = selectedCubes.filter((cube) =>
    cube.getAttribute("id").startsWith("P")
  );
  const canUnify =
    palletsPequenos.length > 0 &&
    palletsPequenos.every(
      (cube) => !cube.hasAttribute("data-tipo") && isPalletGrandeVazio(cube)
    );

  unifyBtn.style.display = canUnify ? "block" : "none";
}

// ===Verifica se o pallet grande correspondente está vazio===
function isPalletGrandeVazio(palletPequeno) {
  const idPalletPequeno = palletPequeno.getAttribute("id");
  const numeroPallet = parseInt(idPalletPequeno.substring(1));
  const palletGrande = document.getElementById(`G${numeroPallet + 1}`);

  return (
    palletGrande &&
    !palletGrande.hasAttribute("data-tipo") &&
    !palletGrande.classList.contains("absorvido-permanente")
  );
}

// ===Mostra o modal de unificação com produtos especiais===
function showUnifyModal() {
  document.getElementById("modal").style.display = "block";

  // Selecionar automaticamente o primeiro produto especial
  const produtoSelect = document.getElementById("produto");
  produtoSelect.value = "LM0008-20000840";

  // Preencher valores padrões SOMADOS para unificação
  const dadosProduto = produtos["LM0008-20000840"];
  if (dadosProduto) {
    const quantidadeUnificada =
      (dadosProduto.PP.quantidade || 0) + (dadosProduto.PG.quantidade || 0);
    document.getElementById("quantidade").value = quantidadeUnificada;
    document.getElementById("peso").value = (
      (dadosProduto.PP.peso || 0) + (dadosProduto.PG.peso || 0)
    ).toFixed(2);
  } else {
    document.getElementById("quantidade").value = "";
    document.getElementById("peso").value = "";
  }

  // Adicionar mensagem especial no modal
  const dicaDiv = document.querySelector(
    '.modal-content div[style*="background-color: #e3f2fd"]'
  );
  if (dicaDiv) {
    dicaDiv.innerHTML +=
      "<br />🎯 <strong>Modo Unificação:</strong> Produto especial selecionado automaticamente!";
  }

  document.getElementById("limite-indicador").style.display = "none";
  atualizarMensagemModal();
}

// ===Mostra o modal de adicionar produto para múltiplos cubos===
function showMultiAddModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("limite-indicador").style.display = "none";
  atualizarMensagemModal();
}

// ===Atualiza os campos do modal com valores padrões do produto conforme o tipo do primeiro cubo selecionado
function preencherValoresPadraoModal(produtoSelecionado) {
  if (!produtoSelecionado || !selectedCubes.length) return;
  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) {
    document.getElementById("quantidade").value = "";
    document.getElementById("peso").value = "";
    return;
  }
  // Usa o tipo do primeiro cubo selecionado
  const idCube = selectedCubes[0].getAttribute("id");
  const isPequeno = idCube.startsWith("P");
  if (isPequeno) {
    document.getElementById("quantidade").value = dadosProduto.PP.quantidade;
    document.getElementById("peso").value = dadosProduto.PP.peso;
  } else {
    document.getElementById("quantidade").value = dadosProduto.PG.quantidade;
    document.getElementById("peso").value = dadosProduto.PG.peso;
  }
}

// Ao abrir o modal, se já houver produto selecionado, preencher valores padrões
const originalShowMultiAddModal = showMultiAddModal;
showMultiAddModal = function () {
  originalShowMultiAddModal();
  const produtoSelecionado = document.getElementById("produto").value;
  if (produtoSelecionado) {
    preencherValoresPadraoModal(produtoSelecionado);
  }
  atualizarMensagemModal();
};

// Atualizar evento de troca de produto para múltiplos cubos
const produtoSelect = document.getElementById("produto");
produtoSelect.addEventListener("change", function () {
  const produtoSelecionado = this.value;
  if (!produtoSelecionado || !selectedCubes.length) return;
  preencherValoresPadraoModal(produtoSelecionado);
  // Verificar limite após selecionar produto
  verificarLimiteModal();
  atualizarMensagemModal();
});

// Clique nos cubos: seleção múltipla
// Remove o listener antigo e adiciona o novo
const allCubes = document.querySelectorAll(".cube");
allCubes.forEach((cube) => {
  const newCube = cube.cloneNode(true);
  cube.parentNode.replaceChild(newCube, cube);
});
document.querySelectorAll(".cube").forEach((cube) => {
  cube.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleCubeSelection(this);
  });
});

// CSS para seleção visual
(function addSelecionadoCSS() {
  const style = document.createElement("style");
  style.innerHTML = `
    .cube.selecionado { 
      border: 3px solid #1976d2 !important; 
      box-shadow: 0 0 12px #1976d2 !important; 
    }
    .floating-multiadd-btn { 
      position: fixed; 
      right: 32px; 
      bottom: 170px; 
      z-index: 2000; 
      width: 56px; 
      height: 56px; 
      border-radius: 50%; 
      background-color: #1976d2; 
      color: #fff; 
      border: none; 
      box-shadow: 0 4px 16px rgba(0,0,0,0.18); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-size: 2rem; 
      cursor: pointer; 
      transition: background 0.2s, box-shadow 0.2s, transform 0.2s; 
    } 
    .floating-multiadd-btn:hover { 
      background-color: #0d47a1; 
      box-shadow: 0 8px 24px rgba(0,0,0,0.22); 
      transform: scale(1.08); 
    }
    .floating-unify-btn { 
      position: fixed; 
      right: 32px; 
      bottom: 240px; 
      z-index: 2000; 
      width: 56px; 
      height: 56px; 
      border-radius: 50%; 
      background-color: #ff9800; 
      color: #fff; 
      border: none; 
      box-shadow: 0 4px 16px rgba(0,0,0,0.18); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-size: 2rem; 
      cursor: pointer; 
      transition: background 0.2s, box-shadow 0.2s, transform 0.2s; 
    } 
    .floating-unify-btn:hover { 
      background-color: #f57c00; 
      box-shadow: 0 8px 24px rgba(0,0,0,0.22); 
      transform: scale(1.08); 
    }
  `;
  document.head.appendChild(style);
})();

// ===Fecha modal e limpa seleção múltipla===
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("limite-indicador").style.display = "none";
  clearCubeSelection();
}

function clearCubeSelection() {
  selectedCubes.forEach((cube) => cube.classList.remove("selecionado"));
  selectedCubes = [];
  updateAddProductButton();
}

// Inserir dados automáticos no form (Modal) conforme produto selecionado
document.getElementById("produto").addEventListener("change", function () {
  const produtoSelecionado = this.value;
  if (!produtoSelecionado || !selectedCubes.length) return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) {
    alert("Produto não cadastrado na base!");
    document.getElementById("quantidade").value = "";
    document.getElementById("peso").value = "";
    return;
  }

  // Usar o primeiro cubo selecionado como referência
  const idCube = selectedCubes[0].getAttribute("id");
  const isPequeno = idCube.startsWith("P");

  if (isPequeno) {
    document.getElementById("quantidade").value = dadosProduto.PP.quantidade;
    document.getElementById("peso").value = dadosProduto.PP.peso;
  } else {
    document.getElementById("quantidade").value = dadosProduto.PG.quantidade;
    document.getElementById("peso").value = dadosProduto.PG.peso;
  }

  // Verificar limite após selecionar produto
  verificarLimiteModal();
  atualizarMensagemModal();
});

// Recalcular peso automaticamente quando quantidade for alterada
document.getElementById("quantidade").addEventListener("input", function () {
  const produtoSelecionado = document.getElementById("produto").value;
  const novaQuantidade = parseFloat(this.value);

  if (!produtoSelecionado || isNaN(novaQuantidade) || !selectedCubes.length)
    return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  // Para todos os cubos selecionados, calcular e atualizar o peso
  selectedCubes.forEach((cube) => {
    const idCube = cube.getAttribute("id");
    const isPequeno = idCube.startsWith("P");
    const dadosReferencia = isPequeno ? dadosProduto.PP : dadosProduto.PG;
    const quantidadeReferencia = dadosReferencia.quantidade;
    const pesoReferencia = dadosReferencia.peso;
    // Adicionar efeito visual
    const pesoField = document.getElementById("peso");
    pesoField.classList.add("calculando");
    // Calcular novo peso usando regra de três
    const novoPeso = (novaQuantidade * pesoReferencia) / quantidadeReferencia;
    // Atualizar campo de peso
    pesoField.value = novoPeso.toFixed(2);
    setTimeout(() => {
      pesoField.classList.remove("calculando");
    }, 300);
  });

  // Verificar limite após alterar quantidade
  verificarLimiteModal();
  atualizarMensagemModal();
});

// Recalcular quantidade automaticamente quando peso for alterado
document.getElementById("peso").addEventListener("input", function () {
  const produtoSelecionado = document.getElementById("produto").value;
  const novoPeso = parseFloat(this.value);

  if (!produtoSelecionado || isNaN(novoPeso) || !selectedCubes.length) return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  // Para todos os cubos selecionados, calcular e atualizar a quantidade
  selectedCubes.forEach((cube) => {
    const idCube = cube.getAttribute("id");
    const isPequeno = idCube.startsWith("P");
    const dadosReferencia = isPequeno ? dadosProduto.PP : dadosProduto.PG;
    const quantidadeReferencia = dadosReferencia.quantidade;
    const pesoReferencia = dadosReferencia.peso;
    // Adicionar efeito visual
    const quantidadeField = document.getElementById("quantidade");
    quantidadeField.classList.add("calculando");
    // Calcular nova quantidade usando regra de três
    const novaQuantidade = (novoPeso * quantidadeReferencia) / pesoReferencia;
    // Atualizar campo de quantidade
    quantidadeField.value = Math.round(novaQuantidade);
    setTimeout(() => {
      quantidadeField.classList.remove("calculando");
    }, 300);
  });

  // Verificar limite após alterar peso
  verificarLimiteModal();
  atualizarMensagemModal();
});

// ===Adapta addEntry para múltiplos cubos===
function addEntry() {
  const produto = document.getElementById("produto").value;
  const quantidadeInput = document.getElementById("quantidade").value;
  const pesoInput = document.getElementById("peso").value;
  const quantidade = parseFloat(quantidadeInput);
  const peso = parseFloat(pesoInput);

  if (!selectedCubes.length) {
    alert("Selecione pelo menos um pallet.");
    return;
  }
  if (isNaN(quantidade) || isNaN(peso)) {
    alert("Preencha quantidade e peso.");
    return;
  }

  // Se for produto especial, permitir multiseleção para unificação
  if (isProdutoEspecial(produto)) {
    // Para compatibilidade, setar window.selectedCubes
    window.selectedCubes = selectedCubes;
    unificarPalletsFisicamente(produto, quantidade, peso);
    // Exibir alerta de confirmação apenas uma vez para toda a operação
    alert(
      `Produto ${produto} unificado com pallet existente!\nQuantidade total atualizada.`
    );
    closeModal();
    return;
  }

  // Se apenas 1 cubo está selecionado, lógica normal
  if (selectedCubes.length === 1) {
    const cube = selectedCubes[0];
    window.selectedCube = cube; // para compatibilidade com funções existentes

    // Verificar se é um produto especial que deve ser unificado (caso já exista)
    if (unificarPalletsEspeciais(produto, quantidade, peso)) {
      // Alerta removido para evitar múltiplas confirmações
      closeModal();
      return;
    }

    // LÓGICA PARA 1 CUBO: Usar valores inseridos pelo usuário e calcular automaticamente
    const idCube = cube.getAttribute("id");
    const categoria = produto;
    const isPequeno = idCube.startsWith("P");
    const tipoPallet = isPequeno ? "PP" : "PG";
    cube.setAttribute("data-tipo", tipoPallet);

    // Usar os valores inseridos pelo usuário (quantidade e peso do modal)
    const quantidadeExibir = quantidade;
    const pesoExibir = peso;

    // Calcular cubagem proporcional usando regra de três
    let cubagemProduto = 0;
    if (produtos[produto]) {
      const dadosReferencia = isPequeno
        ? produtos[produto].PP
        : produtos[produto].PG;
      const quantidadeReferencia = dadosReferencia.quantidade;
      const cubagemReferencia = dadosReferencia.cubagem;

      // Regra de três: se quantidadeReferencia = cubagemReferencia, então quantidade = ?
      cubagemProduto = (quantidade * cubagemReferencia) / quantidadeReferencia;
    }

    // Criar bloco de produto
    const bloco = document.createElement("div");
    bloco.className = "produto-bloco";
    bloco.setAttribute("data-categoria", categoria);
    bloco.innerHTML = `<div>${produto}</div><div class="quantidade-cubo">${quantidadeExibir}</div>`;

    // Adicionar indicador de tipo de pallet se não existir
    if (!cube.querySelector(".tipo-pallet")) {
      const tipoIndicator = document.createElement("div");
      tipoIndicator.className = "tipo-pallet";
      tipoIndicator.textContent = tipoPallet;
      cube.appendChild(tipoIndicator);
    }

    cube.appendChild(bloco);
    atualizarContadorProdutos(cube);

    // Adicionar à tabela
    const table = document.getElementById("tabela-cupomList");
    const row = table.insertRow();
    row.setAttribute("data-id", idCube);
    row.setAttribute("data-produto", produto);
    row.classList.add("ativo");

    // Calcular valor do produto
    let valorProduto = 0;
    if (produtos[produto]) {
      const precoUnitario = isPequeno
        ? produtos[produto].PP.precoUnitario
        : produtos[produto].PG.precoUnitario;
      valorProduto = quantidadeExibir * precoUnitario;
    }

    row.innerHTML = `<td>${idCube}</td><td>${produto}</td><td>${quantidadeExibir}</td><td>${pesoExibir.toFixed(
      2
    )}</td><td>${formatarMoeda(
      valorProduto
    )}</td><td><button onclick="removeEntry(this)">Excluir</button></td>`;

    totalQuantidade += quantidadeExibir;
    totalPeso += pesoExibir;
    totalValor += valorProduto; // NOVO: adicionar ao valor total
    document.getElementById("Quantidade-container").innerText =
      totalQuantidade.toFixed(2);
    document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
    atualizarValorTotalComOuSemMarkup();

    // Adicionar cubagem calculada
    cubagemOcupada += cubagemProduto;
    const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
    document.getElementById("ocupacao-container").innerText =
      ocupacao.toFixed(2) + "%";

    // Calcular e atualizar volume total
    let padraoCx = 1;
    if (produtos[produto]) {
      padraoCx = isPequeno
        ? produtos[produto].PP.padraoCx
        : produtos[produto].PG.padraoCx;
    }
    const volumeProduto = Math.ceil(quantidadeExibir / padraoCx);
    totalVolume += volumeProduto;
    document.getElementById("volumeTotal-container").innerText =
      totalVolume.toFixed(2);

    closeModal();
    return;
  }

  // LÓGICA PARA MÚLTIPLOS CUBOS: Usar os valores informados pelo usuário para cada cubo
  selectedCubes.forEach((cube) => {
    const idCube = cube.getAttribute("id");
    const categoria = produto;
    const isPequeno = idCube.startsWith("P");
    const tipoPallet = isPequeno ? "PP" : "PG";
    cube.setAttribute("data-tipo", tipoPallet);

    // Usar os valores informados pelo usuário (quantidade e peso do modal)
    const quantidadeExibir = quantidade;
    const pesoExibir = peso;

    // Criar bloco de produto
    const bloco = document.createElement("div");
    bloco.className = "produto-bloco";
    bloco.setAttribute("data-categoria", categoria);
    bloco.innerHTML = `<div>${produto}</div><div class="quantidade-cubo">${quantidadeExibir}</div>`;

    // Adicionar indicador de tipo de pallet se não existir
    if (!cube.querySelector(".tipo-pallet")) {
      const tipoIndicator = document.createElement("div");
      tipoIndicator.className = "tipo-pallet";
      tipoIndicator.textContent = tipoPallet;
      cube.appendChild(tipoIndicator);
    }

    cube.appendChild(bloco);
    atualizarContadorProdutos(cube);

    // Adicionar à tabela
    const table = document.getElementById("tabela-cupomList");
    const row = table.insertRow();
    row.setAttribute("data-id", idCube);
    row.setAttribute("data-produto", produto);
    row.classList.add("ativo");

    // Calcular valor do produto
    let valorProduto = 0;
    if (produtos[produto]) {
      const precoUnitario = isPequeno
        ? produtos[produto].PP.precoUnitario
        : produtos[produto].PG.precoUnitario;
      valorProduto = quantidadeExibir * precoUnitario;
    }

    row.innerHTML = `<td>${idCube}</td><td>${produto}</td><td>${quantidadeExibir}</td><td>${pesoExibir.toFixed(
      2
    )}</td><td>${formatarMoeda(
      valorProduto
    )}</td><td><button onclick="removeEntry(this)">Excluir</button></td>`;

    totalQuantidade += quantidadeExibir;
    totalPeso += pesoExibir;
    totalValor += valorProduto; // adicionar ao valor total
    document.getElementById("Quantidade-container").innerText =
      totalQuantidade.toFixed(2);
    document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
    atualizarValorTotalComOuSemMarkup();

    // Cubagem correta por produto e tipo de pallet
    let cubagemProduto = 0;
    if (produtos[produto]) {
      // Proporcional à quantidade informada
      const dadosReferencia = isPequeno
        ? produtos[produto].PP
        : produtos[produto].PG;
      const quantidadeReferencia = dadosReferencia.quantidade;
      const cubagemReferencia = dadosReferencia.cubagem;
      cubagemProduto =
        (quantidadeExibir * cubagemReferencia) / quantidadeReferencia;
      cubagemOcupada += cubagemProduto;
    }
    const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
    document.getElementById("ocupacao-container").innerText =
      ocupacao.toFixed(2) + "%";

    // Calcular e atualizar volume total
    let padraoCx = 1;
    if (produtos[produto]) {
      padraoCx = isPequeno
        ? produtos[produto].PP.padraoCx
        : produtos[produto].PG.padraoCx;
    }
    const volumeProduto = Math.ceil(quantidadeExibir / padraoCx);
    totalVolume += volumeProduto;
    document.getElementById("volumeTotal-container").innerText =
      totalVolume.toFixed(2);
  });

  closeModal();
}

function atualizarContadorProdutos(cube) {
  const produtosExistentes = cube.querySelectorAll(".produto-bloco").length;

  // Remover contador existente
  const contadorExistente = cube.querySelector(".contador-produtos");
  if (contadorExistente) {
    contadorExistente.remove();
  }

  // Adicionar novo contador
  if (produtosExistentes > 0) {
    const contador = document.createElement("div");
    contador.className = "contador-produtos";
    contador.textContent = `${produtosExistentes}/3`;
    cube.appendChild(contador);
  }

  // Atualizar indicador de quantidade vs limite
  atualizarIndicadorQuantidade(cube);

  // Adicionar/remover classe de cubo cheio
  if (produtosExistentes >= 3) {
    cube.classList.add("cheio");
  } else {
    cube.classList.remove("cheio");
  }
}

function atualizarIndicadorQuantidade(cube) {
  const existingProducts = cube.querySelectorAll(".produto-bloco");

  // Remover indicador existente
  const indicadorExistente = cube.querySelector(".quantidade-limite");
  if (indicadorExistente) {
    indicadorExistente.remove();
  }

  if (existingProducts.length > 0) {
    // Calcular quantidade total da mesma família
    const firstProduct = existingProducts[0].getAttribute("data-categoria");

    // Verificar se o produto existe na base de dados
    if (!firstProduct || !produtos[firstProduct]) {
      return;
    }

    const firstProductPrefix = firstProduct.split("-")[0];

    let totalQuantity = 0;
    existingProducts.forEach((bloco) => {
      const existingProduto = bloco.getAttribute("data-categoria");
      if (
        existingProduto &&
        existingProduto.split("-")[0] === firstProductPrefix
      ) {
        const quantidadeElement = bloco.querySelector(".quantidade-cubo");
        if (quantidadeElement) {
          const quantidade = parseInt(quantidadeElement.textContent);
          if (!isNaN(quantidade)) {
            totalQuantity += quantidade;
          }
        }
      }
    });

    // Obter o padrão de quantidade do primeiro produto
    const idCube = cube.getAttribute("id");
    const isPequeno = idCube.startsWith("P");
    const firstProductData = produtos[firstProduct];
    const padraoQuantidade = isPequeno
      ? firstProductData.PP.quantidade
      : firstProductData.PG.quantidade;

    // Criar indicador
    const indicador = document.createElement("div");
    indicador.className = "quantidade-limite";

    // Calcular o excedente ou restante
    const diferenca = totalQuantity - padraoQuantidade;

    if (diferenca > 0) {
      // Excedido
      indicador.textContent = `${totalQuantity}/${padraoQuantidade}`;
      indicador.classList.add("no-limite");
      indicador.title = `Padrão: ${padraoQuantidade} | Excedido: ${diferenca}`;
    } else if (diferenca === 0) {
      // No limite exato
      indicador.textContent = `${totalQuantity}/${padraoQuantidade}`;
      indicador.classList.add("no-limite");
      indicador.title = `Padrão: ${padraoQuantidade} | Limite atingido`;
    } else {
      // Dentro do limite
      const restante = Math.abs(diferenca);
      indicador.textContent = `${totalQuantity}/${padraoQuantidade}`;
      if (restante < padraoQuantidade * 0.1) {
        // Se restante for menos de 10% do padrão
        indicador.classList.add("proximo-limite");
      }
      indicador.title = `Padrão: ${padraoQuantidade} | Restante: ${restante}`;
    }

    cube.appendChild(indicador);
  }
}

function parseValorBRL(str) {
  // Remove R$, espaços, pontos de milhar e troca vírgula decimal por ponto
  return parseFloat(str.replace(/R\$|\s|\./g, "").replace(",", "."));
}

function removeEntry(button) {
  const row = button.parentElement.parentElement;
  const table = document.getElementById("tabela-cupomList");
  const idCube = row.getAttribute("data-id");
  const produto = row.getAttribute("data-produto");
  const quantidade = parseFloat(row.cells[2].innerText);
  const peso = parseFloat(row.cells[3].innerText);
  const valor = parseValorBRL(row.cells[4].innerText); // extrair valor

  table.deleteRow(row.rowIndex - 1);
  totalQuantidade -= quantidade;
  totalPeso -= peso;
  totalValor -= valor; // subtrair valor
  totalQuantidade = Math.max(0, totalQuantidade);
  totalPeso = Math.max(0, totalPeso);
  totalValor = Math.max(0, totalValor);

  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
  atualizarValorTotalComOuSemMarkup();

  // Subtrair cubagem do produto removido
  let cubagemProduto = 0;
  if (produtos[produto]) {
    const isPequeno = idCube.startsWith("P");
    cubagemProduto = isPequeno
      ? produtos[produto].PP.cubagem
      : produtos[produto].PG.cubagem;
    cubagemOcupada -= cubagemProduto;
  }

  const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
  document.getElementById("ocupacao-container").innerText =
    ocupacao.toFixed(2) + "%";

  // Subtrair volume do produto removido
  let padraoCx = 1;
  if (produtos[produto]) {
    const isPequeno = idCube.startsWith("P");
    padraoCx = isPequeno
      ? produtos[produto].PP.padraoCx
      : produtos[produto].PG.padraoCx;
  }
  const volumeRemover = Math.ceil(quantidade / padraoCx);
  totalVolume -= volumeRemover;
  totalVolume = Math.max(0, totalVolume);
  document.getElementById("volumeTotal-container").innerText =
    totalVolume.toFixed(2);

  // Remover o bloco de produto específico do cubo
  const cube = document.getElementById(idCube);
  const produtoBlocos = cube.querySelectorAll(".produto-bloco");

  // Encontrar e remover o bloco correspondente ao produto
  produtoBlocos.forEach((bloco) => {
    if (bloco.getAttribute("data-categoria") === produto) {
      bloco.remove();
    }
  });

  // Verificar se é um pallet unificado
  if (cube.hasAttribute("data-produto-especial")) {
    // Restaurar pallet grande absorvido
    const numeroPallet = idCube.substring(1); // Remove o "P" do início
    const palletGrande = document.getElementById(
      `G${parseInt(numeroPallet) + 1}`
    ); // G2, G4, G6, etc.

    if (palletGrande) {
      // Remover classes e estilos de absorção
      palletGrande.classList.remove("absorvido-permanente");
      palletGrande.style.opacity = "";
      palletGrande.style.pointerEvents = "";

      // Remover indicador de absorção
      const indicadorAbsorcao = palletGrande.querySelector(
        ".indicador-absorcao-permanente"
      );
      if (indicadorAbsorcao) {
        indicadorAbsorcao.remove();
      }
    }

    // Remover atributos de unificação do pallet pequeno
    cube.removeAttribute("data-produto-especial");
    cube.classList.remove("unificado-permanente");
    cube.classList.remove("unificado");

    // Remover indicadores de unificação
    const indicadorUnificacao = cube.querySelector(
      ".indicador-unificacao-permanente"
    );
    if (indicadorUnificacao) {
      indicadorUnificacao.remove();
    }

    const tipoPallet = cube.querySelector(".tipo-pallet.unificado");
    if (tipoPallet) {
      tipoPallet.remove();
    }
  }

  // Se não há mais produtos no cubo, restaurar estado inicial
  if (cube.querySelectorAll(".produto-bloco").length === 0) {
    cube.removeAttribute("data-tipo");
    cube.removeAttribute("data-categoria");
    cube.textContent = idCube;
    cube.classList.add("restaurado");
    setTimeout(() => cube.classList.remove("restaurado"), 500);
  } else {
    // Atualizar contador se ainda há produtos
    atualizarContadorProdutos(cube);
  }
}

// ===FUNÇÃO PARA PERMITIR ARRASTAR O FORMULÁRIO NA PAGINA COM O MOUSE===
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
// Inicia o comportamento de arrastar ao carregar a página
window.onload = makeModalDraggable;

// ===LIMPAR TODOS OS CUBOS===
function clearAll() {
  location.reload();
}

// ===FAZER DOWLOAD DA PAGINA DE SIMULAÇÃO===

function downloadPDF() {
  const element = document.querySelector("main");
  // Adiciona a data de impressão ao nome do arquivo
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dataStr = `${year}-${month}-${day}`;
  const opt = {
    margin: 0.3,
    filename: `SimuladorEmbarque_${dataStr}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: true, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
  };
  html2pdf().set(opt).from(element).save();
}

// ===Função para verificar limite em tempo real===
function verificarLimiteModal() {
  const produtoSelecionado = document.getElementById("produto").value;
  const quantidadeInput = document.getElementById("quantidade").value;
  const quantidade = parseFloat(quantidadeInput);
  const limiteIndicador = document.getElementById("limite-indicador");

  if (!produtoSelecionado || !selectedCubes.length) {
    limiteIndicador.style.display = "none";
    return;
  }

  // Se quantidade está vazia ou inválida, não mostrar indicador
  if (quantidadeInput === "" || isNaN(quantidade) || quantidade <= 0) {
    limiteIndicador.style.display = "none";
    return;
  }

  const existingProducts = selectedCubes[0].querySelectorAll(".produto-bloco");

  if (existingProducts.length > 0) {
    // Verificar se é da mesma família
    const firstProduct = existingProducts[0].getAttribute("data-categoria");
    const firstProductPrefix = firstProduct.split("-")[0];
    const newProductPrefix = produtoSelecionado.split("-")[0];

    if (firstProductPrefix === newProductPrefix) {
      // Calcular quantidade total existente
      let totalQuantitySameFamily = 0;
      existingProducts.forEach((bloco) => {
        const existingProduto = bloco.getAttribute("data-categoria");
        if (existingProduto.split("-")[0] === firstProductPrefix) {
          const quantidadeExistente = parseInt(
            bloco.querySelector(".quantidade-cubo").textContent
          );
          totalQuantitySameFamily += quantidadeExistente;
        }
      });

      // Obter padrão do primeiro produto
      const idCube = selectedCubes[0].getAttribute("id");
      const isPequeno = idCube.startsWith("P");
      const firstProductData = produtos[firstProduct];
      const padraoQuantidade = isPequeno
        ? firstProductData.PP.quantidade
        : firstProductData.PG.quantidade;

      // Calcular nova quantidade total
      const novaQuantidadeTotal = totalQuantitySameFamily + quantidade;

      if (novaQuantidadeTotal > padraoQuantidade) {
        const excedente = novaQuantidadeTotal - padraoQuantidade;
        const faltante = padraoQuantidade - totalQuantitySameFamily;
        limiteIndicador.style.display = "block";
        limiteIndicador.style.backgroundColor = "#ffebee";
        limiteIndicador.style.color = "#c62828";
        limiteIndicador.style.border = "1px solid #ef5350";
        limiteIndicador.innerHTML = `
                ⚠️ <strong>LIMITE EXCEDIDO!</strong><br>
                Padrão do primeiro produto: ${padraoQuantidade} unidades<br>
                Quantidade atual no pallet: ${totalQuantitySameFamily} unidades<br>
                Quantidade tentando adicionar: ${quantidade} unidades<br>
                <span style="color: #d32f2f; font-size: 14px;">EXCEDENTE: ${excedente} unidades</span><br>
                <span style="color: #1976d2; font-size: 14px;">FALTANTE PARA COMPLETAR: ${faltante} unidades</span>
              `;
      } else {
        const restante = padraoQuantidade - novaQuantidadeTotal;
        limiteIndicador.style.display = "block";
        limiteIndicador.style.backgroundColor = "#e8f5e8";
        limiteIndicador.style.color = "#2e7d32";
        limiteIndicador.style.border = "1px solid #4caf50";
        limiteIndicador.innerHTML = `
                ✅ <strong>DENTRO DO LIMITE</strong><br>
                Padrão do primeiro produto: ${padraoQuantidade} unidades<br>
                Quantidade atual no pallet: ${totalQuantitySameFamily} unidades<br>
                Quantidade tentando adicionar: ${quantidade} unidades<br>
                <span style="color: #388e3c; font-size: 14px;">RESTANTE: ${restante} unidades</span>
              `;
      }
    } else {
      limiteIndicador.style.display = "block";
      limiteIndicador.style.backgroundColor = "#fff3e0";
      limiteIndicador.style.color = "#ef6c00";
      limiteIndicador.style.border = "1px solid #ff9800";
      limiteIndicador.innerHTML = `
                ❌ <strong>FAMÍLIA DIFERENTE</strong><br>
                Este pallet já contém produtos da família ${firstProductPrefix}<br>
                Apenas produtos da mesma família são permitidos
            `;
    }
  } else {
    // Primeiro produto - mostrar padrão
    const idCube = selectedCubes[0].getAttribute("id");
    const isPequeno = idCube.startsWith("P");
    const produtoData = produtos[produtoSelecionado];
    const padraoQuantidade = isPequeno
      ? produtoData.PP.quantidade
      : produtoData.PG.quantidade;

    limiteIndicador.style.display = "block";
    limiteIndicador.style.backgroundColor = "#e3f2fd";
    limiteIndicador.style.color = "#1976d2";
    limiteIndicador.style.border = "1px solid #2196f3";
    limiteIndicador.innerHTML = `
            📊 <strong>PRIMEIRO PRODUTO</strong><br>
            Padrão estabelecido: ${padraoQuantidade} unidades<br>
            Este será o limite máximo para este pallet
          `;
  }
}

// ===Atualiza a mensagem informativa do modal baseada na seleção===
function atualizarMensagemModal() {
  const dicaDiv = document.querySelector(
    '.modal-content div[style*="background-color: #e3f2fd"]'
  );
  if (!dicaDiv) return;

  if (selectedCubes.length === 0) {
    dicaDiv.innerHTML = `
      💡 <strong>Dica:</strong> Selecione pelo menos um pallet para continuar.<br />
      📊 <strong>Limite:</strong> O padrão do primeiro produto define o limite máximo do pallet.<br />
      🔗 <strong>Unificação:</strong> Produtos LM0008-2000 e LM0012-2400 são automaticamente unificados com visual especial.
    `;
  } else if (selectedCubes.length === 1) {
    dicaDiv.innerHTML = `
      💡 <strong>Dica:</strong> Altere a quantidade ou peso - o outro campo será calculado automaticamente!<br />
      📊 <strong>Limite:</strong> O padrão do primeiro produto define o limite máximo do pallet.<br />
      🔗 <strong>Unificação:</strong> Produtos LM0008-2000 e LM0012-2400 são automaticamente unificados com visual especial.<br />
      ⚡ <strong>Cálculo Automático:</strong> ATIVO - valores personalizados permitidos.
    `;
  } else {
    dicaDiv.innerHTML = `
      💡 <strong>Dica:</strong> Para múltiplos pallets, os valores padrões serão usados automaticamente.<br />
      📊 <strong>Limite:</strong> O padrão do primeiro produto define o limite máximo do pallet.<br />
      🔗 <strong>Unificação:</strong> Produtos LM0008-2000 e LM0012-2400 são automaticamente unificados com visual especial.<br />
      ⚠️ <strong>Cálculo Automático:</strong> DESATIVADO - use valores padrões para consistência.
    `;
  }
}

let markupValue = null;

function toggleMarkupInput() {
  const ativar = document.getElementById("ativarMarkup").checked;
  if (ativar) {
    // Abrir modal para input do markup
    document.getElementById("modalMarkup").style.display = "block";
    document.getElementById("markupInputModal").value =
      markupValue !== null ? markupValue : "";
  } else {
    markupValue = null;
    atualizarValorTotalComOuSemMarkup();
  }
}

function confirmarMarkup() {
  const input = document.getElementById("markupInputModal");
  const valor = parseFloat(input.value);
  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor de markup válido (ex: 1.9)");
    input.focus();
    return;
  }
  markupValue = valor;
  document.getElementById("modalMarkup").style.display = "none";
  atualizarValorTotalComOuSemMarkup();
}

function cancelarMarkup() {
  document.getElementById("modalMarkup").style.display = "none";
  document.getElementById("ativarMarkup").checked = false;
  markupValue = null;
  atualizarValorTotalComOuSemMarkup();
}

function atualizarValorTotalComOuSemMarkup() {
  let valorExibir = totalValor || 0;
  if (document.getElementById("ativarMarkup").checked && markupValue !== null) {
    valorExibir = valorExibir * markupValue;
  }
  document.getElementById("valorTotal-container").innerText =
    formatarMoeda(valorExibir);
}
