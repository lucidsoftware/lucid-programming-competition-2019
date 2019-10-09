#!/usr/bin/env python
import sys

heaviestName = ''
secondHeaviestName = ''

heaviestWeight = None
secondHeaviestWeight = None

for line in sys.stdin:
    origLine = line
    splitLine = line.split(' ')
    weight = splitLine[-1]
    if heaviestWeight is None:
        heaviestWeight = weight
        heaviestName = origLine.rsplit(' ', 1)[0]
    elif weight > heaviestWeight:
        secondHeaviestName = heaviestName
        secondHeaviestWeight = heaviestWeight
        heaviestWeight = weight
        heaviestName = origLine.rsplit(' ', 1)[0]
    elif secondHeaviestWeight is None or weight > secondHeaviestWeight:
        secondHeaviestWeight = weight
        secondHeaviestName = origLine.rsplit(' ', 1)[0]

print secondHeaviestName


