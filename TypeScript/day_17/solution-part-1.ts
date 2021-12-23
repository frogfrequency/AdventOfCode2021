

// INPUT

type Ranges = {
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,

}

const puzzleInput: Ranges = {
    xMin: 60,
    xMax: 94,
    yMin: -171,
    yMax: -136
}

const testInput: Ranges = {
    xMin: 20,
    xMax: 30,
    yMin: -10,
    yMax: -5
}

const targetArea = testInput;


// GLOBAL VARIABLES

let distinctInitialVelocities: string[] = [];


// UTIL

function toString(x: number, y: number): string {
    return x + ',' + y
}

// SOLUTION


// find range of xTrajectories for x ---> it must be xTraj < xMax && xMin =<"xTraj(Traj+1) / 2" <--- called triangular nr

// find range for yTrajectories   yMin < yTraj && yTraj < Math.abs(yMin)

// try and evaluate all possible combinations

let trajectoryRange: Ranges = {
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0
}

// set the ranges in which the possible shots can be
trajectoryRange.xMax = targetArea.xMax;
trajectoryRange.xMin = giveTriangularNumber(targetArea.xMin);
trajectoryRange.yMin = targetArea.yMin;
trajectoryRange.yMax = Math.abs(targetArea.yMin);


function giveTriangularNumber(input: number): number {
    let stepSize = 0;
    for (let i = input; 0 < i; i -= stepSize) {
        stepSize++;
    }
    return stepSize
}


function evaluateShot(xTraj: number, yTraj: number): number {
    let xPos: number = 0;
    let yPos: number = 0;
    let highestPoint: number = 0;

    while (xPos <= targetArea.xMax && targetArea.yMax <= yPos) {
        // console.log(`X: ${xPos} (v=${xTraj})  / Y: ${yPos} (v=${yTraj})`)
        xPos += xTraj;
        yPos += yTraj;

        if (0 < xTraj) {
            xTraj--;
        } else if (xTraj < 0) {
            xTraj++;
        }
        yTraj--;

        if (highestPoint < yPos) { highestPoint = yPos } // update highest yPos if necessary
        if (targetArea.xMin <= xPos && xPos <= targetArea.xMax && targetArea.yMin <= yPos && yPos <= targetArea.yMax) {    // if it is in target area
            // console.log('it is in the area!!!!!!!')
            
            distinctInitialVelocities.push(toString(xTraj,yTraj))
    
            return highestPoint
        }
    }
    // console.log(`X: ${xPos} (v=${xTraj})  / Y: ${yPos} (v=${yTraj})`)

    return 0
}


function giveHighestShot(): number {
    let shotsWithPositiveHeight: number[] = [];
    
    for (let x = trajectoryRange.xMin; x < trajectoryRange.xMax; x++) {
        for (let y = trajectoryRange.yMin; y < trajectoryRange.yMax; y++) {
            let shotHeight: number = evaluateShot(x, y);
            // console.log(shotHeight)
            if (0 < shotHeight) {
                shotsWithPositiveHeight.push(shotHeight);
            }
        }
    }
    shotsWithPositiveHeight.sort((a,b) => b-a)

    return shotsWithPositiveHeight[0];
}

// EXEC

console.log(trajectoryRange);

console.log(`highest possible shot: ${giveHighestShot()}`)


console.log(distinctInitialVelocities.length)

console.log(distinctInitialVelocities)