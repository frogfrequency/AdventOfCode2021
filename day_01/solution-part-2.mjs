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
    let previous = input[0]+input[1]+input[2];

    for (let i = 1; i <= input.length; i++) {
        
        if (input[i] && input[i+1] && input[i+2]) {
            let sum = input[i] + input[i+1] + input[i+2];
            if (sum > previous) {
                increasesCounter++
            }
            previous = sum;
        }
        

    }


    console.log('increases: '+increasesCounter);
}

giveIncreases(input);