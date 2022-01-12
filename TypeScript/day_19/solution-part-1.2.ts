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

/*
    function giveScannerVectorPacks(scanner: number[][]): number[][][] { ...

        gives all relative coords (vectors) from every coord to every other
        this means each of the 25 coords has a 24 vectors to the remaining 24 coords ---> 25 vectorPacks à 24 vectors
*/


function giveScannerVectorPacks(scanner: number[][]): number[][][] {
    let thisScannersVectorPacks: number[][][] = [];
    for (let startBeacon = 0; startBeacon < scanner.length; startBeacon++) {

        let thisCoordVectorPack: number[][] = [];
        let start = scanner[startBeacon] // setting

        for (let targetBeacon = 0; targetBeacon < scanner.length; targetBeacon++) {


            if (targetBeacon != startBeacon) {
                let target = scanner[targetBeacon]; // setting

                let vector: number[] = [target[0] - start[0], target[1] - start[1], target[2] - start[2],]
                thisCoordVectorPack.push(vector)
            }

        }

        thisScannersVectorPacks.push(thisCoordVectorPack);

    }
    return thisScannersVectorPacks
}

function giveVectorPacketsOrientations(vectorPack: number[][]): number[][][] {

    let newArr: number[][][] = []; // cannot use new Array(24).fill([]) because the empty arrays that you pass in the master array are passed by reference!!
    for (let i = 0; i < 24; i++) {
        newArr.push([])
    }

    vectorPack.forEach(element => {
        let dims = giveAllOrientations(element)
        dims.forEach((item, idx) => {
            newArr[idx].push(item)
        })
    })
    // console.log(newArr)
    return newArr
}

function giveAmountOfSameVectors(vectorPack1: number[][], vectorPack2: number[][]) {
    // console.log(vectorPack1);
    // console.log(vectorPack2);
    // console.log('----------------')

    let pack1Strings = vectorPack1.map(element => JSON.stringify(element));
    let pack2Strings = vectorPack2.map(element => JSON.stringify(element));
    let allVectors = pack1Strings.concat(pack2Strings);
    let uniqueVectors = new Set(allVectors);
    return allVectors.length - uniqueVectors.size
}

function includes12Matches(vecPacks1: number[][][], vecPack2Orientations: number[][][]): number[] {

    for (let i = 0; i < vecPacks1.length; i++) {
        for (let j = 0; j < vecPack2Orientations.length; j++) {
            let amountOfSameVectors = giveAmountOfSameVectors(vecPacks1[i], vecPack2Orientations[j]);
            if (10 < amountOfSameVectors) {
                return [i, j] // index of vectorPack 1, orientation index of vectorPack2's vector
            }

        }
    }
    return [-1, -1]
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
let testScannerPair: number[][][] = [input[0], input[1]]

let scanner1: number[][] = testScannerPair[0];
let scanner2: number[][] = testScannerPair[1];

let scanner1VectorPacks: number[][][] = giveScannerVectorPacks(scanner1);
let scanner2VectorPacks: number[][][] = giveScannerVectorPacks(scanner2);




// SUBTEST




function giveSecondScannerPositionRelativeToScanner1(vecPacks1: number[][][], vecPacks2: number[][][]) {

    for (let j = 0; j < vecPacks2.length; j++) {
        let currentSecondPack = vecPacks2[j];
        let currentSecondPackAllDimensions = giveVectorPacketsOrientations(currentSecondPack);

        let position: number[] = includes12Matches(vecPacks1, currentSecondPackAllDimensions);
        if (position[0] != -1 && position[1] != -1) {
            console.log(`vecPack1 idx ${position[0]} matches vecPack2 idx ${j} oriented with idx ${position[1]}`)
            return [position[0], j, position[1]]
        }
    }
    return [-1, -1, -1]
}


console.log(giveSecondScannerPositionRelativeToScanner1(scanner1VectorPacks, scanner2VectorPacks));

console.log(`-----------------------------------------------------------------------------\n---------------------------------------------`)

function giveAllScannerVectorPackets(scanners: number[][][]): number[][][][] {
    let emptyArr: number[][][][] = [];
    scanners.forEach(scanner => {
        emptyArr.push(giveScannerVectorPacks(scanner))
    })
    return emptyArr
}



let allScannerVectorPackets: number[][][][] = giveAllScannerVectorPackets(input);


for (let i=0; i<allScannerVectorPackets.length; i++) {
    for (let j=0; j<allScannerVectorPackets.length; j++) {
        
    }
}











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

