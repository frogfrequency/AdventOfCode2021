import { puzzleCrabPositions } from "./puzzle-input.mjs";
const testCrabPositions = [16,1,2,0,4,2,7,1,2,14];

// setup

const crabPositions = puzzleCrabPositions; // change input here

const highestNumber = crabPositions.reduce(function(a, b) { // finding highest number in arr
    return Math.max(a, b);
}, 0);
const positionsArr = new Array(highestNumber+1).fill(0); // creating arr that collects positions that occure more than once
crabPositions.forEach(item => positionsArr[item]++); // filling arr that collects positions that occure more than once

// end setup


function giveFuelCostForThisAlignment(alignment) {
    let fuelCounter = 0;
    positionsArr.forEach( (item, idx) => 
        fuelCounter+= item*(giveTriangularNumber( Math.abs(alignment-idx)))
    ); 
    return fuelCounter
}


function giveTriangularNumber(int) {
    return ((int* (int+1)) / 2)
}


function giveLowestOverallFuelCost() {
    let lowestFuelCost = Infinity;
    for (let i=0; i<highestNumber; i++) {
        const fuelCostForThisAlignment = giveFuelCostForThisAlignment(i);
        if (fuelCostForThisAlignment < lowestFuelCost) {
            lowestFuelCost = fuelCostForThisAlignment;
        };
    }
    console.log(`lowest fuelcost: ${lowestFuelCost}`)
}





giveLowestOverallFuelCost();
