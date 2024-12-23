document.addEventListener("DOMContentLoaded", () => {
  const setup = document.getElementById("setup");
  const menu = document.getElementById("menu");
  const waterSimulator = document.getElementById("waterSimulator");
  const waterForm = document.getElementById("waterForm");
  const selectionForm = document.getElementById("selectionForm");
  const addWaterButton = document.getElementById("addWater");
  const dailyGoalSpan = document.getElementById("dailyGoal");
  const weightInput = document.getElementById("weight");
  const containerSelect = document.getElementById("containerSelect");
  const waterLevel = document.getElementById("waterLevel");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const modalMessage = document.getElementById("modalMessage");

  let dailyGoal = 0; // Meta diária de água em ml
  let currentWaterLevel = 0; // Quantidade de água consumida
  let containerValue = 200; // Valor padrão do recipiente

  // Cálculo da meta diária com base no peso
  waterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = parseInt(weightInput.value, 10);
    if (!isNaN(weight) && weight > 0) {
      dailyGoal = weight * 35; // Regra de 35ml por kg
      dailyGoalSpan.textContent = `${dailyGoal} ml`;
      setup.style.display = "none";
      menu.style.display = "block";
    } else {
      alert("Por favor, insira um peso válido.");
    }
  });

  // Seleção do recipiente
  selectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    containerValue = parseInt(containerSelect.value, 10); // Valor do recipiente selecionado
    if (containerValue) {
      menu.style.display = "none";
      waterSimulator.style.display = "block";
    } else {
      alert("Por favor, selecione um recipiente.");
    }
  });

  // Botão para adicionar água
  addWaterButton.addEventListener("click", () => {
    if (currentWaterLevel < dailyGoal) {
      currentWaterLevel += containerValue;
      if (currentWaterLevel > dailyGoal) {
        currentWaterLevel = dailyGoal; // Não ultrapassar a meta
      }
      const percentage = (currentWaterLevel / dailyGoal) * 100;
      waterLevel.style.height = `${percentage}%`;
    } else {
      // Exibir modal quando atingir a meta
      successModal.style.display = "block";
    }
  });

  // Fechar o modal
  closeModal.addEventListener("click", () => {
    successModal.style.display = "none";
  });

  // Fechar o modal ao clicar fora do conteúdo
  window.addEventListener("click", (event) => {
    if (event.target === successModal) {
      successModal.style.display = "none";
    }
  });
});

document.getElementById("addWater").addEventListener("click", function() {
  // Código existente para o comportamento do botão
  // ...

  // Reproduz o som de gole
  const gulpSound = document.getElementById("gulpSound");
  gulpSound.volume = 0.5; // Ajusta o volume para 50%
  gulpSound.play();
});
