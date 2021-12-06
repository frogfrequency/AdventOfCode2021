import { givePreprocessedCards } from "./puzzle-input-preprocessor.mjs";
import { puzzleDraws, puzzleCards } from "./puzzle-input.mjs";

const testCards =
    `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

const testDraws = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];


const draws = puzzleDraws;
let cards = givePreprocessedCards(puzzleCards);


function playGame(draws) {
    for (let i = 0; i < draws.length; i++) {
        let currentNumber = draws[i];
        playRound(currentNumber);
        let bingoScore = giveBingoScore();
        if (bingoScore != -1) {
            console.log(`lastNumber: (${currentNumber}) * sum of unmarked numbers in winning card (${bingoScore}) = ${currentNumber*bingoScore}`);
            return
        }
    }
}

function playRound(number) { // search all cards for current Number and if found exchange with 'x'
    cards.forEach(element => {
        element.forEach(function (item, idx, theArr) {
            let targetNumberIdx = item.indexOf(number);
            if (targetNumberIdx !== -1) {
                theArr[idx][targetNumberIdx] = 'x';
            }
        });
    });
}


function giveBingoScore() { // return -1 if no Bingo found in all cards. otherwise returns sum of remaining numbers in card
    let bingoScore = -1;
    cards.forEach(function (card) {
        for (let i = 0; i < 5; i++) {
            let currentColumn = []; // the respective column is built here with the next for loop
            for (let j = 0; j < 5; j++) {
                currentColumn.push(card[j][i]);
            }
            if ( rowOrColumnHasBingo(currentColumn) || rowOrColumnHasBingo(card[i]) ) {
                console.log('BIIIIINGGGOOOOOOOOOO');
                bingoScore = giveRemainingScore(card);
            }
        }
    });
    return bingoScore
}

function rowOrColumnHasBingo(input) {
    let xCounter = 0;
    for (let i = 0; i < 5; i++) {
        if (input[i] === 'x') {
            xCounter++
        }
    }
    if (xCounter === 5) {
        return true
    } else {
        return false
    }
}

function giveRemainingScore(card) {
    let counter = 0;
    for (let i=0; i<5; i++) {
        for (let j=0; j<5; j++) {
            if( card[i][j] != 'x') {
                counter += card[i][j]
            }
        }
    }
    return counter
}


playGame(draws);

