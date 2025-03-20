// Banco de dados simulando produtos já existentes
const productsDatabase = {
  "LM0001-4000850": { qtdPP: 250, qtdPG: 510 },
};

// ABRE O MODAL PARA COLETAR INPUTS DO FORM -MODAL
function openModal() {
  document.getElementById("modal").style.display = "block";
}

// FECHA O FORM - MODAL
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// FUNÇÃO PARA ADICIONAR UM NOVO CONJUNTO DE INPUTS NO FORM
function addProductField() {
  const productFields = document.getElementById("productFields");
  const newProductField = document.createElement("div");
  newProductField.classList.add("product-field");

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

// FUNÇÃO CHAMADA QUANDO O FORM FOR PREENCHIDO
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

    // VERIFICA SE O PRODUTO ESTÁ CADASTRADO NA BASE DE DADOS
    if (productsDatabase[produto]) {
      // Se o produto já existe, preenche as quantidades automaticamente
      qtdPPInputs[index].value = productsDatabase[produto].qtdPP;
      qtdPGInputs[index].value = productsDatabase[produto].qtdPG;
    }

    // ATUALIZA A INFORMAÇÃO NO QUADRADO CORRESPONDENTE
    updateSquareWithInfo(produto, qtdPP, qtdPG);
  });

  closeModal();
}

// ATUALIZA O QUADRADO COM AS INFORMAÇÕES FORNECIDAS
function updateSquareWithInfo(produto, qtdPP, qtdPG) {
  const square = document.querySelector(".clicked");
  square.textContent = `${produto}\nPP: ${qtdPP}\nPG: ${qtdPG}`;
  square.classList.add("clicked");
  square.style.fontSize = "10px";
}

// FUNÇÃO CHAMDA QUANDO UM QUADRADO É CLICADO
function handleSquareClick(event) {
  document.querySelectorAll(".square").forEach((square) => {
    square.classList.remove("clicked");
  });
  event.target.classList.add("clicked");
  openModal();
}

// ADICIONA O EVENTO NOS QUADRADOS (SQUARE)
document.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("click", handleSquareClick);
});

document.querySelector(".close").addEventListener("click", closeModal);
document
  .getElementById("productForm")
  .addEventListener("submit", handleFormSubmit);
document
  .getElementById("addProductBtn")
  .addEventListener("click", addProductField);

//INSERIR AQUI O EVENTO DO CUPON - LISTAGEM DE PRODUTOS NO CONTAINER

// FUNÇÃO PARA EXPORTAR PDF DA PAGINA
function exportPDF() {
  window.print(); // Gera um PDF a partir da página
}
