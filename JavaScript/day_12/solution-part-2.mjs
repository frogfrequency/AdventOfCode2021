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

const caveMap = testInput; // change input here

// adding all cave connections in reversed order since cave connections can be passed in both ways

caveMap.forEach((item, idx, theArr) => theArr.push( [item[1], item[0]] ))

// make a recursive function that is called on all connected caves. (give an array of caves that are already visited)

let globalCounter = 0;

function giveValidAdjacents(cave, alreadyVisited, routeSoFar) {
    if (cave === 'end') {
        console.log(`routeSoFar: ${routeSoFar}`)
        globalCounter++;
        
    } else {
        routeSoFar.push(cave);
        let adjacentCaves = [];
        caveMap.forEach(item => item[0] === cave ? adjacentCaves.push(item[1]) : null)   // filling adjacentCaves


        adjacentCaves = adjacentCaves.filter(item => hasNotBeenVisitedTwice(item, alreadyVisited))   // filtering out alreadyVisited
                    // set some kind of flag so that this filter (hasNotBeenVisitedTwice) changes to (includes (like in part 1))
                    // as soon as one of the smaller caves have been visited twice
                    // make make change hasNotBeenVisitedTwice to hasBeenVisitedNotMoreThan(amount) and pass amount 1 or 2 depending on
                    // wheter a small cave has already been visited twice

        adjacentCaves = adjacentCaves.filter(item => item != 'start')   // filtering out start since you never go back to it

    
        if (!startsWithUpperCase(cave) && cave != 'end') {    // pushing current cave to visited if it is not uppercase
            alreadyVisited.push(cave);
        }
    
        adjacentCaves.forEach(function (item) { // calling function with all valid adjacent caves
            giveValidAdjacents(item, [...alreadyVisited], [...routeSoFar]); // SEND COPY of array because else you change array for all the others!
        }) 

    }

}

function hasNotBeenVisitedTwice(item, alreadyVisited) {
    const amountOfVisits = alreadyVisited.reduce((prev, cur) => cur === item ? prev + 1 : prev, 0)
    if (1 < amountOfVisits) {
        return false
    } else {
        return true
    }
}


function startsWithUpperCase(cave) {
    9
    return cave.charAt(0) === cave.charAt(0).toUpperCase();
}


giveValidAdjacents('start', [], []);

console.log('global counter: ' + globalCounter)



// let testArr = [12,12, 34, 45, ,12, 123, 12, 45, 4,5,1212, 122, 2340234];


// console.log(hasNotBeenVisitedTwice(4, testArr) ) 