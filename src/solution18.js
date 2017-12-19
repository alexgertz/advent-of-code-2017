let solution18 = {

    runInstructions: function (instructions) {
        let register = {},
            lastPlayed = 0,
            recovered = false,
            index = 0;

        while (!recovered) {
            let instruction = instructions[index];
            let [operator, first, second] = instruction.split(/\s/);

            second = typeof register[second] !== 'undefined' 
                ?  register[second] : parseInt(second);

            if (isNaN(first) && typeof register[first] == 'undefined') register[first] = 0;
            
            if (operator == 'set') register[first] = second;
            if (operator == 'add') register[first] += second;
            if (operator == 'mul') register[first] *= second;
            if (operator == 'mod') {
                if (second == 0) register[first] = 0;
                else register[first] %= second
            }

            if (operator == 'snd') lastPlayed = register[first];
            if (operator == 'rcv' && register[first]) return lastPlayed;
            if (operator == 'jgz')  {
                if (first > 0 || register[first] > 0)  {
                    index += second;
                } else {
                    index++;
                }
            } else index++;
        }

    },

    answer1: function (input) {
        let instructions = input.split('\n');
        let recovered = this.runInstructions(instructions);
        return recovered;
    }
}

module.exports = solution18;