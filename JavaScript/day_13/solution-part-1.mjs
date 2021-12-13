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


// preprocessing part 1 --> creating 2dArray from xMax and yMax, populating it with hashtags, creating logging function

// let xCoords = [];
// let yCoords = [];

// dotCoords.forEach(element => {
//     xCoords.push(element[0])
//     yCoords.push(element[1])
// })

// const xMax = Math.max(...xCoords)
// const yMax = Math.max(...yCoords)

let xMax;
let yMax;

if (instructions[0][0] === 'y') {
    yMax = instructions[0][1]*2+1
    xMax = instructions[1][1]*2+1
} else {
    xMax = instructions[0][1]*2+1
    yMax = instructions[1][1]*2+1
}

// console.log(xMax, yMax)

let sheet = [];

let row = new Array(xMax).fill('.');

for (let i = 0; i < yMax; i++) {
    sheet.push(row.slice());
}

dotCoords.forEach(element => {
    sheet[element[1]][element[0]] = '#'
})

function logSheet() {
    sheet.forEach(element => console.log(element.join().replace(/,/g, '')));
}


// solution

let firstFoldingInstruction = instructions[0];

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
        let targetX = (sheet[0].length-1) % x;
       for (let rowIdx = 0; rowIdx< sheet.length; rowIdx++) {
           if (sheet[rowIdx][x] === '#') {
               sheet[rowIdx][targetX] = '#';
           }
       }
    }
    let rowLength = sheet[0].length;
    for (let rowIdx = 0; rowIdx < sheet.length; rowIdx++) {
        sheet[rowIdx].splice(foldColumn,(rowLength+1)/2)
    }
}


// performYFold(7);
performXFold(655);



// logSheet();

// counting

let counter = 0;

sheet.forEach( item => item.forEach( element => {
    if (element === '#') {
        counter++
    }
}))

console.log('\n\n\tfinal couner: ' + counter);




// make sure you do the right fold x or y!!!!!!! yfold should work.. no do the xfold ....... 