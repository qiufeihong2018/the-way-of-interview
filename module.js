(function (globalVariable) {
    globalVariable.test = function () {

    }
})(globalVariable)

// AMD和CMD
define(['./a', './b'], function (a, b) {
    a.do()
    b.do()
})

define(function (require, exports, module) {
    var a = require('./a')
    a.do()
})

// CommonJS
module.exports = {
    a: 1
}
exports.a = 1
var module = require('./a.js')
module.a

var module = require('./a.js')
module.a
module.exports = {a: 1}
var module = {
    id: 'xxxx',
    exports: {}
}
var exports = module.exports
var load = function (module) {
    var a = 1
    module.exports = a
    return module.exports
}

// ES Module
import xxx from './a.js'
import {xxx} from './a.js'

export function a() {
}

export default function () {
}

