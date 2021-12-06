import { puzzleInput } from "./puzzle-input.mjs"

const testInput =
    [
        [[0, 9], [5, 9]],
        [[8, 0], [0, 8]],
        [[9, 4], [3, 4]],
        [[2, 2], [2, 1]],
        [[7, 0], [7, 4]],
        [[6, 4], [2, 0]],
        [[0, 9], [2, 9]],
        [[3, 4], [1, 4]],
        [[0, 0], [8, 8]],
        [[5, 5], [8, 2]]
    ]

let input = puzzleInput;


function createGrid(sideLength) {
    let grid = [];
    for (let i = 0; i < sideLength; i++) {
        let line = [];
        for (let j = 0; j < sideLength; j++) {
            line.push(0);
        }
        grid.push(line);
    }
    return grid
}


function drawLines(input) {
    for (let i = 0; i < input.length; i++) {
        let currentCoords = input[i];

        if (currentCoords[0][0] === currentCoords[1][0] || currentCoords[0][1] === currentCoords[1][1]) {
            let xCoords = [currentCoords[0][0], currentCoords[1][0]];
            let yCoords = [currentCoords[0][1], currentCoords[1][1]];
            yCoords.sort((a, b) => a - b)
            xCoords.sort((a, b) => a - b)
            drawHorizontalLine([xCoords, yCoords]);
        } else {
            drawDiagonalLine(currentCoords);
        }
    }
}


function drawHorizontalLine(line) {
    for (let i = line[0][0]; i <= line[0][1]; i++) {
        for (let j = line[1][0]; j <= line[1][1]; j++) {
            grid[i][j]++;
        }
    }
}


function drawDiagonalLine(coords) { 
    let yDirection;
    coords.sort((a, b) => a[0] - b[0]);
    if (coords[1][1] - coords[0][1] < 0) {
        yDirection = -1;
    } else {
        yDirection = 1;
    }

    let y = coords[0][1];
    for (let x = coords[0][0]; x <= coords[1][0]; x++) {
        grid[x][y]++;
        y += yDirection;
    }
}


function giveDangerCount() {
    let dangerCounter = 0;
    for (let i = 0; i < grid.length; i++) {
        grid[i] = grid[i].filter(value => 2 <= value);
        dangerCounter += grid[i].length;
    }
    console.log(dangerCounter)
}


// execution

let grid = createGrid(1000);

drawLines(input);

giveDangerCount();


