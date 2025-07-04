let selectedCube = null;
let totalQuantidade = 0;
let totalPeso = 0;
let cubagemTotal = 73.28;
let cubagemOcupada = 0; // NOVO

const produtos = {
  "LM0001-4000840": {
    PP: { quantidade: 248, peso: 332, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 647, cubagem: 3.5 },
  },
  "LM0001-4000850": {
    PP: { quantidade: 248, peso: 332, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 647, cubagem: 3.5 },
  },
  "LM0001-8000840": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.5 },
  },
  "LM0001-8000850": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.5 },
  },
  "LM0006-4000830": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0 },
  },
  "LM0006-4000840": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0 },
  },
  "LM0006-4000850": {
    PP: { quantidade: 160, peso: 460, cubagem: 2.86 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0 },
  },
  "LM0006-4000865": {
    PP: { quantidade: 160, peso: 160, cubagem: 2.86 },
    PG: { quantidade: 224, peso: 639, cubagem: 3.0 },
  },
  "LM0007-3200830": {
    PP: { quantidade: 384, peso: 359.8, cubagem: 2.5 },
    PG: { quantidade: 768, peso: 697, cubagem: 3.5 },
  },
  "LM0008-3500840": {
    PP: { quantidade: 528, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 1056, peso: 559, cubagem: 3.8 },
  },
  "LM0008-3500850": {
    PP: { quantidade: 528, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 1056, peso: 559, cubagem: 3.8 },
  },
  "LM0008-7000850": {
    PP: { quantidade: 384, peso: 359.8, cubagem: 2.86 },
    PG: { quantidade: 768, peso: 697, cubagem: 3.8 },
  },
  "LM0008-13000840": {
    PP: { quantidade: 296, peso: 364.4, cubagem: 2.86 },
    PG: { quantidade: 500, peso: 712, cubagem: 3.8 },
  },
  "LM0008-13000850": {
    PP: { quantidade: 296, peso: 364.4, cubagem: 2.86 },
    PG: { quantidade: 520, peso: 712, cubagem: 3.8 },
  },
  "LM0008-20000840": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8 },
  },
  "LM0008-20000850": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8 },
  },
  "LM0009-4000840": {
    PP: { quantidade: 256, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 559, cubagem: 3.8 },
  },
  "LM0009-4000850": {
    PP: { quantidade: 256, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 559, cubagem: 3.8 },
  },
  "LM0009-8000840": {
    PP: { quantidade: 224, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 448, peso: 559, cubagem: 3.8 },
  },
  "LM0009-8000850": {
    PP: { quantidade: 224, peso: 288, cubagem: 2.86 },
    PG: { quantidade: 448, peso: 559, cubagem: 3.8 },
  },
  "LM0010-2000830": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8 },
  },
  "LM0010-2000840": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8 },
  },
  "LM0010-2000850": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8 },
  },
  "LM0010-2000865": {
    PP: { quantidade: 640, peso: 598.2, cubagem: 2.86 },
    PG: { quantidade: 896, peso: 832, cubagem: 3.8 },
  },
  "LM0011-12000840": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.8 },
  },
  "LM0011-12000850": {
    PP: { quantidade: 248, peso: 355.6, cubagem: 2.86 },
    PG: { quantidade: 510, peso: 694, cubagem: 3.8 },
  },
  "LM0012-24000840": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8 },
  },
  "LM0012-24000850": {
    PP: { quantidade: 231, peso: 352, cubagem: 2.86 },
    PG: { quantidade: 231, peso: 352, cubagem: 3.8 },
  },
};

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

document.querySelectorAll(".cube").forEach((cube) => {
  cube.addEventListener("click", function () {
    selectedCube = this;
    document.getElementById("modal").style.display = "block";

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("limite-indicador").style.display = "none";
  });
});
//Inserir dados automáticos no form (Modal) conforme produto selecionado
document.getElementById("produto").addEventListener("change", function () {
  const produtoSelecionado = this.value;
  if (!produtoSelecionado || !selectedCube) return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) {
    alert("Produto não cadastrado na base!");
    document.getElementById("quantidade").value = "";
    document.getElementById("peso").value = "";
    return;
  }

  const idCube = selectedCube.getAttribute("id");
  const isPequeno = idCube.startsWith("P"); // <-- reconhecer o pallet pelo tamanho do cubo

  if (isPequeno) {
    document.getElementById("quantidade").value = dadosProduto.PP.quantidade;
    document.getElementById("peso").value = dadosProduto.PP.peso;
  } else {
    document.getElementById("quantidade").value = dadosProduto.PG.quantidade;
    document.getElementById("peso").value = dadosProduto.PG.peso;
  }

  // Verificar limite após selecionar produto
  verificarLimiteModal();
});

