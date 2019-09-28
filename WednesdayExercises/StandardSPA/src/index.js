import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
document.getElementById("jokes").innerHTML = allJokes.join("");

document.getElementById("myButton").addEventListener("click", function () {
    fetch("https://studypoints.info/jokes/api/jokes/period/hour")
        .then(res => res.json())
        .then(data => {
            document.getElementById("myDiv").innerHTML = data.joke;
        })
})

setInterval(() => {
    fetch("https://studypoints.info/jokes/api/jokes/period/hour")
        .then(res => res.json())
        .then(data => {
            document.getElementById("myDiv").innerHTML = data.joke;
        })
}, 10000)

var cloverside = function(direction) {
    document.getElementById(direction).addEventListener("click", function () {
        alert(direction);
        
    })
}

cloverside("north");
cloverside("south");
cloverside("west");
cloverside("east");



