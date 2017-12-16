const puzzleInput = '4	10	4	1	8	4	9	14	5	1	14	15	0	15	3	5';
var puzzleArray = puzzleInput.split(/\s/).map(a => parseInt(a)),
    onlyUniqueCombinations = true,
    combinations = [];


const redistribute = arr => {
    let redistributeBankIndex = arr.indexOf(Math.max(...arr));
    let redistributeBlocks = arr[redistributeBankIndex];
    arr[redistributeBankIndex] = 0;

    var index = redistributeBankIndex + 1;
    if (index > arr.length - 1) index = 0;

    while (redistributeBlocks) {
        arr[index]++;
        redistributeBlocks--;

        if (index < arr.length - 1) index++;
        else index = 0;
    }

    return arr;
}

while (onlyUniqueCombinations) {
    puzzleString = redistribute(puzzleArray).join(' ');

    if (combinations.includes(puzzleString)) onlyUniqueCombinations = false;
    else combinations.push(puzzleString);
}

// Something told me I needed this today
let magicNumber = 1;

console.log("Part one: " + combinations.length + magicNumber);


let redistributionCyclesBetween = combinations.length - combinations.indexOf(puzzleString);
console.log("Part two: " + redistributionCyclesBetween);