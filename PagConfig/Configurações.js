// Função para abrir o modal
function abrirFormulario(id) {
  document.getElementById(id).style.display = 'flex';
}

// Função para fechar o modal
function fecharFormulario(id) {
  document.getElementById(id).style.display = 'none';
}

// Fechar modal ao clicar fora dele
window.onclick = function (event) {
  document.querySelectorAll('.modal').forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};

// Captura os formulários e redireciona após salvar
document.getElementById('formIncluir').onsubmit = function (event) {
  event.preventDefault();
  alert('Produto incluído com sucesso!');
  window.location.href =
    '/Simulador-de-Embarque/AppSimulador/SimuladorEmbarque.html';
};

document.getElementById('formAlterar').onsubmit = function (event) {
  event.preventDefault();
  alert('Produto alterado com sucesso!');
  window.location.href =
    '/Simulador-de-Embarque/AppSimulador/SimuladorEmbarque.html';
};

document.getElementById('formExcluir').onsubmit = function (event) {
  event.preventDefault();
  alert('Produto excluído com sucesso!');
  window.location.href =
    '/Simulador-de-Embarque/AppSimulador/SimuladorEmbarque.html';
};
