// @ts-check

const chunks = [];
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
  const data = chunks.join('').trim();
  console.log(solveProblem(data));
});

/**
 * @param {string} data
 */
function solveProblem(data) {
  const [recipe, NUM_RULES, ...rawRules] = data.split('\n');
  if (+NUM_RULES != rawRules.length) {
    throw new Error('WRONG NUMBER OF RULES!');
  }

  /** @type { {[key: string]: string[]} } */
  const rules = {};
  rawRules.forEach(rr => {
    const [lhs, rhs] = rr.split(',');
    if (!rules[lhs]) {
      rules[lhs] = [];
    }

    rules[lhs].push(rhs);
  });

  return canBrew(recipe, rules, 'X');
}

/** @type {Map<string, boolean>} */
const cache = new Map();

/**
 *
 * @param {string} inn
 * @param {boolean} out
 */
function memoize(inn, out) {
  cache.set(inn, out);
  return out;
}

/**
 *
 * @param { string } recipe
 * @param { {[key: string]: string[]} } rules
 * @param { string } start
 *
 * @returns { boolean }
 */
function canBrew(recipe, rules, start) {
  if (cache.has(start)) {
    return cache.get(start);
  }

  if (start.length > recipe.length) {
    return false;
  }

  for (let i = 0; i < start.length; i++) {
    if (start[i] <= 'Z' /* if cur is a capital letter */) {
      if (!rules[start[i]]) {
        // Can't decay this character
        return memoize(start, false);
      }

      return memoize(start, !!rules[start[i]].find(r => {
        const next = [...start ];
        next.splice(i, 1, ...r);
        return canBrew(recipe, rules, next.join(''));
      }));
    }
  }

  return memoize(start, (start == recipe));
}