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


const input = puzzleInput;

function giveProcessedArr(input) {
    let processed = input.split('\n');
    processed.forEach((item, idx, theArr) => {
        theArr[idx] = item.split('|');
        theArr[idx][0] = theArr[idx][0].trim().split(' ');
        theArr[idx][1] = theArr[idx][1].trim().split(' ');
    });
    return processed
}

let signals = giveProcessedArr(input); 

let uniqueCounter = 0;

signals.forEach(item =>
    item[1].forEach(function (item) {
        if (item.length <= 4 && 2 <= item.length || item.length == 7) {
            uniqueCounter++
        }
    })
)


console.log(uniqueCounter);