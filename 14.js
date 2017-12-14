let puzzleInput = "ugkiagan";
let grid = [...Array(128).keys()];
grid = grid.map(row => '#'.repeat(128).split(''));


function hashifyKnot (puzzleLengths) {

    // Had no pasta, so I had to copy this part
    var numbers = [...Array(256).keys()],
    lengthsAppend = [17,31,73,47,23],
    position = 0,
    skipSize = 0;
    puzzleLengths = [...puzzleLengths.split('').map(char => char.charCodeAt(0)),...lengthsAppend];

    for (let i = 0; i < 64; i++) {
        puzzleLengths.forEach(n => {
            let items = [];
            let wrap = position + n - numbers.length;
        
            if(wrap > 0) {
                items.push(...numbers.slice(position, position + n + 1));
                items.push(...numbers.slice(0, wrap));
            } else {
                items.push(...numbers.slice(position, position + n));
            }
        
            items.reverse();
        
            let nonWrapItems = items.splice(0, items.length - wrap);
            numbers.splice(position, nonWrapItems.length, ...nonWrapItems);
            numbers.splice(0, items.length, ...items);
        
            position = (position + skipSize + n) % 256;
            skipSize += 1;
        });
    }
    
    let denseHash = [];
    
    for (let rounds = 0; rounds < 16; rounds++) {
        let hash = numbers.slice((rounds*16), (rounds*16) + 16);
        hash = hash.reduce((a, b) => a ^ b);
        denseHash.push(hash);
    }
    
    let knotHash = denseHash.map(n => {
        if (n.toString(16).length == 1) return '0' + n.toString(16);
        return n.toString(16);
    });
    
    return knotHash.join('');
    
}

let knotHashes = grid.map((n, index) => hashifyKnot(puzzleInput+'-'+index));
let binaries = knotHashes.map(s => s.split('').map(n => ('0000' + parseInt(n,16).toString(2)).substr(-4))).join('');

let unos = binaries.match(/1/g);

console.log("Part one:" + unos.length);