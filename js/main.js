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

function restartGame(){
    location.reload();
}

/*---------------
    MAIN
---------------*/
const selectBody = document.getElementById("select-body");
const playGameButton = document.getElementById("play-game");
const cellContainer = document.querySelector(".cell-container");
const infoGameButton = document.getElementById("info-button");
const GameScore = document.getElementById("game-score");
const endGameBlock = document.getElementById("end-game");
const endGameButton = document.getElementById("end-game-button");
const winLoseMessage =document.getElementById("win-lose-message");

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

        let bombsList = (bombsGenerator());
        console.log(bombsList)
        
        for(let i=1; i<= checkSelectValue(selectBody); i++){
            let cellSquare = document.createElement("div");
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
            cellSquare.addEventListener("click", function checkingSquare(){
                if(bombsList.includes(i)){
                    cellSquare.classList.add("red-bg-color");
                } else {
                    cellSquare.classList.add("blue-bg-color");
                }

                if(cellSquare.classList.contains("blue-bg-color")){
                    cellSquare.removeEventListener("click", checkingSquare);
                    GameScore.innerHTML = `SCORE ${scorePoints += 1}`;
                    if (scorePoints === (checkSelectValue(selectBody) - 16)){
                        winLoseMessage.innerHTML = "Hai vinto!";
                        endGameBlock.classList.remove("d-none");
                    }
                } else if(cellSquare.classList.contains("red-bg-color")){
                    for(let i=1; i<bombsList.length; i++){
                        let findAllBombs = document.querySelector(`.cell-item:nth-child(${bombsList[i]})`);
                        findAllBombs.classList.add("red-bg-color");
                    }
                    winLoseMessage.innerHTML = "Hai perso!";
                    endGameBlock.classList.remove("d-none");
                    GameScore.innerHTML = `TOTAL SCORED - ${scorePoints}`;
                }
            });
            cellContainer.append(cellSquare);
        }
    }
});

endGameButton.addEventListener("click", function(){
    location.reload();
});

