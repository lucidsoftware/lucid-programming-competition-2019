import sys
print(sorted((l.rsplit(None, 1) for l in sys.stdin), key=lambda v: int(v[1]))[-2][0])
