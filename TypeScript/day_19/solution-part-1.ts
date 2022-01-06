// INPUT

import { testInput1 } from "./data/puzzle-input";

const inputRaw = testInput1; // change input here


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

function giveParsedInput(input: string): number[][][] {
    let scannerArr = [];
    let split1: string[] = input.split('\n\n')

    let split2: string[][] = [];

    let split3: number[][][] = [];

    split1.forEach(element => split2.push(element.split('\n')))

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
    return scannerArr
}

const input = giveParsedInput(inputRaw);


// console.log(testCoords)



// END OF PREPROCESSING


// UTILITY




function giveAllOrientations(coords: number[]) { // --- return 6 * 4 = 24 distinct rotations
    
    let allOrientations: number[][] = [];
    
    let x = coords[0];
    let y = coords[1];
    let z = coords[2];
    
    let zUp: number[][] = giveZRotations([x, y, z]);
    let zDown: number[][] = giveZRotations([-x, y, -z]);
    let yUp: number[][] = giveZRotations([x, -z, y]);
    let yDown: number[][] = giveZRotations([x, z, -y]);
    let xUp: number[][] = giveZRotations([-z, y, x]);
    let xDown: number[][] = giveZRotations([z, y, -x]);
    
    for (let i = 0; i < 4; i++) {
        allOrientations.push(zUp[i]);
        allOrientations.push(zDown[i]);
        allOrientations.push(yUp[i]);
        allOrientations.push(yDown[i]);
        allOrientations.push(xUp[i]);
        allOrientations.push(xDown[i]);
    }
    
    return allOrientations
}

function giveZRotations(coords: number[]) { // rotating coords around the Z coords (see  illustration 1) --> returns 4 distinct rotations
    const x = coords[0];
    const y = coords[1];
    const z = coords[2];

    let rotationsAroundZ: number[][] = [];

    let firstRotation: number[] = [-y, x, z]
    let secondRotation: number[] = [-x, -y, z]
    let thirdRotation: number[] = [y, -x, z]
    let originalRotation: number[] = [x, y, z]

    rotationsAroundZ.push(originalRotation)
    rotationsAroundZ.push(firstRotation)
    rotationsAroundZ.push(secondRotation)
    rotationsAroundZ.push(thirdRotation)

    return rotationsAroundZ
}


function giveVectors(scanner: number[][]): number[][] {
    let vectors: number[][] = [];
    for (let startBeacon = 0; startBeacon < scanner.length; startBeacon++) {
        
        let start = scanner[startBeacon]
        for (let targetBeacon = startBeacon + 1; targetBeacon < scanner.length; targetBeacon++) {
            let target = scanner[targetBeacon];
            let vector: number[] = [target[0] - start[0], target[1] - start[1], target[2] - start[2],]
            vectors.push(vector)
        }
    }
    return vectors
}


function giveAllScannerOrientations(allOrientationsVectors: number[][][]) {
    let scannerArr = [];
    for (let orientation = 0; orientation < 24; orientation++) {
        let emptyArr = [];
        for (let i = 0; i < allOrientationsVectors.length; i++) {
            emptyArr.push(allOrientationsVectors[i][orientation]);
        }
        scannerArr.push(emptyArr);
    }
    return scannerArr
}


function giveAllOrientationsVectors(vectors: number[][]) {
    let allOrientationsVectors: number[][][] = [];
    vectors.forEach(vector => { allOrientationsVectors.push(giveAllOrientations(vector)) })
    return allOrientationsVectors
}


function findOverlaps(scanner1: number[][], scanner2: number[][]) {
    let counter = 0;
    let scanner2Strings = scanner2.map(element => JSON.stringify(element));

    scanner1.forEach(element => {
        if (scanner2Strings.includes(JSON.stringify(element))) {
            counter++
        }
    })
    console.log(counter)
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

let testScannerPair: number[][][] = input.slice(0, 2);

let firstVectors = giveVectors(testScannerPair[0]);

let secondVectors = giveVectors(testScannerPair[1]); // dont use this

console.log(firstVectors)
console.log(secondVectors)
