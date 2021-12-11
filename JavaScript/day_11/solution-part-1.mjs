import { puzzleInput, testInput } from "./puzzle-input.mjs"

let input = puzzleInput; // change input here

// preprocessing --> padding whole array in undefined so giveAdjacents doesnt target non existent elements

input.forEach(function (element, idx, theArr) {
    theArr[idx].push(undefined)
    theArr[idx].unshift(undefined)
})


input.push([]);
input.unshift([]);

for (let i = 0; i < input[1].length; i++) {
    input[0].push(undefined);
    input[input.length - 1].push(undefined)
}

// end of preprocessing

let masterCounter = 0;


function simulateStep() {
    // input.forEach(function (element) {
    //     console.log(element.join().replace(/,/g, ''))
    // })
    // console.log('=========================')
    increaseAllByOne();
    doFlashes();

}

function increaseAllByOne() {
    input.forEach(function (element) {
        element.forEach(function (element, idx, theArr) {
            if (element != undefined) {
                theArr[idx] = element + 1
            }
        })
    })
}

function doFlashes() {
    let thisRoundFlashCount = 0;
    while(containsNumbersHigher9()) {

        let nextFlashers = giveNextFlashers(); // works
        for (let i = 0; i < nextFlashers.length; i++) {
            let nextFlasher = nextFlashers[i];
            let adjacentsCoords = giveAdjacentsCoords(nextFlasher); // works
            
            adjacentsCoords.forEach(function (coord) {
                if (input[coord[0]][coord[1]] != undefined && input[coord[0]][coord[1]] != 'X') {
                    input[coord[0]][coord[1]]++
                }
            })
    
            input[nextFlasher[0]][nextFlasher[1]] = 'X';
        }
    }

    input.forEach(function (element) {
        element.forEach(function (element, idx, theArr) {
            if (element === 'X') {
                theArr[idx] = 0;
                thisRoundFlashCount++;
            }

        })
    })

    masterCounter += thisRoundFlashCount;
}

function giveAdjacentsCoords(coords) {

    let adjacents = []
    const adjacentsPattern = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ]
    adjacentsPattern.forEach(function (element) {
        adjacents.push([coords[0]+element[0], coords[1]+element[1]])
    })
    return adjacents
}

function giveNextFlashers() {
    let nextFlashers = []
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (9 < input[i][j]) {
                nextFlashers.push([i, j])
            }
        }
    }

    return nextFlashers
}


function containsNumbersHigher9() {
    for (let i = 0; i < input.length; i++) {
        if (input[i].some(value => 9 < value)) {
            return true
        }
    }
    return false
}



for (let i=0; i<100; i++) {
    simulateStep();
}

console.log(masterCounter)
