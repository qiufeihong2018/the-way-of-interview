console.log('start')

async function async1() {
    await async2()
    console.log('async1')
}

async function async2() {
    console.log('async2')
}

async1()
setTimeout(function f() {
    console.log('setTimeout')
}, 100)

new Promise(resolve => {
    console.log('promise')
    resolve()
}).then(function () {
    console.log('promise1')
}).then(function () {
    console.log('promise2')
})

console.log('end')


// start
// async2
// promise
// end
// promise1
// promise2
// async1
// setTimeout





