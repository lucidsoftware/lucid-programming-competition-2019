# Pumpkins and Witches

Your job is to merge two lines of pumpkins and witches into a single line. The two lines are not necessarily the same length, so we need to establish consistent rules for combination:

- When two pumpkins meet, they merge into a single pumpkin
- When a pumpkin meets a witch, the witch eats the pumpkin, leaving only the witch
- When two witches meet each other, one witch turns the other witch into a pumpkin, leaving behind a witch and a pumpkin. The pumpkin remains at the original position, and the witch moves to the position to her immediate left, joining any pumpkins or witches that were at that position.

If we represent pumpkins with a `P` and witches with a `W`, we can represent these rules mathematically as:
```
P + P =  P
W + P =  W
P + W =  W
W + W = WP
```

*You notice that these are the same rules that define binary addition!*

Create a program that takes in two lists of pumpkins and witches and returns the result of combining them.

## Input

Two pumpkin-and-witch strings, separated by a new line.

## Output

A single pumpkin-and-witch string representing the combination of the two inputs.

## Constraints

The input strings contain only `P` and `W` characters.

Let `N` be the length of an input string. 1 <= `N` <= 1000

## Examples

<table>
    <tr>
        <th width="50%">Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>
WW
W
            </pre>
        </td>
        <td>
            <pre>
WPWP
WPWW
            </pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>WPP</pre>
        </td>
        <td>
            <pre>WPWPW</pre>
        </td>
    </tr>
</table>
