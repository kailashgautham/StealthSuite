var input1 = document.getElementsByName("color1")[0];
var input2 = document.getElementsByName("color2")[0];

var changeColor = function() {
    console.log("change!!");
    document.body.style.background = "linear-gradient(to right" + ", " + input1.value + ", " + input2.value + ")";
}

input1.addEventListener("input", changeColor);
input2.addEventListener("input", changeColor);