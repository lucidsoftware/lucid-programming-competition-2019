const size = 5;
const halfOfConstraints = size * (size - 1);

function testConstraints(state, constraints) {
    let correct = 0;
    let incomplete = 0;
    let wrong = 0;

    constraints.forEach((c, i) => {
        let firstVal = '';
        let secondVal = '';

        if (i < halfOfConstraints) { // column constraint
            const col = i % (size - 1);
            const row = Math.floor(i / (size - 1));
            const firstIndex = (row * size) + col;
            firstVal = +state[firstIndex];
            secondVal = +state[firstIndex + 1];

        } else { // row constraint
            const j = i - halfOfConstraints;
            const col = Math.floor(j / (size - 1));
            const row = j % (size - 1);
            const firstIndex = (row * size) + col;
            firstVal = +state[firstIndex];
            secondVal = +state[firstIndex + size];
        }

        if (firstVal === 0 || secondVal === 0) {
            incomplete += 1;
        } else if ((c === "|") || (c === '<' && firstVal < secondVal) || (c === '>' && firstVal > secondVal)) {
            correct += 1;
        } else {
            wrong += 1;
        }
    });

    return {
        correct,
        incomplete,
        wrong
    };
}

function testValues(state) {
    let correct = 0;
    let incomplete = 0;
    let wrong = 0;

    for (let rowI = 0; rowI < size; rowI++) {
        const needs = [];
        for (let i = 0; i <= size; i++) {
            needs[i] = 0;
        }

        for (let i = 0; i < size; i++) {
            const val = state[(rowI * size) + i];
            needs[val] = needs[val] + 1;
        }

        let valid = true;
        needs.forEach((val, i) => {
            if (i > 0 && val > 1) valid = false;
        });

        if (!valid) wrong = 1;
        else if (needs[0] > 0) incomplete += 1;
        else correct += 1;
    }

    for (let colI = 0; colI < size; colI++) {
        const needs = [];
        for (let i = 0; i <= size; i++) {
            needs[i] = 0;
        }

        for (let i = 0; i < size; i++) {
            const val = state[(i * size) + colI];
            needs[val] = needs[val] + 1;
        }

        let valid = true;
        needs.forEach((val, i) => {
            if (i > 0 && val > 1) valid = false;
        });

        if (!valid) wrong = 1;
        else if (needs[0] > 0) incomplete += 1;
        else correct += 1;
    }

    return {
        correct,
        incomplete,
        wrong
    };
}

function findNextOpenCell(state, startingIndex) {
    const subState = state.slice(startingIndex);
    for (let i = 0; i < subState.length; i++) {
        if (subState[i] == 0) {
            return i + startingIndex;
        }
    }
    return -1;
}

function findSolution(startingState, constraints) {
    const frontier = [{
        state: startingState,
        index: findNextOpenCell(startingState, 0)
    }];

    while(frontier.length > 0) {
        const curr = frontier.shift();
        const valueScore = testValues(curr.state);
        const constraintScore = testConstraints(curr.state, constraints);

        if (valueScore.correct == (size * 2) && constraintScore.correct == (halfOfConstraints * 2)) {
            console.log(curr.state.join(''));
        } else if (valueScore.wrong == 0 && constraintScore.wrong == 0) {

            for (let i = 1; i <= size; i++) {
                const nextState = curr.state.slice();
                nextState[curr.index] = i;

                const nextIndex = findNextOpenCell(nextState, curr.index);

                if (curr.index >= 0) {
                    frontier.push({
                        state: nextState,
                        index: nextIndex
                    });
                }
            }
        }
    }
}

const chunks = [];
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
    const inputs = chunks.join('').trim().split('\n');
    findSolution(inputs[0].split('').map(v => +v), inputs[1].split(''));
});
