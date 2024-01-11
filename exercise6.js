var array = ["Banana", "Apples", "Oranges", "Blueberries"];

array.shift();
array.sort();
array.push("Kiwi");
array.shift();
array.reverse();

var array2 = ["Banana", ["Apples", ["Oranges"], "Blueberries"]];
console.log(array2[1][1][0]);