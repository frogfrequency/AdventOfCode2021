import { puzzleDotCoords, puzzleInstructions } from "./puzzle-input.mjs";

const testDotCoords = // x, y
    [
        [6, 10],
        [0, 14],
        [9, 10],
        [0, 3],
        [10, 4],
        [4, 11],
        [6, 0],
        [6, 12],
        [4, 1],
        [0, 13],
        [10, 12],
        [3, 4],
        [3, 0],
        [8, 4],
        [1, 10],
        [2, 14],
        [8, 10],
        [9, 0]
    ]

const testInstructions =
    [
        ['y', 7],
        ['x', 5]
    ]

const dotCoords = puzzleDotCoords; // change input here
const instructions = puzzleInstructions; // ... and here


// preprocessing: creating sheetArr (papersize deduced from folding lines) and filling with #'s where needed


let xMax;
let yMax;

if (instructions[0][0] === 'y') {
    yMax = instructions[0][1] * 2 + 1
    xMax = instructions[1][1] * 2 + 1
} else {
    xMax = instructions[0][1] * 2 + 1
    yMax = instructions[1][1] * 2 + 1
}

let sheet = [];
let row = new Array(xMax).fill('.');

for (let i = 0; i < yMax; i++) {
    sheet.push(row.slice());
}

dotCoords.forEach(element => {
    sheet[element[1]][element[0]] = '#'
})

// solution

function performYFold(foldRow) {
    for (let rowIdx = foldRow + 1; rowIdx < sheet.length; rowIdx++) {
        let targetRow = (sheet.length - 1) % rowIdx;
        for (let x = 0; x < sheet[rowIdx].length; x++) {
            if (sheet[rowIdx][x] === '#') {
                sheet[targetRow][x] = '#';
            }
        }
    }
    let sheetLength = sheet.length
    for (let rowIdx = foldRow; rowIdx < sheetLength; rowIdx++) {
        sheet.pop();
    }
}

function performXFold(foldColumn) {
    for (let x = foldColumn + 1; x < sheet[0].length; x++) {
        let targetX = (sheet[0].length - 1) % x;
        for (let rowIdx = 0; rowIdx < sheet.length; rowIdx++) {
            if (sheet[rowIdx][x] === '#') {
                sheet[rowIdx][targetX] = '#';
            }
        }
    }
    let rowLength = sheet[0].length;
    for (let rowIdx = 0; rowIdx < sheet.length; rowIdx++) {
        sheet[rowIdx].splice(foldColumn, (rowLength + 1) / 2)
    }
}

function logSheet() {
    sheet.forEach(element => console.log(element.join().replace(/,/g, '')));
}


// exec


instructions.forEach(item => { // perform all folds
    if (item[0] === 'y') {
        performYFold(item[1])
    } else {
        performXFold(item[1])
    }
})


logSheet();