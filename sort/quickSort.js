function quickSort(arr) {
    if (arr.length < 1) return arr
    const provit = arr.splice(0, 1)[0]
    const left = [], right = []
    for (let num of arr) {
        if (num < provit) {
            left.push(num)
        } else {
            right.push(num)
        }
    }
    return quickSort(left).concat([provit], quickSort(right))
}

console.log(quickSort([32,44,1,4,5,7]))
