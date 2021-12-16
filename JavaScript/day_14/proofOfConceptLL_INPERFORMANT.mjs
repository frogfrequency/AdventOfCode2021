import { puzzleInput } from "./puzzle-input-alternative.mjs"
const testInput = [
    ['N', 'N', 'C', 'B'],
    {
        'CH': 'B',
        'HH': 'N',
        'CB': 'H',
        'NH': 'C',
        'HB': 'C',
        'HC': 'B',
        'HN': 'C',
        'NN': 'C',
        'BH': 'H',
        'NC': 'B',
        'NB': 'B',
        'BN': 'B',
        'BB': 'N',
        'BC': 'B',
        'CC': 'N',
        'CN': 'C'
    }
]

let input = puzzleInput; // change input here
const initPolymerTemplate = input[0];
const insertionRules = input[1];


class Node {
    constructor(char) {
        this.char = char;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // insert at end
    insert(char) {
        let newNode = new Node(char);
        let current;

        if (this.head == null) { // if no head the newNode is the new head
            this.head = newNode;
        } else {    // loop through last element and set it's next to newNode
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }


    // performARound

    performARound() {
        let current = this.head;
        let next;
        while (current.next) {
            next = current.next; // saving the next
            let newNode = new Node(insertionRules[current.char + current.next.char]); // creating new node with respective value from insertionrulesObj
            newNode.next = current.next;
            current.next = newNode;
            current = next;
        }
    }

    // giveList

    giveList() {
        let output = ''
        let current = this.head;

        while (current) {
            output = output + current.char;
            current = current.next;
        }
        return output;
    }

}

const list = new LinkedList();

initPolymerTemplate.forEach( item => {
    list.insert(item);
})

function doFor(amount) {
    for (let i = 0; i < amount; i++) {
        list.performARound();
        console.log(`i ha ez grad d'rundi ${i} fertig gmacht`)
    }
}

// exec


doFor(40);

let finishedPolymerTemplate = list.giveList();



