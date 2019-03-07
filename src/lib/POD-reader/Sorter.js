const linq = require('linq');
var mess = require('./Message.js');

/* 
Message es una funcion creadora para crear 
una lista de mensajes que pasar como parametro a prueba 
var ms = [];

ms.push( new mess.Message("Juan", "Paula","Que tal?",new Date(2018, 11, 24, 10, 33, 30, 0)));
ms.push(new mess.Message("Juan", "Paula","Hola",new Date(2016, 11, 24, 10, 33, 30, 0)));
ms.push(new mess.Message("Juan", "Paula","Cuanto tiempo",new Date(2017, 11, 24, 10, 33, 30, 0)));

Esta clase usa linq: npm install linq
*/

function sort(lista){

var ordenados = linq.from(lista).orderBy(function(m){
                                        return m.timestamp;
                                    }).toArray();
return ordenados;

}

exports.sort= sort;