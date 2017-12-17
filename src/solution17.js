let solution17 = {
    
    insert: function (steps, inserts) {
        let position = 0;
        let numbers = [0];
        let number = 1;

        while (number <= inserts) {
            numbers.splice(position + 1, 0, number);
            position = (position + 1 + steps) % numbers.length;
            number++;
        }

        return numbers;

    },

    getNumberAfterZero: function (steps, inserts) {
        let number = 0, secondNumber;

        for (let i = 1; i <= inserts; i++) {
            number = (number + 1 + steps) % i;
            secondNumber = number ? secondNumber : i; 
        }

        return secondNumber;

    },

    answer1: function (input, inserts) {
        let numbers = this.insert(input, inserts);
        return numbers[numbers.indexOf(inserts)+1];
    },

    answer2: function (input, inserts) {
        let number = this.getNumberAfterZero(input, inserts);
        return number;
    },
}

module.exports = solution17;