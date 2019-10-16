import sys
from collections import deque

if __name__ == "__main__":
    treats = deque()

    for line in sys.stdin:
        weight, name = line.strip().split(" ", 1)
        treats.append((int(weight), name))
        treats = deque(sorted(treats))
        if len(treats) >= 3:
            treats.popleft()

    print(treats[0][1])
