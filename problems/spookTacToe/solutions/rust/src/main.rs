use std::io;
use std::io::BufRead;

#[derive(Clone)]
struct SpookyMap {
    map: Vec<u8>,
    width: usize,
    height: usize,
}

const Pumpkin: u8 = 0x78;
const Cauldron: u8 = 0x6F;
const Rock: u8 = 0x23;
const Blank: u8 = 0x2E;

impl SpookyMap {

    fn unambiguously_fill_in_map(&self) -> SpookyMap {
        for row in 0..self.width {
            for col in 0..self.height {
                self.try_filling_unambiguously(row, col);
            }
        }
    }

    fn try_filling_unambiguously(&self, row: usize, col: usize) -> Option<SpookyMap> {
        let x: Vec<_> = vec![
            self.with_item_at(Pumpkin, row, col),
            self.with_item_at(Cauldron, row, col),
            self.with_item_at(Rock, row, col),
        ];

        let possible_values: Vec<&SpookyMap> = x.iter().flatten().collect();

        if possible_values.len() == 1 {
            Some(possible_values[0].clone())
        } else {
            None
        }
    }

    fn with_item_at(&self, item: u8, row: usize, col: usize) -> Option<SpookyMap> {
        let mut new_map = self.clone();
        new_map.map[
            self.real_index_of(row, col)
        ] = item;
        if new_map.is_map_bad_near(row, col) { Some(new_map) } else { None }
    }

    fn real_index_of(&self, row: usize, col: usize) -> usize {
        row * self.width + col
    }

    fn item_at(&self, row: usize, col: usize) -> Option<u8> {
        /* Strange twist: Since usize is unsigned, we don't need to check < 0 since it will just overflow */        
        if row >= self.height || col >= self.width {
            None
        } else {
            Some(self.map[self.real_index_of(row, col)])
        }
    }

    fn is_bad_sequence(tuple: (Option<u8>, Option<u8>, Option<u8>)) -> bool {
        match tuple {
            (Some(x), Some(y), Some(z)) => x != Blank && x == y && y == z,
            _ => false
        }
    }

    fn is_bad_center_item(&self, row: usize, col: usize) -> bool {
        let upper_left = self.item_at(row - 1, col - 1);
        let left = self.item_at(row, col - 1);
        let lower_left = self.item_at(row + 1, col - 1);
        let center = self.item_at(row, col);
        let upper_right = self.item_at(row - 1, col + 1);
        let right = self.item_at(row, col + 1);
        let lower_right = self.item_at(row + 1, col + 1);

        SpookyMap::is_bad_sequence((upper_left, center, lower_right)) ||
        SpookyMap::is_bad_sequence((left, center, right)) ||
        SpookyMap::is_bad_sequence((lower_left, center, upper_right))
    }

    fn is_map_bad_near(&self, row: usize, col: usize) -> bool {
        let possibly_bad = vec![
            (row + 0, col + 0),
            (row + 1, col + 0),
            (row - 1, col + 0),
            (row + 0, col + 1),
            (row + 1, col + 1),
            (row - 1, col + 1),
            (row + 0, col - 1),
            (row + 1, col - 1),
            (row - 1, col - 1)
        ];

        for (possible_bad_row, possible_bad_col) in possibly_bad.iter() {
            if self.is_bad_center_item(*possible_bad_row, *possible_bad_col) {
                return true;
            }
        }

        false
    }

    // fn clone(&self) -> SpookyMap {
    //     SpookyMap {
    //         map: self.map.clone(),
    //         width: self.width,
    //         height: self.height,
    //     }
    // }

}


fn main() {
    // let line_iter = io::stdin().lock().lines();
}
