"use strict";
var parsed;
/*
Text parser allows conversion POD-JSON
by the convention token by the development team
Every file have to start and end with //// (4 slashes)
This procedure also protect us from injection
as messages which contains the 4 slashes 
taking only the couple written by us.
An easy function that only receives a String returning the Json file
Parser JSON errors are not contemplated
because we are the creators of the format and the only external fail 
would be the injection (not allowed by our control)
*/

/*
	Execution in other file of the same folder:
	const parser = require('./TextParser.js');
	var myVar = parser.parseString(almacen);
*/




/**
 * Function that parses the string from the POD to get the JSON
 * @param {String} chain from the POD
 * @return {JSON} with messages
 */
function parseString(str) {
		return JSON.parse(str);
}

exports.parseString = parseString;