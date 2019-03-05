// 实现简易版的promise
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    that.state = PENDING
    that.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED
            that.value = value
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }

    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }
}

//1.
// - pending/resolved/rejected表示状态
// - 创建that用于获取正确的this对象
// - promise开始状态为pedding
// - value用来保存resolve和reject传入的值
// - this.resolvedCallbacks 和this.rejectedCallbacks保存then回调的值,等待状态改变时使用
//2.
// - 只有等待态才能改变状态
// - 将当前状态改为对应状态,value赋值
// - 遍历回调数组并执行

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }
    if (that.state === PENDING) {
        that.resolvedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }
    if (that.state === RESOLVED) {
        onFulfilled(that.value)
    }
    if (that.state === REJECTED) {
        onRejected(that.value)
    }
}
//
// - 判断参数是否是函数类型
// - 当参数不是函数类型时,需要创建一个函数赋值给对应的参数,同时也实现了透传
// - 判断状态的逻辑,当状态不是等待态时,就去执行相对应的函数.如果是等待态的话,就往回调函数中push函数.
new MyPromise((resolve, reject) => {
    resolve(111)
}).then(value => {
    console.log('value', value)
})
