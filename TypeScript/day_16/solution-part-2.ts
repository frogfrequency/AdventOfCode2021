// ATTENTION THIS MIGHT BE THE UGLIEST PIECE OF CODE YOU'VE EVER SEEN BUT IT IS WHAT IT IS.. NO TIME TO CLEAN UP WE'RE ALREADY 2 DAYS BEHIND!!!!

export { }

import { puzzleInput } from "./data/puzzle-input.js"

// INPUT

let testInput0: string = 'D2FE28';

let testInput1: string = '38006F45291200';

let testInput2: string = 'EE00D40C823060'; // operator with 3 subpackets

let testInput11: string = '8A004A801A8002F478';

let testInput12: string = '620080001611562C8802118E34';

// let subTestInput12: string = '001000100000000010000100011000111000110100'

let testInput13: string = 'C0015000016115A2E0802F182340';

let testInput14: string = 'A0016C880162017C3686B18A3D4780';




// import { puzzleInput } from "./data/puzzle-input.js"

const input: string = puzzleInput;

// GLOBAL VARIABLES

let versionCounter: number = 0;

// PREPROCESSING / CREATING MAP ARRAY

let binaryTransmission: string = '';

for (let i = 0; i < input.length; i++) {

    binaryTransmission += parseBin(input.charAt(i))
}

function parseBin(char: string): string {
    let output: string = parseInt(char, 16).toString(2);
    while (output.length < 4) {
        output = '0' + output;
    }
    return output
}

// console.log(binaryTransmission)

// END OF PREPROCESSING

// TYPES


type Response = {
    value: number
    stringLength: number
}


function parseIt(transmission: string): Response {
    let response: Response = { value: 0, stringLength: 0 }
    const packetVersion: string = transmission.slice(0, 3);
    const typeId: string = transmission.slice(3, 6);
    const body = transmission.slice(6, transmission.length);
    let subValues: number[] = [];

    versionCounter += parseInt(packetVersion, 2);
    console.log(`parseIt receives: ----too long^^-----, with version: ${parseInt(packetVersion, 2)}`)


    if (typeId === '100') { // LITERALVALUE
        // console.log(`\tliteralvalue found here with body: ${body}`)
        let literalValueOutput: number[] = processLiteralValue(body);
        let literalValueDec: number = literalValueOutput[0];
        let literalValueLength: number = literalValueOutput[1];
        console.log(`\t\t\tliteralValue (dec) = ${literalValueDec}, length: ${literalValueLength}`)
        // let newBody: string = body.slice(literalValueLength, body.length);
        // if (0 < newBody.length) {
        //     parseIt(newBody);
        // }
        // maybe we dont need to do this above because we should process the rest of the body in the function one level above
        // return literalValueLength+6; // because there must've been a version- and type- id --> 6 digits 
        response.stringLength = literalValueLength+6;
        response.value = literalValueDec;
        // you need to check if the rest of the body contains other packets because this is possible
        return response
    } else {
        let lengthTypeId = transmission.charAt(6);
        if (lengthTypeId === '0') { // OPERATOR -> BITLENGTH
            let numberOfBits: number = parseInt(body.slice(1, 16), 2);
            console.log(`\tlengthTypeId = ${lengthTypeId} ---> use next ${numberOfBits} bits`)

            let nextTransmissionPart: string = body.slice(16, numberOfBits + 16); // changed body.length to 16+numberOfBits
            // console.log(`\tnextTransmissionPart: ${nextTransmissionPart}`)

            let packageLength: number;

            while (0 < nextTransmissionPart.length) {
                let packetResponse: Response = parseIt(nextTransmissionPart); // calling recursive function againg with new transPart
                subValues.push(packetResponse.value);
                nextTransmissionPart = nextTransmissionPart.slice(packetResponse.stringLength, nextTransmissionPart.length);
            }
            // return numberOfBits + 22 // because of 3 + 3 + 1 + 15 ?????
            response.stringLength = numberOfBits + 22;
        } else if (lengthTypeId === '1') { // OPERATOR - AMOUNT OF SUBPACKETS
            let unknownLength: number = 0;
            let numberOfPackets: number = parseInt(body.slice(1, 12), 2)
            console.log(`\tlengthTypeId = ${lengthTypeId} ---> use next ${numberOfPackets} PACKETS`)
            let nextTransmissionPart: string = body.slice(12, body.length); // 12 because 1 + 11 (first 6 have been sliced before)
            // console.log(`\tnextTransmissionPart: ${nextTransmissionPart}`)

            for (let i = 0; i < numberOfPackets; i++) {
                let packetResponse: Response = parseIt(nextTransmissionPart); // calling recursive function againg with new transPart
                subValues.push(packetResponse.value);
                unknownLength += packetResponse.stringLength;
                nextTransmissionPart = nextTransmissionPart.slice(packetResponse.stringLength, nextTransmissionPart.length);
            }
            // return unknownLength + 18
            response.stringLength = unknownLength + 18
        } else {
            console.log(`ERROR: no valid transmission part passed!!! faulty input: ${transmission} returning it's length: (${transmission.length})`)
            // return transmission.length // returnin this so it can be subtracted in the previous function and eventuell while loops terminate
            response.stringLength = transmission.length; 
        }
    }
    
    response.value = calculateValue(typeId, subValues);
    console.log(response.value)
    return response
}

function calculateValue(operatorID: string, values: number[]): number {
    
    switch (operatorID) {
        case '000': // sum packet
            return values.reduce((a,b) => a+b)
        case '001': // product packet
            return values.reduce((a,b) => a*b)
        case '010': // minimum packet 
            let minSorted: number[] = [...values].sort((a,b) => a-b);
            return minSorted[0];
        case '011': // maximum packet
            let maxSorted: number[] = [...values].sort((a,b) => b-a);
            return maxSorted[0];
        case '101': // greater than packet
            return values[0] > values[1] ? 1 : 0;
        case '110': // less than packet 
            return values[0] < values[1] ? 1 : 0;
        case '111': // equal packet
            return values[0] === values[1] ? 1 : 0;
        default:
            console.log('NO VALID OPERATOR ID PASSED INTO calculateValue')
    }
    return 0;
}

function processLiteralValue(literalBody: string): number[] {
    // console.log(`\t\tprocessLiterValue receives: ${literalBody}`)
    let literalValue: string = '';

    let length: number = 0; // change this ofc

    for (let i = 0; i < literalBody.length; i += 5) {
        literalValue += literalBody.slice(i + 1, i + 5);
        if (literalBody.charAt(i) === '0') {
            length = i + 5;
            i = literalBody.length; // stops the for loop because a leading 0 means this is the last sequence of 4 bits
        }
    }
    return [parseInt(literalValue, 2), length];
}


// EXEC

parseIt(binaryTransmission);

// TESTING AREA

