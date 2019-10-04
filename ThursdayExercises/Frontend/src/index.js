import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

var content = document.getElementById("content");
var URI = 'http://localhost:8080/BackendThursday/api/person/';

function getErrorTable(data) {
    var tableData = ["<tr><td>" + data.status + "</td><td>" + data.msg + "</td></tr>"];
    tableData.unshift('<table class="table"><tr><th scope="col">Status</th><th scope="col">Message</th></tr>');
    tableData.push("</table>");
    return tableData.join("");
}

/**
 * Fetch with Error Handling - Help function
 * @param String URL 
 * @param function callback 
 */
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


function makeTable(data) {
    var tableData = data.all.map(person => "<tr><td>" + person.ID + "</td><td>" + person.name + "</td></tr>");
    tableData.unshift('<table class="table"><tr><th scope="col">id</th><th scope="col">name</th></tr>');
    tableData.push("</table>");
    return tableData.join("");
}


function getOneUserTable(data) {
    var tableData = ["<tr><td>" + data.id + "</td><td>" + data.age + "</td><td>" + data.name + "</td><td>" + data.gender + "</td><td>" + data.email + "</td></tr>"];
    tableData.unshift('<table class="table"><tr><th scope="col">id</th><th scope="col">age</th><th scope="col">name</th><th scope="col">gender</th><th scope="col">email</th></tr>');
    tableData.push("</table>");
    return tableData.join("");
};

function generateTable(data) {
    var tableData = [];
    //Headers
    tableData.push('<table class="table"><tr>');
    for (var key in Object.keys(data)) {
        tableData.push('<th scope="col">' + key + '</th>');
    }
    tableData.push('</tr>');

    //Body
    tableData.push('<tr>');
    for (var property in Object.values(data)) {
        tableData.push('<td>' + property + '</td>');
    }
    tableData.push('</tr>');
    tableData.push("</table>");
    return tableData.join("");
}

/**
 * Show All Users in a table - GET
 */
function getAllUsers() {

    errorHandlingFetch(URI, function (data) {
        content.innerHTML = makeTable(data);
    })
}
document.getElementById("GetALL").onclick = getAllUsers;

// 2) Show a single user, given an ID - GET BY ID
function getOneUser() {
    var ID = document.getElementById("id").value;
    var URL = URI + ID;

    errorHandlingFetch(URL, function (data) {
        content.innerHTML = makeTable(data);
    })
}
document.getElementById("GET").onclick = getOneUser;

// 3) Add a new User - POST
function postUser() {
    var name = document.getElementById("name").value;
    var person = {name: name};
    var URL = URI;
    request(URL, "POST", person);
}
document.getElementById("POST").onclick = postUser;

// 4) Edit an existing user - PUT
function putUser() {
    var name = document.getElementById("name").value;
    var person = {name: name};
    var URL = URI + document.getElementById("id").value;
    request(URL, "PUT", person);
}
document.getElementById("PUT").onclick = putUser;

// 5) Delete an existing user - DELETE
function deleteUser() {
    request(URI + document.getElementById("id").value, "DELETE");
}
document.getElementById("DELETE").onclick = deleteUser;



