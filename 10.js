var puzzleLengths = '106,118,236,1,130,0,235,254,59,205,2,87,129,25,255,118',
    numbers = [...Array(256).keys()],
    lengthsAppend = [17,31,73,47,23],
    position = 0,
    skipSize = 0;

// [1,2,3] should give 3efbe78a8d82f29979031a4aa0b16a9d
// puzzleLengths = '1,2,3';
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

// Run with i = 1 to get only the first round
console.log("Part one: " + numbers[0] * numbers[1]);


let denseHash = [];

// This part works
for (let rounds = 0; rounds < 16; rounds++) {
    let hash = numbers.slice((rounds*16), (rounds*16) + 16);
    hash = hash.reduce((a, b) => a ^ b);
    denseHash.push(hash);
}


// This part works
let knotHash = denseHash.map(n => {
    if (n.toString(16).length == 1) return '0' + n.toString(16);
    return n.toString(16);
});


// Hardcoded test for 1,2,3 as input
//let reDenseHash = '3e,fb,e7,8a,8d,82,f2,99,79,03,1a,4a,a0,b1,6a,9d'.split(',').map(n => parseInt(n, 16));
// console.log("Actual: " + denseHash);
//console.log("Expected: " + reDenseHash);


console.log("Part two: " + knotHash.join(''));