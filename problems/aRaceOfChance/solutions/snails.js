const oddsCache = new Map();

function id(arr) {
    const others = arr.slice(1);
    others.sort();
    return `[${[arr[0], ...others].join(',')}]`;
}

function getOdds(length, state) {
    const oddsId = id(state);
    if (oddsCache.has(oddsId)) {
        return oddsCache.get(oddsId);
    }
    let odds = [];
    let gameEnd = false;
    for (let i of state) {
        if (i >= length) {
            odds.push(1);
            gameEnd = true;
        } else {
            odds.push(0);
        }
    }

    if (!gameEnd) {
        const seed = state.map(_ => 0);
        odds = odds.map((_, i) => {
            return getOdds(length, state.map((snailPos, j) => j == i ? snailPos + 1 : snailPos))
        }).reduce((acc, next) => {
            return acc.map((val, j) => {
                return val + (next[j] / state.length);
            });
        }, seed);
    }
    oddsCache.set(oddsId, odds);
    return odds;
}

function calculateProbability(n, l, rolls) {
    const state = [];
    for (let i = 0; i < n; i++) {
        state.push(0);
    }

    console.log(getOdds(l, state)[0].toFixed(7));
    rolls.forEach((val, i) => {
        state[val] = state[val] + 1;
        console.log(getOdds(l, state)[0].toFixed(7));
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
