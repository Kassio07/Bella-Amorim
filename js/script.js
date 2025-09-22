// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

// Função dos Slides da - LP
function showSlider(containerSelector, autoPlay = true) {
  const container = c(containerSelector);
  // Slide que contém todos os slides item
  const slideMove = container.querySelector(".slider--width");
  // Seleciona todos os itens do slide
  const slides_item = container.querySelectorAll(".slider--item");

  // Btn manual do slide
  const next = container.querySelector(".next");
  const prev = container.querySelector(".prev");

  // Variável de incremento
  let current = 0;
  // Largura do item do slide
  let width_slide = slides_item[0].clientWidth;
  // Lógica do slide
  function vaPara(index) {
    if (index <= 0) {
      index = slides_item.length - 1;
    }
    if (index >= slides_item.length) index = 0;

    current = index;

    slideMove.style.transform = `translateX(-${current * width_slide}px)`;
  }
  // Função dos botões manual do slides
  function goPrev() {
    vaPara(current - 1);
  }
  function goNext() {
    vaPara(current + 1);
  }
  // Liga os botões manuais do slides
  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);
  // AutoPlay
  if (autoPlay && window.innerWidth > 768) {
    setInterval(goNext, 4000);
  }

  // Slides deslizante - Mobil
  if (window.innerWidth <= 768) {
    let startX = 0,
      endX = 0;

    container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      (e) => {
        endX = e.changedTouches[0].clientX;
        const delta = endX - startX;

        if (Math.abs(delta) > 50) {
          if (delta < 0) goNext();
          else goPrev();
        }
      },
      { passive: true }
    );
  }

  return { goNext, goPrev, vaPara };
}

// Chama a função dos slides
showSlider(".slider-container");
showSlider(".slider-container.two");

// Arrow up to - Btn de voltar ao topo do site
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

