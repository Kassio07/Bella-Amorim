// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

let totalSlideItem = cs('.slider--item').length;
let slideWidth = c('.slider--width').clientWidth;
let widthItem = c('.slider--item').clientWidth;

c('.slider--width').style.width = `${slideWidth * totalSlideItem}px`;

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



