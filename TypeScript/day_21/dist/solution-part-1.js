"use strict";
// INPUT
let puzzleInput = [1, 10];
let testInput = [4, 8];
let input = puzzleInput; // change input here
// GLOBAL VARIABLES 
const winningScore = 1000;
let whoseTurn = 0; // 0 -> player 1, 1 --> player 2 
let playerPositions = [input[0], input[1]];
let playerScores = [0, 0];
let deterministicDieRollCounter = 0; // should "nextDieRoll" be a thing or should it be derived from the coutner? probably deriving from counter is better
function dieRoll() {
    let roll = (deterministicDieRollCounter % 100) + 1;
    deterministicDieRollCounter++;
    return roll;
}
function movePawn(startingPosition, sumOfThreeRolls) {
    let landingSpace = (startingPosition + sumOfThreeRolls) % 10;
    if (landingSpace === 0) {
        return 10;
    }
    else {
        return landingSpace;
    }
}
function playGame(winningScore) {
    while (playerScores[0] < 1000 && playerScores[1] < 1000) {
        // console.log(playerScores);
        let sumOfThreeRolls = 0;
        for (let i = 0; i < 3; i++) {
            sumOfThreeRolls += dieRoll();
        }
        playerPositions[whoseTurn] = movePawn(playerPositions[whoseTurn], sumOfThreeRolls);
        playerScores[whoseTurn] += playerPositions[whoseTurn];
        whoseTurn = (whoseTurn + 1) % 2;
    }
    console.log(playerScores[0], playerScores[1], deterministicDieRollCounter);
    if (playerScores[0] < playerScores[1]) {
        console.log(`final puzzle solution: ${playerScores[0] * deterministicDieRollCounter}`);
    }
    else {
        console.log(`final puzzle solution: ${playerScores[1] * deterministicDieRollCounter}`);
    }
}
// EXECUTION
playGame(1000);
// TESTING
//# sourceMappingURL=solution-part-1.js.map