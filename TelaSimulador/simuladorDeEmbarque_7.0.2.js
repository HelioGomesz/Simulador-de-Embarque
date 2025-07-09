let selectedCube = null;
let totalQuantidade = 0;
let totalPeso = 0;
let totalValor = 0; // NOVO: variável para valor total
let cubagemTotal = 73.28;
let cubagemOcupada = 0; // NOVO

// ===== MULTI-SELEÇÃO DE CUBOS =====
let selectedCubes = [];

const produtos = {
  "LM0001-4000840": {
    PP: { quantidade: 248, peso: 332, cubagem: 2.86, precoUnitario: 12.5 },
    PG: { quantidade: 510, peso: 647, cubagem: 3.5, precoUnitario: 12.5 },
  },
  "LM0001-4000850": {
    PP: { quantidade: 248, peso: 332, cubagem: 2.86, precoUnitario: 13.2 },
    PG: { quantidade: 510, peso: 647, cubagem: 3.5, precoUnitario: 13.2 },
  },
  "LM0001-8000840": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86, precoUnitario: 15.8 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.5, precoUnitario: 15.8 },
  },
  "LM0001-8000850": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86, precoUnitario: 16.5 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.5, precoUnitario: 16.5 },
  },
  "LM0006-4000830": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86, precoUnitario: 18.9 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0, precoUnitario: 18.9 },
  },
  "LM0006-4000840": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86, precoUnitario: 19.6 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0, precoUnitario: 19.6 },
  },
  "LM0006-4000850": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86, precoUnitario: 20.3 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0, precoUnitario: 20.3 },
  },
  "LM0006-4000865": {
    PP: { quantidade: 160, peso: 160, cubagem: 2.86, precoUnitario: 21.0 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0, precoUnitario: 21.0 },
  },
  "LM0007-3200830": {
    PP: { quantidade: 384, peso: 359.8, cubagem: 2.5, precoUnitario: 22.5 },
    PG: { quantidade: 768, peso: 697, cubagem: 3.5, precoUnitario: 22.5 },
  },
  "LM0008-3500840": {
    PP: { quantidade: 528, peso: 288, cubagem: 2.86, precoUnitario: 25.4 },
    PG: { quantidade: 1056, peso: 559, cubagem: 3.8, precoUnitario: 25.4 },
  },
  "LM0008-3500850": {
    PP: { quantidade: 528, peso: 288, cubagem: 2.86, precoUnitario: 26.1 },
    PG: { quantidade: 1056, peso: 559, cubagem: 3.8, precoUnitario: 26.1 },
  },
  "LM0008-7000850": {
    PP: { quantidade: 384, peso: 359.8, cubagem: 2.86, precoUnitario: 28.7 },
    PG: { quantidade: 768, peso: 697, cubagem: 3.8, precoUnitario: 28.7 },
  },
  "LM0008-13000840": {
    PP: { quantidade: 296, peso: 364.4, cubagem: 2.86, precoUnitario: 31.2 },
    PG: { quantidade: 500, peso: 712, cubagem: 3.8, precoUnitario: 31.2 },
  },
  "LM0008-13000850": {
    PP: { quantidade: 296, peso: 364.4, cubagem: 2.86, precoUnitario: 31.9 },
    PG: { quantidade: 520, peso: 712, cubagem: 3.8, precoUnitario: 31.9 },
  },
  "LM0008-20000840": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86, precoUnitario: 35.6 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8, precoUnitario: 35.6 },
  },
  "LM0008-20000850": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86, precoUnitario: 36.3 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8, precoUnitario: 36.3 },
  },
  "LM0009-4000840": {
    PP: { quantidade: 256, peso: 288, cubagem: 2.86, precoUnitario: 38.9 },
    PG: { quantidade: 510, peso: 559, cubagem: 3.8, precoUnitario: 38.9 },
  },
  "LM0009-4000850": {
    PP: { quantidade: 256, peso: 288, cubagem: 2.86, precoUnitario: 39.6 },
    PG: { quantidade: 510, peso: 559, cubagem: 3.8, precoUnitario: 39.6 },
  },
  "LM0009-8000840": {
    PP: { quantidade: 224, peso: 288, cubagem: 2.86, precoUnitario: 42.2 },
    PG: { quantidade: 448, peso: 559, cubagem: 3.8, precoUnitario: 42.2 },
  },
  "LM0009-8000850": {
    PP: { quantidade: 224, peso: 288, cubagem: 2.86, precoUnitario: 42.9 },
    PG: { quantidade: 448, peso: 559, cubagem: 3.8, precoUnitario: 42.9 },
  },
  "LM0010-2000830": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86, precoUnitario: 45.5 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8, precoUnitario: 45.5 },
  },
  "LM0010-2000840": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86, precoUnitario: 46.2 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8, precoUnitario: 46.2 },
  },
  "LM0010-2000850": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86, precoUnitario: 46.9 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8, precoUnitario: 46.9 },
  },
  "LM0010-2000865": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86, precoUnitario: 47.6 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8, precoUnitario: 47.6 },
  },
  "LM0011-12000840": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86, precoUnitario: 50.3 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.8, precoUnitario: 50.3 },
  },
  "LM0011-12000850": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86, precoUnitario: 51.0 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.8, precoUnitario: 51.0 },
  },
  "LM0012-24000840": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86, precoUnitario: 55.8 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8, precoUnitario: 55.8 },
  },
  "LM0012-24000850": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86, precoUnitario: 56.5 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8, precoUnitario: 56.5 },
  },
};

