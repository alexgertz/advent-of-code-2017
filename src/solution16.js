let solution16 = {

    dance: function (moves, programs) {
        programs = !Array.isArray(programs) ? programs.split('') : programs;

        moves.split(',').forEach(move => {
            let [,type, first, second] = move.match(/([pxs])(\w+|\d+)(?:\/([\w]+|\d+))?/);

            if(type === 's') {
                programs.unshift(...programs.splice(programs.length - first));
            } else {
                // These ops are pretty much the same
                second = type === 'p' ? programs.indexOf(second) : second;
                first = type === 'p' ? programs.indexOf(first) : first;
                programs.splice(second, 1, programs.splice(first, 1, programs[second])[0]);
            } 
        });

        return programs;
    },

    answer1: function (moves, programs) {
        return this.dance(moves, programs).join('');
    },

    answer2: function (moves, programs, dances) {
        let danced = [];
        programs  = programs.split('');

        while (!danced.includes(programs.join(''))) {
            danced.push(programs.join(''));
            programs = this.dance(moves, programs);
        }

        return danced[dances % danced.length];
    }
}

module.exports = solution16;