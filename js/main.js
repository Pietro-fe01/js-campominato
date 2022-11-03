"use strict";

/*---------------
    FUNCTIONS
---------------*/
// Funzione che controlla quale difficoltà è stata scelta e ritorna il numero di
// caselle da generare
function checkSelectValue(select){
    if (select.selectedIndex === 1){
        return 49;
    } else if (select.selectedIndex === 2){
        return 81;
    } else {
        return 100;
    }
};

// Funzione che genera un numero random tra min e max compresi
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Funzione che genera 16 bombe
function bombsGenerator(){
    let bombsArray = [];
    while(bombsArray.length < 16){
        let numGen = getRndInteger(1, checkSelectValue(selectBody));
        if (!bombsArray.includes(numGen)){
            bombsArray.push(numGen);
        }
    }
    return bombsArray;
}

/*---------------
    MAIN
---------------*/
const selectBody = document.getElementById("select-body");
const playGameButton = document.getElementById("play-game");
const cellContainer = document.querySelector(".cell-container");
const infoGameButton = document.getElementById("info-button");
const GameScore = document.getElementById("game-score");
let bombsList;

/*L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Se non si sceglie la difficoltà, il gioco non parte.*/

playGameButton.addEventListener("click", function(){
    if(selectBody.value !== "default"){
        infoGameButton.classList.add("d-none");

        let scorePoints = 0;
        GameScore.classList.remove("d-none");
        GameScore.innerHTML = `SCORE ${scorePoints}`;

        cellContainer.innerHTML = "";

        bombsList = (bombsGenerator());
        console.log(bombsList)
        
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
            cellSquare.addEventListener("click", function pino(){
                if(bombsList.includes(i)){
                    this.classList.add("red-bg-color");
                } else {
                    this.classList.add("blue-bg-color");
                    if(this.classList.contains("blue-bg-color")){
                        this.removeEventListener("click", pino);
                        scorePoints += 1;
                        GameScore.innerHTML = `SCORE ${scorePoints}`;
                    }
                }
                console.log(this.innerHTML);
            });
            cellContainer.append(cellSquare);
        }
    }  
});