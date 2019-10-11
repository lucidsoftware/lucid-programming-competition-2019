const oddsCache = new Map();

function id(num, arr) {
    // console.log(num, arr);
    return num + `[${arr.join(',')}]`;
}

function getOdds(length, state) {
    const oddsId = id(length, state);
    if (oddsCache.has(oddsId)) {
        return oddsCache.get(oddsId);
    }
    // console.log(`getOdds called with (${length}, [${state}])`);
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
                // console.log(`next = [${next}]`);
                // console.log(`j = ${j}`);
                // console.log(`state.length = ${state.length}`);
                return val + (next[j] / state.length);
            });
        }, seed);
    }
    // console.log(`returning from getOdds [${odds}]`);
    oddsCache.set(oddsId, odds);
    return odds;
}


function format(a) {
    return a.map(val => val.toFixed(4));
}

function calculateProbabilities(n, l, rolls) {
    const state = [];
    for (let i = 0; i < n; i++) {
        state.push(0);
    }

    // console.log(`state: [${state}]    odds: [${format(getOdds(l, state))}]`);
    console.log(getOdds(l, state)[0].toFixed(4));
    rolls.forEach((val, i) => {
        state[val] = state[val] + 1;
        // console.log(`state: [${state}]    odds: [${format(getOdds(l, state))}]`);
        console.log(getOdds(l, state)[0].toFixed(4));
    });
}

const chunks = [];
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
    const inputs = chunks.join('').trim().split(/\s+/g);
    // console.log(inputs);

    const n = +inputs[0];
    const l = +inputs[1];
    const rolls = inputs.slice(2);
    // console.log(`n: ${n}`);
    // console.log(`steps: ${l}`);
    // console.log(`rolls: [${rolls}]`);

    calculateProbabilities(n, l, rolls);
});
