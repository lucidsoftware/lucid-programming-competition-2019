use std::io;
use std::io::BufRead;

#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
struct Treat {
    weight: i64,
    name: String,
}

fn main() {
    let mut treat_vector: Vec<Treat> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line_result| line_result.ok())
        .map(|line| {
            let line_vec: Vec<String> = line.split(" ")
                .map(|l| l.to_string())
                .collect::<Vec<String>>();
            let (str_weight, vec_rest) = line_vec.split_last().unwrap();
            let weight = str_weight.parse::<i64>().unwrap();
            let name = vec_rest.join(" ");

            Treat { weight, name }
        })
        .collect::<Vec<Treat>>();

    treat_vector.sort();
    treat_vector.reverse();

    println!("{}", treat_vector[1].name);
}
