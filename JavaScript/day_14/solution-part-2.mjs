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

const input = testInput; // change input here

// preprocessing

let polymerTemplate = input[0];

const pairs = [];
const insertions = [];
input[1].forEach(element => {
    pairs.push(element[0]);
    insertions.push(element[1]);
})

// solution

function doARound() {
    let toInsert = [];
    for (let i = 1; i < polymerTemplate.length; i++) {      // getting this rounds insertions
        let currentWindow = polymerTemplate.charAt(i - 1) + polymerTemplate.charAt(i);
        let idx = pairs.indexOf(currentWindow);
        toInsert.push(insertions[idx]);
    }
    toInsert.reverse(); // going from behind so idxs dont get messed up
    let polymerTemplateLength = polymerTemplate.length;
    toInsert.forEach((element, idx) => { // inserting all toInsert into polymerTemplate
        // console.log(polymerTemplateLength)
        // console.log(idx)
        let targetIdx = polymerTemplateLength - idx - 1;
        insertInFrontOfIdx(element, targetIdx);
    })
}

function insertInFrontOfIdx(char, idx) { // changes global polymerTemplate variable
    polymerTemplate = polymerTemplate.slice(0, idx) + char + polymerTemplate.slice(idx, polymerTemplate.length)
}

function doRounds(amount) {
    for (let i = 0; i < amount; i++) {
        doARound();
        // console.log(`i ha ez grad d'rundi ${i} fertig gmacht`)
        // console.log('\t nach runde ' + i + ':')
        console.log(polymerTemplate)
        // console.log(polymerTemplate)
    }
}


function giveCountsOfUniqueCharAppearances(characters) {
    let counts = [];
    characters.forEach( function (element) {
        counts.push(polymerTemplate.split(element).length-1); // cheesy way to count occurences of char??
        console.log(`count of ${element}: ${polymerTemplate.split(element).length-1}`)
    })
    counts.sort((a,b) => a-b);
    return counts
}


// exec

    doRounds(10);

    let charSet = new Set(insertions); // creating array with unique chars here (using set)
    let uniqueCharArr = Array.from(charSet);
    // console.log(uniqueCharArr)
    let countsOfUniqueCharAppearances = giveCountsOfUniqueCharAppearances(uniqueCharArr);



    console.log(`the result is: ${countsOfUniqueCharAppearances[countsOfUniqueCharAppearances.length-1] - countsOfUniqueCharAppearances[0]}`)




// console.log(polymerTemplate)

// console.log(`die einzigartigen buchstaben: ${uniqueCharArr}`)