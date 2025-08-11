// ===Função para unificar pallets fisicamente (PP + PG = um só pallet)===
function unificarPalletsFisicamente(produto, quantidade, peso) {
  // Permitir multiseleção de pallets pequenos para unificação
  let palletsPequenos = [];
  if (window.selectedCubes && window.selectedCubes.length > 0) {
    palletsPequenos = window.selectedCubes.filter((cube) =>
      cube.getAttribute("id").startsWith("P")
    );
  } else if (window.selectedCube) {
    palletsPequenos = [window.selectedCube];
  }

  if (!palletsPequenos.length) {
    alert("Selecione ao menos um pallet pequeno para unificar.");
    return;
  }

  palletsPequenos.forEach((palletPequeno) => {
    const dadosProduto = produtos[produto];

    // Encontrar o pallet grande correspondente
    const idPalletPequeno = palletPequeno.getAttribute("id");
    const numeroPallet = parseInt(idPalletPequeno.substring(1));
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

    // Usar valores informados pelo usuário (modal)
    const quantidadeUnificada = Number(quantidade);
    const pesoUnificado = Number(peso);

    // Unificar visualmente os dois pallets
    unificarCubosVisualmente(palletPequeno, palletGrande);

    // Adicionar produto ao pallet pequeno (pallet principal)
    palletPequeno.setAttribute("data-tipo", "UNIFICADO");
    palletPequeno.setAttribute("data-produto-especial", produto);

    // Permitir múltiplos blocos do mesmo produto especial no cubo
    const bloco = document.createElement("div");
    bloco.className = "produto-bloco produto-especial-unificado";
    bloco.setAttribute("data-categoria", produto);
    bloco.innerHTML = `<div>${produto}</div><div class=\"quantidade-cubo\">${quantidadeUnificada}</div>`;
    palletPequeno.appendChild(bloco);
    // Adicionar indicador de tipo de pallet unificado e visual permanente apenas se não existir
    if (!palletPequeno.querySelector(".tipo-pallet.unificado")) {
      const tipoIndicator = document.createElement("div");
      tipoIndicator.className = "tipo-pallet unificado";
      tipoIndicator.textContent = "UNIFICADO";
      palletPequeno.appendChild(tipoIndicator);
    }
    if (!palletPequeno.querySelector(".indicador-unificacao-permanente")) {
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
    }

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

    // Adicionar à tabela (permitir múltiplas linhas para o mesmo cubo/produto)
    const table = document.getElementById("tabela-cupomList");
    const row = table.insertRow();
    row.setAttribute("data-id", palletPequeno.getAttribute("id"));
    row.setAttribute("data-produto", produto);
    row.classList.add("ativo", "unificado");

    // Calcular valor do produto unificado
    const precoUnitario = dadosProduto.PP.precoUnitario; // Mesmo preço para PP e PG
    const valorUnificado = quantidadeUnificada * precoUnitario;

    row.innerHTML = `
            <td>${palletPequeno.getAttribute(
              "id"
            )} + ${palletGrande.getAttribute("id")} (UNIFICADO)</td>
            <td>${produto}</td>
            <td>${quantidadeUnificada}</td>
            <td>${pesoUnificado.toFixed(2)}</td>
            <td>${formatarMoeda(valorUnificado)}</td>
            <td><button onclick=\"removeEntry(this)\">Excluir</button></td>
          `;

    // Atualizar totais
    totalQuantidade += quantidadeUnificada;
    totalPeso += pesoUnificado;
    totalValor += valorUnificado;
    document.getElementById("Quantidade-container").innerText =
      totalQuantidade.toFixed(2);
    document.getElementById("peso-container").innerText = totalPeso.toFixed(2);
    atualizarValorTotalComOuSemMarkup();

    // Cubagem proporcional ao valor informado
    let cubagemProduto = 0;
    if (dadosProduto) {
      const cubagemReferencia =
        dadosProduto.PP.cubagem + dadosProduto.PG.cubagem;
      const quantidadeReferencia =
        dadosProduto.PP.quantidade + dadosProduto.PG.quantidade;
      cubagemProduto =
        (quantidadeUnificada * cubagemReferencia) / quantidadeReferencia;
      cubagemOcupada += cubagemProduto;
    }
    const ocupacao = (cubagemOcupada / cubagemTotal) * 100;
    document.getElementById("ocupacao-container").innerText =
      ocupacao.toFixed(2) + "%";

<<<<<<< HEAD
    // Volume total da unificação: quantidade total dividido pelo maior padrão CX (PP ou PG)
    const padraoCxPP = dadosProduto.PP.padraoCx || 1;
    const padraoCxPG = dadosProduto.PG.padraoCx || 1;
    const padraoCxMaior = Math.max(padraoCxPP, padraoCxPG);
    const volumeUnificado = Math.ceil(quantidadeUnificada / padraoCxMaior);
    totalVolume += volumeUnificado;
    document.getElementById("volumeTotal-container").innerText =
      totalVolume.toFixed(2);
  });
=======
  alert(
    `Pallets unificados fisicamente!\n\nPallet ${palletPequeno.getAttribute(
      "id"
    )} + ${palletGrande.getAttribute(
      "id"
    )}\nQuantidade PP: ${quantidadePP} | Quantidade PG: ${quantidadePG}\nQuantidade Total: ${quantidadeUnificada}\nPeso Total: ${pesoUnificado.toFixed(
      2
    )}kg`
  );
>>>>>>> parent of 2e72c84 (:ok_hand: feat - Calculo de volume de unificação e correção da cubagem LM0001-8000)
}

// ===Função para unificar visualmente os cubos===
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

// ===Função para criar linha de conexão visual===
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

// ===Função para verificar se é produto especial===
function isProdutoEspecial(produto) {
  const produtosEspeciais = [
    "LM0008-20000840",
    "LM0008-20000850",
    "LM0012-24000840",
    "LM0012-24000850",
  ];
  return produtosEspeciais.includes(produto);
}

// ===Função para unificar pallets especiais existentes===
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
        const valorCell = row.cells[4]; // célula do valor

        const quantidadeAtual = parseFloat(quantidadeCell.textContent);
        const pesoAtual = parseFloat(pesoCell.textContent);
        const valorAtual = parseFloat(
          valorCell.textContent.replace(/[^\d,.-]/g, "").replace(",", ".")
        ); // extrair valor atual

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
        atualizarValorTotalComOuSemMarkup();

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

// ===Função para adicionar produto especial com visual unificado===
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
  atualizarValorTotalComOuSemMarkup();

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
