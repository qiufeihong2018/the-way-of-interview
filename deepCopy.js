// Object.assign()
// let a = {age: 21}
// let b = Object.assign({}, a)
// a.age = 24
// console.log('a', a.age, 'b', b.age)

// ...展开运算符
// let a = {age: 21}
// let b = {...a}
// a.age = 25
// console.log('a', a.age, 'b', b.age)

// 浅拷贝只能解决第一层的问题
// let a = {
//     author: {
//         age: 21
//     }
// }
// let b = {...a}
// a.author.age = 24
// console.log('a', a.author.age, 'b', b.author.age)

// 深拷贝解决上一个问题
// let a = {
//     author: {
//         age: 21
//     }
// }
// let b = JSON.parse(JSON.stringify(a))
// a.author.age = 24
// console.log('a', a.author.age, 'b', b.author.age)

// let obj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: 3,
//     },
// }
// obj.c = obj.b
// obj.e = obj.a
// obj.b.c = obj.c
// obj.b.d = obj.b
// obj.b.e = obj.b.c
// let newObj = JSON.parse(JSON.stringify(obj))
// console.log(newObj)

// let a = {
//     age: undefined,
//     sex: Symbol('male'),
//     jobs: function() {},
//     name: 'yck'
// }
// let b = JSON.parse(JSON.stringify(a))
// console.log(b) // {name: "yck"}

// function structuralclone(obj) {
//     return new Promise(resolve => {
//         const {p1, p2} = new MessageChannel()
//         p2.onmessage = ev => resolve(ev.data)
//         p1.postMessage(obj)
//     })
// }
//
// var obj = {
//     a: 1,
//     b: {
//         c: 2
//     }
// }
//
// obj.b.d = obj.b
//
// const test = async () => {
//     const clone = await structuralclone(obj)
//     console.log(clone)
// }
// test()

// lodash 的深拷贝函数
// function deepClone(obj) {
//     function isObject(o) {
//         return (typeof o === 'object' || typeof o === 'function') && o !== null
//     }
//
//     if (!isObject(obj)) {
//         throw new Error('非对象')
//     }
//
//     let isArray = Array.isArray(obj)
//     let newObj = isArray ? [...obj] : { ...obj }
//     Reflect.ownKeys(newObj).forEach(key => {
//         newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
//     })
//
//     return newObj
// }
//
// let obj = {
//     a: [1, 2, 3],
//     b: {
//         c: 2,
//         d: 3
//     }
// }
// let newObj = deepClone(obj)
// newObj.b.c = 1
// console.log(obj.b.c) // 2

