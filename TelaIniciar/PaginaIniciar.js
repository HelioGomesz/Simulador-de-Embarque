document.getElementById("startButton").addEventListener("click", function () {
  document.body.style.backgroundColor = "#2ecc71";
  setTimeout(function () {
    window.location.href = "../TelaSimulador/simuladorDeEmbarque_7.0.2.html";
  }, 500);
});

setTimeout(() => {
  document.querySelector(".pallet").style.animation = "loadPallet 10s";
}, 4000);
