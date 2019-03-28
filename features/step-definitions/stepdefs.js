const assert = require("assert")  ;
const { Given, When, Then } = require('cucumber');
const Chat = require("../../src/lib/Chat.js")
const fc = require("solid-file-client")
const Persona = require("../../src/model/person")
const chatManager = require("../../src/lib/ChatManager/ChatManager")
const fileManager = require("../../src/lib/ChatManager/ChatWriter/FileManager");
const chatWriter = require("../../src/lib/ChatManager/ChatWriter/ChatWriter.js");
const OK = 1;

function mock() {
	//Mocking solid-file-client and some modules
	chatWriter.sendToInbox = function() { return OK; }
	//chatManager.writeInbox = function() { return this.OK; }
    fc.createFile = function() { return OK; }
    fc.updateFile = function() { return OK; }
    fc.popupLogin = function() { return OK; }
    fc.deleteFile = function() { return OK; }
    fc.createFolder = function() { return OK; }
    fc.readFolder = function()
        { return JSON.parse("files:[{url : dechat.txt}]"); }
    

    fileManager.readFile = function() { return this.target.id; }
    chatManager.readPod = function() {
        if (user_id === user.id && target_id === target.id)
            return ["Bingo"];
    }
    fileManager.deleteFile = function() { return OK; }
}

//Notification user story

Given('I am chatting', function() {
	var user = new Persona("https://podaes1b.solid.community/profile/card#me", "Carmen", "https://podaes1b.solid.community/inbox");
	var target = new Persona("https://es1btest.solid.community/profile/card#me", "Paco", "https://es1btest.solid.community/inbox");
	this.chat = new Chat(user, target)
});

When('I receive a new message from partner', function() {
	mock();
});

Then('I receive a notification', async function() {
	var response = await this.chat.sendMessage("This is a test message :^)");
    assert.equal(OK, response);
});

//Sending a message user story

When('I send a message {string}', function(message) {
	this.mensaje = message;
});

Then('My friend gets a message {string} from me', function(message) {
	if (this.chatting) {
		assert.equal(this.mensaje, message); 
	}
});

//Friends listed story

Given('I press List Friends button', function() {
	this.pressedList = true;
});

When('My friends {string} got listed', function(friends) {
	if (this.pressedList) 
		this.friends = friends.split("-");
});

Then('I looked for {string}', function(name) {
	if (this.pressedList) {
		var i;
		for (i = 0; i<this.friends.length; i++) {
			if (this.friends[i] === name) {
				assert.equal(name, this.friends[i]);
			}
		}
	}
});	
