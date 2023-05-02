'use strict';


// make object for game info 

const gameInfo = {
    player1Info: {
        score: 0,
        class: 'x',
    },
    player2Info: {
        score: 0,
        class: 'o',
    },
    round: 0,

}


// ELEMENTS

// save all boxes into an array / node list 

const boxes = Array.from(document.querySelectorAll('.box'));

const labelRound = document.querySelector('.round--number');
const labelPlayerO = document.querySelector('.score--player-o');

let playing = false;



let currentPlayer = gameInfo.player1Info.class;




function handleClick (e) {

    const box = e.target;
    

    placeMark(currentPlayer, box)
    
    
   

    if(checkWin(WINNING_COMBANATIONS, currentPlayer)){
        updateRound(gameInfo)
        updateScore(gameInfo, currentPlayer)
        resetGame()
        if(gameInfo.round > 2){
            const b = document.querySelector('body');
            b.style.opacity = 0;
        }
    }


    checkDraw(WINNING_COMBANATIONS, boxes)
    
    // checkWin(WINNING_COMBANATIONS, currentPlayer) && gameInfo.player1Info.class === currentPlayer ? gameInfo.player1Info.score +=1 : gameInfo.player2Info.score +=1 && updateRound(gameInfo);

   
    currentPlayer = currentPlayer === gameInfo.player1Info.class ? gameInfo.player2Info.class : gameInfo.player1Info.class ;
    
    

    
}




// destructing from boxes 
const [topRow1, topRow2, topRow3, midRow1, midRow2, midRow3, bottomRow1, bottomRow2, bottomRow3] = boxes;

// All Rows 
const topRow = [topRow1,topRow2,topRow3];
const middleRow = [midRow1, midRow2, midRow3];
const bottomRow = [bottomRow1, bottomRow2, bottomRow3];

// All Diagnals 
const diagnals1 = [topRow1, midRow2, bottomRow3];
const diagnals2 = [topRow3, midRow2, bottomRow1];

// columns 
const column1 = [topRow1, midRow1, bottomRow1];
const column2 = [topRow2, midRow2, bottomRow2];
const column3 = [topRow3, midRow3, bottomRow3];


const WINNING_COMBANATIONS = [topRow, middleRow, bottomRow, diagnals1, diagnals2, column1, column2, column3];




// Functions


// function for when a box is cliked place mark 

function placeMark (currentPlayer, box) {

    box.classList.add(currentPlayer);

}






// Check for win

function checkWin (WINNING_COMBANATIONS, currentPlayer) { 

    return WINNING_COMBANATIONS.some(combo => {
        return combo.every(box => {
            return box.classList.contains(currentPlayer)
        });
    });
}





// Check For Draw

function checkDraw(WINNING_COMBINATIONS, boxes) {
    if (!checkWin(WINNING_COMBINATIONS, gameInfo.player1Info.class) &&
        !checkWin(WINNING_COMBINATIONS, gameInfo.player2Info.class) &&
        boxes.every(box => box.classList.contains(gameInfo.player1Info.class) || box.classList.contains(gameInfo.player2Info.class))) {
      resetGame();
    }
  }
  





// update score 

function updateScore(gameInfo, currentPlayer) {
   const update = gameInfo.player1Info.class === currentPlayer ? gameInfo.player1Info.score +=1 : gameInfo.player2Info.score +=1;
   const playerScoreToUpdate = document.querySelector(`score--player-${currentPlayer}`);
   const labelScore = document.querySelector(`.player--${currentPlayer}--score`);

   labelScore.textContent = update;


   
}


// Update Round 

function updateRound (gameInfo) {

    const round = gameInfo.round += 1;
    console.log(round)
    labelRound.textContent = round;

    return round

}




function resetGame() {
    boxes.forEach(box => {
        box.classList.remove(gameInfo.player1Info.class);
        box.classList.remove(gameInfo.player2Info.class);
        box.removeEventListener('click', handleClick);
        box.addEventListener('click', handleClick);
    });
}


function hover(box){
    box.style.background = `assests/icon-${currentPlayer}-outline.svg`;
}

boxes.forEach(box => box.addEventListener('click', handleClick, {once:true}))
boxes.forEach(box => box.addEventListener('mouseover', hover, {once: true}))

