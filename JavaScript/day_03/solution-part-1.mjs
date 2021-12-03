import { puzzleInput } from "./puzzle-input.mjs";

const testInput = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'
]

let input = puzzleInput;


function giveGammarate(arr) {
    let numberLength = arr[0].length;
    // console.log(numberLength);


    let gammaRate = '';

    for (let i = 0; i < numberLength; i++) {

        let logic0counter = 0;
        let logic1counter = 0;

        for (let j = 0; j < arr.length; j++) {

            if (arr[j].charAt(i) === '0') {
                logic0counter++;
            } else {
                logic1counter++;
            }
        }
        if (logic0counter < logic1counter) {
            gammaRate += '1';
        } else {
            gammaRate += '0';
        }

    }
    return gammaRate
}


function deduceEpsilonRate(input) {
    let output = '';
    for (let i=0; i<input.length; i++) {
        if (input.charAt(i) === '0') {
            output+= '1';
        } else {
            output+= '0';
        }
    }
    return output
}


const gammaRateBin = giveGammarate(input);
const epsilonRateBin = deduceEpsilonRate(gammaRateBin);
const gammaRateDec = parseInt(gammaRateBin, 2);
const epsilonRateDec = parseInt(epsilonRateBin, 2);



console.log(gammaRateDec*epsilonRateDec);