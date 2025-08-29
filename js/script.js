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

setInterval(goNext, 4000);

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



