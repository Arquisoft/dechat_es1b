const assert = require("assert")  ;
const { Given, When, Then } = require('cucumber');

//Notification user story

Given('I am chatting', function() {
	this.chatting = true;
});

When('I receive a new message from {string}', function(friend) {
	this.message = new Object();
	this.message.partner = friend;	
});

Then('I receive a {string} from {string}', function(notification, friend) {
	if (this.chatting && this.message!=null) {
		assert.equal(this.message.partner, friend); 
		assert(notification != "");
	}
});
