use std::io::BufRead;

struct PerfectBroomstickPile {
    left: std::collections::BinaryHeap<i64>, /* A normal max-heap */
    right: std::collections::BinaryHeap<i64>, /* Use negatives to simulate a min-heap */
}

impl PerfectBroomstickPile {
    fn add_broomstick(&mut self, length: i64) {
        self.add_to_appropriate_heap(length);
        self.rebalance();
    }

    fn rebalance(&mut self) {
        if self.is_left_biggest() {
            self.left.pop().map(|val| {
                self.right.push(-val);
            });
        } else if self.is_right_biggest() {
            self.right.pop().map(|val| {
                self.left.push(-val);
            });
        }
    }

    fn add_to_appropriate_heap(&mut self, broomstick: i64) {
        let left = self.left.peek();
        let right = self.right.peek();

        if left.is_none() {
            self.right.push(-broomstick);
        } else if right.is_none() {
            self.left.push(broomstick);
        } else if broomstick > -*right.unwrap() {
            self.right.push(-broomstick);
        } else {
            self.left.push(broomstick);
        }
    }

    fn is_right_biggest(&mut self) -> bool {
        self.right.len() > self.left.len()
    }

    fn is_left_biggest(&self) -> bool {
        self.left.len() > self.right.len()
    }

    fn is_equally_balanced(&self) -> bool {
        self.left.len() == self.right.len()
    }

    fn perfect_broomstick(&self) -> Option<i64> {
        if self.is_equally_balanced() {
            self.right.peek().map(|length| -length)
        } else {
            if self.is_left_biggest() {
                self.left.peek().map(|x| *x)
            } else {
                self.right.peek().map(|x| -*x)
            }
        }
    }

    fn new() -> PerfectBroomstickPile {
        PerfectBroomstickPile {
            left: std::collections::BinaryHeap::new(),
            right: std::collections::BinaryHeap::new(),
        }
    }
}

fn main() {
    let mut broomsticks = PerfectBroomstickPile::new();

    std::io::stdin()
        .lock()
        .lines()
        .flatten()
        .for_each(|line: String| {
            broomsticks.add_broomstick(line.parse::<i64>().unwrap());
            broomsticks
                .perfect_broomstick()
                .map(|perfect| println!("{}", perfect));
        })
}
