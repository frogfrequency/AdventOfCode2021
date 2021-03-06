// INPUT

import { puzzleInput } from "./data/puzzle-input.js"

const testInput: string = 
`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

const input: string = puzzleInput; // change input here

// GLOBAL VARIABLES

const map: number[][] = [];

let activeCoords: string[] = [];
activeCoords.push('0,0'); // pushing the starting top left corner to the array

let visitedCoords: string[] = ['0,0'];


// PREPROCESSING / CREATING MAP ARRAY

const stringLines: string[] = input.split('\n');
stringLines.forEach(element => {
    let stringValues: string[] = element.split('');
    let intLine: number[] = [];
    stringValues.forEach(item => {
        intLine.push(parseInt(item, 10))
    })
    map.push(intLine);
})
map[0][0] = 1; // making the top left position one so its threat level is always one (which is subtracted at the end before logging i)


// END OF PREPROCESSING


function giveAdjacents(coords: number[]): number[][] {
    let adjacentsCoordsArr = []
    let y = coords[0];
    let x = coords[1];

    if (y != 0) { adjacentsCoordsArr.push([y - 1, x]) }; // if statments prevent code to try and access non-existent arrays or idxs like arr[-1]
    if (x != map[0].length - 1) { adjacentsCoordsArr.push([y, x + 1]) };
    if (y != map.length - 1) { adjacentsCoordsArr.push([y + 1, x]) };
    if (x != 0) { adjacentsCoordsArr.push([y, x - 1]) };

    return adjacentsCoordsArr
}

function performRound(): void {
    let nextActive: string[] = [...activeCoords];

    // decrease all active coords by one  
    activeCoords.forEach(element => {
        let elementArr: number[] = toArr(element);
        map[elementArr[0]][elementArr[1]]--
        let newValue: number = map[elementArr[0]][elementArr[1]];
        if (newValue === 0) {
            // remove current element form nextActive
            nextActive = nextActive.filter(activeElement => activeElement !== element )
            // find adjacents, validate and push to nextActive and visited
            let newAdjacentsNum:number[][] = giveAdjacents(elementArr);
            let newAdjacentsStr: string[] = [];
            newAdjacentsNum.forEach( element => {
                newAdjacentsStr.push(toString(element))
            })
            newAdjacentsStr = newAdjacentsStr.filter(element => !visitedCoords.includes(element))
            nextActive = nextActive.concat(newAdjacentsStr);
            visitedCoords = visitedCoords.concat(newAdjacentsStr);
        }
        activeCoords = nextActive;
    })
    // all that reach 0 -->

    // add valid neighbours to the active array and visited
    // valid neighbours = neighbours that are not in visited
    // delete themself from active
}





// UTIL


function logMap(): void {
    map.forEach(element => {
        console.log(element.join().replace(/,/g, ''));
    })
    console.log('---------------')
}

function toArr(string: string): number[] {
    let input = string.split(',');
    let output: number[] = [];
    output.push(parseInt(input[0]));
    output.push(parseInt(input[1]));
    return output
}

function toString(coordArr: number[]): string {
    return coordArr[0] + ',' + coordArr[1]
}



// EXEC

logMap();
let lastLetter: number = map[map.length-1][map[0].length-1]

let i: number = 0;
while (lastLetter != 0) {
    performRound();
    // logMap();
    i++;
    lastLetter = map[map.length-1][map[0].length-1];
    console.log(i-1);
}

logMap();




// TESTING



// let testArray: number[] = [1, 5];

// let testString: string = toString(testArray);

// console.log(testArray);
// console.log(testString);
// console.log('-------')

// let newTestArray: number[] = toArr(testString);

// let newTestString: string = toString(newTestArray);




// console.log(newTestArray);
// console.log(newTestString);
// console.log('-------')


// let testArr1: string[]= [
//     '1,13',
//     '45, 23',
//     '5,5',
// ]

// let testArr2: string[]= [
//     '4,6',
//     '6,6',
//     '10,10',
//     '10,0'
// ]

// let mergedArr: string[] = testArr1.concat(testArr2);

// console.log(mergedArr)