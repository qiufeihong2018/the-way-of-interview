// // 组合继承
// function Perent(val) {
//     this.val = val;
// }
//
// Perent.prototype.getValue = function () {
//     console.log(this.val)
// }
//
// function Child(val) {
//     Perent.call(this, val)
// }
//
// Child.prototype = new Perent()
// const child = new Child(1)
// child.getValue()
// child instanceof Perent
//
// // 寄生组合继承
// function Perent(val) {
//     this.val = val
// }
//
// Perent.prototype.getValue = function () {
//     console.log(this.val)
// }
//
// function Child(val) {
//     Perent.call(this, val)
// }
//
// Child.prototype = Object.create(Perent.prototype, {
//     constructor: {
//         value: Child,
//         enumerable: false,
//         writable: true,
//         configurable: true
//     }
// })
// const child = new Child(1)
// child.getValue()
// child instanceof Perent


// class实现继承
class Parent {
    constructor(val) {
        this.val = val
    }

    getVal() {
        console.log(this.val)
    }
}

class Child extends Parent {
    constructor(val) {
        super(val)
        this.val = val
    }
}

let child = new Child(12)
child.getVal()
child instanceof Parent
