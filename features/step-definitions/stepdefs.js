const assert = require("assert")  ;
const { Given, When, Then } = require('cucumber');
const Chat = require("../../src/lib/chat.js");
const fc = require("solid-file-client");
const Persona = require("../../src/model/person");
const fileManager = require("../../src/lib/ChatManager/ChatWriter/FileManager");
const chatWriter = require("../../src/lib/ChatManager/ChatWriter/ChatWriter.js");
const query = require("../../src/lib/ldflex-queries");
const OK = 1;


function mock() {
	//Mocking solid-file-client and some modules
	chatWriter.sendToInbox = function() { return OK; }
	chatWriter.sendToOwnPOD = function() { return OK; }
	
	fc.popupLogin = function() { return OK; }
	fc.popupLogin.then = function() { return OK; }
    fc.createFile = function() { return OK; }
    fc.updateFile = function() { return OK; }
    fc.popupLogin = function() { return OK; }
    fc.deleteFile = function() { return OK; }
    fc.createFolder = function() { return OK; }
    fc.readFolder = function()
        { return JSON.parse("files:[{url : dechat.txt}]"); }
    

    fileManager.readFile = function() { return this.target.id; }
    fileManager.deleteFile = function() { return OK; }
}

//Notification user story

Given('I am chatting', function() {
	var user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
	var target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");
	this.chat = new Chat(user, target);
	mock();
});

When('I receive a new message from partner', async function() {
	this.response = await this.chat.sendMessage("This is a test message :^)");
});

Then('I receive a notification', function() {
    assert.equal(OK, this.response);
});

//Sending a message user story

When('I send a message {string}', async function(message) {
	chatWriter.sendToInbox = function() { return message; }
	this.response = await this.chat.sendMessage(message);
});

Then('My friend gets a message {string} from me', function(message) {
	assert.equal(this.response, message); 
});

//Friends listed story

Given('I press List Friends button', function() {
	mock();
});

When('My friends got listed', function() {
	query.getFriends = function() { return "Alberto-Juan"; }
	this.friends = query.getFriends();
});

Then('I looked for Alberto', function() {
	var presente = this.friends.indexOf("Alberto");
	assert.equal(presente>=0, true);
});	                                                                 
 

//Checking i can read my partner name story

When('I am chatting with a friend', function() {
	var myChatA = new Chat("Secundino","Samuel");
 	var myChatB = new Chat("Secundino","Marcos");
	var myChatC = new Chat("Secundino","Martin");
	var myChatD = new Chat("Secundino","Luis");
	var myChatE = new Chat("Secundino","Javier");
	 
	this.myList = [myChatA.partner, myChatB.partner, myChatC.partner, myChatD.partner, myChatE.partner];
});

Then('I can see my partner´s name {string}', function(name) {
	
	assert.equal(this.myList.indexOf(name)>=0,true);
	
});	

//Checking I can read messages story
Given('I am using the app', function() {
	var myChatA = new Chat("Secundino","Jose");
	myChatA.messages = ["Hola que tal?","Como estas?"];
 	var myChatB = new Chat("Secundino","Jesus");
	myChatB.messages = ["Secun maquina","Cuantisimo tiempo","Queria contarte una cosa","Hoy no atendi en clase, estaba descentralizado"];
	 
	this.myList = [myChatA, myChatB];
});
When('I am chatting with {string}', function(name) {
	var i;
	var b = false;
	for(i = 0; i<this.myList.length; i++){
		if(this.myList[i].partner === name)
		{	
			b = true;
			break;
		}
	}
	assert.equal(b, true);
});

Then('I can read he has sent me {string}', function(message) {
	
	var i;
	var b = false;
	for(i = 0; i<this.myList.length; i++){
		if(this.myList[i].messages.indexOf(message)>=0)
		{
			b = true;
			break;
		}
	}
	assert.equal(b, true);
	
});	
