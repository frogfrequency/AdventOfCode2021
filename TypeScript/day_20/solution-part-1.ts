let testInput: string = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`

import { puzzleInput } from "./data/puzzle-input";

const input = puzzleInput; // change input here

// IEA = image enhancement algorithm

function giveParsedInput(theInput: string) {
    let IEAString: string = theInput.split('\n\n')[0];

    IEAString = IEAString.replace(/\n/g, '');

    let IEA: boolean[] = [];
    for (let i = 0; i < IEAString.length; i++) {
        if (IEAString.charAt(i) === '.') {
            IEA.push(false)
        } else {
            IEA.push(true)
        }
    }

    let inputImageString: string = theInput.split('\n\n')[1];
    let inputImageStringSplitted = inputImageString.split('\n');
    let inputImage: boolean[][] = [];
    for (let i = 0; i < inputImageStringSplitted.length; i++) {
        let newLine: boolean[] = [];
        let currentString = inputImageStringSplitted[i];
        for (let j = 0; j < currentString.length; j++) {
            if (currentString.charAt(j) === '.') {
                newLine.push(false)
            } else {
                newLine.push(true)
            }
        }
        inputImage.push(newLine);
    }
    const output: [boolean[], boolean[][]] = [[], []];
    output[0] = IEA;
    output[1] = inputImage;
    return output
}

const parsedInput: [boolean[], boolean[][]] = giveParsedInput(input);

let IEA: boolean[] = parsedInput[0]; // IEA = image enhancement algorithm
let inputImage: boolean[][] = parsedInput[1];
inputImage = addOuterShell(inputImage);
inputImage = addOuterShell(inputImage);
inputImage = addOuterShell(inputImage);
inputImage = addOuterShell(inputImage);
inputImage = addOuterShell(inputImage);




// END OF PREPROCESSING

// CUSTOM TYPES


// UTILITY

function logImage(image: boolean[][]) {
    for (let i = 0; i < image.length; i++) {
        let newString: string = '';
        image[i].forEach(item => {
            newString += item ? '#' : '.';
        })
        console.log(newString)
    }
}

// CODE



function giveNextIteration(image: boolean[][]) {

    image = addOuterShell(image);
    let newImage: boolean[][] = [];

    for (let rowIdx = 1; rowIdx < image.length-1; rowIdx++) {
        let newRow: boolean[] = []
        for (let columnIdx = 1; columnIdx < image[rowIdx].length-1; columnIdx++) {
            let the3x3Block: boolean[] = give3x3block(image, rowIdx, columnIdx)
            let IEAIdx = giveIEAIdx(the3x3Block);
            newRow.push(IEA[IEAIdx]);
        }
        newImage.push(newRow)
    }

    newImage = addOuterShell(newImage);

    return newImage
}

function addOuterShell(image: boolean[][]) {
    image.forEach((item, idx, arr) => {
        arr[idx].push(false);
        arr[idx].unshift(false);
    })
    image.push([]);
    image.unshift([]);

    for (let i = 0; i < image[1].length; i++) {
        image[0].push(false);
        image[image.length - 1].push(false);
    }
    return image
}

function give3x3block(image: boolean[][], rowIdx: number, columnIdx: number) {
    let neighbourIdxsPattern = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let i = 0; i < neighbourIdxsPattern.length; i++) {
    }
    let the3x3Block: boolean[] = [];

    for (let i = 0; i < neighbourIdxsPattern.length; i++) {
        if (image[rowIdx + neighbourIdxsPattern[i][0]][columnIdx + neighbourIdxsPattern[i][1]]) {
            the3x3Block.push(true);
        } else {
            the3x3Block.push(false);
        }
    }
    return the3x3Block
}

function giveIEAIdx(the3x3Block: boolean[]) {
    let binaryString = '';
    the3x3Block.forEach(item => {
        if (item) {
            binaryString += '1'
        } else {
            binaryString += '0';
        }
    })
    return parseInt(binaryString, 2);
}

function giveAmountOfLitPixels(image: boolean[][]) {
    let counter: number = 0;
    image.forEach(item => {
        let filtered: boolean[] = item.filter(value => value); // each row now contains only true --> so the length of the row cann be added to counter
        counter+= filtered.length;
    })
    return counter
}

function giveAmountOfLitPixels2(image: boolean[][]) {
    let counter = 0;

    for (let i=0; i<image.length; i++) {
        for (let j=0; j<image[i].length; j++) {
            if (image[i][j] === true) {
                counter++
            }
        }
    }
    return counter
}

function performIterations(amount: number, image: boolean[][]) {
    let currentImage = image;

    console.log(`========= ITERATION 0 ===========`)
    logImage(currentImage);
    const amountOfLitPixels = giveAmountOfLitPixels2(currentImage);
        console.log(`\t there are ${amountOfLitPixels} lit`)

    for (let i=0; i<amount; i++) {
        currentImage = giveNextIteration(currentImage);
        console.log(`========= ITERATION ${i} ===========`)
        logImage(currentImage);
        const amountOfLitPixels = giveAmountOfLitPixels2(currentImage);
        console.log(`\t there are ${amountOfLitPixels} lit`)
    }
}



performIterations(2, inputImage);