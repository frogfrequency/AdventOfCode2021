import { puzzleInput } from "./puzzle-input.mjs"

let testInput = [ // 7 increases
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
]

let input = puzzleInput;

function giveIncreases(input) {
    let increasesCounter = 0;
    let previous = input[0];
    for (let i = 1; i <= input.length; i++) {
        if (input[i] > previous) {
            increasesCounter++
        }
        previous = input[i];
    }
    console.log(increasesCounter);
}

giveIncreases(input);