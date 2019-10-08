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
1 ≤ M < 2<sup>5</sup>
<br/>
0 ≤ Q < 2<sup>5</sup>
<br/>
0 ≤ S < 2<sup>32</sup>

## Examples

