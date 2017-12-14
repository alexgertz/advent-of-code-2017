const fs = require('fs');

let puzzleInput = fs.readFileSync('input12.txt', {encoding: 'utf-8'});
puzzleInput = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
let rows = puzzleInput.split('\n');
let connections = [0];
let groups = [];

// Get solo connections
rows.forEach((row, index) => {
    let c = row.split('<->');
    if (parseInt(c[0]) == parseInt(c[1])) {
        groups.push([parseInt(c[0])]);
        rows.splice(index, 1);
    }
})

function findConnections  (rows, connections) {
    let foundAll = false;

    while (!foundAll) {
        let newConnections = [];

        rows.forEach(row => {
            let c = row.split('<->');
            if (connections.indexOf(parseInt(c[0])) > -1) {
                newConnections.push(...c[1].split(',').map(n => parseInt(n)));
            }
        });


        let totalConnections = [...connections, ...newConnections];

        console.log([...new Set(connections)]);
        console.log([...new Set(totalConnections)]);

        if ([...new Set(connections)].length == [...new Set(totalConnections)].length) {
            foundAll = true;
            if (newConnections.length) {
                console.log("This happens");
                groups.push([...new Set(totalConnections)]);
                console.log([...new Set(totalConnections)]);
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

rows = remainingConnections(rows, foundConnections);

while (rows.length) {
    let nextGroup = [parseInt(rows[0].split('<->')[0])];
    //console.log(rows, nextGroup);
    foundConnections = findConnections(rows, nextGroup);
    rows = remainingConnections(rows, foundConnections);
}

//console.log(groups);


console.log("Part two: " + groups.length);