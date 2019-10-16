use std::io;
use std::io::BufRead;

fn main() {
    let line: String = io::stdin().lock().lines().next().unwrap().unwrap();
    let line_split = line.split("x")
        .map(|value| value.to_string())
        .flat_map(|value| value.parse::<f64>())
        .collect::<Vec<f64>>();

    let mut width = line_split[0];
    let mut height = line_split[1];

    let total_area = width * height;
    let target_area = total_area * 0.99;

    let mut used_area: f64 = 0.0;
    let mut cuts: i64 = 0;

    while used_area < target_area {
        if width > height {
            used_area += height * height;
            width -= height;
        } else {
            used_area += width * width;
            height -= width;
        }
        cuts += 1;
    }

    println!("{}", cuts);
}
