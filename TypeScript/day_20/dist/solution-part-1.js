"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let testInput = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
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
..###`;
const input = testInput; // change input here
// IEA = image enhancement algorithm
function giveParsedInput(theInput) {
    let IEAString = theInput.split('\n\n')[0];
    IEAString = IEAString.replace(/\n/g, '');
    let IEA = [];
    for (let i = 0; i < IEAString.length; i++) {
        if (IEAString.charAt(i) === '.') {
            IEA.push(false);
        }
        else {
            IEA.push(true);
        }
    }
    let inputImageString = theInput.split('\n\n')[1];
    let inputImageStringSplitted = inputImageString.split('\n');
    let inputImage = [];
    for (let i = 0; i < inputImageStringSplitted.length; i++) {
        let newLine = [];
        let currentString = inputImageStringSplitted[i];
        for (let j = 0; j < currentString.length; j++) {
            if (currentString.charAt(j) === '.') {
                newLine.push(false);
            }
            else {
                newLine.push(true);
            }
        }
        inputImage.push(newLine);
    }
    const output = [[], []];
    output[0] = IEA;
    output[1] = inputImage;
    return output;
}
const parsedInput = giveParsedInput(input);
let IEA = parsedInput[0]; // IEA = image enhancement algorithm
let inputImage = parsedInput[1];
inputImage = addOuterShell(inputImage);
// END OF PREPROCESSING
// CUSTOM TYPES
// UTILITY
function logImage(image) {
    for (let i = 0; i < image.length; i++) {
        let newString = '';
        image[i].forEach(item => {
            newString += item ? '#' : '.';
        });
        console.log(newString);
    }
}
// CODE
let statusOfInfiniteTiles = false; // all the infinitive tiles around the image are represented by this tile 
function giveNextIteration(image) {
    image = addOuterShell(image);
    let newImage = [];
    for (let rowIdx = 1; rowIdx < image.length - 1; rowIdx++) {
        let newRow = [];
        for (let columnIdx = 1; columnIdx < image[rowIdx].length - 1; columnIdx++) {
            let the3x3Block = give3x3block(image, rowIdx, columnIdx);
            let IEAIdx = giveIEAIdx(the3x3Block);
            newRow.push(IEA[IEAIdx]);
        }
        newImage.push(newRow);
    }
    newImage = addOuterShell(newImage);
    return newImage;
}
function addOuterShell(image) {
    image.forEach((item, idx, arr) => {
        arr[idx].push(false);
        arr[idx].unshift(false);
    });
    image.push([]);
    image.unshift([]);
    for (let i = 0; i < image[1].length; i++) {
        image[0].push(false);
        image[image.length - 1].push(false);
    }
    return image;
}
function give3x3block(image, rowIdx, columnIdx) {
    let neighbourIdxsPattern = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let i = 0; i < neighbourIdxsPattern.length; i++) {
    }
    let the3x3Block = [];
    for (let i = 0; i < neighbourIdxsPattern.length; i++) {
        if (image[rowIdx + neighbourIdxsPattern[i][0]][columnIdx + neighbourIdxsPattern[i][1]]) {
            the3x3Block.push(true);
        }
        else {
            the3x3Block.push(false);
        }
    }
    return the3x3Block;
}
function giveIEAIdx(the3x3Block) {
    let binaryString = '';
    the3x3Block.forEach(item => {
        if (item) {
            binaryString += '1';
        }
        else {
            binaryString += '0';
        }
    });
    return parseInt(binaryString, 2);
}
function giveAmountOfLitPixels(image) {
    let counter = 0;
    image.forEach(item => {
        let filtered = item.filter(value => value); // each row now contains only true --> so the length of the row cann be added to counter
        counter += filtered.length;
    });
    return counter;
}
function giveAmountOfLitPixels2(image) {
    let counter = 0;
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            if (image[i][j] === true) {
                counter++;
            }
        }
    }
    return counter;
}
function performIterations(amount, image) {
    let currentImage = image;
    console.log(`========= ITERATION 0 ===========`);
    logImage(currentImage);
    const amountOfLitPixels = giveAmountOfLitPixels2(currentImage);
    console.log(`\t there are ${amountOfLitPixels} lit`);
    for (let i = 0; i < amount; i++) {
        currentImage = giveNextIteration(currentImage);
        console.log(`========= ITERATION ${i} ===========`);
        logImage(currentImage);
        const amountOfLitPixels = giveAmountOfLitPixels(currentImage);
        const amountOfLitPixels2 = giveAmountOfLitPixels2(currentImage);
        console.log(`\t there are ${amountOfLitPixels} / ${amountOfLitPixels2} lit`);
    }
}
// for (let i=0; i<Array.length; i++) {
// }
performIterations(2, inputImage);
//# sourceMappingURL=solution-part-1.js.map