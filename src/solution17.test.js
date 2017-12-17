const solution17 = require('./solution17');

let testInput = 3;


describe('insert', () => {
    
      test('with test input it should return  after 9 insertions', () => {
        expect(solution17.insert(testInput, 9)).toEqual([0,9,5,7,2,4,3,8,6,1]);
      })
    
    });

describe('answer1', () => {

  test('with test input it should return 638 after 2017 insertions', () => {
    expect(solution17.answer1(testInput, 2017)).toBe(638);
  })

});

describe('getNumberAfterZero', () => {
    
    test('with test input it should return 10 after 10 insertions', () => {
    expect(solution17.getNumberAfterZero(testInput, 9)).toBe(10);
    })

});