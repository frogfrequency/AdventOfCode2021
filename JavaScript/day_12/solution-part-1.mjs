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

caveMap.forEach((item, idx, theArr) => theArr.push( [item[1], item[0]] ))

// make a recursive function that is called on all connected caves. (give an array of caves that are already visited)

let globalCounter = 0;

function giveValidAdjacents(cave, alreadyVisited, routeSoFar) {
    if (cave === 'end') {
        globalCounter++;
    } else {
        routeSoFar.push(cave);
        let adjacentCaves = [];
        caveMap.forEach(item => item[0] === cave ? adjacentCaves.push(item[1]) : null)   // filling adjacentCaves
        adjacentCaves = adjacentCaves.filter(item => !alreadyVisited.includes(item))   // filtering out alreadyVisited
    
        if (!startsWithUpperCase(cave) && cave != 'end') {    // pushing current cave to visited if it is not uppercase
            alreadyVisited.push(cave);
        }
    
        adjacentCaves.forEach(function (item) { // calling function with all valid adjacent caves
            giveValidAdjacents(item, [...alreadyVisited], [...routeSoFar]); // SEND COPY of array because else you change array for all the others!
        }) 

    }

}

function startsWithUpperCase(cave) {
    9
    return cave.charAt(0) === cave.charAt(0).toUpperCase();
}


giveValidAdjacents('start', [], []);

console.log(globalCounter)