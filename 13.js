const fs = require('fs');

let puzzleInput = fs.readFileSync('input13.txt', {encoding: 'utf-8'});
let rows = puzzleInput.split('\n');
let firewallLayers = [];

rows.forEach(row => {
    firewallLayers.push({
        layer: parseInt(row.split(':')[0]),
        depth: parseInt(row.split(':')[1])
    });
});

// For part two:
// Run the code below for different start picoseconds?

function move (offset, hardmode) {
    let severity = [0];
    let position = 0;

    while (position <= 97) {
        let layer = firewallLayers.filter(layer => layer.layer == position)[0];
        if (typeof layer == 'undefined') {
            position++;
            continue;
        }

        if ((position+offset) % ((2*layer.depth) - 2) == 0) {
            if (hardmode) return 1;
            severity.push(layer.layer * layer.depth)
        }

        position++;
    }
    return severity.reduce((a,b) => a + b);
}

console.log("Part one: " + move(0));


let offset = 0;
let severity = true;

while (severity) {
    let moveSeverity = move(offset, true);
    if (moveSeverity == 0) {
        severity = false;
    } else {
        offset++;
    }
}

console.log("Part two: " + offset);