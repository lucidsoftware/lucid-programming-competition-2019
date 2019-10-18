use std::collections::{HashMap, HashSet};
use std::io;
use std::io::BufRead;
use std::iter::FromIterator;

struct ExpandingWavefront {
    rules: HashMap<String, Vec<String>>,
}

impl ExpandingWavefront {
    
    fn can_expand_to_target(&self, target: String) -> bool {
        /* This algorithm is kind of shady and only works
           on decompositions that either produce an inert byproduct
           or which never loop back.  i.e., it doesn't work on (A -> B -> A) */
        let mut wavefront: HashSet<String> = HashSet::from_iter(
            self.rules.keys().map(|x| x.to_string())
        );

        while ! wavefront.contains(&target) {
            let mut new_wavefront: HashSet<String> = HashSet::new();
            for entry in wavefront {
                for expansion in self.expand_entry(&entry, &target) {
                    new_wavefront.insert(expansion.to_string());
                }
            }

            if new_wavefront.is_empty() {
                return false;
            }

            wavefront = new_wavefront;
        }

        true
    }

    fn expand_entry(&self, entry: &String, target: &String) -> Vec<String> {
        let mut new_additions: Vec<String> = Vec::new();

        for (key, replacements) in self.rules.iter() {
            for replacement in replacements.iter() {
                let expanded = entry.replacen(key, replacement, 1);
                if expanded != *entry && expanded.len() <= target.len() {
                    new_additions.push(expanded);
                }
            }
        }

        new_additions
    }

}

fn main() {
    let lines: Vec<String> = io::stdin().lock().lines().flatten().collect();

    let target = &lines[0];
    let _num_rules = &lines[1];
    let mapping_lines = (&lines[2..]).to_vec();

    let mut rules: HashMap<String, Vec<String>> = HashMap::new();
    mapping_lines.iter().for_each(|line: &String| {
        let line_split: Vec<_> = line.split(",").collect();
        let key = line_split[0].to_string();
        let value = line_split[1].to_string();

        if !rules.contains_key(&key) {
            rules.insert(key.to_string(), Vec::new());
        }

        rules.get_mut(&key).unwrap().push(value);
    });

    let wavefront = ExpandingWavefront {
        rules
    };

    let can_expand_to = wavefront.can_expand_to_target(target.to_string());
    println!("{}", can_expand_to);

}