// Função para formatar valores em reais
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Função para obter o prefixo do produto (ex: LM0001, LM0006, etc.)
function getProdutoPrefix(produto) {
  return produto.split("-")[0];
}

// Função para verificar se produtos são da mesma família
function isSameProductFamily(produto1, produto2) {
  return getProdutoPrefix(produto1) === getProdutoPrefix(produto2);
}

// Função para calcular a quantidade total de produtos da mesma família no cubo
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

// Função para obter a quantidade máxima permitida para o tipo de pallet
function getMaxQuantityForPallet(cubeId) {
  const isPequeno = cubeId.startsWith("P");
  return isPequeno ? 1000 : 2000; // Limite baseado no tipo de pallet
}

// Adiciona/remover seleção visual e gerencia array de seleção
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

// Atualiza visibilidade do botão flutuante de adicionar produto
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

// Verifica se pode unificar e atualiza o botão de unificação
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

  // Mostrar apenas se há exatamente 1 cubo pequeno selecionado e o par grande está vazio
  const canUnify =
    selectedCubes.length === 1 &&
    selectedCubes[0].getAttribute("id").startsWith("P") &&
    !selectedCubes[0].hasAttribute("data-tipo") &&
    isPalletGrandeVazio(selectedCubes[0]);

  unifyBtn.style.display = canUnify ? "block" : "none";
}

// Verifica se o pallet grande correspondente está vazio
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

// Mostra o modal de unificação com produtos especiais
function showUnifyModal() {
  document.getElementById("modal").style.display = "block";

  // Selecionar automaticamente o primeiro produto especial
  const produtoSelect = document.getElementById("produto");
  produtoSelect.value = "LM0008-20000840";

  // Preencher valores padrões
  preencherValoresPadraoModal("LM0008-20000840");

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

// Mostra o modal de adicionar produto para múltiplos cubos
function showMultiAddModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("limite-indicador").style.display = "none";
  atualizarMensagemModal();
}

// Atualiza os campos do modal com valores padrões do produto conforme o tipo do primeiro cubo selecionado
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

// Fecha modal e limpa seleção múltipla
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

  // Só permitir cálculo automático se houver apenas 1 cubo selecionado
  if (selectedCubes.length > 1) {
    return; // Para múltiplos cubos, não fazer cálculo automático
  }

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  const idCube = selectedCubes[0].getAttribute("id");
  const isPequeno = idCube.startsWith("P");

  // Obter dados de referência do produto
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

  // Remover efeito visual após um breve delay
  setTimeout(() => {
    pesoField.classList.remove("calculando");
  }, 300);

  // Verificar limite após alterar quantidade
  verificarLimiteModal();
  atualizarMensagemModal();
});

