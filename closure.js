// 循环中使用闭包解决'var'定义函数的问题
for (var i = 0; i <= 10; i++) {
    setTimeout(function () {
        console.log(i)
    }, i * 1000)
}

// 方案一:let
for (let i = 0; i <= 10; i++) {
    setTimeout(function () {
        console.log(i)
    }, i * 1000)
}

// 方案二:闭包
for (var i = 0; i <= 10; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(j)
        }, j * 1000)
    })(i)
}

// 方案三:setTimeout传参
for (var i = 0; i <= 10; i++) {
    setTimeout(function (j) {
        console.log(j)
    }, i * 1000, i)
}
