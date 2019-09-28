//Exercise 1:
//Declare a JavaScript array and initialize it with some names (Lars, Jan, Peter, Bo, Frederik etc.). 
//Use the filter method to create a new array with only names that contains the letter ‘a’.
//Use the names-array created above, and, using its map method, create a new array with all names reversed.

var names = ['Brian', 'Christian','Lis', 'Bo'];

function witha(name) {
    if (name.includes('a'))
        return name;
}
console.log(names.filter(witha));

function reverseString(name) {
    return name.split('').reverse().join('');
}
console.log(names.map(reverseString));

// Exercise 2 
// Implement user defined functions that take callbacks as an argument

// Opgave A, Filter:

// Creates new array, checks for each element if any element is undefined, adds defined elements back to the array. 
// Uses to callback function to sort

function myFilter(array, callback) {
    var returnArray = [];
    array.forEach(element => {
        if (!(callback(element) == undefined)) {
            returnArray.push(callback(element));
        }
    });
    return returnArray;
}
console.log(myFilter(names, witha));

// Opgave B, Map:

// Creates new array, checks for each element if any element is undefined, adds defined elements back to the array. 
// Uses to callback function to sort

function myMap(array, callback) {
    var returnArray = [];
    array.forEach(element => {
        if (!(callback(element) == undefined)) {
            returnArray.push(callback(element));
        }
    });
    return returnArray;
}
console.log(myMap(names, reverseString));

//Exercise 3
// Using the Prototype property to add new functionality to existing objects

Array.prototype.myFilter = function (callback) {
    var returnArray = [];
    this.forEach(element => {
        if (!(callback(element) == undefined)) {
            returnArray.push(callback(element));
        }
    });
    return returnArray;
};
console.log(names.myFilter(witha));

// -- and map. By adding the annotation Array.prototype.myMap you can use myFilter/Map as a function - so smart!
// also we dont use array.forEach but this.forEach since theres no array given. 

Array.prototype.myMap = function (callback) {
    var returnArray = [];
    this.forEach(element => {
        if (!(callback(element) == undefined)) {
            returnArray.push(callback(element));
        }
    });
    return returnArray;
};
console.log(names.myMap(reverseString));

//Exercise 4
// Getting really comfortable with filter and map

//Opgave A:
var numbers = [1, 3, 5, 10, 11];
var result = [4,8,15,21,11];

function plusIndex(element, index, array) {
    if (index < array.length - 1)
        return element + array[index + 1];
    else return element;
}
console.log(numbers.map(plusIndex));

// Opgave B: 

var linkList = names.map(name => '<a href="">' + name + '</a>') //map that for every name, strings are added.
linkList.join(""); //make the array a single string
linkList.unshift('<nav>'); // put string in front of array
linkList.push('</nav>'); //apprehend string to array
console.log(linkList); //print array

// Opgave C:

var names = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];

function myTable(array) {
    var returnString = '<table>\n';

    var myTableArray = function (array) {
        function helper(element) {
            var returnString = '<tr>\n';
            returnString += '<td>' + element.name + '</td>\n';
            returnString += '<td>' + element.phone + '</td>';
            return returnString + '\n</tr>';
        }
        var objects = array.map(helper);
        return objects.join("\n");
    };

    returnString += myTableArray(array);

    return returnString + '\n</table>';
}
console.log(myTable(names));

// Opgave D -- both work.

//document.getElementById("names").innerHTML = linkList;

// document.getElementById("names").innerHTML = myTable(names);

// Opgave E

// document.getElementById("myButton").onclick = function () {

//    function filterNames(name) {
//        if (name.name.includes('a'))
//            return name;
//    }

//    var filteredNames = names.filter(filterNames);
    
//    document.getElementById("names").innerHTML = myTable(filteredNames);

//    document.getElementById("printString").innerHTML = navLinks2(filteredNames);
//}

// Exercise 5:
// Opgave A

var all = ["Lars", "Peter", "Jan", "Bo"];

console.log(all.join());
console.log(all.join(' '));
console.log(all.join('#'));

// Opgave B

var numbers = [2, 3, 67, 33];

function getSum(total, number) {
    return total + number;
}
console.log(numbers.reduce(getSum, 0));











