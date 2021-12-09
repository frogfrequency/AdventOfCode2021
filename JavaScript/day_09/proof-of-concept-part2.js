// game field

let gameRow = new Array(10).fill('.');
let gameField = [];

for (let i = 0; i < 10; i++) {
    gameField.push(gameRow.slice());
}

gameField[1][1] = 'W';
gameField[1][2] = 'W';
gameField[1][3] = 'W';
gameField[1][4] = 'W';
gameField[1][5] = 'W';
gameField[1][6] = 'W';
gameField[1][7] = 'W';
gameField[1][8] = 'W';
gameField[1][9] = 'W';



// logging Field

function logField() {
    gameField.forEach((item) => {
        console.log(item.toString().split(',').join(''));
    })
    console.log('===========================');
}


let nextCoords = ['5,4']; // FORMAT Y, X
let newNextCoords = []; // fill only with strings so .includes works
let visited = []; // fill only with strings so .includes works

function gameLoop() {
    // setInterval(function () {
    //     logField();
    //     processAllNextCoords();
    //     setNextCoords();
    // }, 400);

    while (1 <= nextCoords.length) {
        processAllNextCoords();
        setNextCoords();
        logField();
    }
}

function setNextCoords() {
    nextCoords = newNextCoords;
    newNextCoords = [];
}

function processAllNextCoords() {
    nextCoords.forEach(function (item) {
        processCoords(item);
    })
}

function processCoords(coordPair) {
    coordPair = toArr(coordPair);
    let x = coordPair[1];
    let y = coordPair[0];
    let targetContent = gameField[y][x];
    visited.push(toString(coordPair));
    if (targetContent != 'W') {
        
        gameField[y][x] = 'o';
        let adjacents = giveAdjacentsCoords(y, x, gameField);
        adjacents.forEach(function (item) {
            if (!newNextCoords.includes(toString(item)) && !visited.includes(toString(item))) { // !newNextCoords.includes(item) && !visited.includes(item)
                newNextCoords.push(toString(item));
            }
        })

    }
    
}


// utility

function giveAdjacentsCoords(y, x, map) {
    let adjacentsCoordsArr = [];
    if (y != 0) { adjacentsCoordsArr.push([y - 1, x]) }; // if statments prevent code to try and access non-existent arrays or idxs like arr[-1]
    if (x != map[0].length - 1) { adjacentsCoordsArr.push([y, x + 1]) };
    if (y != map.length - 1) { adjacentsCoordsArr.push([y + 1, x]) };
    if (x != 0) { adjacentsCoordsArr.push([y, x - 1]) };

    return adjacentsCoordsArr
}

function toString(coordArr) {
    return coordArr[0] + ',' + coordArr[1]
}

function toArr(string) {
    let output = string.split(',');
    output[0] = parseInt(output[0]);
    output[1] = parseInt(output[1]);
    return output
}





gameLoop();
