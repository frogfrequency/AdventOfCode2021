import { puzzleInput } from "./data/puzzle-input.js"

let testInput: number[] = [ // 7 increases
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

function giveIncreases(arr: number[]) {
    let counter: number = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] < arr[i]) {
            counter++
        }
    }
    console.log(counter)
}


giveIncreases(input)
