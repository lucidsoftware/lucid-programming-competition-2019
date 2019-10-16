# Witches Brew
As an aspiring witch, you are always looking for new and more efficient ways to brew your potions. Recently, you have discovered a new super-reactive chemical that you refer to simply as X. You want to determine how many of your potions recipes can be brewed by letting X decompose.

Potion recipes are represented as a chain of inert chemicals. Each chemical is represented by a character. Reactive chemicals are represented with a capital character (A-Z) and inert chemicals are represented with a lowercase character (a-z). Reactive chemicals can be decomposed into a chain of one or more chemicals (sometimes, recursively.)

Create a program that when given a list of decomposition rules and a potion recipe, returns whether it is possible to brew that potion starting from the chemical X.

## Input
The first line, a string of up to MAX_LENGTH lowercase characters, will be the potion recipe.

The next line, NUM_RULES, will be the number of decomposition rules.

The next NUM_RULES lines will be decomposition rules. Each composition rule will be one uppercase character, a comma, and then one or more uppercase or lowercase characters.At least one rule will contain X on the left-hand side.

## Output
Return `true` or `false` if the potion recipe can be created.

## Constraints
1 <= NUM_RULES <= 20

MAX_LENGTH = 20

## Examples
<table>
    <tr>
        <th width="50%">Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>
xxxyyy
4
X,xX
X,xZ
Z,yZ
Z,y
</pre>
        </td>
        <td>
            <pre>
bbdbbd
3
X,XX
X,bXd
X,bd
</pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>true</pre>
        </td>
        <td>
            <pre>false</pre>
        </td>
    </tr>
    <tr>
        <th>Explanation 1</th>
        <th>Explanation 2</th>
    </tr>
    <tr>
        <td>X -> xX -> xxX -> xxxZ -> xxxyZ -> xxxyyZ -> xxxyyy</td>
        <td>By examining the rules, you notice that only potions with balanced b's and d's can be created.</td>
    </tr>
</table>
