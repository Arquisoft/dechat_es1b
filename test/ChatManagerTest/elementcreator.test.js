const creator = require("../../src/lib/ChatManager/ChatReader/ElementCreator");

describe('Extraction of messages from JSON', () => {
    it('Should extract the messages from a JSON input', () => {
        // Input
        const json = {
            webid_sender : "https://example.org/user",
            webid_receiver : "https://example.org/receiver",
            messages : [
                {
                    date: "2019-06-23",
                    message: "Dad, I'm hungry"
                }, {
                    date: "2019-06-23",
                    message: "Hi Hungry, I'm Dad"
                },{
                    date: "2019-06-23",
                    message: "I wish I was adopted"
                }
            ]            
        }
        //Extracting messages
        var messages = creator.create(json);
        expect(messages.length).toBe(3);
        expect(messages[0]).toEqual({
            timestamp: "2019-06-23",
            content: "Dad, I'm hungry",
            sender: "https://example.org/user",
            receiver: "https://example.org/receiver"
        });
        expect(messages[1]).toEqual({
            timestamp: "2019-06-23",
            content: "Hi Hungry, I'm Dad",
            sender: "https://example.org/user",
            receiver: "https://example.org/receiver"
        });
        expect(messages[2]).toEqual({
            timestamp: "2019-06-23",
            content: "I wish I was adopted",
            sender: "https://example.org/user",
            receiver: "https://example.org/receiver"
        });
    });
});