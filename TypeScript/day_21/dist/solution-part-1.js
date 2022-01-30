"use strict";
// INPUT
let puzzeInput = [1, 10];
let testInput = [4, 8];
let input = testInput; // change input here
// GLOBAL VARIABLES 
const winningScore = 1000;
let whoseTurn = 0; // 0 -> player 1, 1 --> player 2 
let playerPositions = [input[0], input[1]];
let playerScores = [0, 0];
let deterministicDieRollCounter = 0; // should "nextDieRoll" be a thing or should it be derived from the coutner? probably deriving from counter is better
function dieRoll() {
    let roll = (deterministicDieRollCounter % 100) + 1;
    deterministicDieRollCounter++;
    console.log(roll);
    return roll;
}
function movePawn(startingPosition, dieRoll) {
    let landingSpace = (startingPosition + dieRoll) % 10;
    if (landingSpace === 0) {
        return 10;
    }
    else {
        return landingSpace;
    }
}
function playGame(winningScore) {
    while (playerPositions[0] < 1000 && playerPositions[1] < 1000) {
        for (let i = 0; i < 3; i++) {
            const currentRoll = dieRoll();
            playerPositions[whoseTurn] = movePawn(playerPositions[whoseTurn], currentRoll);
            playerScores[whoseTurn] += playerPositions[whoseTurn];
            deterministicDieRollCounter++;
        }
    }
    console.log(playerScores[0], playerScores[0]);
}
// EXECUTION
playGame(1000);
//# sourceMappingURL=solution-part-1.js.map