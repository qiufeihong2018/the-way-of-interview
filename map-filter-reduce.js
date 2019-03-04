// // map
// console.log([123, 1232, 123123].map(v => v + 2))

// console.log(['1', '2', '3'].map(parseInt))

// //filter
// let array = [12, 45, 4, 12, 48, 1, 5]
// console.log(array.filter(v => v > 20))

// //reduce
// let array = [12, 1454, 1, 45, 2]
// console.log(array.reduce((acc, current) => acc + current))

let array = [1, 5, 55, 114, 8]
// console.log(array.map(v => v * 2))
// [ 2, 10, 110, 228, 16 ]
console.log(array.reduce((acc, current) => {
    acc.push(current * 2)
    return acc
}, []))
