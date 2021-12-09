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


// solution // part 2 changes: main function does not return risk level but lowPointCoords --> these are then processed

function giveLowPointCoords(map) {
    let lowPointCoords = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (isLowPoint(x, y, map)) {
                lowPointCoords.push([y, x])
            }
        }
    }
    return lowPointCoords
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


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


const lowPointCoords = giveLowPointCoords(input);
// console.log(lowPointCoords)

function returnBasinsizes(lowPoints) {
    let basinSizes = [];
    lowPoints.forEach(function (lowPoint) {
        basinSizes.push(giveBasinSize(lowPoint))
    })
    return basinSizes
}

function giveBasinSize(coords) {
    let thisBasinCounter = 0;

    let nextCoords = [toString(coords)]; // FORMAT Y, X
    let newNextCoords = []; // fill only with strings so .includes works
    let visited = []; // fill only with strings so .includes works    

    while (1 <= nextCoords.length) {
        processAllNextCoords();
        nextCoords = newNextCoords;
        newNextCoords = [];


        function processAllNextCoords() {
            nextCoords.forEach(function (item) {
                processCoords(item);
            })
        }

        function processCoords(coordPair) {
            coordPair = toArr(coordPair);
            let x = coordPair[1];
            let y = coordPair[0];
            let targetContent = input[y][x];
            visited.push(toString(coordPair));
            if (targetContent != '9') {

                thisBasinCounter++;
                let adjacents = giveAdjacentsCoords(y, x, input);
                adjacents.forEach(function (item) {
                    if (!newNextCoords.includes(toString(item)) && !visited.includes(toString(item))) { // !newNextCoords.includes(item) && !visited.includes(item)
                        newNextCoords.push(toString(item));
                    }
                })
            }
        }
    }
    return thisBasinCounter
}



function giveAdjacentsCoords(y, x, map) {
    let adjacentsCoordsArr = [];
    if (y != 0) { adjacentsCoordsArr.push([y - 1, x]) }; // if statments prevent code to try and access non-existent arrays or idxs like arr[-1]
    if (x != map[0].length - 1) { adjacentsCoordsArr.push([y, x + 1]) };
    if (y != map.length - 1) { adjacentsCoordsArr.push([y + 1, x]) };
    if (x != 0) { adjacentsCoordsArr.push([y, x - 1]) };

    return adjacentsCoordsArr
}

function toString(coordArr) {
    return coordArr[0] + ',' + coordArr[1]
}

function toArr(string) {
    let output = string.split(',');
    output[0] = parseInt(output[0]);
    output[1] = parseInt(output[1]);
    return output
}





let basinSizes = returnBasinsizes(lowPointCoords);
// console.log(basinSizes)

basinSizes.sort((a, b) => b - a)

console.log(`
    the three biggest pools are:
    ${basinSizes[0]}
    ${basinSizes[1]}
    ${basinSizes[2]}

    if you multiply them you get : ${basinSizes[0]*basinSizes[1]*basinSizes[2]}
`)
