import sys
from collections import deque

if __name__ == "__main__":
    treats = deque()

    for line in sys.stdin:
        weight, name = line.strip().split(" ", 1)
        treats.append((int(weight), name))
        if len(treats) >= 3:
            treats = deque(sorted(treats))
            treats.popleft()

    print(treats[0][1])
