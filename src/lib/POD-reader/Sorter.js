const linq = require("linq");

/* 
Function to create 
a message list to be pass as argument 
var ms = [];

ms.push( new mess.Message("Juan", "Paula","How are you?",new Date(2018, 11, 24, 10, 33, 30, 0)));
ms.push(new mess.Message("Juan", "Paula","Hi",new Date(2016, 11, 24, 10, 33, 30, 0)));
ms.push(new mess.Message("Juan", "Paula","So much time...",new Date(2017, 11, 24, 10, 33, 30, 0)));

This class use LINQ: npm install linq
*/

function sort(list) {
    var sorted = linq.from(list).orderBy(function (m) {
        return m.timestamp;
    }).toArray();
    return sorted;
}

exports.sort = sort;