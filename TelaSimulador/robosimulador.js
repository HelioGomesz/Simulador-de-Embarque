// === ROBÔ DE SIMULAÇÃO DE DEMANDA ===
function abrirModalSimuladorBot() {
  const modal = document.getElementById("modalSimuladorBot");
  modal.style.display = "block";
  document.getElementById("resultadoSimuladorBot").innerHTML = "";
  document.getElementById("produtoSimuladorBot").value = "";
  document.getElementById("quantidadeSimuladorBot").value = "";
  
  // Posicionar o modal no centro da tela inicialmente
  modal.style.left = "50%";
  modal.style.top = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  
  // Tornar o modal arrastável
  makeRoboModalDraggable();
}

function simularDemandaBot() {
  const produtoBase = document.getElementById("produtoSimuladorBot").value;
  const quantidadeDesejada = parseInt(
    document.getElementById("quantidadeSimuladorBot").value
  );
  const resultadoDiv = document.getElementById("resultadoSimuladorBot");
  resultadoDiv.innerHTML = "";

  if (!produtoBase || isNaN(quantidadeDesejada) || quantidadeDesejada <= 0) {
    resultadoDiv.innerHTML =
      '<span style="color: #c62828;">Preencha o produto e a quantidade corretamente.</span>';
    return;
  }

  // === Encontrar todos os produtos que começam com o prefixo selecionado===
  const produtosFiltrados = Object.keys(produtos).filter((p) =>
    p.startsWith(produtoBase)
  );
  if (produtosFiltrados.length === 0) {
    resultadoDiv.innerHTML =
      '<span style="color: #c62828;">Produto não encontrado na base de dados.</span>';
    return;
  }

  // ===Usar o primeiro produto da família para pegar os padrões PP e PG===
  const produtoExemplo = produtosFiltrados[0];
  const padraoPP = produtos[produtoExemplo].PP.quantidade;
  const padraoPG = produtos[produtoExemplo].PG.quantidade;

  let melhor = {
    usadosPP: 0,
    usadosPG: 0,
    sobra: quantidadeDesejada,
    sobraAbs: Math.abs(quantidadeDesejada),
  };
  const maxPP = Math.ceil(quantidadeDesejada / padraoPP) + 2;
  const maxPG = Math.ceil(quantidadeDesejada / padraoPG) + 2;
  let combinacoes = [];

  for (let pp = 0; pp <= maxPP; pp++) {
    for (let pg = 0; pg <= maxPG; pg++) {
      const total = pp * padraoPP + pg * padraoPG;
      const sobra = quantidadeDesejada - total;
      const sobraAbs = Math.abs(sobra);
      combinacoes.push({ pp, pg, total, sobra, sobraAbs });
      if (
        sobraAbs < melhor.sobraAbs ||
        (sobraAbs === melhor.sobraAbs &&
          total > melhor.usadosPP * padraoPP + melhor.usadosPG * padraoPG)
      ) {
        melhor = { usadosPP: pp, usadosPG: pg, sobra, sobraAbs };
      }
    }
  }

  // ===Ordenar as melhores combinações por sobra absoluta e depois por total mais próximo da demanda
  combinacoes.sort((a, b) => a.sobraAbs - b.sobraAbs || b.total - a.total);
  const melhoresComb = combinacoes.slice(0, 10);

  // ===Montar resultado principal===
  let html = `<strong>Produto:</strong> ${produtoBase}<br/>`;
  html += `<strong>Quantidade desejada:</strong> ${quantidadeDesejada}<br/>`;
  html += `<strong>Pallet PG (grande):</strong> ${
    melhor.usadosPG
  } x ${padraoPG} = <strong>${
    melhor.usadosPG * padraoPG
  }</strong> produtos<br/>`;
  html += `<strong>Pallet PP (pequeno):</strong> ${
    melhor.usadosPP
  } x ${padraoPP} = <strong>${
    melhor.usadosPP * padraoPP
  }</strong> produtos<br/>`;
  html += `<strong>Total em pallets:</strong> ${
    melhor.usadosPG * padraoPG + melhor.usadosPP * padraoPP
  }<br/>`;
  if (melhor.sobra !== 0) {
    html += `<span style="color: #c62828;"><strong>Sobra:</strong> ${
      melhor.sobra
    } (${
      melhor.sobra > 0 ? "não cabe em pallets padrões" : "excedente"
    })</span><br/>`;
  } else {
    html += `<span style=\"color: #388e3c;\"><strong>Sem sobra!</strong></span><br/>`;
  }
  html += `<hr/><strong>Resumo:</strong> ${melhor.usadosPG} PG + ${melhor.usadosPP} PP`;
  if (melhor.sobra !== 0)
    html += ` + <span style='color:#c62828;'>${Math.abs(
      melhor.sobra
    )} avulso(s) (${melhor.sobra > 0 ? "faltando" : "excedente"})</span>`;

  // ===Botão para mostrar/ocultar combinações===
  html += `<div style='margin:10px 0;'><button id='btnMostrarCombinacoes' style='font-size:12px;padding:4px 10px;'>Mostrar combinações</button></div>`;
  html += `<div id='tabelaCombinacoes' style='display:none;'></div>`;

  resultadoDiv.innerHTML = html;

  // ===Função para montar a tabela de combinações===
  function montarTabelaComb() {
    let tabela = `<table style='width:100%;font-size:12px;border-collapse:collapse;margin-top:4px;'>`;
    tabela += `<tr style='background:#e3f2fd;'><th>PP</th><th>PG</th><th>Total</th><th>Sobra</th></tr>`;
    melhoresComb.forEach((c) => {
      tabela += `<tr><td>${c.pp}</td><td>${c.pg}</td><td>${
        c.total
      }</td><td style='color:${
        c.sobra === 0 ? "#388e3c" : c.sobra > 0 ? "#c62828" : "#1976d2"
      };font-weight:bold;'>${c.sobra}</td></tr>`;
    });
    tabela += `</table>`;
    return tabela;
  }

  // ===Adicionar evento ao botão===
  document.getElementById("btnMostrarCombinacoes").onclick = function () {
    const tabelaDiv = document.getElementById("tabelaCombinacoes");
    if (tabelaDiv.style.display === "none") {
      tabelaDiv.innerHTML = montarTabelaComb();
      tabelaDiv.style.display = "block";
      this.textContent = "Ocultar combinações";
    } else {
      tabelaDiv.style.display = "none";
      this.textContent = "Mostrar combinações";
    }
  };
}

function fecharModalSimuladorBot() {
  document.getElementById("modalSimuladorBot").style.display = "none";
}

// === FUNÇÃO PARA PERMITIR ARRASTAR O MODAL DO ROBÔ NA PÁGINA COM O MOUSE ===
function makeRoboModalDraggable() {
  const modal = document.getElementById("modalSimuladorBot");
  const header = document.getElementById("modalSimuladorBotHeader");
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  header.onmousedown = function (event) {
    event.preventDefault();
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    // Remover transform para usar left/top
    modal.style.transform = "none";

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
