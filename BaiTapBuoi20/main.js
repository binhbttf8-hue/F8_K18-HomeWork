let name = "Nguyen Van A";
let age = 20;
let isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);

let a = 5;
let b = 10;

console.log(a);
console.log(b);

// Thay doi gia tri a va b
a = 10;
b = 5;
 console.log("a=",a);
 console.log("b=",b);

 // Phan 2: const/ let/ var

// Cau 1: const khac let o diem nao?
// Tra loi:
// const: Không thể gán lại giá trị sau khi đã khai báo.
// let: Có thể gán lại giá trị sau khi đã khai báo (biến có thể thay đổi)

// Ví dụ:
// let x = 5;
// x = 10; // OK - let cho phép thay đổi giá trị
// khi console.log("let x=", x); // Kết quả: 10

// Với const thì không cho phép thay đổi giá trị như vậy.

// Câu 2: Khi nào nên dùng const?
// Trả lời:
// - Dùng const khi giá trị không thay đổi trong suốt cả bài.
// - Ví dụ: tên người dùng...

// Câu 3: Đoạn code sau đúng hay sai? Giải thích:
// const x = 10;
// x = 20;

// Trả lời: Sai.
// Giải thích:
// - Dòng const x = 10 là khai báo hằng số với giá trị là 10
// Dòng x = 20 là cố gắng thay đổi giá trị của const nhưng const ko thể thay đổi nên code này sai.

// Phần 3: Kiểu dữ liệu và Object
// Bài 1: Xác định kiểu dữ liệu của các giá trị sau:

// 100 // number
// "100" // string
// true // boolean
// [1, 2, 3] // array (special object)
// {name: "An", age: 20}   object
// null
// undefined

const student = {
    name: "Nguyen Van A",
    age: 20,
    scores: [5,6,7]
}
console.log(student);

// Part 4: Type Casting

// 1. "1000" (string) → number
const str = "1000";
const num = Number(str);
console.log("Value:", num);
console.log("Type:", typeof num);

// 2. 1000 (number) → string
const num2 = 1000;
const str2 = String(num2);
console.log("Value:", str2);
console.log("Type:", typeof str2);

// 3. true (boolean) → string
const bool = true;
const str3 = String(bool);
console.log("Value:", str3);
console.log("Type:", typeof str3);



