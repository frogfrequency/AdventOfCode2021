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

const input = puzzleInput;


function giveRate(arr, rate) {

    let numberLength = arr[0].length;

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

        switch (rate) {
            case 'oxygen generator':
                if (logic0counter <= logic1counter) {
                    arr = arr.filter(element => element.charAt(i) === '1');
                } else {
                    arr = arr.filter(element => element.charAt(i) === '0');
                }
                break;
            case 'C02 scrubber':
                if (logic0counter <= logic1counter) {
                    arr = arr.filter(element => element.charAt(i) === '0');
                } else {
                    arr = arr.filter(element => element.charAt(i) === '1');
                }
                break;
        }
        if (arr.length === 1) {
            return arr[0];
        }
    }
}





const oxygenGeneratorRateBin = giveRate(input, 'oxygen generator');
const CO2ScrubberRateBin = giveRate(input, 'C02 scrubber');

const oxygenGeneratorRateDec = parseInt(oxygenGeneratorRateBin, 2);
const CO2ScrubberRateDec = parseInt(CO2ScrubberRateBin, 2);

console.log(`life support rating: ${oxygenGeneratorRateDec * CO2ScrubberRateDec}`);


