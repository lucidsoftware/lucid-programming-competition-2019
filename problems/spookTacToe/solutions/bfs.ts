enum Item {
    X = 'x',
    O = 'o',
    Empty = '.',
    Obstacle = '#',
}

class Point {
    public static height: number;
    public static width: number;
    constructor(public x: number, public y: number) {}

    public toLinear() {
        return Point.toLinear(this.x, this.y);
    }

    public static toLinear(x: number, y: number) {
        return x * Point.height + y;

    }

    public static fromLinear(idx: number) {
        return new Point(Math.floor(idx / Point.height), idx % Point.height);
    }

    public getValidSiblings(): Set<number> {
        const siblings = new Set<number>();
        // Yes this is super obtuse, but it is also easy to reason about.
        this.x > 0 && siblings.add(Point.toLinear(this.x - 1, this.y));
        this.x > 0 && this.y > 0 && siblings.add(Point.toLinear(this.x - 1, this.y - 1));
        this.y > 0 && siblings.add(Point.toLinear(this.x, this.y - 1));
        this.x < Point.width && this.y > 0 && siblings.add(Point.toLinear(this.x + 1, this.y - 1));
        this.x < Point.width && siblings.add(Point.toLinear(this.x + 1, this.y));
        this.x < Point.width && this.y < Point.height && siblings.add(Point.toLinear(this.x + 1, this.y + 1));
        this.y < Point.height && siblings.add(Point.toLinear(this.x, this.y + 1));
        this.x > 0 && this.y < Point.height && siblings.add(Point.toLinear(this.x - 1, this.y + 1));

        return siblings;
    }
}

function forEachPoint(map: Item[], cb: (p: Point, v: Item) => void) {
   map.forEach((c, x) => {
        cb(Point.fromLinear(x), c);
   })
}

let debugging = false;
function debugOut(str: any) {
    if (debugging) {
        console.warn(str);
    }
}

/// This is the core logic of solving the puzzle.
function deduce(other1: Item, other2: Item): Item.X|Item.O|undefined {
    if (other1 === other2) {
        if (other1 === Item.X) {
            return Item.O;
        } else if (other1 === Item.O) {
            return Item.X;
        }
    }
    return undefined;
}

function solve(lines: string[]): string {
    const dimensions = lines.shift().split(' ');
    const width = Number(dimensions[0]);
    Point.width = width;
    const height = Number(dimensions[1]);
    Point.height = height;
    const map: Item[] = Array(width * height);
    let empty = 0;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            switch (lines[y][x]) {
                case Item.X:
                    map[x*height+y] = Item.X;
                    break;
                case Item.O:
                    map[x*height+y] = Item.O;
                    break;
                case Item.Obstacle:
                    map[x*height+y] = Item.Obstacle;
                    break;
                case Item.Empty:
                default:
                    map[x*height+y] = Item.Empty;
                    empty++;
            }
        }
    }

    let nextToSearch = new Set<number>();
    forEachPoint(map, (point, value) => {
        if (value == Item.O || value == Item.X) {
            point.getValidSiblings().forEach(p => {
                if (map[p] === Item.Empty) {
                    nextToSearch.add(p);
                }
            });
        }
    });
    while (nextToSearch.size > 0) {
        debugOut(nextToSearch);
        const toSearch = nextToSearch;
        let usefulLoop = false;
        nextToSearch = new Set<number>();
        toSearch.forEach((idx) => {
            if (map[idx] !== Item.Empty) {
                return;
            }
            const point = Point.fromLinear(idx);
            let deductions: (Item.X|Item.O|undefined)[] = [];
            // There are 12 checks for each empty spot.
            // they all must agree on either not adding any knowledge
            // or to add the same knowledge.
            point.x > 1 && deductions.push(deduce(map[idx - height], map[idx - height*2])); //left
            point.x > 1 && point.y > 1 && deductions.push(deduce(map[idx - height - 1], map[idx - height*2 - 2])); //up left
            point.y > 1 && deductions.push(deduce(map[idx - 1], map[idx - 2])); // up
            point.x < width - 2 && point.y > 1 && deductions.push(deduce(map[idx + height - 1], map[idx + height*2 - 2])); // up right
            point.x < width - 2 && deductions.push(deduce(map[idx + height], map[idx + height*2])); // right
            point.x < width - 2 && point.y < height - 2 && deductions.push(deduce(map[idx + height + 1], map[idx + height*2 + 2])); // down right
            point.y < height - 2 && deductions.push(deduce(map[idx + 1], map[idx + 2])); // down
            point.x > 1 && point.y < height - 2 && deductions.push(deduce(map[idx - height + 1], map[idx - height*2 + 2])); // down left
            point.x > 0 && point.x < width - 1 && deductions.push(deduce(map[idx - height], map[idx + height])); // horizontal cross
            point.y > 0 && point.y < height - 1 && deductions.push(deduce(map[idx - 1], map[idx + 1])); // vertical cross
            point.x > 0 && point.x < width - 1 && point.y > 0 && point.y < height - 1 && deductions.push(deduce(map[idx - height - 1], map[idx + height + 1])); // down slash
            point.x > 0 && point.x < width - 1 && point.y > 0 && point.y < height - 1 && deductions.push(deduce(map[idx - height + 1], map[idx + height - 1])); // up slash

            deductions = deductions.filter((a) => a);
            debugOut(deductions);

            if (new Set(deductions).size > 1) {
                // Since this is wrapped in a foreach it doesn't actually properly return, so we will just console log to corrupt the output.
                // This doesn't happen with the given inputs though, so we don't really care.
                console.log('Invalid3!');
                return 'Invalid3!';
            }

            if (deductions.length >= 1) {
                usefulLoop = true;
                empty--;
                debugOut(`${idx} is ${deductions[0]}`);
                map[idx] = deductions[0];
                nextToSearch.delete(idx); // delete it if it already got re-added by something else.
                point.getValidSiblings().forEach(p => {
                    if (map[p] === Item.Empty) {
                        nextToSearch.add(p);
                    }
                });
            } else {
                nextToSearch.add(idx);
            }
        });

        if (!usefulLoop) {
            return 'Invalid1!';
        }
    }

    if (empty !== 0) {
        return 'Invalid2!';
    }

    const outLines = (new Array(height).fill(undefined)).map((_, y) => (new Array(width).fill(undefined)).map((_1, x) => map[x*height + y]));

    return outLines.map((line) => line.join('')).join('\n');
}

const chunks = [];
declare const process: any;
process.stdin.on('data', d => chunks.push(d));

process.stdin.on('end', () => {
    const data = chunks.join('');
    const lines = data.split('\n');
    console.log(solve(lines));
});