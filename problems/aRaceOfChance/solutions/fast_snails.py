from functools import lru_cache
import sys
sys.setrecursionlimit(10000)

@lru_cache(maxsize=None)
def outcomes(positions):
    return [
      tuple(
        p-1 if j == i else p
        for j, p in enumerate(positions)
      ) for i in range(len(positions))
    ]

@lru_cache(maxsize=None)
def p_victory(you, rest):
  n = 1 + len(rest)
  if you <= 0:
    return 1.0
  elif any(r <= 0 for r in rest):
    return 0.0
  total = p_victory(you-1, rest) / n
  for next_rest in outcomes(rest):
    total += p_victory(you, tuple(sorted(next_rest))) / n
  return total

N, L = tuple(map(int, input().split()))
rolls = list(map(int, input().split()))
positions = [L]*N

print("{:.4f}".format(p_victory(positions[0], tuple(sorted(positions[1:])))))
for roll in rolls:
  positions[roll] -= 1
  print("{:.4f}".format(p_victory(positions[0], tuple(sorted(positions[1:])))))
# sys.stderr.write("{}\n".format(p_victory.cache_info().misses))
