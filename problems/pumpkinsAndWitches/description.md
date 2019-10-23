# Pumpkins and Witches

Your job is to combine two groups of pumpkins and witches into a single group. The two groups are not necessarily the same size, so we need to establish consistent rules for combination. The two groups will be lined up in pairs and combined, starting at the right side of the groups and moving to the left. Pairs will be combined as follows:

- When two pumpkins meet, they merge into a single pumpkin
- When a pumpkin meets a witch, the witch eats the pumpkin, leaving only the witch
- When two witches meet each other, one witch turns the other witch into a pumpkin, leaving behind a witch and a pumpkin. The pumpkin remains at the original position, and the witch moves to the position to her immediate left, joining any pumpkins or witches that were at that position.

Let's abbreviate pumpkins as `P` and witches as `W`. Then we have:
```
P + P =  P
W + P =  W
P + W =  W
W + W = WP
```

If a position ever has more than one occupant, follow the above rules as many times as necessary until only one remains at the position.

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
