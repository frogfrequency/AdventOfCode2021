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


function giveFinalCoords(input) {
    for (let i = 0; i < input.length; i++) {
        let direction = input[i][0];
        let distance = input[i][1];

        switch (direction) {
            case 'forward': horizontalDistance+=distance;
                break;
            case 'down' : depth+=distance;
            break;
            case 'up' : depth-=distance;
            break;
        }

    }
    console.log(`hor * depth -> ${horizontalDistance} * ${depth} = ${horizontalDistance*depth}`);
}

giveFinalCoords(input);