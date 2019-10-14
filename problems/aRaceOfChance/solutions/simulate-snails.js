function getWinner(length, state) {
    let winner = -1;
    state.forEach((val, i) => {
        if (val == length) {
            winner = i;
        }
    });

    return winner;
}

function rollDice(num_vals) {
    return Math.floor(Math.random() * num_vals);
}

function playGameOnce(length, state) {
    const newState = state.slice();
    let winner = -1;
    while((winner = getWinner(length, newState)) == -1) {
        const roll = rollDice(newState.length);
        newState[roll] = newState[roll] + 1;
    }
    return winner;
}

function playGameMultipleTimes(length, state, times) {
    const winnerCount = state.map(_ => 0);

    for (let i = 0; i < times; i++) {
        const newState = state.slice();
        const winner = playGameOnce(length, newState);
        winnerCount[winner] = winnerCount[winner] + 1;
    }

    return winnerCount.map(val => val / times);
}

const tries = 10000000;

function simulateProbabilities(n, l, rolls) {

    const state = [];
    for (let i = 0; i < n; i++) {
        state.push(0);
    }

    console.log(playGameMultipleTimes(l, state, tries)[0].toFixed(4));
    rolls.forEach(val => {
        state[val] = state[val] + 1;
        console.log(playGameMultipleTimes(l, state, tries)[0].toFixed(4));
    });
}

const chunks = [];
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
    const inputs = chunks.join('').trim().split(/\s+/g);

    const n = +inputs[0];
    const l = +inputs[1];
    const rolls = inputs.slice(2);

    simulateProbabilities(n, l, rolls);
});