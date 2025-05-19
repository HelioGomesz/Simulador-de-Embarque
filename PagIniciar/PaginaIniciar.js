document.getElementById("startButton").addEventListener("click", function () {
  document.body.style.backgroundColor = "#2ecc71";
  setTimeout(function () {
    window.location.href = "../simuladorRev6.html";
  }, 500);
});

setTimeout(() => {
  document.querySelector(".pallet").style.animation =
    "loadPallet 2s infinite alternate ease-in-out";
}, 4000);
