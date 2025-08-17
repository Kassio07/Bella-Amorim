// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e);

let totalSlide = cs(".testemunhas-card").length; // Qtde de cards
c(".slides").style.width = `calc(380 * ${totalSlide}px)`;

let currentSlide = 0;

function goPrev(){
 currentSlide --;
 if(currentSlide < 0){
  currentSlide = totalSlide - 1
 }
 updateMargin();
}

function goNext(){
 currentSlide ++;
 if(currentSlide > totalSlide - 1){
  currentSlide = 0;
 }
 updateMargin();
}


function updateMargin(){
 let slideWidth = c('.testemunhas-card').clientWidth;
 let newMargin = currentSlide * slideWidth;
 c('.slides').style.marginLeft = `-${newMargin}px`;
}

setInterval(goNext, 4000);