// Ambiente reservado para código de validação de usuário e login

// Chamar elementosHTML pelo ID
let botaoLogin = document.getElementById("botao-Login");
let emailLogin = document.getElementById("email");
let senhaLogin = document.getElementById("password");

//Credencias padrão -  login e Senha
const validarUsuario = "admin@lumicenter.com";
const validarSenha = "1234";


// Evento de click no botão login
botaoLogin.addEventListener("click", function() {
    const pegarUsuario = emailLogin.value; // obter valor do campo usuário do HTML
    const pegarSenha = senhaLogin.value; // obter valor do campo senha do HTML
    if (pegarUsuario === validarUsuario && pegarSenha === validarSenha){       //Verificar se os dados inseridos correspondem às credenciais padrão
        window.location.href = "../AppSimulador/Simulador.html";    //Função de redirecionar para página desejada
    } else {
        alert("Usuário ou Senha incorretos"); //Alertar quando houver erro de entrada
    }

});
