import os
from random import randrange


def test(num_words, word_length):
	yield str(num_words) + '\n'
	for word in range(num_words):
		yield ''.join(chr(randrange(26)+ord('a')) for _ in range(randrange(word_length)+1)) + '\n'

# num words, max length of word
case_params = [
    [10, 5],
    [20, 10],
    [40, 15],
    [50, 20],
    [70, 25],
    [100, 30]
]

path = "tests/"

for i, (num_words, word_length) in enumerate(case_params):
    with open("{}{}.in".format(path, i), "w") as f:
        f.writelines(test(num_words, word_length))

for file in os.listdir(path):
    if file.endswith(".in"):
        os.system("cat {}{} | python3 i18n.py > {}{}".format(path, file, path, file.replace('.in', '.out')))
