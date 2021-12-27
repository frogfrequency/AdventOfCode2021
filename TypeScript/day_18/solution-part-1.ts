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

let testInput3 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`

import {puzzleInput} from "./data/puzzle-input.js"


let input: string = puzzleInput; // change input here

let inputLinesArr: string[] = input.split('\n');


// UTILITY


function isDigit(str: string): boolean {
    if (str != ',' && str != '[' && str != ']') {
        return true
    }
    return false
}


// SOLUTION


function performExplosion(line: string): string {
    let bracketCounter: number = 0;

    let previousNumberStartIdx: number = -1;
    let previousNumber: number = -1;
    let previousNumberLength: number = 0;
    let futureNumberStartIdx: number = -1;
    let futureNumber: number = -1;
    let futureNumberLength: number = 0;

    let explosionStartIdx: number = -1;

    let firstNumber: number = -1;
    let firstNumberLength: number = 0;
    let secondNumber: number = -1;
    let secondNumberLength: number = 0;


    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        if (char === '[') {
            bracketCounter++
        } else if (char === ']') {
            bracketCounter--
        } else if (char != ',') {
            if (0 <= firstNumber) {
                futureNumberStartIdx = i;

                let nextChar: string = line.charAt(i + 1);

                if (isDigit(nextChar)) {
                    let twoDigitNumber: string = char + nextChar;
                    futureNumber = parseInt(twoDigitNumber, 10);
                    futureNumberLength = 2;
                    i++;
                } else {
                    futureNumber = parseInt(char, 10);
                    futureNumberLength = 1;
                }
                break;
            } else {
                previousNumberStartIdx = i;

                let nextChar: string = line.charAt(i + 1);


                if (isDigit(nextChar)) {
                    let twoDigitNumber: string = char + nextChar;
                    previousNumber = parseInt(twoDigitNumber, 10);
                    previousNumberLength = 2;
                    i++;
                } else {
                    previousNumber = parseInt(char, 10);
                    previousNumberLength = 1;
                }
            }
        }

        if (bracketCounter === 5) {
            if (firstNumber === -1) {
                explosionStartIdx = i;
                let nextChar = line.charAt(i + 2);

                if (isDigit(nextChar)) {
                    let twoDigitNumber = line.charAt(i + 1) + nextChar;
                    firstNumber = parseInt(twoDigitNumber, 10);
                    firstNumberLength = 2;
                    i = i + 3;
                } else {
                    firstNumber = parseInt(line.charAt(i + 1));
                    firstNumberLength = 1;
                    i = i + 2;
                }

                nextChar = line.charAt(i + 2) // since i has just been updated by either 2 or 3
                if (isDigit(nextChar)) {
                    let twoDigitNumber = line.charAt(i + 1) + nextChar;
                    secondNumber = parseInt(twoDigitNumber, 10);
                    secondNumberLength = 2;
                    i = i + 3;
                } else {
                    secondNumber = parseInt(line.charAt(i + 1));
                    secondNumberLength = 1;
                    i = i + 2;
                }
            }
        }
    }

    let newLine: string = line;

    if (firstNumber != -1) { // do the exploding // you could check for many other things e.g. secondNumberLength or futureNumberLength etc.
        let newPreviousNumber: string = '';
        let newFutureNumber: string = '';

        if (futureNumberStartIdx != -1) { // if a future number exists:
            newFutureNumber = JSON.stringify(secondNumber + futureNumber);
            newLine = newLine.slice(0, futureNumberStartIdx) + newFutureNumber + newLine.slice(futureNumberStartIdx + futureNumberLength, newLine.length)
        }

        newLine = newLine.slice(0, explosionStartIdx) + '0' + newLine.slice(explosionStartIdx + 3 + firstNumberLength + secondNumberLength, newLine.length)

        if (previousNumberStartIdx != -1) { // if a previous number exists:
            newPreviousNumber = JSON.stringify(firstNumber + previousNumber);
            newLine = newLine.slice(0, previousNumberStartIdx) + newPreviousNumber + newLine.slice(previousNumberStartIdx + previousNumberLength, newLine.length)
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
        lineAfterReductionAction = performReductionAction(lineAfterReductionAction);
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

function performAddition(): string {

    let masterNumber: string = inputLinesArr[0];

    for (let i = 1; i < inputLinesArr.length; i++) {
        masterNumber = '[' + masterNumber + ',' + inputLinesArr[i] + ']';
        masterNumber = giveReducedLine(masterNumber);
        // console.log(masterNumber)
    }

    // console.log(masterNumber)
    return masterNumber
}

function giveMagnitude(line: string): number { // is being called recursively

    if (line.charAt(0) != '[') { // must be a single number then
        return parseInt(line,10)
    }

    let innerPart: string = line.slice(1, line.length-1); // remove outer shell
    
    let bracketCounter: number = 0;
    let firstSubPart: string;
    let secondSubPart: string; 

    
    for (let i=0; i<innerPart.length; i++) { // find the "central" comma, split the line there and call function again on these two subparts
        // (if you find a comma and you are not inside a brackets you have found the "central" comma that separates the two parts)
        // outer "shell" has to be removed for this (else you are always inside of brackets obviously)
        let char:string = innerPart.charAt(i);

        if (char === ',' && bracketCounter === 0) { // central "comma" found!
            firstSubPart = innerPart.slice(0, i);
            secondSubPart = innerPart.slice(i+1, innerPart.length);
            return 3*giveMagnitude(firstSubPart) + 2*giveMagnitude(secondSubPart)
        } else if (char === '[') {
            bracketCounter++
        } else if (char === ']') {
            bracketCounter--
        }
    }
    

    return 0 // this should never be reached
}





// EXEC

let finalLine: string = performAddition();

console.log(`the magnitude of the final sum is: ${giveMagnitude(finalLine)} ... the snailfish teacher will be delighted!`);