// Recalcular quantidade automaticamente quando peso for alterado
document.getElementById("peso").addEventListener("input", function () {
  const produtoSelecionado = document.getElementById("produto").value;
  const novoPeso = parseFloat(this.value);

  if (!produtoSelecionado || isNaN(novoPeso) || !selectedCubes.length) return;

  // Só permitir cálculo automático se houver apenas 1 cubo selecionado
  if (selectedCubes.length > 1) {
    return; // Para múltiplos cubos, não fazer cálculo automático
  }

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  const idCube = selectedCubes[0].getAttribute("id");
  const isPequeno = idCube.startsWith("P");

  // Obter dados de referência do produto
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

  // Remover efeito visual após um breve delay
  setTimeout(() => {
    quantidadeField.classList.remove("calculando");
  }, 300);

  // Verificar limite após alterar peso
  verificarLimiteModal();
  atualizarMensagemModal();
});

// Função para unificar pallets fisicamente (PP + PG = um só pallet)
function unificarPalletsFisicamente(produto, quantidade, peso) {
  const dadosProduto = produtos[produto];
  const quantidadePP = dadosProduto.PP.quantidade;
  const pesoPP = dadosProduto.PP.peso;
  const quantidadePG = dadosProduto.PG.quantidade;
  const pesoPG = dadosProduto.PG.peso;

  // Soma dos valores PP + PG
  const quantidadeUnificada = quantidadePP + quantidadePG;
  const pesoUnificado = pesoPP + pesoPG;

  // Usar o cubo selecionado como pallet pequeno
  const palletPequeno = window.selectedCube;

  // Encontrar o pallet grande correspondente
  const idPalletPequeno = palletPequeno.getAttribute("id");
  const numeroPallet = parseInt(idPalletPequeno.substring(1)); // Remove o "P" e pega o número
  const palletGrande = document.getElementById(`G${numeroPallet + 1}`);

  // Verificar se o pallet grande existe e está vazio
  if (
    !palletGrande ||
    palletGrande.hasAttribute("data-tipo") ||
    palletGrande.classList.contains("absorvido-permanente")
  ) {
    alert(
      `É necessário que o pallet ${
        palletGrande
          ? palletGrande.getAttribute("id")
          : "G" + (numeroPallet + 1)
      } esteja vazio para unificação!`
    );
    return;
  }

  // Unificar visualmente os dois pallets
  unificarCubosVisualmente(palletPequeno, palletGrande);

  // Adicionar produto ao pallet pequeno (pallet principal)
  palletPequeno.setAttribute("data-tipo", "UNIFICADO");
  palletPequeno.setAttribute("data-produto-especial", produto);

  // Criar bloco de produto unificado
  const bloco = document.createElement("div");
  bloco.className = "produto-bloco produto-especial-unificado";
  bloco.setAttribute("data-categoria", produto);
  bloco.innerHTML = `<div>${produto}</div><div class="quantidade-cubo">${quantidadeUnificada}</div>`;

  // Adicionar indicador de tipo de pallet unificado
  const tipoIndicator = document.createElement("div");
  tipoIndicator.className = "tipo-pallet unificado";
  tipoIndicator.textContent = "UNIFICADO";
  palletPequeno.appendChild(tipoIndicator);

  // Adicionar indicador visual de unificação permanente
  const indicadorUnificacao = document.createElement("div");
  indicadorUnificacao.className = "indicador-unificacao-permanente";
  indicadorUnificacao.innerHTML = `
          <div style="position: absolute; top: -5px; right: -5px; background: #ff9800; color: white; 
               border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; 
               justify-content: center; font-size: 12px; font-weight: bold; z-index: 1000;">
            🔗
          </div>
        `;
  palletPequeno.appendChild(indicadorUnificacao);

  palletPequeno.appendChild(bloco);

  // Aplicar visual de unificação permanente
  palletPequeno.classList.add("unificado-permanente");

  // Marcar pallet grande como absorvido permanentemente
  palletGrande.classList.add("absorvido-permanente");
  palletGrande.style.opacity = "0.3";
  palletGrande.style.pointerEvents = "none";

  // Adicionar indicador de absorção permanente
  const indicadorAbsorcao = document.createElement("div");
  indicadorAbsorcao.className = "indicador-absorcao-permanente";
  indicadorAbsorcao.innerHTML = `
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
               background: rgba(255, 152, 0, 0.9); color: white; padding: 5px; border-radius: 4px; 
               font-size: 10px; font-weight: bold; z-index: 1000;">
            UNIFICADO
          </div>
        `;
  palletGrande.appendChild(indicadorAbsorcao);

  // Atualizar contador de produtos
  atualizarContadorProdutos(palletPequeno);

  // Adicionar à tabela
  const table = document.getElementById("tabela-cupomList");
  const row = table.insertRow();
  row.setAttribute("data-id", palletPequeno.getAttribute("id"));
  row.setAttribute("data-produto", produto);
  row.classList.add("ativo", "unificado");

  // Calcular valor do produto unificado
  const precoUnitario = dadosProduto.PP.precoUnitario; // Mesmo preço para PP e PG
  const valorUnificado = quantidadeUnificada * precoUnitario;

  row.innerHTML = `
          <td>${palletPequeno.getAttribute("id")} + ${palletGrande.getAttribute(
    "id"
  )} (UNIFICADO)</td>
          <td>${produto}</td>
          <td>${quantidadeUnificada}</td>
          <td>${pesoUnificado.toFixed(2)}</td>
          <td>${formatarMoeda(valorUnificado)}</td>
          <td><button onclick="removeEntry(this)">Excluir</button></td>
        `;

  // Atualizar totais
  totalQuantidade += quantidadeUnificada;
  totalPeso += pesoUnificado;
  totalValor += valorUnificado; // NOVO: adicionar ao valor total
  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
  document.getElementById("valorTotal-container").innerText =
    formatarMoeda(totalValor); // NOVO: atualizar valor total

  // Cubagem
  const cubagemPP = dadosProduto.PP.cubagem;
  const cubagemPG = dadosProduto.PG.cubagem;
  const cubagemUnificada = cubagemPP + cubagemPG;
  cubagemOcupada += cubagemUnificada;

  const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
  document.getElementById("ocupacao-container").innerText =
    ocupacao.toFixed(2) + "%";

  alert(
    `Pallets unificados fisicamente!\n\nPallet ${palletPequeno.getAttribute(
      "id"
    )} + ${palletGrande.getAttribute(
      "id"
    )}\nQuantidade PP: ${quantidadePP} | Quantidade PG: ${quantidadePG}\nQuantidade Total: ${quantidadeUnificada}\nPeso Total: ${pesoUnificado.toFixed(
      2
    )}kg`
  );
}

