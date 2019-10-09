import sys
print(sorted((l.strip().split(" ", 1) for l in sys.stdin), key=lambda v: int(v[0]))[-2][1])
