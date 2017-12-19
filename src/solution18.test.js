const solution18 = require('./solution18');
const fs = require('fs');

let testInput = fs.readFileSync('input/18.test', {encoding: 'utf-8'});

describe('answer1', () => {

  test('with test input it should return 4 after the first completed rcv instruction', () => {
    expect(solution18.answer1(testInput)).toBe(4);
  })

});