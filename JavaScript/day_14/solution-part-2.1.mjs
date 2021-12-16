import { puzzleInput } from "./puzzle-input.mjs";
const testInput =
    [
        'NNCB',
        [
            ['CH', 'B'],
            ['HH', 'N'],
            ['CB', 'H'],
            ['NH', 'C'],
            ['HB', 'C'],
            ['HC', 'B'],
            ['HN', 'C'],
            ['NN', 'C'],
            ['BH', 'H'],
            ['NC', 'B'],
            ['NB', 'B'],
            ['BN', 'B'],
            ['BB', 'N'],
            ['BC', 'B'],
            ['CC', 'N'],
            ['CN', 'C']
        ]
    ]

const input = puzzleInput; // change input here

// creating masterCounter and emptyMasterCounter

let masterCounter = {};
let lut = {};
input[1].forEach(item => {
    masterCounter[item[0]] = 0;
    lut[item[0]] = [item[0].charAt(0) + item[1], item[1] + item[0].charAt(1)]
})
let emptyMasterCounter = {...masterCounter}

// feed initial polymerTemplate to masterCounter:

let initialPolymerTemplate = input[0]
for (let i=1; i<initialPolymerTemplate.length; i++) {
    let charPair = initialPolymerTemplate[i-1] + initialPolymerTemplate[i];
    masterCounter[charPair]++
}

// get keys for easier looping through masterCounter

let keys = Object.keys(emptyMasterCounter)

// create characterAmountArr --- to count all the characters laters

let insertions = [];
input[1].forEach(item => {
    insertions.push(item[1])
})
let charSet = new Set(insertions)
let charArr = Array.from(charSet)
let characterCounter = {};
charArr.forEach( item => {
    characterCounter[item] = 0;
})



// perform a round

function performRound() {
    let newMasterCounter = {...emptyMasterCounter}
    keys.forEach( key => {
        let firstPair = lut[key][0];
        let secondPair = lut[key][1];
        newMasterCounter[firstPair] += masterCounter[key]
        newMasterCounter[secondPair] += masterCounter[key]  
    })
    masterCounter = newMasterCounter;
}

function giveDoubledCharacterCount() {
    let newCharacterCounter = {...characterCounter};
    keys.forEach( item => {
        let firstLetter = item.charAt(0);
        let secondLetter = item.charAt(1);
        newCharacterCounter[firstLetter] += masterCounter[item]
        newCharacterCounter[secondLetter] += masterCounter[item]

    })
    return newCharacterCounter
}

/*
    we have to keep track of the outermost letter. Because of how the giveDoubledCharacterCount() function works, the
    characterCounts have do be halfed (almost every character appears in two pairs ( one with the previous and one with
    the next character) and is therefore counted twice)
    however the outermost characters are not counted twice because the only appear in one Pair
    so by always knowing the first and last character when can rectify this small error by just adding them to the respective
    counts inside of giveDoubledCharacterCount();

    you could ignore this fact and just Math.ceil() every halfed count and be fine if not for the edge case where
    both end and start are the same letter and the respective count would therefore be too small by 2;
    so the final count for this respective letter would be too small by 1;

    of course in this riddle the affected letterCount would also have to either be the smallest or largest characterCount to
    make any difference in the solution but we're leaving nothing to change here...
*/

let template = input[0];
let outerMostPairs = [template.slice(0,2), template.slice(template.length-2, template.length)];

function updateOuterMostPairs() {
    let newStart = lut[outerMostPairs[0]][0]; // get the first pair in the corresponding lut-entry
    let newEnd = lut[outerMostPairs[1]][1]; // get the second pair in the corresponding lut-entry
    outerMostPairs = [newStart, newEnd]
} 


// exec

for (let i=0; i<40; i++) { // change amount of rounds/steps here 
    performRound();
    updateOuterMostPairs();
}

let doubledCharacterCount =  giveDoubledCharacterCount();


let charactersToRectify = [outerMostPairs[0].charAt(0), outerMostPairs[1].charAt(1)]
doubledCharacterCount[charactersToRectify[0]]++
doubledCharacterCount[charactersToRectify[1]]++

// creating characterCountsArr from doubleCharacterCount (Obj) 


let characterCountsArr = [];
charArr.forEach( item => {
    characterCountsArr.push(doubledCharacterCount[item]/2)
})

characterCountsArr.sort( (a,b) => a-b) 

console.log(characterCountsArr)

console.log(`solutions isssssss: ${characterCountsArr[characterCountsArr.length-1] - characterCountsArr[0]}`);






