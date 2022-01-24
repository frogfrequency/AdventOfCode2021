"use strict";
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
    IEAString = IEAString.replace('\n', '');
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
logImage(inputImage);
console.log('----');
let firstIteration = giveNextIteration(inputImage);
logImage(firstIteration);
console.log(IEA[136]);
//# sourceMappingURL=solution-part-1.js.map