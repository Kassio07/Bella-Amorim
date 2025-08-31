// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

// Slide auto Testemunhas-----------------------------------
// Controles
let totalSlides = cs(".slider--item"); // Pega todos os item
let sliderWidthContainer = c(".slider--width"); // Pega o container dos item
let slideWidthTotal = totalSlides.length; //Qtde total dos item 
let widthItem = totalSlides[0].offsetWidth; //Largura de um item

// Variavel de contator
let currentSlide = 0;

// Função de navegação - Anterior
function goPrev() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slideWidthTotal - 1;
  }
  updateMargin();
}

// Função de navegação - Próximo
function goNext() {
  currentSlide++;
  if (currentSlide > slideWidthTotal - 1) {
    currentSlide = 0;
  }
  updateMargin();
}
function updateMargin() {
  sliderWidthContainer.style.transform = `translateX(-${currentSlide * widthItem}px)`;
}

// Pega a largura total da tela do usuário
let larguraTela = window.innerWidth;
// Roda essa função automatica somente quando a tela do usuário for maior que 577px
if(larguraTela > 577){
    setInterval(goNext, 3000);
}


// Arrow up to - Btn de voltar ao topo do site ----------------------------------------------

window.addEventListener("scroll", () => {
  const arrow = c(".arrow-to");
  // Esconde a seta no topo da página
  if (window.scrollY > 700) {
    arrow.style.display = "block";
  } else {
    arrow.style.display = "none";
  }
  // Roda a função pra subir pro topo
  arrow.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Slide touch - slide para dispositivos moveis no Touch --------------------------------------------------
// controls
let slider = c(".slider--width");
let slides = cs(".slider--item");
let startX = 0;
let endX = 0;
let currentIndex = 0;

function showSlide(index) {
  // Não deixa voltar além do primeiro
  if (index < 0) {
    index = 0;
  }
  // Não deixa passar do último
  if (index >= slides.length) {
    index = slides.length - 1;
  }
  currentIndex = index;
  slider.style.transform = `translate(${-330 * index}px)`;
}

// Captura o INICIO do toque
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, {passive: true});

// Captura o FIM do toque
slider.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    // Desliza para esquerda -> Próximo
    showSlide(currentIndex + 1);
  } else if (endX - startX > 50) {
    // Desliza para a direita -> anterior
    showSlide(currentIndex - 1);
  }
}, {passive:true});
