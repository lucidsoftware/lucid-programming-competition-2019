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
  const [, ...boardr] = data.split('\n');
  const board = boardr.map(r => r.split(''));

  /**
   *
   * @param {string[][]} b
   * @param {number} x
   * @param {number} y
   * @param {string} p
   */
  function is(b, x, y, p) {
    if (y >= 0 && y < b.length && x >= 0 && x < b[y].length) {
      return b[y][x] == p;
    }
    return false;
  }

  /**
   *
   * @param {string[][]} b
   * @param {number} x
   * @param {number} y
   * @param {string} p
   */
  function canPlace(b, x, y, p) {
    if (b[y][x] != '.') {
      return false;
    }
    return (!(is(b, x - 1, y, p) && is(b, x + 1, y, p))) &&
           (!(is(b, x, y - 1, p) && is(b, x, y + 1, p))) &&
           (!(is(b, x, y - 2, p) && is(b, x, y - 1, p))) &&
           (!(is(b, x, y + 2, p) && is(b, x, y + 1, p))) &&
           (!(is(b, x - 1, y, p) && is(b, x - 2, y, p))) &&
           (!(is(b, x + 1, y, p) && is(b, x + 2, y, p))) &&
           (!(is(b, x + 1, y + 1, p) && is(b, x - 1, y - 1, p))) &&
           (!(is(b, x + 1, y - 1, p) && is(b, x - 1, y + 1, p))) &&
           (!(is(b, x + 1, y + 1, p) && is(b, x + 2, y + 2, p))) &&
           (!(is(b, x - 1, y - 1, p) && is(b, x - 2, y - 2, p))) &&
           (!(is(b, x + 1, y - 1, p) && is(b, x + 2, y - 2, p))) &&
           (!(is(b, x - 1, y + 1, p) && is(b, x - 2, y + 2, p)));
  }

  /**
   *
   * @param {string[][]} b
   * */
  function isComplete(b) {
    return board.map(r => r.every(p => p != '.'))
        .reduce((a, c) => a && c, true);
  }

  while (!isComplete(board)) {
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          if (canPlace(board, x, y, 'x') && !canPlace(board, x, y, 'o')) {
            board[y][x] = 'x';
          } else if (canPlace(board, x, y, 'o') && !canPlace(board, x, y, 'x')) {
            board[y][x] = 'o';
          }
        }
      }
  }

  return board.map(r => r.join('')).join('\n');
}
