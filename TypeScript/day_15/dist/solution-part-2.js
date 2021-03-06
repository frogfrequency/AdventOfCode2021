"use strict";
// INPUT
Object.defineProperty(exports, "__esModule", { value: true });
const puzzle_input_js_1 = require("./data/puzzle-input.js");
const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
const input = puzzle_input_js_1.puzzleInput; // change input here
// GLOBAL VARIABLES
const map = [];
let activeCoords = [];
activeCoords.push('0,0'); // pushing the starting top left corner to the array
let visitedCoords = ['0,0'];
// PREPROCESSING / CREATING MAP ARRAY
const stringLines = input.split('\n');
stringLines.forEach(element => {
    let stringValues = element.split('');
    let intLine = [];
    stringValues.forEach(item => {
        intLine.push(parseInt(item, 10));
    });
    map.push(intLine);
});
function increaseThreatLeveL(num) {
    if (num === 9) {
        return 1;
    }
    else {
        return num + 1;
    }
}
let mapSize = map.length;
let lineSize = map[0].length;
for (let i = 0; i < mapSize * 4; i++) { // add 4 tiles below
    let newArrBelow = [];
    map[i].forEach(element => {
        newArrBelow.push(increaseThreatLeveL(element));
    });
    map.push(newArrBelow);
}
for (let y = 0; y < mapSize * 5; y++) { // addding 40 nums to each line (y<mapSize*5) because of course we have 50 lines in total
    for (let x = 0; x < lineSize * 4; x++) {
        map[y].push(increaseThreatLeveL(map[y][x]));
    }
}
map[0][0] = 1; // making the top left position one so its threat level is always one (which is subtracted at the end before logging i)
// END OF PREPROCESSING
function giveAdjacents(coords) {
    let adjacentsCoordsArr = [];
    let y = coords[0];
    let x = coords[1];
    if (y != 0) {
        adjacentsCoordsArr.push([y - 1, x]);
    }
    ; // if statments prevent code to try and access non-existent arrays or idxs like arr[-1]
    if (x != map[0].length - 1) {
        adjacentsCoordsArr.push([y, x + 1]);
    }
    ;
    if (y != map.length - 1) {
        adjacentsCoordsArr.push([y + 1, x]);
    }
    ;
    if (x != 0) {
        adjacentsCoordsArr.push([y, x - 1]);
    }
    ;
    return adjacentsCoordsArr;
}
function performRound() {
    let nextActive = [...activeCoords];
    // decrease all active coords by one  
    activeCoords.forEach(element => {
        let elementArr = toArr(element);
        map[elementArr[0]][elementArr[1]]--;
        let newValue = map[elementArr[0]][elementArr[1]];
        if (newValue === 0) {
            // remove current element form nextActive
            nextActive = nextActive.filter(activeElement => activeElement !== element);
            // find adjacents, validate and push to nextActive and visited
            let newAdjacentsNum = giveAdjacents(elementArr);
            let newAdjacentsStr = [];
            newAdjacentsNum.forEach(element => {
                newAdjacentsStr.push(toString(element));
            });
            newAdjacentsStr = newAdjacentsStr.filter(element => !visitedCoords.includes(element));
            nextActive = nextActive.concat(newAdjacentsStr);
            visitedCoords = visitedCoords.concat(newAdjacentsStr);
        }
        activeCoords = nextActive;
    });
    // all that reach 0 -->
    // add valid neighbours to the active array and visited
    // valid neighbours = neighbours that are not in visited
    // delete themself from active
}
// UTIL
function logMap() {
    map.forEach(element => {
        console.log(element.join().replace(/,/g, ''));
    });
    console.log('---------------');
}
function toArr(string) {
    let input = string.split(',');
    let output = [];
    output.push(parseInt(input[0]));
    output.push(parseInt(input[1]));
    return output;
}
function toString(coordArr) {
    return coordArr[0] + ',' + coordArr[1];
}
// EXEC
// logMap();
let lastLetter = map[map.length - 1][map[0].length - 1];
let i = 0;
while (lastLetter != 0) {
    performRound();
    // logMap();
    i++;
    lastLetter = map[map.length - 1][map[0].length - 1];
    console.log(i);
}
console.log(i - 1);
// logMap();
// TESTING
//# sourceMappingURL=solution-part-2.js.map