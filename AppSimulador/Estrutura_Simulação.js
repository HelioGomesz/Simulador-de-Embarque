// Banco de dados simulando produtos já existentes
const productsDatabase = {
  'LM0001-4000850': { qtdPP: 250, qtdPG: 510 },
};

// Abre o modal para coletar informações do produto
function openModal() {
  document.getElementById('modal').style.display = 'block';
}

// Fecha o modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Função para adicionar um novo conjunto de campos de produto
function addProductField() {
  const productFields = document.getElementById('productFields');
  const newProductField = document.createElement('div');
  newProductField.classList.add('product-field');

  const productCount = productFields.children.length + 1; // Contador para criar IDs exclusivos

  newProductField.innerHTML = `
        <label for="produto${productCount}">PRODUTO:</label>
        <input type="text" id="produto${productCount}" name="produto[]" required>
        
        <label for="qtdPP${productCount}">QTD PP:</label>
        <input type="number" id="qtdPP${productCount}" name="qtdPP[]" required>
        
        <label for="qtdPG${productCount}">QTD PG:</label>
        <input type="number" id="qtdPG${productCount}" name="qtdPG[]" required>
    `;

  productFields.appendChild(newProductField);
}

// Função chamada quando o formulário for enviado
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const produtoInputs = form.querySelectorAll('[name="produto[]"]');
  const qtdPPInputs = form.querySelectorAll('[name="qtdPP[]"]');
  const qtdPGInputs = form.querySelectorAll('[name="qtdPG[]"]');

  produtoInputs.forEach((input, index) => {
    const produto = input.value;
    const qtdPP = qtdPPInputs[index].value;
    const qtdPG = qtdPGInputs[index].value;

    // Verifica se o produto já está na base de dados
    if (productsDatabase[produto]) {
      // Se o produto já existe, preenche as quantidades automaticamente
      qtdPPInputs[index].value = productsDatabase[produto].qtdPP;
      qtdPGInputs[index].value = productsDatabase[produto].qtdPG;
    }

    // Atualiza a informação no quadrado correspondente
    updateSquareWithInfo(produto, qtdPP, qtdPG);
  });

  closeModal();
}

// Atualiza o quadrado com as informações fornecidas
function updateSquareWithInfo(produto, qtdPP, qtdPG) {
  const square = document.querySelector('.clicked');
  square.textContent = `${produto}\nPP: ${qtdPP}\nPG: ${qtdPG}`;
  square.classList.add('clicked');
  square.style.fontSize = '10px';
}

// Função chamada quando um quadrado é clicado
function handleSquareClick(event) {
  document.querySelectorAll('.square').forEach((square) => {
    square.classList.remove('clicked');
  });
  event.target.classList.add('clicked');
  openModal();
}

// Adiciona eventos aos quadrados
document.querySelectorAll('.square').forEach((square) => {
  square.addEventListener('click', handleSquareClick);
});

document.querySelector('.close').addEventListener('click', closeModal);
document
  .getElementById('productForm')
  .addEventListener('submit', handleFormSubmit);
document
  .getElementById('addProductBtn')
  .addEventListener('click', addProductField);

  //código para gerar pdf e ajuste das config.

  document.getElementById('generate-pdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
  
    // Capturar o conteúdo usando html2canvas e gerar pdf
    html2canvas(document.querySelector('#conteudo'),{
      scale: 2, //aumenta a resolução da captura
      useCORS: true //permite capturar imagens externas sem bloquei de CORS
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // Formato A4
  
      const imgWidth = 297 //Largura em mm para A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('simulação.pdf');
    });
  });
  