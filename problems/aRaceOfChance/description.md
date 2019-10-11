# A Race of Chance
At a family Halloween party, you notice your niece playing a simple game of chance with 2 of her friends. The 3 of them stand in a line 2 steps away from their make-shift finish line. Each child is assigned a number from 0-2. An adult rolls a 3-sided dice multiple times. After each roll of the dice, the child with the number that was rolled gets to take a step forward. The first child to cross the finish line wins.

You see right away that this game takes no skill. However, you decide that it would be fun to figure out how likely your niece is to win after each roll of the dice.

## Input/Output

### Input

`N` => the number of kids playing the game

`L` => the length of the race

list of rolls => the rolls of the dice

**Format:**
```
N L
<space separated list of rolls>
```

### Output
The probability of your niece winning at each stage of the game. She will always be the child at position `0`.

**Format:**
```
<probability before first roll>
<probability after first roll>
<probability after second roll>
...
<probability after last roll>
```
For each probability:
* represent it as a floating point number in the range [0, 1]
* round it to 4 decimals
* fill it to 4 decimals even if rounding is not necessary
* include a leading 0 ahead of the `.` if it is less than `1.0000` (e.g., `0.2500`)

**Note:** Do not round your intermediate results. Only round when printing your results.

## Constraints
* `N` will be a positive integer in the range [1, 6].
* `L` will be a positive integer in the range [1, 10].
* Each roll will be a positive integer in the range [0, N)

## Examples
#### Input 0
```
3 2
1 0 2 1
```
#### Output 0
```
0.3333
0.1852
0.4444
0.3333
0.0000
```
#### Input 1
```
1 1
0
```
#### Output 1
```
1.0000
1.0000
```

