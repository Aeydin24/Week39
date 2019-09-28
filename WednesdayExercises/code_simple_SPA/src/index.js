import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//Helper function for get, put and delete requests
function request(URL, method, body) {
    function makeOptions(method, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json"
            }
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return fetch(URL, makeOptions(method, body));
}

//table function for getting the user data
function makeTable(data) {
    var tableData = data.map(person => "<tr><td>" + person.id + "</td><td>" + person.age + "</td><td>" + person.name + "</td><td>" + person.gender + "</td><td>" + person.email + "</td></tr>");
    tableData.unshift('<table class="table"><tr><th scope="col">id</th><th scope="col">age</th><th scope="col">name</th><th scope="col">gender</th><th scope="col">email</th></tr>');
    tableData.push("</table>");
    return tableData.join("");
}

//fetch with errorhandling
var errorHandlingFetch = function (URL, callback) {
    function handleHttpErrors(res) {
        if (!res.ok) {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json();
    }

    fetch(URL)
        .then(handleHttpErrors)
        .then(data => callback(data))
        .catch(err => {
            if (err.status) {
                err.fullError.then(e => console.log(e.detail))
                err.fullError.then(e => content.innerHTML = getErrorTable(e))
            }
            else { console.log("Network error"); }
        });
}

//Exercises 

//Show all users in a table
function getAllUsers() {
    var URL = 'http://localhost:3333/api/users';

    errorHandlingFetch(URL, function (data) {
        content.innerHTML = makeTable(data);
    })
}
document.getElementById("getAllData").onclick = getAllUsers;

//Show a single user by ID
function getOneUser() {
    var ID = document.getElementById("input").value;
    var URL = 'http://localhost:3333/api/users/' + ID;

    errorHandlingFetch(URL, function (data) {
        content.innerHTML = getOneUserTable(data);
    })
}
document.getElementById("getOneUser").onclick = getOneUser;

// 3) Add a new User - POST
function postUser() {
    var age = document.getElementById("age").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var genderArray = document.getElementsByName("gender");
    var gender;
    for (var i = 0; i < genderArray.length; i++) {
        if (genderArray[i].checked) {
            gender = genderArray[i].value;
        }
    }
    var person = { age: age, name: name, email: email, gender: gender };
    var URL = 'http://localhost:3333/api/users/';
    request(URL, "POST", person);
}
document.getElementById("postPerson").onclick = postUser;

// 4) Edit an existing user - PUT
function putUser() {
    var age = document.getElementById("age").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var genderArray = document.getElementsByName("gender");
    var gender;
    for (var i = 0; i < genderArray.length; i++) {
        if (genderArray[i].checked) {
            gender = genderArray[i].value;
        }
    }
    var person = { age: age, name: name, email: email, gender: gender };
    var URL = 'http://localhost:3333/api/users/' + document.getElementById("id").value;
    request(URL, "PUT", person);
}
document.getElementById("putPerson").onclick = putUser;

// 5) Delete an existing user - DELETE
function deleteUser() {
    request('http://localhost:3333/api/users/' + document.getElementById("id").value, "DELETE");
}
document.getElementById("deletePerson").onclick = deleteUser;





