var button = document.getElementsByTagName("button")[0];

button.addEventListener("click", function() {
    var input = document.getElementById("input").value;
    var list = document.getElementsByTagName("ul")[0];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input));
    list.appendChild(li);
});