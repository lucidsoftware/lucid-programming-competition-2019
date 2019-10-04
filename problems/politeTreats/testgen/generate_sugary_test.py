import argparse
import random


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--length", type=int)
    args = parser.parse_args()

    with open('adjectives.txt') as f:
        adjectives = [line.strip() for line in f.readlines()]
    with open('halloween_nouns.txt') as f:
        halloween = [line.strip() for line in f.readlines()]
    with open('treat_nouns.txt') as f:
        treat_nouns = [line.strip() for line in f.readlines()]
    with open('opt_adjectives.txt') as f:
        opt_adjectives = [line.strip() for line in f.readlines()]

    treats = set()
    while len(treats) < args.length:
        treats.add(f"{random.choice(adjectives)} {random.choice(opt_adjectives)} {random.choice(halloween)} {random.choice(treat_nouns)}")

    unique_weights = set()
    while len(unique_weights) < args.length:
        unique_weights.add(random.randint(-5000, 100000))

    for treat, weight in zip(treats, unique_weights):
        print(f"{treat} {weight}")

if __name__ == "__main__":
    main()