// INPUT

let testInput1 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`

let testInput2 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`


// import { puzzleInput } from "./data/puzzle-input.js"

let input:string = testInput2;

let inputLinesArr: string[] = input.split('\n');
// console.log(inputLinesArr) 


// GLOBAL VARIABLES



// PREPROCESSING / CREATING MAP ARRAY

/*

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




                explision can happen with numbers with 2 digits!!!!! --> update performExplosion function needed!!!


                
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





// END OF PREPROCESSING

*/


// SOLUTION


function performExplosion(line: string): string {
    let bracketCounter: number = 0;

    let previousNumberIdx: number = -1;
    let previousNumber: number = -1;
    let futureNumber: number = -1;
    let futureNumberIdx: number = -1;

    let explosionStartIdx: number = -1;
    let firstNumber: number = -1;
    let secondNumber: number = -1;


    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        if (char === '[') {
            bracketCounter++
        } else if (char === ']') {
            bracketCounter--
        } else if (char != ',') {
            if (0 <= firstNumber) {
                futureNumberIdx = i;
                futureNumber = parseInt(line.charAt(i), 10);
                break;
            } else {
                previousNumberIdx = i;
                previousNumber = parseInt(line.charAt(i), 10);
            }
        }

        if (bracketCounter === 5) {
            if (firstNumber === -1) {
                explosionStartIdx = i;
                firstNumber = parseInt(line.slice(i + 1, i + 2), 10);
                secondNumber = parseInt(line.slice(i + 3, i + 4), 10)
                i = i + 4;
            }
        }
    }

    // console.log(`pair: ${firstNumber}, ${secondNumber}, previousNrIdx: ${line.charAt(previousNumberIdx)}, futureIdx: ${line.charAt(futureNumberIdx)}`);

    let newLine: string = line;

    if (firstNumber != -1) { // do the exploding
        let newPreviousNumber: string = '';
        let newFutureNumber: string = '';

        if (futureNumberIdx != -1) { // if a future number exists:
            newFutureNumber = JSON.stringify(secondNumber + futureNumber);
            newLine = newLine.slice(0, futureNumberIdx) + newFutureNumber + newLine.slice(futureNumberIdx + 1, newLine.length)
        }

        newLine = newLine.slice(0, explosionStartIdx) + '0' + newLine.slice(explosionStartIdx + 5, newLine.length)

        if (previousNumberIdx != -1) { // if a previous number exists:
            newPreviousNumber = JSON.stringify(firstNumber + previousNumber);
            newLine = newLine.slice(0, previousNumberIdx) + newPreviousNumber + newLine.slice(previousNumberIdx + 1, newLine.length)
        }

    }
    return newLine
}


function performSplit(line: string): string {
    let newLine: string = line;
    for (let i = 0; i < line.length; i++) {
        let char: string = line.charAt(i);
        let nextChar: string = line.charAt(i + 1)
        if (char != '[' && char != ']' && char != ',' && nextChar != '[' && nextChar != ']' && nextChar != ',') { // must be a 2 digit nr then
            let splitResultPair = giveSplitResultPair(char, nextChar);
            newLine = newLine.slice(0, i) + splitResultPair + newLine.slice(i + 2, newLine.length);
            return newLine
        }
    }
    return newLine
}


function giveSplitResultPair(first: string, second: string): string {
    let number = parseInt(first + second, 10);
    return '[' + JSON.stringify(Math.floor(number / 2)) + ',' + JSON.stringify(Math.ceil(number / 2)) + ']';
}



function giveReducedLine(line: string): string {


    let lineBeforeReductionAction: string = line;
    let lineAfterReductionAction: string = performReductionAction(lineBeforeReductionAction);

    while (lineBeforeReductionAction != lineAfterReductionAction) {
        lineBeforeReductionAction = lineAfterReductionAction;
        lineAfterReductionAction =  performReductionAction(lineAfterReductionAction);
    }

    return lineAfterReductionAction
}


function performReductionAction(line: string): string {

    let lineBeforeExplosionAction = line; 
    let lineAfterExplosionAction = performExplosion(lineBeforeExplosionAction);

    while (lineBeforeExplosionAction != lineAfterExplosionAction) {
        lineBeforeExplosionAction = lineAfterExplosionAction;
        lineAfterExplosionAction = performExplosion(lineAfterExplosionAction);
    }

    let lineAfterSplitAction = performSplit(lineAfterExplosionAction)

    
    return lineAfterSplitAction
}

function performAddition():void {
    
    let masterNumber: string = inputLinesArr[0];

    for (let i=1; i<inputLinesArr.length; i++) {
        masterNumber =  '[' + masterNumber + ',' + inputLinesArr[i] + ']';
        masterNumber = giveReducedLine(masterNumber);
        console.log(masterNumber)
    }

    console.log(masterNumber)

}




// EXEC

// performAddition();

// let afterOneExplosion: string = performExplosion(testLine4);

// performExplosion(afterOneExplosion);

// "[[[[4,0],[5,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]"

let temp = "[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]"

for (let i=0; i<7; i++) {
    temp = performExplosion(temp);
    console.log(temp);
}



// TESTING AREA



