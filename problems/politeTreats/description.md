# Polite Trick-or-Treating
It is Halloween night and you are joining the throngs of witches, warlocks, ghosts, and ghouls to collect your fair share of tantalizing treats. Unlike all the other greedy goblins going door to door, you want to make sure you never take the largest treat from the cauldrons of candy at every house---because that would be downright impolite! Nevertheless, you still want your share of sugar, so as a compromise, at every house you go to, you want to select the treat that is the _second_-heaviest.

You came prepared with a small scale such that at every house you can weigh each available treat and select the one that is the _second_-heaviest.

## Input
You will receive a list containing the name of the treat and its integer weight in grams in the following form:
```
<treat> <weight>
...
<treat> <weight>
```
## Output
Output the name of the treat that has the second heaviest weight.
## Constraints
* Treats may have spaces, numbers, or special characters in their names.
* The last entry on a line will always be an integer weight.
* Treats are guaranteed to have unique names and unique weights from all other treats.
* There will always be at least two (2) treats in the list of treats given to you.

## Examples
#### Input 0
```
Doughnut Delight 26
Bubbly Broomstick Soda 370
Spooky Sugar Cooky 32
```
#### Output 0
```
Spooky Sugar Cooky
```
#### Input 1
```
Slice of Pumpkin Pie 160
Undiluted-High-Fructose-Syrup 200
5 Mummy & Ghost Cookie Bars 300
```
#### Output 1
```
Undiluted-High-Fructose-Syrup
```
