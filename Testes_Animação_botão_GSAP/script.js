// script.js

// Função para animação no carregamento da página
window.onload = function() {
    gsap.from(".login-container", {
        opacity: 0,
        y: -50,
        duration: 1
    });

    gsap.from("h2", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.5
    });

    gsap.from(".input-group input", {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2
    });
};

// Animação de hover para o botão de login
const btnLogin = document.querySelector(".btn-login");

btnLogin.addEventListener("mouseenter", function() {
    gsap.to(btnLogin, {
        scale: 1.1,
        duration: 0.2
    });
});

btnLogin.addEventListener("mouseleave", function() {
    gsap.to(btnLogin, {
        scale: 1,
        duration: 0.2
    });
});
