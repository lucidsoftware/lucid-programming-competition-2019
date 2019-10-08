#!/usr/bin/env python
from __future__ import print_function

message = raw_input()
[strW, strH] = message.split('x')
w = float(strW)
h = float(strH)

area = w*h
area99 = .99 * area
areaTaken = 0
numSquares = 0

while areaTaken < area99:
    if (w > h):
        areaTaken += h * h
        w -= h
    else:
        areaTaken += w * w
        h -= w
    numSquares += 1

print(numSquares)

