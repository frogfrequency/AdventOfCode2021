"use strict";
// INPUT
let testInput1 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`;
let testInput2 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;
// import { puzzleInput } from "./data/puzzle-input.js"
let input = testInput2;
let inputLinesArr = input.split('\n');
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
// UTILITY
function isDigit(str) {
    if (str != ',' && str != '[' && str != ']') {
        return true;
    }
    return false;
}
// SOLUTION
function performExplosion(line) {
    let bracketCounter = 0;
    let previousNumberStartIdx = -1;
    let previousNumber = -1;
    let previousNumberLength = 0;
    let futureNumberStartIdx = -1;
    let futureNumber = -1;
    let futureNumberLength = 0;
    let explosionStartIdx = -1;
    let firstNumber = -1;
    let firstNumberLength = 0;
    let secondNumber = -1;
    let secondNumberLength = 0;
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        if (char === '[') {
            bracketCounter++;
        }
        else if (char === ']') {
            bracketCounter--;
        }
        else if (char != ',') {
            if (0 <= firstNumber) {
                futureNumberStartIdx = i;
                let nextChar = line.charAt(i + 1);
                if (isDigit(nextChar)) {
                    let twoDigitNumber = char + nextChar;
                    futureNumber = parseInt(twoDigitNumber, 10);
                    futureNumberLength = 2;
                    i++;
                }
                else {
                    futureNumber = parseInt(char, 10);
                    futureNumberLength = 1;
                }
                break;
            }
            else {
                previousNumberStartIdx = i;
                let nextChar = line.charAt(i + 1);
                if (isDigit(nextChar)) {
                    let twoDigitNumber = char + nextChar;
                    previousNumber = parseInt(twoDigitNumber, 10);
                    previousNumberLength = 2;
                    i++;
                }
                else {
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
                }
                else {
                    firstNumber = parseInt(line.charAt(i + 1));
                    firstNumberLength = 1;
                    i = i + 2;
                }
                nextChar = line.charAt(i + 2); // since i has just been updated by either 2 or 3
                if (isDigit(nextChar)) {
                    let twoDigitNumber = line.charAt(i + 1) + nextChar;
                    secondNumber = parseInt(twoDigitNumber, 10);
                    secondNumberLength = 2;
                    i = i + 3;
                }
                else {
                    secondNumber = parseInt(line.charAt(i + 1));
                    secondNumberLength = 1;
                    i = i + 2;
                }
            }
        }
    }
    console.log(`firstNumber and length: ${firstNumber}, ${firstNumberLength}
    secondNumber and length: ${secondNumber}, ${secondNumberLength}
    previousNumber and length: ${previousNumber}, ${previousNumberLength}
    futureNumber and length: ${futureNumber}, ${futureNumberLength}`);
    // console.log(`pair: ${firstNumber}, ${secondNumber}, previousNrIdx: ${line.charAt(previousNumberStartIdx)}, futureIdx: ${line.charAt(futureNumberStartIdx)}`);
    let newLine = line;
    if (firstNumber != -1) { // do the exploding // you could check for many other things e.g. secondNumberLength or futureNumberLength etc.
        let newPreviousNumber = '';
        let newFutureNumber = '';
        if (futureNumberStartIdx != -1) { // if a future number exists:
            newFutureNumber = JSON.stringify(secondNumber + futureNumber);
            newLine = newLine.slice(0, futureNumberStartIdx) + newFutureNumber + newLine.slice(futureNumberStartIdx + futureNumberLength, newLine.length);
        }
        newLine = newLine.slice(0, explosionStartIdx) + '0' + newLine.slice(explosionStartIdx + 3 + previousNumberLength + futureNumberLength, newLine.length);
        if (previousNumberStartIdx != -1) { // if a previous number exists:
            newPreviousNumber = JSON.stringify(firstNumber + previousNumber);
            newLine = newLine.slice(0, previousNumberStartIdx) + newPreviousNumber + newLine.slice(previousNumberStartIdx + previousNumberLength, newLine.length);
        }
    }
    return newLine;
}
function performSplit(line) {
    let newLine = line;
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        let nextChar = line.charAt(i + 1);
        if (char != '[' && char != ']' && char != ',' && nextChar != '[' && nextChar != ']' && nextChar != ',') { // must be a 2 digit nr then
            let splitResultPair = giveSplitResultPair(char, nextChar);
            newLine = newLine.slice(0, i) + splitResultPair + newLine.slice(i + 2, newLine.length);
            return newLine;
        }
    }
    return newLine;
}
function giveSplitResultPair(first, second) {
    let number = parseInt(first + second, 10);
    return '[' + JSON.stringify(Math.floor(number / 2)) + ',' + JSON.stringify(Math.ceil(number / 2)) + ']';
}
function giveReducedLine(line) {
    let lineBeforeReductionAction = line;
    let lineAfterReductionAction = performReductionAction(lineBeforeReductionAction);
    while (lineBeforeReductionAction != lineAfterReductionAction) {
        lineBeforeReductionAction = lineAfterReductionAction;
        lineAfterReductionAction = performReductionAction(lineAfterReductionAction);
    }
    return lineAfterReductionAction;
}
function performReductionAction(line) {
    let lineBeforeExplosionAction = line;
    let lineAfterExplosionAction = performExplosion(lineBeforeExplosionAction);
    while (lineBeforeExplosionAction != lineAfterExplosionAction) {
        lineBeforeExplosionAction = lineAfterExplosionAction;
        lineAfterExplosionAction = performExplosion(lineAfterExplosionAction);
    }
    let lineAfterSplitAction = performSplit(lineAfterExplosionAction);
    return lineAfterSplitAction;
}
function performAddition() {
    let masterNumber = inputLinesArr[0];
    for (let i = 1; i < inputLinesArr.length; i++) {
        masterNumber = '[' + masterNumber + ',' + inputLinesArr[i] + ']';
        masterNumber = giveReducedLine(masterNumber);
        console.log(masterNumber);
    }
    console.log(masterNumber);
}
// EXEC
// performAddition();
// let afterOneExplosion: string = performExplosion(testLine4);
// performExplosion(afterOneExplosion);
// "[[[[4,0],[5,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]"
// TESTING AREA
// let temp = "[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]"
let temp = '[[[[[9,8],1],2],3],4]';
// for (let i=0; i<10; i++) {
//     temp = giveReducedLine(temp);
//     console.log(temp);
// }
console.log(performExplosion(temp));
// let doubleDigitExplosions: string = '[[[[35,[10,10]]],7]]';
//                                 //  '[[[[45,0]],17]]' 
// console.log(performExplosion(doubleDigitExplosions));
//# sourceMappingURL=solution-part-1.js.map