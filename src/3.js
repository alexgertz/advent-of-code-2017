let puzzleInput = 368078;

/* Square part one
17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
*/


// Calculating the steps diagonally
// Steps in either direction is 8 numbers * n steps
// I ran the code below for all directions and found that down (8, 23) got us closest to the input number
let currentSteps = 1;
let currentNumber = 8;
const stepSize = 8;
const baseStepSize = 7;

// Every step adds (8 * n) +7 to the number
while (currentNumber < puzzleInput) {
    currentNumber = currentNumber + (stepSize * currentSteps) + baseStepSize; 
    currentSteps++;
}

console.log("Steps taken diagonally: " + currentSteps);

// Steps remaining to get to the number
let numberDifference = currentNumber - puzzleInput;
let totalSteps = currentSteps + numberDifference;

console.log("Difference in numbers: " + numberDifference);
console.log("The answer for part one is: " + totalSteps);
