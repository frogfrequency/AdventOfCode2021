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
/*
    function giveScannerVectorPacks(scanner: number[][]): number[][][] { ...

        gives all relative coords (vectors) from every coord to every other
        this means each of the 25 coords has a 24 vectors to the remaining 24 coords ---> 25 vectorPacks à 24 vectors
*/
function giveScannerVectorPacks(scanner) {
    let thisScannersVectorPacks = [];
    for (let startBeacon = 0; startBeacon < scanner.length; startBeacon++) {
        let thisCoordVectorPack = [];
        let start = scanner[startBeacon]; // setting
        for (let targetBeacon = 0; targetBeacon < scanner.length; targetBeacon++) {
            if (targetBeacon != startBeacon) {
                let target = scanner[targetBeacon]; // setting
                let vector = [target[0] - start[0], target[1] - start[1], target[2] - start[2],];
                thisCoordVectorPack.push(vector);
            }
        }
        thisScannersVectorPacks.push(thisCoordVectorPack);
    }
    return thisScannersVectorPacks;
}
function giveAmountOfSameVectors(vectorPack1, vectorPack2) {
    // console.log(vectorPack1);
    // console.log(vectorPack2);
    // console.log('----------------')
    let pack1Strings = vectorPack1.map(element => JSON.stringify(element));
    let pack2Strings = vectorPack2.map(element => JSON.stringify(element));
    let allVectors = pack1Strings.concat(pack2Strings);
    let uniqueVectors = new Set(allVectors);
    return allVectors.length - uniqueVectors.size;
}
function compareTwoScannersVectorPacks(vecPacks1, vecPacks2) {
    let highestAmount = 0;
    for (let i = 0; i < vecPacks1.length; i++) {
        for (let j = 0; j < vecPacks2.length; j++) {
            let amountOfSameVectors = giveAmountOfSameVectors(vecPacks1[i], vecPacks2[j]);
            if (highestAmount < amountOfSameVectors) {
                highestAmount = amountOfSameVectors;
            }
        }
    }
    console.log(highestAmount);
}
// function giveScannersAllRotationVectorPacks(scannerVectorPacks: number[][][]) {
// }
/*

EXECUTION ====================================================================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ===================            EXECUTION            ================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ====================================================================================      ========

*/
// TEEEEEEEEEEEEEEEEEST
let testScannerPair = input.slice(0, 2);
let scanner1 = testScannerPair[0];
let scanner2 = testScannerPair[1];
let scanner1VectorPacks = giveScannerVectorPacks(scanner1);
let scanner2VectorPacks = giveScannerVectorPacks(scanner2);
// compareTwoScannersVectorPacks(scanner1VectorPacks, scanner2VectorPacks);
// SUBTEST
function test(vectorPack) {
    let newArr = new Array(30).fill([]);
    // console.log(newArr)
    // vectorPack.forEach(element => {
    let dims = giveAllOrientations(vectorPack[0]);
    // console.log(dims)
    console.log(dims);
    dims.forEach((item, idx) => {
        console.log(`idx: ${idx}:`);
        console.log(`\t item ${item}`);
        newArr[idx].push([111]);
        // console.log(item, idx)
    });
    // })
    console.log(newArr);
}
test(scanner2VectorPacks[0]);
// let testScanner1: number[][] = [
//     [10,100,1000],
//     [0,0,0],
//     [30,300,3000],
//     [3,3,3]
// ]
// let testScanner2: number[][] = [
//     [30,120, 1020],
//     [10,10,10],
//     [432,432,423],
//     [23,23,23]
// ]
// let testScanner1VectorPacks: number[][][] = giveScannerVectorPacks(testScanner1);
// let testScanner2VectorPacks: number[][][] = giveScannerVectorPacks(testScanner2);
// compareTwoScannersVectorPacks(testScanner1VectorPacks, testScanner2VectorPacks);
//# sourceMappingURL=solution-part-1.2.js.map