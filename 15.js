let generatorAFactor = 16807;
let generatorBFactor = 48271;
let divider = 2147483647;

let generatorAMultiplier = 4;
let generatorBMultiplier = 8;

let valA = 699;
let valB = 124;

let matches = 0;
let pairsToProduce = 0; // Performance is king

/*


let valA = 65;
let valB = 8921;
*/

let bin = n => ("00000000000" + (n >>> 0).toString(2)).substr(-32);

for (var pairs = 0; pairs < pairsToProduce;pairs++) {
    valA = (valA * generatorAFactor) % divider;
    valB = (valB * generatorBFactor) % divider;

    if (bin(valA).substr(-16) == bin(valB).substr(-16)) {
        matches++;
    }
}

console.log("Part one: " + matches);

/*
--Gen. A--  --Gen. B--
1352636452  1233683848
1992081072   862516352
 530830436  1159784568
1980017072  1616057672
 740335192   412269392

01010000100111111001100000100100
01001001100010001000010110001000

01110110101111001011111010110000
00110011011010001111010010000000

00011111101000111101010001100100
01000101001000001110100001111000

01110110000001001010100110110000
01100000010100110001010101001000

00101100001000001001111001011000
00011000100100101011101101010000
 */

valA = 699;
valB = 124;

pairsToProduce = 5;
matches = 0;
for (var pairs = 0; pairs < pairsToProduce;pairs++) {
    valA = (valA * generatorAFactor) % divider;
    valB = (valB * generatorBFactor) % divider;

    while (valA % generatorAMultiplier) {
        valA = (valA * generatorAFactor) % divider;
    }
    while (valB % generatorBMultiplier) {
        valB = (valB * generatorBFactor) % divider;
    }

    console.log(valA, valB);
    
    // console.log(bin(valA), bin(valB));
    

    if (bin(valA).substr(-16) == bin(valB).substr(-16)) {
        matches++;
    }
}