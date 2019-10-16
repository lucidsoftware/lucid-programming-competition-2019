import sys
from collections import deque

# A not very readable, but short solution :)

if __name__ == "__main__":

    treats = deque()

    for line in sys.stdin:
        name, weight = line.strip().rsplit(" ", 1)
        treats.append((int(weight), name))
        treats = deque(sorted(treats))  # Alas, no way to sort deques in place afaik.
        if len(treats) >= 3:
            treats.popleft()

    print(treats[0][1])
