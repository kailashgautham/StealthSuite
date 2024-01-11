var button = document.getElementsByTagName("button")[0];
var input = document.getElementById("input");
var list = document.getElementsByTagName("ul")[0];
var listItems = document.getElementsByTagName("li");

var addToListAfterClick = function() {
    if (input.value === "") return;
    addToList();
};

var addToListAfterEnter = function(event) {
    if (event.key !== "Enter" || input.value === "") return;
    addToList();
};

var addToList = function() {
    var text = input.value;
    if (text === "") return;
    var li = document.createElement("li");
    var div = document.createElement("div");
    div.classList.add("button");
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("Delete"));    
    div.appendChild(button);
    li.appendChild(document.createTextNode(text));
    li.appendChild(div);
    list.appendChild(li);
    li.addEventListener("click", toggleDone);
    li.lastChild.lastChild.addEventListener("click", deleteItem);
    input.value = "";
};

var deleteItem = function() {
    this.parentElement.parentElement.remove();
}
var toggleDone = function() {
    this.classList.toggle("done");
}

button.addEventListener("click", addToListAfterClick);

input.addEventListener("keyup", addToListAfterEnter);

for (let listItem of listItems) {
    listItem.addEventListener("click", toggleDone);
    listItem.lastChild.children[0].addEventListener("click", deleteItem);
}