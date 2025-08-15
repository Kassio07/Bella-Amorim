"use strict";

// simplificar para selecionar elementos
let c = (e) => document.querySelector(e);
let cs = (e) => document.querySelectorAll(e)

// Controles
const textoInsert = c(".textoDigitado");

// Destaque no texto - maquina de escrever
function textoEscrever(){
 for(let i = 0; i < textoInsert.length; i++){
  textoInsert.innerHTML += textoInsert.charAt(i);
  setTimeout(textoEscrever, 100);
 }
}

textoEscrever();