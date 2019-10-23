# A Race of Chance
At a family Halloween party, you notice your niece playing a simple game of chance with 2 of her friends. The 3 of them stand in a line 2 steps away from their make-shift finish line. Each child is assigned a number from 0-2. An adult rolls a 3-sided dice multiple times. After each roll of the dice, the child with the number that was rolled gets to take a step forward. The first child to cross the finish line wins.

You see right away that this game takes no skill. However, you decide that it would be fun to figure out how likely your niece is to win after each roll of the dice, accounting for differing numbers of kids and various race lengths.

## Input/Output

### Input

`N` => the number of kids playing the game

`L` => the length of the race

list of rolls (`R1`...`RX`) => the rolls of the dice until someone crosses the finish line

**Format:**
```
N L
R1 R2 ... RX
```

**Constraints**
* number of kids playing the game: 1 <= `N` <= 10
* length of the race: 1 <= `L` <= 10
* each roll of the dice: 0 <= `Rx` < `N`
* number of rolls until someone wins: 1 <= `X` <= (`N` * (`L` - 1)) + 1

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
* do not round any intermediate calculations or the values you print; HackRank will do a smart number comparison to make sure your answers are accurate within 4 decimal places


## Examples

<table>
    <tr>
        <th>Input 0</th>
        <th>Input 1</th>
    </tr>
    <tr>
        <td>
            <pre>3 2<br>1 0 2 1</pre>
        </td>
        <td>
            <pre>2 2<br>0 1 0</pre>
        </td>
    </tr>
    <tr>
        <th>Output 0</th>
        <th>Output 1</th>
    </tr>
    <tr>
        <td>
            <pre>0.333333<br>0.185185<br>0.444444<br>0.333333<br>0</pre>
        </td>
        <td>
            <pre>0.5<br>0.75<br>0.5<br>1</pre>
        </td>
    </tr>
</table>