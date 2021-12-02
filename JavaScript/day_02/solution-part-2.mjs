import { puzzleInput } from "./puzzle-input.mjs";

const testInput = [
    ['forward', 5],
    ['down', 5],
    ['forward', 8],
    ['up', 3],
    ['down', 8],
    ['forward', 2]
]

const input = puzzleInput;

let horizontalDistance = 0;
let depth = 0;
let aim = 0;


function giveFinalCoords(input) {
    for (let i = 0; i < input.length; i++) {
        let command = input[i][0];
        let amount = input[i][1];

        switch (command) {
            case 'forward':
                horizontalDistance += amount;
                depth = depth + (aim*amount);
                break;
            case 'down': aim += amount;
                break;
            case 'up': aim -= amount;
                break;
        }

    }
    console.log(`hor * depth -> ${horizontalDistance} * ${depth} = ${horizontalDistance * depth}`);
}

giveFinalCoords(input);