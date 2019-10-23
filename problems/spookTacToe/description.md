# Spook-Tac-Toe
In order to earn your tasty treats your clever neighbor has asked you to solve a puzzle.
On their yard they have laid out a grid.  Each space in the grid either has a pumpkin, a cauldron, a rock, or is empty.  To solve the puzzle you must place a pumpkin or cauldron in every empty spot such that there are never three pumpkins or three cauldrons in a row.

"3 in a row" can be visualized as:
```
...  .x.  x..  ..x
xxx  .x.  .x.  .x.
...  .x.  ..x  x..
```
No guessing is required to solve a valid puzzle.

All given puzzles will have exactly 1 solution.

## Input
The first line is 2 integers `w h`.

This will be followed by `h` lines of `w` characters.

The characters represent:<br />
`'x'`: A pumpkin.<br />
`'o'`: A cauldron.<br />
`'.'`: An empty spot.<br />
`'#'`: A rock.<br />

## Output
Output `h` lines of `w` characters that represents the solved puzzle.

## Constraints
- 3 <= `w` < 1000
- 3 <= `h` < 1000
- `w` * `h` < 30000

## Examples

<table>
    <tr>
        <th>Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>3 3
xxo
.x.
...</pre>
        </td>
        <td>
            <pre>9 9
.........
.o.......
.#.......
#..o.....
x#.......
##......#
...#....x
o#o...#..
.o##..x#.</pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>xxo
oxx
xoo</pre>
        </td>
        <td>
            <pre>oxoxoxoxo
xooxoxoxo
x#xoxoxox
#oxoxoxox
x#oxoxoxo
##oxoxox#
oxx#xoxox
o#ooxo#ox
xo##oxx#o</pre>
        </td>
    </tr>
</table>
