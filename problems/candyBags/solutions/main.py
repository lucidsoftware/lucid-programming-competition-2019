import sys

def candy_bags(bag_sizes, N):
    print(bag_sizes)
    print(N)
    m = [[0 for x in range(N + 1)] for y in range(len(bag_sizes) + 1)]
    for i in range(N + 1):
        m[0][i] = sys.maxsize

    for b in range(1, len(bag_sizes) + 1):
        for r in range(1, N + 1):

            # just use this one bag to make this subproblem
            if bag_sizes[b - 1] == r:
                m[b][r] = 1
            # this bag can't be included, use the previous solution for this subproblem
            elif bag_sizes[b - 1] > r:
                m[b][r] = m[b - 1][r]
            # take whatever's smaller between the previous solution for this subproblem
            #   and using this bag and the solution for (r - bagsize)
            else:
                m[b][r] = min(m[b - 1][r], 1 + m[b][r - bag_sizes[b - 1]])

    if m[-1][-1] == sys.maxsize:
        return -1
    return m[-1][-1]

bag_sizes = [int(x) for x in sys.stdin.readline().split(' ')]
target = int(sys.stdin.readline())

print(candy_bags(bag_sizes, target))