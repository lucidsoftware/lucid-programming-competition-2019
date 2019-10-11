from collections import deque
import sys

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
print(S)

if not (1 <= P and P < 2**16):
  sys.stderr.write("Error, P = {} does not match expected constraints.\n".format(P))
if not (0 <= K and K < 2**5):
  sys.stderr.write("Error, K = {} does not match expected constraints.\n".format(K))
if not (2 <= M and M < 2**5):
  sys.stderr.write("Error, M = {} does not match expected constraints.\n".format(M))
if not (0 <= Q and Q < 2**5):
  sys.stderr.write("Error, Q = {} does not match expected constraints.\n".format(Q))
if not (0 <= S and S < 2**32):
  sys.stderr.write("Error, answer {} is larger specified constraint.\n".format(S))
