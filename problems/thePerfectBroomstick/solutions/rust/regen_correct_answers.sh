#!/bin/bash
for testnum in {0..7}
do
cargo run < ../../tests/$testnum.in > ../../tests/$testnum.out
done
