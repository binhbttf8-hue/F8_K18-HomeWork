// Task 1
let classA = ['An', 'Binh', 'Chi']
let classB = classA
classB[0] = 'An Updated'
console.log('Class A:', classA)

// Task 2
let x = '10'
let y = 2
console.log(x + y)
console.log(x - y)
console.log(x * '3')
console.log('Hello' - y)

// Task 3
let age = 9
let mathScore = 10
let isVIP = false

// Case 1
age = 9; mathScore = 10; isVIP = false
let canEnter = isVIP || age >= 10 && mathScore > 7)
console.log('Test 1 - Can enter:', canEnter)

// Case 2
age = 9; mathScore = 10; isVIP = true
canEnter = isVIP || age >= 10 && mathScore > 7
console.log('Test 2 - Can enter:', canEnter)

// Task 4
const laptop = {
    brand: "Dell",
    price: 1000,
    spec: { ram: "8GB", ssd: "256GB" }
}
const myLaptop = laptop
myLaptop.brand = 'Apple'

const mySpec = laptop.spec
mySpec.ram = '16GB'

console.log(laptop.brand)
console.log(laptop.spec.ram)