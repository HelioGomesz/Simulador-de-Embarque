// Abre o formulário ao clicar no quadrado
function openForm(index) {
  const square = document.querySelectorAll('.square')[index - 1];
  
  if (!square.classList.contains('clicked')) {
    const value = prompt(`Preencha o valor para o quadrado ${index}:`);
    
    if (value !== null && value.trim() !== "") {
      square.classList.add('clicked');
      square.innerText = value; // Mostra o valor preenchido no quadrado
    }
  }
}

// Ação para botão de configurações
function openSettings() {
  alert("Abrindo configurações...");
}

// Ação para botão de logout
function logout() {
  const confirmLogout = confirm("Tem certeza que deseja sair?");
  if (confirmLogout) {
    alert("Você saiu do sistema.");
    window.location.reload();
  }
}

// Ação para exportar em PDF
function exportPDF() {
  alert("Exportando em PDF...");
  window.print(); // Gera um PDF a partir da página
}