// Função para unificar visualmente os cubos
function unificarCubosVisualmente(cuboDestino, cuboOrigem) {
  // Adicionar classe de unificação ao cubo destino
  cuboDestino.classList.add("unificado");

  // Adicionar indicador visual de unificação
  const indicadorUnificacao = document.createElement("div");
  indicadorUnificacao.className = "indicador-unificacao";
  indicadorUnificacao.innerHTML = `
          <div style="position: absolute; top: -5px; right: -5px; background: #ff9800; color: white; 
               border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; 
               justify-content: center; font-size: 12px; font-weight: bold; z-index: 1000;">
            🔗
          </div>
        `;
  cuboDestino.appendChild(indicadorUnificacao);

  // Adicionar efeito visual ao cubo origem (que foi "absorvido")
  cuboOrigem.classList.add("absorvido");
  cuboOrigem.style.opacity = "0.3";
  cuboOrigem.style.transform = "scale(0.8)";

  // Adicionar indicador de absorção
  const indicadorAbsorcao = document.createElement("div");
  indicadorAbsorcao.className = "indicador-absorcao";
  indicadorAbsorcao.innerHTML = `
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
               background: rgba(255, 152, 0, 0.9); color: white; padding: 5px; border-radius: 4px; 
               font-size: 10px; font-weight: bold; z-index: 1000;">
            UNIFICADO
          </div>
        `;
  cuboOrigem.appendChild(indicadorAbsorcao);

  // Criar linha de conexão visual entre os cubos
  criarLinhaConexao(cuboOrigem, cuboDestino);

  // Remover indicadores após alguns segundos
  setTimeout(() => {
    if (indicadorUnificacao.parentNode) {
      indicadorUnificacao.remove();
    }
    if (indicadorAbsorcao.parentNode) {
      indicadorAbsorcao.remove();
    }
    cuboOrigem.classList.remove("absorvido");
    cuboOrigem.style.opacity = "";
    cuboOrigem.style.transform = "";

    // Remover linha de conexão
    const linhaConexao = document.querySelector(".linha-conexao");
    if (linhaConexao) {
      linhaConexao.remove();
    }
  }, 3000);
}

