# 前端面试之道
## 闭包
>经典面试题，循环中使用闭包解决 `var` 定义函数的问题
```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```
首先因为 setTimeout 是个异步函数，所以会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。
![avatar](./public/01.png)

- 方案一:let
```js
for (let i = 0; i <= 10; i++) {
    setTimeout(function () {
        console.log(i)
    }, i * 1000)
}
```
![avatar](./public/02.png)

- 方案二: 闭包
```js
for (var i = 0; i <= 10; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(j)
        }, j * 1000)
    })(i)
}
```
![avatar](./public/02.png)
详情请看[闭包应用之延迟函数setTimeout](https://www.cnblogs.com/camille666/p/js_setTimeout.html)
让我理解了立即执行函数的意义

- 方案三:setTimeout传参
```js
for (var i = 0; i <= 10; i++) {
    setTimeout(function (j) {
        console.log(j)
    }, i * 1000, i)
}

```
![avatar](./public/02.png)


>涉及面试题：什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

:::tip
在上一章节中，我们了解了对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况。通常在开发中我们不希望出现这样的问题，我们可以使用浅拷贝来解决这个情况。
:::
```js
let a = {
  age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```
## 浅拷贝
首先可以通过 Object.assign 来解决这个问题，很多人认为这个函数是用来深拷贝的。其实并不是，Object.assign 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。

> Object.assign
```js
// Object.assign()
let a = {age: 21}
let b = Object.assign({}, a)
a.age = 24
console.log('a', a.age, 'b', b.age)
```
![avatar](./public/03.png)

> ...展开运算符
```js
let a = {age: 21}
let b = {...a}
a.age = 25
console.log('a', a.age, 'b', b.age)
```
![avatar](./public/03.png)

> 浅拷贝只能解决第一层的问题
```js
let a = {
    author: {
        age: 21
    }
}
let b = {...a}
a.author.age = 24
console.log('a', a.author.age, 'b', b.author.age)
```
## 深拷贝
> 深拷贝解决上一个问题
```js
let a = {
    author: {
        age: 21
    }
}
let b = JSON.parse(JSON.stringify(a))
a.author.age = 24
console.log('a', a.author.age, 'b', b.author.age)
```
![avatar](./public/04.png)
[JSON.parse()和JSON.stringify()用法解析](https://blog.csdn.net/weixin_40475396/article/details/79723413)让你明白JSON.parse和stringify用法

>但是该方法也是有局限性的：
会忽略 undefined
会忽略 symbol
不能序列化函数
不能解决循环引用的对象
```js

let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)
```
如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝
![avatar](./public/05.png)
在遇到函数、 undefined 或者 symbol 的时候，该对象也不能正常的序列化
```js
let a = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function() {},
    name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}
```
你会发现在上述情况中，该方法会忽略掉函数和 undefined 。

但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。

如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)
[HTML5 postMessage 和 onmessage API 详细应用](https://www.ibm.com/developerworks/cn/web/1301_jiangjj_html5message/index.html)
```js
function structuralclone(obj) {
    return new Promise(resolve => {
        const {p1, p2} = new MessageChannel()
        p2.onmessage = ev => resolve(ev.data)
        p1.postMessage(obj)
    })
}

var obj = {
    a: 1,
    b: {
        c: 2
    }
}

obj.b.d = obj.b

const test = async () => {
    const clone = await structuralclone(obj)
    console.log(clone)
}
test()
```



当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理等等，所以这里我们实现的深拷贝只是简易版，并且我其实更推荐使用 [lodash 的深拷贝函数](https://lodash.com/docs/4.17.11#cloneDeep)。

```js
function deepClone(obj) {
    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }

    if (!isObject(obj)) {
        throw new Error('非对象')
    }

    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return newObj
}

let obj = {
    a: [1, 2, 3],
    b: {
        c: 2,
        d: 3
    }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2

```
## 原型
>涉及面试题：如何理解原型？如何理解原型链？

- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- 函数的 prototype 是一个对象
- 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链
[深度解析原型中的各个难点](https://github.com/KieSun/Dream/issues/2)
::: tip
老师的原型讲解一遍没看懂，之后看。
我记得另一个老师讲的原型是：对象的_proto_指向构造函数的prototype,构造函数的prototype指向原型，组成了原型链。
:::