"use strict";

/*---------------
    FUNCTIONS
---------------*/

/* Bonus: Aggiungere una select accanto al bottone di generazione, che fornisca una 
scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 (insane) => 100 caselle, con un numero compreso tra 1 e 100, divise
 in 10 caselle per 10 righe;

- con difficoltà 2 (hard) => 81 caselle, con un numero compreso tra 1 e 81, divise
 in 9 caselle per 9 righe;

- con difficoltà 3 (normal) => 49 caselle, con un numero compreso tra 1 e 49, divise
 in 7 caselle per 7 righe; */
function checkSelectValue(select){
    if (select.selectedIndex === 1){
        return 49;
    } else if (select.selectedIndex === 2){
        return 81;
    } else {
        return 100;
    }
};

/*---------------
    MAIN
---------------*/
const cellContainer = document.querySelector(".cell-container");
const playGameButton = document.getElementById("play-game");
const infoGameButton = document.getElementById("info-button");
const selectBody = document.getElementById("select-body");

/*L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Se non si sceglie la difficoltà, il gioco non parte.*/

playGameButton.addEventListener("click", function(){
    if(selectBody.value === "default"){
        infoGameButton.classList.remove("d-none");
    } else {
        cellContainer.innerHTML = "";
        for(let i=1; i<= checkSelectValue(selectBody); i++){
            const cellSquare = document.createElement("div");
            if(selectBody.value === "insane"){
                cellSquare.classList.add("cell-item", "difficulty-insane");
            } else if(selectBody.value === "hard"){
                cellSquare.classList.add("cell-item", "difficulty-hard");
            } else {
                cellSquare.classList.add("cell-item", "difficulty-normal");
            }
            cellSquare.innerHTML = i;
    
            /*Quando l'utente clicca su ogni cella, la cella cliccata si colora di 
            azzurro ed emetto un messaggio in console con il numero della cella cliccata.*/
            cellSquare.addEventListener("click", function(){
                this.classList.add("blue-bg-color");
                console.log(this.innerHTML);
            });
    
            cellContainer.append(cellSquare);
        }
    } 
});