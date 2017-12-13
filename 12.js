const fs = require('fs');

let puzzleInput = fs.readFileSync('input12.txt', {encoding: 'utf-8'});
let rows = puzzleInput.split('\n');
let connections = [0];
let resolved = false;

while (!resolved) {
    let newConnections = [];

    rows.forEach(row => {
        let c = row.split('<->');
        if (connections.indexOf(parseInt(c[0])) > -1) {
            newConnections.push(...c[1].split(',').map(n => parseInt(n)));
        }
    });

    if ([...new Set(connections)].length == [...new Set(newConnections)].length) {
        resolved = true;
    }
    connections = [...new Set(connections), ...new Set(newConnections)];
}

console.log("Part one: " + [...new Set(connections)].length);