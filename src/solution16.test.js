const solution16 = require('./solution16');
const fs = require('fs');

let testPrograms = fs.readFileSync('input/16.test.programs', {encoding: 'utf-8'});
let testMoves = fs.readFileSync('input/16.test.moves', {encoding: 'utf-8'});

describe('answer1', () => {

  test('with test data it should return baedc after moves', () => {
    expect(solution16.answer1(testMoves, testPrograms)).toBe('baedc');
  })

});

describe('answer2', () => {
  
  test('with test data it should return ceadb after 2 dances', () => {
    expect(solution16.answer2(testMoves, testPrograms, 2)).toBe('ceadb');
  })

});