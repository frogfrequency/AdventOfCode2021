export function givePreprocessedCards(cards) {

    cards = cards.split(`\n\n`) // separating cards

    cards.forEach(function (item, idx, theArr) { // removing double spaces
        theArr[idx] = item.replace(/ +/g, ' ')
    });

    cards.forEach(function (item, idx, theArr) { // separating lines and removing leading spaces in line
        theArr[idx] = item.split('\n');
        theArr[idx].forEach(function (item, idx, theArr) {
            if (item.charAt() === ' ') {
                theArr[idx] = item.slice(1);
            }
        })
    });

    cards.forEach(function (item) { // separating numbers
        item.forEach(function (item, Idx, TheArr) {
            TheArr[Idx] = item.split(' ');
            TheArr[Idx].forEach(function (item, idx, theArr) {
                theArr[idx] = parseInt(item);
            });
        });
    });

    return cards
}
