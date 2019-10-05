# The Perfect Broomstick
At Merlin's School of Mediocre Magic, a favorite pastime of the young students is flying around on broomsticks. The ideal broomstick for flying is neither too long nor too short. In fact, it seems that the perfect broomstick is always the broomstick which, lengthwise, falls in the middle of all the other available broomsticks. The problem is that new broomsticks are always being added to the school's collection, making it hard to keep track of which broomstick is the current perfect broomstick.

To find the perfect broomstick if there are an *odd* number of broomsticks, you simply must line each of the broomsticks up shortest to tallest, then select the broomstick that is located in the exact middle of the line.

If there is an *even* number of broomsticks, you must once again line each of the broomsticks up, ordered by length. Because there are technically now _two_ broomsticks in the middle, things get a little more complicated to find the perfect broomstick. If the two middle broomsticks are the same length, then you may of course choose either of the two and have an equally enjoyable riding experience. If the two middle broomsticks are of differing lengths, then you must choose the longer of the two middle broomsticks for the perfect broomstick flying experience.

Your job is to devise a magical algorithm, which, when given the length of a new broomstick being added to the school's collection, will return the length of the new _perfect_ broomstick.
## Input/Output
Your input consists of a sequence of numbers, one per line, each representing the length of a new broomstick being added to the collection. After a broomstick has been added to the collection, you must output the length of the current _perfect_ broomstick as defined above.

**Input**
```
<broomstick_length>
<broomstick_length>
...
<broomstick_length>
```
**Output**
```
<perfect_broomstick_length>
<perfect_broomstick_length>
...
<perfect_broomstick_length>
```
## Constraints
* The length of the broomstick will always be a positive, non-zero integer strictly less than 2^31.
* Broomsticks being added to the collection may be the same length as other broomsticks already present in the school's collection.
* For the purposes of this problem, there is no particular unit of measure for the broomstick lengths, but you may assume that all lengths given are in the same unit of measure (no trickery with conversions required).
## Examples
#### Input 0
```
2
4
13
5
9
```
#### Output 0
```
2
4
4
5
5
```
#### Input 1
```
52
64
78
28
```
#### Output 1
```
52
64
64
64
```

