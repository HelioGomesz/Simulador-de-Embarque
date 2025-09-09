document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.addEventListener("click", function () {
      document.body.style.backgroundColor = "#2ecc71";
      setTimeout(function () {
        window.location.href = "../TelaSimulador/simuladorDeEmbarque_7.0.2.html";
      }, 500);
    });
  }

  setTimeout(() => {
    const pallet = document.querySelector(".pallet");
    if (pallet) {
      pallet.style.animation = "loadPallet 10s";
    }
  }, 4000);
});
