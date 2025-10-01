// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

// Função dos Slides da - LP
function showSlider(containerSelector, autoPlay = true) {
  const container = c(containerSelector);
  const slideMove = container.querySelector(".slider--width");
  const slides_item = container.querySelectorAll(".slider--item");
  const next = container.querySelector(".next");
  const prev = container.querySelector(".prev");

  let current = 0;
  let width_slide = slides_item[0].clientWidth;
  let autoplayInterval = null; // controla autoplay

  // >>> ajuste para recalcular largura no resize (mobile responsivo)
  function updateWidth() {
    width_slide = slides_item[0].clientWidth;
    vaPara(current);
  }

  function vaPara(index) {
    if (index < 0) index = slides_item.length - 1;
    if (index >= slides_item.length) index = 0;

    current = index;
    slideMove.style.transform = `translateX(-${current * width_slide}px)`;
  }

  function goPrev() {
    vaPara(current - 1);
  }
  function goNext() {
    vaPara(current + 1);
  }

  next.addEventListener("click", goNext);
  prev.addEventListener("click", goPrev);

  // >>> chama updateWidth no resize (mobile/tablet/desktop)
  window.addEventListener("resize", updateWidth);

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

  // >>> chama updateWidth na inicialização
  updateWidth();

  return { goNext, goPrev, vaPara };
}

// Chama a função dos slides
showSlider(".slider-container");
showSlider(".slider-container.two");

// Arrow up to - Btn de voltar ao topo do site
let arrow = c(".arrow-to");
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