// Função para criar linha de conexão visual
function criarLinhaConexao(cuboOrigem, cuboDestino) {
  const linhaConexao = document.createElement("div");
  linhaConexao.className = "linha-conexao";
  linhaConexao.style.cssText = `
          position: absolute;
          height: 3px;
          background: linear-gradient(90deg, #ff9800, #ff5722);
          z-index: 999;
          animation: linhaConexaoAnim 2s ease-in-out;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(255, 152, 0, 0.6);
        `;

  document.body.appendChild(linhaConexao);

  // Posicionar a linha entre os cubos
  setTimeout(() => {
    const origemRect = cuboOrigem.getBoundingClientRect();
    const destinoRect = cuboDestino.getBoundingClientRect();

    const origemX = origemRect.left + origemRect.width / 2;
    const origemY = origemRect.top + origemRect.height / 2;
    const destinoX = destinoRect.left + destinoRect.width / 2;
    const destinoY = destinoRect.top + destinoRect.height / 2;

    const distancia = Math.sqrt(
      Math.pow(destinoX - origemX, 2) + Math.pow(destinoY - origemY, 2)
    );
    const angulo =
      (Math.atan2(destinoY - origemY, destinoX - origemX) * 180) / Math.PI;

    linhaConexao.style.width = distancia + "px";
    linhaConexao.style.left = origemX + "px";
    linhaConexao.style.top = origemY + "px";
    linhaConexao.style.transform = `rotate(${angulo}deg)`;
    linhaConexao.style.transformOrigin = "0 50%";
  }, 100);
}

// Função para verificar se é produto especial
function isProdutoEspecial(produto) {
  const produtosEspeciais = [
    "LM0008-20000840",
    "LM0008-20000850",
    "LM0012-24000840",
    "LM0012-24000850",
  ];
  return produtosEspeciais.includes(produto);
}

// Função para unificar pallets especiais existentes
function unificarPalletsEspeciais(produto, quantidade, peso) {
  // Verificar se é um produto especial
  if (!isProdutoEspecial(produto)) {
    return false;
  }

  // Verificar se o pallet selecionado já tem o mesmo produto unificado
  if (
    window.selectedCube.hasAttribute("data-produto-especial") &&
    window.selectedCube.getAttribute("data-produto-especial") === produto
  ) {
    // Atualizar quantidade e peso na tabela
    const table = document.getElementById("tabela-cupomList");
    const rows = table.querySelectorAll("tr");

    for (let row of rows) {
      if (
        row.getAttribute("data-id") ===
          window.selectedCube.getAttribute("id") &&
        row.getAttribute("data-produto") === produto
      ) {
        const quantidadeCell = row.cells[2];
        const pesoCell = row.cells[3];
        const valorCell = row.cells[4]; // NOVO: célula do valor

        const quantidadeAtual = parseFloat(quantidadeCell.textContent);
        const pesoAtual = parseFloat(pesoCell.textContent);
        const valorAtual = parseFloat(
          valorCell.textContent.replace(/[^\d,.-]/g, "").replace(",", ".")
        ); // NOVO: extrair valor atual

        const novaQuantidade = quantidadeAtual + quantidade;
        const novoPeso = pesoAtual + peso;

        // Calcular novo valor
        const dadosProduto = produtos[produto];
        const precoUnitario = dadosProduto.PP.precoUnitario;
        const novoValor = novaQuantidade * precoUnitario;

        quantidadeCell.textContent = novaQuantidade;
        pesoCell.textContent = novoPeso.toFixed(2);
        valorCell.textContent = formatarMoeda(novoValor); // NOVO: atualizar valor

        // Atualizar totais
        totalQuantidade += quantidade;
        totalPeso += peso;
        totalValor += novoValor - valorAtual; // NOVO: adicionar diferença do valor
        document.getElementById("Quantidade-container").innerText =
          totalQuantidade.toFixed(2);
        document.getElementById("peso-container").innerText =
          totalPeso.toFixed(2);
        document.getElementById("valorTotal-container").innerText =
          formatarMoeda(totalValor); // NOVO: atualizar valor total

        // Atualizar cubagem
        const cubagemPP = dadosProduto.PP.cubagem;
        const cubagemPG = dadosProduto.PG.cubagem;
        const cubagemUnificada = cubagemPP + cubagemPG;
        cubagemOcupada += cubagemUnificada;

        const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
        document.getElementById("ocupacao-container").innerText =
          ocupacao.toFixed(2) + "%";

        return true;
      }
    }
  }

  return false;
}

