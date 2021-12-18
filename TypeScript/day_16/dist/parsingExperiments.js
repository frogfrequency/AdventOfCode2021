"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// INPUT
let testInput0 = 'D2FE28';
let testInput1 = '38006F45291200';
let testInput2 = 'EE00D40C823060'; // operator with 3 subpackets
let testInput11 = '8A004A801A8002F478';
let testInput12 = '620080001611562C8802118E34';
// let subTestInput12: string = '001000100000000010000100011000111000110100'
let testInput13 = 'C0015000016115A2E0802F182340';
let testInput14 = 'A0016C880162017C3686B18A3D4780';
// import { puzzleInput } from "./data/puzzle-input.js"
const input = testInput14;
// GLOBAL VARIABLES
let versionCounter = 0;
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
console.log(binaryTransmission);
// END OF PREPROCESSING
function parseIt(transmission) {
    const packetVersion = transmission.slice(0, 3);
    versionCounter += parseInt(packetVersion, 2);
    // maybe sum all packet Versions globally and not return them???
    const typeId = transmission.slice(3, 6);
    console.log(`parseIt receives: ${transmission}, with version: ${parseInt(packetVersion, 2)}`);
    const body = transmission.slice(6, transmission.length);
    if (typeId === '100') { // LITERALVALUE
        console.log(`\tliteralvalue found here with body: ${body}`);
        let literalValueOutput = processLiteralValue(body);
        let literalValueDec = literalValueOutput[0];
        let literalValueLength = literalValueOutput[1];
        console.log(`\t\t\tliteralValue (dec) = ${literalValueDec}, length: ${literalValueLength}`);
        // let newBody: string = body.slice(literalValueLength, body.length);
        // if (0 < newBody.length) {
        //     parseIt(newBody);
        // }
        // maybe we dont need to do this above because we should process the rest of the body in the function one level above
        return literalValueLength + 6; // because there must've been a version- and type- id --> 6 digits 
        // you need to check if the rest of the body contains other packets because this is possible
    }
    else {
        let lengthTypeId = transmission.charAt(6);
        if (lengthTypeId === '0') { // OPERATOR -> BITLENGTH
            let numberOfBits = parseInt(body.slice(1, 16), 2);
            console.log(`\tlengthTypeId = ${lengthTypeId} ---> use next ${numberOfBits} bits`);
            let nextTransmissionPart = body.slice(16, numberOfBits + 16); // changed body.length to 16+numberOfBits
            console.log(`\tnextTransmissionPart: ${nextTransmissionPart}`);
            let packageLength;
            while (0 < nextTransmissionPart.length) {
                let lengthOfSubPacket = parseIt(nextTransmissionPart); // calling recursive function againg with new transPart
                nextTransmissionPart = nextTransmissionPart.slice(lengthOfSubPacket, nextTransmissionPart.length);
            }
            return numberOfBits + 22; // because of 3 + 3 + 1 + 15 ?????
            // this function must return its value so we know if there is a rest to process.. ?
            // you need to check if the rest of the body contains other packets because this is possible 
        }
        else if (lengthTypeId === '1') { // OPERATOR - AMOUNT OF SUBPACKETS
            let unknownLength = 0;
            let numberOfPackets = parseInt(body.slice(1, 12), 2);
            console.log(`\tlengthTypeId = ${lengthTypeId} ---> use next ${numberOfPackets} PACKETS`);
            let nextTransmissionPart = body.slice(12, body.length); // 12 because 1 + 11 (first 6 have been sliced before)
            console.log(`\tnextTransmissionPart: ${nextTransmissionPart}`);
            for (let i = 0; i < numberOfPackets; i++) {
                let lengthOfSubPacket = parseIt(nextTransmissionPart); // calling recursive function againg with new transPart
                unknownLength += lengthOfSubPacket;
                nextTransmissionPart = nextTransmissionPart.slice(lengthOfSubPacket, nextTransmissionPart.length);
            }
            return unknownLength + 18; // 
        }
        else {
            console.log(`ERROR: no valid transmission part passed!!! faulty input: ${transmission} returning it's length: (${transmission.length})`);
            return transmission.length; // returnin this so it can be subtracted in the previous function and eventuell while loops terminate
        }
    }
    // call function again with the rest if any????
    // return the length of 'this' because others might need to know
    return 0;
}
// EXEC
parseIt(binaryTransmission);
// parseIt('001000100000000010000100011000111000110100')
// TESTING AREA
function processLiteralValue(literalBody) {
    console.log(`\t\tprocessLiterValue receives: ${literalBody}`);
    let literalValue = '';
    let length = 0; // change this ofc
    for (let i = 0; i < literalBody.length; i += 5) {
        literalValue += literalBody.slice(i + 1, i + 5);
        if (literalBody.charAt(i) === '0') {
            length = i + 5;
            i = literalBody.length; // stops the for loop because a leading 0 means this is the last sequence of 4 bits
        }
    }
    return [parseInt(literalValue, 2), length];
}
console.log(versionCounter);
//# sourceMappingURL=parsingExperiments.js.map