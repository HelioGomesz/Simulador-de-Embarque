const cakeButton = document.getElementById('cake-button');
const honeyBreadButton = document.getElementById('honey-bread-button');
const donutButton = document.getElementById('donut-button');
const clearButton = document.getElementById('clear-button');
const invoiceContainer = document.getElementById('invoice');

let selectedItems = [];

// Função para gerar a nota na tela
function generateInvoice() {
  let total = 0;
  let invoiceHTML = '<ul>';

  selectedItems.forEach(item => {
    invoiceHTML += `<li>${item.name} - R$${item.price.toFixed(2)}</li>`;
    total += item.price;
  });

  invoiceHTML += `</ul><strong>Total: R$${total.toFixed(2)}</strong>`;
  invoiceContainer.innerHTML = invoiceHTML;
}

// Função para adicionar item à nota
function addItemToInvoice(itemId) {
  const selectedItem = data.find(item => item.id === itemId);

  if (!selectedItem) return;

  selectedItems.push(selectedItem);
  generateInvoice();
}

// Função para limpar a nota
function clearInvoice() {
  selectedItems = [];
  invoiceContainer.innerHTML = '';
}

// Adicionando eventos para os botões
cakeButton.addEventListener('click', () => addItemToInvoice(1));
honeyBreadButton.addEventListener('click', () => addItemToInvoice(2));
donutButton.addEventListener('click', () => addItemToInvoice(3));
clearButton.addEventListener('click', clearInvoice);
