import argparse
import random


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--length", type=int, required=True)
    parser.add_argument("--ludicrous", action="store_const", const=True, required=False)
    parser.add_argument("--timid", action="store_const", const=True, required=False)
    args = parser.parse_args()

    for x in range(args.length):
        if args.ludicrous:
            print(random.randint(1, 2**30))
        elif args.timid:
            print(random.randint(1, 20))
        else:
            print(random.randint(1, 100))


if __name__ == "__main__":
    main()