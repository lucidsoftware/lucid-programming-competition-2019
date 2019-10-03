def findMissingCard(cards):
    total = (cards * (cards + 1))/2
    values = [int(y) for y in input().split()]
    for z in values:
        total -= z
    return int(total)

cards, rounds = [int(x) for x in input().split()]

for x in range(rounds):
    print(findMissingCard(cards))