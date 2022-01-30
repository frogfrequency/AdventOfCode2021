"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// probably didnt occur here since in all the other days there always was a puzzleInput that was importet... 
// INPUT
let puzzleInput = [1, 10];
let testInput = [4, 8];
let testInput2 = [0, 0];
let input = testInput; // change input here
// GLOBAL VARIABLES 
const winningScore = 21;
/*
    info about universeFactorsPatter:
    there is only one universe where three dicerolls equal to 3 but there are three universes where the three rolls equal to 4
        -> 1,1,2 / 1,2,1 / & 2,1,1
        so since all three cases bring the same result but they are still 3 different universes.. so the return value from where we
        calculate this universe has to be multiplicated by three..
    there are six 6 ways the three dicerolls sum up to 6
    etc.
*/
const universeFactorsPattern = [
    [3, 1],
    [4, 3],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 3],
    [9, 1]
];
// whose turn info : 0 -> player 1, 1 --> player 2 
let initialPlayerPositions = [input[0], input[1]];
let initialPlayerScores = [0, 0];
function movePawn(startingPosition, stepSize) {
    let endPosition = (startingPosition + stepSize) % 10;
    if (endPosition === 0) {
        return 10;
    }
    else {
        return endPosition;
    }
}
function continueGame(playerPositions, playerScores, whoseTurn, nextRoll, universeMultiplier) {
    // console.log(`continueGame called with:`);
    // console.log(`\t pos: ${playerPositions}`);
    // console.log(`\t score: ${playerScores}`);
    // console.log(`\t turn: ${whoseTurn}`);
    // console.log(`\t nextRoll: ${nextRoll}`);
    // console.log(`\t factor ${universeMultiplier}`);
    let playerWins = [0, 0]; // [gamesThatPlayer0Wins, gamesThatPlayer1Wins]
    playerPositions[whoseTurn] = movePawn(playerPositions[whoseTurn], nextRoll);
    playerScores[whoseTurn] += playerPositions[whoseTurn];
    whoseTurn = (whoseTurn + 1) % 2;
    if (winningScore <= playerScores[0]) {
        playerWins[0] = universeMultiplier;
        return playerWins;
    }
    else if (winningScore <= playerScores[1]) {
        playerWins[1] = universeMultiplier;
        return playerWins;
    }
    // if no one has won we have to continue the game with the different universes: 
    for (let i = 0; i < universeFactorsPattern.length; i++) {
        let resultFromFutureUniverses = continueGame([...playerPositions], [...playerScores], whoseTurn, universeFactorsPattern[i][0], universeFactorsPattern[i][1]);
        playerWins[0] += resultFromFutureUniverses[0];
        playerWins[1] += resultFromFutureUniverses[1];
    }
    // applying this universes factor to all the wins we've received from future universes:
    playerWins[0] = playerWins[0] * universeMultiplier;
    playerWins[1] = playerWins[1] * universeMultiplier;
    // console.log(playerWins);
    return playerWins;
}
function initializeGame() {
    let playerWinsOnRootLevel = [0, 0];
    for (let i = 0; i < universeFactorsPattern.length; i++) {
        const resultFromFutureUniverses = continueGame(initialPlayerPositions, initialPlayerScores, 0, universeFactorsPattern[i][0], universeFactorsPattern[i][1]);
        playerWinsOnRootLevel[0] += resultFromFutureUniverses[0];
        playerWinsOnRootLevel[1] += resultFromFutureUniverses[1];
    }
    console.log(`p0 wins: ${playerWinsOnRootLevel[0]}, p1 wins: ${playerWinsOnRootLevel[1]}`);
}
// EXECUTION
initializeGame();
// TESTING
//# sourceMappingURL=solution-part-2.js.map