// Função para adicionar produto especial com visual unificado
function adicionarProdutoEspecialUnificado(produto, quantidade, peso) {
  const idCube = window.selectedCube.getAttribute("id");
  const isPequeno = idCube.startsWith("P");

  // Calcular valores unificados (PP + PG)
  const dadosProduto = produtos[produto];
  const quantidadePP = dadosProduto.PP.quantidade;
  const pesoPP = dadosProduto.PP.peso;
  const quantidadePG = dadosProduto.PG.quantidade;
  const pesoPG = dadosProduto.PG.peso;

  // Soma dos valores PP + PG
  const quantidadeUnificada = quantidadePP + quantidadePG;
  const pesoUnificado = pesoPP + pesoPG;

  // Definir tipo de pallet como unificado
  window.selectedCube.setAttribute("data-tipo", "UNIFICADO");
  window.selectedCube.setAttribute("data-produto-especial", produto);

  // Criar bloco de produto com visual unificado
  const bloco = document.createElement("div");
  bloco.className = "produto-bloco produto-especial-unificado";
  bloco.setAttribute("data-categoria", produto);
  bloco.innerHTML = `<div>${produto}</div><div class="quantidade-cubo">${quantidadeUnificada}</div>`;

  // Adicionar indicador de tipo de pallet unificado
  const tipoIndicator = document.createElement("div");
  tipoIndicator.className = "tipo-pallet unificado";
  tipoIndicator.textContent = "UNIFICADO";
  window.selectedCube.appendChild(tipoIndicator);

  // Adicionar indicador visual de unificação permanente
  const indicadorUnificacao = document.createElement("div");
  indicadorUnificacao.className = "indicador-unificacao-permanente";
  indicadorUnificacao.innerHTML = `
          <div style="position: absolute; top: -5px; right: -5px; background: #ff9800; color: white; 
               border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; 
               justify-content: center; font-size: 12px; font-weight: bold; z-index: 1000;">
            🔗
          </div>
        `;
  window.selectedCube.appendChild(indicadorUnificacao);

  window.selectedCube.appendChild(bloco);

  // Aplicar visual de unificação permanente
  window.selectedCube.classList.add("unificado-permanente");

  // Atualizar contador de produtos
  atualizarContadorProdutos(window.selectedCube);

  // Adicionar à tabela
  const table = document.getElementById("tabela-cupomList");
  const row = table.insertRow();
  row.setAttribute("data-id", idCube);
  row.setAttribute("data-produto", produto);
  row.classList.add("ativo", "unificado");

  // Calcular valor do produto unificado
  const precoUnitario = dadosProduto.PP.precoUnitario; // Mesmo preço para PP e PG
  const valorUnificado = quantidadeUnificada * precoUnitario;

  row.innerHTML = `
          <td>${idCube} (UNIFICADO)</td>
          <td>${produto}</td>
          <td>${quantidadeUnificada}</td>
          <td>${pesoUnificado.toFixed(2)}</td>
          <td>${formatarMoeda(valorUnificado)}</td>
          <td><button onclick="removeEntry(this)">Excluir</button></td>
        `;

  // Atualizar totais
  totalQuantidade += quantidadeUnificada;
  totalPeso += pesoUnificado;
  totalValor += valorUnificado; // NOVO: adicionar ao valor total
  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
  document.getElementById("valorTotal-container").innerText =
    formatarMoeda(totalValor); // NOVO: atualizar valor total

  // Cubagem
  const cubagemPP = dadosProduto.PP.cubagem;
  const cubagemPG = dadosProduto.PG.cubagem;
  const cubagemUnificada = cubagemPP + cubagemPG;
  cubagemOcupada += cubagemUnificada;

  const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
  document.getElementById("ocupacao-container").innerText =
    ocupacao.toFixed(2) + "%";

  alert(
    `Produto especial ${produto} adicionado com visual unificado!\n\nQuantidade PP: ${quantidadePP} | Quantidade PG: ${quantidadePG}\nQuantidade Total: ${quantidadeUnificada}\nPeso Total: ${pesoUnificado.toFixed(
      2
    )}kg`
  );
}

