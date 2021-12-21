export { }
import { puzzleInput } from "./data/puzzle-input.js"

const input: string = puzzleInput;

// PREPROCESSING

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


// TYPES

type Response = {
    value: number
    stringLength: number
}


// SOLUTION

function parseIt(transmission: string): Response {
    let response: Response = { value: 0, stringLength: 0 }
    const packetVersion: string = transmission.slice(0, 3);
    const typeId: string = transmission.slice(3, 6);
    const body = transmission.slice(6, transmission.length);
    let subValues: number[] = [];

    console.log(`parseIt receives: ----too long^^-----, with version: ${parseInt(packetVersion, 2)}`)


    if (typeId === '100') { // LITERALVALUE
        let literalValueOutput: number[] = processLiteralValue(body);
        let literalValueDec: number = literalValueOutput[0];
        let literalValueLength: number = literalValueOutput[1];
        console.log(`\t\t\tliteralValue (dec) = ${literalValueDec}, length: ${literalValueLength}`)

        response.stringLength = literalValueLength+6;
        response.value = literalValueDec;
        return response // return response here so function calculateValue doesnt get called at the end
    } else {
        let lengthTypeId = transmission.charAt(6);
        if (lengthTypeId === '0') { // OPERATOR -> BITLENGTH
            let numberOfBits: number = parseInt(body.slice(1, 16), 2);
            let nextTransmissionPart: string = body.slice(16, numberOfBits + 16);

            while (0 < nextTransmissionPart.length) {
                let packetResponse: Response = parseIt(nextTransmissionPart); // calling recursive function againg with new transPart
                subValues.push(packetResponse.value);
                nextTransmissionPart = nextTransmissionPart.slice(packetResponse.stringLength, nextTransmissionPart.length);
            }
            response.stringLength = numberOfBits + 22; // because of 3 + 3 + 1 + 15
        } else if (lengthTypeId === '1') { // OPERATOR - AMOUNT OF SUBPACKETS
            let unknownLength: number = 0;
            let numberOfPackets: number = parseInt(body.slice(1, 12), 2)
            let nextTransmissionPart: string = body.slice(12, body.length); // 12 because 1 + 11 (first 6 have been sliced before)

            for (let i = 0; i < numberOfPackets; i++) {
                let packetResponse: Response = parseIt(nextTransmissionPart); // calling recursive function againg with new transmissionPart
                subValues.push(packetResponse.value);
                unknownLength += packetResponse.stringLength;
                nextTransmissionPart = nextTransmissionPart.slice(packetResponse.stringLength, nextTransmissionPart.length);
            }
            response.stringLength = unknownLength + 18 // because 3 + 3 + 1 + 11
        } else {
            console.log(`ERROR: no valid transmission part passed!!! faulty input: ${transmission} returning it's length: (${transmission.length})`)
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
    let literalValue: string = '';

    let length: number = 0;

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

