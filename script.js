function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

function goBack() {
  showScreen('home');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Ecos de Plata y Oscuridad - Aplicación cargada correctamente');
});

/* */
const container = document.querySelector('.blood-container');
const title = document.getElementById('vampTitle');

/* Separar letras para poder mancharlas individualmente */
const text = title.innerText.trim();
title.innerHTML = "";
text.split("").forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
});

/* Crear gotas continuamente */
setInterval(createDrop, 200);

function createDrop() {
  const drop = document.createElement("div");
  drop.classList.add("blood-drop");

  const x = Math.random() * window.innerWidth;
  drop.style.left = x + "px";
  container.appendChild(drop);

  /* Detectar impacto */
  const dropInterval = setInterval(() => {
    const dropRect = drop.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();

    if (
      dropRect.bottom >= titleRect.top &&
      dropRect.left >= titleRect.left &&
      dropRect.right <= titleRect.right
    ) {
      impact(dropRect.left, titleRect);
      drop.remove();
      clearInterval(dropInterval);
    }
  }, 20);

  drop.addEventListener("animationend", () => {
    drop.remove();
  });
}

/* IMPACTO */
function impact(xPos, titleRect) {
  title.classList.add("shake");
  setTimeout(() => title.classList.remove("shake"), 300);

  const letters = [...title.querySelectorAll("span")];

  letters.forEach(letter => {
    const r = letter.getBoundingClientRect();

    if (xPos >= r.left && xPos <= r.right) {
      letter.classList.add("stained");
      setTimeout(() => {
        letter.classList.remove("stained");
      }, 2000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("vampTitle");
  const text = title.textContent;
  title.innerHTML = ""; // limpiar

  text.split("").forEach(char => {
    if (char === " ") {
      const span = document.createElement("span");
      span.classList.add("space");
      title.appendChild(span);
    } else {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = char;
      title.appendChild(span);
    }
  });
});