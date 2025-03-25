document.getElementById("startButton").addEventListener("click", function () {
  document.body.style.backgroundColor = "#2ecc71";
  setTimeout(function () {
    window.location.href = "../Teste_Tela_Simulador/teste5.html";
  }, 500);
});

setTimeout(() => {
  document.querySelector(".pallet").style.animation =
    "loadPallet 2s infinite alternate ease-in-out";
}, 4000);
