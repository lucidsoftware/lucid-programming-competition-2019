function getWinner(state, l) {
    let winner = -1;

    state.forEach((val, i) => {
        if (val >= l) {
            winner = i;
        }
    });

    return winner;
}

function getOdds(n, l, state) {
    const odds = state.map(_ => 0);
    const queue = [state.slice()];

    while (queue.length > 0) {
        const curr = queue.shift();

        const winner = getWinner(curr, l);
        const totalRolls = curr.reduce((acc, next) => acc + next);
        const prevRolls = state.reduce((acc, next) => acc + next);
        if (winner >= 0) {
            const chances = Math.pow((1 / n), totalRolls - prevRolls);
            odds[winner] = odds[winner] + chances;
        } else {

            for (let i = 0; i < n; i++) {
                const next = curr.slice();
                next[i] = next[i] + 1;
                queue.push(next);
            }
        }
    }

    return odds;
}

function calculateProbability(n, l, rolls) {
    const state = [];
    for (let i = 0; i < n; i++) {
        state.push(0);
    }

    console.log(getOdds(n, l, state)[0].toFixed(4));
    rolls.forEach((val, i) => {
        state[val] = state[val] + 1;
        console.log(getOdds(n, l, state)[0].toFixed(4));
    });
}

const chunks = [];
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
    const inputs = chunks.join('').trim().split(/\s+/g);

    const n = +inputs[0];
    const l = +inputs[1];
    const rolls = inputs.slice(2);

    calculateProbability(n, l, rolls);
});
// const n = 2;
// const l = 2;
// const rolls = [0, 1, 0];

// calculateProbability(n, l, rolls);