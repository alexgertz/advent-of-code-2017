let solution18 = {

    lastPlayed: 0,
    sends: [[], []],
    recieves: [[], []],
    operatorMap: {
        set: '=',
        add: '+=',
        mul: '*=',
        mod: '%='
    },

    runSet: function (instructions, register) {
        let recovered = false,
            index = 0;

        while (!recovered) {
            let [operator, first, second] = instructions[index].split(/\s/);

            second = register[second] || parseInt(second);
            register[first] = register[first] || 0;

            index += 1;

            if (this.operatorMap[operator]) {
                eval('register[first]' + this.operatorMap[operator] + second);
            }
        

            if (operator == 'snd') {
                this.lastPlayed = register[first];
                if (typeof registry !== 'undefined') {
                    this.sends[registry].push(register[first]);
                }         
            }
            recovered = operator == 'rcv' && register[first];

            if (operator == 'jgz')  {
                if (first > 0 || register[first] > 0) {
                    index += second - 1;
                }
            }
        }

        return register;
    },

    run: function (instruction, register, programId) {
        let recovered = false;
        let indexAdjustment = 0;
        let [operator, first, second] = instruction[0].split(/\s/);

        second = register[second] || parseInt(second);
        register[first] = register[first] || 0;

        // console.log(operator, first, second, programId);

        if (this.operatorMap[operator]) {
            eval('register[first]' + this.operatorMap[operator] + second);
        }
    

        if (operator == 'snd') {
            this.sends[programId].push(register[first]);
        }
        if (operator == 'rcv') {
            let otherProgramId = 1 - programId;
            let recieves = this.recieves[programId].length;

            let hasSend = typeof this.sends[otherProgramId][recieves.length-1] !== 'undefined';

            if (hasSend) {
                register[first] = this.sends[otherProgramId];
                this.recieves[programId].push(this.sends[otherProgramId]);
            } else {
                indexAdjustment = -1;
            }
            
        }

        if (operator == 'jgz')  {
            if (first > 0 || register[first] > 0) {
                indexAdjustment = second;
            }
        }

        return [register, indexAdjustment];
    },

    answer1: function (input) {
        let instructions = input.split('\n');
        this.runSet(instructions, {});
        return this.lastPlayed;
    },

    answer2: function (input) {
        let instructions = input.split('\n');
        let deadlock = false;
        let program0 = {p: 0},
            program1 = {p: 1};

        let index0 = index1 = 0;
        let indexAdjustment0 = indexAdjustment1 = 0;  
        

        while(!deadlock) {
            [program0, indexAdjustment0] = this.run(instructions.slice(index0, index0+1), program0, 0);
            [program1, indexAdjustment1] = this.run(instructions.slice(index1, index1+1), program1, 1);

            index0 += 1 + indexAdjustment0;
            index1 += 1 + indexAdjustment1;

            if (index0 > instructions.length && index1 > instructions.length) {
                deadlock = true;
            }
        }

        console.log(this.sends, this.recieves);

        

        return program0;
    }
}

module.exports = solution18;