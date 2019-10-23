# Streams of Screams
One of your friends, Sabrina, is telling another friend, Casper, spooky ghost stories for Halloween. Casper is easily scared and cannot help but scream every time he hears a scary word related to ghosts. Sabrina wants to figure out which of her stories is the scariest, and you decided to help. Every time Casper hears the word "ghost", he lets out a brief `Ah!`. Every time he hears "boo!", Casper screams `Ahhhh!!!`. As Sabrina tells her story, you will record each of Casper's screams. At the end of Sabrina's story, you give it an official Scare Score. Each `Ah!` is worth 1 point, and each `Ahhhh!!!` is worth 3 points.

## Input
The first line will contain a single integer `n`.

This will be followed by `n` lines of input, with a single word on each line.

## Output
For every occurrence of `ghost`, output `Ah!`. For every occurrence of `boo!`, output `Ahhh!!!`.

After processing all input, output the total Scare Score.

## Constraints

- 1 <= `n` <= 10000


All input will be lowercase.

## Examples

<table>
    <tr>
        <th>Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>8
this
is
a
spooky
story
about
a
ghost
</pre>
        </td>
        <td>
            <pre>7
i
see
ghosts.
boo!
says
one
ghost
</pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>Ah!
1
</pre>
        </td>
        <td>
            <pre>Ahhh!!!
Ah!
4</pre>
        </td>
    </tr>
</table>