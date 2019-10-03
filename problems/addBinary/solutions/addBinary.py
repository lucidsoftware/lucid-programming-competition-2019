def addBinary(a, b):
    return bin(int(a, 2) + int(b, 2))[2:]

a, b = [str(x) for x in input().split()]

print(addBinary(a, b))