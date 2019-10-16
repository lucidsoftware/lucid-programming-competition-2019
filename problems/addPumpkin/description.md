# Add Pumpkin

When two pumpkin meet, they combined to a pumpkin, when a pumpkin meet a witch, witch eat the pumpkin. But when two witch meet each other, one witch make the other witch to become a pumpkin.\
Lets say pumpkin as P, Witch as W.\
\
P + P = P\
W + P = W\
P + W = W\
W + W = WP\
\
When we have two list of pumpkins and witches, we need to add them together based on the roles, It will be looks like adding two numbers start from the right side.

Create a program that when given two list of pumpkins and witches, returns the result of add them together.

## Input

Two pumpkin and witch strings, separated by space.

## Output

The sum result of giving input.

## Constraints

The input strings are both non-empty and contains only characters P or W.

## Examples

<table>
    <tr>
        <th width="50%">Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>
WW W
            </pre>
        </td>
        <td>
            <pre>
WPWP WPWW
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
