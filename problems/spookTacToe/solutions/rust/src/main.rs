use std::collections::BTreeSet;
use std::io;
use std::io::BufRead;

struct SpookyMap {
    map: Vec<u8>,
    width: usize,
    height: usize,
}

const PUMPKIN: u8 = 120;
const CAULDRON: u8 = 111;
const ROCK: u8 = 35;
const BLANK: u8 = 46;

impl SpookyMap {
    fn unambiguously_fill_in_map(&mut self) -> &SpookyMap {
        let mut empty_spaces: BTreeSet<(usize, usize)> = BTreeSet::new();

        for row in 0..self.height {
            for col in 0..self.width {
                if self.item_at(row, col).unwrap() == BLANK {
                    empty_spaces.insert((row, col));
                }
            }
        }

        while !empty_spaces.is_empty() {
            let mut filled_spaces_on_this_pass: Vec<(usize, usize)> = Vec::new();

            for (row, col) in empty_spaces.iter() {
                let successfully_filled = self.try_filling_unambiguously(*row, *col);
                if successfully_filled {
                    filled_spaces_on_this_pass.push((*row, *col));
                }
            }

            if filled_spaces_on_this_pass.is_empty() {
                println!("{}", self.to_string());
                panic!("Ambiguity detected! Unable to progress further without guessing.");
            }

            for (row, col) in filled_spaces_on_this_pass.iter() {
                empty_spaces.remove(&(*row, *col));
            }
        }

        self
    }

    fn try_filling_unambiguously(&mut self, row: usize, col: usize) -> bool {
        let possibilities: Vec<_> = vec![
            self.try_item_at(PUMPKIN, row, col),
            self.try_item_at(CAULDRON, row, col), // self.with_item_at(Rock, row, col),  // Originally did not catch that part in the instructions.
        ];

        let possible_values: Vec<&u8> = possibilities.iter().flatten().collect();

        if possible_values.len() == 1 {
            self.put_item_at(*possible_values[0], row, col);
            true
        } else {
            false
        }
    }

    fn try_item_at(&mut self, item: u8, row: usize, col: usize) -> Option<u8> {
        let real_index = self.real_index_of(row, col);
        let old_item = self.map[real_index];
        self.map[real_index] = item;
        let result = if self.is_map_bad_near(row, col) {
            None
        } else {
            Some(item)
        };
        self.map[real_index] = old_item;
        result
    }

    fn put_item_at(&mut self, item: u8, row: usize, col: usize) {
        let real_index = self.real_index_of(row, col);
        self.map[real_index] = item;
    }

    fn real_index_of(&self, row: usize, col: usize) -> usize {
        row * self.width + col
    }

    fn item_at(&self, row: usize, col: usize) -> Option<u8> {
        if row >= self.height || col >= self.width {
            None
        } else {
            Some(self.map[self.real_index_of(row, col)])
        }
    }

    fn is_bad_sequence(tuple: (Option<u8>, Option<u8>, Option<u8>)) -> bool {
        match tuple {
            (Some(x), Some(y), Some(z)) => x != BLANK && x != ROCK && x == y && y == z,
            _ => false,
        }
    }

    fn is_bad_center_item(&self, row: usize, col: usize) -> bool {
        if row > 20000 || col > 20000 {
            return false;
        }

        let upper = self.item_at(row.wrapping_sub(1), col);
        let upper_left = self.item_at(row.wrapping_sub(1), col.wrapping_sub(1));
        let left = self.item_at(row, col.wrapping_sub(1));
        let lower_left = self.item_at(row + 1, col.wrapping_sub(1));
        let center = self.item_at(row, col);
        let upper_right = self.item_at(row.wrapping_sub(1), col + 1);
        let right = self.item_at(row, col + 1);
        let lower_right = self.item_at(row + 1, col + 1);
        let lower = self.item_at(row + 1, col);

        let result = SpookyMap::is_bad_sequence((upper_left, center, lower_right))
            || SpookyMap::is_bad_sequence((left, center, right))
            || SpookyMap::is_bad_sequence((lower_left, center, upper_right))
            || SpookyMap::is_bad_sequence((upper, center, lower));
        result
    }

    fn is_map_bad_near(&self, row: usize, col: usize) -> bool {
        let possibly_bad = vec![
            (row + 0, col + 0),
            (row + 1, col + 0),
            (row.wrapping_sub(1), col + 0),
            (row + 0, col + 1),
            (row + 1, col + 1),
            (row.wrapping_sub(1), col + 1),
            (row + 0, col.wrapping_sub(1)),
            (row + 1, col.wrapping_sub(1)),
            (row.wrapping_sub(1), col.wrapping_sub(1)),
        ];

        for (possible_bad_row, possible_bad_col) in possibly_bad.iter() {
            if self.is_bad_center_item(*possible_bad_row, *possible_bad_col) {
                return true;
            }
        }

        false
    }

    fn get_row(&self, row: usize) -> &[u8] {
        &self.map[row * self.width..(row + 1) * self.width]
    }

    fn to_line_strings(&self) -> Vec<String> {
        let mut lines: Vec<String> = Vec::new();

        for row in 0..self.height {
            lines.push(
                String::from_utf8(self.get_row(row).to_vec())
                    .unwrap()
                    .to_string(),
            )
        }

        lines
    }

    fn to_string(&self) -> String {
        self.to_line_strings().join("\n")
    }
}

fn main() {
    let lines: Vec<String> = io::stdin().lock().lines().flatten().collect();
    let (dimension_str, map_lines) = lines.split_first().unwrap();
    let dimensions: Vec<usize> = dimension_str
        .split_whitespace()
        .flat_map(|x| x.parse::<usize>())
        .collect();

    let width = dimensions[0];
    let height = dimensions[1];
    let mut map: Vec<u8> = Vec::new();

    map_lines
        .iter()
        .for_each(|line: &String| map.extend(line.trim().as_bytes()));

    let mut spooky_map = SpookyMap {
        width: width,
        height: height,
        map: map,
    };

    spooky_map
        .unambiguously_fill_in_map()
        .to_line_strings()
        .iter()
        .for_each(|line| {
            println!("{}", line);
        })
}
