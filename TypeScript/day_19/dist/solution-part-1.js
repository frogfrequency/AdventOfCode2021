"use strict";
// INPUT
Object.defineProperty(exports, "__esModule", { value: true });
const puzzle_input_1 = require("./data/puzzle-input");
const inputRaw = puzzle_input_1.testInput1; // change input here
// GLOBAL VARIABLES
// PREPROCESSING
/* ___________________________ illustration 1

    z
    z
    z
    z
    z
    z                 y
    z              y
    z           y
    z        y
    z     y
    z  y
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

*/
function giveParsedInput(input) {
    let scannerArr = [];
    let split1 = input.split('\n\n');
    let split2 = [];
    let split3 = [];
    split1.forEach(element => split2.push(element.split('\n')));
    for (let i = 0; i < split2.length; i++) {
        split2[i].shift();
    }
    for (let scanner = 0; scanner < split2.length; scanner++) {
        let beaconArr = [];
        for (let beacon = 0; beacon < split2[scanner].length; beacon++) {
            let xyz = split2[scanner][beacon].split(',');
            let xyzNum = [];
            for (let dimension = 0; dimension < 3; dimension++) {
                xyzNum.push(parseInt(xyz[dimension], 10));
            }
            beaconArr.push(xyzNum);
        }
        scannerArr.push(beaconArr);
    }
    return scannerArr;
}
const input = giveParsedInput(inputRaw);
// console.log(testCoords)
// END OF PREPROCESSING
// UTILITY
function giveAllOrientations(coords) {
    let allOrientations = [];
    let x = coords[0];
    let y = coords[1];
    let z = coords[2];
    let zUp = giveZRotations([x, y, z]);
    let zDown = giveZRotations([-x, y, -z]);
    let yUp = giveZRotations([x, -z, y]);
    let yDown = giveZRotations([x, z, -y]);
    let xUp = giveZRotations([-z, y, x]);
    let xDown = giveZRotations([z, y, -x]);
    for (let i = 0; i < 4; i++) {
        allOrientations.push(zUp[i]);
        allOrientations.push(zDown[i]);
        allOrientations.push(yUp[i]);
        allOrientations.push(yDown[i]);
        allOrientations.push(xUp[i]);
        allOrientations.push(xDown[i]);
    }
    return allOrientations;
}
function giveZRotations(coords) {
    const x = coords[0];
    const y = coords[1];
    const z = coords[2];
    let rotationsAroundZ = [];
    let firstRotation = [-y, x, z];
    let secondRotation = [-x, -y, z];
    let thirdRotation = [y, -x, z];
    let originalRotation = [x, y, z];
    rotationsAroundZ.push(originalRotation);
    rotationsAroundZ.push(firstRotation);
    rotationsAroundZ.push(secondRotation);
    rotationsAroundZ.push(thirdRotation);
    return rotationsAroundZ;
}
function giveVectors(scanner) {
    let vectors = [];
    for (let startBeacon = 0; startBeacon < scanner.length; startBeacon++) {
        let start = scanner[startBeacon];
        for (let targetBeacon = startBeacon + 1; targetBeacon < scanner.length; targetBeacon++) {
            let target = scanner[targetBeacon];
            let vector = [target[0] - start[0], target[1] - start[1], target[2] - start[2],];
            vectors.push(vector);
        }
    }
    return vectors;
}
function giveAllScannerOrientations(allOrientationsVectors) {
    let scannerArr = [];
    for (let orientation = 0; orientation < 24; orientation++) {
        let emptyArr = [];
        for (let i = 0; i < allOrientationsVectors.length; i++) {
            emptyArr.push(allOrientationsVectors[i][orientation]);
        }
        scannerArr.push(emptyArr);
    }
    return scannerArr;
}
function giveAllOrientationsVectors(vectors) {
    let allOrientationsVectors = [];
    vectors.forEach(vector => { allOrientationsVectors.push(giveAllOrientations(vector)); });
    return allOrientationsVectors;
}
function findOverlaps(scanner1, scanner2) {
    let counter = 0;
    let scanner2Strings = scanner2.map(element => JSON.stringify(element));
    scanner1.forEach(element => {
        if (scanner2Strings.includes(JSON.stringify(element))) {
            counter++;
        }
    });
    console.log(counter);
}
/*

EXECUTION ====================================================================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ===================            EXECUTION            ================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ====================================================================================      ========

*/
// 25 beacons --> 300 vectors???  (triangular numbers --> (n * n+1 / 2) but you start with n = n-1 because 2 beacons --> only 1 vector inbetween etc.)
// let dimensionalVectors = giveAllOrientationsVectors(secondVectors); // intermediate step
// let allSecondVectors = giveAllScannerOrientations(dimensionalVectors);
// for (let i=0; i<allSecondVectors.length; i++) {
//     console.log(`round ${i}: `)
//     findOverlaps(firstVectors, allSecondVectors[i]);
// }
// TEEEEEEEEEEEEEEEEEST
let testScannerPair = input.slice(0, 2);
let firstVectors = giveVectors(testScannerPair[0]);
let secondVectors = giveVectors(testScannerPair[1]); // dont use this
console.log(firstVectors);
console.log(secondVectors);
//# sourceMappingURL=solution-part-1.js.map