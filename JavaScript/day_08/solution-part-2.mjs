import { puzzleInput } from "./puzzle-input.mjs"

const testInput =
    `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`


const input = puzzleInput; // change input here

        // preprocessing //

function giveProcessedArr(input) {
    let processed = input.split('\n');
    processed.forEach((item, idx, theArr) => {
        theArr[idx] = item.split('|');
        theArr[idx][0] = theArr[idx][0].trim().split(' ');
        theArr[idx][1] = theArr[idx][1].trim().split(' ');
    });
    return processed
}

const allSignals = giveProcessedArr(input);



        // utility //

function sortString(theString) {
    return theString.split('').sort().join().replace(/,/g, '');
}



        // solution //

function solveRiddle(signals) {
    let collector = 0;
    signals.forEach(function (currentSignal) {
        collector += giveSignalOutput(currentSignal);
    });
    return collector
}

function giveSignalOutput(signal) {

    const BCEF = findBCEF(signal[0]);
    const mappedDigitsArr = giveMappedDigitsArr(signal, BCEF);

    return giveDecryptedSignal(signal[1], mappedDigitsArr);
}

function giveDecryptedSignal(signal4Digits, map) {
    let output = '';
    signal4Digits.forEach(function (item) {
        item = sortString(item);
        output += map.indexOf(item).toString();
    });
    return parseInt(output, 10);
}
        
function giveMappedDigitsArr(line, BCEF) {
    let mappingByIdx = new Array(10).fill(undefined);

    line[0].forEach(function (item) {
        const length = item.length;
        item = sortString(item);
        switch (length) {
            case 2:
                mappingByIdx[1] = item;
                break;
            case 3:
                mappingByIdx[7] = item;
                break;
            case 4:
                mappingByIdx[4] = item;
                break;
            case 5:
                if (item.includes(BCEF.b)) {
                    mappingByIdx[5] = item;
                } else if (item.includes(BCEF.e)) {
                    mappingByIdx[2] = item;
                } else if (item.includes(BCEF.f)) {
                    mappingByIdx[3] = item;
                }
                break;
            case 6:
                if (!item.includes(BCEF.c)) {
                    mappingByIdx[6] = item;
                } else if (!item.includes(BCEF.e)) {
                    mappingByIdx[9] = item;
                } else {
                    mappingByIdx[0] = item;
                }
                break;
            case 7:
                mappingByIdx[8] = item;
                break;
        }
    });
    return mappingByIdx
}

function findBCEF(strings) {
    let BCEF = {
        'b': undefined,
        'c': undefined,
        'e': undefined,
        'f': undefined
    }
    const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const joinedString = strings.join();

    for (let i = 0; i < 7; i++) {
        const characterQuantity = joinedString.split(characters[i]).length - 1;
        switch (characterQuantity) {
            case 4:
                BCEF.e = characters[i];
                break;
            case 6:
                BCEF.b = characters[i];
                break;
            case 9:
                BCEF.f = characters[i];
                break;
        }
    }

    BCEF.c = findC(strings, BCEF.f);
    return BCEF;
}

function findC(strings, charF) {
    strings.sort((a, b) => a.length - b.length);
    return strings[0].replace(charF, '');
}


        // execution //

console.log(solveRiddle(allSignals));

