Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
        throw TypeError('ERROR')
    }
    const _this = this
    const args = [...arguments].slice(1)
    return function f() {
        if (this instanceof f) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}
var module = {
    x: 32,
    getx: function () {
        return this.x
    }
}

var unboundgetx = module.getx
console.log(unboundgetx())
var boundgetx = unboundgetx.mybind(module)
console.log(boundgetx())
