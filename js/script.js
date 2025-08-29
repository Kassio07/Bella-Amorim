// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

let totalSlideItem = cs('.slider--item').length; // Qtde de item
let widthItem = c('.slider--item').clientWidth; // Largura do item
let slideWidth = c('.slider--width').clientWidth; // Largura do width(scroll)

let currentSlide = 0;

function goPrev(){
 currentSlide --;
 if(currentSlide < 0){
  currentSlide = totalSlideItem -1;
 }

 updateMargin();
}

function goNext(){
 currentSlide ++;
 if(currentSlide > totalSlideItem - 1){
  currentSlide = 0;
 }
 updateMargin();
}

function updateMargin(){
c('.slider--width').style.transform = `translateX(-${currentSlide * widthItem}px)`;
}

setInterval(goNext, 7000);

// Arrow up to
window.addEventListener("scroll", ()=>{
    const arrow = c('.arrow-to');
    if(window.scrollY > 700){
        arrow.style.display = 'block';
    }else{
        arrow.style.display = 'none';
    }

    arrow.addEventListener('click', ()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    })
})


// Slide touch

// controls
let slider = c(".slider--width");
let slides = cs(".slider--item");
let startX = 0;
let endX = 0;
let currentIndex = 0;

function showSlide(index){

    // Não deixa voltar além do primeiro
    if(index < 0){
        index = 0;
    }
    // Não deixa passar do último
    if(index >= slides.length){
        index = slides.length -1;
    }
    currentIndex = index;
    slider.style.transform = `translate(${-310 * index}px)`;
}   

// Captura o INICIO do toque 
slider.addEventListener("touchstart", (e)=>{
    startX = e.touches[0].clientX;
});

// Captura o FIM do toque
slider.addEventListener("touchend", (e) =>{
    endX = e.changedTouches[0].clientX;
    if(startX - endX > 50){
        // Desliza para esquerda -> Próximo
        showSlide(currentIndex + 1)
    }else if(endX - startX > 50){
        // Desliza para a direita -> anterior
        showSlide(currentIndex -1);
    }
});





