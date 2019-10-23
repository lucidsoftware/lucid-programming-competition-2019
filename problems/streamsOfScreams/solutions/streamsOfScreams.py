import sys

n = int(input())
spookyWords = {'ghost': (1, 'Ah!'), 'boo!': (3, 'Ahhh!!!')}
words = [w for w in [sys.stdin.readline().strip() for i in range(n)] if w in spookyWords.keys()]
score = 0
for word in words:
    score += spookyWords[word][0]
    print(spookyWords[word][1])
print(score)
