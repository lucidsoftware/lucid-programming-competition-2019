def addPumpkin(a, b):
    a = a.replace("P", "0").replace("W", "1")
    b = b.replace("P", "0").replace("W", "1")
    result = bin(int(a, 2) + int(b, 2))[2:]
    result = result.replace("0", "P").replace("1", "W")
    return result

a = input()
b = input()

print(addPumpkin(a, b))