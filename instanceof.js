function myInstanceof(left, right) {
    left = left.__proto__
    let prototype = right.prototype
    while (true) {
        if (left === null || left === undefined)
            return false
        if (prototype === left)
            return true
        left = left.__proto__
    }
}

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

var auto = new Car('Honda', 'Accord', 1998);

console.log(myInstanceof(auto, Car));
// expected output: true

console.log(myInstanceof(auto, Object));
// expected output: true

