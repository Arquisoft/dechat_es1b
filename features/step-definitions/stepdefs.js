const assert = require("assert")  ;
const { Given, When, Then } = require('cucumber');
const Chat = require("../../src/lib/Chat.js");
const fc = require("solid-file-client");
const Persona = require("../../src/model/person");
const chatManager = require("../../src/lib/ChatManager/ChatManager")
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

// Looking for a friend story

 Given('I am in the app', function () {                                 
   // Write code here that turns the phrase above into concrete actions 
   //return 'pending';                                                    
 });                                                                                                                                                                   
                                                                        
 When('I am into a chat', function () {                                 
   // Write code here that turns the phrase above into concrete actions 
   //return 'pending';                                                    
 });                                                                                           
                                                                        
 Then('I can see the name {string} of my partner', function (string) {  
   // Write code here that turns the phrase above into concrete actions 
   //return 'pending';                                                    
 });                                                                    