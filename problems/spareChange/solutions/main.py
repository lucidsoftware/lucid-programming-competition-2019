import sys

def spare_change(coins, N):
    m = [[0 for x in range(N + 1)] for y in range(len(coins) + 1)]
    for i in range(N + 1):
        m[0][i] = sys.maxsize

    for c in range(1, len(coins) + 1):
        for r in range(1, N + 1):

            # just use this one coin to make this subproblem
            if coins[c - 1] == r:
                m[c][r] = 1
            # this coin can't be included, use the previous solution for this subproblem
            elif coins[c - 1] > r:
                m[c][r] = m[c - 1][r]
            # take whatever's smaller between the previous solution for this subproblem
            #   and using this coin and the solution for (r - coin value)
            else:
                m[c][r] = min(m[c - 1][r], 1 + m[c][r - coins[c - 1]])

    if m[-1][-1] == sys.maxsize:
        return -1
    return m[-1][-1]

print(spare_change((1,5,10,25), 24))
print(spare_change((1,2), 8))
print(spare_change((4,1,3), 6))
print(spare_change((4,6,7), 27))
print(spare_change((7,8,9), 29))
print(spare_change((16, 17, 5), 24))
print(spare_change((56, 46, 20, 3, 17), 57))