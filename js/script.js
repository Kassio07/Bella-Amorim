
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

  // Função para iniciar/parar autoplay
  function startAutoPlay() {
    if (!autoplayInterval && autoPlay && window.innerWidth > 768) {
      autoplayInterval = setInterval(goNext, 4000);
    }
  }
  function stopAutoPlay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  // Slides deslizante - Mobile
  if (window.innerWidth <= 768) {
    let startX = 0, endX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
      if (Math.abs(delta) > 50) {
        if (delta < 0) goNext();
        else goPrev();
      }
    }, { passive: true });
  }

  // Usando IntersectionObserver para iniciar autoplay só quando visível
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    });
  }, { threshold: 0.5 }); // 50% visível

  observer.observe(container);

  return { goNext, goPrev, vaPara, startAutoPlay, stopAutoPlay };
}

// Chama a função dos slides
showSlider(".slider-container");
showSlider(".slider-container.two");

// Arrow up - Btn de voltar ao topo
let arrow = c(".arrow-to");
window.addEventListener("scroll", () => {
  arrow.style.display = window.scrollY > 700 ? "block" : "none";
});
arrow.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

