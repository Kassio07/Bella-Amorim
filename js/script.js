// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

// Sldier site - controls
let slider_container = c(".slider-container"); //Container principal
let slideWidth = c(".slider--width"); //Faixa de slides
let widthItemSlide = c(".slider--item").clientWidth; // largura do item
let qtSlide_item = cs(".slider--item").length; // Qtde de item do slide
let currentSlide = 0;

// Ir para o anterior
function goPrev() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = qtSlide_item - 1;
  }
  upDateMargin();
}

// ir para o proximo
function goNext() {
  currentSlide++;
  if (currentSlide >= qtSlide_item) {
    currentSlide = 0;
  }

  upDateMargin();
}

function upDateMargin() {
  slideWidth.style.transform = `translateX(-${
    currentSlide * widthItemSlide
  }px)`;
}

let widthTela = window.innerWidth;
if (widthTela > 768) {
  setInterval(() => {
    goNext();
  }, 4000);
} else {
  // Slide touch - slide para dispositivos moveis no Touch --------------------------------------------------
  // controls
  let slides = cs(".slider--item");
  let startX = 0;
  let endX = 0;

  function showSlide(index) {
    // Não deixa voltar além do primeiro
    if (index < 0) {
      index = 0;
    }
    // Não deixa passar do último
    if (index >= slides.length) {
      index = slides.length - 1;
    }
    currentSlide = index;
    slideWidth.style.transform = `translateX(${-widthItemSlide * index}px)`;
  }

  // Captura o INICIO do toque
  slideWidth.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );

  // Captura o FIM do toque
  slideWidth.addEventListener(
    "touchend",
    (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        // Desliza para esquerda -> Próximo
        showSlide(currentSlide + 1);
      } else if (endX - startX > 50) {
        // Desliza para a direita -> anterior
        showSlide(currentSlide - 1);
      }
    },
    { passive: true }
  );
}

// Arrow up to - Btn de voltar ao topo do site ----------------------------------------------
const arrow = c(".arrow-to");
window.addEventListener("scroll", () => {
  // Esconde a seta no topo da página
  if (window.scrollY > 700) {
    arrow.style.display = "block";
  } else {
    arrow.style.display = "none";
  }
});
// função do btn pra subir pro topo do site
arrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
