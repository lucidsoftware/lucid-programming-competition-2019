# Pumpkins and Witches

When two pumpkins meet, they merge into a single pumpkin. When a pumpkin meets a witch, the witch eats the pumpkin, leaving only the witch. But when two witches meet each other, one witch turns the other witch into a pumpkin, leaving behind a witch and a pumpkin.\
Let's abbreviate pumpkins as P and witches as W. Then we have:\
\
P + P = P\
W + P = W\
P + W = W\
W + W = WP\
\
Your job is to combine two groups of pumpkins and witches. The two groups will be lined up pair-wise and combined starting at the right side of the groups. When two witches combine, the remaining witch shifts one position to the left, and the pumpkin stays at the original position.

Create a program that when given two lists of pumpkins and witches, it returns the result of combining them.

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