// Recalcular peso automaticamente quando quantidade for alterada
document.getElementById("quantidade").addEventListener("input", function () {
  const produtoSelecionado = document.getElementById("produto").value;
  const novaQuantidade = parseFloat(this.value);

  if (!produtoSelecionado || isNaN(novaQuantidade) || !selectedCube) return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  const idCube = selectedCube.getAttribute("id");
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
});

// Recalcular quantidade automaticamente quando peso for alterado
document.getElementById("peso").addEventListener("input", function () {
  const produtoSelecionado = document.getElementById("produto").value;
  const novoPeso = parseFloat(this.value);

  if (!produtoSelecionado || isNaN(novoPeso) || !selectedCube) return;

  const dadosProduto = produtos[produtoSelecionado];
  if (!dadosProduto) return;

  const idCube = selectedCube.getAttribute("id");
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

  // Encontrar pares de pallets vazios
  let palletPequeno = null;
  let palletGrande = null;

  // Procurar por pares de pallets vazios
  for (let i = 1; i <= 17; i += 2) {
    // P1, P3, P5, ..., P17
    const palletP = document.getElementById(`P${i}`);
    const palletG = document.getElementById(`G${i + 1}`); // G2, G4, G6, ...

    // Verificar se ambos os pallets do par estão vazios
    if (
      palletP &&
      palletG &&
      !palletP.hasAttribute("data-tipo") &&
      !palletG.hasAttribute("data-tipo") &&
      !palletP.classList.contains("absorvido-permanente") &&
      !palletG.classList.contains("absorvido-permanente")
    ) {
      palletPequeno = palletP;
      palletGrande = palletG;
      break; // Usar o primeiro par disponível
    }
  }

  if (!palletPequeno || !palletGrande) {
    alert(
      "É necessário ter pelo menos um par de pallets vazios (P1+G1, P2+G2, etc.) para unificação!"
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
  row.innerHTML = `
          <td>${palletPequeno.getAttribute("id")} + ${palletGrande.getAttribute(
    "id"
  )} (UNIFICADO)</td>
          <td>${produto}</td>
          <td>${quantidadeUnificada}</td>
          <td>${pesoUnificado.toFixed(2)}</td>
          <td><button onclick="removeEntry(this)">Excluir</button></td>
        `;

  // Atualizar totais
  totalQuantidade += quantidadeUnificada;
  totalPeso += pesoUnificado;
  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);

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
    selectedCube.hasAttribute("data-produto-especial") &&
    selectedCube.getAttribute("data-produto-especial") === produto
  ) {
    // Atualizar quantidade e peso na tabela
    const table = document.getElementById("tabela-cupomList");
    const rows = table.querySelectorAll("tr");

    for (let row of rows) {
      if (
        row.getAttribute("data-id") === selectedCube.getAttribute("id") &&
        row.getAttribute("data-produto") === produto
      ) {
        const quantidadeCell = row.cells[2];
        const pesoCell = row.cells[3];

        const quantidadeAtual = parseFloat(quantidadeCell.textContent);
        const pesoAtual = parseFloat(pesoCell.textContent);

        const novaQuantidade = quantidadeAtual + quantidade;
        const novoPeso = pesoAtual + peso;

        quantidadeCell.textContent = novaQuantidade;
        pesoCell.textContent = novoPeso.toFixed(2);

        // Atualizar totais
        totalQuantidade += quantidade;
        totalPeso += peso;
        document.getElementById("Quantidade-container").innerText =
          totalQuantidade.toFixed(2);
        document.getElementById("peso-container").innerText =
          totalPeso.toFixed(2);

        // Atualizar cubagem
        const dadosProduto = produtos[produto];
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
  const idCube = selectedCube.getAttribute("id");
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
  selectedCube.setAttribute("data-tipo", "UNIFICADO");
  selectedCube.setAttribute("data-produto-especial", produto);

  // Criar bloco de produto com visual unificado
  const bloco = document.createElement("div");
  bloco.className = "produto-bloco produto-especial-unificado";
  bloco.setAttribute("data-categoria", produto);
  bloco.innerHTML = `<div>${produto}</div><div class="quantidade-cubo">${quantidadeUnificada}</div>`;

  // Adicionar indicador de tipo de pallet unificado
  const tipoIndicator = document.createElement("div");
  tipoIndicator.className = "tipo-pallet unificado";
  tipoIndicator.textContent = "UNIFICADO";
  selectedCube.appendChild(tipoIndicator);

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
  selectedCube.appendChild(indicadorUnificacao);

  selectedCube.appendChild(bloco);

  // Aplicar visual de unificação permanente
  selectedCube.classList.add("unificado-permanente");

  // Atualizar contador de produtos
  atualizarContadorProdutos(selectedCube);

  // Adicionar à tabela
  const table = document.getElementById("tabela-cupomList");
  const row = table.insertRow();
  row.setAttribute("data-id", idCube);
  row.setAttribute("data-produto", produto);
  row.classList.add("ativo", "unificado");
  row.innerHTML = `
          <td>${idCube} (UNIFICADO)</td>
          <td>${produto}</td>
          <td>${quantidadeUnificada}</td>
          <td>${pesoUnificado.toFixed(2)}</td>
          <td><button onclick="removeEntry(this)">Excluir</button></td>
        `;

  // Atualizar totais
  totalQuantidade += quantidadeUnificada;
  totalPeso += pesoUnificado;
  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);

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

//Inserir valores e realizar calculos conforme produtos adicionados
function addEntry() {
  const produto = document.getElementById("produto").value;
  const quantidade = parseFloat(document.getElementById("quantidade").value);
  const peso = parseFloat(document.getElementById("peso").value);

  if (!selectedCube) {
    alert("Selecione um pallet.");
    return;
  }

  if (isNaN(quantidade) || isNaN(peso)) {
    alert("Preencha quantidade e peso.");
    return;
  }

  // Verificar se é um produto especial que deve ser unificado
  if (unificarPalletsEspeciais(produto, quantidade, peso)) {
    alert(
      `Produto ${produto} unificado com pallet existente!\nQuantidade total atualizada.`
    );
    closeModal();
    return; // Produto foi unificado, não precisa continuar
  }

  // Verificar se é primeira inserção de produto especial
  if (isProdutoEspecial(produto)) {
    unificarPalletsFisicamente(produto, quantidade, peso);
    closeModal();
    return;
  }

  const idCube = selectedCube.getAttribute("id");
  const categoria = produto;
  const isPequeno = idCube.startsWith("P");
  const tipoPallet = isPequeno ? "PP" : "PG";

  // Definir tipo de pallet no cubo
  selectedCube.setAttribute("data-tipo", tipoPallet);

  // Usar a quantidade inserida no modal em vez da quantidade padrão
  const quantidadeExibir = quantidade;

  // Criar bloco de produto
  const bloco = document.createElement("div");
  bloco.className = "produto-bloco";
  bloco.setAttribute("data-categoria", categoria);
  bloco.innerHTML = `
          <div>${produto}</div>
          <div class="quantidade-cubo">${quantidadeExibir}</div>
        `;

  // Adicionar indicador de tipo de pallet se não existir
  if (!selectedCube.querySelector(".tipo-pallet")) {
    const tipoIndicator = document.createElement("div");
    tipoIndicator.className = "tipo-pallet";
    tipoIndicator.textContent = tipoPallet;
    selectedCube.appendChild(tipoIndicator);
  }

  selectedCube.appendChild(bloco);

  // Atualizar contador de produtos
  atualizarContadorProdutos(selectedCube);

  const table = document.getElementById("tabela-cupomList");
  const row = table.insertRow();
  row.setAttribute("data-id", idCube);
  row.setAttribute("data-produto", produto);
  row.classList.add("ativo");
  row.innerHTML = `
          <td>${idCube}</td>
          <td>${produto}</td>
          <td>${quantidadeExibir}</td>
          <td>${peso}</td>
          <td><button onclick="removeEntry(this)">Excluir</button></td>
  `;

  totalQuantidade += quantidade;
  totalPeso += peso;
  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);

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

  table.deleteRow(row.rowIndex - 1);
  totalQuantidade -= quantidade;
  totalPeso -= peso;

  document.getElementById("Quantidade-container").innerText =
    totalQuantidade.toFixed(2);
  document.getElementById("peso-container").innerText = totalPeso.toFixed(2);

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
    const palletGrande = document.getElementById(`G${numeroPallet}`);

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

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("limite-indicador").style.display = "none";
  selectedCube = null;
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
// ... existing code ...

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

  if (!produtoSelecionado || !selectedCube) {
    limiteIndicador.style.display = "none";
    return;
  }

  // Se quantidade está vazia ou inválida, não mostrar indicador
  if (quantidadeInput === "" || isNaN(quantidade) || quantidade <= 0) {
    limiteIndicador.style.display = "none";
    return;
  }

  const existingProducts = selectedCube.querySelectorAll(".produto-bloco");

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
      const idCube = selectedCube.getAttribute("id");
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
    const idCube = selectedCube.getAttribute("id");
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
