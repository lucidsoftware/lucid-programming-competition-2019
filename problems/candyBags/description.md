# Candy Bags

## Description
The little old lady down the street has the best candy every year, but she's a little weird. She bags these delicious treats in sets of her favorite numbers, but is very insistent on only letting trick-or-treaters take exactly a certain amount in total -- no more, no less! She has a seemingly infinite count of each size of bag, but you have personal hangups about not appearing greedy, so take the fewest number of bags to reach the target count.

## Input
The first line will be a list of the old lady's favorite (integer) numbers. The second line will be `N`, the target number of candies.
```
<space separated list of the favorite numbers>
N
```

## Output
A single integer representing the minimum number of bags needed. -1 if it's impossible.

## Constraints
* 1 <= `N` <= 2^20
* For any favorite number `x`, 1 <= `x` <= 2^20
* length of list <= 2^31

## Examples

### Input 0
```
1 5 10 25
24
```

### Output 0
```
6
```

### Input 1
```
1 2
8
```

### Output 1
```
4
```