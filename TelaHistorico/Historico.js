let simulacaoParaDeletar = null;

// Função para formatar data
function formatarData(dataString) {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

// Função para formatar número
function formatarNumero(numero) {
  return typeof numero === "number" ? numero.toFixed(2) : "0.00";
}

// Função para formatar moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor || 0);
}

// Função para formatar porcentagem
function formatarPorcentagem(valor) {
  return `${formatarNumero(valor)}%`;
}

// Função para carregar simulações do backend
async function carregarSimulacoes() {
  const loading = document.getElementById("loading");
  const mensagemVazia = document.getElementById("mensagem-vazia");
  const listaSimulacoes = document.getElementById("lista-simulacoes");

  loading.style.display = "block";
  mensagemVazia.style.display = "none";
  listaSimulacoes.innerHTML = "";

  try {
    const response = await axios.get("http://localhost:3000/simulacoes");
    const simulacoes = response.data;

    loading.style.display = "none";

    if (simulacoes.length === 0) {
      mensagemVazia.style.display = "block";
      return;
    }

    // Renderizar cada simulação
    simulacoes.forEach((simulacao) => {
      const card = criarCardSimulacao(simulacao);
      listaSimulacoes.appendChild(card);
    });
  } catch (error) {
    loading.style.display = "none";
    console.error("Erro ao carregar simulações:", error);
    listaSimulacoes.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #d32f2f;">
        <p>Erro ao carregar simulações: ${error.message}</p>
        <button onclick="carregarSimulacoes()" style="margin-top: 20px; padding: 10px 20px; background-color: #256a8a; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `;
  }
}

// Função para criar card de simulação
function criarCardSimulacao(simulacao) {
  const card = document.createElement("div");
  card.className = "card-simulacao";

  const totais = simulacao.totais || {};

  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3 class="card-titulo">${simulacao.nome || "Sem nome"}</h3>
        <div class="card-data">Criado em: ${formatarData(simulacao.criadoEm)}</div>
        ${simulacao.atualizadoEm && simulacao.atualizadoEm !== simulacao.criadoEm
          ? `<div class="card-data">Atualizado em: ${formatarData(simulacao.atualizadoEm)}</div>`
          : ""}
      </div>
    </div>
    ${simulacao.observacoes
      ? `<div class="card-observacoes">📝 ${simulacao.observacoes}</div>`
      : ""}
    <div class="card-totais">
      <div class="total-item">
        <span class="total-label">Quantidade Total</span>
        <span class="total-valor">${formatarNumero(totais.quantidade || 0)}</span>
      </div>
      <div class="total-item">
        <span class="total-label">Peso Total</span>
        <span class="total-valor">${formatarNumero(totais.peso || 0)} kg</span>
      </div>
      <div class="total-item">
        <span class="total-label">Valor Total</span>
        <span class="total-valor">${formatarMoeda(totais.valor || 0)}</span>
      </div>
      <div class="total-item">
        <span class="total-label">Ocupação</span>
        <span class="total-valor">${formatarPorcentagem(totais.ocupacao || 0)}</span>
      </div>
    </div>
    <div class="card-acoes">
      <button class="btn-acao btn-abrir" onclick="abrirSimulacao('${simulacao.id}')">
        📂 Abrir
      </button>
      <button class="btn-acao btn-editar" onclick="editarSimulacao('${simulacao.id}')">
        ✏️ Editar
      </button>
      <button class="btn-acao btn-excluir" onclick="solicitarDelete('${simulacao.id}', '${simulacao.nome.replace(/'/g, "&#39;")}')">
        🗑️ Excluir
      </button>
    </div>
  `;

  return card;
}

// Função para abrir simulação (carrega no simulador)
function abrirSimulacao(id) {
  // Salvar ID da simulação no sessionStorage para carregar no simulador
  sessionStorage.setItem("simulacaoParaCarregar", id);
  // Redirecionar para o simulador
  window.location.href = "../TelaSimulador/simuladorDeEmbarque_7.0.2.html";
}

// Função para editar simulação (mesma coisa que abrir, mas indica modo edição)
function editarSimulacao(id) {
  // Salvar ID da simulação no sessionStorage para carregar no simulador
  sessionStorage.setItem("simulacaoParaCarregar", id);
  sessionStorage.setItem("modoEdicao", "true");
  // Redirecionar para o simulador
  window.location.href = "../TelaSimulador/simuladorDeEmbarque_7.0.2.html";
}

// Função para solicitar exclusão
function solicitarDelete(id, nome) {
  simulacaoParaDeletar = id;
  document.getElementById("nomeSimulacaoDelete").textContent = nome;
  document.getElementById("modalConfirmarDelete").style.display = "block";
}

// Função para cancelar exclusão
function cancelarDelete() {
  simulacaoParaDeletar = null;
  document.getElementById("modalConfirmarDelete").style.display = "none";
}

// Função para confirmar exclusão
async function confirmarDelete() {
  if (!simulacaoParaDeletar) return;

  try {
    await axios.delete(`http://localhost:3000/simulacoes/${simulacaoParaDeletar}`);
    cancelarDelete();
    carregarSimulacoes();
    
    // Mostrar notificação de sucesso
    const notificacao = document.createElement("div");
    notificacao.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4caf50;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 4000;
      animation: slideIn 0.3s ease;
    `;
    notificacao.textContent = "Simulação excluída com sucesso!";
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
      notificacao.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notificacao.remove(), 300);
    }, 3000);
  } catch (error) {
    console.error("Erro ao excluir simulação:", error);
    alert("Erro ao excluir simulação: " + (error.response?.data?.error || error.message));
  }
}

// Carregar simulações quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  carregarSimulacoes();
});

// Adicionar animações CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
