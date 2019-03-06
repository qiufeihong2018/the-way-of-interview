Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('ERROR')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

const num = [5, 454, 4, 51, 48674, 14, 2]
const max = Math.max.myApply(this, num)
console.log(max)
