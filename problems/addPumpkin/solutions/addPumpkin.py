def addPumpkin(a, b):
    a0 = a.replace("P", "0")
    aa = a0.replace("W", "1")
    b0 = b.replace("P", "0")
    bb = b0.replace("W", "1")
    result = bin(int(aa, 2) + int(bb, 2))[2:]
    r0 = result.replace("0", "P")
    rr = r0.replace("1", "W")
    return rr

a, b = [str(x) for x in input().split()]

print(addPumpkin(a, b))