// Adapta addEntry para múltiplos cubos
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

  // Se apenas 1 cubo está selecionado, verificar lógica de unificação especial
  if (selectedCubes.length === 1) {
    const cube = selectedCubes[0];
    window.selectedCube = cube; // para compatibilidade com funções existentes

    // Verificar se é um produto especial que deve ser unificado
    if (unificarPalletsEspeciais(produto, quantidade, peso)) {
      alert(
        `Produto ${produto} unificado com pallet existente!\nQuantidade total atualizada.`
      );
      closeModal();
      return;
    }

    // Verificar se é primeira inserção de produto especial
    if (isProdutoEspecial(produto)) {
      unificarPalletsFisicamente(produto, quantidade, peso);
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
    document.getElementById("valorTotal-container").innerText =
      formatarMoeda(totalValor); // NOVO: atualizar valor total

    // Adicionar cubagem calculada
    cubagemOcupada += cubagemProduto;
    const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
    document.getElementById("ocupacao-container").innerText =
      ocupacao.toFixed(2) + "%";

    closeModal();
    return;
  }

  // LÓGICA PARA MÚLTIPLOS CUBOS: Usar valores padrões para cada cubo
  selectedCubes.forEach((cube) => {
    const idCube = cube.getAttribute("id");
    const categoria = produto;
    const isPequeno = idCube.startsWith("P");
    const tipoPallet = isPequeno ? "PP" : "PG";
    cube.setAttribute("data-tipo", tipoPallet);

    // Usar valor padrão do produto para cada cubo
    let quantidadeExibir = quantidade;
    let pesoExibir = peso;
    if (produtos[produto]) {
      quantidadeExibir = isPequeno
        ? produtos[produto].PP.quantidade
        : produtos[produto].PG.quantidade;
      pesoExibir = isPequeno
        ? produtos[produto].PP.peso
        : produtos[produto].PG.peso;
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
    document.getElementById("valorTotal-container").innerText =
      formatarMoeda(totalValor); // NOVO: atualizar valor total

    // Cubagem correta por produto e tipo de pallet
    let cubagemProduto = 0;
    if (produtos[produto]) {
      cubagemProduto = isPequeno
        ? produtos[produto].PP.cubagem
        : produtos[produto].PG.cubagem;
      cubagemOcupada += cubagemProduto;
    }
    const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
    document.getElementById("ocupacao-container").innerText =
      ocupacao.toFixed(2) + "%";
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

function removeEntry(button) {
  const row = button.parentElement.parentElement;
  const table = document.getElementById("tabela-cupomList");
  const idCube = row.getAttribute("data-id");
  const produto = row.getAttribute("data-produto");
  const quantidade = parseFloat(row.cells[2].innerText);
  const peso = parseFloat(row.cells[3].innerText);
  const valor = parseFloat(
    row.cells[4].innerText.replace(/[^\d,.-]/g, "").replace(",", ".")
  ); // NOVO: extrair valor

  table.deleteRow(row.rowIndex - 1);
  totalQuantidade -= quantidade;
  totalPeso -= peso;
  totalValor -= valor; // NOVO: subtrair valor

  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
  document.getElementById("valorTotal-container").innerText =
    formatarMoeda(totalValor); // NOVO: atualizar valor total

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

// FUNÇÃO PARA PERMITIR ARRASTAR O FORMULÁRIO NA PAGINA COM O MOUSE
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

// LIMPAR TODOS OS CUBOS
function clearAll() {
  location.reload();
}

// FAZER DOWLOAD DA PAGINA DE SIMULAÇÃO

function downloadPDF() {
  const element = document.querySelector("main");
  const opt = {
    margin: 0.3,
    filename: "SimuladorEmbarque.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: true, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
  };
  html2pdf().set(opt).from(element).save();
}

// Função para verificar limite em tempo real
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

// Atualiza a mensagem informativa do modal baseada na seleção
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
