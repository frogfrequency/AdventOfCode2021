import { puzzleFishList } from "./puzzle-input.mjs";

const testList = [3,4,3,1,2];

let fishList = testList;

function simulateDay() {
    let nextFishList = [];
    for (let i=0; i<fishList.length; i++) {
        nextFishList.push(fishList[i]-1);
    }

    let newFishCounter = 0;
    for (let i=0; i<nextFishList.length; i++) {
        if (nextFishList[i] < 0) {
            nextFishList[i] = 6;
            newFishCounter++;
        }
    }

    for (let i=0; i<newFishCounter; i++) {
        nextFishList.push(8);
    }

    fishList = nextFishList;
}

function simulateDays(amount) {
    for (let i=0; i<amount; i++) {
        simulateDay(amount)
    }
}

simulateDays(80);
console.log(fishList.length)