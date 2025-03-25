let selectedCube = null;
let totalQuantidade = 0;
let sequenciaPalets = [];

document.querySelectorAll('.cube').forEach((cube) => {
  cube.addEventListener('click', function () {
    selectedCube = this;
    document.getElementById('modal').style.display = 'block';
  });
});

function addEntry() {
  if (selectedCube) {
    const produto = document.getElementById('produto').value;
    const quantidade =
      parseInt(document.getElementById('quantidade').value) || 0;
    const tamanho = selectedCube.classList.contains('small')
      ? 'Pallet'
      : 'Pallet';
    const palletNum = selectedCube.textContent;
    selectedCube.style.backgroundColor = 'green';
    selectedCube.textContent = `${produto} - ${quantidade}`;
    document.getElementById(
      'cupomList'
    ).innerHTML += `<li>${tamanho} - ${palletNum}: ${produto} - ${quantidade}</li>`;

    totalQuantidade += quantidade;
    document.getElementById('totalQuantidade').textContent = totalQuantidade;

    if (!sequenciaPalets.includes(selectedCube.dataset.id)) {
      sequenciaPalets.push(selectedCube.dataset.id);
    }
    document.getElementById('sequenciaPalets').textContent =
      sequenciaPalets.join(', ');

    closeModal();
  }
}

function resetForm() {
  document.getElementById('produto').value = 'Produtos';
  document.getElementById('quantidade').value = '';
  if (selectedCube) {
    selectedCube.style.backgroundColor = '#ccc';
    selectedCube.textContent = selectedCube.dataset.id.includes('small')
      ? 'P'
      : 'G';
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function exportPDF() {
  window.print(); // Gera um PDF a partir da página
}
