"use strict";

/*---------------
    FUNCTIONS
---------------*/
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
    if(selectBody.value !== "default"){
        infoGameButton.classList.add("d-none");
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
            azzurro ed emetto un messaggio in console con il numero della cella 
            cliccata.*/
            cellSquare.addEventListener("click", function(){
                this.classList.add("blue-bg-color");
                console.log(this.innerHTML);
            });
    
            cellContainer.append(cellSquare);
        }
    }  
});