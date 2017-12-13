const fs = require('fs');

let puzzleInput = fs.readFileSync('input13.txt', {encoding: 'utf-8'});
let rows = puzzleInput.split('\n');
let firewallLayers = [];
let position = 0;
let severity = [];

rows.forEach(row => {
    firewallLayers.push({
        layer: parseInt(row.split(':')[0]),
        depth: parseInt(row.split(':')[1])
    });
});

// (2*n) - 2
while (position <= 97) {
    let layer = firewallLayers.filter(layer => layer.layer == position)[0];
    if (typeof layer == 'undefined') {
        position++;
        continue;
    }

    if (position % ((2*layer.depth) - 2) == 0) {
        severity.push(layer.layer * layer.depth)
    }

    position++;
}

let totalSeverity = severity.reduce((a,b) => a + b);
console.log("Part one:" + totalSeverity);