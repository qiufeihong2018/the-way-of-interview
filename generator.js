// function* foo(x) {
//     let y = 2 * (yield (x + 1))
//     let z = yield (y / 3)
//     return (x + y + z)
// }
//
// let it = foo(5)
// //x=5
// console.log(it.next())//{ value: 6, done: false }
// //x=5 y=48
// console.log(it.next(24))//{ value: 16, done: false }
// //x=5 y=48 z=25
// console.log(it.next(25))//{ value: 78, done: true }

function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
