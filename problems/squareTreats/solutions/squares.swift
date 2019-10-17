import Foundation

guard let _input = readLine() else { fatalError("Could not get input") }
let input = _input.split(separator: "x")
let rect = (w: Double(input[0])!, h: Double(input[1])!)
let panArea = rect.w * rect.h
var treatArea = 0.0
var newRect = rect
var cutCount = 0
while Double(treatArea) / Double(panArea) < 0.99 {
    let minDim = min(newRect.w, newRect.h)
    let maxDim = max(newRect.w, newRect.h)
    treatArea += pow( min(newRect.w, newRect.h), 2.0)
    newRect = (w: maxDim - minDim, h: minDim)
    cutCount += 1
}
print(cutCount)
