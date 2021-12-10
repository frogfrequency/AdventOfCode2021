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

function giveSyntaxErrorScore(input) {
    let syntaxErrorScore = 0;
    input.forEach(element => {
        let lineError = giveLineError(element);
        switch (lineError) {
            case '(':
                syntaxErrorScore+= 3
                break;
            case '[':
                syntaxErrorScore+= 57
                break;
            case '{':
                syntaxErrorScore+= 1197
                break;
            case '<':
                syntaxErrorScore+= 25137
                break;
            case 'pass':
                null
                break;
            default:
                console.log('error in giveSyntaxErrorScore / switch')
        }
    });
    return syntaxErrorScore
}


function giveLineError(line) {
    let collector = [];
    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        
        if (char === '(' || char === '[' || char === '{' || char === '<') {
            collector.push(char);
        } else {
            let matchingChar = matches[char];
            
            if (matchingChar === collector[collector.length-1]) {
                collector.splice(collector.length-1, 1);
            } else {
                return matchingChar
            }
            
        }
    }
    return 'pass'
}



console.log(giveSyntaxErrorScore(input));