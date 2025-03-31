let selectedCube = null;
let totalQuantidade = 0;
let sequenciaPalets = [];
let totalPeso = 0;
let produtosResumo = {};

document.querySelectorAll('.cube').forEach((cube) => {
  cube.addEventListener('click', function () {
    selectedCube = this;
    document.getElementById('modal').style.display = 'block';
  });
});

// RESUMO DO CUPOM DE EMBARQUE COM O TOTAL DE PRODUTOS

function addEntry() {
  if (selectedCube) {
    const produto = document.getElementById('produto').value;
    const quantidade =
      parseInt(document.getElementById('quantidade').value) || 0;
    const peso = parseInt(document.getElementById('peso').value) || 0;

    // Atualiza o total de peso
    totalPeso += peso;
    document.getElementById('totalPeso').textContent = totalPeso + '';

    // Inclusão das informações no pallet
    const tamanho = selectedCube.classList.contains('small') ? 'P' : 'P';
    const palletNum = selectedCube.textContent;
    selectedCube.style.backgroundColor = '#492';
    selectedCube.textContent = `${produto} - QTD ${quantidade}  - ${peso} Kg`;

    // Inclusão das informações no cupom de embarque
    document.getElementById(
      'cupomList'
    ).innerHTML += `<li>${tamanho} - ${palletNum}: ${produto} ____ ${quantidade} ____${peso}</li>`;

    totalQuantidade += quantidade;
    document.getElementById('totalQuantidade').textContent = totalQuantidade;

    if (!produtosResumo[produto]) {
      produtosResumo[produto] = 0;
    }
    produtosResumo[produto] += quantidade;
    atualizarResumo();

    closeModal();
  }
}

// RESETA O FORMULARIO AO CLICAR NO BOTÃO EXCLUIR(Incluir código para retirar do cupom as informações excluidas)
function resetForm() {
  document.getElementById('produto').value = 'Produtos';
  document.getElementById('quantidade').value = '0';
  document.getElementById('peso').value = 'peso';
  if (selectedCube) {
    selectedCube.style.backgroundColor = '#b40';
    selectedCube.textContent = selectedCube.dataset.id.includes('small')
      ? 'P'
      : 'G';
  }
}

// Fecha o formulário ao clicar no botão fechar
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Lógica para inserir os dados no cupom de resumo geral
function atualizarResumo() {
  const resumoList = document.getElementById('resumoList');
  resumoList.innerHTML = '';
  for (let produto in produtosResumo) {
    resumoList.innerHTML += `<li>${produto}: ${produtosResumo[produto]}</li>`;
  }
}

// FUNÇÃO PARA PERMITIR ARRASTAR O FORMULÁRIO NA PAGINA COM O MOUSE
function makeModalDraggable() {
  const modal = document.getElementById('modal');
  const header = document.getElementById('modal-header');
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
      modal.style.left = modal.offsetLeft + offsetX + 'px';
      modal.style.top = modal.offsetTop + offsetY + 'px';
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

// FUNÇÃO PARA EXPORTAR PDF DA PAGINA
function exportPDF() {
  window.print(); // Gera um PDF a partir da página
}
