import { puzzleFishList } from "./puzzle-input.mjs";
const testList = [3, 4, 3, 1, 2];

let fishList = puzzleFishList; // change input here
let fishCountArr = new Array(9).fill(0);
fishList.forEach(item => fishCountArr[item]++);


function simulateDay() {
    let nextRoundBabyFishes = fishCountArr[0]; // using nextRoundBabyFishes as temporary storage

    for (let i = 0; i < 8; i++) {
        fishCountArr[i] = fishCountArr[i + 1];
    }

    fishCountArr[8] = nextRoundBabyFishes;
    fishCountArr[6] += nextRoundBabyFishes;
}


function simulateDays(amount) {
    for (let i = 0; i < amount; i++) {
        simulateDay();
    }
}


function giveSum(countArr) {
    let counter = 0;
    for (let i = 0; i < countArr.length; i++) {
        counter = counter + countArr[i];
    }
    return counter
}

// exec

simulateDays(256);

console.log('solution: ' + giveSum(fishCountArr));