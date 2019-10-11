# Summoning Circles

Your necromancer friend Natalie wants to summon some zombies and skeletons for her haunted house.
Unfortunately setting up the summoning circle is _very_ complicated,
so she has asked you to write a program she can use to verfy the circle is set up correctly before she begins the _super-duper very dangerous_ summoning ritual.

A summoning circle is formed by placing a subset of **P** rune stones (numbered 0 to **P-1**) in a specific order around the circle,
and the rest of the rune stones are placed in a pile in the center of the circle.
The placement of each rune stone determined by following these instructions:

First, the rune stone numbered 0 is placed in the circle (a circle with one stone is still a circle). This first stone is designated as the _current_ stone.

Then, place the next rune stone into the circle between the rune stones that are **K** and **K+1** rune stones clockwise of the _current_ rune stone.
When the circle is large enough, this means that there are **K** rune stones between the _current_ rune stone and the rune stone that was just placed.
The rune stone that was just placed then becomes the _current_ rune stone, at which point the process repeats with the next unused rune stone.

However, if the rune stone that is about to be placed has a number which is a multiple of **M**, that stone is instead placed in the center of the circle.
In addition, the rune stone **Q** rune stones counter-clockwise from the _current_ rune stone is removed from the circle and also added to the center of the circle.
The rune stone located immediately clockwise of the rune stone that was removed becomes the new _current_ rune stone.

Once all **P** rune stones have been placed, the ritual circle should be ready.
To verify the circle was prepared corrctly, your program should calculate the sum of the numbers on all of the rune stones that were placed into the center of the circle.

## Input

A single line containing 4 positive integers, each separated by a single space.
<pre>P K M Q</pre>

## Output

A single integer, the sum of the numbers on rune stones in the center of the circle.
<pre>S</pre>

## Constraints

1 ≤ P < 2<sup>16</sup>
<br/>
0 ≤ K < 2<sup>5</sup>
<br/>
2 ≤ M < 2<sup>5</sup>
<br/>
0 ≤ Q < 2<sup>5</sup>
<br/>
0 ≤ S < 2<sup>32</sup>

## Examples

For example, here is walkthrough of creating a summoning circle where **P=16**, **K=1**, **M=7**, **Q=3**.
The current sum **S** is shown as we add more rune stones, and the _current_ rune stone is in parentheses.
You'll just have to imagine them in a circle

<pre>[ 1] S= 0 :   0 ( 1)
[ 2] S= 0 :   0 ( 2)  1
[ 3] S= 0 :   0   2   1 ( 3)
[ 4] S= 0 :   0 ( 4)  2   1   3
[ 5] S= 0 :   0   4   2 ( 5)  1   3
[ 6] S= 0 :   0   4   2   5   1 ( 6)  3
[ 7] S= 9 :   0   4 ( 5)  1   6   3
[ 8] S= 9 :   0   4   5   1 ( 8)  6   3
[ 9] S= 9 :   0   4   5   1   8   6 ( 9)  3
[10] S= 9 :   0   4   5   1   8   6   9   3 (10)
[11] S= 9 :   0 (11)  4   5   1   8   6   9   3  10
[12] S= 9 :   0  11   4 (12)  5   1   8   6   9   3  10
[13] S= 9 :   0  11   4  12   5 (13)  1   8   6   9   3  10
[14] S=27 :   0  11 (12)  5  13   1   8   6   9   3  10
[15] S=27 :   0  11  12   5 (15) 13   1   8   6   9   3  10</pre>

And here is another where **P=15**, **K=2**, **M=4**, **Q=2**.
<pre>[ 1] S= 0 :   0 ( 1)
[ 2] S= 0 :   0   1 ( 2)
[ 3] S= 0 :   0   1 ( 3)  2
[ 4] S= 4 : ( 1)  3   2
[ 5] S= 4 :   1   3   2 ( 5)
[ 6] S= 4 :   1   3 ( 6)  2   5
[ 7] S= 4 :   1   3   6   2   5 ( 7)
[ 8] S=14 :   1   3   6 ( 5)  7
[ 9] S=14 :   1 ( 9)  3   6   5   7
[10] S=14 :   1   9   3   6 (10)  5   7
[11] S=14 :   1   9   3   6  10   5   7 (11)
[12] S=31 :   1   9   3   6  10 ( 7) 11
[13] S=31 :   1 (13)  9   3   6  10   7  11
[14] S=31 :   1  13   9   3 (14)  6  10   7  11</pre>