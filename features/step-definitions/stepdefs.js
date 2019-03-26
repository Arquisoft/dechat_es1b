const assert = require("assert")  ;
const { Given, When, Then } = require('cucumber');

function isItFriday(today){
    if (today === "Friday") {
        return "TGIF"; 
      } else {
        return "Nope";
      }
}

Given('today is {string}', function (givenDay) {
   this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, expectedAnswer);
});


//Notification user story

Given('I am chatting', function() {
	assert.equal($("#chatContainer0").length != 0);
});

When('I receive a new message', function() {
	true;
});

Then('I receive a {string} from {string}', function() {
	true;	
});
