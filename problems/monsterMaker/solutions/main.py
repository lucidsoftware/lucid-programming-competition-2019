import sys
import math

if __name__ == "__main__":
    N = int(input())
    for i in range(N):
        print(math.ceil(math.log(int(input()), 2))+1)