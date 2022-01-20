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
// END OF PREPROCESSING
// UTILITY
function removeDuplicateScanners(scanner) {
    let scannerStrings = [];
    scanner.forEach(item => {
        scannerStrings.push(JSON.stringify(item));
    });
    let theSet = new Set(scannerStrings);
    let scannerStringsFiltered = Array.from(theSet);
    let scannerFiltered = [];
    scannerStringsFiltered.forEach(item => {
        scannerFiltered.push(JSON.parse(item));
    });
    return scannerFiltered;
}
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
function giveVectorPacketsOrientations(vectorPack) {
    console.log(`giveVectorPacketsOrientations receives: ${vectorPack}`);
    let newArr = []; // cannot use new Array(24).fill([]) because the empty arrays that you pass in the master array are passed by reference!!
    for (let i = 0; i < 24; i++) {
        newArr.push([]);
    }
    vectorPack.forEach(element => {
        let dims = giveAllOrientations(element);
        dims.forEach((item, idx) => {
            newArr[idx].push(item);
        });
    });
    return newArr;
}
function giveAmountOfSameVectors(vectorPack1, vectorPack2) {
    let pack1Strings = vectorPack1.map(element => JSON.stringify(element));
    let pack2Strings = vectorPack2.map(element => JSON.stringify(element));
    let allVectors = pack1Strings.concat(pack2Strings);
    let uniqueVectors = new Set(allVectors);
    return allVectors.length - uniqueVectors.size;
}
function includes12Matches(vecPacks1, vecPack2Orientations) {
    for (let i = 0; i < vecPacks1.length; i++) {
        for (let j = 0; j < vecPack2Orientations.length; j++) {
            let amountOfSameVectors = giveAmountOfSameVectors(vecPacks1[i], vecPack2Orientations[j]);
            if (10 < amountOfSameVectors) {
                return [i, j]; // index of vectorPack 1, orientation index of vectorPack2's vector
            }
        }
    }
    return [-1, -1];
}
/*

EXECUTION ====================================================================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ===================            EXECUTION            ================================      ========
EXECUTION ===================                                 ================================      ========
EXECUTION ====================================================================================      ========

*/
// TEEEEEEEEEEEEEEEEEST
// let testScannerPair: number[][][] = input.slice(0, 2);
// let testScannerPair: number[][][] = [input[0], input[1]]
// let scanner1: number[][] = testScannerPair[0];
// let scanner2: number[][] = testScannerPair[1];
// let scanner1VectorPacks: number[][][] = giveScannerVectorPacks(scanner1);
// let scanner2VectorPacks: number[][][] = giveScannerVectorPacks(scanner2);
// SUBTEST
function giveSecondScannerPositionRelativeToScanner1(vecPacks1, vecPacks2) {
    for (let j = 0; j < vecPacks2.length; j++) {
        let currentSecondPack = vecPacks2[j];
        let currentSecondPackAllDimensions = giveVectorPacketsOrientations(currentSecondPack);
        let position = includes12Matches(vecPacks1, currentSecondPackAllDimensions);
        if (position[0] != -1 && position[1] != -1) {
            // console.log(`vecPack1 idx ${position[0]} matches vecPack2 idx ${j} oriented with idx ${position[1]}`)
            return [position[0], j, position[1]];
        }
    }
    return [-1, -1, -1];
}
function giveAllScannerVectorPackets(scanners) {
    let emptyArr = [];
    scanners.forEach(scanner => {
        emptyArr.push(giveScannerVectorPacks(scanner));
    });
    return emptyArr;
}
function giveScannerRelations(allVectorPackets) {
    let positionsArr = []; // this stores all scanner positions relative to another scanner
    // firstScannerIdx, secondScannerIdx, firstScannersBeaconIdx, secondScannersBeaconIdx, secondScannerOrientationIdx...
    for (let i = 0; i < allVectorPackets.length; i++) {
        for (let j = 0; j < allVectorPackets.length; j++) {
            if (i != j) {
                let x = giveSecondScannerPositionRelativeToScanner1(allVectorPackets[i], allVectorPackets[j]);
                if (x[0] != -1 && x[1] != -1 && x[2] != -1) {
                    positionsArr.push([i, j, x[0], x[1], x[2]]);
                }
            }
        }
    }
    return positionsArr;
}
let allScannerVectorPackets = giveAllScannerVectorPackets(input);
// let scannerRelations = giveScannerRelations(allScannerVectorPackets);
let scannerRelationsCheated = [
    [0, 1, 9, 0, 1],
    [1, 0, 3, 0, 1],
    [1, 3, 14, 0, 0],
    [1, 4, 13, 1, 23],
    [2, 4, 16, 1, 19],
    [3, 1, 2, 6, 0],
    [4, 1, 4, 2, 9],
    [4, 2, 14, 0, 19]
];
function giveCleanRelations(relations) {
    let indexesOfDefinedScanners = [0];
    let cleanRelations = [];
    while (indexesOfDefinedScanners.length < input.length) {
        for (let i = 0; i < relations.length; i++) {
            let currentRelation = relations[i];
            if (indexesOfDefinedScanners.includes(currentRelation[0]) && !indexesOfDefinedScanners.includes(currentRelation[1])) {
                cleanRelations.push(currentRelation);
                indexesOfDefinedScanners.push(currentRelation[1]);
            }
        }
    }
    return cleanRelations;
}
// giveCleanRelations(scannerRelationsCheated)
// rotate all the scanners so their arr positionen and aligned to scanner 1 (problem: scanners are not all related to scanner 1..)
// use relationsPureCheated (so when the programm runs this doesnt have to be calculated every time..)
let relationsPureCheated = [
    [0, 1, 9, 0, 1],
    [1, 3, 14, 0, 0],
    [1, 4, 13, 1, 23],
    [4, 2, 14, 0, 19]
];
function giveEmptyLookUpTable(relations) {
    let emptyOrientationLUT = {};
    for (let i = 1; i < relations.length; i++) {
        emptyOrientationLUT[JSON.stringify(i)] = [];
    }
    return emptyOrientationLUT;
}
function giveFilledLUT(relations) {
    let lut = giveEmptyLookUpTable(relations);
    for (let i = 0; i < relations.length; i++) {
        let currentRelation = relations[i];
        lut[currentRelation[1]] = [currentRelation[0], currentRelation[4]];
    }
    return lut;
}
function giveRotationInstructionsFromLUT(LUT) {
    let LUTlength = Object.keys(LUT).length;
    let rotationInstructions = [];
    for (let i = 1; i <= LUTlength; i++) {
        let instructionsContainer = [];
        let isRotatedLike = i;
        while (isRotatedLike != 0) {
            instructionsContainer.push(LUT[isRotatedLike][1]);
            isRotatedLike = LUT[isRotatedLike][0];
        }
        rotationInstructions.push(instructionsContainer);
    }
    return rotationInstructions;
}
const filledLUT = giveFilledLUT(relationsPureCheated);
const rotationInstructions = giveRotationInstructionsFromLUT(filledLUT);
// trying to merge the scanners from here on:
console.log(relationsPureCheated);
let scannersCloned = JSON.parse(JSON.stringify(input));
function addToScanner(firstScannerIdx, secondScannerIdx, firstBeaconIdx, secondBeaconIdx, scanner2Rotation) {
    let firstScanner = scannersCloned[firstScannerIdx];
    let secondScanner = scannersCloned[secondScannerIdx];
    console.log(`\t\t\t addToScanner secondScanner: ${secondScanner}`);
    // rotate second beacons
    let allOrientations = giveVectorPacketsOrientations(secondScanner);
    secondScanner = allOrientations[scanner2Rotation];
    // find relation (offset) of the two scanners
    let firstBeacon = firstScanner[firstBeaconIdx];
    let secondBeacon = secondScanner[secondBeaconIdx];
    let correctingVector = [firstBeacon[0] - secondBeacon[0], firstBeacon[1] - secondBeacon[1], firstBeacon[2] - secondBeacon[2]];
    secondScanner.forEach((item, idx, arr) => {
        arr[idx][0] += correctingVector[0];
        arr[idx][1] += correctingVector[1];
        arr[idx][2] += correctingVector[2];
    });
    // adjust second beacons
    let scannersMergedUnfiltered = firstScanner.concat(secondScanner);
    let scannerMergedFiltered = removeDuplicateScanners(scannersMergedUnfiltered);
    return scannerMergedFiltered.length;
}
function mergeAllScanners(relations) {
    for (let i = relations.length - 1; 0 <= i; i--) {
        const firstScannerIdx = relations[i][0];
        const secondScannerIdx = relations[i][1];
        const firstBeaconIdx = relations[i][2];
        const secondBeaconIdx = relations[i][3];
        const scanner2Rotation = relations[i][4];
        scannersCloned[firstScannerIdx] = addToScanner(firstScannerIdx, secondScannerIdx, firstBeaconIdx, secondBeaconIdx, scanner2Rotation);
    }
    // console.log(scannersCloned[0].length)
}
mergeAllScanners(relationsPureCheated);
// console.log(relationsPureCheated);
//# sourceMappingURL=solution-part-1.2.js.map