var a = Number(prompt("Enter the first number: "));
var b = Number(prompt("Enter the second number: "));
var c = prompt("Enter the operation: ");

if (c == "+") alert("Your sum is: " + (a + b))
else if (c == "-") alert("Your difference is: " + a - b);
else if (c == "/") alert("Your quotient is: " + a / b);
else alert("Your product is: " + a * b);