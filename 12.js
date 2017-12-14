const fs = require('fs');

let puzzleInput = fs.readFileSync('input12.txt', {encoding: 'utf-8'});
let rows = puzzleInput.split('\n');
rows = rows.map(row => {
    return [parseInt(row.split('<->')[0]), [...row.split('<->')[1].split(',')]];
});
let groups = [];

function findConnections  (connections) {
    let foundAll = false;
    let newConnections = [];

    while (!foundAll) {
        rows.forEach(row => {
            if (connections.indexOf(row[0]) > -1) {
                row[1].forEach(n => {
                    newConnections.push(parseInt(n));
                });
            }
        });

        let totalConnections = [...new Set([...connections, ...newConnections])];
        if ([...new Set(connections)].length == totalConnections.length) {
            foundAll = true;
            groups.push(totalConnections);
        }
        connections = totalConnections;
    }
    groups[groups.length - 1].forEach(n => {
        rows.forEach((rn, index) => {
            if (rn[0] == n) {
                rows.splice(index, 1);
            }
        })
    });

    return groups;
}

console.log("Part one: " + findConnections([0])[0].length);

let amIDone = false;
while (!amIDone) {
    findConnections([rows[rows.length - 1][0]]);
    if (!rows.length) amIDone = true;
}

console.log("Part two: " + groups.length);