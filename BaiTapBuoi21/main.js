// ========================================
// TASK 1: Arrays and Memory Addresses
// ========================================

console.log("=== TASK 1 ===");

// Step 1: Create an array named classA
const classA = ["An", "Binh", "Chi"];

// Step 2: Create classB and assign it the value of classA
const classB = classA;

// Step 3: Change the first element of classB
classB[0] = "An Updated";

// Step 4: Check the original array
console.log("classA:", classA);
console.log("classB:", classB);

/*
EXPLANATION:
Why was "An" in classA changed even though we only modified classB?

- When we write: classB = classA
- JavaScript does NOT create a copy of the array
- Instead, both classA and classB point to the SAME memory address

Example:
  classA -> Memory Address 0x01 -> ["An", "Binh", "Chi"]
  classB -> Memory Address 0x01 -> (same location).

- When we change classB[0] = "An Updated"
- We are modifying the data at memory address 0x01
- Since classA also points to 0x01, it sees the same change

This is called "reference type" - arrays are stored by reference, not by value.
*/

// ========================================
// TASK 2: Type Coercion in JavaScript
// ========================================

console.log("\n=== TASK 2 ===");

let x = "10";
let y = 2;

console.log("Result 1:", x + y);      // "102"
console.log("Result 2:", x - y);      // 8
console.log("Result 3:", x * "3");    // 30
console.log("Result 4:", "Hello" - y);// NaN

/*
EXPLANATION:

1. Why does addition (+) result in "102" while subtraction (-) results in 8?

   Addition (+):
   - The + operator can mean BOTH addition AND string concatenation
   - When one operand is a string, JavaScript converts the other to a string
   - "10" + 2 -> "10" + "2" -> "102" (string concatenation)

   Subtraction (-):
   - The - operator ONLY works with numbers
   - JavaScript converts the string to a number
   - "10" - 2 -> 10 - 2 -> 8 (numeric subtraction)

2. What does NaN mean? Why did it happen?

   NaN = "Not a Number"
   - "Hello" - 2 tries to convert "Hello" to a number
   - "Hello" cannot be converted to a valid number
   - Result: NaN (invalid numeric operation)
*/

// ========================================
// TASK 3: Programming Club Entry Logic
// ========================================

console.log("\n=== TASK 3 ===");

// Test Case 1
let age = 9;
let mathScore = 10;
let isVIP = false;

let canEnter = (age >= 10 && mathScore > 7) || isVIP;
console.log("Test Case 1 - age: 9, mathScore: 10, isVIP: false");
console.log("Can Enter:", canEnter); // false

// Test Case 2
age = 9;
mathScore = 10;
isVIP = true;

canEnter = (age >= 10 && mathScore > 7) || isVIP;
console.log("\nTest Case 2 - age: 9, mathScore: 10, isVIP: true");
console.log("Can Enter:", canEnter); // true

/*
LOGIC QUESTION:
Is !(age < 10) mathematically the same as age >= 10?

Answer: YES, they are mathematically equivalent.

Proof:
- !(age < 10) means "NOT (age is less than 10)"
- If age is NOT less than 10, then age must be >= 10
- Therefore: !(age < 10) === (age >= 10)

Examples:
  age = 9:  !(9 < 10) = !(true) = false  |  9 >= 10 = false  ✓ Same
  age = 10: !(10 < 10) = !(false) = true |  10 >= 10 = true  ✓ Same
  age = 11: !(11 < 10) = !(false) = true |  11 >= 10 = true  ✓ Same
*/

// ========================================
// TASK 4: Nested Objects and References
// ========================================

console.log("\n=== TASK 4 ===");

const laptop = {
    brand: "Dell",
    price: 1000,
    spec: { ram: "8GB", ssd: "256GB" }
};

const myLaptop = laptop;
myLaptop.brand = "Apple";

const mySpec = laptop.spec;
mySpec.ram = "16GB";

console.log("laptop.brand:", laptop.brand);       // "Apple"
console.log("laptop.spec.ram:", laptop.spec.ram); // "16GB"

/*
PREDICTION & EXPLANATION:

Before running:
- laptop.brand will be "Apple"
- laptop.spec.ram will be "16GB"

Why?

1. myLaptop = laptop
   - myLaptop points to the SAME object in memory as laptop
   - Memory: laptop -> 0x01, myLaptop -> 0x01 (same address)
   - When we change myLaptop.brand, we modify the object at 0x01
   - laptop also points to 0x01, so it sees the change

2. mySpec = laptop.spec
   - mySpec points to the SAME nested object as laptop.spec
   - Memory: laptop.spec -> 0x02, mySpec -> 0x02 (same address)
   - When we change mySpec.ram, we modify the object at 0x02
   - laptop.spec also points to 0x02, so it sees the change

Visual representation:
  laptop -> 0x01 { brand: "Apple", price: 1000, spec: 0x02 }
  myLaptop -> 0x01 (same object)
  
  laptop.spec -> 0x02 { ram: "16GB", ssd: "256GB" }
  mySpec -> 0x02 (same object)

Key concept: Objects in JavaScript are stored by REFERENCE, not by VALUE.
When you assign an object to a new variable, you're copying the reference (memory address),
not creating a new copy of the object.
*/
