"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// INPUT
let testInput1 = 'D2FE28';
let testInput2 = '38006F45291200';
let testInput3 = 'EE00D40C823060';
// import { puzzleInput } from "./data/puzzle-input.js"
const input = testInput2;
// GLOBAL VARIABLES
// PREPROCESSING / CREATING MAP ARRAY
let binaryTransmission = '';
for (let i = 0; i < input.length; i++) {
    binaryTransmission += parseBin(input.charAt(i));
}
function parseBin(char) {
    let output = parseInt(char, 16).toString(2);
    while (output.length < 4) {
        output = '0' + output;
    }
    return output;
}
// console.log(binaryTransmission)
// END OF PREPROCESSING
function processString(transmission) {
    console.log(`processString receives: ${transmission}`);
    const packetVersion = transmission.slice(0, 3);
    const typeId = transmission.slice(3, 6);
    const body = transmission.slice(6, transmission.length);
    // typeId 4 - literal value
    if (typeId === '100') {
        // let literalValue = giveLiteralValue(body)
        console.log('literalvalue reached!');
        return parseInt(packetVersion, 2);
    }
    else {
        // other than typeId 4 - operator
        let lengthTypeId = transmission.charAt(6);
        if (lengthTypeId === '0') {
            let numberOfBits = parseInt(body.slice(1, 16), 2);
            let nextTransmissionPart = body.slice(16, body.length);
            processString(nextTransmissionPart); // calling recursive function againg with new transPart
        }
        else {
            // do that
        }
    }
    return 0;
}
// function giveLiteralValue(literalBody: string): number {
//     let literalValue: string = '';
//     for (let i=0; i<literalBody.length; i+= 5) {
//         literalValue += literalBody.slice(i+1, i+5);
//         if (literalBody.charAt(i) === '0') {
//             i = literalBody.length;
//         }
//     }
//     return parseInt(literalValue, 2);
// }
// EXEC
processString(binaryTransmission);
// TESTING AREA
//# sourceMappingURL=solution-part-1.js.map