const fs = require('fs');

let puzzleInput = fs.readFileSync('input12.txt', {encoding: 'utf-8'});

let rows = puzzleInput.split('\n');
let connections = [0];
let groups = [];

function findConnections  (rows, connections) {
    let foundAll = false;

    while (!foundAll) {
        let newConnections = [];

        rows.forEach(row => {
            let c = row.split('<->');
            if (connections.indexOf(parseInt(c[0])) > -1) {
                if (parseInt(c[0]) == 757 || parseInt(c[0]) == 338) {
                    console.log(...c[1].split(',').map(n => parseInt(n)));
                }
                newConnections.push(...c[1].split(',').map(n => parseInt(n)));
            }
        });


        let totalConnections = [...connections, ...newConnections];

        if ([...new Set(connections)].length == [...new Set(totalConnections)].length) {
            foundAll = true;
            if (newConnections.length) {
                groups.push([...new Set(totalConnections)]);
            }
            return [...new Set(totalConnections)];
        }
        connections = [...new Set(totalConnections)];
    }
}

let foundConnections = findConnections(rows, [0]);
console.log("Part one: " + foundConnections.length);

function remainingConnections (rows, foundConnections)  {
    rows.filter((row, index) => {
        let c = row.split('<->');
        let matchConnections = [parseInt(c[0]), ...c[1].split(',').map(n => parseInt(n))];
        matchConnections.forEach(connection => {
            if ([].concat(...groups).indexOf(connection) > -1) {
                rows.splice(index, 1);
            }
        })
    });

    return rows;
}

while (rows.length) {
    rows = remainingConnections(rows, foundConnections);
    if (!rows.length) continue;
    let nextGroup = [parseInt(rows[0].split('<->')[0])];
    foundConnections = findConnections(rows, nextGroup);

}


console.log("Part two: " + groups.length);