from collections import deque

P, K, M, Q = [int(n) for n in input().split()]
circle = deque([0])
S = 0
for n in range(1, P):
  if n % M == 0:
    circle.rotate(Q)
    removed = circle.pop()
    circle.rotate(-1)
    S += n + removed
  else:
    circle.rotate(-K)
    circle.append(n)
  # print(circle)
print(S)

if S >= 2**32:
  print("Error, answer {} is larger specified constraint.".format(S))
