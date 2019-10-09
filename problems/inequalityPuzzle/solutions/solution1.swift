typealias Puzzle = [[Int]]

let size = 5

guard let _input1 = readLine() else { fatalError("Could not read input") }
let input1 = Array(_input1)
var lateralConstraints = [[Character]]()
for row in 0..<size {
    let start = (row * (size - 1))
    lateralConstraints.append(Array(input1[start..<(start + size - 1)]))
}
var verticalContraints = [[Character]]()
for row in 0..<size {
    let start = size * (size - 1) + (row * (size - 1))
    verticalContraints.append(Array(input1[start..<(start + size - 1)]))
}

guard let _input2 = readLine() else { fatalError("Could not read input") }
let input2 = Array(_input2)

var puzzle = Puzzle()
for row in 0..<size {
    var rowArray = [Int]()
    for column in 0..<size {
        let number = Int(String(input2[(row * size) + column]))!
        rowArray.append(number)
    }
    puzzle.append(rowArray)
}

func predicate(for constraint: Character) -> (Int, Int) -> Bool {
    switch constraint {
    case "<":
        return { a,b in
            a < b
        }
    case ">":
        return { a,b in
            a > b
        }
    default:
        return { a, b in
            true
        }
    }
}

func opposite(_ constraint: Character) -> Character {
    switch constraint {
    case "<":
        return ">"
    case ">":
        return "<"
    default:
        return constraint
    }
}

func limit(by that: Int, with constraint: Character) -> Set<Int> {
    if that == 0 { return Set<Int>() }
    else { return Set<Int>(1...size).filter({ !predicate(for: constraint)($0, that) }) }
}

func possible(_ row: Int, _ col: Int, puzzle: Puzzle) -> Set<Int> {
    
    
    var taken = Set<Int>()
    
    // Preset
    if puzzle[row][col] != 0 {
        taken = taken.union(Set<Int>(1...size).subtracting(Set<Int>([puzzle[row][col]])))
    }
    
    // Regular contraints
    for row in 0..<row {
        let number = puzzle[row][col]
        if number != 0 {
            taken.insert(number)
        }
    }
    for col in 0..<col {
        let number = puzzle[row][col]
        if number != 0 {
            taken.insert(number)
        }
    }
    
    //Inequalities
    //Right
    if col < size - 1 {
        taken = taken.union(limit(by: puzzle[row][col + 1], with: lateralConstraints[row][col]))
    }
    //Left
    if col > 0 {
        taken = taken.union(limit(by: puzzle[row][col - 1], with: opposite(lateralConstraints[row][col - 1])))
    }
    //Bottom
    if row < size - 1 {
        taken = taken.union(limit(by: puzzle[row + 1][col], with: verticalContraints[col][row]))
    }
    //Top
    if row > 0 {
        taken = taken.union(limit(by: puzzle[row - 1][col], with: opposite(verticalContraints[col][row - 1])))
    }
    
    return Set(1...size).subtracting(taken)
}

func choose(_ row: Int, _ col: Int, puzzle: Puzzle) -> [Puzzle] {
    possible(row, col, puzzle: puzzle).map {
        var next = puzzle
        next[row][col] = $0
        return next
    }
}

func print(puzzle: Puzzle) {
    for row in 0..<size {
        print(puzzle[row].map(String.init).joined())
    }
    print()
}

// MAIN
var permutations = [puzzle]

for row in 0..<size {
    for col in 0..<size {
        var next = [Puzzle]()
        for permutation in permutations {
            next += choose(row, col, puzzle: permutation)
        }
        permutations = next
    }
}

if permutations.count == 1 {
//    print(puzzle: permutations[0])
    print(permutations.reduce("", {$0 + $1.map({ $0.map(String.init).joined() }).joined() }))
} else {
    print("There where \(permutations.count) possible answers.")
}




