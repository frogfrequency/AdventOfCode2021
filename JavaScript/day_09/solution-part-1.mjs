import { puzzleInput } from "./puzzle-input.mjs"

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`

const inputRaw = puzzleInput; // change input here


// preprocessor //

let input = processInput(inputRaw);

function processInput(raw) {
    let processed = raw.split('\n');
    processed.forEach((element, idx, theArr) => {
        theArr[idx] = element.split('');
    });
    processed.forEach((element, idx, theArr) => {
        element.forEach((element, idx, theArr) => {
            theArr[idx] = parseInt(element, 10);
        })
    })
    return processed
}


// solution //

function giveRiskLevel(map) {
    let riskLevel = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (isLowPoint(x, y, map)) {
                riskLevel += map[y][x] + 1
            }
        }
    }
    console.log('riskLevel: ' + riskLevel)
}


function isLowPoint(x, y, map) {
    let thisPositionHeight = map[y][x];
    let adjacentsHeightsArr = giveAdjacentsHeightsArr(x, y, map);
    adjacentsHeightsArr.sort((a, b) => a - b);
    if (thisPositionHeight < adjacentsHeightsArr[0]) {
        return true
    } else {
        return false
    }
}


function giveAdjacentsHeightsArr(x, y, map) {
    let adjacentHeightsArr = [];


    if (y != 0) { adjacentHeightsArr.push(map[y - 1][x]) }; // if statments prevent code to try and access non-existent arrays or idxs like arr[-1]
    if (x != map[0].length - 1) { adjacentHeightsArr.push(map[y][x + 1]) };
    if (y != map.length - 1) { adjacentHeightsArr.push(map[y + 1][x]) };
    if (x != 0) { adjacentHeightsArr.push(map[y][x - 1]) };

    return adjacentHeightsArr
}

giveRiskLevel(input);