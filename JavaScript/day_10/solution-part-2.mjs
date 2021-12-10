import { puzzleInput } from "./puzzle-input.mjs"

const testInput = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'
]

let input = puzzleInput; // change input here

const matches = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}


function giveCorrectAndAdjustedLines(allLines) {
    // let syntaxErrorScore = 0;
    allLines.forEach((line, idx, theArr) => {
        let processedLine = giveLineCorrectness(line);
        if (processedLine) {
            theArr[idx] = processedLine;
        } else {
            theArr[idx] = 'invalid' // do not immediately remove incorrect lines because it messes up the forEach somehow..
        }
    });
    return allLines.filter(value => value != 'invalid') // removing incorrect lines only at the end
}


function giveLineCorrectness(line) {
    let collector = [];
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);

        if (char === '(' || char === '[' || char === '{' || char === '<') {
            collector.push(char);
        } else {
            let matchingChar = matches[char];
            if (matchingChar === collector[collector.length - 1]) {
                collector.splice(collector.length - 1, 1);
            } else {
                return false
            }
        }
    }
    return collector
}


////////////////////////////////

const adjustedLines = giveCorrectAndAdjustedLines(input);

// starting part two here with only the correct and adjusted lines (const adjustedLines)
    // adjusted means: closing brackets have alread been considered and the line only consists of the remaining opening brackets
        // in this explenation bracket means : (), [], {} or <>


function giveWinner(lines) {
    let allScores = [];
    lines.forEach(line => allScores.push(giveCompletionScore(line)));
    allScores.sort((a, b) => a - b);
    let winningIdx = Math.floor(allScores.length / 2);
    console.log('the winner is: ' + allScores[winningIdx]);
}

function giveCompletionScore(line) {
    let scoreEquivalents = ['x', '(', '[', '{', '<'] // index is the score -->  '(' = 1, '[' = 2 etc.
    let completionScore = 0;
    for (let i = line.length - 1; 0 <= i; i--) { // start from the end of array because those have to be closed first
        completionScore *= 5;
        completionScore += scoreEquivalents.indexOf(line[i]);
    }
    return completionScore
}


giveWinner(adjustedLines);
