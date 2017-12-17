const solution16 = require('./src/solution16');
const solution17 = require('./src/solution17');
const fs = require('fs');

let sol16Programs = fs.readFileSync('input/16.programs', {encoding: 'utf-8'});
let sol16Moves = fs.readFileSync('input/16.moves', {encoding: 'utf-8'});

console.log("Day 16 part one: " + solution16.answer1(sol16Moves, sol16Programs));
console.log("Day 16 part two: " + solution16.answer2(sol16Moves, sol16Programs, 1000000000));

let sol17Input = 337;

console.log("Day 17 part one: " + solution17.answer1(sol17Input, 2017));
console.log("Day 17 part two: " + solution17.answer2(sol17Input, 50000000));