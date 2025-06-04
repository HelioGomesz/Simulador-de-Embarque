const form = document.getElementById("form-lancamento");
const tabela = document.getElementById("tabela-lancamentos");

let lancamentos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!data || !descricao || isNaN(valor) || !tipo) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const lancamento = { data, descricao, valor, tipo };
  lancamentos.push(lancamento);

  form.reset();
  atualizarTabela();
  atualizarDashboard();
});

function atualizarTabela() {
  tabela.innerHTML = "";

  lancamentos.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${item.data}</td>
            <td>${item.descricao}</td>
            <td>${item.tipo}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td><button class="delete-btn" onclick="deletarLancamento(${index})">Excluir</button></td>
        `;

    tabela.appendChild(tr);
  });
}

function atualizarDashboard() {
  const totalReceitas = lancamentos
    .filter((item) => item.tipo === "Receita")
    .reduce((acc, item) => acc + item.valor, 0);

  const totalDespesas = lancamentos
    .filter((item) => item.tipo === "Despesa")
    .reduce((acc, item) => acc + item.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  document.getElementById(
    "total-receitas"
  ).innerText = `R$ ${totalReceitas.toFixed(2)}`;
  document.getElementById(
    "total-despesas"
  ).innerText = `R$ ${totalDespesas.toFixed(2)}`;
  document.getElementById("saldo").innerText = `R$ ${saldo.toFixed(2)}`;
}

function deletarLancamento(index) {
  lancamentos.splice(index, 1);
  atualizarTabela();
  atualizarDashboard();
}

function downloadPDF() {
  const element = document.body; // Pode ser main, body ou outro elemento específico

  const opt = {
    margin: 0.5,
    filename: "controle-financeiro.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
  };

  html2pdf().set(opt).from(element).save();
}
