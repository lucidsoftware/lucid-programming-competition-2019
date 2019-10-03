# To Catch a Cheat #

![pmcs_mario_cards](https://user-images.githubusercontent.com/17462137/46981119-263bf180-d094-11e8-8d9b-177a882f6f6b.png)

Bowser is tired of stealing Princess Peach only to have Mario rush in and foil his plan. This time Bowser has a better idea, he challenges Mario to a card game. Each game has n cards in the deck.

Mario knows that Bowser is always up to no good so he suspects Bowser of cheating. Mario knows that Bowser will always remove a single card from the deck each game. Mario must look through the remaining cards and tell Bowser which card he took.

# Input #

The first line is an integer 2 <= **n** <= 25, the number of cards in the deck, and an integer 1 <= **k** <= 5, the number of games they will play. The next **k** lines contain space seperated numbers denoting the cards in the deck during that game. The card values range from  1 to **n** with each value only appearing a single time in the deck.

# Output #

Print the value of the card missing from the deck for each game played.

<table>
    <tr>
        <th width="50%">Input 1</th>
        <th width="50%">Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>
12 2
1 9 4 3 12 8 10 11 7 5 6
7 2 6 12 3 1 5 4 8 10 9
            </pre>
        </td>
        <td>
            <pre>
5 5
3 5 4 1
2 4 1 5
5 3 1 4
4 2 3 1
1 5 2 3
            </pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>
2
11
            </pre>
        </td>
        <td>
            <pre>
2
3
2
5
4
            </pre>
        </td>
    </tr>

</table>
