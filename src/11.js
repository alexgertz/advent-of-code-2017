const fs = require('fs');

let puzzleInput = fs.readFileSync('input11.txt', {encoding: 'utf-8'});
let directions = puzzleInput.split(',');
let position = {x: 0, y: 0}; // Origo
let positions = [];
let steps;;

// x, y
let directionMap = {
    nw: {x: -1, y: 1},
    n:  {x: 0, y: 1},
    ne: {x: 1, y: 0},
    sw: {x: -1, y: 0},
    s:  {x: 0, y: -1},
    se: {x: 1, y: -1}
}

directions.forEach(direction => {
    position.x = position.x + directionMap[direction].x;
    position.y = position.y + directionMap[direction].y;
    positions.push({x: position.x, y: position.y});
});

steps = Math.abs(position.x) + Math.abs(position.y);
console.log("Part one: " + steps);

let furthestSteps = Math.max(...positions.map(pos => Math.abs(pos.x) + Math.abs(pos.y)));

console.log("Part two: " + furthestSteps);