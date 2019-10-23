# Square Treats
You are expecting trick-or-treating goblins, who are very particular about only eating square treats. However, the demons in your kitchen have all kinds of rectangular pans to bake in. So, you need to take rectangular treats, and cut them into squares. You have more than enough pans of treats, and are extremely lazy, so you want to cut the least amount of treats possible in each rectangular pan in such a way that you make squares out of 99% of the treats, and then you don't care about that last 1%. The squares do not all need to be the same size.

Do not round up to reach your 99% - you have to make squares that take _at least_ that much of the treats. While you're lazy, you don't want to be too wasteful.

## Input
Your input will come in the form `<width>x<height>`.

## Constraints

- `width` and `height` are **not** guaranteed to be integers
- 0 < `width` < 10^8
- 0 < `height` < 10^8

## Output
You must output a single number, which is the number of squares needed.

## Examples

<table>
    <tr>
        <th>Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>4x1</pre>
        </td>
        <td>
            <pre>20x432</pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>4</pre>
        </td>
        <td>
            <pre>23</pre>
        </td>
    </tr>
</table>