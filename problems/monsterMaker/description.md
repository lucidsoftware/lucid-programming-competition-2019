# Candy Bags

## Description
You decide to play the villain this halloween and take over parts of your city with the help of your army of monsters. Despite being the mad scientist that you are, you decide that you would still like to be as efficient as possible in the process.

Each section in your city takes an entire day to conquer with a single monster in your army. It also takes an entire day to build a monster. You realize that you can also train a monster to build other monsters.

In order to take over your city in the shortest amount of time possible, given the number of sections in the city, how many days will it take for you to conquer it if you optimize the production of monsters? Assume you have a single monster in store to begin with and you do not want to build any more by hand.

## Input
The first line will be the number of cities you want to conquer `N`. The next `N` number of lines will be the number of sections `s` in the city.
```
N
<Next N lines will be numbers>
```

## Output
New line separated integers.

## Constraints
* 1 <= `N` <= 2^20
* For any number `s`, 1 <= `s` <= 2^20
* length of list <= 2^31

## Examples

### Input 0
```
1
2
```

### Output 0
```
2

```

### Input 1
```
3
8
4
19
```

### Output 1
```
4
3
6

```