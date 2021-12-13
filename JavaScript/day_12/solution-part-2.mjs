import { testInput2, testInput3, puzzleInput } from "./puzzle-input.mjs";

const testInput =
    [
        ['start', 'A'],
        ['start', 'b'],
        ['A', 'c'],
        ['A', 'b'],
        ['b', 'd'],
        ['A', 'end'],
        ['b', 'end']
    ]

const caveMap = puzzleInput; // change input here

// adding all cave connections in reversed order since cave connections can be passed in both ways

caveMap.forEach((item, idx, theArr) => theArr.push([item[1], item[0]]))

// make a recursive function that is called on all connected caves. (give an array of caves that are already visited)

let globalCounter = 0;

function giveValidAdjacents(cave, alreadyVisited, routeSoFar) {

    if (cave === 'end') {
        globalCounter++;
    } else {
        if (!startsWithUpperCase(cave) && cave != 'end') {    // pushing current cave to visited if it is not uppercase
            alreadyVisited.push(cave);
        }
        let doubleVisitAlreadyOccured = arrayContainsDuplicates(alreadyVisited);
        routeSoFar.push(cave);

        let adjacentCaves = [];
        caveMap.forEach(item => item[0] === cave ? adjacentCaves.push(item[1]) : null)   // filling adjacentCaves

        let amountOfSmallCaveVisits = doubleVisitAlreadyOccured ? 0 : 1; 
        adjacentCaves = adjacentCaves.filter(item => hasBeenVisitedNotMoreThan(item, alreadyVisited, amountOfSmallCaveVisits))   // filtering out alreadyVisited
        adjacentCaves = adjacentCaves.filter(item => item != 'start')   // filtering out start since you never go back to it

        adjacentCaves.forEach(function (item) { // calling function with all valid adjacent caves
            giveValidAdjacents(item, [...alreadyVisited], [...routeSoFar], doubleVisitAlreadyOccured); // SEND COPY of array because else you change alreadyVisited etc. for all the others!
        })

    }

}

function hasBeenVisitedNotMoreThan(item, alreadyVisited, amount) { // call with 0 or 1
    const amountOfVisits = alreadyVisited.reduce((prev, cur) => cur === item ? prev + 1 : prev, 0)
    if (amount < amountOfVisits) {
        return false
    } else {
        return true
    }
}

    // util

function startsWithUpperCase(cave) {
    return cave.charAt(0) === cave.charAt(0).toUpperCase();
}

function arrayContainsDuplicates(arr) {
    return !(arr.length === new Set(arr).size)
}


    // exec


giveValidAdjacents('start', [], []);

console.log('global counter: ' + globalCounter);
