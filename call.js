Function.prototype.maCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}


function Product(name, price) {
    this.name = name,
        this.price = price
}

function Food(name, price) {
    Product.maCall(this, name, price)
    this.category = 'food'
}

console.log(new Food('DDDD', 2342))
